import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import eduaidLogo from "@/assets/eduaid-africa-logo.jpg";
import nesaLogo from "@/assets/nesa-africa-logo.jpg";
import rmsaPhoto from "@/assets/photos/scef-school-rebuild.jpg";
import elibraryPhoto from "@/assets/hero-education.jpg";

type Card = {
  title: string;
  description: string;
  href: string;
  cta: string;
  image: string;
  alt: string;
  isLogo?: boolean;
};

const cards: Card[] = [
  {
    title: "EduAid-Africa",
    description:
      "Scholarships, school transformation, and CSR-backed education support across African communities.",
    href: "/programs/eduaid-africa",
    cta: "Explore EduAid",
    image: eduaidLogo,
    alt: "EduAid-Africa official program logo",
    isLogo: true,
  },
  {
    title: "NESA-Africa",
    description:
      "The New Education Standard Award Africa — continental recognition of education excellence.",
    href: "/programs/nesa-africa",
    cta: "Explore NESA",
    image: nesaLogo,
    alt: "NESA-Africa official program logo",
    isLogo: true,
  },
  {
    title: "Rebuild My School Africa",
    description:
      "Renewing classrooms, libraries, and safe learning environments in underserved schools.",
    href: "/programs/rebuild-my-school-africa",
    cta: "See the Programme",
    image: rmsaPhoto,
    alt: "Community school being rebuilt under the Rebuild My School Africa programme",
  },
  {
    title: "eLibrary Africa",
    description:
      "A growing digital library giving learners and educators access to verified knowledge resources.",
    href: "/programs/elibrary-nigeria",
    cta: "Visit eLibrary",
    image: elibraryPhoto,
    alt: "African student using a digital learning device in a library setting",
  },
];

export const ProgramCardsRow = () => {
  return (
    <section className="bg-white border-y border-border">
      <div className="container mx-auto max-w-6xl px-6 md:px-8 py-14 md:py-16">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              Programs & Initiatives
            </p>
            <h2 className="mt-2 font-display text-2xl md:text-[28px] font-bold tracking-tight text-scef-blue-darker">
              Explore Our Programs
            </h2>
          </div>
          <Link
            to="/programs"
            className="hidden md:inline-flex items-center gap-1 text-[12.5px] font-medium text-primary hover:text-scef-blue-darker"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Link
              key={card.title}
              to={card.href}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30"
            >
              <div
                className={
                  card.isLogo
                    ? "aspect-[4/3] w-full bg-white flex items-center justify-center p-6 border-b border-border"
                    : "aspect-[4/3] w-full overflow-hidden bg-muted"
                }
              >
                <img
                  src={card.image}
                  alt={card.alt}
                  loading="lazy"
                  className={
                    card.isLogo
                      ? "max-h-full max-w-full object-contain"
                      : "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  }
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-[15px] font-bold text-scef-blue-darker leading-tight">
                  {card.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground line-clamp-3">
                  {card.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-[12.5px] font-medium text-primary group-hover:gap-1.5 transition-all">
                  {card.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramCardsRow;
