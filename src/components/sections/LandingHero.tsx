import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, School, GraduationCap, Users, MapPin } from "lucide-react";
import heroImg from "@/assets/hero-classroom.jpg";

const quickActions = [
  { label: "Sponsor a Program", href: "/sponsorship", Icon: Award },
  { label: "Adopt a School", href: "/programs/rebuild-my-school-africa", Icon: School },
  { label: "Fund Scholarships", href: "/sponsorship?program=scholarships", Icon: GraduationCap },
  { label: "Join as a Member", href: "/membership", Icon: Users },
  { label: "Start a Local Chapter", href: "/chapters/start-chapter", Icon: MapPin },
];

/**
 * Institutional full-bleed hero — clear value prop, two primary CTAs,
 * and a horizontal strip of quick-action links to reduce bounce.
 */
export const LandingHero = () => {
  return (
    <section className="relative bg-scef-blue-darker border-b border-border">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="African students learning together in a community classroom"
          className="h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-scef-blue-darker/92 via-scef-blue-darker/70 to-scef-blue-darker/25" />
        <div className="absolute inset-0 bg-scef-blue-darker/15" />
      </div>

      <div className="relative container mx-auto max-w-6xl px-6 md:px-8">
        <div className="py-20 md:py-28 max-w-3xl">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-scef-gold">
            Santos Creations Educational Foundation
          </p>
          <h1 className="font-display text-white text-[clamp(2rem,4.6vw,3.1rem)] font-bold leading-[1.1] tracking-tight">
            Managing CSR Education Funds for Real Impact Across Africa
          </h1>
          <p className="mt-5 text-[15px] md:text-base leading-relaxed text-white/85 max-w-2xl">
            SCEF is a membership-based Pan-African NGO helping companies, donors, sponsors, diaspora
            supporters, and partners channel CSR and education funds into scholarships, school
            transformation, teacher development, vocational training, digital learning, and
            community-led projects.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChild size="sm" className="h-10 px-5 text-[13px] rounded-md bg-scef-gold text-scef-blue-darker hover:bg-scef-gold/90 font-semibold">
              <Link to="/partner-with-us">
                Partner With SCEF <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="h-10 px-5 text-[13px] rounded-md bg-white/95 text-scef-blue-darker border-white hover:bg-white"
            >
              <Link to="/donate">Support Education Funds</Link>
            </Button>
          </div>

          <p className="mt-6 text-[11px] text-white/65 tracking-wide">
            Registered Pan-African not-for-profit · IT-41501 · SCEF chapters across Africa
          </p>
        </div>
      </div>

      {/* Quick-action strip */}
      <div className="relative border-t border-white/10 bg-scef-blue-darker/85 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl px-6 md:px-8 py-3">
          <ul className="flex flex-wrap items-center justify-center md:justify-between gap-x-5 gap-y-2">
            {quickActions.map(({ label, href, Icon }) => (
              <li key={href}>
                <Link
                  to={href}
                  className="group inline-flex items-center gap-1.5 text-[12.5px] font-medium text-white/85 hover:text-scef-gold transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
