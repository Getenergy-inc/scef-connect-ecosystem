import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

export const FeaturedUpdate = () => {
  const { t } = useLocale();
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
              {t("home.featured.eyebrow") || "Featured Update"}
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.5rem]">
              {t("home.featured.title") || "NESA-Africa 2026: standards into action."}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {t("home.featured.body") ||
                "Recognition that translates excellence into legacy impact across regions — powered by member chapters and verified partner pipelines."}
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>{t("home.featured.status") || "Reporting in progress"}</span>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                to="/programs/nesa-africa"
                className="inline-flex items-center gap-2 rounded-md bg-scef-blue-darker px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-scef-blue-dark"
              >
                {t("home.featured.ctaPrimary") || "Read the story"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/updates"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-scef-blue-darker hover:text-scef-gold-dark"
              >
                {t("home.featured.ctaSecondary") || "View all news"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative md:col-span-7">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-scef-blue-darker via-scef-blue-dark to-scef-blue shadow-2xl shadow-scef-blue/10 md:aspect-[5/4]">
              <div className="relative h-full w-full">
                <div className="absolute inset-0 bg-scef-pattern opacity-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(45_92%_42%/0.18),transparent_60%)]" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white md:p-12">
                  <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-scef-gold/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-scef-gold-light">
                    {t("home.featured.tag") || "NESA-Africa 2026"}
                  </div>
                  <p className="font-display text-2xl font-semibold leading-tight md:text-3xl lg:text-4xl">
                    {t("home.featured.imageCaption") || "Recognition as a standards mechanism."}
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
