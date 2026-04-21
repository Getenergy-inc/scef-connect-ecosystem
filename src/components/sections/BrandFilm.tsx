import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

/**
 * Short institutional intro — replaces dense About paragraphs on the homepage.
 * Routes users to /about, /programs, /governance for full detail.
 */
export const BrandFilm = () => {
  const links = [
    { label: "About SCEF", href: "/about" },
    { label: "Our Mission", href: "/about#mission" },
    { label: "Our Vision", href: "/about#vision" },
    { label: "Governance", href: "/governance" },
  ];

  return (
    <section className="relative bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-scef-gold-dark">
              Who We Are
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-scef-blue-darker md:text-4xl">
              A continental institution for education standards.
            </h2>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <p className="text-lg leading-relaxed text-foreground/80">
              Santos Creations Educational Foundation is building a stronger
              educational future for Africa through technology, advocacy,
              empowerment, and strategic partnerships — driven by membership,
              diaspora strength, CSR partners, and grassroots local chapters.
            </p>

            <div className="mt-10 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {links.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="group flex items-center justify-between border-b border-border py-3 text-sm font-medium text-scef-blue-darker transition-colors hover:border-scef-gold hover:text-scef-blue"
                >
                  <span>{l.label}</span>
                  <ArrowUpRight className="h-4 w-4 text-scef-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
