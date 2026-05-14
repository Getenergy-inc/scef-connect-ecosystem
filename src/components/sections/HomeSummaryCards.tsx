import { Link } from "react-router-dom";
import { ArrowRight, Heart, GraduationCap } from "lucide-react";
import impactImage from "@/assets/hero-education.jpg";
import programsImage from "@/assets/hero-classroom.jpg";

interface SummaryCardProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  chips: string[];
  primary: { label: string; to: string };
  secondary: { label: string; to: string };
  accent: "gold" | "green";
}

function SummaryCard({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  chips,
  primary,
  secondary,
  accent,
}: SummaryCardProps) {
  const eyebrowColor =
    accent === "green" ? "text-[hsl(145_63%_35%)]" : "text-scef-gold-dark";
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border-2 border-border bg-card transition-all hover:-translate-y-1 hover:border-scef-gold/40 hover:shadow-xl">
      <div className="relative h-56 md:h-64 overflow-hidden">
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-scef-blue-darker/70 via-scef-blue-darker/10 to-transparent" />
        <span
          className={`absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur ring-1 ring-scef-gold/30 text-[11px] font-semibold uppercase tracking-widest ${eyebrowColor}`}
        >
          {eyebrow}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <h3 className="font-display text-2xl md:text-[1.75rem] font-bold leading-tight text-scef-blue-darker">
          {title}
        </h3>
        <p className="mt-3 text-sm md:text-base leading-relaxed text-muted-foreground line-clamp-3">
          {subtitle}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span
              key={c}
              className="inline-flex items-center px-3 py-1 rounded-full bg-scef-gold/10 ring-1 ring-scef-gold/25 text-[11px] font-semibold text-scef-blue-darker"
            >
              {c}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to={primary.to}
            className="inline-flex items-center gap-2 rounded-lg bg-scef-blue-darker text-white px-5 py-2.5 text-sm font-semibold hover:bg-scef-blue transition-colors"
          >
            {primary.label} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to={secondary.to}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-scef-gold text-scef-blue-darker px-5 py-2.5 text-sm font-semibold hover:bg-scef-gold hover:text-scef-blue-darker transition-colors"
          >
            {secondary.label}
          </Link>
        </div>
      </div>
    </article>
  );
}

/**
 * Two compact summary cards that replace the long Impact + Featured Programs
 * sections on the homepage. Detailed content lives on /impact and /programs.
 */
export const HomeSummaryCards = () => {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid gap-6 md:gap-8 lg:grid-cols-2 max-w-7xl mx-auto">
          <SummaryCard
            accent="green"
            eyebrow="Our Impact"
            title="Impact That Moves Communities Forward"
            subtitle="Explore how SCEF advances education access, teacher development, girls and women education, ESG, health education, digital learning, local chapters, and youth career pathways across Africa."
            image={impactImage}
            imageAlt="African students in a community classroom"
            chips={[
              "Education Access",
              "Teacher Development",
              "Girls & Women Education",
              "ESG & Sustainability",
            ]}
            primary={{ label: "Explore Our Impact", to: "/impact" }}
            secondary={{ label: "Support Our Work", to: "/support-us" }}
          />
          <SummaryCard
            accent="gold"
            eyebrow="Flagship Programs"
            title="Flagship Programs Powering Africa's Education Future"
            subtitle="Discover SCEF's ecosystem of programs — EduAid-Africa, NESA-Africa, Education Online Africa, eLibrary Africa, My Career My Life, Rebuild My School Africa, and Send a Child to School."
            image={programsImage}
            imageAlt="African classroom with engaged students"
            chips={[
              "EduAid-Africa",
              "NESA-Africa",
              "eLibrary Africa",
              "Rebuild My School Africa",
            ]}
            primary={{ label: "Explore Programs", to: "/programs" }}
            secondary={{ label: "Support a Program", to: "/support-us" }}
          />
        </div>
      </div>
    </section>
  );
};

export default HomeSummaryCards;
