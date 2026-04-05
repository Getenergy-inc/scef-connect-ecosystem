import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";
import { useLocale } from "@/contexts/LocaleContext";

export const HeroScreenshot = () => {
  const { t, isRTL } = useLocale();

  return (
    <section className="relative min-h-[60vh] flex items-center overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImage} alt={t("home.hero.imageAlt")} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-scef-blue-darker/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-3xl">
          <p className="text-scef-gold font-semibold text-sm mb-3 tracking-wide uppercase">
            {t("home.hero.eyebrow")}
          </p>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            {t("home.hero.title")}
          </h1>

          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
            {t("home.hero.summary")}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-dark font-bold" asChild>
              <Link to="/partner-with-us">
                {t("home.hero.ctaPartner")}
                <ArrowRight className="w-4 h-4 ms-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white/50 text-white hover:bg-white/10" asChild>
              <Link to="/get-involved/membership">
                {t("home.hero.ctaMember")}
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10" asChild>
              <Link to="/donate?type=program">
                {t("home.hero.ctaDonate")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
