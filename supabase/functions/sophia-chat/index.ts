// Sophia AI chat — FAQ-grounded support assistant for SCEF
// Searches the sophia_faqs knowledge base, asks an LLM to answer using
// ONLY that context, logs the conversation, and returns an answer plus
// escalation guidance.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;

const ESCALATION_DEPARTMENTS = [
  "Membership Desk",
  "Payments Desk",
  "NESA-Africa Desk",
  "EduAid-Africa Desk",
  "Partnership Desk",
  "Volunteer Desk",
  "Local Chapter Desk",
  "Media Desk",
  "Technical Desk",
  "Finance Desk",
  "Governance Desk",
];

const SYSTEM_PROMPT = `You are Sophia, the official automated support assistant for Santos Creations Educational Foundation (SCEF).

Brand voice: warm, professional, simple, respectful, donor-ready.
Tagline: "Empowering Education. Advocating Education for All. Sustaining Africa's Future."

You support: SCEF, EduAid-Africa, NESA-Africa, GFA Wallet, Local Chapters, Membership, Volunteers, Partnerships, Payments, Training, Media.

Rules:
- Answer using ONLY the FAQ context provided. Do not invent facts, programs, prices, dates, names, URLs, or policies.
- If the FAQs partially cover the question, answer the covered part and offer escalation for the rest.
- If the FAQs do not cover the question at all, say so clearly and offer escalation.
- Never ask for passwords, wallet codes, bank PINs, OTPs, or confidential documents. For payment/account issues, escalate to the Finance Desk or Technical Desk.
- Keep replies concise (3-6 sentences). Use plain language. Include a single relevant link from the FAQ context when helpful.
- If the question is ambiguous, ask ONE clarifying question instead of guessing.
- Escalation departments you may suggest: ${ESCALATION_DEPARTMENTS.join(", ")}.

Return a JSON object via the provided tool. Always call the tool.`;

interface ChatBody {
  question: string;
  conversation_id?: string | null;
  user_name?: string;
  user_email?: string;
  user_phone?: string;
  channel?: string;
  history?: { role: "user" | "assistant"; content: string }[];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = (await req.json()) as ChatBody;
    const question = (body.question || "").trim();
    if (!question || question.length > 2000) {
      return json({ error: "Invalid question" }, 400);
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

    // 1. Retrieve candidate FAQs via Postgres full-text + keyword match.
    const tokens = question
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .split(/\s+/)
      .filter((t) => t.length > 2)
      .slice(0, 12);
    const tsQuery = tokens.map((t) => t + ":*").join(" | ") || question;

    const { data: ftsFaqs } = await supabase
      .from("sophia_faqs")
      .select(
        "id,faq_number,category,question,short_answer,full_answer,related_url,related_program,escalation_department",
      )
      .eq("status", "published")
      .textSearch(
        "fts" as never, // not a real column; fall back to ilike below
        tsQuery,
        { config: "english" } as never,
      )
      .limit(8)
      .then((r) => r)
      .catch(() => ({ data: null as any }));

    let faqs = ftsFaqs ?? [];
    if (!faqs.length) {
      // Fallback: ilike search across question + short_answer.
      const like = `%${tokens[0] ?? question.slice(0, 40)}%`;
      const { data } = await supabase
        .from("sophia_faqs")
        .select(
          "id,faq_number,category,question,short_answer,full_answer,related_url,related_program,escalation_department",
        )
        .eq("status", "published")
        .or(`question.ilike.${like},short_answer.ilike.${like}`)
        .limit(8);
      faqs = data ?? [];
    }

    // Always include a small "general" sample so the model has scope context.
    if (faqs.length < 4) {
      const { data: extra } = await supabase
        .from("sophia_faqs")
        .select(
          "id,faq_number,category,question,short_answer,full_answer,related_url,related_program,escalation_department",
        )
        .eq("status", "published")
        .order("faq_number", { ascending: true })
        .limit(8);
      const ids = new Set(faqs.map((f: any) => f.id));
      for (const f of extra ?? []) if (!ids.has(f.id)) faqs.push(f as any);
    }

    const faqContext = faqs
      .slice(0, 10)
      .map(
        (f: any, i: number) =>
          `[FAQ ${i + 1} | id=${f.id} | category=${f.category}${
            f.related_program ? ` | program=${f.related_program}` : ""
          }]\nQ: ${f.question}\nA: ${f.short_answer}${
            f.full_answer ? `\nDetails: ${f.full_answer}` : ""
          }${f.related_url ? `\nLink: ${f.related_url}` : ""}${
            f.escalation_department ? `\nEscalation: ${f.escalation_department}` : ""
          }`,
      )
      .join("\n\n");

    const history = (body.history ?? []).slice(-6).map((m) => ({
      role: m.role,
      content: m.content.slice(0, 1500),
    }));

    // 2. Call Lovable AI gateway with tool-call for structured output.
    const aiResp = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "system",
              content: `FAQ KNOWLEDGE BASE (use ONLY these facts):\n\n${
                faqContext || "(no FAQs matched — knowledge base empty for this topic)"
              }`,
            },
            ...history,
            { role: "user", content: question },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "sophia_answer",
                description: "Return Sophia's structured answer.",
                parameters: {
                  type: "object",
                  properties: {
                    answer: {
                      type: "string",
                      description: "Reply shown to the user. 3-6 sentences.",
                    },
                    matched_faq_id: {
                      type: "string",
                      description: "FAQ id used as primary source, or empty string.",
                    },
                    confidence: {
                      type: "number",
                      description: "0 to 1. Below 0.55 means escalate.",
                    },
                    detected_intent: { type: "string" },
                    detected_category: { type: "string" },
                    clarifying_question: {
                      type: "string",
                      description: "Empty unless one clarifying question is needed.",
                    },
                    escalation_required: { type: "boolean" },
                    escalation_department: {
                      type: "string",
                      description:
                        "One of the desks, or empty string when not escalating.",
                    },
                    related_url: { type: "string" },
                  },
                  required: [
                    "answer",
                    "matched_faq_id",
                    "confidence",
                    "detected_intent",
                    "detected_category",
                    "escalation_required",
                  ],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: {
            type: "function",
            function: { name: "sophia_answer" },
          },
        }),
      },
    );

    if (!aiResp.ok) {
      const txt = await aiResp.text();
      console.error("AI gateway error", aiResp.status, txt);
      if (aiResp.status === 429) {
        return json({ error: "rate_limited", message: "Sophia is busy — please try again in a moment." }, 429);
      }
      if (aiResp.status === 402) {
        return json({ error: "payment_required", message: "Sophia is temporarily unavailable. Please contact support." }, 402);
      }
      return json({ error: "ai_error" }, 500);
    }

    const aiJson = await aiResp.json();
    const toolCall = aiJson?.choices?.[0]?.message?.tool_calls?.[0];
    let parsed: any = {};
    try {
      parsed = toolCall?.function?.arguments
        ? JSON.parse(toolCall.function.arguments)
        : {};
    } catch (_e) {
      parsed = {};
    }

    const matchedId = parsed.matched_faq_id && faqs.find((f: any) => f.id === parsed.matched_faq_id)
      ? parsed.matched_faq_id
      : null;

    if (matchedId) {
      const current = (faqs.find((f: any) => f.id === matchedId)?.view_count ?? 0) as number;
      try {
        await supabase
          .from("sophia_faqs")
          .update({ view_count: current + 1 } as any)
          .eq("id", matchedId);
      } catch (_e) {
        // best effort
      }
    }


    const result = {
      answer: parsed.answer || "I don't have enough verified information to answer that yet. Would you like me to connect you to the right SCEF support desk?",
      confidence: typeof parsed.confidence === "number" ? parsed.confidence : 0.3,
      detected_intent: parsed.detected_intent || "unknown",
      detected_category: parsed.detected_category || "General",
      clarifying_question: parsed.clarifying_question || "",
      escalation_required: !!parsed.escalation_required || (parsed.confidence ?? 0) < 0.55,
      escalation_department:
        parsed.escalation_department && ESCALATION_DEPARTMENTS.includes(parsed.escalation_department)
          ? parsed.escalation_department
          : "",
      related_url: parsed.related_url || "",
      matched_faq_id: matchedId,
      escalation_departments: ESCALATION_DEPARTMENTS,
    };

    // 3. Log conversation.
    const { data: convo } = await supabase
      .from("sophia_conversations")
      .insert({
        user_name: body.user_name || null,
        user_email: body.user_email || null,
        user_phone: body.user_phone || null,
        channel: body.channel || "web_widget",
        question_text: question,
        detected_intent: result.detected_intent,
        matched_faq_id: matchedId,
        response_text: result.answer,
        confidence_score: result.confidence,
        escalation_required: result.escalation_required,
        escalation_department: result.escalation_department || null,
        status: result.escalation_required ? "needs_escalation" : "answered",
      })
      .select("id")
      .single();

    if (!matchedId && result.confidence < 0.55) {
      await supabase.from("sophia_unanswered_questions").insert({
        conversation_id: convo?.id ?? null,
        question_text: question,
        suggested_category: result.detected_category,
        user_contact: body.user_email || body.user_phone || null,
      });
    }

    if (matchedId) {
      // Bump view counter (best effort)
      await supabase.rpc("noop").catch(() => undefined);
      await supabase
        .from("sophia_faqs")
        .update({ view_count: (faqs.find((f: any) => f.id === matchedId)?.view_count ?? 0) + 1 } as any)
        .eq("id", matchedId)
        .then(() => undefined, () => undefined);
    }

    return json({ ...result, conversation_id: convo?.id ?? null });
  } catch (err) {
    console.error("sophia-chat error", err);
    return json({ error: "server_error", message: err instanceof Error ? err.message : "Unknown" }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
