import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Check, Play, X, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/LocaleContext";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ProgramLogo3D } from "@/components/ui/program-logo-3d";
import { useProgramVoiceover } from "@/hooks/useProgramVoiceover";
import { ProgramId } from "@/config/programVoiceovers";

interface FlagshipCardProps {
  icon: LucideIcon;
  id?: string;
  logo?: string;
  video?: string | null;
  videoThumbnail?: string;
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
  id,
  icon: Icon,
  logo,
  video,
  videoThumbnail,
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
  const [activeVideo, setActiveVideo] = useState(false);
  const { isPlaying, isLoading, toggleVoiceover, playVoiceover, stopVoiceover } = useProgramVoiceover();

  // Auto-play voiceover when modal opens
  const handleOpenVideo = () => {
    setActiveVideo(true);
    if (id) {
      // Delay slightly to let video start
      setTimeout(() => playVoiceover(id as ProgramId), 500);
    }
  };

  const handleCloseVideo = () => {
    stopVoiceover();
    setActiveVideo(false);
  };

  const handleScrollTo = (href: string) => {
    const elementId = href.replace("#", "");
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <motion.article
        className="group bg-card rounded-2xl border-2 border-border overflow-hidden h-full"
        dir={isRTL ? "rtl" : "ltr"}
        whileHover={{ 
          scale: 1.02, 
          boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)",
          borderColor: "hsl(var(--primary) / 0.4)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Video Thumbnail / Logo Section */}
        {(videoThumbnail || logo) && (
          <div className="relative">
            {/* 3D Logo in top right corner */}
            {logo && (
              <div className="absolute top-4 right-4 z-10">
                <ProgramLogo3D
                  src={logo}
                  alt={titleFallback}
                  size="md"
                />
              </div>
            )}

            {/* Voice Button */}
            {id && (
              <motion.button
                className="absolute top-4 left-4 z-10 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-scef-gold hover:text-scef-blue transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVoiceover(id as ProgramId);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading && isPlaying === id ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : isPlaying === id ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </motion.button>
            )}

            {video ? (
              <button 
                onClick={handleOpenVideo}
                className="w-full block"
              >
                <div className="aspect-[3/2] overflow-hidden bg-muted relative">
                  <motion.img
                    src={videoThumbnail || logo}
                    alt={titleFallback}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                    <motion.div 
                      className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="w-7 h-7 text-primary ml-1" fill="currentColor" />
                    </motion.div>
                  </div>
                </div>
              </button>
            ) : (
              <Link to={primaryCta.external ? secondaryCtas[0]?.href || "#" : primaryCta.href}>
                <div className="aspect-[3/2] overflow-hidden bg-muted">
                  <motion.img
                    src={logo}
                    alt={titleFallback}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </Link>
            )}
          </div>
        )}

        {/* Content Section */}
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start gap-4 mb-5">
            <motion.div 
              className="w-12 h-12 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center shrink-0"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Icon className="w-6 h-6 text-primary" />
            </motion.div>
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
        </div>
      </motion.article>

      {/* Video Modal with Auto-play Voiceover */}
      {activeVideo && video && (
        <motion.div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={handleCloseVideo}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Header with close and voice control */}
            <div className="flex items-center justify-between mb-4">
              {id && (
                <button
                  onClick={() => {
                    const currentlyPlaying = isPlaying === id;
                    currentlyPlaying ? stopVoiceover() : playVoiceover(id as ProgramId);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors text-sm"
                >
                  {isPlaying === id ? (
                    <>
                      <VolumeX className="w-4 h-4" />
                      <span>Stop Narration</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" />
                      <span>Play Narration</span>
                    </>
                  )}
                </button>
              )}
              <button
                onClick={handleCloseVideo}
                className="text-white hover:text-primary transition-colors ml-auto"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            <video
              src={video}
              controls
              autoPlay
              className="w-full rounded-lg"
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
