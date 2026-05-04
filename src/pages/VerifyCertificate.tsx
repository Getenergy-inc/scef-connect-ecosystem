import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";
import type { HoFProfile } from "@/lib/hallOfFame";
import { ShieldCheck, ShieldAlert, Search, Award } from "lucide-react";

export default function VerifyCertificate() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<HoFProfile | null | undefined>(undefined);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setResult(undefined);
    try {
      const { data, error } = await supabase
        .from("hall_of_fame_profiles")
        .select("*")
        .eq("badge_code", code.trim().toUpperCase())
        .eq("status", "approved")
        .eq("consent_public_display", true)
        .maybeSingle();
      if (error) throw error;
      setResult((data as any) ?? null);
    } catch (err) {
      logger.error("verify-certificate error", err);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Verify Certificate — SCEF</title>
        <meta
          name="description"
          content="Verify the authenticity of an SCEF contributor, volunteer, intern or ambassador certificate by entering the unique badge code."
        />
        <link rel="canonical" href="https://santoscreations.org/verify-certificate" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />

        <main>
          <section className="bg-scef-blue-darker py-16 text-white md:py-24">
            <div className="container mx-auto max-w-3xl px-6 text-center md:px-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-scef-gold">
                Trust & Authenticity
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] md:text-5xl">
                Verify an SCEF <span className="text-gradient-gold italic">Certificate</span>
              </h1>
              <p className="mt-5 text-white/75">
                Enter the badge code printed on the certificate (format: <span className="font-mono">SCEF-ROLE-YEAR-ID</span>)
                to confirm authenticity.
              </p>

              <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-xl gap-2">
                <Input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g. SCEF-VOLUNTEER-2024-A1B2C3"
                  className="bg-white/95 text-scef-blue-darker"
                  aria-label="Badge code"
                />
                <Button type="submit" disabled={loading} className="bg-scef-gold text-scef-blue-darker hover:bg-scef-gold-hover">
                  <Search className="me-2 h-4 w-4" />
                  {loading ? "Checking…" : "Verify"}
                </Button>
              </form>
            </div>
          </section>

          <section className="py-12 md:py-16">
            <div className="container mx-auto max-w-2xl px-6 md:px-8">
              {result === undefined ? null : result === null ? (
                <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center">
                  <ShieldAlert className="mx-auto h-10 w-10 text-destructive" />
                  <h2 className="mt-4 font-display text-2xl font-semibold text-scef-blue-darker">Not verified</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    No active SCEF certificate matches this badge code. Please double-check the code.
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-scef-gold/30 bg-card p-8 text-center shadow-lg">
                  <ShieldCheck className="mx-auto h-12 w-12 text-scef-gold-dark" />
                  <Badge className="mt-4 bg-scef-gold text-scef-blue-darker">Verified Contributor</Badge>
                  <h2 className="mt-3 font-display text-2xl font-bold text-scef-blue-darker">{result.full_name}</h2>
                  <p className="mt-1 text-sm uppercase tracking-wider text-muted-foreground">{result.role}</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {result.year_start && <Badge variant="secondary">{result.year_start}{result.year_end && result.year_end !== result.year_start ? `–${result.year_end}` : ""}</Badge>}
                    {result.country && <Badge variant="outline">{result.country}</Badge>}
                    {result.program_supported && <Badge variant="outline">{result.program_supported}</Badge>}
                  </div>
                  {result.contribution_summary && (
                    <p className="mt-5 text-sm text-foreground/80">{result.contribution_summary}</p>
                  )}
                  <p className="mt-6 font-mono text-xs text-muted-foreground">{(result as any).badge_code}</p>
                  <Button asChild className="mt-6 bg-scef-blue-darker text-white hover:bg-scef-blue-darker/90">
                    <Link to={`/contributors/${result.slug}`}>
                      <Award className="me-2 h-4 w-4" /> View Public Profile
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
