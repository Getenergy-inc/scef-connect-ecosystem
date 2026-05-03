import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  ShieldCheck,
  MapPin,
  BarChart3,
  BookOpen,
  FileCheck,
  Handshake,
  Building2,
  GraduationCap,
  School,
  Laptop,
  HeartHandshake,
  Users,
  Globe2,
  ClipboardList,
  Target,
  LineChart,
  Mail,
  Wallet,
  Coins,
  Radio,
  Tv,
  Megaphone,
  Eye,
  Ear,
  Accessibility,
  Wrench,
  Award,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { supabase } from "@/integrations/supabase/client";
import csrHero from "@/assets/hero-schoolgirl.jpg";

interface Endorsement {
  id: string;
  name: string;
  acronym: string | null;
  logo_url: string;
  website_url: string | null;
}

const services = [
  { icon: ShieldCheck, title: "Transparent Fund Management", blurb: "Clear governance from contribution to disbursement." },
  { icon: MapPin, title: "Local Chapter Implementation", blurb: "Programs delivered on the ground where they matter." },
  { icon: BarChart3, title: "Measurable Impact Tracking", blurb: "Outcomes monitored against agreed indicators." },
  { icon: BookOpen, title: "Education Program Delivery", blurb: "Scholarships, infrastructure, and inclusive access." },
  { icon: FileCheck, title: "Partner Reporting & Accountability", blurb: "Structured reporting for donors and sponsors." },
];

const focusAreas = [
  { icon: GraduationCap, title: "Scholarships & Education Aid", desc: "EduAid Africa pathways for learners and institutions." },
  { icon: School, title: "School Infrastructure", desc: "Rebuild My School Africa rehabilitation projects." },
  { icon: Laptop, title: "Digital Learning Access", desc: "Education Online Africa platforms and content." },
  { icon: HeartHandshake, title: "Inclusive Education", desc: "Special needs, women & girls, underserved regions." },
  { icon: Users, title: "Community Initiatives", desc: "Chapter-led education and skills programs." },
  { icon: Globe2, title: "Cross-Border CSR", desc: "Multi-country campaigns coordinated through SCEF chapters." },
];

const process = [
  {
    step: "01",
    icon: ClipboardList,
    title: "Fund Allocation",
    desc: "CSR partners commit funding to scholarships, school rebuilding, special needs interventions, vocational training, or digital learning.",
  },
  {
    step: "02",
    icon: Target,
    title: "Project Deployment via EduAid-Africa",
    desc: "Funds are channeled into Rebuild My School Africa, Special Needs Interventions, Scholarship Schemes, and Career & Digital Learning programs.",
  },
  {
    step: "03",
    icon: Wallet,
    title: "Wallet-Based Financial Management (GFA & AGC)",
    desc: "Managed via the EduAid Wallet (GFA) and AfriGold Coin (AGC) — enabling escrow, staged disbursement, and real-time tracking.",
  },
  {
    step: "04",
    icon: LineChart,
    title: "Monitoring, Evaluation & Reporting",
    desc: "Real-time dashboards with UN RBM, ESG, and SDG 4-aligned reporting at the project and beneficiary level.",
  },
  {
    step: "05",
    icon: Megaphone,
    title: "Public Engagement Layer",
    desc: "Visibility through public donation campaigns, AGC-powered voting, and storytelling on NESA TV and It's In Me Radio.",
  },
];

const interventions = [
  {
    icon: School,
    title: "School Infrastructure Development",
    items: ["Classroom renovation", "Learning environment upgrades", "Digital classroom integration"],
  },
  {
    icon: Accessibility,
    title: "Special Needs Education Support",
    items: ["Schools for the blind", "Schools for the deaf", "Autism & inclusive learning centers", "Assistive learning tools"],
  },
  {
    icon: GraduationCap,
    title: "Scholarships & Grants",
    items: ["Student sponsorships", "Merit & need-based scholarships", "Teacher and institutional grants"],
  },
  {
    icon: Wrench,
    title: "Vocational & Skills Development",
    items: ["Technical training centers", "Youth empowerment programs", "Job-readiness initiatives"],
  },
  {
    icon: Laptop,
    title: "Digital Education & Access",
    items: ["Online learning platforms", "Educational content access", "ICT integration in schools"],
  },
];

const partnerBenefits = [
  { icon: Wallet, text: "Transparent fund management via wallet system" },
  { icon: LineChart, text: "Real-time tracking of donations and impact" },
  { icon: ShieldCheck, text: "Verified project deployment" },
  { icon: Megaphone, text: "Public visibility and brand positioning" },
  { icon: FileCheck, text: "Structured ESG and SDG reporting" },
  { icon: Users, text: "Direct engagement with beneficiaries" },
  { icon: Award, text: "Participation in NESA-Africa recognition" },
];

const governance = [
  "UN Result-Based Management (RBM) framework",
  "ESG (Environmental, Social, Governance) principles",
  "SDG 4 — Quality Education alignment",
  "Financial transparency via GFA Wallet system",
  "BOT — Global oversight",
  "BOD — Strategic execution",
  "BOA — Local advisory & monitoring",
];

const accountability = [
  "Segregated program accounts and audit-ready records",
  "RBAC governance: Board, finance, and chapter approvals",
  "Disbursements through GFA Wallet for traceable payouts",
  "Independent verification of outcomes and beneficiaries",
];

const CsrFundManagement = () => {
  const { data: endorsements = [] } = useQuery({
    queryKey: ["endorsements-csr"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("endorsements")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as Endorsement[];
    },
  });

  return (
    <>
      <Helmet>
        <title>CSR & Education Fund Management | SCEF</title>
        <meta
          name="description"
          content="SCEF designs, manages, and delivers education-focused CSR and impact funding across Africa — with transparent governance, local chapter delivery, and partner-grade reporting."
        />
        <link rel="canonical" href="https://santoscreations.org/csr-fund-management" />
        <meta property="og:title" content="CSR & Education Fund Management | SCEF" />
        <meta
          property="og:description"
          content="A trusted CSR fund management partner for education across African regions."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />

        <main>
          {/* HERO — CSR pitch / landing */}
          <section className="relative isolate overflow-hidden bg-scef-blue-darker text-white">
            <div className="absolute inset-0">
              <img
                src={csrHero}
                alt="African learners supported through CSR education funding"
                className="h-full w-full object-cover opacity-40"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-scef-blue-darker/95 via-scef-blue-darker/85 to-[#0A0A0A]/95" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(45_92%_42%/0.18),transparent_55%)]" />
              <div className="pointer-events-none absolute inset-0 bg-scef-pattern opacity-[0.05]" />
            </div>

            <div className="container relative mx-auto px-6 md:px-8">
              <div className="grid items-center gap-10 py-16 md:grid-cols-12 md:gap-12 md:py-24 lg:py-28">
                <div className="md:col-span-7">
                  <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-scef-gold/40 bg-scef-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold">
                    <span className="h-1.5 w-1.5 rounded-full bg-scef-gold" />
                    CSR for Education Funds Management
                  </p>
                  <h1 className="font-display text-[2.5rem] font-bold leading-[1.04] tracking-tight md:text-5xl lg:text-[3.75rem]">
                    Invest in Africa&apos;s education.{" "}
                    <span className="bg-gradient-to-r from-scef-gold to-[#F1C75B] bg-clip-text text-transparent">
                      Track every outcome.
                    </span>
                  </h1>
                  <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
                    SCEF is your trusted fiscal and program management partner —
                    deploying CSR funds through EduAid-Africa and the GFA Wallet
                    with transparent governance, local chapter delivery, and
                    RBM/ESG/SDG-aligned reporting.
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
                    {[
                      "UN RBM-aligned reporting",
                      "ESG & SDG 4 reporting",
                      "Wallet-based escrow & disbursement",
                      "Local chapter execution",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-scef-gold" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Button
                      size="lg"
                      className="h-12 bg-scef-gold px-7 font-semibold text-scef-blue-darker hover:bg-scef-gold-hover"
                      asChild
                    >
                      <Link to="/csr-funding-intake">
                        <Megaphone className="me-2 h-4 w-4" />
                        Launch a CSR Education Campaign
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-12 border-white/40 bg-transparent px-7 font-semibold text-white hover:bg-white/10 hover:text-white"
                      asChild
                    >
                      <Link to="/partner-with-us">
                        <Handshake className="me-2 h-4 w-4" />
                        Talk to Partnerships
                      </Link>
                    </Button>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2 text-xs">
                    {[
                      { label: "Sponsor a School", to: "/programs/rebuild-my-school-africa" },
                      { label: "Fund Scholarships", to: "/programs/eduaid-africa" },
                      { label: "Support Special Needs", to: "/programs/special-needs-education" },
                      { label: "Track Impact", to: "/csr-fund-management" },
                    ].map((p) => (
                      <Link
                        key={p.label}
                        to={p.to}
                        className="rounded-full border border-white/20 bg-white/5 px-3 py-1 font-medium text-white/80 transition-colors hover:border-scef-gold/50 hover:bg-scef-gold/10 hover:text-scef-gold"
                      >
                        {p.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-5">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md md:p-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold">
                      Partner platform at a glance
                    </p>
                    <dl className="mt-5 grid grid-cols-2 gap-5">
                      {[
                        { k: "Programs managed", v: "6 core" },
                        { k: "Reporting", v: "RBM · ESG · SDG 4" },
                        { k: "Disbursement", v: "GFA Wallet + AGC" },
                        { k: "Delivery network", v: "Local chapters" },
                        { k: "Verified impact", v: "Reporting in progress" },
                        { k: "Public visibility", v: "NESA TV · Radio" },
                      ].map((s) => (
                        <div key={s.k}>
                          <dt className="text-[11px] uppercase tracking-wider text-white/55">
                            {s.k}
                          </dt>
                          <dd className="mt-1 font-display text-base font-bold text-white">
                            {s.v}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <Link
                      to="/csr-funding-intake"
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-scef-gold px-5 py-3 text-sm font-semibold text-scef-blue-darker transition-colors hover:bg-scef-gold-hover"
                    >
                      Start Partner Intake <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PARTNER LOGOS STRIP */}
          <section className="border-y border-border bg-card py-10">
            <div className="container mx-auto px-6 md:px-8">
              <p className="text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Trusted by institutional partners & endorsers
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-80">
                {endorsements && endorsements.length > 0 ? (
                  endorsements.slice(0, 8).map((e) => (
                    <a
                      key={e.id}
                      href={e.website_url || "#"}
                      target={e.website_url ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-center"
                      title={e.name}
                    >
                      <img
                        src={e.logo_url}
                        alt={e.name}
                        loading="lazy"
                        className="h-10 w-auto object-contain grayscale transition-all duration-300 group-hover:grayscale-0 md:h-12"
                      />
                    </a>
                  ))
                ) : (
                  <p className="text-sm italic text-muted-foreground">
                    Partner directory loading…
                  </p>
                )}
              </div>
              <div className="mt-6 text-center">
                <Link
                  to="/partners"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-scef-blue-darker hover:text-scef-gold-dark"
                >
                  View all partners <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </section>

          {/* SERVICES */}
          <Reveal>
            <section className="bg-card py-20 md:py-24">
              <div className="container mx-auto px-6 md:px-8">
                <div className="mx-auto max-w-3xl text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
                    Our Services
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.5rem]">
                    What We Manage for Partners
                  </h2>
                  <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                    End-to-end CSR fund management for education — from design and disbursement to delivery and reporting.
                  </p>
                </div>

                <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-5">
                  {services.map(({ icon: Icon, title, blurb }) => (
                    <div
                      key={title}
                      className="group flex flex-col items-center rounded-xl border border-border bg-background p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-scef-gold/40 hover:shadow-md"
                    >
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-scef-gold/15 text-scef-gold-dark ring-1 ring-scef-gold/30 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-6 w-6" strokeWidth={1.75} />
                      </div>
                      <h3 className="font-display text-sm font-bold leading-tight text-scef-blue-darker md:text-[15px]">
                        {title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{blurb}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </Reveal>

          {/* PROCESS */}
          <Reveal>
            <section className="bg-background py-20 md:py-24">
              <div className="container mx-auto px-6 md:px-8">
                <div className="mx-auto max-w-3xl text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[hsl(145_63%_35%)]">
                    Our Process
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.5rem]">
                    From Commitment to Verified Outcome
                  </h2>
                </div>

                <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                  {process.map(({ step, icon: Icon, title, desc }) => (
                    <div
                      key={step}
                      className="relative rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-scef-gold/40 hover:shadow-md"
                    >
                      <span className="absolute right-5 top-5 font-display text-3xl font-bold text-scef-gold/30">
                        {step}
                      </span>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-scef-blue/10 text-scef-blue ring-1 ring-scef-blue/20">
                        <Icon className="h-6 w-6" strokeWidth={1.75} />
                      </div>
                      <h3 className="font-display text-base font-bold leading-tight text-scef-blue-darker">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </Reveal>

          {/* FOCUS AREAS */}
          <Reveal>
            <section className="bg-card py-20 md:py-24">
              <div className="container mx-auto px-6 md:px-8">
                <div className="mx-auto max-w-3xl text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
                    Focus Areas
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.5rem]">
                    Where Your Funding Delivers Impact
                  </h2>
                </div>

                <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
                  {focusAreas.map(({ icon: Icon, title, desc }) => (
                    <div
                      key={title}
                      className="flex items-start gap-4 rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-scef-gold/40 hover:shadow-md"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-scef-gold/15 text-scef-gold-dark ring-1 ring-scef-gold/30">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                      <div>
                        <h3 className="font-display text-base font-bold leading-tight text-scef-blue-darker">
                          {title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </Reveal>

          {/* KEY INTERVENTION AREAS */}
          <Reveal>
            <section className="bg-background py-20 md:py-24">
              <div className="container mx-auto px-6 md:px-8">
                <div className="mx-auto max-w-3xl text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
                    Key CSR Intervention Areas
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.5rem]">
                    Five Pillars of Education Investment
                  </h2>
                  <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                    Every CSR program is mapped into one of five intervention pillars — each with verified delivery partners, governance, and reporting.
                  </p>
                </div>

                <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {interventions.map(({ icon: Icon, title, items }) => (
                    <div
                      key={title}
                      className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-scef-gold/40 hover:shadow-md"
                    >
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-scef-gold/15 text-scef-gold-dark ring-1 ring-scef-gold/30">
                        <Icon className="h-6 w-6" strokeWidth={1.75} />
                      </div>
                      <h3 className="font-display text-base font-bold leading-tight text-scef-blue-darker">
                        {title}
                      </h3>
                      <ul className="mt-3 space-y-1.5">
                        {items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-scef-gold-dark" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </Reveal>

          {/* LOCAL CHAPTER IMPLEMENTATION MODEL */}
          <Reveal>
            <section className="bg-card py-20 md:py-24">
              <div className="container mx-auto px-6 md:px-8">
                <div className="mx-auto max-w-3xl text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[hsl(145_63%_35%)]">
                    Local Chapter Implementation Model
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.5rem]">
                    Delivered by SCEF Chapters Across Africa
                  </h2>
                  <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                    CSR projects are executed through SCEF's Local Chapter Network — ensuring local relevance, community engagement, and efficient project execution.
                  </p>
                </div>

                <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
                  <div className="rounded-xl border border-border bg-background p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-scef-blue/10 text-scef-blue ring-1 ring-scef-blue/20">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-base font-bold text-scef-blue-darker">
                        Local Execution
                      </h3>
                    </div>
                    <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                      <li>• Each country operates a chapter microsite</li>
                      <li>• Managed by Local Chapter Presidents (LCPs)</li>
                      <li>• Supported by local Board of Advisors (BOA)</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-border bg-background p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-scef-gold/15 text-scef-gold-dark ring-1 ring-scef-gold/30">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-base font-bold text-scef-blue-darker">
                        HQ Oversight
                      </h3>
                    </div>
                    <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                      <li>• Reports to SCEF HQ Board of Directors (BOD)</li>
                      <li>• Strategic governance from Board of Trustees (BOT)</li>
                      <li>• Quarterly cross-chapter performance reviews</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </Reveal>

          {/* PARTNER BENEFITS */}
          <Reveal>
            <section className="bg-background py-20 md:py-24">
              <div className="container mx-auto px-6 md:px-8">
                <div className="mx-auto max-w-3xl text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
                    Key Benefits for CSR Partners
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.5rem]">
                    Why Organizations Partner With SCEF
                  </h2>
                </div>

                <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
                  {partnerBenefits.map(({ icon: Icon, text }) => (
                    <div
                      key={text}
                      className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-scef-gold/40 hover:shadow-md"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-scef-gold/15 text-scef-gold-dark ring-1 ring-scef-gold/30">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                      <p className="text-sm font-medium leading-relaxed text-scef-blue-darker md:text-[15px]">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </Reveal>

          {/* GOVERNANCE & COMPLIANCE */}
          <Reveal>
            <section className="bg-card py-20 md:py-24">
              <div className="container mx-auto px-6 md:px-8">
                <div className="mx-auto max-w-3xl text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[hsl(145_63%_35%)]">
                    Governance & Compliance
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.5rem]">
                    Aligned with Global Standards
                  </h2>
                  <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                    SCEF ensures all CSR fund management adheres to international frameworks and multi-level governance.
                  </p>
                </div>

                <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {governance.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-border bg-background p-5"
                    >
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-scef-gold-dark" />
                      <span className="text-sm font-medium leading-relaxed text-scef-blue-darker">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </Reveal>


          <Reveal>
            <section className="relative overflow-hidden bg-scef-blue-darker py-20 text-white md:py-24">
              <div className="absolute inset-0 bg-scef-pattern opacity-[0.05]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(45_92%_42%/0.10),transparent_60%)]" />

              <div className="container relative mx-auto grid items-center gap-12 px-6 md:grid-cols-2 md:px-8">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-light">
                    Accountability
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight md:text-[2.5rem]">
                    Built for Partner-Grade Trust
                  </h2>
                  <p className="mt-5 max-w-lg text-base leading-relaxed text-white/75 md:text-lg">
                    Every CSR engagement is governed by documented controls, verifiable disbursements, and reporting structured for corporate, institutional, and philanthropic partners.
                  </p>
                </div>

                <ul className="space-y-4">
                  {accountability.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-5"
                    >
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-scef-gold/15 text-scef-gold ring-1 ring-scef-gold/30">
                        <ShieldCheck className="h-4 w-4" strokeWidth={2} />
                      </span>
                      <span className="text-sm leading-relaxed text-white/85 md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </Reveal>

          {/* TRUST LOGOS */}
          {endorsements.length > 0 && (
            <Reveal>
              <section className="bg-background py-16 md:py-20">
                <div className="container mx-auto px-6 md:px-8">
                  <div className="mb-10 text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[hsl(145_63%_35%)]">
                      Trust & Recognition
                    </p>
                    <h2 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-scef-blue-darker md:text-[2rem]">
                      Aligned with Leading Institutions
                    </h2>
                  </div>

                  <div className="grid grid-cols-3 items-center gap-x-6 gap-y-8 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                    {endorsements.map((e) => (
                      <a
                        key={e.id}
                        href={e.website_url || "#"}
                        target={e.website_url ? "_blank" : undefined}
                        rel={e.website_url ? "noopener noreferrer" : undefined}
                        className="group flex flex-col items-center gap-2"
                        title={e.name}
                      >
                        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-border bg-card p-2 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-scef-gold/40 md:h-20 md:w-20">
                          <img src={e.logo_url} alt={e.name} className="h-full w-full object-contain" loading="lazy" />
                        </div>
                        <span className="text-center text-[11px] font-medium leading-tight text-muted-foreground">
                          {e.acronym || e.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            </Reveal>
          )}

          {/* FINAL CTA */}
          <Reveal>
            <section className="relative overflow-hidden bg-card py-16 md:py-20">
              <div className="container relative mx-auto px-6 md:px-8">
                <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-background p-8 text-center shadow-sm md:p-12">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
                    Start a Partnership
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-scef-blue-darker md:text-[2.25rem]">
                    Let’s design your next education impact program
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                    Talk to our partnerships team to scope a CSR program aligned with your goals and priority regions.
                  </p>
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <Button
                      size="lg"
                      className="h-12 bg-scef-blue-darker px-7 font-semibold text-white hover:bg-scef-blue"
                      asChild
                    >
                      <Link to="/csr-funding-intake">
                        Start Funding Intake <ArrowRight className="ms-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-12 border-border bg-background px-7 font-semibold text-scef-blue-darker hover:border-scef-gold hover:text-scef-gold-dark"
                      asChild
                    >
                      <Link to="/contact">
                        <Mail className="me-2 h-4 w-4" /> Contact Partnerships
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </Reveal>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CsrFundManagement;
