import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/LocaleContext";
import { LucideIcon } from "lucide-react";

interface FlagshipCardProps {
  icon: LucideIcon;
  titleKey: string;
  titleFallback: string;
  subtitleKey: string;
  subtitleFallback: string;
  descriptionKey: string;
  descriptionFallback: string;
  clarityLineKey?: string;
  clarityLineFallback?: string;
  bullets: Array<{ key: string; fallback: string }>;
  primaryCta: {
    labelKey: string;
    labelFallback: string;
    href: string;
    external?: boolean;
  };
  secondaryCtas: Array<{
    labelKey: string;
    labelFallback: string;
    href: string;
    scrollTo?: boolean;
  }>;
}

export function FlagshipCard({
  icon: Icon,
  titleKey,
  titleFallback,
  subtitleKey,
  subtitleFallback,
  descriptionKey,
  descriptionFallback,
  clarityLineKey,
  clarityLineFallback,
  bullets,
  primaryCta,
  secondaryCtas,
}: FlagshipCardProps) {
  const { t, isRTL } = useLocale();

  const handleScrollTo = (href: string) => {
    const elementId = href.replace("#", "");
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <article
      className="group bg-card rounded-2xl border-2 border-border p-6 md:p-8 hover:border-primary/40 hover:shadow-xl transition-all duration-300"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-5">
        <div className="w-14 h-14 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center shrink-0">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
            {t(titleKey) || titleFallback}
          </h3>
          <p className="text-sm font-medium text-scef-gold mt-1">
            {t(subtitleKey) || subtitleFallback}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed mb-4">
        {t(descriptionKey) || descriptionFallback}
      </p>

      {/* Clarity Line (NESA only) */}
      {clarityLineFallback && (
        <p className="text-sm text-muted-foreground/80 italic border-l-2 border-scef-gold pl-3 mb-5">
          {t(clarityLineKey || "") || clarityLineFallback}
        </p>
      )}

      {/* Bullets */}
      <ul className="space-y-2 mb-6" role="list">
        {bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
            <Check className="w-4 h-4 text-scef-gold mt-0.5 shrink-0" />
            <span>{t(bullet.key) || bullet.fallback}</span>
          </li>
        ))}
      </ul>

      {/* CTAs */}
      <div className="space-y-3">
        {/* Primary CTA */}
        {primaryCta.external ? (
          <a
            href={primaryCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              {t(primaryCta.labelKey) || primaryCta.labelFallback}
              <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
        ) : (
          <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link to={primaryCta.href} className="gap-2">
              {t(primaryCta.labelKey) || primaryCta.labelFallback}
              <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            </Link>
          </Button>
        )}

        {/* Secondary CTAs */}
        <div className="flex flex-wrap gap-2">
          {secondaryCtas.map((cta, idx) => (
            cta.scrollTo ? (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                className="flex-1 min-w-fit border-border text-foreground hover:bg-muted"
                onClick={() => handleScrollTo(cta.href)}
              >
                {t(cta.labelKey) || cta.labelFallback}
              </Button>
            ) : (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                className="flex-1 min-w-fit border-border text-foreground hover:bg-muted"
                asChild
              >
                <Link to={cta.href}>
                  {t(cta.labelKey) || cta.labelFallback}
                </Link>
              </Button>
            )
          ))}
        </div>
      </div>
    </article>
  );
}
