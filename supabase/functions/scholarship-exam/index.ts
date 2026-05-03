// Scholarship exam backend: register attempt, save answers, finalize/auto-submit with server-side scoring.
// Correct answers never leave the server.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANON = Deno.env.get("SUPABASE_ANON_KEY")!;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  // Authenticate caller
  const authHeader = req.headers.get("Authorization") ?? "";
  if (!authHeader.startsWith("Bearer ")) return json({ error: "Unauthorized" }, 401);

  const userClient = createClient(SUPABASE_URL, ANON, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: userData, error: userErr } = await userClient.auth.getUser();
  if (userErr || !userData?.user) return json({ error: "Unauthorized" }, 401);
  const user = userData.user;

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE);

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  const action = String(body?.action ?? "");

  try {
    // ---------------- ADMIN PREVIEW ----------------
    // Admins start an isolated test attempt against any exam (published or draft).
    // Preview attempts skip eligibility + max-attempts and are flagged is_preview=true.
    if (action === "preview") {
      const examId = String(body?.exam_id ?? "");
      if (!examId) return json({ error: "exam_id is required" }, 400);

      // Verify admin role
      const { data: roles } = await admin
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);
      const isAdminUser = (roles ?? []).some((r: any) =>
        ["admin", "super_admin", "hq_admin"].includes(String(r.role)),
      );
      if (!isAdminUser) return json({ error: "Admins only" }, 403);

      const { data: exam, error: examErr } = await admin
        .from("scholarship_exams")
        .select("id, duration_minutes")
        .eq("id", examId)
        .maybeSingle();
      if (examErr || !exam) return json({ error: "Exam not found" }, 404);

      // Reuse a live preview attempt for this admin if it exists
      const now = new Date();
      const { data: existing } = await admin
        .from("scholarship_exam_attempts")
        .select("id, status, expires_at")
        .eq("user_id", user.id)
        .eq("exam_id", exam.id)
        .eq("is_preview", true)
        .order("started_at", { ascending: false });
      const live = (existing ?? []).find(
        (a: any) => a.status === "in_progress" && new Date(a.expires_at) > now,
      );
      if (live) return json({ attempt_id: live.id, expires_at: live.expires_at, preview: true });

      const expires_at = new Date(now.getTime() + exam.duration_minutes * 60_000).toISOString();
      const { data: attempt, error: insErr } = await admin
        .from("scholarship_exam_attempts")
        .insert({
          exam_id: exam.id,
          user_id: user.id,
          application_id: null,
          status: "in_progress",
          started_at: now.toISOString(),
          expires_at,
          is_preview: true,
        })
        .select("id, expires_at")
        .single();
      if (insErr || !attempt) return json({ error: "Could not start preview attempt" }, 500);
      return json({ attempt_id: attempt.id, expires_at: attempt.expires_at, preview: true });
    }

    // ---------------- REGISTER ----------------
    if (action === "register") {
      const examSlug = String(body?.exam_slug ?? "");
      if (!examSlug) return json({ error: "exam_slug is required" }, 400);

      const { data: exam, error: examErr } = await admin
        .from("scholarship_exams")
        .select("id, slug, title, duration_minutes, max_attempts, is_published, opens_at, closes_at")
        .eq("slug", examSlug)
        .maybeSingle();
      if (examErr || !exam) return json({ error: "Exam not found" }, 404);
      if (!exam.is_published) return json({ error: "Exam is not available" }, 403);

      const now = new Date();
      if (exam.opens_at && new Date(exam.opens_at) > now)
        return json({ error: "Exam has not opened yet" }, 403);
      if (exam.closes_at && new Date(exam.closes_at) < now)
        return json({ error: "Exam registration window has closed" }, 403);

      // Eligibility: any submitted scholarship application
      const { data: apps } = await admin
        .from("applications")
        .select("id, status, application_type")
        .eq("user_id", user.id)
        .eq("application_type", "scholarship_eduaid_2026")
        .order("submitted_at", { ascending: false })
        .limit(1);
      const application = apps?.[0];
      if (!application)
        return json(
          { error: "You must submit a scholarship application before registering for the exam." },
          403,
        );

      // Reuse an in-progress, non-expired attempt if any
      const { data: existing } = await admin
        .from("scholarship_exam_attempts")
        .select("*")
        .eq("user_id", user.id)
        .eq("exam_id", exam.id)
        .order("started_at", { ascending: false });

      const live = (existing ?? []).find(
        (a) => a.status === "in_progress" && new Date(a.expires_at) > now,
      );
      if (live) return json({ attempt_id: live.id, expires_at: live.expires_at });

      // Enforce max attempts (count finalized/expired attempts only)
      const consumed = (existing ?? []).filter((a) => a.status !== "in_progress").length;
      if (consumed >= exam.max_attempts)
        return json({ error: "You have used all your attempts for this exam." }, 403);

      const expires_at = new Date(now.getTime() + exam.duration_minutes * 60_000).toISOString();
      const { data: attempt, error: insErr } = await admin
        .from("scholarship_exam_attempts")
        .insert({
          exam_id: exam.id,
          user_id: user.id,
          application_id: application.id,
          status: "in_progress",
          started_at: now.toISOString(),
          expires_at,
        })
        .select("id, expires_at")
        .single();
      if (insErr || !attempt) return json({ error: "Could not register attempt" }, 500);

      return json({ attempt_id: attempt.id, expires_at: attempt.expires_at });
    }

    // ---------------- GET ATTEMPT ----------------
    // Returns attempt + sanitized questions (no correct_index) + saved answers.
    if (action === "get_attempt") {
      const attemptId = String(body?.attempt_id ?? "");
      if (!attemptId) return json({ error: "attempt_id is required" }, 400);

      const { data: attempt, error } = await admin
        .from("scholarship_exam_attempts")
        .select("*")
        .eq("id", attemptId)
        .maybeSingle();
      if (error || !attempt) return json({ error: "Attempt not found" }, 404);
      if (attempt.user_id !== user.id) return json({ error: "Forbidden" }, 403);

      const { data: exam } = await admin
        .from("scholarship_exams")
        .select("id, slug, title, duration_minutes, pass_score_percent")
        .eq("id", attempt.exam_id)
        .maybeSingle();

      const { data: questions } = await admin
        .from("scholarship_exam_questions")
        .select("id, position, prompt, options, points")
        .eq("exam_id", attempt.exam_id)
        .order("position", { ascending: true });

      const { data: answers } = await admin
        .from("scholarship_exam_answers")
        .select("question_id, selected_index")
        .eq("attempt_id", attempt.id);

      return json({
        attempt: {
          id: attempt.id,
          status: attempt.status,
          started_at: attempt.started_at,
          expires_at: attempt.expires_at,
          submitted_at: attempt.submitted_at,
          score_percent: attempt.score_percent,
          score_points: attempt.score_points,
          total_points: attempt.total_points,
          passed: attempt.passed,
        },
        exam,
        questions: questions ?? [],
        answers: answers ?? [],
      });
    }

    // ---------------- SAVE ANSWER ----------------
    if (action === "save_answer") {
      const attemptId = String(body?.attempt_id ?? "");
      const questionId = String(body?.question_id ?? "");
      const selectedIndex = body?.selected_index;
      if (!attemptId || !questionId) return json({ error: "attempt_id and question_id required" }, 400);
      if (selectedIndex !== null && (typeof selectedIndex !== "number" || selectedIndex < 0 || selectedIndex > 20))
        return json({ error: "selected_index out of range" }, 400);

      const { data: attempt } = await admin
        .from("scholarship_exam_attempts")
        .select("id, user_id, status, expires_at, exam_id")
        .eq("id", attemptId)
        .maybeSingle();
      if (!attempt || attempt.user_id !== user.id) return json({ error: "Forbidden" }, 403);

      if (attempt.status !== "in_progress" || new Date(attempt.expires_at) <= new Date()) {
        // auto-finalize if time is up
        if (attempt.status === "in_progress") await finalize(admin, attempt.id, "expired");
        return json({ error: "Attempt is no longer in progress" }, 409);
      }

      // Validate question belongs to exam
      const { data: q } = await admin
        .from("scholarship_exam_questions")
        .select("id, exam_id, options")
        .eq("id", questionId)
        .maybeSingle();
      if (!q || q.exam_id !== attempt.exam_id) return json({ error: "Invalid question" }, 400);
      if (
        selectedIndex !== null &&
        Array.isArray(q.options) &&
        (selectedIndex as number) >= q.options.length
      )
        return json({ error: "selected_index out of range" }, 400);

      const { error: upErr } = await admin
        .from("scholarship_exam_answers")
        .upsert(
          {
            attempt_id: attempt.id,
            question_id: questionId,
            selected_index: selectedIndex,
            answered_at: new Date().toISOString(),
          },
          { onConflict: "attempt_id,question_id" },
        );
      if (upErr) return json({ error: "Could not save answer" }, 500);

      return json({ ok: true });
    }

    // ---------------- FINALIZE ----------------
    // Reason: "submitted" (user clicked submit) or "expired" (timer ran out / auto)
    if (action === "finalize") {
      const attemptId = String(body?.attempt_id ?? "");
      const reason = body?.reason === "expired" ? "expired" : "submitted";
      if (!attemptId) return json({ error: "attempt_id is required" }, 400);

      const { data: attempt } = await admin
        .from("scholarship_exam_attempts")
        .select("id, user_id, status, expires_at")
        .eq("id", attemptId)
        .maybeSingle();
      if (!attempt || attempt.user_id !== user.id) return json({ error: "Forbidden" }, 403);

      if (attempt.status !== "in_progress") {
        // Already finalized — return latest snapshot
        const { data: a } = await admin
          .from("scholarship_exam_attempts")
          .select("id, status, score_points, total_points, score_percent, passed, submitted_at")
          .eq("id", attempt.id)
          .maybeSingle();
        return json({ already: true, attempt: a });
      }

      const final = await finalize(admin, attempt.id, reason);
      return json({ attempt: final });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    console.error("scholarship-exam error", e);
    return json({ error: "Server error" }, 500);
  }
});

// ----- helpers -----
async function finalize(admin: any, attemptId: string, reason: "submitted" | "expired") {
  const { data: attempt } = await admin
    .from("scholarship_exam_attempts")
    .select("id, exam_id")
    .eq("id", attemptId)
    .single();

  const [{ data: questions }, { data: answers }, { data: exam }] = await Promise.all([
    admin
      .from("scholarship_exam_questions")
      .select("id, correct_index, points")
      .eq("exam_id", attempt.exam_id),
    admin
      .from("scholarship_exam_answers")
      .select("question_id, selected_index")
      .eq("attempt_id", attemptId),
    admin
      .from("scholarship_exams")
      .select("pass_score_percent")
      .eq("id", attempt.exam_id)
      .single(),
  ]);

  const answerMap = new Map<string, number | null>();
  for (const a of answers ?? []) answerMap.set(a.question_id, a.selected_index);

  let score = 0;
  let total = 0;
  for (const q of questions ?? []) {
    total += q.points ?? 1;
    const sel = answerMap.get(q.id);
    if (typeof sel === "number" && sel === q.correct_index) score += q.points ?? 1;
  }
  const percent = total > 0 ? Math.round((score / total) * 10000) / 100 : 0;
  const passed = percent >= (exam?.pass_score_percent ?? 60);

  const { data: updated } = await admin
    .from("scholarship_exam_attempts")
    .update({
      status: reason === "expired" ? "expired" : "submitted",
      submitted_at: new Date().toISOString(),
      score_points: score,
      total_points: total,
      score_percent: percent,
      passed,
    })
    .eq("id", attemptId)
    .select("id, status, score_points, total_points, score_percent, passed, submitted_at")
    .single();
  return updated;
}
