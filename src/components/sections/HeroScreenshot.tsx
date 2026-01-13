import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight, ExternalLink, Volume2, FileText, Image, ChevronDown, ChevronUp, CheckCircle, Globe, Calendar, Award, MapPin } from "lucide-react";
import { siteContent } from "@/config/siteContent";
import heroImage from "@/assets/hero-education.jpg";
import { useLocale } from "@/contexts/LocaleContext";

// Digital Board Items fallback - uses translation keys
const getBoardItems = (t: (key: string) => string) => [
  {
    id: 1,
    type: "video",
    typeLabel: t("labels.video"),
    title: t("home.board.fallback.nesa.title"),
    description: t("home.board.fallback.nesa.description"),
    cta: { text: t("home.board.fallback.nesa.cta"), href: "/programs/nesa-africa" },
    thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600",
  },
  {
    id: 2,
    type: "flyer",
    typeLabel: t("labels.flyer"),
    title: t("home.board.fallback.eduaid.title"),
    description: t("home.board.fallback.eduaid.description"),
    cta: { text: t("home.board.fallback.eduaid.cta"), href: "/programs/eduaid-africa" },
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600",
  },
  {
    id: 3,
    type: "announcement",
    typeLabel: t("labels.announcement"),
    title: t("home.board.fallback.aepc.title"),
    description: t("home.board.fallback.aepc.description"),
    cta: { text: t("home.board.fallback.aepc.cta"), href: "/certifications" },
    thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600",
  },
];

const typeIcons = {
  video: Play,
  audio: Volume2,
  announcement: FileText,
  flyer: Image,
};

export const HeroScreenshot = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const { digitalBoard } = siteContent.homepage;
  const { t, isRTL } = useLocale();
  
  const boardItems = getBoardItems(t);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % boardItems.length);
    }, digitalBoard.rotationSeconds * 1000);
    return () => clearInterval(timer);
  }, [boardItems.length]);

  const activeItem = boardItems[activeIndex];
  const TypeIcon = typeIcons[activeItem.type as keyof typeof typeIcons];

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
    <section className="relative min-h-[90vh] flex flex-col overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
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
                className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-dark font-bold px-6 py-5 text-sm md:text-base rounded-lg border-2 border-black shadow-lg"
                asChild
              >
                <Link to="/partner-with-us">
                  {t("home.hero.ctaPartner")}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white hover:bg-white/90 text-scef-blue-dark font-bold px-6 py-5 text-sm md:text-base rounded-lg border-2 border-black shadow-lg"
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

          {/* Right Side - Digital Board Widget */}
          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border-2 border-black shadow-2xl overflow-hidden">
              {/* Board Header */}
              <div className="bg-scef-blue-darker/80 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-scef-gold animate-pulse" />
                  <span className="text-white text-sm font-semibold">{t("home.board.title")}</span>
                </div>
                <Link
                  to="/updates"
                  className="text-white/70 hover:text-scef-gold text-xs font-medium transition-colors"
                >
                  {t("home.board.viewAll")}
                </Link>
              </div>

              {/* Board Content */}
              <div className="relative">
                <img
                  src={activeItem.thumbnail}
                  alt={activeItem.title}
                  className="w-full h-48 object-cover"
                />
                
                {/* Type Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-scef-gold text-scef-blue-dark text-xs font-bold flex items-center gap-1.5 border border-black">
                  <TypeIcon className="w-3 h-3" />
                  {activeItem.typeLabel}
                </div>

                {/* Play button for video */}
                {activeItem.type === "video" && (
                  <button className="absolute inset-0 flex items-center justify-center group">
                    <div className="w-14 h-14 rounded-full bg-scef-gold flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg border-2 border-black">
                      <Play className="w-5 h-5 text-scef-blue-dark ml-0.5" />
                    </div>
                  </button>
                )}
              </div>

              {/* Text Content */}
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {activeItem.title}
                </h3>
                <p className="text-white/70 text-sm mb-4">
                  {activeItem.description}
                </p>
                <Button
                  size="sm"
                  className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-dark font-semibold border border-black"
                  asChild
                >
                  <Link to={activeItem.cta.href}>
                    {activeItem.cta.text}
                    <ExternalLink className="w-3 h-3 ml-1.5" />
                  </Link>
                </Button>
              </div>

              {/* Navigation Dots */}
              <div className="px-5 pb-4 flex items-center justify-center gap-3">
                <button
                  onClick={() => setActiveIndex((prev) => (prev - 1 + boardItems.length) % boardItems.length)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label={t("labels.previous")}
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <div className="flex gap-1.5">
                  {boardItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === activeIndex ? "w-5 bg-scef-gold" : "w-1.5 bg-white/30 hover:bg-white/50"
                      }`}
                      aria-label={`${t("labels.goToSlide")} ${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setActiveIndex((prev) => (prev + 1) % boardItems.length)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label={t("labels.next")}
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
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
    </section>
  );
};
