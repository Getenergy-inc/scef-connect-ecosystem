import { Link } from "react-router-dom";
import { ArrowRight, Award, BookOpen, Globe, Library, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/LocaleContext";

const flagshipItems = [
  {
    id: "nesa",
    icon: Award,
    title: "NESA Africa",
    subtitle: "New Education Standard Award Africa",
    description: "Continental standards, recognition, and accountability for education excellence.",
    bullets: ["Nomination & voting portal", "Judging & recognition", "Awards TV broadcast"],
    primaryHref: "https://nesa.africa",
    external: true,
    secondaryHref: "/programs/nesa-africa",
    accentClass: "text-scef-gold bg-scef-gold/10 border-scef-gold/20",
  },
  {
    id: "eduaid",
    icon: BookOpen,
    title: "EduAid Africa",
    subtitle: "Education Aid Africa",
    description: "Direct education support for learners and schools—access, equity, inclusion, and infrastructure.",
    bullets: ["Scholarships & learner support", "School & community delivery", "Infrastructure & inclusion tracks"],
    primaryHref: "/programs/eduaid-africa",
    external: false,
    secondaryHref: "/programs",
    accentClass: "text-eduaid-green bg-eduaid-green/10 border-eduaid-green/20",
  },
  {
    id: "eoa",
    icon: Globe,
    title: "EOA",
    subtitle: "Education Online Africa",
    description: "Skills development, certification, and verification for workforce readiness.",
    bullets: ["Learning pathways & exams", "Certificate issuance", "Workplace certifications"],
    primaryHref: "/programs/digital-learning",
    external: false,
    secondaryHref: "/programs/digital-learning#verify",
    accentClass: "text-primary bg-primary/10 border-primary/20",
  },
  {
    id: "elibrary",
    icon: Library,
    title: "eLibrary Nigeria",
    subtitle: "Flagship Platform",
    description: "Free learning resources and community knowledge sharing.",
    bullets: ["Browse free materials", "Upload & contribute", "Learning engagement"],
    primaryHref: "/programs/elibrary-nigeria",
    external: false,
    secondaryHref: "/programs/elibrary-nigeria#contributors",
    accentClass: "text-elibrary-green bg-elibrary-green/10 border-elibrary-green/20",
  },
];

export const ProgramsSection = () => {
  const { t, isRTL } = useLocale();

  return (
    <section className="py-20 md:py-24 bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-gold/10 text-scef-gold text-sm font-medium mb-4 border border-scef-gold/20">
              <BookOpen className="w-4 h-4" />
              {t("nav.programs") || "Programs & Platform"}
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {t("programs.page.flagship.heading") || "3 Programs + 1 Platform"}
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl">
              {t("programs.page.hero.subtext")?.slice(0, 120) || "SCEF delivers impact through three flagship programs and one flagship platform."}
            </p>
          </div>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground" 
            asChild
          >
            <Link to="/programs" className="gap-2">
              {t("home.programs.ctaAll") || "Explore All Programs"}
              <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            </Link>
          </Button>
        </div>

        {/* Flagship Grid - 2x2 */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {flagshipItems.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.id}
                className="group bg-card rounded-2xl border-2 border-border p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${item.accentClass}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-scef-gold">{item.subtitle}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-1.5 mb-5" role="list">
                  {item.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                      <Check className="w-4 h-4 text-scef-gold mt-0.5 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* CTAs */}
                <div className="flex flex-wrap gap-2">
                  {item.external ? (
                    <a
                      href={item.primaryHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button size="sm" className="w-full bg-primary hover:bg-primary/90 gap-1">
                        {t("cta.learnMore") || "Learn More"}
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </a>
                  ) : (
                    <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90" asChild>
                      <Link to={item.primaryHref} className="gap-1">
                        {t("cta.learnMore") || "Learn More"}
                        <ArrowRight className={`w-3 h-3 ${isRTL ? "rotate-180" : ""}`} />
                      </Link>
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="border-border" asChild>
                    <Link to={item.secondaryHref}>
                      {t("cta.details") || "Details"}
                    </Link>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            {t("programs.page.tracks.oneline") || "Related work is delivered as Tracks and Series under these flagships."}
          </p>
          <Button size="lg" className="bg-scef-gold hover:bg-scef-gold/90 text-scef-blue-dark font-semibold" asChild>
            <Link to="/programs" className="gap-2">
              {t("home.programs.ctaAll") || "View All Programs & Tracks"}
              <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
