import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Building2, Globe } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

export const GovernanceSnapshot = () => {
  const { t, isRTL } = useLocale();

  const layers = [
    { icon: Shield, titleKey: "governance.layers.bot.title", descKey: "governance.layers.bot.description", countKey: "governance.layers.bot.count" },
    { icon: Users, titleKey: "governance.layers.boa.title", descKey: "governance.layers.boa.description", countKey: "governance.layers.boa.count" },
    { icon: Building2, titleKey: "governance.layers.bod.title", descKey: "governance.layers.bod.description", countKey: "governance.layers.bod.count" },
    { icon: Globe, titleKey: "governance.layers.lcps.title", descKey: "governance.layers.lcps.description", countKey: "governance.layers.lcps.count" },
  ];

  return (
    <section className="py-16 bg-muted/30" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
            {t("governance.hero.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("governance.hero.subtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {layers.map((layer) => (
            <div key={layer.titleKey} className="bg-card rounded-xl p-5 border border-border">
              <layer.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-display text-base font-bold text-foreground mb-1">{t(layer.titleKey)}</h3>
              <span className="text-xs text-scef-gold font-semibold">{t(layer.countKey)}</span>
              <p className="text-sm text-muted-foreground mt-2">{t(layer.descKey)}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
            <Link to="/governance">
              {t("about.trust.ctaHub")}
              <ArrowRight className="w-4 h-4 ms-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
