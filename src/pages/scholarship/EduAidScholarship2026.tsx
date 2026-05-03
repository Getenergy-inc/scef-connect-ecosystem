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
