import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight, Handshake, ClipboardList, Target, Wrench, FileCheck, BarChart3,
  Building2, Users, Globe2, GraduationCap, School, Laptop, HeartHandshake,
  Award, Briefcase, Sprout, ShieldCheck,
} from "lucide-react";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/photos/scef-classroom-teacher.jpg";

const audiences = [
  { Icon: Building2, label: "Companies with CSR education budgets" },
  { Icon: Briefcase, label: "Corporate foundations" },
  { Icon: HeartHandshake, label: "Donors and philanthropists" },
  { Icon: Globe2, label: "Diaspora supporters" },
  { Icon: Handshake, label: "Friends of Africa partners" },
  { Icon: School, label: "Schools and communities" },
  { Icon: ShieldCheck, label: "Local governments and institutions" },
  { Icon: Users, label: "NGOs and implementation partners" },
  { Icon: GraduationCap, label: "SCEF members and local chapters" },
];

const fundUses = [
  { Icon: GraduationCap, title: "Scholarships and learner support", body: "Direct scholarship support for learners across primary, secondary, and tertiary education." },
  { Icon: Wrench, title: "Vocational training scholarships", body: "Practical skills, trade, and entrepreneurship training across African regions." },
  { Icon: School, title: "School adoption and transformation", body: "Renew school infrastructure, learning materials, and operating capacity." },
  { Icon: Users, title: "Teacher training and capacity development", body: "Pedagogy, leadership, inclusive education, and EdTech training." },
  { Icon: Laptop, title: "Digital learning and eLibrary access", body: "Digital classrooms, devices, and access to the SCEF eLibrary." },
  { Icon: HeartHandshake, title: "Girls and women education support", body: "Girls' education, mentorship, STEM inclusion, and safeguarding." },
  { Icon: Sprout, title: "Agriculture and livelihood training projects", body: "Permaculture, food security, and livelihood programs such as Green Horizon." },
  { Icon: Briefcase, title: "Career guidance and youth mentoring", body: "Programs such as My Career My Life supporting youth employability." },
  { Icon: Globe2, title: "Local chapter education projects", body: "Community-led education delivery through SCEF local chapters." },
  { Icon: Award, title: "Education awards and recognition", body: "NESA-Africa visibility for educators, institutions, and changemakers." },
];

const processSteps = [
  { n: 1, Icon: Handshake, title: "CSR / donor inquiry", body: "We receive your CSR or donor interest and confirm fit with SCEF's scope." },
  { n: 2, Icon: ClipboardList, title: "Fund purpose and program selection", body: "Together we agree on the program area, geography, and beneficiary focus." },
  { n: 3, Icon: Target, title: "Project design and beneficiary mapping", body: "We design the project, identify partners, and map intended beneficiaries." },
  { n: 4, Icon: Wrench, title: "Implementation through SCEF programs and local chapters", body: "Delivery runs through verified SCEF programs and local chapter networks." },
  { n: 5, Icon: FileCheck, title: "Monitoring, documentation, and reporting", body: "We track activities, document evidence, and prepare structured updates." },
  { n: 6, Icon: BarChart3, title: "Impact report and partner visibility", body: "Partners receive an impact report aligned to the scope of the funded program." },
];

const partnershipOptions = [
  { Icon: GraduationCap, title: "Sponsor Scholarships", href: "/sponsorship?program=scholarships" },
  { Icon: School, title: "Adopt a School", href: "/programs/rebuild-my-school-africa" },
  { Icon: Users, title: "Fund Teacher Training", href: "/apply/capacity-training" },
  { Icon: Wrench, title: "Sponsor Vocational Skills", href: "/apply/vocational-scholarship" },
  { Icon: HeartHandshake, title: "Support Girls Education", href: "/women-girls-empowerment" },
  { Icon: Laptop, title: "Fund Digital Learning", href: "/programs/elibrary-nigeria" },
  { Icon: Sprout, title: "Sponsor Green Horizon Initiative", href: "/apply/green-horizon" },
  { Icon: Briefcase, title: "Sponsor My Career My Life", href: "/sponsorship?program=my-career-my-life" },
  { Icon: Globe2, title: "Support Local Chapter Projects", href: "/local-chapters" },
  { Icon: Award, title: "Sponsor NESA-Africa Recognition", href: "/programs/nesa-africa" },
];

export default function CsrEducationFundsManagement() {
  return (
    <>
      <Helmet>
        <title>CSR Education Funds Management | SCEF</title>
        <meta
          name="description"
          content="SCEF manages CSR and education-impact funds — scholarships, school transformation, teacher development, digital learning, vocational training, and community projects across Africa."
        />
        <link rel="canonical" href="https://santoscreationsorg.lovable.app/csr-education-funds-management" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px]" />

        <main>
          {/* HERO */}
          <section className="relative isolate overflow-hidden bg-scef-blue-darker text-white">
            <div className="absolute inset-0 -z-10">
              <img
                src={heroImage}
                alt="SCEF classroom and education program photo"
                className="h-full w-full object-cover opacity-25"
                width={1600}
                height={900}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-scef-blue-darker via-scef-blue-darker/90 to-scef-blue-darker/70" />
            </div>
            <div className="container mx-auto max-w-6xl px-6 md:px-8 py-16 md:py-24">
              <div className="inline-flex items-center gap-2 rounded-full border border-scef-gold/50 bg-scef-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold">
                <ShieldCheck className="h-3.5 w-3.5" />
                Membership-based Pan-African NGO
              </div>
              <h1 className="mt-5 max-w-3xl font-display text-3xl font-bold leading-[1.05] tracking-tight md:text-5xl">
                CSR Education Funds Management
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
                SCEF manages CSR and education-impact funds to support scholarships, school transformation,
                teacher development, digital learning, vocational training, women and girls education, and
                community-led education projects across Africa.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-scef-gold hover:bg-scef-gold/90 text-scef-blue-darker font-semibold">
                  <Link to="/partner-with-us">
                    Request CSR Partnership Proposal
                    <ArrowRight className="ms-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-scef-blue-darker">
                  <Link to="/sponsorship">Sponsor a Program</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-scef-blue-darker">
                  <Link to="/programs/rebuild-my-school-africa">Adopt a School</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* 1. WHAT WE DO */}
          <section className="bg-white py-14 md:py-20">
            <div className="container mx-auto max-w-5xl px-6 md:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">01 — What we do</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-4xl">
                Turning CSR commitments into measurable education impact.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
                SCEF helps organizations and supporters turn CSR commitments into measurable education impact.
                We receive, manage, coordinate, and report on education-focused funds directed toward scholarships,
                school support, teacher training, vocational skills, digital learning, girls education, and
                community projects.
              </p>
            </div>
          </section>

          {/* 2. WHO WE SERVE */}
          <section className="bg-muted/40 border-y border-border py-14 md:py-20">
            <div className="container mx-auto max-w-6xl px-6 md:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">02 — Who we serve</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-[2rem]">
                Partners we support
              </h2>
              <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {audiences.map(({ Icon, label }) => (
                  <li key={label} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                    <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-scef-blue-darker/5 text-scef-blue-darker ring-1 ring-scef-blue-darker/10">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <span className="text-sm leading-relaxed text-scef-blue-darker">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 3. HOW FUNDS ARE USED */}
          <section className="bg-white py-14 md:py-20">
            <div className="container mx-auto max-w-6xl px-6 md:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">03 — How funds are used</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-[2rem]">
                Where CSR education funds go
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {fundUses.map(({ Icon, title, body }) => (
                  <article key={title} className="rounded-xl border border-border bg-card p-5">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-scef-gold/15 text-scef-blue-darker ring-1 ring-scef-gold/30">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="mt-4 font-semibold text-scef-blue-darker">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* 4. PROCESS */}
          <section className="bg-scef-blue-darker text-white py-14 md:py-20">
            <div className="container mx-auto max-w-6xl px-6 md:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold">04 — Our process</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-[2rem]">
                Our fund management process
              </h2>
              <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {processSteps.map(({ n, Icon, title, body }) => (
                  <li key={n} className="rounded-xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-scef-gold text-scef-blue-darker text-sm font-bold">
                        {n}
                      </span>
                      <Icon className="h-5 w-5 text-scef-gold" strokeWidth={1.75} />
                    </div>
                    <h3 className="mt-4 font-semibold">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/75">{body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* 5. RECOGNITION-TO-IMPACT */}
          <section className="bg-white py-14 md:py-20">
            <div className="container mx-auto max-w-5xl px-6 md:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">05 — Recognition to impact</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-[2rem]">
                One model — visibility, funding, implementation, and reporting.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
                Through NESA-Africa, SCEF creates visibility for education excellence. Through EduAid-Africa and
                other programs, SCEF channels support into real education outcomes. This connects recognition,
                funding, implementation, and impact reporting into one structured model.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <Link to="/programs/nesa-africa" className="group rounded-xl border border-border bg-card p-5 hover:border-primary/40">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Visibility</div>
                  <div className="mt-2 font-display text-lg font-bold text-scef-blue-darker">NESA-Africa →</div>
                  <p className="mt-1 text-sm text-muted-foreground">Continental recognition that draws partner attention to education excellence.</p>
                </Link>
                <Link to="/programs/eduaid-africa" className="group rounded-xl border border-border bg-card p-5 hover:border-primary/40">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Delivery</div>
                  <div className="mt-2 font-display text-lg font-bold text-scef-blue-darker">EduAid-Africa →</div>
                  <p className="mt-1 text-sm text-muted-foreground">Implementation of education-aid projects funded by partners and donors.</p>
                </Link>
              </div>
            </div>
          </section>

          {/* 6. TRANSPARENCY */}
          <section className="bg-muted/40 border-y border-border py-14 md:py-20">
            <div className="container mx-auto max-w-5xl px-6 md:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">06 — Transparency &amp; accountability</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-[2rem]">
                Responsible fund management.
              </h2>
              <div className="mt-5 rounded-xl border border-border bg-card p-6">
                <p className="text-[15px] leading-relaxed text-scef-blue-darker">
                  SCEF is committed to responsible fund management, proper documentation, beneficiary tracking,
                  project monitoring, and impact reporting. Partners receive updates, project evidence, and
                  reports based on the scope of the funded program.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Reporting is delivered in line with the program scope agreed with each partner.
                  Reporting in progress for ongoing programs.
                </p>
              </div>
            </div>
          </section>

          {/* 7. PARTNERSHIP OPTIONS */}
          <section className="bg-white py-14 md:py-20">
            <div className="container mx-auto max-w-6xl px-6 md:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">07 — Partnership options</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-[2rem]">
                CSR partnership options
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {partnershipOptions.map(({ Icon, title, href }) => (
                  <Link
                    key={title}
                    to={href}
                    className="group rounded-xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-sm transition"
                  >
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-scef-gold/15 text-scef-blue-darker ring-1 ring-scef-gold/30">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold text-scef-blue-darker">{title}</h3>
                    <span className="mt-2 inline-flex items-center text-[12px] text-primary group-hover:underline">
                      Learn more <ArrowRight className="ms-1 h-3 w-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* 8. CTA */}
          <section className="bg-scef-blue-darker text-white py-16 md:py-20">
            <div className="container mx-auto max-w-5xl px-6 md:px-8 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                Turn Your CSR Budget Into Measurable Education Impact
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/85 max-w-3xl mx-auto">
                Partner with SCEF to fund education programs that support learners, teachers, schools,
                women, youth, and communities across Africa.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="bg-scef-gold hover:bg-scef-gold/90 text-scef-blue-darker font-semibold">
                  <Link to="/partner-with-us">
                    Request CSR Partnership Proposal <ArrowRight className="ms-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-scef-blue-darker">
                  <Link to="/sponsorship">Sponsor a Program</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-scef-blue-darker">
                  <Link to="/programs/rebuild-my-school-africa">Adopt a School</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
