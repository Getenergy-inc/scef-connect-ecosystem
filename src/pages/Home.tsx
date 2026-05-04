import { Helmet } from "react-helmet-async";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { LandingHero } from "@/components/sections/LandingHero";
import { WelcomeAboutIntro } from "@/components/sections/WelcomeAboutIntro";
import { AccessYourExperience } from "@/components/sections/AccessYourExperience";
import { DiscoverPlatformCTAs } from "@/components/sections/DiscoverPlatformCTAs";
import { SixCoreServices } from "@/components/sections/SixCoreServices";
import { TrainingWebinarsSection } from "@/components/sections/TrainingWebinarsSection";
import { CareerProgramSection } from "@/components/sections/CareerProgramSection";
import { JoinUsGetInvolved } from "@/components/sections/JoinUsGetInvolved";
import { LocalChaptersSnapshot } from "@/components/sections/LocalChaptersSnapshot";
import { ImpactStripLabels } from "@/components/sections/ImpactStripLabels";
import { FinalCTABand } from "@/components/sections/FinalCTABand";
import { StrategicPartnersSupporters } from "@/components/sections/StrategicPartnersSupporters";
import { HallOfFameSection } from "@/components/sections/HallOfFameSection";
import { StickyMobileJoin } from "@/components/layout/StickyMobileJoin";
import { Reveal } from "@/components/ui/reveal";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>SCEF — Empowering Africa Through Education, Innovation & Opportunity</title>
        <meta
          name="description"
          content="Santos Creations Educational Foundation: a membership-driven Pan-African education platform advancing scholarships, school support, women & girls empowerment, special needs education, training, career guidance and transparent funding."
        />
        <link rel="canonical" href="https://santoscreations.org/" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />

        <main>
          {/* 1. HERO */}
          <LandingHero />

          {/* Welcome + About intro (keep existing content) */}
          <Reveal>
            <WelcomeAboutIntro />
          </Reveal>

          {/* 2. ACCESS YOUR EXPERIENCE (Login / Sign Up) */}
          <AccessYourExperience />

          {/* 3. DISCOVER THE PLATFORM (CTA cards) */}
          <Reveal>
            <DiscoverPlatformCTAs />
          </Reveal>

          {/* 4. PROGRAMS OVERVIEW */}
          <div id="core-services">
            <Reveal>
              <SixCoreServices />
            </Reveal>
          </div>

          {/* 5. TRAINING & WEBINARS */}
          <Reveal>
            <TrainingWebinarsSection />
          </Reveal>

          {/* 6. CAREER PROGRAM (MCML) */}
          <Reveal>
            <CareerProgramSection />
          </Reveal>

          {/* 7. JOIN US / GET INVOLVED */}
          <Reveal>
            <JoinUsGetInvolved />
          </Reveal>

          {/* 8. LOCAL CHAPTERS */}
          <Reveal>
            <LocalChaptersSnapshot />
          </Reveal>

          {/* 9. IMPACT SNAPSHOT */}
          <Reveal>
            <ImpactStripLabels />
          </Reveal>

          {/* 10. STRATEGIC PARTNERS & VERIFIED SUPPORTERS */}
          <Reveal>
            <StrategicPartnersSupporters />
          </Reveal>

          {/* 10b. HALL OF FAME & APPRECIATION WALL */}
          <Reveal>
            <HallOfFameSection />
          </Reveal>

          {/* 11. FINAL CTA */}
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
