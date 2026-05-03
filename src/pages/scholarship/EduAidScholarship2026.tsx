import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  GraduationCap,
  Wrench,
  Building2,
  Award,
  CheckCircle2,
  Wallet,
  ClipboardCheck,
  HelpCircle,
  UserPlus,
  ListChecks,
  FileUp,
  Send,
  Clock,
  FileCheck2,
  Bell,
  Coins,
  Wifi,
  Timer,
  ShieldCheck,
} from "lucide-react";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EligibilityChecker } from "@/components/scholarship/EligibilityChecker";
import {
  SCHOLARSHIP_CATEGORIES,
  PRIORITY_GROUPS,
  STUDY_AREAS,
  TIMELINE,
} from "@/lib/scholarship";
import heroImg from "@/assets/scholarship/scholar-portrait.jpg";
import vocationalImg from "@/assets/scholarship/vocational-students.jpg";
import classroomImg from "@/assets/scholarship/student-classroom.jpg";
import tertiaryImg from "@/assets/hero-education.jpg";
import professionalImg from "@/assets/hero-programs.jpg";

const categoryImages: Record<string, string> = {
  vocational: vocationalImg,
  college: classroomImg,
  tertiary: tertiaryImg,
  professional: professionalImg,
};

const categoryIcons: Record<string, typeof Wrench> = {
  vocational: Wrench,
  college: Building2,
  tertiary: GraduationCap,
  professional: Award,
};

const EduAidScholarship2026 = () => {
  return (
    <>
      <Helmet>
        <title>EduAid-Africa Scholarship 2026–2027 | Apply Now | SCEF</title>
        <meta
          name="description"
          content="Apply for the EduAid-Africa Scholarship 2026–2027 — funding for vocational, college, polytechnic, university and professional education across Africa, with EduAid Wallet integration."
        />
        <link
          rel="canonical"
          href="https://santoscreations.org/scholarship/eduaid-2026"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />

        <main>
          {/* HERO */}
          <section className="relative isolate overflow-hidden bg-[#0A0A0A] text-white">
            <div className="absolute inset-0">
              <img
                src={heroImg}
                alt="African scholarship recipient"
                className="h-full w-full object-cover opacity-50"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0B5D3B]/85 via-[#0A0A0A]/80 to-[#0A0A0A]/95" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(45_92%_42%/0.18),transparent_55%)]" />
            </div>

            <div className="container relative mx-auto px-6 py-20 md:px-8 md:py-28">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-scef-gold/40 bg-scef-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold">
                  <span className="h-1.5 w-1.5 rounded-full bg-scef-gold" />
                  EduAid-Africa Scholarship · 2026–2027
                </span>
                <h1 className="mt-5 font-display text-4xl font-bold leading-[1.04] tracking-tight md:text-6xl">
                  Apply for the{" "}
                  <span className="bg-gradient-to-r from-scef-gold to-[#F1C75B] bg-clip-text text-transparent">
                    EduAid-Africa Scholarship
                  </span>
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
                  Financial support for vocational, college, polytechnic,
                  university and professional certification programmes across
                  Africa — with mentorship, online learning and transparent
                  EduAid Wallet disbursement.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 bg-scef-gold px-7 font-semibold text-[#0A0A0A] hover:bg-scef-gold-hover"
                  >
                    <Link to="/scholarship/apply">
                      <ClipboardCheck className="me-2 h-4 w-4" /> Apply Now
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-12 border-white/40 bg-white/5 px-7 font-semibold text-white hover:bg-white/15 hover:text-white"
                  >
                    <a href="#eligibility">
                      <CheckCircle2 className="me-2 h-4 w-4" /> Check Eligibility
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-12 border-scef-gold/60 bg-transparent px-7 font-semibold text-scef-gold hover:bg-scef-gold/15 hover:text-scef-gold"
                  >
                    <Link to="/auth?redirect=/scholarship/apply">
                      Create EduAid Profile
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className="h-12 px-6 font-semibold text-white hover:bg-white/10 hover:text-white"
                  >
                    <Link to="/wallet">
                      <Wallet className="me-2 h-4 w-4" /> Activate EduAid Wallet
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* CATEGORIES */}
          <Reveal>
            <section className="bg-background py-20 md:py-24">
              <div className="container mx-auto px-6 md:px-8">
                <div className="mx-auto max-w-3xl text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
                    Scholarship Categories
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.5rem]">
                    Choose Your Pathway
                  </h2>
                </div>

                <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                  {SCHOLARSHIP_CATEGORIES.map((c) => {
                    const Icon = categoryIcons[c.slug];
                    return (
                      <article
                        key={c.slug}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-scef-gold/40 hover:shadow-xl"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img
                            src={categoryImages[c.slug]}
                            alt={c.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/85 via-[#0B5D3B]/30 to-transparent" />
                          <div className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-scef-gold text-scef-blue-darker shadow-md">
                            <Icon className="h-5 w-5" strokeWidth={2} />
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <h3 className="font-display text-lg font-bold text-scef-blue-darker">
                            {c.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {c.desc}
                          </p>
                          <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-scef-gold/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-scef-gold-dark">
                            {c.eligibility}
                          </span>
                          <Button
                            asChild
                            size="sm"
                            className="mt-5 bg-scef-blue-darker hover:bg-scef-blue"
                          >
                            <Link to={`/scholarship/apply?category=${c.slug}`}>
                              Apply <ArrowRight className="ms-2 h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>
          </Reveal>

          {/* ELIGIBLE STUDY AREAS + PRIORITY */}
          <Reveal>
            <section className="bg-card py-20 md:py-24">
              <div className="container mx-auto grid gap-10 px-6 md:grid-cols-2 md:px-8">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
                    Eligible study areas
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-scef-blue-darker md:text-3xl">
                    Funding spans technical and academic pathways.
                  </h2>
                  <ul className="mt-6 space-y-2.5">
                    {STUDY_AREAS.map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-2.5 text-sm text-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-scef-gold-dark" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
                    Special priority
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-scef-blue-darker md:text-3xl">
                    Applicants we actively prioritize.
                  </h2>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {PRIORITY_GROUPS.map((p) => (
                      <span
                        key={p}
                        className="inline-flex items-center gap-1.5 rounded-full border border-scef-gold/40 bg-scef-gold/10 px-3 py-1.5 text-xs font-semibold text-scef-blue-darker"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-scef-gold" />
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </Reveal>

          {/* ELIGIBILITY CHECKER */}
          <Reveal>
            <section
              id="eligibility"
              className="scroll-mt-28 bg-background py-20 md:py-24"
            >
              <div className="container mx-auto px-6 md:px-8">
                <div className="mx-auto max-w-3xl text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
                    Eligibility Checker
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-[2.5rem]">
                    Find out if you qualify in 30 seconds
                  </h2>
                </div>
                <div className="mx-auto mt-10 max-w-3xl">
                  <EligibilityChecker />
                </div>
              </div>
            </section>
          </Reveal>

          {/* TIMELINE */}
          <Reveal>
            <section className="bg-card py-20 md:py-24">
              <div className="container mx-auto px-6 md:px-8">
                <div className="mx-auto max-w-3xl text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
                    Programme Timeline
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-[2.5rem]">
                    Key milestones for 2026–2027
                  </h2>
                </div>
                <ol className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {TIMELINE.map((t, i) => (
                    <li
                      key={t.label}
                      className="rounded-xl border border-border bg-background p-5"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-scef-blue-darker text-xs font-bold text-scef-gold">
                        {i + 1}
                      </div>
                      <p className="mt-3 font-display text-sm font-bold text-scef-blue-darker">
                        {t.label}
                      </p>
                      <p className="mt-1 text-xs italic text-muted-foreground">
                        {t.value}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          </Reveal>

          {/* APPLICATION FLOW PREVIEW */}
          <Reveal>
            <section id="how-to-apply" className="scroll-mt-28 bg-background py-20 md:py-24">
              <div className="container mx-auto px-6 md:px-8">
                <div className="mx-auto max-w-3xl text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
                    How to apply
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-[2.5rem]">
                    Five clear steps from profile to submission
                  </h2>
                </div>
                <ol className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  {[
                    { icon: UserPlus, title: "Create Profile", desc: "Name, contact, country and institution type." },
                    { icon: ListChecks, title: "Select Category", desc: "Vocational, college, polytechnic, university or professional." },
                    { icon: FileUp, title: "Upload Documents", desc: "ID, admission letter, academic record, statement of need." },
                    { icon: Wallet, title: "Activate Wallet", desc: "EduAid Wallet for tracking and disbursement." },
                    { icon: Send, title: "Review & Submit", desc: "Confirm summary, consent and submit application." },
                  ].map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <li
                        key={s.title}
                        className="relative rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-scef-gold/40 hover:shadow-lg"
                      >
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-scef-gold text-scef-blue-darker">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-scef-gold-dark">
                            Step {i + 1}
                          </span>
                        </div>
                        <h3 className="mt-4 font-display text-base font-bold text-scef-blue-darker">
                          {s.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                          {s.desc}
                        </p>
                      </li>
                    );
                  })}
                </ol>
                <div className="mt-10 flex justify-center">
                  <Button asChild size="lg" className="h-12 bg-scef-blue-darker px-7 font-semibold hover:bg-scef-blue">
                    <Link to="/scholarship/apply">
                      Start Application <ArrowRight className="ms-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          </Reveal>

          {/* APPLICANT DASHBOARD PREVIEW */}
          <Reveal>
            <section className="bg-card py-20 md:py-24">
              <div className="container mx-auto px-6 md:px-8">
                <div className="mx-auto max-w-3xl text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
                    Applicant Dashboard
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-[2.5rem]">
                    Track every stage in one place
                  </h2>
                  <p className="mt-4 text-sm text-muted-foreground md:text-base">
                    After you submit, your private dashboard shows status, documents, exam progress and wallet activity.
                  </p>
                </div>

                <div className="mx-auto mt-12 max-w-6xl overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
                  {/* dashboard topbar */}
                  <div className="flex items-center justify-between border-b border-border bg-scef-blue-darker px-5 py-3 text-white">
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-scef-gold text-scef-blue-darker">
                        <GraduationCap className="h-3.5 w-3.5" />
                      </span>
                      EduAid Applicant · Demo
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-scef-gold/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-scef-gold">
                      <Clock className="h-3 w-3" /> Under Review
                    </span>
                  </div>

                  <div className="grid gap-px bg-border md:grid-cols-3">
                    {/* status pipeline */}
                    <div className="bg-background p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-scef-gold-dark">
                        Application Status
                      </p>
                      <ul className="mt-4 space-y-3">
                        {[
                          { label: "Submitted", done: true },
                          { label: "Under Review", done: true },
                          { label: "Shortlisted", done: false },
                          { label: "Approved", done: false },
                          { label: "Disbursed", done: false },
                        ].map((s) => (
                          <li key={s.label} className="flex items-center gap-2.5 text-sm">
                            <span
                              className={`inline-flex h-5 w-5 items-center justify-center rounded-full ${
                                s.done ? "bg-scef-gold text-scef-blue-darker" : "bg-muted text-muted-foreground"
                              }`}
                            >
                              <CheckCircle2 className="h-3 w-3" />
                            </span>
                            <span className={s.done ? "font-semibold text-scef-blue-darker" : "text-muted-foreground"}>
                              {s.label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* documents + exam */}
                    <div className="bg-background p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-scef-gold-dark">
                        Documents & Exam
                      </p>
                      <ul className="mt-4 space-y-2.5 text-sm">
                        {[
                          { icon: FileCheck2, label: "ID uploaded", tone: "ok" },
                          { icon: FileCheck2, label: "Academic record uploaded", tone: "ok" },
                          { icon: FileCheck2, label: "Statement of need uploaded", tone: "ok" },
                          { icon: FileUp, label: "Recommendation (optional)", tone: "muted" },
                        ].map((d) => {
                          const Icon = d.icon;
                          return (
                            <li key={d.label} className="flex items-center gap-2 text-foreground">
                              <Icon className={`h-4 w-4 ${d.tone === "ok" ? "text-scef-gold-dark" : "text-muted-foreground"}`} />
                              <span className={d.tone === "muted" ? "text-muted-foreground" : ""}>{d.label}</span>
                            </li>
                          );
                        })}
                      </ul>
                      <div className="mt-5 rounded-lg border border-border bg-card p-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-scef-gold-dark">
                          Online Exam
                        </p>
                        <p className="mt-1.5 text-sm font-semibold text-scef-blue-darker">Scheduled · Pending</p>
                        <p className="mt-1 text-xs text-muted-foreground">Notification will arrive 72h before exam.</p>
                      </div>
                    </div>

                    {/* wallet + notifications */}
                    <div className="bg-background p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-scef-gold-dark">
                        EduAid Wallet
                      </p>
                      <div className="mt-4 rounded-xl bg-gradient-to-br from-scef-blue-darker to-[#0B5D3B] p-4 text-white">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-white/70">
                            Balance
                          </span>
                          <Coins className="h-4 w-4 text-scef-gold" />
                        </div>
                        <p className="mt-1.5 font-display text-2xl font-bold">
                          0.00 <span className="text-sm font-semibold text-scef-gold">AGC</span>
                        </p>
                        <p className="mt-2 text-[11px] text-white/70">Wallet ID · EDU-2026-XXXX</p>
                      </div>
                      <div className="mt-4 flex items-start gap-2 rounded-lg bg-scef-gold/10 p-3 text-xs text-scef-blue-darker">
                        <Bell className="mt-0.5 h-3.5 w-3.5 shrink-0 text-scef-gold-dark" />
                        <span>You'll be notified at every status change and disbursement event.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  <Button asChild size="lg" className="h-12 bg-scef-gold px-7 font-semibold text-[#0A0A0A] hover:bg-scef-gold-hover">
                    <Link to="/scholarship/my-application">
                      Open My Application <ArrowRight className="ms-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          </Reveal>

          {/* ONLINE EXAMINATION */}
          <Reveal>
            <section className="bg-background py-20 md:py-24">
              <div className="container mx-auto grid gap-10 px-6 md:grid-cols-2 md:px-8">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
                    Scholarship Assessment
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-[2.5rem]">
                    Online Exam · Fair, accessible, low-bandwidth
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                    Some scholarship categories require a short online assessment. The exam runs on any device, with a low-bandwidth mode for areas with limited connectivity, accessibility options, and a secure auto-submit.
                  </p>
                  <ul className="mt-6 space-y-2.5 text-sm">
                    {[
                      { icon: ClipboardCheck, label: "Exam registration & schedule" },
                      { icon: Timer, label: "Timer interface with auto-submit warnings" },
                      { icon: ListChecks, label: "Question navigation & flag-for-review" },
                      { icon: Wifi, label: "Low-bandwidth mode for rural connectivity" },
                      { icon: ShieldCheck, label: "Result status delivered privately" },
                    ].map((f) => {
                      const Icon = f.icon;
                      return (
                        <li key={f.label} className="flex items-start gap-2.5 text-foreground">
                          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-scef-gold-dark" />
                          <span>{f.label}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button asChild className="h-11 bg-scef-blue-darker px-6 font-semibold hover:bg-scef-blue">
                      <Link to="/scholarship/exam">
                        Register for Scholarship Exam <ArrowRight className="ms-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* exam mock card */}
                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-scef-gold-dark">
                      EduAid Assessment · Demo
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-scef-blue-darker px-2.5 py-1 text-[10px] font-bold text-scef-gold">
                      <Timer className="h-3 w-3" /> 28:14
                    </span>
                  </div>
                  <p className="mt-4 font-display text-base font-bold text-scef-blue-darker">
                    Question 4 of 20
                  </p>
                  <p className="mt-2 text-sm text-foreground">
                    Which of the following best describes a sustainable approach to community-led education in rural Africa?
                  </p>
                  <div className="mt-4 space-y-2">
                    {["Top-down imported curriculum", "Local-language, locally-led learning hubs", "Single-vendor digital platform only", "Short-term donor projects without governance"].map((opt, i) => (
                      <label
                        key={opt}
                        className={`flex cursor-pointer items-center gap-2.5 rounded-lg border p-3 text-sm transition-colors ${
                          i === 1 ? "border-scef-gold bg-scef-gold/10 font-semibold text-scef-blue-darker" : "border-border hover:border-scef-gold/40"
                        }`}
                      >
                        <span className={`h-3.5 w-3.5 rounded-full border ${i === 1 ? "border-scef-gold bg-scef-gold" : "border-muted-foreground"}`} />
                        {opt}
                      </label>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5"><Wifi className="h-3.5 w-3.5" /> Low-bandwidth mode on</span>
                    <span>Auto-saves every 30s</span>
                  </div>
                </div>
              </div>
            </section>
          </Reveal>

          {/* WALLET INTEGRATION */}
          <Reveal>
            <section className="bg-card py-20 md:py-24">
              <div className="container mx-auto grid gap-10 px-6 md:grid-cols-[1.1fr_1fr] md:px-8">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
                    EduAid Wallet · Powered by GFA
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-[2.5rem]">
                    Transparent scholarship payments
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                    Every applicant receives an EduAid Wallet ID for tracking applications, exam payments (where applicable), scholarship disbursements and donor support — denominated in Afri Gold Coin (AGC).
                  </p>
                  <ul className="mt-6 grid grid-cols-1 gap-2.5 text-sm sm:grid-cols-2">
                    {[
                      "AGC balance",
                      "Application wallet ID",
                      "Exam payment record",
                      "Scholarship disbursement log",
                      "Donation support received",
                      "Full transaction history",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-scef-gold-dark" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button asChild className="h-11 bg-scef-gold px-6 font-semibold text-[#0A0A0A] hover:bg-scef-gold-hover">
                      <Link to="/wallet">
                        <Wallet className="me-2 h-4 w-4" /> Activate Wallet
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="h-11 border-scef-blue-darker px-6 font-semibold text-scef-blue-darker">
                      <Link to="/wallet">View Transactions</Link>
                    </Button>
                    <Button asChild variant="ghost" className="h-11 px-6 font-semibold text-scef-blue-darker hover:bg-scef-blue-darker/5">
                      <Link to="/scholarship/my-application">Track Disbursement</Link>
                    </Button>
                  </div>
                </div>

                {/* wallet card mock */}
                <div className="relative">
                  <div className="rounded-2xl bg-gradient-to-br from-[#0A0A0A] via-scef-blue-darker to-[#0B5D3B] p-6 text-white shadow-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-scef-gold">
                        EduAid Wallet
                      </span>
                      <Wallet className="h-5 w-5 text-scef-gold" />
                    </div>
                    <p className="mt-6 text-[10px] uppercase tracking-wider text-white/60">Available Balance</p>
                    <p className="mt-1 font-display text-4xl font-bold">
                      0.00 <span className="text-base font-semibold text-scef-gold">AGC</span>
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                      <div className="rounded-lg bg-white/5 p-3">
                        <p className="text-[10px] uppercase tracking-wider text-white/60">Wallet ID</p>
                        <p className="mt-1 font-semibold">EDU-2026-XXXX</p>
                      </div>
                      <div className="rounded-lg bg-white/5 p-3">
                        <p className="text-[10px] uppercase tracking-wider text-white/60">Status</p>
                        <p className="mt-1 font-semibold text-scef-gold">Ready</p>
                      </div>
                    </div>
                    <div className="mt-5 border-t border-white/10 pt-4 text-[11px] text-white/60">
                      Disbursements are released milestone-by-milestone with full audit trail.
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Reveal>

          {/* FAQ */}

          <Reveal>
            <section className="bg-background py-20 md:py-24">
              <div className="container mx-auto px-6 md:px-8">
                <div className="mx-auto max-w-3xl text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
                    Applicant FAQ
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-[2.5rem]">
                    Common questions
                  </h2>
                </div>
                <div className="mx-auto mt-10 max-w-3xl">
                  <Accordion type="single" collapsible className="w-full space-y-3">
                    {[
                      { q: "Who can apply?", a: "Any student in or admitted to a vocational, college, polytechnic, university or professional certification programme — across Africa and (where applicable) the African diaspora." },
                      { q: "Does the scholarship cover full tuition?", a: "Awards range from full to partial tuition support depending on need, programme cost and available funds. All awards include access to EduAid online learning and mentorship." },
                      { q: "Do I need an EduAid Wallet?", a: "Yes. The EduAid Wallet (powered by GFA) is used to track your application, receive disbursements and manage scholarship payments transparently." },
                      { q: "Will there be an exam?", a: "Some categories require a short online assessment. Eligible candidates will receive registration details after the eligibility review stage." },
                      { q: "What documents are required?", a: "Valid ID, academic or skills record, statement of need, and (where available) admission letter and recommendation. Documents are stored privately and only visible to you and the review team." },
                    ].map((item, idx) => (
                      <AccordionItem
                        key={idx}
                        value={`s-faq-${idx}`}
                        className="rounded-xl border border-border bg-card px-5 hover:border-scef-gold/40 data-[state=open]:border-scef-gold/50"
                      >
                        <AccordionTrigger className="py-5 text-left font-display text-base font-bold text-scef-blue-darker hover:no-underline md:text-lg">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </section>
          </Reveal>

          {/* FINAL CTA */}
          <Reveal>
            <section className="relative overflow-hidden bg-[#0A0A0A] py-20 text-white md:py-24">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0B5D3B]/40 via-transparent to-scef-gold/10" />
              <div className="container relative mx-auto px-6 text-center md:px-8">
                <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight md:text-5xl">
                  Your education journey can{" "}
                  <span className="bg-gradient-to-r from-scef-gold to-[#F1C75B] bg-clip-text text-transparent">
                    start here.
                  </span>
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-base text-white/70 md:text-lg">
                  Apply for EduAid-Africa Scholarship 2026–2027 and access
                  funding, mentorship, digital learning and career guidance.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 bg-scef-gold px-7 font-semibold text-[#0A0A0A] hover:bg-scef-gold-hover"
                  >
                    <Link to="/scholarship/apply">
                      <ClipboardCheck className="me-2 h-4 w-4" /> Apply Now
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-12 border-white/40 bg-transparent px-7 font-semibold text-white hover:bg-white/10 hover:text-white"
                  >
                    <Link to="/auth?redirect=/scholarship/apply">
                      Create Profile
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className="h-12 px-6 font-semibold text-white hover:bg-white/10 hover:text-white"
                  >
                    <Link to="/contact">
                      <HelpCircle className="me-2 h-4 w-4" /> Ask for Help
                    </Link>
                  </Button>
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

export default EduAidScholarship2026;
