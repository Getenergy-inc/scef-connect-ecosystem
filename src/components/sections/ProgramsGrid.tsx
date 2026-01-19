import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, Award, BookOpen, Globe, Library, Check, ExternalLink, Play, X, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/LocaleContext";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";
import { motion } from "framer-motion";
import { ProgramLogo3D } from "@/components/ui/program-logo-3d";
import { useProgramVoiceover } from "@/hooks/useProgramVoiceover";
import { ProgramId } from "@/config/programVoiceovers";

const flagshipItems = [
  {
    id: "nesa",
    icon: Award,
    logo: "/assets/nesa-africa-logo.jpg",
    video: "/videos/nesa-africa-promo.mp4",
    videoThumbnail: "/videos/thumbnails/nesa-africa-thumb.jpg",
    titleKey: "programs.page.flagship.nesa.title",
    titleFallback: "NESA Africa",
    subtitleKey: "programs.page.flagship.nesa.subtitle",
    subtitleFallback: "New Education Standard Award Africa",
    descriptionKey: "programs.page.flagship.nesa.description",
    descriptionFallback: "Continental standards, recognition, and accountability for education excellence.",
    bullets: [
      { key: "programs.page.flagship.nesa.bullets.0", fallback: "Nomination & voting portal" },
      { key: "programs.page.flagship.nesa.bullets.1", fallback: "Judging & recognition" },
      { key: "programs.page.flagship.nesa.bullets.2", fallback: "Awards TV broadcast" },
    ],
    primaryHref: "https://nesa.africa",
    external: true,
    secondaryHref: "/programs/nesa-africa",
    accentClass: "text-scef-gold bg-scef-gold/10 border-scef-gold/20",
  },
  {
    id: "eduaid",
    icon: BookOpen,
    logo: "/assets/eduaid-africa-logo.jpg",
    video: "/videos/eduaid-africa-promo.mp4",
    videoThumbnail: "/videos/thumbnails/eduaid-africa-thumb.jpg",
    titleKey: "programs.page.flagship.eduaid.title",
    titleFallback: "EduAid Africa",
    subtitleKey: "programs.page.flagship.eduaid.subtitle",
    subtitleFallback: "Education Aid Africa",
    descriptionKey: "programs.page.flagship.eduaid.description",
    descriptionFallback: "Direct education support for learners and schools—access, equity, inclusion, and infrastructure.",
    bullets: [
      { key: "programs.page.flagship.eduaid.bullets.0", fallback: "Scholarships & learner support" },
      { key: "programs.page.flagship.eduaid.bullets.1", fallback: "School & community delivery" },
      { key: "programs.page.flagship.eduaid.bullets.2", fallback: "Infrastructure & inclusion tracks" },
    ],
    primaryHref: "/programs/eduaid-africa",
    external: false,
    secondaryHref: "/programs#eduaid-tracks",
    accentClass: "text-eduaid-green bg-eduaid-green/10 border-eduaid-green/20",
  },
  {
    id: "eoa",
    icon: Globe,
    logo: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=200&h=200&fit=crop",
    video: "/videos/eoa-promo.mp4",
    videoThumbnail: "/videos/thumbnails/eoa-thumb.jpg",
    titleKey: "programs.page.flagship.eoa.title",
    titleFallback: "EOA",
    subtitleKey: "programs.page.flagship.eoa.subtitle",
    subtitleFallback: "Education Online Africa",
    descriptionKey: "programs.page.flagship.eoa.description",
    descriptionFallback: "Skills development, certification, and verification for workforce readiness.",
    bullets: [
      { key: "programs.page.flagship.eoa.bullets.0", fallback: "Learning pathways & exams" },
      { key: "programs.page.flagship.eoa.bullets.1", fallback: "Certificate issuance" },
      { key: "programs.page.flagship.eoa.bullets.2", fallback: "Workplace certifications" },
    ],
    primaryHref: "/programs/digital-learning",
    external: false,
    secondaryHref: "/programs/digital-learning#verify",
    accentClass: "text-primary bg-primary/10 border-primary/20",
  },
  {
    id: "elibrary",
    icon: Library,
    logo: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=200&fit=crop",
    video: "/videos/elibrary-nigeria-promo.mp4",
    videoThumbnail: "/videos/thumbnails/elibrary-nigeria-thumb.jpg",
    titleKey: "programs.page.flagship.elibrary.title",
    titleFallback: "eLibrary Nigeria",
    subtitleKey: "programs.page.flagship.elibrary.subtitle",
    subtitleFallback: "Flagship Platform",
    descriptionKey: "programs.page.flagship.elibrary.description",
    descriptionFallback: "Free learning resources and community knowledge sharing.",
    bullets: [
      { key: "programs.page.flagship.elibrary.bullets.0", fallback: "Browse free materials" },
      { key: "programs.page.flagship.elibrary.bullets.1", fallback: "Upload & contribute" },
      { key: "programs.page.flagship.elibrary.bullets.2", fallback: "Learning engagement" },
    ],
    primaryHref: "/programs/elibrary-nigeria",
    external: false,
    secondaryHref: "/programs/elibrary-nigeria#contributors",
    accentClass: "text-elibrary-green bg-elibrary-green/10 border-elibrary-green/20",
  },
];

export const ProgramsGrid = () => {
  const { t, isRTL } = useLocale();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const { isPlaying, isLoading, toggleVoiceover } = useProgramVoiceover();

  return (
    <section className="py-20 md:py-24 bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <ScrollAnimation animation="fadeUp">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-gold/10 text-scef-gold text-sm font-medium mb-4 border border-scef-gold/20">
                <BookOpen className="w-4 h-4" />
                {t("nav.programs") || "Programs & Initiatives"}
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                {t("programs.page.flagship.heading") || "3 Programs + 1 Platform"}
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl">
                {t("programs.page.hero.subtext")?.toString().slice(0, 120) || "SCEF delivers impact through three flagship programs and one flagship platform."}
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
        </ScrollAnimation>

        {/* Flagship Grid - 2x2 */}
        <StaggerContainer className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {flagshipItems.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.id} animation="fadeUp">
                <motion.article 
                  className="group bg-card rounded-2xl border-2 border-border overflow-hidden h-full cursor-pointer"
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)",
                    borderColor: "hsl(var(--primary) / 0.4)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Video Thumbnail Section */}
                  <div className="relative">
                    {/* 3D Logo in top right corner */}
                    <div className="absolute top-3 right-3 z-10">
                      <ProgramLogo3D
                        src={item.logo}
                        alt={item.titleFallback}
                        size="sm"
                      />
                    </div>

                    {/* Voice Button */}
                    <motion.button
                      className="absolute top-3 left-3 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-scef-gold hover:text-scef-blue transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleVoiceover(item.id as ProgramId);
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isLoading && isPlaying === item.id ? (
                        <motion.div
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : isPlaying === item.id ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </motion.button>

                    {item.video ? (
                      <button 
                        onClick={() => setActiveVideo(item.video!)}
                        className="w-full block"
                      >
                        <div className="aspect-[3/2] overflow-hidden bg-muted relative">
                          <motion.img
                            src={item.videoThumbnail || item.logo}
                            alt={item.titleFallback}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                          />
                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                            <motion.div 
                              className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Play className="w-6 h-6 text-primary ml-1" fill="currentColor" />
                            </motion.div>
                          </div>
                        </div>
                      </button>
                    ) : (
                      <Link to={item.external ? item.secondaryHref : item.primaryHref}>
                        <div className="aspect-[3/2] overflow-hidden bg-muted">
                          <motion.img
                            src={item.logo}
                            alt={item.titleFallback}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                          />
                        </div>
                      </Link>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <motion.div 
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${item.accentClass}`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {t(item.titleKey) || item.titleFallback}
                        </h3>
                        <p className="text-xs font-medium text-scef-gold">
                          {t(item.subtitleKey) || item.subtitleFallback}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {t(item.descriptionKey) || item.descriptionFallback}
                    </p>

                    {/* Bullets */}
                    <ul className="space-y-1.5 mb-5" role="list">
                      {item.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                          <Check className="w-4 h-4 text-scef-gold mt-0.5 shrink-0" />
                          <span>{t(bullet.key) || bullet.fallback}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-2 mt-auto">
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
                  </div>
                </motion.article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Bottom CTA */}
        <ScrollAnimation animation="fadeUp" delay={0.3}>
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
        </ScrollAnimation>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <motion.div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
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
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <video
              src={activeVideo}
              controls
              autoPlay
              className="w-full rounded-lg"
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};
