import { Helmet } from "react-helmet-async";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { LandingHero } from "@/components/sections/LandingHero";
import { WelcomeAboutIntro } from "@/components/sections/WelcomeAboutIntro";
import { HeroDigitalBoard } from "@/components/sections/HeroDigitalBoard";
import { LiveActivityFeed } from "@/components/sections/LiveActivityFeed";
import { ChoosePathToImpact } from "@/components/sections/ChoosePathToImpact";
import { SmartWelcomeEntry } from "@/components/sections/SmartWelcomeEntry";
import { QuickActionsBar } from "@/components/sections/QuickActionsBar";
import { ExploreEcosystem } from "@/components/sections/ExploreEcosystem";
import { FeaturedCampaigns } from "@/components/sections/FeaturedCampaigns";
import { ImpactStripLabels } from "@/components/sections/ImpactStripLabels";
import { EndorsedBySection } from "@/components/sections/EndorsedBySection";
import { CSRFundManagement } from "@/components/sections/CSRFundManagement";
import { SixCoreServices } from "@/components/sections/SixCoreServices";
import { LocalChaptersSnapshot } from "@/components/sections/LocalChaptersSnapshot";
import { EduAidWebinarCalendar } from "@/components/sections/EduAidWebinarCalendar";
import { SchoolRegistration } from "@/components/sections/SchoolRegistration";
import { FinalCTABand } from "@/components/sections/FinalCTABand";
import { StickyMobileJoin } from "@/components/layout/StickyMobileJoin";
import { Reveal } from "@/components/ui/reveal";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>SCEF — Empowering Africa Through Education, Innovation & Opportunity</title>
        <meta
          name="description"
          content="Santos Creations Educational Foundation: a membership-driven Pan-African education foundation advancing advocacy, scholarships, school rebuilding, training, career pathways and transparent CSR funding."
        />
        <link rel="canonical" href="https://santoscreations.org/" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header (with built-in ticker on top) */}
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />

        <main>
          {/* 1. HERO */}
          <LandingHero />

          {/* 2. WELCOME + ABOUT INTRO */}
          <Reveal>
            <WelcomeAboutIntro />
          </Reveal>

          {/* 3. OUR CORE SERVICES */}
          <div id="core-services">
            <Reveal>
              <SixCoreServices />
            </Reveal>
          </div>

          {/* 4. PATHWAY TO YOUR EXPERIENCE (Visitor / Member / Staff) */}
          <SmartWelcomeEntry />

          {/* 5. QUICK ACTIONS BAR */}
          <QuickActionsBar />

          {/* 6. EXPLORE SCEF ECOSYSTEM (accordion) */}
          <Reveal>
            <ExploreEcosystem />
          </Reveal>

          {/* 7. HERO DIGITAL BOARD (rotating slider) */}
          <HeroDigitalBoard />

          {/* 8. LIVE ACTIVITY FEED */}
          <LiveActivityFeed />

          {/* 9. CHOOSE YOUR PATH TO IMPACT */}
          <Reveal>
            <ChoosePathToImpact />
          </Reveal>

          {/* 10. FEATURED CAMPAIGNS */}
          <Reveal>
            <FeaturedCampaigns />
          </Reveal>

          {/* 11. EDUAID-AFRICA TRAINING CALENDAR (service of EduAid-Africa) */}
          <Reveal>
            <EduAidWebinarCalendar preview />
          </Reveal>

          {/* School registration */}
          <Reveal>
            <SchoolRegistration />
          </Reveal>

          {/* Impact strip */}
          <Reveal>
            <ImpactStripLabels />
          </Reveal>

          {/* 12. CSR & EDUCATION FUND MANAGEMENT */}
          <Reveal>
            <CSRFundManagement />
          </Reveal>

          {/* 13. LOCAL CHAPTERS */}
          <Reveal>
            <LocalChaptersSnapshot />
          </Reveal>

          {/* 14. TRUST & PARTNERS */}
          <Reveal>
            <EndorsedBySection />
          </Reveal>

          {/* 15. FINAL CTA */}
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

export default Home;
