import { Helmet } from "react-helmet-async";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { LandingHero } from "@/components/sections/LandingHero";
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
import { TrainingDevelopment } from "@/components/sections/TrainingDevelopment";
import { EduAidWebinarCalendar } from "@/components/sections/EduAidWebinarCalendar";
import { MyCareerMyLife } from "@/components/sections/MyCareerMyLife";
import { MCMLMedia } from "@/components/sections/MCMLMedia";
import { SchoolRegistration } from "@/components/sections/SchoolRegistration";
import { FinalCTABand } from "@/components/sections/FinalCTABand";
import { myCareerMyLifeCalendar } from "@/config/trainingCalendar";
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

          {/* 2. SMART WELCOME ENTRY (Visitor / Member / Staff) */}
          <SmartWelcomeEntry />

          {/* 3. QUICK ACTIONS BAR */}
          <QuickActionsBar />

          {/* 4. EXPLORE SCEF ECOSYSTEM (accordion) */}
          <Reveal>
            <ExploreEcosystem />
          </Reveal>

          {/* 5. HERO DIGITAL BOARD (rotating slider) */}
          <HeroDigitalBoard />

          {/* 6. LIVE ACTIVITY FEED */}
          <LiveActivityFeed />

          {/* 7. CORE SERVICES */}
          <Reveal>
            <SixCoreServices />
          </Reveal>

          {/* 8. CHOOSE YOUR PATH TO IMPACT */}
          <Reveal>
            <ChoosePathToImpact />
          </Reveal>

          {/* 8. FEATURED CAMPAIGNS */}
          <Reveal>
            <FeaturedCampaigns />
          </Reveal>

          {/* 9. TRAINING & DEVELOPMENT (+ EduAid Webinar Calendar preview) */}
          <Reveal>
            <TrainingDevelopment />
          </Reveal>
          <Reveal>
            <EduAidWebinarCalendar preview />
          </Reveal>

          {/* 10. MY CAREER MY LIFE (+ calendar + media) */}
          <Reveal>
            <MyCareerMyLife />
          </Reveal>
          <Reveal>
            <EduAidWebinarCalendar
              preview
              rows={myCareerMyLifeCalendar}
              eyebrow="Starts August 2026"
              title="My Career My Life Monthly Advocacy Calendar"
              subtitle="Twelve months of student-focused career guidance for JSS, SS2 and SS3 students."
              ctaHref="/programs/my-career-my-life"
              ctaLabel="View Full MCML Calendar"
            />
          </Reveal>
          <Reveal>
            <MCMLMedia />
          </Reveal>

          {/* School registration */}
          <Reveal>
            <SchoolRegistration />
          </Reveal>

          {/* Impact strip */}
          <Reveal>
            <ImpactStripLabels />
          </Reveal>

          {/* 11. CSR & EDUCATION FUND MANAGEMENT */}
          <Reveal>
            <CSRFundManagement />
          </Reveal>

          {/* 12. LOCAL CHAPTERS */}
          <Reveal>
            <LocalChaptersSnapshot />
          </Reveal>

          {/* 13. TRUST & PARTNERS */}
          <Reveal>
            <EndorsedBySection />
          </Reveal>

          {/* 14. FINAL CTA */}
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
