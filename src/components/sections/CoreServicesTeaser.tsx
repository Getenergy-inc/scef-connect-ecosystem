import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Trophy, BookOpen, Heart, Compass, Megaphone, Users, Wallet } from "lucide-react";

/**
 * Compact landing teaser linking to all dedicated SCEF experience pages.
 */
const services = [
  { icon: GraduationCap, title: "EduAid-Africa", blurb: "Scholarships, RMSA, EOA, MCML & Training.", href: "/programs/eduaid-africa" },
  { icon: Trophy, title: "NESA-Africa", blurb: "Continental education recognition platform.", href: "/programs/nesa-africa" },
  { icon: Heart, title: "Women & Girls", blurb: "Equal access, mentorship & leadership.", href: "/programs/women-girls-education" },
  { icon: BookOpen, title: "eLibrary", blurb: "Digital books and learning resources.", href: "/programs/elibrary-nigeria" },
];

const more = [
  { icon: Compass, label: "Advocacy Timeline", href: "/advocacy-timeline" },
  { icon: Megaphone, label: "Campaigns", href: "/campaigns" },
  { icon: Users, label: "Membership", href: "/get-involved/membership" },
  { icon: Wallet, label: "Wallet & Donate", href: "/wallet" },
];

export const CoreServicesTeaser = () => {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
            What we deliver
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.25rem]">
            Our Core Services
          </h2>
          <p className="mx-auto mt-3 text-sm text-muted-foreground md:text-base">
            Each service has its own dedicated experience — explore the one
            that matches your purpose.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, blurb, href }) => (
            <Link
              key={title}
              to={href}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-scef-gold/50 hover:shadow-md"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-scef-blue-darker/10 text-scef-blue-darker">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-scef-blue-darker">
                {title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-scef-blue-darker transition-colors group-hover:text-scef-gold-dark">
                Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        {/* Quick links to other dedicated experiences */}
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4">
          {more.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              to={href}
              className="group flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-scef-blue-darker transition-colors hover:border-scef-gold hover:text-scef-gold-dark"
            >
              <Icon className="h-4 w-4" />
              {label}
              <ArrowRight className="ms-auto h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
