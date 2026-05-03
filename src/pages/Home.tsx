import { Helmet } from "react-helmet-async";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { LandingHero } from "@/components/sections/LandingHero";
import { RmsaHero } from "@/components/sections/RmsaHero";
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
        <title>SCEF — Be Part of Africa&apos;s Education Transformation</title>
        <meta
          name="description"
          content="Santos Creations Educational Foundation: scholarships, school rebuilding, women & girls empowerment, special needs education, training, career guidance and CSR education funds management."
        />
        <link rel="canonical" href="https://santoscreations.org/home" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />

        <main>
          {/* 1. HERO */}
          <LandingHero />

          {/* 2. RMSA */}
          <RmsaHero />

          {/* 3. PROGRAM ECOSYSTEM (with new Training & MCML cards) */}
          <Reveal>
            <SixCoreServices />
          </Reveal>

          {/* 4. TRAINING & DEVELOPMENT */}
          <Reveal>
            <TrainingDevelopment />
          </Reveal>

          {/* 5. EDUAID WEBINAR CALENDAR (preview on landing) */}
          <Reveal>
            <EduAidWebinarCalendar preview />
          </Reveal>

          {/* 6. MY CAREER MY LIFE */}
          <Reveal>
            <MyCareerMyLife />
          </Reveal>

          {/* 7. MCML CALENDAR (preview) */}
          <Reveal>
            <EduAidWebinarCalendar
              preview
              rows={myCareerMyLifeCalendar}
              eyebrow="Starts August 2026"
              title="My Career My Life Monthly Advocacy Calendar"
              subtitle="Twelve months of student-focused career guidance for JSS, SS2 and SS3 students across schools, chapters and partner networks."
              ctaHref="/programs/my-career-my-life"
              ctaLabel="View Full MCML Calendar"
            />
          </Reveal>

          {/* 8. MCML ADVOCACY & MEDIA PRODUCTION */}
          <Reveal>
            <MCMLMedia />
          </Reveal>

          {/* 9. SCHOOL REGISTRATION & ADOPT-A-SCHOOL */}
          <Reveal>
            <SchoolRegistration />
          </Reveal>

          {/* 10. IMPACT */}
          <Reveal>
            <ImpactStripLabels />
          </Reveal>

          {/* 11. FEATURED CAMPAIGNS */}
          <Reveal>
            <FeaturedCampaigns />
          </Reveal>

          {/* 12. CSR FUND MANAGEMENT */}
          <Reveal>
            <CSRFundManagement />
          </Reveal>

          {/* 13. LOCAL CHAPTERS */}
          <Reveal>
            <LocalChaptersSnapshot />
          </Reveal>

          {/* 14. ENDORSED BY */}
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
