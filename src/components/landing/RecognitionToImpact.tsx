import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, GraduationCap } from "lucide-react";

const cards = [
  {
    icon: Award,
    logo: "/assets/nesa-africa-logo.jpg",
    logoAlt: "NESA-Africa official emblem",
    title: "NESA-Africa",
    body: "Celebrating educators, schools, leaders, and organizations shaping Africa's education future.",
    cta: "View NESA Timeline",
    to: "/nesa-africa-timeline",
    accent: "bg-scef-blue-darker text-white",
    iconRing: "bg-scef-gold/20 text-scef-gold",
    logoFrame: "bg-scef-blue-dark/40 border border-white/10",
  },
  {
    icon: GraduationCap,
    logo: "/assets/eduaid-africa-logo.jpg",
    logoAlt: "EduAid-Africa — funding through partnerships logo",
    title: "EduAid-Africa",
    body: "Turning education visibility into scholarships, school support, teacher development, digital learning, and community impact.",
    cta: "View EduAid Timeline",
    to: "/eduaid-africa-timeline",
    accent: "bg-card text-foreground border border-border",
    iconRing: "bg-scef-blue-darker/10 text-scef-blue-darker",
    logoFrame: "bg-muted border border-border",
  },
] as const;

export const RecognitionToImpact = () => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-scef-gold">
            The SCEF Model
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-4xl">
            From Recognition to Real Education Impact
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            SCEF connects NESA-Africa's education recognition platform with
            EduAid-Africa's impact programs — turning visibility into
            scholarships, school support, teacher training, digital access, and
            sustainable community education projects.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
          {cards.map(({ icon: Icon, ...c }) => (
            <article
              key={c.to}
              className={`group flex flex-col rounded-2xl p-8 transition-all hover:-translate-y-1 hover:shadow-xl ${c.accent}`}
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${c.iconRing}`}>
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold">{c.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed opacity-90">
                {c.body}
              </p>
              <Button asChild size="lg" className="mt-6 w-fit bg-scef-gold text-scef-blue-darker hover:bg-scef-gold-hover">
                <Link to={c.to}>
                  {c.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecognitionToImpact;
