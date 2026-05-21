import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Crown, Star, Sparkles, Trophy, ArrowRight, CheckCircle2 } from "lucide-react";

type Pathway = {
  id: string;
  eyebrow: string;
  title: string;
  tagline: string;
  description: string;
  icon: typeof Crown;
  accent: string; // tailwind text/bg classes
  border: string;
  badge: string;
  recognitionModel: string;
  bestFor: string;
  pills: string[];
  journey: string[];
  subcategories: string[];
  selection: string;
  scope: string;
  timing: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

const pathways: Pathway[] = [
  {
    id: "icon",
    eyebrow: "Lifetime Achievement",
    title: "Africa Education Icon Award",
    tagline: "The continent's highest education honour.",
    description:
      "Honouring education leaders, builders, reformers, founders, philanthropists, and changemakers whose long-term contribution has shaped education impact across Africa and the diaspora.",
    icon: Star,
    accent: "text-scef-gold",
    border: "border-scef-gold/40",
    badge: "bg-scef-gold/10 text-scef-gold-dark border-scef-gold/30",
    recognitionModel: "Honorary / Legacy Recognition",
    bestFor: "Lifetime education impact",
    pills: ["3 Residents", "3 Diaspora", "3 Friends of Africa"],
    journey: ["Nomination", "10-Year Profile", "Jury Review", "Live Show"],
    subcategories: [
      "Africa Education Philanthropy Icon of the Decade",
      "Literary & New Curriculum Advocate Icon of the Decade",
      "Africa Technical Educator Icon of the Decade",
    ],
    selection: "Jury selection only",
    scope: "2006–2026",
    timing: "Nominations 12 July – 12 September 2026",
    primaryCta: { label: "View Icon Categories", href: "/awards/icon" },
    secondaryCta: { label: "Nominate a Champion", href: "/nominate?category=icon" },
  },
  {
    id: "platinum",
    eyebrow: "Institutional Leadership",
    title: "Platinum Award",
    tagline: "Recognising the systems behind the impact.",
    description:
      "Recognising institutions, organizations, partners, schools, NGOs, and platforms making strong structural contributions to education development, access, funding, innovation, and support.",
    icon: Crown,
    accent: "text-slate-600",
    border: "border-slate-300",
    badge: "bg-slate-100 text-slate-700 border-slate-300",
    recognitionModel: "Institutional Recognition",
    bestFor: "Organizations and education platforms",
    pills: ["Non-competitive", "NRC verified", "Baseline Recognition"],
    journey: ["Nomination", "NRC Verification", "Governance Review", "Recognition Show"],
    subcategories: [
      "Institutional Leadership in Education",
      "Diaspora Impact in Education",
      "Political Leadership for Education",
      "International Partnerships",
    ],
    selection: "NRC verification + governance criteria",
    scope: "Institutions · Diaspora · Partnerships",
    timing: "Platinum Recognition Show · 11 June 2026",
    primaryCta: { label: "View Platinum Categories", href: "/awards/platinum" },
    secondaryCta: { label: "View Nominees", href: "/categories" },
  },
  {
    id: "influencers",
    eyebrow: "2026 Edition",
    title: "Influencers Education Impact Award",
    tagline: "Where culture meets education.",
    description:
      "Celebrating public voices, creators, cultural leaders, media personalities, sports figures, music leaders, advocates, and digital voices using influence to advance education awareness and social impact.",
    icon: Sparkles,
    accent: "text-fuchsia-600",
    border: "border-fuchsia-300",
    badge: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
    recognitionModel: "Public Influence / Social Impact",
    bestFor: "Cultural and digital education advocates",
    pills: ["100% Public Vote", "AGC Powered", "Mass Participation"],
    journey: ["Nomination", "Public Voting", "AGC Tally", "Winners Show"],
    subcategories: [
      "Sports for Education",
      "Music for Education",
      "Social Media Advocacy for Education",
    ],
    selection: "Public participation / visibility-led",
    scope: "Sports · Music · Social Influence",
    timing: "Voting 13 Jul – 25 Sep · Winners Show 1 Oct 2026",
    primaryCta: { label: "View Influencer Categories", href: "/categories" },
    secondaryCta: { label: "Nominate an Influencer", href: "/nominate?category=influencer" },
  },
  {
    id: "blue-garnet",
    eyebrow: "Competitive Excellence",
    title: "Blue Garnet Award",
    tagline: "The final prestige stage of the season.",
    description:
      "Recognising outstanding nominees through competitive categories supported by public participation, review, judging, scoring, and transparent award-season processes.",
    icon: Trophy,
    accent: "text-scef-blue-darker",
    border: "border-scef-blue-darker/30",
    badge: "bg-scef-blue-darker/[0.06] text-scef-blue-darker border-scef-blue-darker/20",
    recognitionModel: "Competitive Award Pathway",
    bestFor: "Public nomination and voting categories",
    pills: ["40% Public", "60% Jury", "Live Gala Reveal"],
    journey: ["Nomination", "Jury Scoring (60%)", "Public Vote (40%)", "Gala Reveal"],
    subcategories: [
      "Best Education-Focused NGO",
      "Best CSR for Education",
      "Education Innovation of the Year",
      "Outstanding African Educator",
    ],
    selection: "Public voting + jury evaluation",
    scope: "Final Prestige Stage",
    timing: "Voting 2 – 22 Oct · Gala 22 Oct 2026",
    primaryCta: { label: "View Blue Garnet Categories", href: "/awards/blue-garnet" },
    secondaryCta: { label: "How Voting Works", href: "/vote" },
  },
];

export const AwardPathways = () => {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-scef-gold-dark">
            Award Pathways
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-scef-blue-darker md:text-5xl">
            How NESA-Africa Awards Are Organized
          </h2>
          <p className="mt-5 text-base text-muted-foreground md:text-lg">
            Understand the four recognition pathways, how nominees are grouped, and how each award
            category moves through the season.
          </p>
          <p className="mt-3 text-sm text-muted-foreground/90">
            NESA-Africa uses different recognition pathways to celebrate lifetime education icons,
            institutions, social-impact influencers, and competitive excellence across Africa and the
            diaspora.
          </p>
        </div>

        {/* Quick navigation chips */}
        <nav aria-label="Award pathway quick links" className="mt-10 flex flex-wrap gap-2">
          {pathways.map((p) => (
            <a
              key={p.id}
              href={`#pathway-${p.id}`}
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-scef-gold/50 hover:shadow-sm"
            >
              <p.icon className={`h-4 w-4 ${p.accent}`} />
              <span>{p.title.replace(" Award", "")}</span>
              <span className="text-xs text-muted-foreground">· {p.eyebrow}</span>
            </a>
          ))}
        </nav>

        {/* Pathway cards */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {pathways.map((p) => {
            const Icon = p.icon;
            return (
              <article
                key={p.id}
                id={`pathway-${p.id}`}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border-2 bg-card transition-all hover:shadow-xl ${p.border}`}
              >
                {/* Top accent bar */}
                <div className="flex items-center justify-between border-b border-border/60 bg-muted/30 px-6 py-3">
                  <span className={`inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] ${p.accent}`}>
                    <Icon className="h-3.5 w-3.5" />
                    {p.eyebrow}
                  </span>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${p.badge}`}>
                    {p.id === "icon" ? "Lifetime" : p.id === "platinum" ? "Institutional" : p.id === "influencers" ? "Cultural" : "Competitive"}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${p.border} bg-background`}>
                      <Icon className={`h-6 w-6 ${p.accent}`} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-xl font-bold text-scef-blue-darker md:text-2xl">
                        {p.title}
                      </h3>
                      <p className={`mt-1 text-sm font-medium ${p.accent}`}>{p.tagline}</p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

                  {/* Recognition meta */}
                  <div className="mt-6 grid gap-4 rounded-xl border border-border/70 bg-muted/30 p-4 sm:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Recognition Model
                      </p>
                      <p className="mt-1 text-sm font-semibold text-foreground">{p.recognitionModel}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Best For
                      </p>
                      <p className="mt-1 text-sm font-semibold text-foreground">{p.bestFor}</p>
                    </div>
                  </div>

                  {/* Pills */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.pills.map((pill) => (
                      <span
                        key={pill}
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${p.badge}`}
                      >
                        {pill}
                      </span>
                    ))}
                  </div>

                  {/* Pathway journey */}
                  <div className="mt-6">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Pathway Journey
                    </p>
                    <ol className="mt-3 flex flex-wrap items-center gap-2">
                      {p.journey.map((step, i) => (
                        <li key={step} className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground">
                            <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold ${p.badge}`}>
                              {i + 1}
                            </span>
                            {step}
                          </span>
                          {i < p.journey.length - 1 && (
                            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/50" />
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Subcategories */}
                  <div className="mt-6">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Subcategories
                    </p>
                    <ul className="mt-3 space-y-2">
                      {p.subcategories.map((sub) => (
                        <li key={sub} className="flex items-start gap-2 text-sm text-foreground">
                          <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${p.accent}`} />
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Meta footer */}
                  <dl className="mt-6 grid gap-3 border-t border-border/60 pt-5 text-sm sm:grid-cols-3">
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Selection</dt>
                      <dd className="mt-1 text-xs font-medium text-foreground">{p.selection}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Scope</dt>
                      <dd className="mt-1 text-xs font-medium text-foreground">{p.scope}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Timing</dt>
                      <dd className="mt-1 text-xs font-medium text-foreground">{p.timing}</dd>
                    </div>
                  </dl>

                  {/* CTAs */}
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button asChild className="bg-scef-blue-darker text-white hover:bg-scef-blue-darker/90">
                      <Link to={p.primaryCta.href}>
                        {p.primaryCta.label} <ArrowRight className="ms-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="border-scef-gold/40 text-scef-blue-darker hover:bg-scef-gold/10">
                      <Link to={p.secondaryCta.href}>{p.secondaryCta.label}</Link>
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AwardPathways;
