import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, School, Users, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";

type Card = { title: string; text: string; cta: string; href: string; Icon: typeof GraduationCap };

const cards: Card[] = [
  {
    title: "Fund Scholarships",
    text: "Sponsor learners across primary, secondary, tertiary, and vocational levels through structured scholarship pathways.",
    cta: "Sponsor Scholarships",
    href: "/sponsorship?program=scholarships",
    Icon: GraduationCap,
  },
  {
    title: "Adopt a School",
    text: "Support school transformation, renewal, and learning resources through the Rebuild My School Africa program.",
    cta: "Adopt a School",
    href: "/programs/rebuild-my-school-africa",
    Icon: School,
  },
  {
    title: "Sponsor Capacity Training",
    text: "Fund teacher training, school leadership, EdTech, and inclusive education capacity programs.",
    cta: "Sponsor Capacity Training",
    href: "/apply/capacity-training",
    Icon: Users,
  },
  {
    title: "Support Community Projects",
    text: "Back local chapter activities, livelihood projects, girls education, and youth mentoring across African communities.",
    cta: "Support Community Projects",
    href: "/local-chapters",
    Icon: HandHeart,
  },
];

export function CsrFundsManagementSection() {
  return (
    <section
      className="bg-white border-t border-border py-14 md:py-20"
      aria-labelledby="csr-funds-section-title"
    >
      <div className="container mx-auto max-w-6xl px-6 md:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          CSR &amp; partnerships
        </p>
        <div className="mt-3 h-px w-10 bg-primary/40" />
        <h2
          id="csr-funds-section-title"
          className="mt-4 font-display text-2xl md:text-[28px] font-bold tracking-tight text-scef-blue-darker max-w-3xl"
        >
          CSR Education Funds Management
        </h2>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          SCEF helps companies, donors, sponsors, diaspora supporters, and Friends of Africa partners manage
          education-impact funds through structured programs, transparent implementation, and community-level
          reporting.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ title, text, cta, href, Icon }) => (
            <article
              key={title}
              className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-scef-gold/15 text-scef-blue-darker ring-1 ring-scef-gold/30">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-scef-blue-darker">
                {title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
              <Button
                asChild
                variant="outline"
                className="mt-5 justify-between border-scef-blue-darker/20 text-scef-blue-darker hover:bg-scef-blue-darker hover:text-white"
              >
                <Link to={href} aria-label={`${cta} — ${title}`}>
                  <span>{cta}</span>
                  <ArrowRight className="ms-2 h-4 w-4" />
                </Link>
              </Button>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            asChild
            size="lg"
            className="bg-scef-blue-darker text-white hover:bg-scef-blue-darker/90 font-semibold"
          >
            <Link to="/csr-education-funds-management">
              Explore CSR Funds Management
              <ArrowRight className="ms-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
