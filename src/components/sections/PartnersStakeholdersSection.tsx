import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Building2, Heart, Briefcase, GraduationCap, 
  Tv, Users, Globe, UserCircle, BookOpen 
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

export const PartnersStakeholdersSection = () => {
  const { t, isRTL } = useLocale();

  const stakeholders = [
    {
      icon: Building2,
      titleKey: "partners.stakeholders.governments.title",
      descriptionKey: "partners.stakeholders.governments.description",
    },
    {
      icon: Heart,
      titleKey: "partners.stakeholders.donors.title",
      descriptionKey: "partners.stakeholders.donors.description",
    },
    {
      icon: Briefcase,
      titleKey: "partners.stakeholders.corporations.title",
      descriptionKey: "partners.stakeholders.corporations.description",
    },
    {
      icon: GraduationCap,
      titleKey: "partners.stakeholders.institutions.title",
      descriptionKey: "partners.stakeholders.institutions.description",
    },
    {
      icon: Tv,
      titleKey: "partners.stakeholders.media.title",
      descriptionKey: "partners.stakeholders.media.description",
    },
    {
      icon: Users,
      titleKey: "partners.stakeholders.volunteers.title",
      descriptionKey: "partners.stakeholders.volunteers.description",
    },
    {
      icon: UserCircle,
      titleKey: "partners.stakeholders.members.title",
      descriptionKey: "partners.stakeholders.members.description",
    },
    {
      icon: Globe,
      titleKey: "partners.stakeholders.chapters.title",
      descriptionKey: "partners.stakeholders.chapters.description",
    },
    {
      icon: BookOpen,
      titleKey: "partners.stakeholders.learners.title",
      descriptionKey: "partners.stakeholders.learners.description",
    },
  ];

  return (
    <section className="py-24 bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-gold/20 text-scef-blue text-sm font-medium mb-6 border-2 border-black">
            <Users className="w-4 h-4" />
            {t("home.partnerships.title")}
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t("partners.hero.title")}
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("partners.hero.subtitle")}
          </p>
        </div>

        {/* Stakeholders Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto mb-12">
          {stakeholders.map((stakeholder, index) => (
            <div
              key={stakeholder.titleKey}
              className="group bg-card rounded-xl p-5 border-2 border-black hover:border-scef-gold hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-scef-blue/10 flex items-center justify-center shrink-0 border border-black group-hover:bg-scef-gold/20 transition-colors">
                  <stakeholder.icon className="w-5 h-5 text-scef-blue" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-foreground mb-1">
                    {t(stakeholder.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(stakeholder.descriptionKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold" asChild>
            <Link to="/partners">
              {t("about.hero.ctaCsr")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-scef-blue text-scef-blue hover:bg-scef-blue hover:text-white border-2" asChild>
            <Link to="/membership">
              {t("about.hero.ctaJoin")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
