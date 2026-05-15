import { Helmet } from "react-helmet-async";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { LandingHero } from "@/components/sections/LandingHero";
import { HomeSummaryCards } from "@/components/sections/HomeSummaryCards";
import { JoinUsGetInvolved } from "@/components/sections/JoinUsGetInvolved";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { FinalCTABand } from "@/components/sections/FinalCTABand";
import { HallOfFameSection } from "@/components/sections/HallOfFameSection";
import { QuickActionsBar } from "@/components/sections/QuickActionsBar";
import { MasterTimelinesDuo } from "@/components/sections/MasterTimelinesDuo";
import { PremiumStorySections } from "@/components/sections/PremiumStorySections";
import { StickyMobileJoin } from "@/components/layout/StickyMobileJoin";
import { Reveal } from "@/components/ui/reveal";
import { VolunteerStorytelling } from "@/components/sections/VolunteerStorytelling";
import { MonthlyAdvocacyCalendar } from "@/components/sections/MonthlyAdvocacyCalendar";
import { WomenGirlsEmpowerment } from "@/components/sections/WomenGirlsEmpowerment";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>SCEF — Empowering Education. Advancing Health. Sustaining Africa's Future.</title>
        <meta
          name="description"
          content="Santos Creations Educational Foundation (SCEF) — a Pan-African membership-based not-for-profit NGO transforming education through advocacy, scholarships, digital learning, local chapters, ESG, health education and sustainable community impact."
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

          {/* NESA-Africa + EduAid-Africa Master Timelines 2026–2027 */}
          <Reveal>
            <MasterTimelinesDuo />
          </Reveal>

          {/* Monthly Advocacy & Training Calendar (12 months) */}
          <Reveal>
            <MonthlyAdvocacyCalendar />
          </Reveal>

          {/* Compact Impact + Programs summary cards (full content lives on /impact and /programs) */}
          <div id="core-services">
            <Reveal>
              <HomeSummaryCards />
            </Reveal>
          </div>

          {/* Women & Girls Empowerment — primary continental pillar */}
          <Reveal>
            <WomenGirlsEmpowerment />
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

          {/* 10. FINAL CTA */}
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
