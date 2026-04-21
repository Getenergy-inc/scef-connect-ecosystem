import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const FinalCTABand = () => {
  return (
    <section className="relative overflow-hidden bg-scef-blue-darker py-24 text-white md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(45_92%_42%/0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-scef-pattern opacity-[0.05]" />

      <div className="container relative mx-auto px-4 text-center">
        <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight md:text-5xl">
          Be part of Africa's education{" "}
          <span className="text-gradient-gold">transformation</span>.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-white/70">
          Join the movement of members, ambassadors, partners and chapters
          shaping the future of learning across the continent.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            className="h-12 bg-scef-gold px-7 font-semibold text-scef-blue-darker shadow-gold hover:bg-scef-gold-hover"
            asChild
          >
            <Link to="/donate">
              Donate Now
              <ArrowRight className="ms-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 border-white/40 bg-transparent px-7 font-semibold text-white hover:bg-white/10 hover:text-white"
            asChild
          >
            <Link to="/partners">Partner With SCEF</Link>
          </Button>
          <Link
            to="/get-involved"
            className="ms-2 text-sm font-semibold text-white/70 underline-offset-4 hover:text-scef-gold-light hover:underline"
          >
            Get involved →
          </Link>
        </div>
      </div>
    </section>
  );
};
