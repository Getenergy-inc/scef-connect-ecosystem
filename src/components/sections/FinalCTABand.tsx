import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const FinalCTABand = () => {
  return (
    <section className="relative overflow-hidden bg-scef-blue-darker py-28 text-white md:py-40">
      {/* Layered ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,hsl(45_92%_42%/0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,hsl(217_91%_30%/0.4),transparent_55%)]" />
      <div className="absolute inset-0 bg-scef-pattern opacity-[0.04]" />

      {/* Top + bottom gold rules */}
      <div className="absolute left-1/2 top-0 h-px w-1/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-scef-gold/50 to-transparent" />

      <div className="container relative mx-auto px-6 text-center md:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-scef-gold">
          Join Us
        </p>
        <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
          Shape the future of{" "}
          <span className="text-gradient-gold italic">education</span> in
          Africa.
        </h2>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 md:mt-14">
          <Button
            size="lg"
            className="group h-13 bg-scef-gold px-8 py-3 text-base font-semibold text-scef-blue-darker shadow-gold transition-all duration-300 hover:bg-scef-gold-hover hover:shadow-[0_20px_50px_-12px_hsl(45_92%_42%/0.5)]"
            asChild
          >
            <Link to="/donate">
              Donate Now
              <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-13 border-white/30 bg-white/5 px-8 py-3 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/60 hover:bg-white/10 hover:text-white"
            asChild
          >
            <Link to="/partners">Partner With SCEF</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
