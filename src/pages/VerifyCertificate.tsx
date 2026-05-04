import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";
import type { HoFProfile } from "@/lib/hallOfFame";
import {
  ShieldCheck,
  ShieldAlert,
  Search,
  Award,
  Printer,
  Share2,
  Copy,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  MapPin,
  Briefcase,
} from "lucide-react";

type Stage = "idle" | "loading" | "verified" | "not_found" | "error";

const BADGE_REGEX = /^SCEF-[A-Z]+-\d{4}-[A-Z0-9]+$/;

export default function VerifyCertificate() {
  const [params, setParams] = useSearchParams();
  const { toast } = useToast();
  const initialCode = (params.get("code") ?? "").toUpperCase();
  const [code, setCode] = useState(initialCode);
  const [stage, setStage] = useState<Stage>("idle");
  const [result, setResult] = useState<HoFProfile | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const isFormatValid = useMemo(() => BADGE_REGEX.test(code.trim()), [code]);

  const runVerification = async (raw: string) => {
    const cleaned = raw.trim().toUpperCase();
    if (!cleaned) return;
    setStage("loading");
    setResult(null);
    setErrorMsg("");
    try {
      const { data, error } = await supabase
        .from("hall_of_fame_profiles")
        .select("*")
        .eq("badge_code", cleaned)
        .eq("status", "approved")
        .eq("consent_public_display", true)
        .maybeSingle();
      if (error) throw error;
      if (data) {
        setResult(data as any);
        setStage("verified");
      } else {
        setStage("not_found");
      }
    } catch (err: any) {
      logger.error("verify-certificate error", err);
      setErrorMsg(err?.message ?? "Something went wrong. Please try again.");
      setStage("error");
    }
  };

  // Auto-verify on deep link load
  useEffect(() => {
    if (initialCode && BADGE_REGEX.test(initialCode)) {
      runVerification(initialCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = code.trim().toUpperCase();
    if (!cleaned) return;
    setParams({ code: cleaned }, { replace: true });
    runVerification(cleaned);
  };

  const reset = () => {
    setStage("idle");
    setResult(null);
    setCode("");
    setErrorMsg("");
    setParams({}, { replace: true });
  };

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/verify-certificate?code=${encodeURIComponent(code.trim().toUpperCase())}`
      : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({ title: "Link copied", description: "Verification link copied to clipboard." });
    } catch {
      toast({ title: "Copy failed", variant: "destructive" });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `SCEF Verified Certificate — ${result?.full_name ?? ""}`,
          text: `Verified SCEF contributor: ${result?.full_name ?? ""}`,
          url: shareUrl,
        });
      } catch {
        /* user cancelled */
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <>
      <Helmet>
        <title>Verify SCEF Certificate — Authenticate Contributor Badges</title>
        <meta
          name="description"
          content="Authenticate any SCEF certificate or contributor badge. Enter a unique badge code (SCEF-ROLE-YEAR-ID) to confirm legitimacy and view the verified public profile."
        />
        <link rel="canonical" href="https://santoscreations.org/verify-certificate" />
        <meta property="og:title" content="Verify SCEF Certificate" />
        <meta
          property="og:description"
          content="Authenticate SCEF volunteer, ambassador, donor and partner certificates."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />

        <main>
          {/* HERO + FORM */}
          <section className="bg-scef-blue-darker py-14 text-white md:py-20 print:hidden">
            <div className="container mx-auto max-w-3xl px-6 text-center md:px-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-scef-gold">
                Trust & Authenticity
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] md:text-5xl">
                Verify an SCEF <span className="text-gradient-gold italic">Certificate</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-white/75">
                Confirm authenticity of any SCEF volunteer, ambassador, donor, or contributor
                certificate by entering the unique badge code printed on it.
              </p>

              <form onSubmit={onSubmit} className="mx-auto mt-8 max-w-xl">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="SCEF-VOLUNTEER-2024-A1B2C3"
                    className="h-12 bg-white/95 font-mono text-scef-blue-darker tracking-wider"
                    aria-label="Badge code"
                    maxLength={64}
                    autoComplete="off"
                  />
                  <Button
                    type="submit"
                    disabled={stage === "loading" || !code.trim()}
                    className="h-12 bg-scef-gold text-scef-blue-darker hover:bg-scef-gold-hover"
                  >
                    <Search className="me-2 h-4 w-4" />
                    {stage === "loading" ? "Checking…" : "Verify"}
                  </Button>
                </div>
                <p className="mt-3 text-xs text-white/60">
                  Format: <span className="font-mono">SCEF-ROLE-YEAR-ID</span>
                  {code && !isFormatValid && (
                    <span className="ms-2 text-scef-gold">
                      • Code format looks unusual — we’ll still try.
                    </span>
                  )}
                </p>
              </form>
            </div>
          </section>

          {/* RESULTS */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto max-w-2xl px-6 md:px-8">
              {stage === "idle" && (
                <Card className="border-dashed">
                  <CardContent className="p-8 text-center">
                    <ShieldCheck className="mx-auto h-10 w-10 text-scef-blue-darker/40" />
                    <h2 className="mt-4 font-display text-xl font-semibold text-scef-blue-darker">
                      Awaiting a badge code
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Enter a code above to verify a certificate. You can also share a direct
                      verification link with anyone:
                      <br />
                      <span className="font-mono text-xs">
                        /verify-certificate?code=SCEF-…
                      </span>
                    </p>
                  </CardContent>
                </Card>
              )}

              {stage === "loading" && (
                <Card>
                  <CardContent className="space-y-4 p-8">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-3 w-1/3" />
                      </div>
                    </div>
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-5/6" />
                    <Skeleton className="h-3 w-4/6" />
                  </CardContent>
                </Card>
              )}

              {stage === "not_found" && (
                <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center">
                  <ShieldAlert className="mx-auto h-10 w-10 text-destructive" />
                  <h2 className="mt-4 font-display text-2xl font-semibold text-scef-blue-darker">
                    Not verified
                  </h2>
                  <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                    No active SCEF certificate matches <span className="font-mono">{code}</span>.
                    Double-check the code, or contact{" "}
                    <a
                      href="mailto:admin@santoscreations.org"
                      className="text-scef-blue-darker underline"
                    >
                      admin@santoscreations.org
                    </a>{" "}
                    if you believe this is an error.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    <Button variant="outline" onClick={reset}>
                      <ArrowLeft className="me-2 h-4 w-4" /> Try another code
                    </Button>
                    <Button asChild className="bg-scef-blue-darker text-white hover:bg-scef-blue-darker/90">
                      <Link to="/contributors">Browse Contributors</Link>
                    </Button>
                  </div>
                </div>
              )}

              {stage === "error" && (
                <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center">
                  <ShieldAlert className="mx-auto h-10 w-10 text-destructive" />
                  <h2 className="mt-4 font-display text-xl font-semibold text-scef-blue-darker">
                    Verification failed
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">{errorMsg}</p>
                  <Button variant="outline" onClick={() => runVerification(code)} className="mt-4">
                    Try again
                  </Button>
                </div>
              )}

              {stage === "verified" && result && (
                <div id="result-card" className="rounded-2xl border-2 border-scef-gold/40 bg-card p-8 shadow-xl">
                  <div className="flex items-center justify-center gap-2 text-scef-gold-dark">
                    <ShieldCheck className="h-12 w-12" />
                  </div>
                  <div className="mt-3 text-center">
                    <Badge className="bg-scef-gold text-scef-blue-darker">
                      <CheckCircle2 className="me-1 h-3 w-3" /> Verified Contributor
                    </Badge>
                  </div>

                  <div className="mt-5 flex flex-col items-center gap-4 text-center">
                    {result.photo_url ? (
                      <img
                        src={result.photo_url}
                        alt={result.full_name}
                        loading="lazy"
                        className="h-24 w-24 rounded-full border-4 border-scef-gold/30 object-cover"
                      />
                    ) : (
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-scef-blue-darker text-2xl font-bold text-white">
                        {result.full_name.charAt(0)}
                      </div>
                    )}

                    <div>
                      <h2 className="font-display text-2xl font-bold text-scef-blue-darker">
                        {result.full_name}
                      </h2>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {result.role}
                      </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                      {result.year_start && (
                        <Badge variant="secondary" className="gap-1">
                          <Calendar className="h-3 w-3" />
                          {result.year_start}
                          {result.year_end && result.year_end !== result.year_start
                            ? `–${result.year_end}`
                            : ""}
                        </Badge>
                      )}
                      {result.country && (
                        <Badge variant="outline" className="gap-1">
                          <MapPin className="h-3 w-3" />
                          {result.country}
                        </Badge>
                      )}
                      {result.program_supported && (
                        <Badge variant="outline" className="gap-1">
                          <Briefcase className="h-3 w-3" />
                          {result.program_supported}
                        </Badge>
                      )}
                      {result.badge && (
                        <Badge className="bg-scef-blue-darker text-white">{result.badge}</Badge>
                      )}
                    </div>

                    {result.contribution_summary && (
                      <p className="max-w-md text-sm text-foreground/80">
                        {result.contribution_summary}
                      </p>
                    )}

                    <div className="mt-2 w-full rounded-lg bg-muted/50 p-3 text-center">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Badge Code
                      </p>
                      <p className="mt-1 font-mono text-sm font-semibold text-scef-blue-darker">
                        {(result as any).badge_code}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap justify-center gap-2 print:hidden">
                    <Button asChild className="bg-scef-blue-darker text-white hover:bg-scef-blue-darker/90">
                      <Link to={`/contributors/${result.slug}`}>
                        <Award className="me-2 h-4 w-4" /> View Public Profile
                      </Link>
                    </Button>
                    <Button variant="outline" onClick={handleShare}>
                      <Share2 className="me-2 h-4 w-4" /> Share
                    </Button>
                    <Button variant="outline" onClick={handleCopyLink}>
                      <Copy className="me-2 h-4 w-4" /> Copy link
                    </Button>
                    <Button variant="outline" onClick={() => window.print()}>
                      <Printer className="me-2 h-4 w-4" /> Print
                    </Button>
                    <Button variant="ghost" onClick={reset}>
                      <ArrowLeft className="me-2 h-4 w-4" /> Verify another
                    </Button>
                  </div>
                </div>
              )}

              {/* Help block */}
              <div className="mt-10 rounded-xl border bg-muted/30 p-6 text-sm text-muted-foreground print:hidden">
                <p className="font-semibold text-scef-blue-darker">Need help?</p>
                <ul className="mt-2 list-disc space-y-1 ps-5">
                  <li>Codes are case-insensitive but must follow the SCEF format.</li>
                  <li>Only approved, publicly-listed contributors can be verified here.</li>
                  <li>
                    For institutional verification letters, email{" "}
                    <a className="underline" href="mailto:admin@santoscreations.org">
                      admin@santoscreations.org
                    </a>
                    .
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
