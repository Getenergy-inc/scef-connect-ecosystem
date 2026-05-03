import { Helmet } from "react-helmet-async";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { LandingHero } from "@/components/sections/LandingHero";
import { RmsaHero } from "@/components/sections/RmsaHero";
import { FeaturedCampaigns } from "@/components/sections/FeaturedCampaigns";
import { RmsaFinalCTA } from "@/components/sections/RmsaFinalCTA";
import { ImpactStripLabels } from "@/components/sections/ImpactStripLabels";
import { EndorsedBySection } from "@/components/sections/EndorsedBySection";
import { CSRFundManagement } from "@/components/sections/CSRFundManagement";
import { SixCoreServices } from "@/components/sections/SixCoreServices";
import { LocalChaptersSnapshot } from "@/components/sections/LocalChaptersSnapshot";
import { StickyMobileJoin } from "@/components/layout/StickyMobileJoin";
import { Reveal } from "@/components/ui/reveal";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>SCEF Home — Programs, Campaigns & Impact Across Africa</title>
        <meta
          name="description"
          content="Explore SCEF's core education programs, Rebuild My School Africa, CSR Fund Management, featured campaigns and local chapters across Africa."
        />
        <link rel="canonical" href="https://santoscreations.org/home" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />

        <main>
          {/* 1. HERO — value + primary CTAs */}
          <LandingHero />

          {/* 2. RMSA — strongest conversion engine */}
          <RmsaHero />

          {/* 3. CORE SERVICES */}
          <Reveal>
            <SixCoreServices />
          </Reveal>

          {/* 4. IMPACT */}
          <Reveal>
            <ImpactStripLabels />
          </Reveal>

          {/* 5. FEATURED CAMPAIGNS */}
          <Reveal>
            <FeaturedCampaigns />
          </Reveal>

          {/* 6. CSR FUND MANAGEMENT */}
          <Reveal>
            <CSRFundManagement />
          </Reveal>

          {/* 7. LOCAL CHAPTERS */}
          <Reveal>
            <LocalChaptersSnapshot />
          </Reveal>

          {/* 8. ENDORSED BY */}
          <Reveal>
            <EndorsedBySection />
          </Reveal>

          {/* FINAL CTA */}
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

export default Home;
