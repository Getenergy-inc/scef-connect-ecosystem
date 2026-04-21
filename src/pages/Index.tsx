import { Helmet } from "react-helmet-async";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { LandingHero } from "@/components/sections/LandingHero";
import { InstitutionalStats } from "@/components/sections/InstitutionalStats";
import { BrandFilm } from "@/components/sections/BrandFilm";
import { ProgramsThatTransform } from "@/components/sections/ProgramsThatTransform";
import { CoreObjectives } from "@/components/sections/CoreObjectives";
import { ImpactAreasBand } from "@/components/sections/ImpactAreasBand";
import { FeaturedUpdate } from "@/components/sections/FeaturedUpdate";
import { ChooseYourPath } from "@/components/sections/ChooseYourPath";
import { EndorsedBySection } from "@/components/sections/EndorsedBySection";
import { FinalCTABand } from "@/components/sections/FinalCTABand";
import { StickyMobileJoin } from "@/components/layout/StickyMobileJoin";
import { Reveal } from "@/components/ui/reveal";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SCEF — Africa's Continuous Education Standards System</title>
        <meta
          name="description"
          content="Santos Creations Educational Foundation — a Pan-African membership institution advancing education standards across 5+ regions through programs, recognition, and partnerships since 1997."
        />
        <meta
          name="keywords"
          content="African education, SCEF, NESA Africa, EduAid Africa, education standards, eLibrary Nigeria, Pan-African education, Rebuild My School Africa"
        />
        <link rel="canonical" href="https://santoscreations.org" />

        <meta property="og:title" content="SCEF — Africa's Continuous Education Standards System" />
        <meta
          property="og:description"
          content="A Pan-African institution driving advocacy, digital learning, awards, and partnerships across Africa."
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

        <div className="h-[88px] md:h-[96px]" />

        <main>
          {/* 1. Split hero — copy left, photo right, pillar strip beneath */}
          <LandingHero />

          {/* 2. Institutional credibility — founding year, regions, vision */}
          <InstitutionalStats />

          {/* 3. Who we are — short institutional intro */}
          <Reveal>
            <BrandFilm />
          </Reveal>

          {/* 4. Programs that transform lives — 7 colorful tiles */}
          <Reveal>
            <ProgramsThatTransform />
          </Reveal>

          {/* 5. Six core objectives — required institutional content */}
          <Reveal>
            <CoreObjectives />
          </Reveal>

          {/* 6. Impact areas — horizontal dark band */}
          <Reveal>
            <ImpactAreasBand />
          </Reveal>

          {/* 7. Featured update — NESA-Africa 2026 spotlight */}
          <Reveal>
            <FeaturedUpdate />
          </Reveal>

          {/* 8. Choose your path — 5 colored CTA cards */}
          <Reveal>
            <ChooseYourPath />
          </Reveal>

          {/* 9. Endorsed by — partner logos (FAWE, CSACEFA, etc.) */}
          <Reveal>
            <EndorsedBySection />
          </Reveal>

          {/* 10. Final CTA */}
          <Reveal>
            <FinalCTABand />
          </Reveal>
        </main>

        <Footer />
        <StickyMobileJoin />
      </div>
    </>
  );
};

export default Index;
