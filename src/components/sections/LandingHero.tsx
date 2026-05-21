import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-classroom.jpg";

/**
 * Institutional full-bleed hero — real classroom photography behind
 * a left-anchored copy block. Dark overlay for readability.
 */
export const LandingHero = () => {
  return (
    <section className="relative bg-scef-blue-darker border-b border-border">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="African students engaging with their teacher in a community classroom"
          className="h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
        {/* Overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-scef-blue-darker/90 via-scef-blue-darker/65 to-scef-blue-darker/15" />
        <div className="absolute inset-0 bg-scef-blue-darker/20" />
      </div>

      <div className="relative container mx-auto max-w-6xl px-6 md:px-8">
        <div className="py-20 md:py-28 max-w-2xl">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-scef-gold">
            Santos Creations Educational Foundation
          </p>
          <h1 className="font-display text-white text-[clamp(1.9rem,4.2vw,2.85rem)] font-bold leading-[1.12] tracking-tight">
            Achieving Education for All Across Africa
          </h1>
          <p className="mt-5 text-[15px] md:text-base leading-relaxed text-white/85 max-w-xl">
            SCEF connects diaspora support, CSR partnerships, local chapters,
            education recognition, and community action to improve learning
            opportunities across Africa.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChild size="sm" className="h-9 px-4 text-[13px] rounded-md">
              <Link to="/donate">Donate</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="h-9 px-4 text-[13px] rounded-md bg-white/95 text-scef-blue-darker border-white hover:bg-white"
            >
              <Link to="/auth/sign-up">Become a Member</Link>
            </Button>
          </div>

          <p className="mt-6 text-[11px] text-white/65 tracking-wide">
            Registered Pan-African not-for-profit · IT-41501 · SCEF chapters across Africa
          </p>
        </div>
      </div>
    </section>
  );
};
