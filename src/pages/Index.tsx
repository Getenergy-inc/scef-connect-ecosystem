import { Helmet } from "react-helmet-async";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { CinematicHero } from "@/components/sections/CinematicHero";
import { BrandFilm } from "@/components/sections/BrandFilm";
import { ServicePillars } from "@/components/sections/ServicePillars";
import { ImpactBand } from "@/components/sections/ImpactBand";
import { ExploreHub } from "@/components/sections/ExploreHub";
import { FeaturedUpdate } from "@/components/sections/FeaturedUpdate";
import { FinalCTABand } from "@/components/sections/FinalCTABand";
import { Reveal } from "@/components/ui/reveal";
import { useLocale } from "@/contexts/LocaleContext";

const Index = () => {
  const { t } = useLocale();

  return (
    <>
      <Helmet>
        <title>SCEF — Empowering Africa Through Education, Innovation & Opportunity</title>
        <meta
          name="description"
          content="Santos Creations Educational Foundation — a continental institution advancing education standards across 5+ African regions through programs, awards, advocacy, and partnerships."
        />
        <meta
          name="keywords"
          content="African education, SCEF, NESA Africa, EduAid Africa, education standards, eLibrary Nigeria, Pan-African education"
        />
        <link rel="canonical" href="https://santoscreations.org" />

        <meta property="og:title" content="SCEF — Empowering Africa Through Education" />
        <meta
          property="og:description"
          content="A continental institution driving advocacy, digital learning, awards, and partnerships across Africa."
        />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NGO",
            name: "Santos Creations Educational Foundation",
            alternateName: "SCEF",
            url: "https://santoscreations.org",
            description: "Pan-African education governance institution",
            foundingDate: "1997",
            areaServed: "Africa",
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />

        {/* Spacer for fixed header */}
        <div className="h-[88px] md:h-[96px]" />

        <main>
          {/* 1. Cinematic full-screen hero */}
          <CinematicHero />

          {/* 2. Brand intro — short, link-led */}
          <Reveal>
            <BrandFilm />
          </Reveal>

          {/* 3. Service pillars — 6 tiles */}
          <Reveal delay={60}>
            <ServicePillars />
          </Reveal>

          {/* 4. Impact band */}
          <Reveal>
            <ImpactBand />
          </Reveal>

          {/* 5. Explore SCEF — destination router */}
          <Reveal delay={60}>
            <ExploreHub />
          </Reveal>

          {/* 6. Featured update — single story, links to all news */}
          <Reveal>
            <FeaturedUpdate />
          </Reveal>

          {/* 7. Final CTA */}
          <Reveal>
            <FinalCTABand />
          </Reveal>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
