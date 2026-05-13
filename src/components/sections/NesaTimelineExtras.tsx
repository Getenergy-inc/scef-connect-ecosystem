import { Link } from "react-router-dom";
import { Award, Building2, Trophy, Sparkles, Globe2, MapPin, Tv, Vote, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ---------------- Category Pathways ---------------- */

interface Pathway {
  slug: string;
  label: string;
  title: string;
  icon: any;
  description: string;
  highlights: string[];
  pathway: string;
  subcategories: string[];
  selection: string;
  scope: string;
  date: string;
  ctas: { label: string; to: string }[];
  scopeMeta?: string;
}

const pathways: Pathway[] = [
  {
    slug: "africa-education-icon",
    label: "Lifetime Achievement",
    title: "Africa Education Icon",
    icon: Trophy,
    description:
      "The continent's highest education honour. A continental honour recognising transformational leaders who have shaped education across Africa over the past two decades.",
    highlights: ["3 Residents", "3 Diaspora", "3 Friends of Africa"],
    pathway: "Nomination → 10-Year Profile → Jury Review → Live Show",
    subcategories: [
      "Africa Education Philanthropy Icon of the Decade",
      "Literary & New Curriculum Advocate Icon of the Decade",
      "Africa Technical Educator Icon of the Decade",
    ],
    selection: "Jury selection only",
    scope: "2006–2026",
    date: "Nominations 12 July – 12 September 2026",
    ctas: [
      { label: "Nominate an Icon", to: "/nominate?category=africa-education-icon" },
      { label: "Icon Criteria", to: "/programs/nesa-africa#icon-criteria" },
    ],
  },
  {
    slug: "platinum",
    label: "Institutional Leadership",
    title: "Platinum",
    icon: Building2,
    description:
      "Recognising the systems behind the impact. Recognises institutional leadership, diaspora impact, political leadership, and international partnerships that strengthen education systems.",
    highlights: ["Non-competitive", "NRC Verified", "Baseline Recognition"],
    pathway: "Nomination → NRC Verification → Governance Review → Recognition Show",
    subcategories: [
      "Institutional Leadership in Education",
      "Diaspora Impact in Education",
      "Political Leadership for Education",
      "International Partnerships",
    ],
    selection: "NRC verification + governance criteria",
    scope: "Institutions · Diaspora · Partnerships",
    date: "Platinum Recognition Show · 11 June 2026",
    ctas: [
      { label: "Submit Platinum Nomination", to: "/nominate?category=platinum" },
      { label: "Platinum Criteria", to: "/awards/platinum" },
    ],
  },
  {
    slug: "gold",
    label: "2026 Edition",
    title: "Gold Special Recognition",
    icon: Sparkles,
    description:
      "Where culture meets education. Celebrates cultural and public figures advancing education through sports, music, and social media influence.",
    highlights: ["100% Public Vote", "AGC Powered", "Mass Participation"],
    pathway: "Nomination → Public Voting → AGC Tally → Winners Show",
    subcategories: [
      "Sports for Education",
      "Music for Education",
      "Social Media Advocacy for Education",
    ],
    selection: "Public participation / visibility-led",
    scope: "Sports · Music · Social Influence",
    date: "Voting 13 July – 25 September · Winners Show 1 October 2026",
    ctas: [
      { label: "Nominate for Gold", to: "/nominate?category=gold" },
      { label: "How Voting Works", to: "/vote" },
    ],
  },
  {
    slug: "blue-garnet",
    label: "Competitive Excellence",
    title: "Blue Garnet",
    icon: Award,
    description:
      "The final prestige stage of the season. Represents the final prestige stage of the season across the leading competitive categories.",
    highlights: ["40% Public", "60% Jury", "Live Gala Reveal"],
    pathway: "Nomination → Jury Scoring 60% → Public Vote 40% → Gala Reveal",
    subcategories: [
      "Best Education-Focused NGO",
      "Best CSR for Education",
      "Education Innovation of the Year",
      "Outstanding African Educator",
    ],
    selection: "Public voting + jury evaluation",
    scope: "Final Prestige Stage",
    date: "Voting 2 – 22 October · Gala 22 October 2026",
    ctas: [
      { label: "Nominate for Blue Garnet", to: "/nominate?category=blue-garnet" },
      { label: "Vote with AGC", to: "/vote" },
    ],
  },
];

const PathwayCard = ({ p }: { p: Pathway }) => {
  const Icon = p.icon;
  return (
    <Card className="border-scef-blue/10 bg-background h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3 mb-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-scef-gold/15 text-scef-gold">
            <Icon className="w-5 h-5" />
          </span>
          <Badge className="text-[10px] bg-scef-gold/15 text-scef-gold border border-scef-gold/30 hover:bg-scef-gold/20">
            {p.label}
          </Badge>
        </div>
        <CardTitle className="text-xl text-scef-blue-darker">{p.title}</CardTitle>
        <p className="text-sm text-muted-foreground leading-relaxed mt-1">{p.description}</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex flex-wrap gap-1.5">
          {p.highlights.map((h) => (
            <span
              key={h}
              className="text-[10px] uppercase tracking-wide font-semibold text-scef-blue-darker bg-scef-blue/5 border border-scef-blue/10 rounded-full px-2 py-0.5"
            >
              {h}
            </span>
          ))}
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-scef-gold mb-1">Pathway</p>
          <p className="text-sm text-scef-blue-darker font-medium">{p.pathway}</p>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-scef-gold mb-1">Subcategories</p>
          <ul className="list-disc pl-5 space-y-0.5 text-sm text-muted-foreground">
            {p.subcategories.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-scef-gold">Selection</p>
            <p className="text-scef-blue-darker">{p.selection}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-scef-gold">Scope</p>
            <p className="text-scef-blue-darker">{p.scope}</p>
          </div>
        </div>

        <p className="text-xs font-semibold text-scef-blue-darker flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-scef-gold" /> {p.date}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {p.ctas.map((c, i) => (
            <Button key={c.label} asChild size="sm" variant={i === 0 ? "secondary" : "outline"}>
              <Link to={c.to}>{c.label}</Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const CategoryPathwaysSection = () => (
  <section id="pathways" className="bg-scef-pattern border-y border-scef-blue/10">
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-scef-gold mb-2">
          Category Pathways
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-darker mb-3">
          How Awards Move Through the Season
        </h2>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          Four distinct pathways — each with its own purpose, process, and recognition model.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {pathways.map((p) => (
          <PathwayCard key={p.slug} p={p} />
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mt-10 justify-center">
        <Button asChild size="lg"><Link to="/categories">View All Categories</Link></Button>
        <Button asChild size="lg" variant="secondary"><Link to="/categories">Explore Subcategories</Link></Button>
        <Button asChild size="lg" variant="outline"><Link to="/nominate">Nominate by Category</Link></Button>
      </div>
    </div>
  </section>
);

/* ---------------- Continental Reach ---------------- */

const regions: { name: string; countries: string }[] = [
  { name: "North Africa", countries: "Egypt · Morocco · Tunisia · Algeria · Libya" },
  { name: "West Africa", countries: "Nigeria · Ghana · Senegal · Côte d'Ivoire" },
  { name: "Central Africa", countries: "Cameroon · DRC · Gabon · Chad" },
  { name: "East Africa", countries: "Kenya · Tanzania · Uganda · Rwanda" },
  { name: "Southern Africa", countries: "South Africa · Zambia · Zimbabwe · Botswana" },
  { name: "Sahel Region", countries: "Mali · Burkina Faso · Niger · Mauritania" },
  { name: "Horn of Africa", countries: "Ethiopia · Somalia · Djibouti · Eritrea" },
  { name: "Indian Ocean", countries: "Madagascar · Mauritius · Seychelles · Comoros" },
  { name: "Diaspora / Global Africa", countries: "Africans in UK · USA · Europe · Asia" },
  { name: "Friends of Africa", countries: "Global allies advancing African education" },
];

const reachStats = [
  { label: "Regions", value: "10" },
  { label: "African Countries", value: "54" },
  { label: "Diaspora Hubs", value: "5+" },
  { label: "Friends of Africa", value: "Global" },
];

export const ContinentalReachSection = () => (
  <section id="reach" className="bg-background">
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-scef-gold mb-2">
          Continental Reach
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-darker mb-3">
          Explore Africa's Regions
        </h2>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          Regional engagement drives nominations, voting, partnerships, and storytelling across the continent.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {reachStats.map((s) => (
          <Card key={s.label} className="border-scef-blue/10 bg-scef-blue-darker text-white">
            <CardContent className="py-5 text-center">
              <p className="font-display text-2xl md:text-3xl font-bold text-scef-gold">{s.value}</p>
              <p className="text-xs uppercase tracking-wider text-white/80 mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {regions.map((r) => (
          <Card key={r.name} className="border-scef-blue/10 bg-background">
            <CardHeader className="pb-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> {r.name}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{r.countries}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-scef-gold/30 bg-scef-pattern p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-scef-blue-darker mb-2">Each region drives:</p>
          <div className="flex flex-wrap gap-2">
            {["Nominations", "Public Voting", "Partnerships", "School Visibility", "TV Storytelling"].map((t) => (
              <Badge key={t} className="bg-scef-blue-darker text-white hover:bg-scef-blue-darker">{t}</Badge>
            ))}
          </div>
        </div>
        <Button asChild size="lg">
          <Link to="/chapters"><Globe2 className="w-4 h-4 mr-1" /> Explore All Regions</Link>
        </Button>
      </div>
    </div>
  </section>
);

/* ---------------- Live Windows ---------------- */

const liveWindows = {
  shows: [
    { title: "Platinum Recognition Show", date: "11 June 2026" },
    { title: "Africa Education Icon Show", date: "25 June 2026" },
    { title: "Gold Certificate Winners Show", date: "1 October 2026" },
  ],
  voting: [
    { title: "Gold Certificate Voting", date: "20 July – 15 August 2026" },
    { title: "Blue Garnet Voting", date: "16 September – 22 October 2026" },
  ],
  gala: [
    { title: "Blue Garnet Awards Gala", date: "22 October 2026" },
    { title: "Rebuild My School Africa Launch", date: "23 October 2026" },
    { title: "Impact Phase", date: "23 October 2026 → October 2027" },
  ],
};

const LiveItem = ({ title, date, icon: Icon }: { title: string; date: string; icon: any }) => (
  <Card className="border-scef-blue/10 bg-background">
    <CardContent className="flex items-start gap-3 py-4">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-scef-gold/15 text-scef-gold shrink-0">
        <Icon className="w-4 h-4" />
      </span>
      <div>
        <p className="text-sm font-semibold text-scef-blue-darker">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{date}</p>
      </div>
    </CardContent>
  </Card>
);

export const LiveWindowsSection = () => (
  <section id="live-windows" className="bg-scef-pattern border-y border-scef-blue/10">
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-scef-gold mb-2">
          Live Windows
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-darker mb-3">
          Upcoming Voting Windows, Shows & Milestones
        </h2>
      </div>

      <Tabs defaultValue="shows" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="shows">TV Shows</TabsTrigger>
          <TabsTrigger value="voting">Voting</TabsTrigger>
          <TabsTrigger value="gala">Gala & Impact</TabsTrigger>
        </TabsList>
        <TabsContent value="shows" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {liveWindows.shows.map((s) => <LiveItem key={s.title} {...s} icon={Tv} />)}
        </TabsContent>
        <TabsContent value="voting" className="grid sm:grid-cols-2 gap-4">
          {liveWindows.voting.map((s) => <LiveItem key={s.title} {...s} icon={Vote} />)}
        </TabsContent>
        <TabsContent value="gala" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {liveWindows.gala.map((s) => <LiveItem key={s.title} {...s} icon={Sparkles} />)}
        </TabsContent>
      </Tabs>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild size="lg"><Link to="/nominate">Nominate Now <ArrowRight className="w-4 h-4 ml-1" /></Link></Button>
        <Button asChild size="lg" variant="secondary"><Link to="/media/nesa-tv">Watch NESA TV</Link></Button>
        <Button asChild size="lg" variant="outline"><Link to="/partner-with-us">Partner With Us</Link></Button>
      </div>
    </div>
  </section>
);
