import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users, Tv, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLocale } from "@/contexts/LocaleContext";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { FlagshipCard } from "@/components/programs/FlagshipCard";
import { EduAidTracksSection } from "@/components/programs/EduAidTracksSection";
import { EOACertificationSection } from "@/components/programs/EOACertificationSection";
import { StakeholderPathwaysSection } from "@/components/programs/StakeholderPathwaysSection";
import { programsPageContent } from "@/config/programsPageContent";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";
import heroImage from "@/assets/hero-programs.jpg";

const Programs = () => {
  const { t, isRTL } = useLocale();
  const { hero, flagshipPrograms } = programsPageContent;

  return (
    <>
      <Helmet>
        <title>{t("programs.page.hero.title") || "Our Programs"} - SCEF</title>
        <meta 
          name="description" 
          content={t(hero.subtextKey) || hero.subtextFallback}
        />
      </Helmet>
      
      <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <Header />
        
        <main>
          {/* ========== HERO SECTION ========== */}
          <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 bg-scef-blue overflow-hidden">
            <OptimizedImage 
              src={heroImage} 
              alt="SCEF Programs - African students in education" 
              className="absolute inset-0 w-full h-full" 
              imgClassName="opacity-25" 
              priority 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-scef-blue/70 via-scef-blue/85 to-scef-blue" />
            
            <div className="container mx-auto px-4 md:px-8 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-scef-gold text-sm font-medium mb-6 border border-white/20">
                  <BookOpen className="w-4 h-4" />
                  {t("nav.programs") || "Programs"}
                </div>

                {/* H1 */}
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  {t(hero.titleKey) || "Our Programs"}
                </h1>

                {/* Subtext */}
                <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-3xl mx-auto mb-10">
                  {t(hero.subtextKey) || hero.subtextFallback}
                </p>

                {/* Primary CTAs */}
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  <Button 
                    size="lg" 
                    className="bg-scef-gold hover:bg-scef-gold/90 text-scef-blue-dark font-semibold gap-2"
                    asChild
                  >
                    <Link to="/donate">
                      <Heart className="w-4 h-4" />
                      {t("cta.donateSponsor") || "Donate / Sponsor"}
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    className="bg-white hover:bg-white/90 text-scef-blue font-semibold gap-2"
                    asChild
                  >
                    <Link to="/membership">
                      <Users className="w-4 h-4" />
                      {t("cta.becomeMember") || "Become a Member"}
                    </Link>
                  </Button>
                </div>

                {/* Secondary CTAs */}
                <div className="flex flex-wrap justify-center gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-transparent border-white/30 text-white hover:bg-white/10"
                    asChild
                  >
                    <Link to="/chapters" className="gap-2">
                      {t("cta.exploreChapters") || "Explore Local Chapters"}
                      <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-transparent border-white/30 text-white hover:bg-white/10"
                    asChild
                  >
                    <Link to="/media" className="gap-2">
                      <Tv className="w-4 h-4" />
                      {t("cta.watchMedia") || "Watch SCEF Media"}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* ========== FLAGSHIP GRID (4 Cards) ========== */}
          <section className="py-16 md:py-20 bg-background">
            <div className="container px-4 md:px-8">
              {/* Section Label */}
              <ScrollAnimation animation="fadeUp" className="text-center mb-10">
                <span className="inline-block px-4 py-1.5 bg-scef-gold/10 text-scef-gold rounded-full text-sm font-medium border border-scef-gold/20 mb-4">
                  {t("programs.page.flagship.label") || "Flagship Programs & Platform"}
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {t("programs.page.flagship.heading") || "3 Programs + 1 Platform"}
                </h2>
              </ScrollAnimation>

              {/* Grid: 2x2 desktop, stacked mobile */}
              <StaggerContainer className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto" staggerDelay={0.15}>
                {flagshipPrograms.map((program) => (
                  <StaggerItem key={program.id} animation="fadeUp">
                    <FlagshipCard
                      icon={program.icon}
                      logo={program.logo}
                      video={program.video}
                      titleKey={program.titleKey}
                      titleFallback={program.titleFallback}
                      subtitleKey={program.subtitleKey}
                      subtitleFallback={program.subtitleFallback}
                      descriptionKey={program.descriptionKey}
                      descriptionFallback={program.descriptionFallback}
                      clarityLineKey={program.clarityLineKey}
                      clarityLineFallback={program.clarityLineFallback}
                      bullets={program.bullets}
                      primaryCta={program.primaryCta}
                      secondaryCtas={program.secondaryCtas}
                    />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>

          {/* ========== EDUAID TRACKS SECTION ========== */}
          <EduAidTracksSection />

          {/* ========== EOA CERTIFICATION BLOCK ========== */}
          <EOACertificationSection />

          {/* ========== STAKEHOLDER PATHWAYS ========== */}
          <StakeholderPathwaysSection />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Programs;
