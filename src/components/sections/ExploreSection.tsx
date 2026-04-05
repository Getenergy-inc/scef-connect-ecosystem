import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Users, Building2, Handshake } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

export const ExploreSection = () => {
  const { t, isRTL } = useLocale();

  const items = [
    { icon: GraduationCap, titleKey: "home.programs.title", descKey: "home.eoa.body", href: "/programs" },
    { icon: Users, titleKey: "home.chaptersBlock.title", descKey: "home.chaptersBlock.body", href: "/local-chapters" },
    { icon: Building2, titleKey: "about.trust.title", descKey: "about.trust.body", href: "/governance" },
    { icon: Handshake, titleKey: "home.partnerships.title", descKey: "home.partnerships.body", href: "/partners" },
  ];

  return (
    <section className="py-12 bg-muted/20" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
          {t("home.quickPath.title")}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <Link key={item.titleKey} to={item.href} className="group bg-card rounded-xl p-5 border border-border hover:border-primary/30 hover:shadow-md transition-all">
              <item.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                {t(item.titleKey)}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{t(item.descKey)}</p>
              <span className="text-primary text-sm font-medium flex items-center gap-1">
                {t("about.who.ctaPrograms")}
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
