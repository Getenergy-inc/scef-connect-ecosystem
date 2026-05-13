import { Helmet } from "react-helmet-async";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { LandingHero } from "@/components/sections/LandingHero";
import { ImpactStripLabels } from "@/components/sections/ImpactStripLabels";
import { FeaturedPrograms } from "@/components/sections/FeaturedPrograms";
import { MonthlyAdvocacyCalendar } from "@/components/sections/MonthlyAdvocacyCalendar";
import { JoinUsGetInvolved } from "@/components/sections/JoinUsGetInvolved";
import { LocalChaptersSnapshot } from "@/components/sections/LocalChaptersSnapshot";
import { StrategicPartnersSupporters } from "@/components/sections/StrategicPartnersSupporters";
import { TrainingWebinarsSection } from "@/components/sections/TrainingWebinarsSection";
import { DonationChannels } from "@/components/sections/DonationChannels";
import { FinalCTABand } from "@/components/sections/FinalCTABand";
import { HallOfFameSection } from "@/components/sections/HallOfFameSection";
import { QuickActionsBar } from "@/components/sections/QuickActionsBar";
import { StickyMobileJoin } from "@/components/layout/StickyMobileJoin";
import { Reveal } from "@/components/ui/reveal";

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

          {/* Quick Actions Bar */}
          <QuickActionsBar />

          {/* 2. IMPACT / TRUST — 8 focus areas, qualitative */}
          <Reveal>
            <ImpactStripLabels />
          </Reveal>

          {/* 3. FEATURED PROGRAMS — 7 cards, Learn More + Support */}
          <div id="core-services">
            <Reveal>
              <FeaturedPrograms />
            </Reveal>
          </div>

          {/* 4. MONTHLY ADVOCACY, WEBINAR & TRAINING CALENDAR */}
          <Reveal>
            <MonthlyAdvocacyCalendar />
          </Reveal>

          {/* 5. SUPPORT OPTIONS — driven by JoinUsGetInvolved + DonationChannels below */}
          <Reveal>
            <JoinUsGetInvolved />
          </Reveal>

          {/* 6. LOCAL CHAPTERS */}
          <Reveal>
            <LocalChaptersSnapshot />
          </Reveal>

          {/* 7. PARTNERSHIPS & STRATEGIC SUPPORTERS */}
          <Reveal>
            <StrategicPartnersSupporters />
          </Reveal>

          {/* 8. MEDIA & ADVOCACY (Training & Webinars row) */}
          <Reveal>
            <TrainingWebinarsSection />
          </Reveal>

          {/* 9. PAYMENT / DONATION CHANNELS — compact */}
          <Reveal>
            <DonationChannels />
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
