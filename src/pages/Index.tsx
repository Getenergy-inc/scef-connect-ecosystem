import { Helmet } from "react-helmet-async";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { LandingHero } from "@/components/sections/LandingHero";
import { ValueStrip } from "@/components/sections/ValueStrip";
import { WhoWeAreLean } from "@/components/sections/WhoWeAreLean";
import { ProgramsThatTransform } from "@/components/sections/ProgramsThatTransform";
import { ImpactStripLabels } from "@/components/sections/ImpactStripLabels";
import { HowSCEFWorks } from "@/components/sections/HowSCEFWorks";
import { ImpactAreasBand } from "@/components/sections/ImpactAreasBand";
import { ChooseYourPath } from "@/components/sections/ChooseYourPath";
import { FinalCTABand } from "@/components/sections/FinalCTABand";
import { StickyMobileJoin } from "@/components/layout/StickyMobileJoin";
import { Reveal } from "@/components/ui/reveal";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SCEF — Empowering Africa Through Education, Innovation & Opportunity</title>
        <meta
          name="description"
          content="Santos Creations Educational Foundation — a membership-driven Pan-African foundation advancing education across regions through advocacy, digital access, and strategic partnerships."
        />
        <meta
          name="keywords"
          content="African education, SCEF, NESA Africa, EduAid Africa, education standards, eLibrary Nigeria, Pan-African education, Rebuild My School Africa, membership"
        />
        <link rel="canonical" href="https://santoscreations.org" />

        <meta property="og:title" content="SCEF — Empowering Africa Through Education, Innovation & Opportunity" />
        <meta
          property="og:description"
          content="A membership-driven Pan-African foundation advancing education across regions through advocacy, digital access, and strategic partnerships."
        />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NGO",
            name: "Santos Creations Educational Foundation",
            alternateName: "SCEF",
            url: "https://santoscreations.org",
            description: "Membership-driven Pan-African education foundation",
            foundingDate: "1997",
            areaServed: "Africa",
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />

        <main>
          {/* 1. Hero */}
          <LandingHero />

          {/* 2. Value strip */}
          <ValueStrip />

          {/* 3. Who we are */}
          <Reveal>
            <WhoWeAreLean />
          </Reveal>

          {/* 4. Programs */}
          <Reveal>
            <ProgramsThatTransform />
          </Reveal>

          {/* 5. Impact strip — labels only */}
          <Reveal>
            <ImpactStripLabels />
          </Reveal>

          {/* 6. How SCEF works */}
          <Reveal>
            <HowSCEFWorks />
          </Reveal>

          {/* 7. Focus areas */}
          <Reveal>
            <ImpactAreasBand />
          </Reveal>

          {/* 8. Get involved — primary conversion */}
          <Reveal>
            <ChooseYourPath />
          </Reveal>

          {/* 9. Final CTA */}
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
