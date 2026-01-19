import { Link } from "react-router-dom";
import { ArrowRight, User, School, Handshake, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/LocaleContext";
import { programsPageContent } from "@/config/programsPageContent";

const pathwayIcons: Record<string, typeof User> = {
  individuals: User,
  schools: School,
  partners: Handshake,
  communities: Users,
};

export function StakeholderPathwaysSection() {
  const { t, isRTL } = useLocale();
  const { stakeholderPathways } = programsPageContent;

  return (
    <section className="py-16 md:py-20 bg-muted/30" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
            {t(stakeholderPathways.sectionTitleKey) || stakeholderPathways.sectionTitleFallback}
          </h2>
        </div>

        {/* Pathways Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {stakeholderPathways.pathways.map((pathway) => {
            const Icon = pathwayIcons[pathway.id] || User;
            return (
              <div
                key={pathway.id}
                className="bg-card rounded-xl border-2 border-border p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {t(pathway.titleKey) || pathway.titleFallback}
                  </h3>
                </div>

                <ul className="space-y-3">
                  {pathway.links.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        to={link.href}
                        className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-scef-gold shrink-0" />
                        <span className="flex-1">{t(link.labelKey) || link.labelFallback}</span>
                        <ArrowRight className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ${isRTL ? "rotate-180" : ""}`} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Final CTAs */}
        <div className="flex flex-wrap justify-center gap-3">
          {stakeholderPathways.finalCtas.map((cta, idx) => (
            <Button
              key={idx}
              variant={cta.primary ? "default" : "outline"}
              size="lg"
              className={cta.primary ? "bg-scef-gold hover:bg-scef-gold/90 text-scef-blue-dark font-semibold" : "border-border"}
              asChild
            >
              <Link to={cta.href} className="gap-2">
                {t(cta.labelKey) || cta.labelFallback}
                <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
