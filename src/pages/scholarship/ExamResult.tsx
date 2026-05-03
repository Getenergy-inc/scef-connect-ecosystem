import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, Clock, Loader2, XCircle, ArrowRight } from "lucide-react";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

type AttemptResult = {
  id: string;
  status: "in_progress" | "submitted" | "expired";
  submitted_at: string | null;
  score_percent: number | null;
  score_points: number | null;
  total_points: number | null;
  passed: boolean | null;
};

const ExamResult = () => {
  const { attemptId = "" } = useParams();
  const { user, loading: authLoading } = useAuth();
  const [attempt, setAttempt] = useState<AttemptResult | null>(null);
  const [examTitle, setExamTitle] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user) return;
    (async () => {
      setLoading(true);
      const { data: a } = await supabase
        .from("scholarship_exam_attempts")
        .select("id, status, submitted_at, score_percent, score_points, total_points, passed, exam_id")
        .eq("id", attemptId)
        .maybeSingle();
      if (a) {
        setAttempt(a as any);
        const { data: e } = await supabase
          .from("scholarship_exams")
          .select("title")
          .eq("id", (a as any).exam_id)
          .maybeSingle();
        setExamTitle(e?.title ?? "Scholarship Exam");
      }
      setLoading(false);
    })();
  }, [attemptId, user, authLoading]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-scef-gold-dark" />
      </div>
    );
  }
  if (!attempt) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />
        <div className="container mx-auto px-6 py-20 text-center">
          <p className="text-lg font-semibold text-scef-blue-darker">Result not found.</p>
          <Button asChild className="mt-6 bg-scef-blue-darker hover:bg-scef-blue">
            <Link to="/scholarship/exam">Back to Exams</Link>
          </Button>
        </div>
      </div>
    );
  }

  const passed = attempt.passed === true;
  const expired = attempt.status === "expired";
  const Icon = passed ? CheckCircle2 : XCircle;
  const accent = passed ? "text-scef-gold-dark" : "text-destructive";

  return (
    <>
      <Helmet>
        <title>Exam Result | EduAid-Africa</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />
        <main className="container mx-auto px-6 py-16 md:px-8">
          <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm md:p-12">
            <Icon className={`mx-auto h-14 w-14 ${accent}`} strokeWidth={1.6} />
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
              {expired ? "Auto-submitted on expiry" : "Submitted"}
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-4xl">
              {passed ? "You passed the assessment" : "Result recorded"}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">{examTitle}</p>

            <div className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-background p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Score
                </p>
                <p className="mt-1 font-display text-3xl font-bold text-scef-blue-darker">
                  {attempt.score_percent ?? 0}
                  <span className="text-base text-muted-foreground">%</span>
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Points
                </p>
                <p className="mt-1 font-display text-3xl font-bold text-scef-blue-darker">
                  {attempt.score_points ?? 0}
                  <span className="text-base text-muted-foreground">/{attempt.total_points ?? 0}</span>
                </p>
              </div>
            </div>

            {expired && (
              <div className="mx-auto mt-6 flex max-w-md items-start gap-2 rounded-lg bg-scef-gold/10 p-3 text-left text-xs text-scef-blue-darker">
                <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-scef-gold-dark" />
                <span>Your time expired and the exam was auto-submitted with your saved answers.</span>
              </div>
            )}

            <p className="mt-8 text-sm text-muted-foreground">
              Your result has been recorded against your scholarship application. Final selection
              decisions are made by the EduAid review committee.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild className="h-11 bg-scef-gold px-6 font-semibold text-[#0A0A0A] hover:bg-scef-gold-hover">
                <Link to="/scholarship/my-application">
                  View My Application <ArrowRight className="ms-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-11 border-scef-blue-darker px-6 font-semibold text-scef-blue-darker">
                <Link to="/scholarship/exam">Back to Exams</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ExamResult;
