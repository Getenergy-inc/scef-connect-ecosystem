import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import heroImg from "@/assets/hero-schoolgirl.jpg";

/**
 * Conversion-focused hero: one clear headline, one sub, two CTAs.
 */
export const LeanHero = () => {
  return (
    <section className="relative bg-scef-blue-darker text-white">
      <div className="pointer-events-none absolute inset-0 bg-scef-pattern opacity-[0.05]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(217_91%_25%/0.6),transparent_55%)]" />

      <div className="container relative mx-auto px-6 md:px-8">
        <div className="grid items-center gap-10 py-16 md:grid-cols-12 md:gap-14 md:py-24 lg:py-28">
          <div className="md:col-span-6">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold-light ring-1 ring-white/15">
              Santos Creations Educational Foundation · Reg. IT-41501
            </p>
            <h1 className="font-display text-[2.25rem] font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-[3.5rem]">
              Connecting Recognition to{" "}
              <span className="text-scef-gold">Education Impact</span> Across Africa
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
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
                className="h-12 border-white/40 bg-transparent px-7 font-semibold text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link to="/get-involved">
                  <Heart className="me-2 h-4 w-4" />
                  Support Education Impact
                </Link>
              </Button>
            </div>
          </div>

          <div className="md:col-span-6">
            <div className="relative overflow-hidden rounded-2xl bg-scef-blue-darker shadow-2xl shadow-black/40">
              <img
                src={heroImg}
                alt="African students, teachers and community members in a learning setting"
                width={1920}
                height={1080}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeanHero;
