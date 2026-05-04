import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ShieldCheck, Sparkles, ArrowLeft, Globe } from "lucide-react";
import type { HoFMedia, HoFProfile } from "@/lib/hallOfFame";

export default function HallOfFameProfile() {
  const { slug } = useParams();
  const [profile, setProfile] = useState<HoFProfile | null>(null);
  const [media, setMedia] = useState<HoFMedia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!slug) return;
      const { data: p } = await supabase
        .from("hall_of_fame_profiles")
        .select("*")
        .eq("slug", slug)
        .eq("status", "approved")
        .eq("consent_public_display", true)
        .maybeSingle();
      if (p) {
        setProfile(p as any);
        const { data: m } = await supabase
          .from("hall_of_fame_media")
          .select("*")
          .eq("profile_id", (p as any).id)
          .order("display_order");
        setMedia((m as any) ?? []);
      }
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />
        <p className="container mx-auto px-6 py-20 text-center text-muted-foreground">Loading profile…</p>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="font-display text-3xl font-bold text-scef-blue-darker">Profile not found</h1>
          <Button asChild className="mt-6"><Link to="/hall-of-fame">Back to Hall of Fame</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  const title = profile.meta_title || `${profile.full_name} — SCEF Hall of Fame`;
  const desc = profile.meta_description || profile.contribution_summary || `${profile.full_name}, ${profile.role} honoured in the SCEF Hall of Fame.`;
  const url = `https://santoscreations.org/hall-of-fame/${profile.slug}`;
  const image = profile.og_image_url || profile.photo_url || "";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.full_name,
    jobTitle: profile.role,
    image: image || undefined,
    nationality: profile.country || undefined,
    description: profile.contribution_summary || undefined,
    url,
    affiliation: { "@type": "Organization", name: "Santos Creations Educational Foundation" },
    sameAs: profile.social_links ? Object.values(profile.social_links).filter(Boolean) : undefined,
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={url} />
        {image && <meta property="og:image" content={image} />}
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />

        <main>
          <section className="bg-scef-blue-darker py-16 text-white md:py-20">
            <div className="container mx-auto px-6 md:px-8">
              <Link to="/hall-of-fame" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-scef-gold">
                <ArrowLeft className="h-4 w-4" /> Hall of Fame
              </Link>
              <div className="mt-8 grid gap-10 md:grid-cols-[280px_1fr] md:items-end">
                <div className="aspect-square overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
                  {profile.photo_url ? (
                    <img src={profile.photo_url} alt={profile.full_name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="font-display text-7xl font-bold text-white/20">
                        {profile.full_name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-scef-gold">{profile.role}</p>
                  <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] md:text-5xl">{profile.full_name}</h1>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {profile.year_start && (
                      <Badge variant="secondary" className="bg-white/10 text-white">
                        {profile.year_start}{profile.year_end && profile.year_end !== profile.year_start ? `–${profile.year_end}` : ""}
                      </Badge>
                    )}
                    {profile.country && <Badge variant="secondary" className="bg-white/10 text-white">{profile.country}</Badge>}
                    {profile.program_supported && <Badge variant="secondary" className="bg-white/10 text-white">{profile.program_supported}</Badge>}
                    {profile.is_verified && (
                      <Badge className="bg-scef-gold text-scef-blue-darker"><ShieldCheck className="me-1 h-3 w-3" /> Verified</Badge>
                    )}
                    {profile.is_featured && (
                      <Badge className="bg-scef-gold text-scef-blue-darker"><Sparkles className="me-1 h-3 w-3" /> Featured</Badge>
                    )}
                    {profile.badge && <Badge className="bg-white text-scef-blue-darker">{profile.badge}</Badge>}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto grid max-w-5xl gap-12 px-6 md:grid-cols-3 md:px-8">
              <div className="md:col-span-2 space-y-10">
                {profile.contribution_summary && (
                  <div>
                    <h2 className="font-display text-xl font-semibold text-scef-blue-darker">Contribution</h2>
                    <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-muted-foreground">
                      {profile.contribution_summary}
                    </p>
                  </div>
                )}
                {profile.testimony && (
                  <div className="rounded-2xl border border-scef-gold/30 bg-scef-gold/[0.04] p-6 md:p-8">
                    <h2 className="font-display text-xl font-semibold text-scef-blue-darker">Testimony</h2>
                    <blockquote className="mt-3 whitespace-pre-line border-l-2 border-scef-gold ps-4 text-base italic leading-relaxed text-foreground">
                      {profile.testimony}
                    </blockquote>
                  </div>
                )}
                {media.length > 0 && (
                  <div>
                    <h2 className="font-display text-xl font-semibold text-scef-blue-darker">Media</h2>
                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {media.map((m) => (
                        <a key={m.id} href={m.media_url} target="_blank" rel="noopener noreferrer" className="block aspect-square overflow-hidden rounded-lg border border-border">
                          {m.media_type === "image" ? (
                            <img src={m.media_url} alt={m.caption ?? ""} loading="lazy" className="h-full w-full object-cover" />
                          ) : (
                            <video src={m.media_url} className="h-full w-full object-cover" muted />
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <aside className="space-y-6">
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Details</h3>
                  <dl className="mt-3 space-y-2 text-sm">
                    {profile.contribution_type && (<div><dt className="text-muted-foreground">Contribution type</dt><dd className="font-medium">{profile.contribution_type}</dd></div>)}
                    {profile.region && (<div><dt className="text-muted-foreground">Region</dt><dd className="font-medium">{profile.region}</dd></div>)}
                    {profile.program_supported && (<div><dt className="text-muted-foreground">Program</dt><dd className="font-medium">{profile.program_supported}</dd></div>)}
                  </dl>
                </div>
                {profile.social_links && Object.keys(profile.social_links).length > 0 && (
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Links</h3>
                    <ul className="mt-3 space-y-2 text-sm">
                      {Object.entries(profile.social_links).map(([k, v]) =>
                        v ? (
                          <li key={k}>
                            <a href={v} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-scef-blue-darker hover:text-scef-gold-dark">
                              <Globe className="h-3.5 w-3.5" /> {k}
                            </a>
                          </li>
                        ) : null
                      )}
                    </ul>
                  </div>
                )}
                <Button asChild className="w-full bg-scef-gold text-scef-blue-darker hover:bg-scef-gold-hover">
                  <Link to="/hall-of-fame/submit">Submit Your Testimony</Link>
                </Button>
              </aside>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
