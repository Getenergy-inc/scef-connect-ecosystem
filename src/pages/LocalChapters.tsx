import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  MapPin, Users, Search, Filter, Globe, Building, Wifi, ArrowRight, Plus, ShieldCheck, CheckCircle2,
  Heart, MessageCircle, Wallet, GraduationCap, Trophy, ChevronDown,
} from "lucide-react";
import { useChapters, CHAPTER_TYPE_LABEL, type ChapterRow } from "@/hooks/useChapters";
import AfricaRegionalMap from "@/components/regions/AfricaRegionalMap";
import { SCEF_BRAND } from "@/data/africaRegions";
import {
  SCEF_REGIONS, countriesForRegion, countrySlug, SOPHIA_WHATSAPP_LOCAL_CHAPTER,
  type ScefRegion,
} from "@/data/scefRegions";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const TYPE_ICON = { online: Wifi, hybrid: Globe, physical: Building } as const;

const SCOPE_BADGE: Record<ScefRegion["scope"], string> = {
  "African Region": "bg-scef-gold/20 text-scef-blue-darker border-scef-gold/40",
  "Cross-Regional": "bg-emerald-50 text-emerald-800 border-emerald-300",
  "Global Network": "bg-sky-50 text-sky-800 border-sky-300",
};

const REGION_ORDER = [
  "North Africa", "West Africa", "Central Africa", "East Africa", "Southern Africa",
  "Sahel Region", "Horn of Africa", "Indian Ocean",
  "Diaspora / Global Africa", "Friends of Africa",
  "Europe", "North America", "Latin America & Caribbean", "Middle East", "Asia-Pacific", "Oceania",
];

type OnlineChapter = { name: string; coverage: string; status: "Active" | "Forming" | "Open" };
type OnlineRegion = { region: string; scope: "African Region" | "Global Network" | "Other Continent"; chapters: OnlineChapter[] };

const ONLINE_CHAPTERS_NETWORK: OnlineRegion[] = [
  // 8 African regions
  { region: "North Africa", scope: "African Region", chapters: [
    { name: "North Africa Online Chapter", coverage: "Egypt · Libya · Tunisia · Algeria · Morocco · Western Sahara", status: "Forming" },
  ]},
  { region: "West Africa", scope: "African Region", chapters: [
    { name: "West Africa Online Chapter", coverage: "Nigeria · Ghana · Senegal · Côte d'Ivoire · Liberia · Sierra Leone · The Gambia · Guinea · Guinea-Bissau · Togo · Benin · Cabo Verde", status: "Active" },
  ]},
  { region: "Central Africa", scope: "African Region", chapters: [
    { name: "Central Africa Online Chapter", coverage: "Cameroon · DR Congo · Republic of Congo · Gabon · CAR · Equatorial Guinea · São Tomé & Príncipe · Chad", status: "Forming" },
  ]},
  { region: "East Africa", scope: "African Region", chapters: [
    { name: "East Africa Online Chapter", coverage: "Kenya · Uganda · Tanzania · Rwanda · Burundi · South Sudan", status: "Active" },
  ]},
  { region: "Southern Africa", scope: "African Region", chapters: [
    { name: "Southern Africa Online Chapter", coverage: "South Africa · Namibia · Botswana · Zimbabwe · Zambia · Malawi · Mozambique · Lesotho · Eswatini · Angola", status: "Active" },
  ]},
  { region: "Sahel Region", scope: "African Region", chapters: [
    { name: "Sahel Online Chapter", coverage: "Mali · Burkina Faso · Niger · Mauritania · Chad (Sahel belt)", status: "Forming" },
  ]},
  { region: "Horn of Africa", scope: "African Region", chapters: [
    { name: "Horn of Africa Online Chapter", coverage: "Ethiopia · Eritrea · Djibouti · Somalia · Somaliland", status: "Forming" },
  ]},
  { region: "Indian Ocean", scope: "African Region", chapters: [
    { name: "Indian Ocean Islands Online Chapter", coverage: "Madagascar · Mauritius · Seychelles · Comoros", status: "Forming" },
  ]},
  // Global African networks
  { region: "Diaspora / Global Africa", scope: "Global Network", chapters: [
    { name: "African Diaspora Online Chapter", coverage: "African heritage communities worldwide", status: "Active" },
  ]},
  { region: "Friends of Africa", scope: "Global Network", chapters: [
    { name: "Friends of Africa Online Chapter", coverage: "Global allies supporting African education", status: "Open" },
  ]},
  // Other continents
  { region: "Europe", scope: "Other Continent", chapters: [
    { name: "Europe Online Chapter", coverage: "UK · Ireland · France · Germany · Belgium · Netherlands · Italy · Spain · Portugal · Nordics · Eastern Europe", status: "Forming" },
  ]},
  { region: "North America", scope: "Other Continent", chapters: [
    { name: "North America Online Chapter", coverage: "United States · Canada · Mexico", status: "Forming" },
  ]},
  { region: "Latin America & Caribbean", scope: "Other Continent", chapters: [
    { name: "Latin America & Caribbean Online Chapter", coverage: "Brazil · Argentina · Colombia · Jamaica · Trinidad & Tobago · Haiti · Cuba · wider LAC", status: "Open" },
  ]},
  { region: "Middle East", scope: "Other Continent", chapters: [
    { name: "Middle East Online Chapter", coverage: "UAE · Saudi Arabia · Qatar · Kuwait · Bahrain · Oman · Jordan · Lebanon · Türkiye", status: "Open" },
  ]},
  { region: "Asia-Pacific", scope: "Other Continent", chapters: [
    { name: "Asia-Pacific Online Chapter", coverage: "China · India · Japan · South Korea · Singapore · Malaysia · Indonesia · Philippines · Thailand", status: "Open" },
  ]},
  { region: "Oceania", scope: "Other Continent", chapters: [
    { name: "Oceania Online Chapter", coverage: "Australia · New Zealand · Pacific Islands", status: "Open" },
  ]},
];

const SCOPE_TONE: Record<OnlineRegion["scope"], string> = {
  "African Region": "bg-scef-gold/15 text-scef-blue-darker border-scef-gold/40",
  "Global Network": "bg-emerald-50 text-emerald-800 border-emerald-300",
  "Other Continent": "bg-sky-50 text-sky-800 border-sky-300",
};

const STATUS_TONE: Record<OnlineChapter["status"], string> = {
  Active: "bg-emerald-100 text-emerald-800",
  Forming: "bg-amber-100 text-amber-800",
  Open: "bg-slate-100 text-slate-700",
};

const LocalChapters = () => {
  const { data: chapters = [], isLoading } = useChapters();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [regionFilter, setRegionFilter] = useState<string>("all");

  // Filters scoped to the Global Online Chapters Network
  const [onlineSearch, setOnlineSearch] = useState("");
  const [onlineScope, setOnlineScope] = useState<"all" | OnlineRegion["scope"]>("all");
  const [onlineRegion, setOnlineRegion] = useState<string>("all");
  const [onlineStatus, setOnlineStatus] = useState<"all" | OnlineChapter["status"]>("all");

  const onlineRegionOptions = useMemo(
    () =>
      ONLINE_CHAPTERS_NETWORK
        .filter((g) => onlineScope === "all" || g.scope === onlineScope)
        .map((g) => g.region),
    [onlineScope],
  );

  const filteredOnlineNetwork = useMemo(() => {
    const q = onlineSearch.trim().toLowerCase();
    return ONLINE_CHAPTERS_NETWORK
      .filter((g) => onlineScope === "all" || g.scope === onlineScope)
      .filter((g) => onlineRegion === "all" || g.region === onlineRegion)
      .map((g) => ({
        ...g,
        chapters: g.chapters.filter((c) => {
          const matchesStatus = onlineStatus === "all" || c.status === onlineStatus;
          const matchesSearch = !q ||
            c.name.toLowerCase().includes(q) ||
            c.coverage.toLowerCase().includes(q) ||
            g.region.toLowerCase().includes(q) ||
            g.scope.toLowerCase().includes(q);
          return matchesStatus && matchesSearch;
        }),
      }))
      .filter((g) => g.chapters.length > 0);
  }, [onlineSearch, onlineScope, onlineRegion, onlineStatus]);

  const totalOnlineMatches = useMemo(
    () => filteredOnlineNetwork.reduce((n, g) => n + g.chapters.length, 0),
    [filteredOnlineNetwork],
  );

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
            <div className="container mx-auto px-4 relative z-10 max-w-5xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-medium mb-5">
                <MapPin className="w-3.5 h-3.5" /> SCEF Local Chapter Services
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
                Explore Africa's <span className="text-scef-gold">Regions</span>
              </h1>
              <p className="text-scef-gold font-semibold tracking-wide uppercase text-sm mb-4">
                One Continent · Ten Regions
              </p>
              <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl mb-7">
                Discover SCEF's regional and country-based local chapter system connecting
                education champions, cultural heritage, edu-tourism opportunities, school
                support, Special Needs School nominations, regional voting, GFA Wallet
                regional funding, Rebuild My School Africa interventions, EduAid-Africa
                activities, NESA-Africa legacy impact, eLibrary Nigeria access, Education
                Online Africa access, and local community action across Africa and the diaspora.
              </p>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5">
                <Button asChild size="sm" className="bg-scef-gold text-scef-blue-darker hover:bg-scef-gold/90">
                  <Link to="/chapters/join-online"><Users className="w-4 h-4 mr-1.5" />Join a Local Chapter</Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                  <Link to="/chapters/start"><Plus className="w-4 h-4 mr-1.5" />Start an Online Chapter</Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                  <a href="#regions"><Globe className="w-4 h-4 mr-1.5" />Explore Regions</a>
                </Button>
                <Button asChild size="sm" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                  <Link to="/nominate"><GraduationCap className="w-4 h-4 mr-1.5" />Nominate a School</Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                  <Link to="/donate"><Heart className="w-4 h-4 mr-1.5" />Support a Region</Link>
                </Button>
                <Button asChild size="sm" className="bg-emerald-500 text-white hover:bg-emerald-600">
                  <a href={SOPHIA_WHATSAPP_LOCAL_CHAPTER} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-1.5" />Chat with Sophia
                  </a>
                </Button>
              </div>
            </div>
          </section>

          {/* Positioning — licensed grassroots, not franchises */}
          <section className="py-12 bg-white border-b">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: SCEF_BRAND.goldDeep }}>
                    Positioning
                  </span>
                  <h2 className="font-display text-2xl font-bold mt-1" style={{ color: SCEF_BRAND.navy }}>
                    One SCEF. One Local Chapter system.
                  </h2>
                </div>
                <p className="md:col-span-2 text-sm leading-relaxed text-slate-600">
                  SCEF Local Chapter Services is the grassroots execution arm of Santos
                  Creations Educational Foundation. Local chapters are <strong>licensed</strong>{" "}
                  country, regional, diaspora and community-based implementation platforms
                  governed by SCEF through Local Chapter Services and compliance oversight.
                  They are <strong>not independent franchises</strong>: they do not own SCEF
                  assets, operate separate wallets, sign contracts, fundraise independently or
                  represent SCEF outside approved governance procedures. All programs,
                  nominations, voting, school interventions, media coverage, digital learning
                  and regional funding connect back to the central SCEF Local Chapter Services
                  system.
                </p>
              </div>
            </div>
          </section>

          {/* Shared ten-region map */}
          <div id="regions">
            <AfricaRegionalMap detailBase="/regions" variant="light" />
          </div>

          {/* Ten approved regions — country chip browser */}
          <RegionCountryBrowser />

          {/* Unified Project Synchronization */}
          <UnifiedProjectSyncSection />

          {/* 2026–2027 NESA-Africa Legacy Impact Pathway */}
          <NesaLegacyPathwaySection />

          {/* Regional Wallet & Funding Structure */}
          <RegionalWalletSection />




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

          {/* Global Online Chapters Network — 8 African regions + global networks + other continents */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="mb-8 max-w-3xl">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3"
                      style={{ backgroundColor: `${SCEF_BRAND.gold}22`, color: SCEF_BRAND.navy }}>
                  <Wifi className="w-3.5 h-3.5" /> Global Online Chapters Network
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-3" style={{ color: SCEF_BRAND.navy }}>
                  Online Local Chapters Across Every Region
                </h2>
                <p className="text-slate-600">
                  Every SCEF supporter can join an online chapter — across the 8 African regions,
                  the African Diaspora and Friends of Africa networks, and on every other continent.
                  Online chapters are the entry stage of the SCEF chapter development pathway and
                  feed directly into EduAid-Africa, NESA-Africa, Special Needs School nominations,
                  regional voting and Rebuild My School Africa.
                </p>
              </div>

              {/* Filter bar */}
              <div className="mb-8 rounded-2xl border bg-card p-4 md:p-5"
                   style={{ borderColor: `${SCEF_BRAND.navy}1f` }}>
                <div className="grid gap-3 md:grid-cols-12">
                  <div className="relative md:col-span-5">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={onlineSearch}
                      onChange={(e) => setOnlineSearch(e.target.value)}
                      placeholder="Search online chapters, regions or countries…"
                      className="w-full pl-10 pr-3 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-scef-gold/40"
                      aria-label="Search online chapters"
                    />
                  </div>
                  <div className="md:col-span-3 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
                    <select
                      value={onlineScope}
                      onChange={(e) => { setOnlineScope(e.target.value as typeof onlineScope); setOnlineRegion("all"); }}
                      className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-sm"
                      aria-label="Filter by network type"
                    >
                      <option value="all">All networks</option>
                      <option value="African Region">African Regions (8)</option>
                      <option value="Global Network">Diaspora & Friends of Africa</option>
                      <option value="Other Continent">Other Continents</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                    <select
                      value={onlineRegion}
                      onChange={(e) => setOnlineRegion(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-sm"
                      aria-label="Filter by region"
                    >
                      <option value="all">All regions</option>
                      {onlineRegionOptions.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2 flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
                    <select
                      value={onlineStatus}
                      onChange={(e) => setOnlineStatus(e.target.value as typeof onlineStatus)}
                      className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-sm"
                      aria-label="Filter by status"
                    >
                      <option value="all">All status</option>
                      <option value="Active">Active</option>
                      <option value="Forming">Forming</option>
                      <option value="Open">Open</option>
                    </select>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs text-muted-foreground">
                    {totalOnlineMatches} online chapter{totalOnlineMatches !== 1 ? "s" : ""} match
                    {(onlineSearch || onlineScope !== "all" || onlineRegion !== "all" || onlineStatus !== "all") && " your filters"}
                  </p>
                  {(onlineSearch || onlineScope !== "all" || onlineRegion !== "all" || onlineStatus !== "all") && (
                    <Button variant="ghost" size="sm" className="h-7"
                            onClick={() => { setOnlineSearch(""); setOnlineScope("all"); setOnlineRegion("all"); setOnlineStatus("all"); }}>
                      Clear filters
                    </Button>
                  )}
                </div>
              </div>

              {totalOnlineMatches === 0 ? (
                <div className="text-center py-12 rounded-xl border border-dashed"
                     style={{ borderColor: `${SCEF_BRAND.navy}33` }}>
                  <p className="text-muted-foreground mb-3">No online chapters match your filters.</p>
                  <Button variant="outline" size="sm"
                          onClick={() => { setOnlineSearch(""); setOnlineScope("all"); setOnlineRegion("all"); setOnlineStatus("all"); }}>
                    Clear filters
                  </Button>
                </div>
              ) : (
                (["African Region", "Global Network", "Other Continent"] as const).map((scope) => {
                  const groups = filteredOnlineNetwork.filter((g) => g.scope === scope);
                  if (groups.length === 0) return null;
                  const heading =
                    scope === "African Region" ? "8 African Regions"
                    : scope === "Global Network" ? "Global African Networks"
                    : "Other Continents";
                  const count = groups.reduce((n, g) => n + g.chapters.length, 0);
                  return (
                    <div key={scope} className="mb-10">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="font-display text-xl font-bold" style={{ color: SCEF_BRAND.navy }}>{heading}</h3>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${SCOPE_TONE[scope]}`}>
                          {count} chapter{count !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {groups.flatMap((g) =>
                          g.chapters.map((c) => (
                            <div key={c.name}
                                 className="rounded-xl border bg-card p-5 hover:border-scef-gold/50 hover:shadow-sm transition-all flex flex-col"
                                 style={{ borderColor: `${SCEF_BRAND.navy}1f` }}>
                              <div className="flex items-start justify-between gap-3 mb-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                                       style={{ backgroundColor: `${SCEF_BRAND.gold}22`, color: SCEF_BRAND.navy }}>
                                    <Wifi className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-wider"
                                       style={{ color: SCEF_BRAND.goldDeep }}>{g.region}</p>
                                    <h4 className="font-display text-base font-bold leading-snug"
                                        style={{ color: SCEF_BRAND.navy }}>{c.name}</h4>
                                  </div>
                                </div>
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${STATUS_TONE[c.status]}`}>
                                  {c.status}
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 mb-4 line-clamp-3">{c.coverage}</p>
                              <div className="mt-auto flex items-center justify-between">
                                <span className="flex items-center gap-1.5 text-[11px] italic text-muted-foreground">
                                  <Users className="w-3 h-3" /> Reporting in progress
                                </span>
                                <Button size="sm" variant="ghost" asChild className="text-scef-blue-darker hover:text-scef-gold-dark h-7 px-2">
                                  <Link to="/chapters/join-online">
                                    Join <ArrowRight className="w-3 h-3 ml-1" />
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })
              )}

              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild className="bg-scef-gold text-scef-blue-darker hover:bg-scef-gold/90">
                  <Link to="/chapters/join-online"><Wifi className="w-4 h-4 mr-2" />Join an online chapter</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/chapters/start"><Plus className="w-4 h-4 mr-2" />Start a chapter in your region</Link>
                </Button>
              </div>
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


/* ──────────────────────────────────────────────────────────────────────────
   Ten approved regions — collapsible country chip browser.
   Mobile: each region collapses. Desktop: open by default.
   ────────────────────────────────────────────────────────────────────────── */
function RegionCountryBrowser() {
  return (
    <section className="py-14 bg-white border-b" aria-label="SCEF ten approved regions">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: SCEF_BRAND.goldDeep }}>
            Section 3 · Ten Approved Regions
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-1 mb-3" style={{ color: SCEF_BRAND.navy }}>
            Browse every SCEF region and country chapter
          </h2>
          <p className="text-slate-600 text-sm md:text-base">
            Each region groups its country chapters under one structure. Cross-regional
            countries (Sahel, Horn of Africa, Indian Ocean) appear via secondary tags —
            never duplicated. Country chapters that are not yet verified show as
            <em> To Be Activated</em>.
          </p>
        </div>

        <div className="space-y-3">
          {SCEF_REGIONS.map((region) => (
            <RegionAccordion key={region.slug} region={region} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RegionAccordion({ region }: { region: ScefRegion }) {
  const [open, setOpen] = useState(false);
  const countries = countriesForRegion(region.slug);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="rounded-2xl border bg-card overflow-hidden"
           style={{ borderColor: `${SCEF_BRAND.navy}1f` }}>
        <CollapsibleTrigger
          className="w-full flex items-center justify-between gap-3 p-4 md:p-5 text-left hover:bg-muted/30 transition-colors"
          aria-label={`Toggle ${region.name} countries`}
        >
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                 style={{ backgroundColor: `${SCEF_BRAND.gold}22`, color: SCEF_BRAND.navy }}>
              <Globe className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-lg md:text-xl font-bold" style={{ color: SCEF_BRAND.navy }}>
                  {region.name}
                </h3>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${SCOPE_BADGE[region.scope]}`}>
                  {region.scope}
                </span>
                <span className="text-[11px] font-medium text-muted-foreground">
                  {countries.length} {countries.length === 1 ? "country" : "countries"}
                </span>
              </div>
              <p className="text-xs md:text-sm text-slate-600 mt-1 line-clamp-2">{region.shortDescription}</p>
            </div>
          </div>
          <ChevronDown className={`w-5 h-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 md:px-5 pb-5 space-y-5">
            {/* Country chips */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider mb-2 text-muted-foreground">
                Countries covered
              </p>
              <div className="flex flex-wrap gap-1.5">
                {countries.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/local-chapters/${c.slug}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border bg-background text-xs font-medium hover:border-scef-gold hover:text-scef-blue-darker transition-colors"
                    style={{ borderColor: `${SCEF_BRAND.navy}22`, color: SCEF_BRAND.navy }}
                  >
                    {c.name}
                    {c.secondaryTags && c.secondaryTags.length > 0 && (
                      <span className="text-[9px] uppercase tracking-wide text-emerald-700">×-reg</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Linked programs */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider mb-2 text-muted-foreground">
                Linked SCEF programs
              </p>
              <div className="flex flex-wrap gap-1.5">
                {region.linkedPrograms.map((p) => (
                  <span key={p}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-scef-gold/15 text-scef-blue-darker">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <StatPill label="Active" value="Reporting in progress" />
              <StatPill label="Pending" value="Reporting in progress" />
              <StatPill label="Hybrid" value="Reporting in progress" />
              <StatPill label="Physical" value="Reporting in progress" />
            </div>

            {/* Wallet + pathway */}
            <div className="grid md:grid-cols-2 gap-3">
              <div className="rounded-lg border p-3 flex items-start gap-2"
                   style={{ borderColor: `${SCEF_BRAND.navy}1f`, backgroundColor: SCEF_BRAND.lightBg }}>
                <Wallet className="w-4 h-4 mt-0.5 shrink-0" style={{ color: SCEF_BRAND.goldDeep }} />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: SCEF_BRAND.goldDeep }}>
                    Regional Wallet
                  </p>
                  <p className="text-xs text-slate-600">GFA Wallet status: <strong>{region.walletStatus}</strong></p>
                </div>
              </div>
              <div className="rounded-lg border p-3 flex items-start gap-2"
                   style={{ borderColor: `${SCEF_BRAND.navy}1f`, backgroundColor: SCEF_BRAND.lightBg }}>
                <Trophy className="w-4 h-4 mt-0.5 shrink-0" style={{ color: SCEF_BRAND.green }} />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: SCEF_BRAND.goldDeep }}>
                    Impact pathway
                  </p>
                  <p className="text-xs text-slate-600">{region.impactPathway}</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm" className="bg-scef-blue-darker text-white hover:bg-scef-blue-darker/90">
                <Link to={`/regions/${region.slug}`}>View Region</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link to="/nominate">Nominate a School</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link to="/vote">Vote for Intervention</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link to="/donate">Support Regional Wallet</Link>
              </Button>
              <Button asChild size="sm" className="bg-scef-gold text-scef-blue-darker hover:bg-scef-gold/90">
                <Link to="/chapters/join-online">Join Local Chapter</Link>
              </Button>
            </div>

            <p className="text-[11px] italic text-muted-foreground border-t pt-3">
              Local Chapter Services compliance: all regional activity, fundraising,
              voting and school interventions are governed by SCEF HQ. Chapters cannot
              raise funds or sign contracts independently.
            </p>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border bg-background px-2.5 py-1.5"
         style={{ borderColor: `${SCEF_BRAND.navy}1a` }}>
      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-[11px] italic text-slate-600 truncate">{value}</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Unified Project Synchronization
   ────────────────────────────────────────────────────────────────────────── */
function UnifiedProjectSyncSection() {
  const examples = [
    "NESA-Africa regional voting in Nigeria → attaches to the Nigeria SCEF Chapter record.",
    "EduAid-Africa school support in Ghana → attaches to the Ghana SCEF Chapter record.",
    "Rebuild My School Africa selection in Kenya → attaches to the Kenya SCEF Chapter record.",
    "eLibrary Nigeria / Education Online Africa learner access in Uganda → attaches to the Uganda SCEF Chapter record.",
    "Santos Media regional coverage → attaches to the relevant SCEF chapter and region.",
  ];
  return (
    <section className="py-14" style={{ backgroundColor: SCEF_BRAND.lightBg }}>
      <div className="container mx-auto px-4 max-w-5xl">
        <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: SCEF_BRAND.goldDeep }}>
          Section 8 · Unified Project Synchronization
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-1 mb-3" style={{ color: SCEF_BRAND.navy }}>
          All SCEF projects are delivered through one Local Chapter system
        </h2>
        <p className="text-slate-600 mb-6 max-w-3xl text-sm md:text-base">
          NESA-Africa, EduAid-Africa, Rebuild My School Africa, eLibrary Nigeria,
          Education Online Africa, Women &amp; Girls Education, Special Needs Education
          Support, Santos Media, Sophia Support, NESA Africa TV and It's In Me Radio
          do not operate separate chapter systems. Every project is synchronized into
          the main SCEF Local Chapter Services structure for governance, reporting,
          compliance, safeguarding, fundraising control and measurable impact.
        </p>
        <ul className="space-y-2">
          {examples.map((e) => (
            <li key={e} className="flex items-start gap-2 text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: SCEF_BRAND.green }} />
              <span>{e}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   2026–2027 NESA-Africa Legacy Impact Pathway
   ────────────────────────────────────────────────────────────────────────── */
function NesaLegacyPathwaySection() {
  const steps = [
    "NESA-Africa recognition pathway",
    "Special Needs School nomination",
    "Regional school verification",
    "Regional public voting",
    "GFA Wallet regional wallet activation",
    "EduAid-Africa regional fundraising",
    "EduAid-Africa Edu-Tourism Conference / advocacy event",
    "Rebuild My School Africa intervention",
    "Impact reporting & media documentation",
    "Regional donor & CSR partner visibility",
    "Chapter-led monitoring and follow-up",
  ];
  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: SCEF_BRAND.goldDeep }}>
          Section 9 · 2026–2027 NESA-Africa Legacy Impact Pathway
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-1 mb-3" style={{ color: SCEF_BRAND.navy }}>
          Recognition turned into measurable intervention
        </h2>
        <p className="text-slate-600 mb-6 max-w-3xl text-sm md:text-base">
          Each region connects to the 2026–2027 NESA-Africa Legacy Impact pathway
          — turning recognition into measurable school and community intervention
          across Africa and the diaspora.
        </p>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {steps.map((s, i) => (
            <li key={s}
                className="flex items-start gap-2.5 rounded-lg border bg-card p-3"
                style={{ borderColor: `${SCEF_BRAND.navy}1f` }}>
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                    style={{ backgroundColor: SCEF_BRAND.navy, color: SCEF_BRAND.gold }}>
                {i + 1}
              </span>
              <span className="text-sm" style={{ color: SCEF_BRAND.navy }}>{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Regional Wallet & Funding Structure
   ────────────────────────────────────────────────────────────────────────── */
function RegionalWalletSection() {
  return (
    <section className="py-14" style={{ backgroundColor: SCEF_BRAND.lightBg }}>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: SCEF_BRAND.goldDeep }}>
              Section 10 · Regional Wallet
            </span>
            <h2 className="font-display text-3xl font-bold mt-1" style={{ color: SCEF_BRAND.navy }}>
              GFA Wallet regional funding
            </h2>
          </div>
          <div className="md:col-span-2 space-y-3 text-sm leading-relaxed text-slate-700">
            <p>
              Each region may have a dedicated <strong>GFA Wallet regional wallet</strong>{" "}
              for transparent fundraising, donation tracking, school intervention funding,
              regional sponsorships and impact reporting. Country-level wallet tracking is
              available where approved by SCEF HQ.
            </p>
            <div className="rounded-lg border p-4 flex items-start gap-3 bg-white"
                 style={{ borderColor: `${SCEF_BRAND.gold}55` }}>
              <ShieldCheck className="w-5 h-5 mt-0.5 shrink-0" style={{ color: SCEF_BRAND.goldDeep }} />
              <p className="text-xs md:text-sm">
                <strong>Compliance:</strong> all regional fundraising, sponsorship,
                donation, wallet activity, school nominations, regional voting, project
                implementation, media reporting and community outreach are governed by
                SCEF Local Chapter Services and SCEF compliance standards. Local chapters
                cannot independently raise funds, sign contracts, use the SCEF name or
                operate wallets outside approved SCEF governance procedures.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <Button asChild size="sm" className="bg-scef-gold text-scef-blue-darker hover:bg-scef-gold/90">
                <Link to="/donate"><Heart className="w-4 h-4 mr-1.5" />Support a Regional Wallet</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link to="/wallet">View GFA Wallet</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LocalChapters;

