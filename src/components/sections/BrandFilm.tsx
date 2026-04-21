import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

/**
 * Short institutional intro — replaces dense About paragraphs on the homepage.
 * Routes users to /about, /programs, /governance for full detail.
 */
export const BrandFilm = () => {
  const links = [
    { label: "About SCEF", href: "/about" },
    { label: "Mission", href: "/about#mission" },
    { label: "Vision", href: "/about#vision" },
  ];

  return (
    <section className="relative bg-background py-28 md:py-40">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid gap-12 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
              Who We Are
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.75rem]">
              A continental institution for education.
            </h2>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <p className="text-lg leading-relaxed text-foreground/75 md:text-xl">
              Building Africa's educational future through digital access,
              advocacy, and partnerships.
            </p>

            <div className="mt-12 grid gap-x-8 gap-y-1 sm:grid-cols-2">
              {links.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="group flex items-center justify-between border-b border-border py-4 text-sm font-medium text-scef-blue-darker transition-colors hover:border-scef-gold hover:text-scef-blue"
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
