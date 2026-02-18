import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Users, Building2, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/LocaleContext";

export const ExploreSection = () => {
  const { t, isRTL } = useLocale();

  const exploreItems = [
    {
      icon: GraduationCap,
      titleKey: "home.programs.title",
      descriptionKey: "home.eoa.body",
      href: "/programs",
      color: "bg-scef-gold text-scef-blue-dark",
    },
    {
      icon: Users,
      titleKey: "home.chaptersBlock.title",
      descriptionKey: "home.chaptersBlock.body",
      href: "/local-chapters",
      color: "bg-primary text-primary-foreground",
    },
    {
      icon: Building2,
      titleKey: "about.trust.title",
      descriptionKey: "about.trust.body",
      href: "/governance",
      color: "bg-scef-gold text-scef-blue-dark",
    },
    {
      icon: Handshake,
      titleKey: "home.partnerships.title",
      descriptionKey: "home.partnerships.body",
      href: "/partners",
      color: "bg-primary text-primary-foreground",
    },
  ];

  return (
    <section className="py-16 bg-muted/30" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-10">
          {t("home.quickPath.title")}
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {exploreItems.map((item) => (
            <Link
              key={item.titleKey}
              to={item.href}
              className="group block"
            >
              <div className="bg-card rounded-xl p-6 border border-border hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 h-full">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {t(item.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t(item.descriptionKey)}
                </p>

                {/* Arrow */}
                <div className="flex items-center text-primary text-sm font-medium">
                  {t("about.who.ctaPrograms")}
                  <ArrowRight className="w-4 h-4 ms-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            asChild
          >
            <Link to="/about">
              {t("nav.top.about")}
              <ArrowRight className="w-4 h-4 ms-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
