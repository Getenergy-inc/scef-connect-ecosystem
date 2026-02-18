import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ExternalLink, ChevronDown, ChevronUp, CheckCircle, Globe, Calendar, Award, MapPin, Users, Tv, BookOpen, UserPlus } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";
import { useLocale } from "@/contexts/LocaleContext";

export const HeroScreenshot = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t, isRTL } = useLocale();

  // Quick facts data
  const quickFacts = [
    { icon: Calendar, label: t("home.hero.facts.founded") },
    { icon: Award, label: t("home.hero.facts.registered") },
    { icon: Globe, label: t("home.hero.facts.alignment") },
    { icon: MapPin, label: t("home.hero.facts.coverage") },
  ];

  // Partner-ready trust points
  const trustPoints = [
    t("home.hero.trust.point1"),
    t("home.hero.trust.point2"),
    t("home.hero.trust.point3"),
    t("home.hero.trust.point4"),
  ];

  return (
    <section className="relative min-h-[70vh] flex flex-col overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt={t("home.hero.imageAlt")}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-scef-blue-darker/95 via-scef-blue-dark/85 to-scef-blue-dark/60" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex-grow flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Side - Headline and CTAs */}
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <p className="text-scef-gold font-semibold text-sm md:text-base mb-4 tracking-wide uppercase">
              {t("home.hero.eyebrow")}
            </p>

            {/* H1 */}
            <h1 className="font-display text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
              {t("home.hero.title")}
            </h1>

            {/* Summary (always visible) */}
            <p className="text-white/90 text-base md:text-lg leading-relaxed mb-4">
              {t("home.hero.summary")}
            </p>

            {/* Read More Collapsible */}
            <div className="mb-6">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-scef-gold hover:text-scef-gold-light transition-colors text-sm font-medium"
                aria-expanded={isExpanded}
                aria-controls="hero-expanded-content"
              >
                {isExpanded ? t("labels.readLess") : t("labels.readMore")}
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              <div
                id="hero-expanded-content"
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
                }`}
              >
                <div className="text-white/80 text-sm md:text-base leading-relaxed space-y-3 bg-white/5 rounded-lg p-4 border border-white/10">
                  <p>{t("home.hero.expanded.p1")}</p>
                  <p>{t("home.hero.expanded.p2")}</p>
                  <p>{t("home.hero.expanded.p3")}</p>
                </div>
              </div>
            </div>

            {/* Quick Facts Chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {quickFacts.map((fact, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-xs md:text-sm border border-white/20"
                >
                  <fact.icon className="w-3.5 h-3.5 text-scef-gold" />
                  {fact.label}
                </span>
              ))}
            </div>

            {/* Primary CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <Button
                size="lg"
                className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-dark font-bold px-6 py-5 text-sm md:text-base rounded-lg shadow-lg"
                asChild
              >
                <Link to="/partner-with-us">
                  {t("home.hero.ctaPartner")}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-card hover:bg-card/90 text-foreground font-bold px-6 py-5 text-sm md:text-base rounded-lg shadow-lg border-2 border-border"
                asChild
              >
                <Link to="/get-involved/membership">
                  {t("home.hero.ctaMember")}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent hover:bg-white/10 text-white font-semibold px-6 py-5 text-sm md:text-base rounded-lg border-2 border-white/50 hover:border-white"
                asChild
              >
                <Link to="/donate?type=program">
                  {t("home.hero.ctaDonate")}
                </Link>
              </Button>
            </div>

            {/* Inline CSR CTA Link */}
            <div className="mt-4">
              <Link
                to="/partner-with-us/csr"
                className="inline-flex items-center gap-2 text-scef-gold hover:text-scef-gold-light transition-colors text-sm font-medium group"
              >
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                {t("home.hero.ctaCsr")}
              </Link>
              <p className="text-white/60 text-xs mt-1 max-w-md">
                {t("home.hero.csrHelper")}
              </p>
            </div>
          </div>

          {/* Right Side - Empty on desktop, Digital Board is below */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Partner-Ready Trust Row */}
      <div className="relative z-10 bg-scef-blue-darker/90 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <h3 className="text-white font-semibold text-sm md:text-base whitespace-nowrap">
              {t("home.hero.trust.title")}
            </h3>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {trustPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-2 text-white/80 text-xs md:text-sm">
                  <CheckCircle className="w-4 h-4 text-scef-gold flex-shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Secondary CTA Strip */}
      <div className="relative z-10 bg-card border-t border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <Button
              variant="default"
              size="sm"
              className="font-medium text-xs md:text-sm px-4 py-2"
              asChild
            >
              <Link to="/get-involved" className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                {t("home.hero.ctaStrip.apply")}
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="font-medium text-xs md:text-sm px-4 py-2"
              asChild
            >
              <Link to="/programs" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {t("home.hero.ctaStrip.programs")}
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="font-medium text-xs md:text-sm px-4 py-2"
              asChild
            >
              <Link to="/chapters" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {t("home.hero.ctaStrip.chapters")}
              </Link>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="font-medium text-xs md:text-sm px-4 py-2"
              asChild
            >
              <Link to="/media" className="flex items-center gap-2">
                <Tv className="w-4 h-4" />
                {t("home.hero.ctaStrip.media")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
