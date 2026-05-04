import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";
import { HOF_PROGRAMS, HOF_ROLES, HOF_CONTRIBUTION_TYPES, type HoFProfile } from "@/lib/hallOfFame";
import { Award, Search, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

const ALL = "all";

export default function HallOfFame() {
  const [profiles, setProfiles] = useState<HoFProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [year, setYear] = useState(ALL);
  const [role, setRole] = useState(ALL);
  const [country, setCountry] = useState("");
  const [program, setProgram] = useState(ALL);
  const [contribution, setContribution] = useState(ALL);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("hall_of_fame_profiles")
        .select("*")
        .eq("status", "approved")
        .eq("consent_public_display", true)
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false });
      if (error) logger.error("HoF load error", error);
      setProfiles((data as any) ?? []);
      setLoading(false);
    })();
  }, []);

  const years = useMemo(() => {
    const set = new Set<number>();
    profiles.forEach((p) => p.year_start && set.add(p.year_start));
    return Array.from(set).sort((a, b) => b - a);
  }, [profiles]);

  const filtered = useMemo(() => {
    return profiles.filter((p) => {
      if (q && !`${p.full_name} ${p.role} ${p.country ?? ""}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (year !== ALL && p.year_start !== Number(year)) return false;
      if (role !== ALL && p.role !== role) return false;
      if (country && !(p.country ?? "").toLowerCase().includes(country.toLowerCase())) return false;
      if (program !== ALL && p.program_supported !== program) return false;
      if (contribution !== ALL && p.contribution_type !== contribution) return false;
      return true;
    });
  }, [profiles, q, year, role, country, program, contribution]);

  return (
    <>
      <Helmet>
        <title>Meet Our Volunteers & Contributors (2007 – Present) — SCEF</title>
        <meta
          name="description"
          content="Celebrating SCEF volunteers, ambassadors, partners, donors and supporters from 2007 till date — the people behind African education impact."
        />
        <link rel="canonical" href="https://santoscreations.org/hall-of-fame" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />

        <main>
          {/* Hero */}
          <section className="bg-scef-blue-darker py-20 text-white md:py-28">
            <div className="container mx-auto px-6 md:px-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-scef-gold">
                Recognition Wall · Since 2007
              </p>
              <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] md:text-6xl">
                Hall of Fame & <span className="text-gradient-gold italic">Appreciation Wall</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-white/75">
                Celebrating the volunteers, ambassadors, staff, donors, partners and contributors who have powered SCEF's
                mission across Africa from 2007 till date.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-scef-gold text-scef-blue-darker hover:bg-scef-gold-hover">
                  <Link to="/hall-of-fame/submit">
                    Submit Your Testimony <ArrowRight className="ms-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                  <Link to="/get-involved/volunteer">Become a Volunteer</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Filters */}
          <section className="border-b border-border bg-card/50 py-8">
            <div className="container mx-auto px-6 md:px-8">
              <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
                <div className="relative lg:col-span-2">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search name, role…"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger><SelectValue placeholder="Year" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL}>All Years</SelectItem>
                    {years.map((y) => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger><SelectValue placeholder="Role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL}>All Roles</SelectItem>
                    {HOF_ROLES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Input placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                <Select value={program} onValueChange={setProgram}>
                  <SelectTrigger><SelectValue placeholder="Program" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL}>All Programs</SelectItem>
                    {HOF_PROGRAMS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={contribution} onValueChange={setContribution}>
                  <SelectTrigger><SelectValue placeholder="Contribution" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL}>All Types</SelectItem>
                    {HOF_CONTRIBUTION_TYPES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* Grid */}
          <section className="py-16">
            <div className="container mx-auto px-6 md:px-8">
              {loading ? (
                <p className="text-center text-muted-foreground">Loading honourees…</p>
              ) : filtered.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
                  <Award className="mx-auto h-10 w-10 text-scef-gold-dark" />
                  <h3 className="mt-4 font-display text-xl font-semibold text-scef-blue-darker">
                    No honourees match yet
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Be the first to share your SCEF story — submissions are reviewed and verified.
                  </p>
                  <Button asChild className="mt-6 bg-scef-gold text-scef-blue-darker hover:bg-scef-gold-hover">
                    <Link to="/hall-of-fame/submit">Submit Your Testimony</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filtered.map((p) => (
                    <Link
                      key={p.id}
                      to={`/hall-of-fame/${p.slug}`}
                      className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-scef-gold/40 hover:shadow-xl"
                    >
                      <div className="aspect-[4/5] w-full overflow-hidden bg-scef-blue-darker/[0.04]">
                        {p.photo_url ? (
                          <img
                            src={p.photo_url}
                            alt={p.full_name}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <span className="font-display text-5xl font-bold text-scef-blue-darker/20">
                              {p.full_name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-display text-base font-semibold leading-tight text-scef-blue-darker">
                            {p.full_name}
                          </h3>
                          {p.is_verified && (
                            <ShieldCheck className="h-4 w-4 shrink-0 text-scef-gold-dark" aria-label="Verified" />
                          )}
                        </div>
                        <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{p.role}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {p.year_start && (
                            <Badge variant="secondary" className="text-[10px]">
                              {p.year_start}{p.year_end && p.year_end !== p.year_start ? `–${p.year_end}` : ""}
                            </Badge>
                          )}
                          {p.country && <Badge variant="outline" className="text-[10px]">{p.country}</Badge>}
                          {p.is_featured && (
                            <Badge className="bg-scef-gold text-scef-blue-darker text-[10px]">
                              <Sparkles className="me-1 h-2.5 w-2.5" /> Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
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
