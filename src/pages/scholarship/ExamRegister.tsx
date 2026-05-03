import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Clock, ListChecks, ShieldCheck, Loader2, Wifi } from "lucide-react";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuthState as useAuth } from "@/hooks/useAuthState";
import { useToast } from "@/hooks/use-toast";
import { SCHOLARSHIP_APP_TYPE } from "@/lib/scholarship";

type Exam = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  duration_minutes: number;
  pass_score_percent: number;
  max_attempts: number;
};

type AttemptRow = {
  id: string;
  exam_id: string;
  status: "in_progress" | "submitted" | "expired";
  expires_at: string;
  score_percent: number | null;
  passed: boolean | null;
};

const ExamRegister = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [exams, setExams] = useState<Exam[]>([]);
  const [attempts, setAttempts] = useState<AttemptRow[]>([]);
  const [hasApplication, setHasApplication] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/auth?redirect=/scholarship/exam");
      return;
    }
    (async () => {
      setLoading(true);
      const [examsRes, attemptsRes, appsRes] = await Promise.all([
        supabase
          .from("scholarship_exams")
          .select("id, slug, title, description, duration_minutes, pass_score_percent, max_attempts")
          .eq("is_published", true)
          .order("created_at", { ascending: false }),
        supabase
          .from("scholarship_exam_attempts")
          .select("id, exam_id, status, expires_at, score_percent, passed")
          .eq("user_id", user.id)
          .order("started_at", { ascending: false }),
        supabase
          .from("applications")
          .select("id")
          .eq("user_id", user.id)
          .eq("application_type", SCHOLARSHIP_APP_TYPE)
          .limit(1),
      ]);
      setExams((examsRes.data ?? []) as Exam[]);
      setAttempts((attemptsRes.data ?? []) as AttemptRow[]);
      setHasApplication((appsRes.data ?? []).length > 0);
      setLoading(false);
    })();
  }, [user, authLoading, navigate]);

  const handleRegister = async (exam: Exam) => {
    if (!hasApplication) {
      toast({
        variant: "destructive",
        title: "Application required",
        description: "Submit your scholarship application before registering for the exam.",
      });
      return;
    }
    setRegistering(exam.id);
    const { data, error } = await supabase.functions.invoke("scholarship-exam", {
      body: { action: "register", exam_slug: exam.slug },
    });
    setRegistering(null);
    if (error || (data as any)?.error) {
      toast({
        variant: "destructive",
        title: "Cannot register",
        description: (data as any)?.error ?? error?.message ?? "Try again shortly.",
      });
      return;
    }
    navigate(`/scholarship/exam/${(data as any).attempt_id}`);
  };

  const attemptsByExam = (examId: string) => attempts.filter((a) => a.exam_id === examId);

  return (
    <>
      <Helmet>
        <title>Scholarship Exam Registration | EduAid-Africa</title>
        <meta name="description" content="Register and sit the EduAid-Africa Scholarship online assessment." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />
        <main className="container mx-auto px-6 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-4xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
              Scholarship Assessment
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-4xl">
              Register for the EduAid Scholarship Exam
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Eligible applicants take a short online assessment as part of the scholarship review.
              The timer starts the moment you begin — answers auto-save, and the exam auto-submits when time runs out.
            </p>

            {!hasApplication && hasApplication !== null && (
              <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive-foreground">
                You haven't submitted a scholarship application yet.{" "}
                <Link to="/scholarship/apply" className="font-semibold underline">
                  Submit your application first
                </Link>{" "}
                to unlock the exam.
              </div>
            )}

            <div className="mt-10 space-y-4">
              {loading ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading exams…
                </div>
              ) : exams.length === 0 ? (
                <p className="text-sm text-muted-foreground">No exams are available right now.</p>
              ) : (
                exams.map((exam) => {
                  const myAttempts = attemptsByExam(exam.id);
                  const live = myAttempts.find(
                    (a) => a.status === "in_progress" && new Date(a.expires_at) > new Date(),
                  );
                  const finalised = myAttempts.find((a) => a.status !== "in_progress");
                  const usedAttempts = myAttempts.filter((a) => a.status !== "in_progress").length;

                  return (
                    <article
                      key={exam.id}
                      className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h2 className="font-display text-xl font-bold text-scef-blue-darker">
                            {exam.title}
                          </h2>
                          {exam.description && (
                            <p className="mt-2 text-sm text-muted-foreground">{exam.description}</p>
                          )}
                          <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wider text-scef-blue-darker">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-scef-gold/15 px-3 py-1.5">
                              <Clock className="h-3.5 w-3.5" /> {exam.duration_minutes} min
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-scef-gold/15 px-3 py-1.5">
                              <ShieldCheck className="h-3.5 w-3.5" /> Pass {exam.pass_score_percent}%
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-scef-gold/15 px-3 py-1.5">
                              <ListChecks className="h-3.5 w-3.5" /> {exam.max_attempts} attempt
                              {exam.max_attempts > 1 ? "s" : ""}
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-scef-gold/15 px-3 py-1.5">
                              <Wifi className="h-3.5 w-3.5" /> Auto-save & low-bandwidth
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {live ? (
                            <Button asChild className="h-11 bg-scef-blue-darker px-6 font-semibold hover:bg-scef-blue">
                              <Link to={`/scholarship/exam/${live.id}`}>
                                Resume Exam <ArrowRight className="ms-2 h-4 w-4" />
                              </Link>
                            </Button>
                          ) : finalised ? (
                            <>
                              <Button asChild variant="outline" className="h-11 border-scef-blue-darker px-6 font-semibold text-scef-blue-darker">
                                <Link to={`/scholarship/exam/${finalised.id}/result`}>View Result</Link>
                              </Button>
                              <p className="text-xs text-muted-foreground">
                                {usedAttempts}/{exam.max_attempts} attempts used
                              </p>
                            </>
                          ) : (
                            <Button
                              onClick={() => handleRegister(exam)}
                              disabled={registering === exam.id || !hasApplication}
                              className="h-11 bg-scef-gold px-6 font-semibold text-[#0A0A0A] hover:bg-scef-gold-hover"
                            >
                              {registering === exam.id ? (
                                <>
                                  <Loader2 className="me-2 h-4 w-4 animate-spin" /> Registering…
                                </>
                              ) : (
                                <>
                                  Register & Start <ArrowRight className="ms-2 h-4 w-4" />
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>

            <div className="mt-10 rounded-xl border border-border bg-card p-5 text-xs text-muted-foreground">
              <p className="font-semibold text-scef-blue-darker">Before you begin</p>
              <ul className="mt-2 list-disc space-y-1 ps-5">
                <li>The timer cannot be paused once your attempt has started.</li>
                <li>Answers save automatically; you can navigate between questions freely.</li>
                <li>If your time expires, the exam is auto-submitted with your saved answers.</li>
                <li>Refreshing or losing internet briefly is safe — your saved answers remain.</li>
              </ul>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ExamRegister;
