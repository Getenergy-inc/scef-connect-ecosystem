import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Users, ArrowRight, Handshake, Mail } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

export const CTASection = () => {
  const { t, isRTL } = useLocale();

  return (
    <section className="py-24 bg-scef-blue relative overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-scef-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t("home.final.title")}
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {t("home.hero.summary")}
          </p>
        </div>

        {/* CTA Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {/* Join Card */}
          <div className="group bg-white/10 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/20 hover:border-scef-gold/50 transition-all duration-300 hover:bg-white/15">
            <div className="w-14 h-14 rounded-2xl bg-scef-gold/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border-2 border-black">
              <Users className="w-7 h-7 text-scef-gold" />
            </div>
            
            <h3 className="font-display text-2xl font-bold text-white mb-3">
              {t("home.final.ctaJoin")}
            </h3>
            <p className="text-white/70 mb-6 leading-relaxed">
              {t("about.hero.subtitle")}
            </p>
            
            <Button size="lg" className="w-full bg-scef-gold text-scef-blue hover:bg-scef-gold/90 border-2 border-black" asChild>
              <Link to="/membership">
                {t("home.final.ctaJoin")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Partner Card */}
          <div className="group bg-white/10 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/20 hover:border-scef-gold/50 transition-all duration-300 hover:bg-white/15">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border-2 border-black">
              <Handshake className="w-7 h-7 text-white" />
            </div>
            
            <h3 className="font-display text-2xl font-bold text-white mb-3">
              {t("home.final.ctaPartner")}
            </h3>
            <p className="text-white/70 mb-6 leading-relaxed">
              {t("home.partnerships.body")}
            </p>
            
            <Button size="lg" variant="outline" className="w-full border-2 border-white text-white hover:bg-white/10" asChild>
              <Link to="/partners">
                {t("about.hero.ctaCsr")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Donate Card */}
          <div className="group bg-white/10 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/20 hover:border-scef-gold/50 transition-all duration-300 hover:bg-white/15">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border-2 border-black">
              <Heart className="w-7 h-7 text-white" />
            </div>
            
            <h3 className="font-display text-2xl font-bold text-white mb-3">
              {t("home.final.ctaDonate")}
            </h3>
            <p className="text-white/70 mb-6 leading-relaxed">
              {t("donate.hero.subtitle")}
            </p>
            
            <Button size="lg" variant="outline" className="w-full border-2 border-white text-white hover:bg-white/10" asChild>
              <Link to="/donate">
                {t("cta.donateNow")}
                <Heart className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center border-t border-white/20 pt-12">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10" asChild>
              <Link to="/contact">
                <Mail className="w-4 h-4" />
                {t("footer.columns.contact")}
              </Link>
            </Button>
            <span className="text-white/40 hidden sm:inline">|</span>
            <Button size="lg" variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10" asChild>
              <Link to="/donate">
                <Heart className="w-4 h-4" />
                {t("cta.donateNow")}
              </Link>
            </Button>
            <span className="text-white/40 hidden sm:inline">|</span>
            <Button size="lg" variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10" asChild>
              <Link to="/auth">
                <Users className="w-4 h-4" />
                {t("nav.top.dashboard")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
