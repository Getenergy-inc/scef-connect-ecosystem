import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { AlertTriangle, Check, ChevronLeft, ChevronRight, Clock, Loader2, Send, Wifi } from "lucide-react";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuthState as useAuth } from "@/hooks/useAuthState";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Question = { id: string; position: number; prompt: string; options: string[]; points: number };
type AttemptData = {
  attempt: {
    id: string;
    status: "in_progress" | "submitted" | "expired";
    started_at: string;
    expires_at: string;
    is_preview?: boolean;
  };
  exam: { title: string; duration_minutes: number; pass_score_percent: number };
  questions: Question[];
  answers: { question_id: string; selected_index: number | null }[];
};

const fmt = (sec: number) => {
  if (sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

const ExamRunner = () => {
  const { attemptId = "" } = useParams();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [data, setData] = useState<AttemptData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [selections, setSelections] = useState<Record<string, number | null>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [now, setNow] = useState(Date.now());
  const finalizedRef = useRef(false);

  // Auth gate
  useEffect(() => {
    if (!authLoading && !user) navigate(`/auth?redirect=/scholarship/exam/${attemptId}`);
  }, [user, authLoading, attemptId, navigate]);

  // Load attempt
  useEffect(() => {
    if (!user || !attemptId) return;
    (async () => {
      setLoading(true);
      const { data: res, error: err } = await supabase.functions.invoke("scholarship-exam", {
        body: { action: "get_attempt", attempt_id: attemptId },
      });
      if (err || (res as any)?.error) {
        setError((res as any)?.error ?? err?.message ?? "Could not load exam");
        setLoading(false);
        return;
      }
      const d = res as AttemptData;
      setData(d);
      const map: Record<string, number | null> = {};
      d.answers.forEach((a) => (map[a.question_id] = a.selected_index));
      setSelections(map);
      setLoading(false);

      // If already finalized, jump to result
      if (d.attempt.status !== "in_progress") {
        navigate(`/scholarship/exam/${attemptId}/result`, { replace: true });
      }
    })();
  }, [user, attemptId, navigate]);

  // Tick every second
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const remaining = useMemo(() => {
    if (!data) return 0;
    return Math.floor((new Date(data.attempt.expires_at).getTime() - now) / 1000);
  }, [data, now]);

  // Auto-submit on expiry
  const finalize = useCallback(
    async (reason: "submitted" | "expired") => {
      if (finalizedRef.current) return;
      finalizedRef.current = true;
      setSubmitting(true);
      const { data: res, error: err } = await supabase.functions.invoke("scholarship-exam", {
        body: { action: "finalize", attempt_id: attemptId, reason },
      });
      setSubmitting(false);
      if (err || (res as any)?.error) {
        finalizedRef.current = false;
        toast({
          variant: "destructive",
          title: "Could not submit",
          description: (res as any)?.error ?? err?.message ?? "Please try again.",
        });
        return;
      }
      navigate(`/scholarship/exam/${attemptId}/result`, { replace: true });
    },
    [attemptId, navigate, toast],
  );

  useEffect(() => {
    if (!data) return;
    if (data.attempt.status !== "in_progress") return;
    if (remaining <= 0 && !finalizedRef.current) {
      finalize("expired");
    }
  }, [remaining, data, finalize]);

  const saveAnswer = async (questionId: string, selectedIndex: number | null) => {
    setSelections((prev) => ({ ...prev, [questionId]: selectedIndex }));
    setSavingId(questionId);
    const { data: res, error: err } = await supabase.functions.invoke("scholarship-exam", {
      body: {
        action: "save_answer",
        attempt_id: attemptId,
        question_id: questionId,
        selected_index: selectedIndex,
      },
    });
    setSavingId(null);
    if (err || (res as any)?.error) {
      toast({
        variant: "destructive",
        title: "Answer not saved",
        description: (res as any)?.error ?? err?.message ?? "Check your connection and try again.",
      });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-scef-gold-dark" />
      </div>
    );
  }
  if (error || !data) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[76px] md:h-[84px]" />
        <div className="container mx-auto px-6 py-16 text-center">
          <AlertTriangle className="mx-auto h-10 w-10 text-destructive" />
          <p className="mt-4 text-lg font-semibold text-scef-blue-darker">
            {error ?? "Exam not available"}
          </p>
          <Button asChild className="mt-6 bg-scef-blue-darker hover:bg-scef-blue">
            <a href="/scholarship/exam">Back to Exam Registration</a>
          </Button>
        </div>
      </div>
    );
  }

  const q = data.questions[current];
  const total = data.questions.length;
  const answeredCount = data.questions.filter((qq) => typeof selections[qq.id] === "number").length;
  const lowTime = remaining <= 60;

  return (
    <>
      <Helmet>
        <title>{data.exam.title} | Exam in Progress</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[76px] md:h-[84px]" />

        {/* Sticky exam bar */}
        <div className="sticky top-[88px] z-30 border-b border-border bg-background/95 backdrop-blur md:top-[96px]">
          <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-6 py-3 md:px-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-scef-gold-dark">
                Exam in progress
              </p>
              <p className="font-display text-sm font-bold text-scef-blue-darker md:text-base">
                {data.exam.title}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:inline-flex">
                <Wifi className="h-3.5 w-3.5" /> Auto-saving
              </span>
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-sm font-bold ${
                  lowTime
                    ? "bg-destructive text-destructive-foreground animate-pulse"
                    : "bg-scef-blue-darker text-scef-gold"
                }`}
                aria-live="polite"
              >
                <Clock className="h-4 w-4" /> {fmt(remaining)}
              </span>
              <Button
                onClick={() => setConfirmSubmit(true)}
                disabled={submitting}
                className="h-9 bg-scef-gold px-4 text-xs font-bold text-[#0A0A0A] hover:bg-scef-gold-hover"
              >
                <Send className="me-1.5 h-3.5 w-3.5" /> Submit
              </Button>
            </div>
          </div>
          {lowTime && (
            <div className="bg-destructive/10 px-6 py-2 text-center text-xs font-semibold text-destructive md:px-8">
              Less than 1 minute remaining — your exam will auto-submit when the timer reaches zero.
            </div>
          )}
          {data.attempt.is_preview && (
            <div className="bg-scef-gold/15 px-6 py-2 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-scef-blue-darker md:px-8">
              Admin Preview Mode · Test attempt — results are not recorded for any applicant
            </div>
          )}
        </div>

        <main className="container mx-auto grid gap-8 px-6 py-10 md:grid-cols-[1fr_280px] md:px-8">
          {/* Question */}
          <section>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
              Question {q.position} of {total}
            </p>
            <h2 className="mt-3 font-display text-xl font-bold leading-snug text-scef-blue-darker md:text-2xl">
              {q.prompt}
            </h2>
            <div className="mt-6 space-y-2.5">
              {q.options.map((opt, i) => {
                const checked = selections[q.id] === i;
                return (
                  <label
                    key={i}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm transition-colors ${
                      checked
                        ? "border-scef-gold bg-scef-gold/10 font-semibold text-scef-blue-darker"
                        : "border-border bg-card hover:border-scef-gold/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      className="sr-only"
                      checked={checked}
                      onChange={() => saveAnswer(q.id, i)}
                    />
                    <span
                      className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                        checked ? "border-scef-gold bg-scef-gold" : "border-muted-foreground/40"
                      }`}
                    >
                      {checked && <Check className="h-3 w-3 text-scef-blue-darker" strokeWidth={3} />}
                    </span>
                    <span className="flex-1">{opt}</span>
                  </label>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                disabled={current === 0}
                className="border-scef-blue-darker text-scef-blue-darker"
              >
                <ChevronLeft className="me-1.5 h-4 w-4" /> Previous
              </Button>
              <span className="text-xs text-muted-foreground">
                {savingId === q.id ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Loader2 className="h-3 w-3 animate-spin" /> Saving…
                  </span>
                ) : selections[q.id] != null ? (
                  <span className="inline-flex items-center gap-1.5 text-scef-gold-dark">
                    <Check className="h-3 w-3" /> Saved
                  </span>
                ) : (
                  "Not answered"
                )}
              </span>
              {current < total - 1 ? (
                <Button
                  onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))}
                  className="bg-scef-blue-darker hover:bg-scef-blue"
                >
                  Next <ChevronRight className="ms-1.5 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={() => setConfirmSubmit(true)}
                  className="bg-scef-gold font-semibold text-[#0A0A0A] hover:bg-scef-gold-hover"
                >
                  Review & Submit <Send className="ms-1.5 h-4 w-4" />
                </Button>
              )}
            </div>
          </section>

          {/* Question palette */}
          <aside className="rounded-2xl border border-border bg-card p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-scef-gold-dark">
              Question Navigator
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {answeredCount}/{total} answered
            </p>
            <div className="mt-4 grid grid-cols-5 gap-2 md:grid-cols-4">
              {data.questions.map((qq, i) => {
                const answered = typeof selections[qq.id] === "number";
                const isCurrent = i === current;
                return (
                  <button
                    key={qq.id}
                    onClick={() => setCurrent(i)}
                    className={`flex h-9 w-9 items-center justify-center rounded-md border text-xs font-bold transition-colors ${
                      isCurrent
                        ? "border-scef-gold bg-scef-gold text-scef-blue-darker"
                        : answered
                          ? "border-scef-gold/40 bg-scef-gold/15 text-scef-blue-darker"
                          : "border-border bg-background text-muted-foreground hover:border-scef-gold/40"
                    }`}
                    aria-label={`Go to question ${qq.position}${answered ? ", answered" : ""}`}
                  >
                    {qq.position}
                  </button>
                );
              })}
            </div>
            <div className="mt-5 space-y-1.5 text-[11px] text-muted-foreground">
              <p className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded bg-scef-gold" /> Current
              </p>
              <p className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded bg-scef-gold/15 ring-1 ring-scef-gold/40" /> Answered
              </p>
              <p className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded border border-border bg-background" /> Unanswered
              </p>
            </div>
          </aside>
        </main>
      </div>

      <AlertDialog open={confirmSubmit} onOpenChange={setConfirmSubmit}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit your exam?</AlertDialogTitle>
            <AlertDialogDescription>
              You've answered {answeredCount} of {total} questions. Once submitted, you cannot change
              your answers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={submitting}>Keep working</AlertDialogCancel>
            <AlertDialogAction
              disabled={submitting}
              onClick={(e) => {
                e.preventDefault();
                finalize("submitted");
              }}
              className="bg-scef-gold font-semibold text-[#0A0A0A] hover:bg-scef-gold-hover"
            >
              {submitting ? (
                <>
                  <Loader2 className="me-2 h-4 w-4 animate-spin" /> Submitting…
                </>
              ) : (
                "Submit final answers"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ExamRunner;
