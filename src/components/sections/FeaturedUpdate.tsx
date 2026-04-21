import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";

export const FeaturedUpdate = () => {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-scef-gold-dark">
              Featured Update
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-scef-blue-darker md:text-4xl">
              NESA-Africa 2025 enters its regional voting phase.
            </h2>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Reporting in progress</span>
            </div>
            <p className="mt-5 text-base leading-relaxed text-foreground/75">
              Across 57 countries, nominees compete in 135 categories — the
              continent's most rigorous, evidence-based education recognition
              system.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/programs/nesa-africa"
                className="inline-flex items-center gap-2 rounded-md bg-scef-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-scef-blue-dark"
              >
                Read the story
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/updates"
                className="inline-flex items-center gap-2 px-1 py-2.5 text-sm font-semibold text-scef-blue-darker hover:text-scef-gold-dark"
              >
                View all news
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative md:col-span-7">
            <div className="aspect-[4/3] overflow-hidden rounded-lg border border-border bg-gradient-to-br from-scef-blue-darker via-scef-blue-dark to-scef-blue shadow-lg">
              <div className="relative h-full w-full">
                <div className="absolute inset-0 bg-scef-pattern opacity-10" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-scef-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-scef-gold-light">
                    NESA-Africa 2025
                  </div>
                  <p className="font-display text-2xl font-semibold leading-tight md:text-3xl">
                    Recognition as a standards mechanism for African education.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
