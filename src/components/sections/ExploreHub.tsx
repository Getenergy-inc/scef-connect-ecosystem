import { Link } from "react-router-dom";
import {
  Building2,
  Layers,
  Award,
  Newspaper,
  MapPin,
  HeartHandshake,
  ArrowUpRight,
} from "lucide-react";
import { MembershipBadge } from "@/components/ui/membership-badge";

const cards = [
  { icon: Building2, title: "About SCEF", text: "Our institution, mission & vision.", href: "/about" },
  { icon: Layers, title: "Programs", text: "Member-backed initiatives across Africa.", href: "/programs" },
  { icon: Award, title: "Awards", text: "NESA-Africa recognition ecosystem.", href: "/awards" },
  { icon: MapPin, title: "Chapters", text: "Regional networks across Africa & diaspora.", href: "/local-chapters" },
  { icon: Newspaper, title: "Media", text: "TV, radio, podcasts & broadcasts.", href: "/media" },
  { icon: HeartHandshake, title: "Get Involved", text: "Member, ambassador, volunteer & more.", href: "/join" },
];

export const ExploreHub = () => {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-24 md:py-36">
      {/* Soft ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--scef-blue)/0.05),transparent_60%)]" />

      <div className="container relative mx-auto px-6 md:px-8">
        <div className="mb-16 max-w-2xl md:mb-20">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
            Explore SCEF
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.75rem]">
            Choose your path.
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ icon: Icon, title, text, href }) => (
            <Link
              key={href}
              to={href}
              className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-8 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-scef-gold/50 hover:bg-white hover:shadow-2xl hover:shadow-scef-blue/5"
            >
              {/* Hover gradient */}
              <div className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-br from-scef-gold/0 to-scef-gold/[0.05] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-scef-blue-darker/[0.06] text-scef-blue-darker transition-all duration-500 group-hover:bg-scef-blue-darker group-hover:text-scef-gold">
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground/60 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-scef-gold-dark" />
              </div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-display text-xl font-semibold leading-tight text-scef-blue-darker">
                    {title}
                  </h3>
                  {title === "Get Involved" && (
                    <MembershipBadge variant="gold" label="Join" className="text-[9px] px-2 py-0.5" />
                  )}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
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
