import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-schoolgirl.jpg";
import { useLocale } from "@/contexts/LocaleContext";

/**
 * Clean institutional hero — UN-inspired public-sector layout.
 * Two columns: copy left, real documentary photo right.
 * No gradients, no orbs, no oversized CTAs.
 */
export const LandingHero = () => {
  const { t } = useLocale();

  return (
    <section className="relative bg-white border-b border-border">
      <div className="container mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid items-center gap-10 py-12 md:grid-cols-12 md:gap-12 md:py-20">
          {/* LEFT — Copy */}
          <div className="md:col-span-7">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              Santos Creations Educational Foundation
            </p>
            <h1 className="font-display text-[clamp(2rem,4vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-scef-blue-darker">
              Connecting Education Recognition to Real Impact Across Africa
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
              SCEF supports education recognition, scholarships, school transformation,
              teacher development, digital learning, and community-led education impact
              across Africa.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button asChild>
                <Link to="/programs">
                  Explore Our Work
                  <ArrowRight className="ms-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/donate">Support Education Impact</Link>
              </Button>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              Registered Pan-African not-for-profit · IT-41501 · Working across SCEF chapters in Africa
            </p>
          </div>

          {/* RIGHT — Documentary photo */}
          <div className="md:col-span-5">
            <figure className="overflow-hidden rounded-md border border-border bg-muted">
              <div className="aspect-[4/5] w-full">
                <img
                  src={heroImg}
                  alt={t("home.heroV2.imageAlt") || "Students walking together in an African schoolyard"}
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <figcaption className="bg-scef-blue-darker px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-white/85">
                Field photography · SCEF community programs
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};
