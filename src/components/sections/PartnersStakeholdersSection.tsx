import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Heart, Briefcase, GraduationCap, Tv, Users, Globe, UserCircle, BookOpen } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

export const PartnersStakeholdersSection = () => {
  const { t, isRTL } = useLocale();

  const stakeholders = [
    { icon: Building2, titleKey: "partners.stakeholders.governments.title", descKey: "partners.stakeholders.governments.description" },
    { icon: Heart, titleKey: "partners.stakeholders.donors.title", descKey: "partners.stakeholders.donors.description" },
    { icon: Briefcase, titleKey: "partners.stakeholders.corporations.title", descKey: "partners.stakeholders.corporations.description" },
    { icon: GraduationCap, titleKey: "partners.stakeholders.institutions.title", descKey: "partners.stakeholders.institutions.description" },
    { icon: Tv, titleKey: "partners.stakeholders.media.title", descKey: "partners.stakeholders.media.description" },
    { icon: Users, titleKey: "partners.stakeholders.volunteers.title", descKey: "partners.stakeholders.volunteers.description" },
    { icon: UserCircle, titleKey: "partners.stakeholders.members.title", descKey: "partners.stakeholders.members.description" },
    { icon: Globe, titleKey: "partners.stakeholders.chapters.title", descKey: "partners.stakeholders.chapters.description" },
    { icon: BookOpen, titleKey: "partners.stakeholders.learners.title", descKey: "partners.stakeholders.learners.description" },
  ];

  return (
    <section className="py-16 bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
            {t("partners.hero.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("partners.hero.subtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mb-10">
          {stakeholders.map((s) => (
            <div key={s.titleKey} className="flex items-start gap-3 bg-card rounded-lg p-4 border border-border">
              <s.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-foreground">{t(s.titleKey)}</h3>
                <p className="text-xs text-muted-foreground mt-1">{t(s.descKey)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3">
          <Button className="bg-scef-gold text-scef-blue-dark hover:bg-scef-gold/90" asChild>
            <Link to="/partners">
              {t("about.hero.ctaCsr")}
              <ArrowRight className="w-4 h-4 ms-1" />
            </Link>
          </Button>
          <Button variant="outline" className="border-primary text-primary" asChild>
            <Link to="/membership">
              {t("about.hero.ctaJoin")}
              <ArrowRight className="w-4 h-4 ms-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
