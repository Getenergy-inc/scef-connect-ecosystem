import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  GraduationCap,
  CalendarDays,
  Heart,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Summary = {
  eyebrow: string;
  title: string;
  body: string;
  linkLabel: string;
  to: string;
  icon: typeof Award;
  accent: "blue" | "gold";
};

const items: Summary[] = [
  {
    eyebrow: "Recognition",
    title: "NESA-Africa 2026–2027 Master Timeline",
    body: "Discover the full NESA-Africa recognition journey, from public nominations and online shows to the Blue Garnet Awards Gala and post-gala education impact.",
    linkLabel: "View NESA-Africa Timeline",
    to: "/nesa-africa-timeline",
    icon: Award,
    accent: "blue",
  },
  {
    eyebrow: "Impact Cycle",
    title: "EduAid-Africa 2026–2027 Master Timeline",
    body: "Explore how EduAid-Africa turns recognition into real education impact through scholarships, school support, teacher training, digital learning, and community projects.",
    linkLabel: "View EduAid-Africa Timeline",
    to: "/eduaid-africa-timeline",
    icon: GraduationCap,
    accent: "gold",
  },
  {
    eyebrow: "12-Month Calendar",
    title: "Monthly Advocacy, Webinar & Training Calendar",
    body: "Browse SCEF's July 2026 to June 2027 monthly program calendar covering teacher training, school leadership, digital learning, girls' education, TVET, CSR funding, and impact reporting.",
    linkLabel: "Explore Monthly Calendar",
    to: "/monthly-program-calendar",
    icon: CalendarDays,
    accent: "blue",
  },
  {
    eyebrow: "Our Impact",
    title: "Education That Moves Africa Forward",
    body: "Learn how SCEF supports education access, teacher development, girls and women education, ESG, health education, digital learning, local chapters, and youth career pathways.",
    linkLabel: "Explore Our Impact",
    to: "/our-impact",
    icon: Heart,
    accent: "gold",
  },
  {
    eyebrow: "Flagship Programs",
    title: "SCEF's Continental Education Ecosystem",
    body: "Discover SCEF's core programs, including EduAid-Africa, NESA-Africa, Education Online Africa, eLibrary Africa, My Career My Life, Rebuild My School Africa, and Send a Child to School.",
    linkLabel: "Explore Flagship Programs",
    to: "/flagship-programs",
    icon: Sparkles,
    accent: "blue",
  },
  {
    eyebrow: "Pan-African Pillar",
    title: "Women & Girls Empowerment Across Africa",
    body: "See how SCEF supports girls and women through education access, leadership, STEM, digital inclusion, safeguarding, mentorship, wellbeing, ESG advocacy, and economic opportunity.",
    linkLabel: "Explore Women & Girls Empowerment",
    to: "/women-girls-empowerment",
    icon: Users,
    accent: "gold",
  },
];

const accentStyles: Record<Summary["accent"], string> = {
  blue: "bg-scef-blue-darker/10 text-scef-blue-darker ring-scef-blue-darker/20",
  gold: "bg-scef-gold/15 text-scef-gold-dark ring-scef-gold/30",
};

export const LandingSummaryHub = () => {
  return (
    <section
      aria-labelledby="landing-summary-heading"
      className="bg-background py-16 md:py-20"
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-scef-gold">
            SCEF 2026–2027
          </p>
          <h2
            id="landing-summary-heading"
            className="mt-2 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-4xl"
          >
            Explore SCEF Programs, Timelines &amp; Impact
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Quick summaries of SCEF's recognition journey, education impact
            cycle, monthly calendar, flagship programs, and women &amp; girls
            empowerment pillar — each linking to a full dedicated page.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, ...s }) => (
            <article
              key={s.to}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-scef-gold/40 hover:shadow-md"
            >
              <span
                className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ring-1 ${accentStyles[s.accent]}`}
              >
                <Icon className="h-3.5 w-3.5" /> {s.eyebrow}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold leading-snug text-scef-blue-darker">
                {s.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
              <Button asChild variant="outline" size="sm" className="mt-5 w-fit">
                <Link to={s.to}>
                  {s.linkLabel}
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingSummaryHub;
