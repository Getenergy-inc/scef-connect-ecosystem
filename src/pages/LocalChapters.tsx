import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  MapPin, Users, Search, Filter, Globe, Building, Wifi, ArrowRight, Plus, ShieldCheck, CheckCircle2,
} from "lucide-react";
import { useChapters, CHAPTER_TYPE_LABEL, type ChapterRow } from "@/hooks/useChapters";
import AfricaRegionalMap from "@/components/regions/AfricaRegionalMap";
import { SCEF_BRAND } from "@/data/africaRegions";

const TYPE_ICON = { online: Wifi, hybrid: Globe, physical: Building } as const;

const REGION_ORDER = [
  "North Africa", "West Africa", "East Africa", "Central Africa", "Southern Africa", "Diaspora",
];

const LocalChapters = () => {
  const { data: chapters = [], isLoading } = useChapters();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [regionFilter, setRegionFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    return chapters.filter((c) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q ||
        c.name.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        (c.city ?? "").toLowerCase().includes(q);
      const matchesType = typeFilter === "all" || c.chapter_type === typeFilter;
      const matchesRegion = regionFilter === "all" || c.region === regionFilter;
      return matchesSearch && matchesType && matchesRegion;
    });
  }, [chapters, searchQuery, typeFilter, regionFilter]);

  const regions = useMemo(() => {
    const present = new Set(chapters.map((c) => c.region).filter(Boolean) as string[]);
    return REGION_ORDER.filter((r) => present.has(r));
  }, [chapters]);

  const grouped = useMemo(() => {
    return regions
      .map((region) => ({ region, items: filtered.filter((c) => c.region === region) }))
      .filter((g) => g.items.length > 0);
  }, [regions, filtered]);

  return (
    <>
      <Helmet>
        <title>Local Chapter Services | SCEF Regional Chapters Across Africa and the Diaspora</title>
        <meta
          name="description"
          content="Explore SCEF Local Chapter Services across 8 African regions plus the African Diaspora and Friends of Africa networks, connecting EduAid-Africa, NESA-Africa, Special Needs School nominations, regional voting, GFA Wzip wallets, Rebuild My School Africa, and edu-tourism opportunities."
        />
        <link rel="canonical" href="https://santoscreations.org/chapters" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-16 bg-scef-blue-darker overflow-hidden">
            <div className="absolute inset-0 bg-scef-pattern opacity-10" />
            <div className="container mx-auto px-4 relative z-10 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-medium mb-5">
                <MapPin className="w-3.5 h-3.5" /> SCEF Local Chapter Services
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5">
                Local Chapter <span className="text-scef-gold">Services</span>
              </h1>
              <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
                SCEF Local Chapter Services is the grassroots execution arm of Santos Creations
                Educational Foundation. Local chapters support EduAid-Africa, NESA-Africa,
                Rebuild My School Africa, eLibrary Nigeria, Education Online Africa, Women &amp;
                Girls Education, Special Needs Education Support, training programmes, media
                advocacy, school nominations, regional voting, and community-based education impact.
              </p>
            </div>
          </section>

          {/* Shared ten-region map */}
          <AfricaRegionalMap detailBase="/regions" variant="light" />


          {/* Filters */}
          <section className="border-b bg-background py-6 sticky top-16 z-30">
            <div className="container mx-auto px-4 flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by city, country or chapter name…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-md border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-scef-gold/40"
                />
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <select
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  className="px-3 py-2.5 rounded-md border border-input bg-card text-sm"
                >
                  <option value="all">All regions</option>
                  {regions.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-2.5 rounded-md border border-input bg-card text-sm"
                >
                  <option value="all">All types</option>
                  <option value="online">Online</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="physical">Physical</option>
                </select>
              </div>
            </div>
          </section>

          {/* Grid */}
          <section className="py-14 bg-muted/30">
            <div className="container mx-auto px-4 space-y-12">
              {isLoading && (
                <p className="text-center text-muted-foreground">Loading chapters…</p>
              )}

              {!isLoading && grouped.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-3">No chapters match your filters.</p>
                  <Button variant="outline" onClick={() => { setSearchQuery(""); setTypeFilter("all"); setRegionFilter("all"); }}>
                    Clear filters
                  </Button>
                </div>
              )}

              {grouped.map((g) => (
                <div key={g.region}>
                  <div className="flex items-end justify-between mb-5">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-scef-blue-darker">{g.region}</h2>
                      <p className="text-sm text-muted-foreground">
                        {g.items.length} chapter{g.items.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {g.items.map((c) => <ChapterCard key={c.id} chapter={c} />)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How Local Chapters Work */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-3" style={{ color: SCEF_BRAND.navy }}>
                How Local Chapters Work
              </h2>
              <p className="text-slate-600 mb-8 max-w-3xl">
                SCEF local chapters are not independent franchises. They are licensed local
                execution platforms governed by SCEF through Local Chapter Services and
                compliance oversight.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  "Membership onboarding",
                  "Ambassador coordination",
                  "School nominations",
                  "Community outreach",
                  "EduAid-Africa fundraising support",
                  "NESA-Africa regional advocacy",
                  "Special Needs School identification",
                  "Rebuild My School Africa project follow-up",
                  "eLibrary Nigeria access promotion",
                  "Education Online Africa promotion",
                  "Women & Girls Education advocacy",
                  "Local reporting & impact documentation",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 p-3 rounded-lg border"
                       style={{ borderColor: `${SCEF_BRAND.navy}1f`, backgroundColor: SCEF_BRAND.lightBg }}>
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: SCEF_BRAND.green }} />
                    <span className="text-sm" style={{ color: SCEF_BRAND.navy }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Chapter Development Pathway */}
          <section className="py-16" style={{ backgroundColor: SCEF_BRAND.lightBg }}>
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-8" style={{ color: SCEF_BRAND.navy }}>
                Local Chapter Development Pathway
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    stage: "Stage 1",
                    title: "Online Local Chapter",
                    items: [
                      "Minimum 5 verified core members",
                      "1 Local Chapter President nominee",
                      "1 Compliance Focal Person",
                      "Verified digital registration",
                      "At least 3 documented activities",
                      "Participation in 1+ SCEF programme",
                      "Governance, safeguarding, ethics & reporting orientation",
                      "Min. 6 months active performance before hybrid upgrade",
                    ],
                  },
                  {
                    stage: "Stage 2",
                    title: "Hybrid Local Chapter",
                    items: [
                      "Minimum 25 active members",
                      "Minimum 5 trained ambassadors",
                      "3-member Chapter Advisory Panel",
                      "Verified physical meeting space or shared office",
                      "Clean reporting and compliance history",
                      "1+ completed and verified local education project",
                      "Approval from SCEF HQ via LCS and SOBCD compliance review",
                    ],
                  },
                  {
                    stage: "Stage 3",
                    title: "Full Physical Local Chapter",
                    items: [
                      "Sustained performance",
                      "Clean audits",
                      "Stable leadership",
                      "Verified community impact",
                      "Strong membership base",
                      "Capacity to manage multi-programme projects",
                      "Approval by SCEF governance structure",
                    ],
                  },
                ].map((s) => (
                  <div key={s.title} className="rounded-2xl bg-white border p-5"
                       style={{ borderColor: `${SCEF_BRAND.navy}1f` }}>
                    <span className="text-[11px] font-bold uppercase tracking-wider"
                          style={{ color: SCEF_BRAND.goldDeep }}>{s.stage}</span>
                    <h3 className="font-display text-lg font-bold mt-1 mb-3" style={{ color: SCEF_BRAND.navy }}>
                      {s.title}
                    </h3>
                    <ul className="space-y-1.5">
                      {s.items.map((i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: SCEF_BRAND.green }} />
                          <span>{i}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Compliance note */}
          <section className="py-12">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="rounded-2xl p-6 border flex items-start gap-3"
                   style={{ backgroundColor: SCEF_BRAND.navy, borderColor: `${SCEF_BRAND.gold}55` }}>
                <ShieldCheck className="w-5 h-5 mt-0.5 shrink-0" style={{ color: SCEF_BRAND.gold }} />
                <p className="text-sm text-white/85 leading-relaxed">
                  All regional fundraising, sponsorship, donation, wallet activity,
                  school nominations, regional voting, and local chapter activities are
                  governed by SCEF/NESA-Africa compliance, safeguarding, data protection,
                  and financial accountability standards. Local chapters cannot
                  independently raise funds, sign contracts, use the SCEF name, or operate
                  wallets outside approved SCEF governance and compliance procedures.
                </p>
              </div>
            </div>
          </section>



          {/* Start a chapter CTA */}
          <section className="py-16 bg-scef-blue-darker">
            <div className="container mx-auto px-4 max-w-3xl text-center">
              <h2 className="font-display text-3xl font-bold text-white mb-4">
                Don't see a chapter in your area?
              </h2>
              <p className="text-white/75 mb-7">
                Apply to lead a new SCEF chapter in your country or city. New chapters are reviewed
                by SOBCD, onboarded by LCS and integrated with the Board of Directors for regional oversight.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild className="bg-scef-gold text-scef-blue-darker hover:bg-scef-gold/90">
                  <Link to="/chapters/start"><Plus className="w-4 h-4 mr-2" />Start a chapter</Link>
                </Button>
                <Button asChild variant="outline" className="border-white/40 text-white hover:bg-white/10">
                  <Link to="/chapters/join-online">Join the online chapter</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

function ChapterCard({ chapter }: { chapter: ChapterRow }) {
  const TypeIcon = TYPE_ICON[chapter.chapter_type];
  const typeLabel = CHAPTER_TYPE_LABEL[chapter.chapter_type];
  const location = [chapter.city, chapter.country].filter(Boolean).join(", ");

  return (
    <article className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:border-scef-gold/40 hover:shadow-md transition-all">
      <Link to={`/chapters/${chapter.slug}`} className="block relative h-40 overflow-hidden bg-muted">
        {chapter.image_url && (
          <img
            src={chapter.image_url}
            alt={chapter.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-background/95 px-2.5 py-1 text-[11px] font-semibold text-scef-blue-darker shadow">
          <TypeIcon className="w-3 h-3" /> {typeLabel}
        </span>
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-lg font-bold text-scef-blue-darker mb-1">
          <Link to={`/chapters/${chapter.slug}`} className="hover:text-scef-gold-dark">{chapter.name}</Link>
        </h3>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
          <MapPin className="w-3.5 h-3.5" /> {location}
        </p>
        {chapter.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{chapter.description}</p>
        )}
        <div className="mt-auto flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs italic text-muted-foreground">
            <Users className="w-3.5 h-3.5" /> Reporting in progress
          </span>
          <Button size="sm" variant="ghost" asChild className="text-scef-blue-darker hover:text-scef-gold-dark">
            <Link to={`/chapters/${chapter.slug}`}>View <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

export default LocalChapters;
