import { Link } from "react-router-dom";
import {
  Award,
  HandHeart,
  Home,
  Laptop,
  Sparkles,
  HeartHandshake,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

type Program = {
  icon: typeof Award;
  title: string;
  blurb: string;
  href: string;
  color: string; // tailwind text color for icon
  bg: string;    // tailwind bg color for icon plate (light tint)
  accent: string; // link color
};

const programs: Program[] = [
  {
    icon: Award,
    title: "NESA Africa",
    blurb: "Recognizing and advancing excellence in education.",
    href: "/programs/nesa-africa",
    color: "text-scef-gold",
    bg: "bg-scef-gold/15",
    accent: "text-scef-gold-dark",
  },
  {
    icon: HandHeart,
    title: "EduAid Africa",
    blurb: "Scholarships and support pathways for learners.",
    href: "/programs/eduaid-africa",
    color: "text-white",
    bg: "bg-scef-blue",
    accent: "text-scef-blue",
  },
  {
    icon: Home,
    title: "Rebuild My School Africa",
    blurb: "Improving school environments and infrastructure.",
    href: "/programs/rebuild-my-school-africa",
    color: "text-white",
    bg: "bg-[hsl(145_63%_35%)]",
    accent: "text-[hsl(145_63%_28%)]",
  },
  {
    icon: Laptop,
    title: "Education Online Africa",
    blurb: "Digital learning and certification for the future.",
    href: "/programs/digital-learning",
    color: "text-white",
    bg: "bg-[hsl(265_60%_50%)]",
    accent: "text-[hsl(265_60%_42%)]",
  },
  {
    icon: Sparkles,
    title: "Women & Girls Education",
    blurb: "Expanding access and empowering communities.",
    href: "/programs/women-girls-education",
    color: "text-white",
    bg: "bg-[hsl(340_75%_50%)]",
    accent: "text-[hsl(340_75%_42%)]",
  },
  {
    icon: HeartHandshake,
    title: "Special Needs Education",
    blurb: "Inclusive learning and support for every ability.",
    href: "/programs/special-needs-education",
    color: "text-white",
    bg: "bg-[hsl(175_60%_38%)]",
    accent: "text-[hsl(175_60%_30%)]",
  },
  {
    icon: BookOpen,
    title: "eLibrary Nigeria",
    blurb: "Accessible digital knowledge for everyone.",
    href: "/programs/elibrary-nigeria",
    color: "text-white",
    bg: "bg-[hsl(22_88%_52%)]",
    accent: "text-[hsl(22_88%_42%)]",
  },
];

export const ProgramsThatTransform = () => {
  const { t } = useLocale();
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mb-12 text-center md:mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[hsl(145_63%_35%)]">
            {t("home.programsV2.eyebrow") || "What We Do"}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.5rem]">
            {t("home.programsV2.title") || "Programs That Transform Lives"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {t("home.programsV2.intro") ||
              "Our programs improve access, quality, inclusion, skills, and recognition across regions."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 lg:gap-5">
          {programs.map(({ icon: Icon, title, blurb, href, color, bg, accent }) => (
            <Link
              key={title}
              to={href}
              className="group flex flex-col items-center rounded-xl border border-border bg-card p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-scef-gold/40 hover:shadow-lg"
            >
              <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${bg} ${color} transition-transform duration-300 group-hover:scale-110`}>
                <Icon className="h-6 w-6" strokeWidth={2} />
              </div>
              <h3 className="font-display text-sm font-bold leading-tight text-scef-blue-darker md:text-[15px]">
                {t(`home.programsV2.cards.${title}.title`) || title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {t(`home.programsV2.cards.${title}.blurb`) || blurb}
              </p>
              <span className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold ${accent} transition-transform group-hover:translate-x-0.5`}>
                {t("home.programsV2.learnMore") || "Learn More"}
                <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold text-scef-blue-darker transition-colors hover:border-scef-gold hover:text-scef-gold-dark"
          >
            {t("home.programsV2.exploreAll") || "Explore All Programs"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
