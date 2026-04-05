import { Link } from "react-router-dom";
import { ArrowRight, Award, BookOpen, Globe, Library } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/LocaleContext";

const programs = [
  {
    id: "nesa",
    icon: Award,
    titleKey: "programs.page.flagship.nesa.title",
    titleFallback: "NESA Africa",
    subtitleFallback: "New Education Standard Award Africa",
    descriptionFallback: "Continental standards, recognition, and accountability for education excellence.",
    href: "/programs/nesa-africa",
    external: "https://nesa.africa",
  },
  {
    id: "eduaid",
    icon: BookOpen,
    titleKey: "programs.page.flagship.eduaid.title",
    titleFallback: "EduAid Africa",
    subtitleFallback: "Education Aid Africa",
    descriptionFallback: "Direct education support for learners and schools—access, equity, inclusion, and infrastructure.",
    href: "/programs/eduaid-africa",
  },
  {
    id: "eoa",
    icon: Globe,
    titleKey: "programs.page.flagship.eoa.title",
    titleFallback: "Education Online Africa",
    subtitleFallback: "EOA",
    descriptionFallback: "Skills development, certification, and verification for workforce readiness.",
    href: "/programs/digital-learning",
  },
  {
    id: "elibrary",
    icon: Library,
    titleKey: "programs.page.flagship.elibrary.title",
    titleFallback: "eLibrary Nigeria",
    subtitleFallback: "Flagship Platform",
    descriptionFallback: "Free learning resources and community knowledge sharing.",
    href: "/programs/elibrary-nigeria",
  },
];

export const ProgramsGrid = () => {
  const { t, isRTL } = useLocale();

  return (
    <section className="py-16 bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              {t("programs.page.flagship.heading") || "Our Programs"}
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg">
              {t("programs.page.hero.subtext")?.toString().slice(0, 120) || "SCEF delivers impact through three flagship programs and one flagship platform."}
            </p>
          </div>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
            <Link to="/programs" className="gap-2">
              {t("home.programs.ctaAll") || "All Programs"}
              <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            </Link>
          </Button>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {programs.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.href}
                className="group bg-card rounded-xl p-6 border border-border hover:border-primary/40 hover:shadow-lg transition-all"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {t(item.titleKey) || item.titleFallback}
                </h3>
                <p className="text-xs text-scef-gold font-medium mb-3">{item.subtitleFallback}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.descriptionFallback}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
