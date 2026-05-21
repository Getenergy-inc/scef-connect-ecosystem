import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import heroBg from "@/assets/hero-nesa-team.jpg";

/**
 * Conversion-focused hero with NESA team photo background.
 */
export const LeanHero = () => {
  return (
    <section className="relative isolate overflow-hidden text-white">
      {/* Background image */}
      <img
        src={heroBg}
        alt="NESA-Africa team and guests on stage at the New Education Standard Award Africa event"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        loading="eager"
      />
      {/* Dark overlays for contrast */}
      <div className="absolute inset-0 -z-10 bg-scef-blue-darker/80" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-scef-blue-darker/95 via-scef-blue-darker/75 to-scef-blue-darker/40" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-scef-pattern opacity-[0.06]" />

      <div className="container relative mx-auto px-6 md:px-8">
        <div className="grid items-center gap-10 py-20 md:grid-cols-12 md:gap-14 md:py-28 lg:py-32">
          <div className="md:col-span-7 lg:col-span-6">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold-light ring-1 ring-white/15 backdrop-blur">
              Santos Creations Educational Foundation · Reg. IT-41501
            </p>
            <h1 className="font-display text-[2.25rem] font-bold leading-[1.08] tracking-tight drop-shadow-md md:text-5xl lg:text-[3.5rem]">
              Connecting Recognition to{" "}
              <span className="text-scef-gold">Education Impact</span> Across Africa
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              SCEF powers education recognition, scholarships, school support,
              teacher development, digital learning, and community-led
              education impact across Africa.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="h-12 bg-scef-gold px-7 font-semibold text-scef-blue-darker hover:bg-scef-gold-hover"
                asChild
              >
                <Link to="/programs">
                  Explore Our Work
                  <ArrowRight className="ms-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-white/40 bg-white/5 px-7 font-semibold text-white backdrop-blur hover:bg-white/15 hover:text-white"
                asChild
              >
                <Link to="/get-involved">
                  <Heart className="me-2 h-4 w-4" />
                  Support Education Impact
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeanHero;
