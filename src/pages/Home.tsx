import { Helmet } from "react-helmet-async";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { LandingHero } from "@/components/sections/LandingHero";
import { SmartWelcomeEntry } from "@/components/sections/SmartWelcomeEntry";
import { CoreServicesTeaser } from "@/components/sections/CoreServicesTeaser";
import { StickyMobileJoin } from "@/components/layout/StickyMobileJoin";
import { Reveal } from "@/components/ui/reveal";

/**
 * Slimmed landing: Hero → Pathway entry → Core Services teaser only.
 * All other content lives on dedicated pages.
 */
const Home = () => {
  return (
    <>
      <Helmet>
        <title>SCEF — Empowering Africa Through Education, Innovation & Opportunity</title>
        <meta
          name="description"
          content="Santos Creations Educational Foundation: a membership-driven Pan-African education foundation. Choose your pathway to engage."
        />
        <link rel="canonical" href="https://santoscreations.org/" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />

        <main>
          {/* 1. HERO */}
          <LandingHero />

          {/* 2. PATHWAY TO YOUR EXPERIENCE */}
          <SmartWelcomeEntry />

          {/* 3. CORE SERVICES TEASER (links to dedicated pages) */}
          <Reveal>
            <CoreServicesTeaser />
          </Reveal>
        </main>

        <Footer />
        <StickyMobileJoin />
      </div>
    </>
  );
};

export default Home;
