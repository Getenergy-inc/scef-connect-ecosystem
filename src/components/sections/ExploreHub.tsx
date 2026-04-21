import { Link } from "react-router-dom";
import {
  Building2,
  Layers,
  TrendingUp,
  Newspaper,
  MapPin,
  HeartHandshake,
  ArrowUpRight,
} from "lucide-react";

const cards = [
  {
    icon: Building2,
    title: "About Us",
    text: "Mission, vision, leadership and values.",
    href: "/about",
  },
  {
    icon: Layers,
    title: "Services",
    text: "Programs, awards, advocacy and learning.",
    href: "/programs",
  },
  {
    icon: TrendingUp,
    title: "Impact Stories",
    text: "Outcomes, case studies and reports.",
    href: "/case-studies",
  },
  {
    icon: Newspaper,
    title: "News & Updates",
    text: "Announcements, press and campaigns.",
    href: "/updates",
  },
  {
    icon: MapPin,
    title: "Country Portals",
    text: "Local chapters across Africa & diaspora.",
    href: "/local-chapters",
  },
  {
    icon: HeartHandshake,
    title: "Get Involved",
    text: "Volunteer, donate, partner or sponsor.",
    href: "/get-involved",
  },
];

export const ExploreHub = () => {
  return (
    <section className="relative bg-muted/40 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-scef-gold-dark">
            Explore SCEF
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-scef-blue-darker md:text-4xl">
            Choose your path.
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ icon: Icon, title, text, href }) => (
            <Link
              key={href}
              to={href}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-lg border border-border bg-card p-7 transition-all hover:-translate-y-0.5 hover:border-scef-gold/60 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-scef-blue/8 text-scef-blue">
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-scef-gold" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-scef-blue-darker">
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
