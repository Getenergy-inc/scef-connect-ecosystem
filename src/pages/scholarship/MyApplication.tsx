import { useEffect, useState } from "react";
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

  const { data: app, isLoading } = useQuery({
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

  if (authLoading || isLoading) {
    return (
      <div className="grid min-h-screen place-items-center text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const currentStatus = (app?.status || "submitted") as string;
  const currentIndex = Math.max(
    0,
    STATUS_STAGES.findIndex((s) => s.key === currentStatus)
  );
  const payload = (app?.payload || {}) as Record<string, unknown>;
  const profile = (payload.profile || {}) as Record<string, string>;
  const documents = (payload.documents || {}) as Record<string, string>;

  return (
    <>
      <Helmet>
        <title>My Scholarship Application | SCEF</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />

        <main className="container mx-auto max-w-5xl px-6 py-12 md:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
            EduAid-Africa Scholarship · 2026–2027
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-4xl">
            My Application
          </h1>

          {!app ? (
            <div className="mt-8 rounded-2xl border border-border bg-card p-8 text-center">
              <GraduationCap className="mx-auto h-10 w-10 text-scef-gold-dark" />
              <p className="mt-4 font-display text-lg font-bold text-scef-blue-darker">
                You haven't applied yet.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Start your application to track status, documents and disbursement here.
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
                          done
                            ? "border-scef-gold bg-scef-gold/10"
                            : "border-border bg-background"
                        }`}
                      >
                        <div
                          className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                            done
                              ? "bg-scef-blue-darker text-scef-gold"
                              : "bg-muted text-muted-foreground"
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
                    <div><dt className="text-xs uppercase text-muted-foreground">Category</dt><dd className="capitalize">{(payload.category as string) || "—"}</dd></div>
                    <div><dt className="text-xs uppercase text-muted-foreground">Country</dt><dd>{profile.country || "—"}</dd></div>
                    <div className="col-span-2"><dt className="text-xs uppercase text-muted-foreground">Submitted</dt><dd>{app.submitted_at ? new Date(app.submitted_at).toLocaleString() : "—"}</dd></div>
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
                      <li className="text-muted-foreground italic">No documents on file.</li>
                    )}
                    {Object.entries(documents).map(([k, v]) => (
                      <li key={k} className="flex items-center justify-between gap-3">
                        <span className="capitalize text-foreground">{k}</span>
                        <span className="truncate text-xs text-muted-foreground">{v}</span>
                      </li>
                    ))}
                  </ul>
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
                    <Link to="/wallet">Open Wallet <ArrowRight className="ms-2 h-3.5 w-3.5" /></Link>
                  </Button>
                </section>

                <section className="rounded-2xl border border-border bg-card p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Bell className="h-4 w-4 text-scef-gold-dark" />
                    <h3 className="font-display text-base font-bold text-scef-blue-darker">
                      Notifications
                    </h3>
                  </div>
                  <p className="text-sm italic text-muted-foreground">
                    Reporting in progress — review updates will appear here.
                  </p>
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
