import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Building2, Globe, CheckCircle } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

export const GovernanceSnapshot = () => {
  const { t, isRTL } = useLocale();

  const governanceLayers = [
    {
      icon: Shield,
      titleKey: "governance.layers.bot.title",
      subtitleKey: "governance.snapshot.bot.subtitle",
      descriptionKey: "governance.layers.bot.description",
      countKey: "governance.layers.bot.count",
      approvesKeys: ["governance.snapshot.bot.approves.0", "governance.snapshot.bot.approves.1", "governance.snapshot.bot.approves.2"],
      color: "bg-scef-gold/10 text-scef-gold border-scef-gold/30",
      iconBg: "bg-scef-gold text-scef-blue-dark",
    },
    {
      icon: Users,
      titleKey: "governance.layers.boa.title",
      subtitleKey: "governance.snapshot.boa.subtitle",
      descriptionKey: "governance.layers.boa.description",
      countKey: "governance.layers.boa.count",
      approvesKeys: ["governance.snapshot.boa.approves.0", "governance.snapshot.boa.approves.1", "governance.snapshot.boa.approves.2"],
      color: "bg-primary/10 text-primary border-primary/30",
      iconBg: "bg-primary text-primary-foreground",
    },
    {
      icon: Building2,
      titleKey: "governance.layers.bod.title",
      subtitleKey: "governance.snapshot.bod.subtitle",
      descriptionKey: "governance.layers.bod.description",
      countKey: "governance.layers.bod.count",
      approvesKeys: ["governance.snapshot.bod.approves.0", "governance.snapshot.bod.approves.1", "governance.snapshot.bod.approves.2"],
      color: "bg-scef-gold/10 text-scef-gold border-scef-gold/30",
      iconBg: "bg-scef-gold text-scef-blue-dark",
    },
    {
      icon: Globe,
      titleKey: "governance.layers.lcps.title",
      subtitleKey: "governance.snapshot.lcps.subtitle",
      descriptionKey: "governance.layers.lcps.description",
      countKey: "governance.layers.lcps.count",
      approvesKeys: ["governance.snapshot.lcps.approves.0", "governance.snapshot.lcps.approves.1", "governance.snapshot.lcps.approves.2"],
      color: "bg-primary/10 text-primary border-primary/30",
      iconBg: "bg-primary text-primary-foreground",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
            <Shield className="w-4 h-4" />
            {t("governance.layers.title")}
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            {t("governance.hero.title")}
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("governance.hero.subtitle")}
          </p>
        </div>

        {/* Governance Layers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {governanceLayers.map((layer, index) => (
            <div
              key={layer.titleKey}
              className="group bg-card rounded-2xl p-6 border-2 border-black hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl ${layer.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform border-2 border-black`}>
                <layer.icon className="w-7 h-7" />
              </div>
              
              {/* Title & Subtitle */}
              <h3 className="font-display text-lg font-bold text-foreground mb-1">
                {t(layer.titleKey)}
              </h3>
              <p className="text-sm text-muted-foreground font-medium mb-3">
                {t(layer.subtitleKey)}
              </p>
              
              {/* Count Badge */}
              <span className={`inline-block px-3 py-1 rounded-full ${layer.color} text-xs font-semibold mb-4 border`}>
                {t(layer.countKey)}
              </span>
              
              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4">
                {t(layer.descriptionKey)}
              </p>
              
              {/* Approves List */}
              <div className="space-y-2">
                {layer.approvesKeys.map((key) => (
                  <div key={key} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="w-3.5 h-3.5 text-scef-gold flex-shrink-0" />
                    {t(key)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-2 border-black hover:bg-primary hover:text-primary-foreground"
            asChild
          >
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
