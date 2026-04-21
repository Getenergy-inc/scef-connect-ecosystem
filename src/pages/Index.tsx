import { Helmet } from "react-helmet-async";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { LandingHero } from "@/components/sections/LandingHero";
import { ProgramsThatTransform } from "@/components/sections/ProgramsThatTransform";
import { ImpactAreasBand } from "@/components/sections/ImpactAreasBand";
import { ChooseYourPath } from "@/components/sections/ChooseYourPath";
import { FinalCTABand } from "@/components/sections/FinalCTABand";
import { StickyMobileJoin } from "@/components/layout/StickyMobileJoin";
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
          {/* 1. Split hero: copy left, photo right, pillar strip beneath */}
          <LandingHero />

          {/* 2. Programs that transform lives — 7 colorful icon tiles */}
          <Reveal>
            <ProgramsThatTransform />
          </Reveal>

          {/* 3. Impact areas — horizontal dark band */}
          <Reveal>
            <ImpactAreasBand />
          </Reveal>

          {/* 4. Choose your path — 5 colored CTA cards */}
          <Reveal>
            <ChooseYourPath />
          </Reveal>

          {/* 5. Final CTA */}
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
