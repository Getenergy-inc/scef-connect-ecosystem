import { Helmet } from "react-helmet-async";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { LandingHero } from "@/components/sections/LandingHero";
import { JoinUsGetInvolved } from "@/components/sections/JoinUsGetInvolved";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { FinalCTABand } from "@/components/sections/FinalCTABand";
import { HallOfFameSection } from "@/components/sections/HallOfFameSection";
import { QuickActionsBar } from "@/components/sections/QuickActionsBar";
import { LandingSummaryHub } from "@/components/sections/LandingSummaryHub";
import { PremiumStorySections } from "@/components/sections/PremiumStorySections";
import { StickyMobileJoin } from "@/components/layout/StickyMobileJoin";
import { Reveal } from "@/components/ui/reveal";
import { VolunteerStorytelling } from "@/components/sections/VolunteerStorytelling";
import { Seychelles2027WaitingList } from "@/components/sections/Seychelles2027WaitingList";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>SCEF — Empowering Education. Advocating Education for All. Sustaining Africa's Future.</title>
        <meta
          name="description"
          content="Santos Creations Educational Foundation (SCEF) is a Pan-African not-for-profit NGO advancing education for all in Africa through EduAid-Africa, NESA-Africa, girls and women empowerment, CSR education fund management, digital learning, ESG, scholarships, school support, and community impact."
        />
        <link rel="canonical" href="https://santoscreations.org/" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />

        <main>
          {/* 1. HERO */}
          <LandingHero />

          {/* 2. WHO WE ARE — 3 short lines */}
          <WhoWeAre />

          {/* Quick Actions Bar */}
          <QuickActionsBar />

          {/* Concise summary hub linking to dedicated pages */}
          <Reveal>
            <LandingSummaryHub />
          </Reveal>

          {/* Seychelles 2027 Edu-Tourism Conference — Waiting List */}
          <Reveal>
            <Seychelles2027WaitingList />
          </Reveal>

          {/* Premium story cards: Journey, Calendar, Support, Chapters, Partners, Training, Channels */}
          <Reveal>
            <PremiumStorySections />
          </Reveal>

          {/* Powered by Volunteers — documentary storytelling */}
          <Reveal>
            <VolunteerStorytelling />
          </Reveal>

          {/* Hall of Fame appreciation */}
          <Reveal>
            <HallOfFameSection />
          </Reveal>

          {/* FINAL CTA */}
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
