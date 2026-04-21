import { Link } from "react-router-dom";
import { ArrowRight, Network, MapPin, Handshake } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const links = [
  { icon: Network, label: "Explore Programs", href: "/programs" },
  { icon: MapPin, label: "Join a Chapter", href: "/local-chapters" },
  { icon: Handshake, label: "Partner With Us", href: "/partner-with-us" },
];

/**
 * Who We Are — concise institutional positioning, two short lines + 3 link cards.
 */
export const WhoWeAreLean = () => {
  const { t } = useLocale();
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[hsl(145_63%_35%)]">
            {t("home.who.eyebrow") || "Who We Are"}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.5rem]">
            {t("home.who.title") || "A Structured Education Impact Ecosystem"}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("home.who.body1") ||
              "SCEF is a membership-run foundation building systems that help education improve, scale, and stay accountable across Africa."}
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("home.who.body2") ||
              "We connect programs, chapters, partners, platforms, and media to deliver measurable outcomes."}
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {links.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              to={href}
              className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-scef-gold/40 hover:shadow-md"
            >
              <span className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-scef-gold-dark" strokeWidth={1.75} />
                <span className="text-sm font-semibold text-scef-blue-darker">
                  {t(`home.who.links.${label}`) || label}
                </span>
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-scef-gold-dark" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
