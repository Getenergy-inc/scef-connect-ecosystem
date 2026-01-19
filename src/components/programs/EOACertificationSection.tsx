import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/LocaleContext";
import { programsPageContent } from "@/config/programsPageContent";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

export function EOACertificationSection() {
  const { t, isRTL } = useLocale();
  const { eoaCertification } = programsPageContent;

  return (
    <section className="py-16 md:py-20 bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Label */}
          <ScrollAnimation animation="fadeUp" className="text-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
              <GraduationCap className="w-4 h-4" />
              {t(eoaCertification.sectionTitleKey) || eoaCertification.sectionTitleFallback}
            </span>
          </ScrollAnimation>

          {/* Main Card */}
          <ScrollAnimation animation="scale" delay={0.15}>
            <div className="bg-gradient-to-br from-primary/5 to-scef-gold/5 rounded-2xl border-2 border-primary/20 p-8 md:p-12 text-center">
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {t(eoaCertification.titleKey) || eoaCertification.titleFallback}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                {t(eoaCertification.descriptionKey) || eoaCertification.descriptionFallback}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap justify-center gap-3">
                {eoaCertification.ctas.map((cta, idx) => (
                  <Button
                    key={idx}
                    variant={idx === 0 ? "default" : "outline"}
                    size="lg"
                    className={idx === 0 ? "bg-primary hover:bg-primary/90" : "border-primary/30 text-primary hover:bg-primary/10"}
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
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
