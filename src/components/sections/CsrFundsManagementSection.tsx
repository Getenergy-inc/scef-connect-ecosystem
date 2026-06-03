import { Link } from "react-router-dom";
import {
  ArrowRight,
  GraduationCap,
  School,
  Users,
  HandHeart,
  BookOpen,
  Laptop,
  Heart,
  Accessibility,
  Megaphone,
  Briefcase,
  Award,
  Building2,
  Radio,
  ShieldCheck,
  Target,
  FileBarChart,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type SupportItem = { title: string; Icon: typeof GraduationCap };

const supportItems: SupportItem[] = [
  { title: "Scholarships & bursaries", Icon: GraduationCap },
  { title: "School transformation & infrastructure", Icon: School },
  { title: "Teacher development & training", Icon: Users },
  { title: "Vocational & TVET programs", Icon: Briefcase },
  { title: "Digital learning & eLibrary access", Icon: Laptop },
  { title: "Women & girls education", Icon: Heart },
  { title: "Special needs education support", Icon: Accessibility },
  { title: "Education advocacy & policy dialogue", Icon: Megaphone },
  { title: "Youth leadership & career development", Icon: Award },
  { title: "Local chapter community projects", Icon: HandHeart },
  { title: "Recognition through NESA-Africa", Icon: Award },
  { title: "School rebuilding (RMSA)", Icon: Building2 },
  { title: "Media advocacy: NESA TV & It's In Me Radio", Icon: Radio },
  { title: "eLibrary Nigeria & knowledge access", Icon: BookOpen },
];

const promisePillars = [
  {
    title: "Directed",
    text: "Every contribution is channelled to a clear purpose and verified beneficiary group.",
    Icon: Target,
  },
  {
    title: "Monitored",
    text: "Activities are tracked through structured local implementation pathways.",
    Icon: ShieldCheck,
  },
  {
    title: "Reported",
    text: "Outcomes are documented through transparent impact reporting to partners.",
    Icon: FileBarChart,
  },
];

export function CsrFundsManagementSection() {
  return (
    <section
      className="bg-white border-t border-border py-14 md:py-20"
      aria-labelledby="csr-funds-section-title"
    >
      <div className="container mx-auto max-w-6xl px-6 md:px-8">
        {/* Header */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          Santos Creations Educational Foundation
        </p>
        <div className="mt-3 h-px w-10 bg-primary/40" />
        <h2
          id="csr-funds-section-title"
          className="mt-4 font-display text-2xl md:text-[32px] font-bold tracking-tight text-scef-blue-darker max-w-4xl leading-tight"
        >
          Advocating Education for All. Managing CSR Education Funds.
          Delivering Real Impact Across Africa.
        </h2>

        {/* Positioning paragraphs */}
        <div className="mt-6 max-w-3xl space-y-4 text-[15px] md:text-base leading-relaxed text-muted-foreground">
          <p>
            SCEF helps corporate organizations, donors, development partners, governments, schools,
            NGOs, foundations, and diaspora communities channel education-focused CSR funds into
            measurable social impact — scholarships, school transformation, teacher development,
            vocational training, digital learning, women and girls education, special needs
            education support, and community-led education projects.
          </p>
          <p>
            Through a structured ecosystem of programs, local chapters, ambassadors, volunteers,
            partners, media platforms, and digital learning systems, SCEF connects funding,
            advocacy, education innovation, and grassroots implementation to support underserved
            learners, educators, schools, and communities.
          </p>
          <p className="text-scef-blue-darker font-medium">
            Education is the foundation for leadership, economic empowerment, social progress,
            sustainability, innovation, and long-term community development.
          </p>
          <p>
            SCEF exists to ensure that education funding does not remain symbolic, scattered, or
            unmeasured. We help partners transform CSR commitments into accountable, transparent,
            and reportable education impact across Africa.
          </p>
        </div>

        {/* What We Support */}
        <div className="mt-14">
          <h3 className="font-display text-xl md:text-2xl font-bold text-scef-blue-darker">
            What We Support
          </h3>
          <div className="mt-2 h-px w-10 bg-scef-gold" />
          <p className="mt-3 max-w-2xl text-sm md:text-[15px] text-muted-foreground">
            SCEF supports education impact across the following areas:
          </p>

          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {supportItems.map(({ title, Icon }) => (
              <li
                key={title}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition hover:border-scef-gold/50 hover:shadow-md"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                </span>
                <span className="text-sm font-medium text-scef-blue-darker leading-snug pt-1">
                  {title}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Promise to Partners */}
        <div className="mt-16 rounded-2xl border border-scef-gold/30 bg-gradient-to-br from-scef-blue-darker to-scef-blue p-6 md:p-10 shadow-lg">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold">
            Our Promise to Partners
          </p>
          <h3 className="mt-3 font-display text-xl md:text-2xl font-bold text-white max-w-3xl leading-snug">
            A structured platform for CSR education funds to be directed, monitored, reported, and
            connected to real community outcomes.
          </h3>
          <p className="mt-4 max-w-3xl text-sm md:text-[15px] text-white/85 leading-relaxed">
            We work with partners to ensure that every education investment is linked to a clear
            purpose, verified beneficiary group, measurable activity, local implementation
            pathway, and impact reporting process.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {promisePillars.map(({ title, text, Icon }) => (
              <div
                key={title}
                className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 p-5"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-scef-gold/20 text-scef-gold ring-1 ring-scef-gold/40">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h4 className="mt-4 font-display text-base font-semibold text-white">
                  {title}
                </h4>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/80">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-14 text-center">
          <h3 className="font-display text-xl md:text-2xl font-bold text-scef-blue-darker max-w-3xl mx-auto leading-snug">
            Partner with SCEF to fund education with purpose, transparency, and measurable impact.
          </h3>
          <p className="mt-3 text-sm md:text-[15px] text-muted-foreground max-w-2xl mx-auto">
            Together, we can empower education, advocate Education for All, and sustain Africa's
            future.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-scef-blue-darker text-white hover:bg-scef-blue-darker/90 font-semibold"
            >
              <Link to="/partner-with-us">
                Partner With SCEF
                <ArrowRight className="ms-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-scef-gold text-scef-blue-darker hover:bg-scef-gold/90 font-semibold"
            >
              <Link to="/donate">Support Education Funds</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-emerald-600/40 text-emerald-700 hover:bg-emerald-50 font-semibold"
            >
              <Link to="/programs">Donate / Support a Program</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-scef-blue-darker/20 text-scef-blue-darker hover:bg-scef-blue-darker hover:text-white font-semibold"
            >
              <Link to="/programs">Explore Our Programs</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-scef-blue-darker/20 text-scef-blue-darker hover:bg-scef-blue-darker hover:text-white font-semibold"
            >
              <Link to="/support/sophia-faqs">
                <MessageCircle className="me-2 h-4 w-4" />
                Contact Sophia Support
              </Link>
            </Button>
          </div>

          <div className="mt-8">
            <Link
              to="/csr-education-funds-management"
              className="inline-flex items-center gap-2 text-sm font-semibold text-scef-blue-darker hover:text-scef-gold-dark transition-colors"
            >
              Explore CSR Funds Management in detail
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
