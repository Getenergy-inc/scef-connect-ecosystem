import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  FileText,
  Loader2,
  Wallet,
  Bell,
  GraduationCap,
  ClipboardCheck,
  CalendarClock,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { SCHOLARSHIP_APP_TYPE } from "@/lib/scholarship";

const STATUS_STAGES = [
  { key: "submitted", label: "Submitted" },
  { key: "under_review", label: "Under Review" },
  { key: "shortlisted", label: "Shortlisted" },
  { key: "approved", label: "Approved" },
  { key: "disbursed", label: "Disbursed" },
] as const;

type ExamAttempt = {
  id: string;
  status: "in_progress" | "submitted" | "expired";
  started_at: string;
  expires_at: string;
  submitted_at: string | null;
  score_percent: number | null;
  passed: boolean | null;
  exam: { title: string; pass_score_percent: number } | null;
};

type Notification = {
  id: string;
  at: string;
  title: string;
  detail?: string;
  tone: "info" | "success" | "warning" | "danger";
};

const MyApplication = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id ?? null);
      setAuthLoading(false);
      if (!session?.user) navigate("/auth?redirect=/scholarship/my-application", { replace: true });
    });
  }, [navigate]);

  const { data: app, isLoading: appLoading } = useQuery({
    enabled: !!userId,
    queryKey: ["my-scholarship", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", userId!)
        .eq("application_type", SCHOLARSHIP_APP_TYPE)
        .order("submitted_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: attempts = [], isLoading: attemptsLoading } = useQuery({
    enabled: !!userId,
    queryKey: ["my-scholarship-exams", userId],
    queryFn: async (): Promise<ExamAttempt[]> => {
      const { data, error } = await supabase
        .from("scholarship_exam_attempts")
        .select(
          "id, status, started_at, expires_at, submitted_at, score_percent, passed, exam:scholarship_exams(title, pass_score_percent)",
        )
        .eq("user_id", userId!)
        .order("started_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as ExamAttempt[];
    },
  });

  const payload = (app?.payload || {}) as Record<string, unknown>;
  const profile = (payload.profile || {}) as Record<string, string>;
  const documents = (payload.documents || {}) as Record<string, string>;
  const interview = (payload.interview || {}) as {
    status?: string;
    scheduled_at?: string;
    location?: string;
    notes?: string;
  };

  const notifications = useMemo<Notification[]>(() => {
    const list: Notification[] = [];
    if (app?.submitted_at) {
      list.push({
        id: `app-submitted-${app.id}`,
        at: app.submitted_at,
        title: "Application submitted",
        detail: "Your scholarship application is in the queue for review.",
        tone: "success",
      });
    }
    if (app?.reviewed_at) {
      list.push({
        id: `app-reviewed-${app.id}`,
        at: app.reviewed_at,
        title: `Application status: ${app.status}`,
        detail: app.notes ?? undefined,
        tone: app.status === "approved" || app.status === "disbursed" ? "success" : "info",
      });
    }
    for (const a of attempts) {
      list.push({
        id: `exam-start-${a.id}`,
        at: a.started_at,
        title: `Exam started · ${a.exam?.title ?? "Scholarship exam"}`,
        tone: "info",
      });
      if (a.submitted_at) {
        const passed = a.passed === true;
        list.push({
          id: `exam-end-${a.id}`,
          at: a.submitted_at,
          title:
            a.status === "expired"
              ? `Exam auto-submitted on expiry · ${a.score_percent ?? 0}%`
              : `Exam submitted · ${a.score_percent ?? 0}%`,
          detail: passed ? "Pass mark achieved." : "Result recorded — review committee decides next steps.",
          tone: a.status === "expired" ? "warning" : passed ? "success" : "info",
        });
      }
    }
    if (interview.scheduled_at) {
      list.push({
        id: "interview-sched",
        at: interview.scheduled_at,
        title: "Interview scheduled",
        detail: interview.location ?? undefined,
        tone: "info",
      });
    }
    return list.sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());
  }, [app, attempts, interview]);

  if (authLoading || appLoading) {
    return (
      <div className="grid min-h-screen place-items-center text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const currentStatus = (app?.status || "submitted") as string;
  const currentIndex = Math.max(0, STATUS_STAGES.findIndex((s) => s.key === currentStatus));
  const latestAttempt = attempts[0] ?? null;
  const liveAttempt =
    attempts.find((a) => a.status === "in_progress" && new Date(a.expires_at) > new Date()) ?? null;

  return (
    <>
      <Helmet>
        <title>My Scholarship Application | SCEF</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[76px] md:h-[84px]" />

        <main className="container mx-auto max-w-6xl px-6 py-12 md:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
            EduAid-Africa Scholarship · 2026–2027
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-4xl">
            My Application Dashboard
          </h1>

          {!app ? (
            <div className="mt-8 rounded-2xl border border-border bg-card p-8 text-center">
              <GraduationCap className="mx-auto h-10 w-10 text-scef-gold-dark" />
              <p className="mt-4 font-display text-lg font-bold text-scef-blue-darker">
                You haven't applied yet.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Start your application to track status, documents, exam and disbursement here.
              </p>
              <Button asChild className="mt-6 bg-scef-gold text-scef-blue-darker hover:bg-scef-gold-hover">
                <Link to="/scholarship/apply">
                  Apply now <ArrowRight className="ms-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Status pipeline */}
              <div className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <ClipboardList className="h-5 w-5 text-scef-gold-dark" />
                  <h2 className="font-display text-lg font-bold text-scef-blue-darker">
                    Application Status
                  </h2>
                </div>
                <ol className="grid grid-cols-1 gap-3 sm:grid-cols-5">
                  {STATUS_STAGES.map((s, i) => {
                    const done = i <= currentIndex;
                    return (
                      <li
                        key={s.key}
                        className={`rounded-xl border p-4 text-center ${
                          done ? "border-scef-gold bg-scef-gold/10" : "border-border bg-background"
                        }`}
                      >
                        <div
                          className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                            done ? "bg-scef-blue-darker text-scef-gold" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {i + 1}
                        </div>
                        <p
                          className={`mt-2 text-xs font-semibold ${
                            done ? "text-scef-blue-darker" : "text-muted-foreground"
                          }`}
                        >
                          {s.label}
                        </p>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Details grid */}
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <section className="rounded-2xl border border-border bg-card p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-scef-gold-dark" />
                    <h3 className="font-display text-base font-bold text-scef-blue-darker">
                      Application Details
                    </h3>
                  </div>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    <div>
                      <dt className="text-xs uppercase text-muted-foreground">Category</dt>
                      <dd className="capitalize">{(payload.category as string) || "—"}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase text-muted-foreground">Country</dt>
                      <dd>{profile.country || "—"}</dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-xs uppercase text-muted-foreground">Submitted</dt>
                      <dd>{app.submitted_at ? new Date(app.submitted_at).toLocaleString() : "—"}</dd>
                    </div>
                  </dl>
                </section>

                <section className="rounded-2xl border border-border bg-card p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-scef-gold-dark" />
                    <h3 className="font-display text-base font-bold text-scef-blue-darker">
                      Documents
                    </h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {Object.keys(documents).length === 0 && (
                      <li className="italic text-muted-foreground">No documents on file.</li>
                    )}
                    {Object.entries(documents).map(([k, v]) => (
                      <li key={k} className="flex items-center justify-between gap-3">
                        <span className="capitalize text-foreground">{k.replace(/_/g, " ")}</span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-scef-gold/15 px-2 py-0.5 text-[11px] font-bold text-scef-gold-dark">
                          <CheckCircle2 className="h-3 w-3" /> Uploaded
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Online Exam */}
                <section className="rounded-2xl border border-border bg-card p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <ClipboardCheck className="h-4 w-4 text-scef-gold-dark" />
                    <h3 className="font-display text-base font-bold text-scef-blue-darker">
                      Online Exam
                    </h3>
                  </div>

                  {attemptsLoading ? (
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading attempts…
                    </p>
                  ) : !latestAttempt ? (
                    <>
                      <p className="text-sm text-muted-foreground">
                        You haven't started the scholarship assessment yet.
                      </p>
                      <Button
                        asChild
                        size="sm"
                        className="mt-4 bg-scef-blue-darker hover:bg-scef-blue"
                      >
                        <Link to="/scholarship/exam">
                          Register for Exam <ArrowRight className="ms-2 h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-3 text-sm">
                      <p className="font-semibold text-scef-blue-darker">
                        {latestAttempt.exam?.title ?? "Scholarship exam"}
                      </p>
                      {liveAttempt ? (
                        <>
                          <p className="inline-flex items-center gap-1.5 rounded-full bg-scef-gold/15 px-3 py-1 text-xs font-bold text-scef-gold-dark">
                            <Clock className="h-3 w-3" /> In progress · expires{" "}
                            {new Date(liveAttempt.expires_at).toLocaleTimeString()}
                          </p>
                          <Button asChild size="sm" className="bg-scef-gold text-scef-blue-darker hover:bg-scef-gold-hover">
                            <Link to={`/scholarship/exam/${liveAttempt.id}`}>
                              Resume Exam <ArrowRight className="ms-2 h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                                latestAttempt.passed
                                  ? "bg-scef-gold/15 text-scef-gold-dark"
                                  : latestAttempt.status === "expired"
                                    ? "bg-destructive/10 text-destructive"
                                    : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {latestAttempt.passed ? (
                                <CheckCircle2 className="h-3 w-3" />
                              ) : latestAttempt.status === "expired" ? (
                                <XCircle className="h-3 w-3" />
                              ) : (
                                <CheckCircle2 className="h-3 w-3" />
                              )}
                              {latestAttempt.passed
                                ? "Passed"
                                : latestAttempt.status === "expired"
                                  ? "Auto-submitted"
                                  : "Submitted"}{" "}
                              · {latestAttempt.score_percent ?? 0}%
                            </span>
                            {latestAttempt.submitted_at && (
                              <span className="text-xs text-muted-foreground">
                                {new Date(latestAttempt.submitted_at).toLocaleString()}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button asChild size="sm" variant="outline">
                              <Link to={`/scholarship/exam/${latestAttempt.id}/result`}>
                                View Result
                              </Link>
                            </Button>
                            <Button asChild size="sm" variant="ghost" className="text-scef-blue-darker">
                              <Link to="/scholarship/exam">All Exams</Link>
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </section>

                {/* Interview */}
                <section className="rounded-2xl border border-border bg-card p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <CalendarClock className="h-4 w-4 text-scef-gold-dark" />
                    <h3 className="font-display text-base font-bold text-scef-blue-darker">
                      Interview
                    </h3>
                  </div>
                  {interview.scheduled_at ? (
                    <div className="space-y-2 text-sm">
                      <p className="font-semibold text-scef-blue-darker">
                        {new Date(interview.scheduled_at).toLocaleString()}
                      </p>
                      {interview.location && (
                        <p className="text-muted-foreground">{interview.location}</p>
                      )}
                      {interview.status && (
                        <span className="inline-flex rounded-full bg-scef-gold/15 px-3 py-1 text-xs font-bold text-scef-gold-dark">
                          {interview.status}
                        </span>
                      )}
                      {interview.notes && (
                        <p className="text-xs text-muted-foreground">{interview.notes}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm italic text-muted-foreground">
                      No interview scheduled yet — shortlisted applicants are contacted directly.
                    </p>
                  )}
                </section>

                <section className="rounded-2xl border border-border bg-card p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-scef-gold-dark" />
                    <h3 className="font-display text-base font-bold text-scef-blue-darker">
                      EduAid Wallet
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Disbursement, AGC balance and exam payment records are tracked in your wallet.
                  </p>
                  <Button asChild size="sm" variant="outline" className="mt-4">
                    <Link to="/wallet">
                      Open Wallet <ArrowRight className="ms-2 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </section>

                {/* Notifications — full width on md+ */}
                <section className="rounded-2xl border border-border bg-card p-6 md:col-span-2">
                  <div className="mb-4 flex items-center gap-2">
                    <Bell className="h-4 w-4 text-scef-gold-dark" />
                    <h3 className="font-display text-base font-bold text-scef-blue-darker">
                      Notifications
                    </h3>
                  </div>
                  {notifications.length === 0 ? (
                    <p className="text-sm italic text-muted-foreground">
                      No updates yet — you'll see status changes, exam events and interview invites here.
                    </p>
                  ) : (
                    <ol className="space-y-3">
                      {notifications.map((n) => {
                        const Icon =
                          n.tone === "success"
                            ? CheckCircle2
                            : n.tone === "warning"
                              ? AlertCircle
                              : n.tone === "danger"
                                ? XCircle
                                : Bell;
                        const dot =
                          n.tone === "success"
                            ? "bg-scef-gold"
                            : n.tone === "warning"
                              ? "bg-amber-500"
                              : n.tone === "danger"
                                ? "bg-destructive"
                                : "bg-scef-blue-darker";
                        return (
                          <li
                            key={n.id}
                            className="flex items-start gap-3 rounded-xl border border-border bg-background p-3"
                          >
                            <span
                              className={`mt-1 inline-flex h-2 w-2 shrink-0 rounded-full ${dot}`}
                              aria-hidden
                            />
                            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-scef-gold-dark" />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold text-scef-blue-darker">{n.title}</p>
                              {n.detail && (
                                <p className="mt-0.5 text-xs text-muted-foreground">{n.detail}</p>
                              )}
                            </div>
                            <span className="shrink-0 text-[11px] text-muted-foreground">
                              {new Date(n.at).toLocaleString()}
                            </span>
                          </li>
                        );
                      })}
                    </ol>
                  )}
                </section>
              </div>
            </>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default MyApplication;
