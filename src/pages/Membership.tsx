import { useState, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import {
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Award,
  BookOpen,
  Heart,
  Vote,
  Shield,
  GraduationCap,
  Building2,
  User,
  Sparkles,
} from "lucide-react";

type PathKey = "individual" | "youth" | "organization";

interface Tier {
  name: string;
  price: string;
  period: string;
  summary: string;
  features: string[];
  popular?: boolean;
  premium?: boolean;
  light?: boolean;
}

const TIERS_BY_PATH: Record<PathKey, Tier[]> = {
  individual: [
    {
      name: "General Member",
      price: "Free",
      period: "",
      summary: "A simple entry point for adults beginning their SCEF journey.",
      features: [
        "Access to online platforms",
        "Newsletter & event updates",
        "Chapter observation rights",
        "Community discussions",
      ],
      light: true,
    },
    {
      name: "Standard Member",
      price: "$50",
      period: "/year",
      summary: "Core membership for full participation in programs, events, and leadership.",
      features: [
        "Voting rights in elections",
        "Priority event registration",
        "Training workshops",
        "Chapter leadership eligibility",
        "Digital recognition badge",
        "Member-only resources",
      ],
      popular: true,
    },
    {
      name: "Lifetime Member",
      price: "$1,000",
      period: "one-time",
      summary: "A long-term commitment to Africa's education future with permanent recognition.",
      features: [
        "All Standard benefits, for life",
        "Permanent honorary recognition",
        "Advisory board eligibility",
        "VIP event access",
        "Legacy naming opportunities",
      ],
      premium: true,
    },
  ],
  youth: [
    {
      name: "Youth Member",
      price: "Free",
      period: "ages 13–17",
      summary: "For young learners with parental consent — guided access to youth-focused resources.",
      features: [
        "Mentorship programs",
        "Youth workshops & camps",
        "Educational resources library",
        "My Career, My Life access",
        "Youth chapter participation",
      ],
      popular: true,
    },
  ],
  organization: [
    {
      name: "Organizational Member",
      price: "$200",
      period: "/year",
      summary: "For institutions and organizations supporting education impact through collaboration.",
      features: [
        "Voting rights at general assembly",
        "Co-branding on programs",
        "Program collaboration access",
        "Corporate recognition",
        "CSR partnership pathway",
        "Featured on partners page",
      ],
      popular: true,
    },
  ],
};

const PATHS: { key: PathKey; label: string; icon: typeof User; sub: string }[] = [
  { key: "individual", label: "Individual", icon: User, sub: "Adults 18+" },
  { key: "youth", label: "Youth", icon: GraduationCap, sub: "Ages 13–17" },
  { key: "organization", label: "Organization", icon: Building2, sub: "Institutions & teams" },
];

const AMBASSADOR_STEPS = [
  {
    name: "Ambassador-1",
    label: "Program Leadership",
    price: "$100/year",
    commitment: "5 hrs / month",
    summary: "Lead outreach for a single SCEF program in your community.",
    requirement: "Standard or Lifetime membership",
  },
  {
    name: "Ambassador-2",
    label: "Regional Coordination",
    price: "$200/year",
    commitment: "10 hrs / month",
    summary: "Coordinate multiple programs and mentor other ambassadors at regional level.",
    requirement: "Ambassador-1 experience",
  },
  {
    name: "Ambassador-3",
    label: "Global Advocacy",
    price: "$300/year",
    commitment: "15 hrs / month",
    summary: "Lead global advocacy and high-level partnerships representing SCEF.",
    requirement: "Ambassador-2 experience",
  },
];

const WHY_JOIN = [
  { icon: Globe, title: "Chapter Access", desc: "Join or start local chapters in your region." },
  { icon: Vote, title: "Voting & Participation", desc: "Take part in governance and recognition processes." },
  { icon: BookOpen, title: "Learning & Certification", desc: "Access webinars, training, and educational opportunities." },
  { icon: Heart, title: "Direct Impact", desc: "Support scholarships, school renewal, and inclusive education." },
];

const RECEIVE = [
  { icon: Award, label: "Official Recognition" },
  { icon: Globe, label: "Chapter Access" },
  { icon: BookOpen, label: "Learning Resources" },
  { icon: Heart, label: "Direct Impact" },
];

const Membership = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [path, setPath] = useState<PathKey>("individual");

  const chapterCountry = searchParams.get("chapter");
  const participationType = searchParams.get("type");
  const diasporaLocation = searchParams.get("location");
  const joinContext = chapterCountry
    ? { country: chapterCountry, type: participationType || "resident", location: diasporaLocation }
    : null;

  const tiers = useMemo(() => TIERS_BY_PATH[path], [path]);
  const recommended = tiers.find((t) => t.popular) ?? tiers[0];

  return (
    <>
      <Helmet>
        <title>Become a Member of SCEF — Pan-African Education Movement</title>
        <meta
          name="description"
          content="Join a pan-African community of education changemakers shaping access, quality, and opportunity across regions."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          {/* 1. HERO */}
          <section className="relative isolate overflow-hidden text-white">
            <div className="absolute inset-0 -z-20">
              <img
                src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1920&q=80"
                alt=""
                className="h-full w-full object-cover animate-[heroZoom_24s_ease-in-out_infinite_alternate]"
                aria-hidden="true"
              />
            </div>
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-scef-blue-darker/80 via-scef-blue-darker/85 to-scef-blue-darker" />
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,hsl(45_92%_42%/0.18),transparent_55%)]" />

            <div className="container mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32">
              <div className="max-w-3xl animate-fade-up">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-scef-gold/30 bg-scef-gold/10 px-4 py-1.5 backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5 text-scef-gold" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-scef-gold-light">
                    Membership-driven Pan-African foundation
                  </span>
                </div>
                <h1 className="font-display text-[2.5rem] font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.5rem]">
                  Become a Member of <span className="text-gradient-gold italic">SCEF</span>
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
                  Join a pan-African community of education changemakers shaping access, quality, and
                  opportunity across regions.
                </p>
                <p className="mt-3 text-sm text-white/55">
                  A membership-run educational institution advancing Education for All in Africa.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Button
                    size="lg"
                    className="h-12 bg-scef-gold px-7 font-semibold text-scef-blue-darker shadow-gold hover:bg-scef-gold-hover"
                    onClick={() => {
                      document
                        .getElementById("membership-paths")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Join Now
                    <ArrowRight className="ms-2 h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 border-white/40 bg-white/5 px-7 font-semibold text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
                    asChild
                  >
                    <a href="#why-join">Explore Membership Benefits</a>
                  </Button>
                </div>

                {joinContext && (
                  <div className="mt-8 inline-flex max-w-xl items-start gap-3 rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-scef-gold" />
                    <div className="text-sm">
                      <p className="font-semibold text-white">
                        Joining as{" "}
                        {joinContext.type === "resident" && `Resident of ${joinContext.country}`}
                        {joinContext.type === "diaspora" &&
                          `${joinContext.country} Diaspora${joinContext.location ? ` in ${joinContext.location}` : ""}`}
                        {joinContext.type === "friend" && `Friend of ${joinContext.country}`}
                      </p>
                      <p className="text-xs text-white/65">
                        Your chapter preference is saved — complete membership below.
                      </p>
                    </div>
                  </div>
                )}

                {/* Floating stat chips */}
                <div className="mt-12 flex flex-wrap gap-2">
                  {[
                    { k: "5+ Regions", v: <Globe className="h-3 w-3" /> },
                    { k: "Voting Rights", v: <Vote className="h-3 w-3" /> },
                    { k: "Verified Chapters", v: <Shield className="h-3 w-3" /> },
                  ].map((c) => (
                    <span
                      key={c.k}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur-sm"
                    >
                      {c.v}
                      {c.k}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <style>{`
              @keyframes heroZoom { from { transform: scale(1); } to { transform: scale(1.06); } }
            `}</style>
          </section>

          {/* 2. WHY JOIN */}
          <section id="why-join" className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-6">
              <Reveal className="mx-auto mb-14 max-w-2xl text-center">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-scef-gold">
                  Why Join SCEF
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                  Four reasons members stay
                </h2>
              </Reveal>

              <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {WHY_JOIN.map((item, i) => (
                  <Reveal key={item.title} delay={i * 80}>
                    <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-scef-gold/40 hover:shadow-lg">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-scef-gold/15 text-scef-blue-darker transition-colors group-hover:bg-scef-gold/30">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* 3. WHAT MEMBERS RECEIVE — visual strip */}
          <section className="border-y border-border bg-muted/30 py-12">
            <div className="container mx-auto px-6">
              <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                What Members Receive
              </p>
              <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4">
                {RECEIVE.map((r) => (
                  <div
                    key={r.label}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-all hover:border-scef-gold/50 hover:shadow-md"
                  >
                    <r.icon className="h-5 w-5 flex-shrink-0 text-scef-gold" />
                    <span className="text-sm font-semibold text-foreground">{r.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4 + 5. PATH SELECTOR + TIERS */}
          <section id="membership-paths" className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-6">
              <Reveal className="mx-auto mb-12 max-w-2xl text-center">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-scef-gold">
                  Choose your path
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                  Find the right membership in seconds
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Pick a category — we'll show only the tiers that fit you.
                </p>
              </Reveal>

              {/* Path tabs */}
              <div className="mx-auto mb-12 flex max-w-2xl flex-wrap justify-center gap-2 rounded-2xl border border-border bg-muted/40 p-1.5">
                {PATHS.map((p) => {
                  const active = path === p.key;
                  return (
                    <button
                      key={p.key}
                      onClick={() => setPath(p.key)}
                      className={`flex flex-1 min-w-[140px] items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                        active
                          ? "bg-scef-blue-darker text-white shadow-md"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <p.icon className="h-4 w-4" />
                      <span className="flex flex-col items-start leading-tight">
                        <span>{p.label}</span>
                        <span
                          className={`text-[10px] font-normal ${active ? "text-white/70" : "text-muted-foreground/70"}`}
                        >
                          {p.sub}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Tier cards */}
              <div
                key={path}
                className={`mx-auto grid max-w-6xl gap-6 animate-fade-in ${
                  tiers.length === 1
                    ? "max-w-md grid-cols-1"
                    : tiers.length === 2
                      ? "max-w-3xl md:grid-cols-2"
                      : "md:grid-cols-3"
                }`}
              >
                {tiers.map((tier) => (
                  <Card
                    key={tier.name}
                    className={`relative overflow-hidden border transition-all ${
                      tier.popular
                        ? "border-scef-gold/60 bg-gradient-to-b from-scef-gold/5 to-card shadow-xl ring-1 ring-scef-gold/30 md:scale-[1.02]"
                        : tier.premium
                          ? "border-scef-blue-darker/40 bg-gradient-to-b from-scef-blue-darker/[0.04] to-card hover:shadow-lg"
                          : tier.light
                            ? "border-border bg-card/50 hover:border-foreground/20 hover:shadow-md"
                            : "border-border hover:shadow-md"
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-scef-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-scef-blue-darker">
                        <Star className="h-3 w-3 fill-current" />
                        Recommended
                      </div>
                    )}
                    {tier.premium && (
                      <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-scef-blue-darker/30 bg-scef-blue-darker px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                        <Sparkles className="h-3 w-3" />
                        Premium
                      </div>
                    )}

                    <CardContent className="p-7">
                      <h3 className="font-display text-xl font-bold text-foreground">{tier.name}</h3>
                      <div className="mt-3 flex items-baseline gap-1">
                        <span className="font-display text-4xl font-bold text-scef-blue-darker">
                          {tier.price}
                        </span>
                        {tier.period && (
                          <span className="text-sm text-muted-foreground">{tier.period}</span>
                        )}
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {tier.summary}
                      </p>

                      <ul className="mt-6 space-y-2.5">
                        {tier.features.slice(0, 6).map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-scef-gold" />
                            <span className="text-foreground/80">{f}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        className={`mt-7 w-full ${
                          tier.popular
                            ? "bg-scef-gold text-scef-blue-darker hover:bg-scef-gold-hover"
                            : tier.premium
                              ? "bg-scef-blue-darker text-white hover:bg-scef-blue"
                              : ""
                        }`}
                        variant={tier.popular || tier.premium ? "default" : "outline"}
                        onClick={() => navigate("/auth")}
                      >
                        {tier.price === "Free" ? "Join Free" : `Continue with ${tier.name}`}
                        <ArrowRight className="ms-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <p className="mt-10 text-center text-sm text-muted-foreground">
                Already a member?{" "}
                <Link to="/auth" className="font-semibold text-scef-blue-darker hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </section>

          {/* 6. RECOMMENDED SPOTLIGHT (only on Individual) */}
          {path === "individual" && (
            <section className="bg-gradient-to-br from-scef-blue-darker via-scef-blue to-scef-blue-darker py-20 text-white md:py-24">
              <div className="container mx-auto px-6">
                <Reveal className="mx-auto max-w-4xl">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md md:p-12">
                    <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
                      <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-scef-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-scef-blue-darker">
                          <Star className="h-3 w-3 fill-current" />
                          Most members start here
                        </div>
                        <h3 className="font-display text-3xl font-bold leading-tight md:text-4xl">
                          {recommended.name} — <span className="text-scef-gold">$50/year</span>
                        </h3>
                        <p className="mt-3 max-w-xl text-white/75">{recommended.summary}</p>
                        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                          {recommended.features.slice(0, 4).map((f) => (
                            <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-scef-gold" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col gap-3 md:items-end">
                        <Button
                          size="lg"
                          className="h-12 bg-scef-gold px-7 font-semibold text-scef-blue-darker hover:bg-scef-gold-hover"
                          onClick={() => navigate("/auth")}
                        >
                          Continue with Standard
                          <ArrowRight className="ms-2 h-4 w-4" />
                        </Button>
                        <Link
                          to="/auth"
                          className="text-xs text-white/60 hover:text-white/90"
                        >
                          Already a member? Sign in
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </section>
          )}

          {/* 7. AMBASSADOR PATHWAY */}
          <section className="bg-muted/30 py-20 md:py-28">
            <div className="container mx-auto px-6">
              <Reveal className="mx-auto mb-14 max-w-2xl text-center">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-scef-gold">
                  Higher commitment
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                  Ready for higher commitment?
                </h2>
                <p className="mt-3 text-muted-foreground">
                  The Ambassador pathway is for members who want to lead outreach, representation, and
                  advocacy at program, regional, or global level.
                </p>
              </Reveal>

              {/* Stepped timeline */}
              <div className="mx-auto max-w-5xl">
                <div className="relative grid gap-6 md:grid-cols-3">
                  {/* Connector line */}
                  <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-scef-gold/40 to-transparent md:block" />

                  {AMBASSADOR_STEPS.map((step, i) => (
                    <Reveal key={step.name} delay={i * 100}>
                      <div className="relative rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-scef-gold/50 hover:shadow-lg">
                        <div className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-scef-blue-darker font-display text-sm font-bold text-scef-gold ring-4 ring-background">
                          {i + 1}
                        </div>
                        <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-scef-gold">
                          {step.label}
                        </p>
                        <h3 className="mt-1 font-display text-xl font-bold text-foreground">
                          {step.name}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {step.summary}
                        </p>
                        <div className="mt-5 space-y-2 border-t border-border pt-4 text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Investment</span>
                            <span className="font-semibold text-foreground">{step.price}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Commitment</span>
                            <span className="font-semibold text-foreground">{step.commitment}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Requires</span>
                            <span className="font-semibold text-foreground text-right">
                              {step.requirement}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <Button
                    size="lg"
                    className="h-12 bg-scef-blue-darker px-7 font-semibold text-white hover:bg-scef-blue"
                    onClick={() => navigate("/get-involved/ambassador")}
                  >
                    Apply to Become an Ambassador
                    <ArrowRight className="ms-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* 8. TRUST BAND */}
          <section className="border-y border-border bg-background py-20">
            <div className="container mx-auto px-6">
              <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
                <Reveal>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-scef-gold">
                    Trust & credibility
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                    Built on trust, participation, and shared impact
                  </h2>
                  <div className="mt-8 space-y-5">
                    {[
                      {
                        icon: Shield,
                        title: "Transparent participation",
                        desc: "Every vote, every decision — recorded and accountable.",
                      },
                      {
                        icon: Globe,
                        title: "Structured chapter networks",
                        desc: "Verified chapters across African regions and the diaspora.",
                      },
                      {
                        icon: Heart,
                        title: "Long-term education impact",
                        desc: "Active since 1997 — programs running across multiple regions.",
                      },
                    ].map((p) => (
                      <div key={p.title} className="flex gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-scef-gold/15 text-scef-blue-darker">
                          <p.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-foreground">{p.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={150}>
                  <div className="relative">
                    <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-scef-blue-darker to-scef-blue p-8 shadow-2xl">
                      {/* Certificate mockup */}
                      <div className="flex h-full flex-col items-center justify-center rounded-2xl border-2 border-scef-gold/40 bg-white/95 p-8 text-scef-blue-darker">
                        <Award className="mb-4 h-12 w-12 text-scef-gold" />
                        <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                          Certificate of Membership
                        </p>
                        <p className="mt-4 font-display text-2xl font-bold text-center">
                          Santos Creations<br />Educational Foundation
                        </p>
                        <div className="my-6 h-px w-16 bg-scef-gold" />
                        <p className="text-xs text-center text-muted-foreground">
                          This certifies that the bearer is an<br />
                          <span className="font-semibold text-foreground">Active SCEF Member</span>
                          <br />in good standing.
                        </p>
                        <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-scef-gold/15 px-3 py-1 text-[10px] font-bold text-scef-blue-darker">
                          <CheckCircle className="h-3 w-3" /> Verified
                        </div>
                      </div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 hidden h-24 w-24 rounded-full bg-scef-gold/20 blur-2xl md:block" />
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* 10. FINAL CTA */}
          <section className="relative overflow-hidden bg-scef-blue-darker py-24 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(45_92%_42%/0.15),transparent_60%)]" />
            <div className="container relative mx-auto px-6 text-center">
              <Reveal>
                <Users className="mx-auto mb-6 h-10 w-10 text-scef-gold" />
                <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight md:text-5xl">
                  Join the movement shaping{" "}
                  <span className="text-gradient-gold italic">Africa's education future</span>
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-white/70">
                  Become part of a trusted network of members, leaders, and partners advancing
                  education across regions.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  <Button
                    size="lg"
                    className="h-12 bg-scef-gold px-7 font-semibold text-scef-blue-darker hover:bg-scef-gold-hover"
                    onClick={() => navigate("/auth")}
                  >
                    Become a Member
                    <ArrowRight className="ms-2 h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 border-white/40 bg-white/5 px-7 font-semibold text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
                    asChild
                  >
                    <Link to="/chapters">Explore Chapters</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="h-12 px-7 font-semibold text-white/85 hover:bg-white/10 hover:text-white"
                    asChild
                  >
                    <Link to="/get-involved/ambassador">Apply as Ambassador</Link>
                  </Button>
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Membership;
