import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Users, ArrowRight, Handshake } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

export const CTASection = () => {
  const { t, isRTL } = useLocale();

  return (
    <section className="py-16 bg-scef-blue" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
            {t("home.final.title")}
          </h2>
          <p className="text-white/70 max-w-xl mx-auto">
            {t("home.hero.summary")}
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-white/10 rounded-xl p-6 text-center border border-white/10">
            <Users className="w-8 h-8 text-scef-gold mx-auto mb-3" />
            <h3 className="font-bold text-white mb-4">{t("home.final.ctaJoin")}</h3>
            <Button size="sm" className="bg-scef-gold text-scef-blue-dark hover:bg-scef-gold/90 w-full" asChild>
              <Link to="/membership">
                {t("home.final.ctaJoin")}
                <ArrowRight className="w-3 h-3 ms-1" />
              </Link>
            </Button>
          </div>

          <div className="bg-white/10 rounded-xl p-6 text-center border border-white/10">
            <Handshake className="w-8 h-8 text-white mx-auto mb-3" />
            <h3 className="font-bold text-white mb-4">{t("home.final.ctaPartner")}</h3>
            <Button size="sm" variant="outline" className="border-white text-white hover:bg-white/10 w-full" asChild>
              <Link to="/partners">
                {t("about.hero.ctaCsr")}
                <ArrowRight className="w-3 h-3 ms-1" />
              </Link>
            </Button>
          </div>

          <div className="bg-white/10 rounded-xl p-6 text-center border border-white/10">
            <Heart className="w-8 h-8 text-white mx-auto mb-3" />
            <h3 className="font-bold text-white mb-4">{t("home.final.ctaDonate")}</h3>
            <Button size="sm" variant="outline" className="border-white text-white hover:bg-white/10 w-full" asChild>
              <Link to="/donate">
                {t("cta.donateNow")}
                <Heart className="w-3 h-3 ms-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
