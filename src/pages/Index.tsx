import { Helmet } from "react-helmet-async";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { LandingHero } from "@/components/sections/LandingHero";
import { RmsaHero } from "@/components/sections/RmsaHero";
import { SpecialNeedsSection } from "@/components/sections/SpecialNeedsSection";
import { HowRmsaWorks } from "@/components/sections/HowRmsaWorks";
import { WalletVotingSection } from "@/components/sections/WalletVotingSection";
import { FeaturedCampaigns } from "@/components/sections/FeaturedCampaigns";
import { RmsaFinalCTA } from "@/components/sections/RmsaFinalCTA";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { WhoWeAreLean } from "@/components/sections/WhoWeAreLean";
import { ProgramsThatTransform } from "@/components/sections/ProgramsThatTransform";
import { ImpactStripLabels } from "@/components/sections/ImpactStripLabels";
import { HowSCEFWorks } from "@/components/sections/HowSCEFWorks";
import { ImpactAreasBand } from "@/components/sections/ImpactAreasBand";
import { ChooseYourPath } from "@/components/sections/ChooseYourPath";

import { EndorsedBySection } from "@/components/sections/EndorsedBySection";
import { CRSPartnersStrip } from "@/components/sections/CRSPartnersStrip";
import { CSRFundManagement } from "@/components/sections/CSRFundManagement";
import { SixCoreServices } from "@/components/sections/SixCoreServices";
import { AdvocacyServices } from "@/components/sections/AdvocacyServices";
import { StoriesOfTransformation } from "@/components/sections/StoriesOfTransformation";
import { LocalChaptersSnapshot } from "@/components/sections/LocalChaptersSnapshot";
import { WaysToSupport } from "@/components/sections/WaysToSupport";
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
          {/* 1. Institutional hero (kept) */}
          <LandingHero />

          {/* 2. RMSA hero — flagship interactive layer */}
          <RmsaHero />

          {/* 2b. Six core education services */}
          <Reveal>
            <SixCoreServices />
          </Reveal>

          {/* 3. Special Needs Schools Initiative */}
          <Reveal>
            <SpecialNeedsSection />
          </Reveal>

          {/* 4. How RMSA works */}
          <Reveal>
            <HowRmsaWorks />
          </Reveal>

          {/* 5. Impact snapshot — incl. Schools Rebuilt */}
          <Reveal>
            <ImpactStripLabels />
          </Reveal>

          {/* 6. Wallet + Voting (AGC) */}
          <Reveal>
            <WalletVotingSection />
          </Reveal>

          {/* 7. Featured school campaigns */}
          <Reveal>
            <FeaturedCampaigns />
          </Reveal>

          {/* 7b. Before & After transformations */}
          <Reveal>
            <BeforeAfterSection />
          </Reveal>

          {/* 8. Who we are — institutional context */}
          <Reveal>
            <WhoWeAreLean />
          </Reveal>

          {/* 9. CSR & Education Fund Management */}
          <Reveal>
            <CSRFundManagement />
          </Reveal>

          {/* 9b. Ways to support */}
          <Reveal>
            <WaysToSupport />
          </Reveal>

          {/* 9c. Advocacy services */}
          <Reveal>
            <AdvocacyServices />
          </Reveal>

          {/* 9d. Stories of transformation */}
          <Reveal>
            <StoriesOfTransformation />
          </Reveal>

          {/* 9e. Local chapters snapshot */}
          <Reveal>
            <LocalChaptersSnapshot />
          </Reveal>

          {/* 10. Programs */}
          <Reveal>
            <ProgramsThatTransform />
          </Reveal>

          {/* 11. How SCEF works */}
          <Reveal>
            <HowSCEFWorks />
          </Reveal>

          {/* 12. Focus areas */}
          <Reveal>
            <ImpactAreasBand />
          </Reveal>

          {/* 13. Get involved */}
          <Reveal>
            <ChooseYourPath />
          </Reveal>

          {/* 14. Trusted & endorsed by */}
          <Reveal>
            <EndorsedBySection />
          </Reveal>

          {/* 15. Supporting partners */}
          <Reveal>
            <CRSPartnersStrip />
          </Reveal>

          {/* 16. RMSA-led final CTA */}
          <Reveal>
            <RmsaFinalCTA />
          </Reveal>
        </main>

        <Footer />
        <StickyMobileJoin />
      </div>
    </>
  );
};

export default Index;
