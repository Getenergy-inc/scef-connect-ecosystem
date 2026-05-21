import { Helmet } from "react-helmet-async";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { LandingHero } from "@/components/sections/LandingHero";
import { HomeSummaryCards } from "@/components/sections/HomeSummaryCards";
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
import { Seychelles2027WaitingList } from "@/components/sections/Seychelles2027WaitingList";
import { ProgramCardsRow } from "@/components/sections/ProgramCardsRow";
import { GetInvolvedPathways } from "@/components/sections/GetInvolvedPathways";

/**
 * Institutional landing layout — clean white, deep navy accents,
 * structured sections separated by quiet section headers.
 */
const SectionHeader = ({
  kicker,
  title,
  lede,
  variant = "default",
}: {
  kicker: string;
  title: string;
  lede?: string;
  variant?: "default" | "muted";
}) => (
  <div className={variant === "muted" ? "bg-muted/40 border-y border-border" : "bg-white border-t border-border"}>
    <div className="container mx-auto max-w-6xl px-6 md:px-8 py-12 md:py-14">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
        {kicker}
      </p>
      <div className="mt-3 h-px w-10 bg-primary/40" />
      <h2 className="mt-4 font-display text-2xl md:text-[28px] font-bold tracking-tight text-scef-blue-darker max-w-3xl">
        {title}
      </h2>
      {lede && (
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          {lede}
        </p>
      )}
    </div>
  </div>
);

const Home = () => {
  return (
    <>
      <Helmet>
        <title>SCEF — Connecting Education Recognition to Real Impact Across Africa</title>
        <meta
          name="description"
          content="Santos Creations Educational Foundation (SCEF) is a Pan-African not-for-profit advancing education recognition, scholarships, school transformation, teacher development, digital learning, and community-led impact across Africa."
        />
        <link rel="canonical" href="https://santoscreations.org/" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px]" />


        <main>
          {/* 1. MASTHEAD — Hero */}
          <LandingHero />

          {/* 2. PROGRAM CARDS — Real logos + photos */}
          <ProgramCardsRow />

          {/* 2b. VISITOR PATHWAYS — Bounce-reduction gateway */}
          <GetInvolvedPathways />

          {/* 3. EDITORIAL OPENING — Who we are + quick actions */}
          <WhoWeAre />
          <QuickActionsBar />


          {/* 3. DEPARTMENT — RECOGNITION & IMPACT */}
          <SectionHeader
            kicker="Department 01 · Recognition & Impact"
            title="The 2026–2027 Master Timelines"
            lede="From continental recognition through NESA-Africa to delivery on the ground through EduAid-Africa — two parallel timelines, one mission."
          />
          <Reveal>
            <MasterTimelinesDuo />
          </Reveal>

          {/* 4. DEPARTMENT — PROGRAMS IN MOTION */}
          <SectionHeader
            kicker="Department 02 · Programs in Motion"
            title="12 months of advocacy, training and delivery"
            lede="A rolling continental calendar of webinars, training weeks and school activations across SCEF chapters."
          />
          <Reveal>
            <MonthlyAdvocacyCalendar />
          </Reveal>

          {/* 5. DEPARTMENT — CORE SERVICES & SPOTLIGHTS */}
          <SectionHeader
            kicker="Department 03 · Core Services"
            title="What SCEF delivers across Africa"
          />
          <div id="core-services">
            <Reveal>
              <HomeSummaryCards />
            </Reveal>
          </div>
          <Reveal>
            <WomenGirlsEmpowerment />
          </Reveal>

          {/* 6. DEPARTMENT — ANNOUNCEMENTS */}
          <SectionHeader
            kicker="Department 04 · Announcement"
            title="Indian Ocean Islands Edu-Tourism Conference 2027"
            lede="Seychelles Regional Edition. Join the waiting list to reserve your seat."
          />
          <Reveal>
            <Seychelles2027WaitingList />
          </Reveal>

          {/* 7. DEPARTMENT — STORIES & PEOPLE */}
          <SectionHeader
            kicker="Department 05 · Stories & People"
            title="The journey, the chapters, the volunteers"
            lede="A documentary view of SCEF — partners, training, channels and the people who carry the work."
          />
          <Reveal>
            <PremiumStorySections />
          </Reveal>
          <Reveal>
            <VolunteerStorytelling />
          </Reveal>
          <Reveal>
            <HallOfFameSection />
          </Reveal>

          {/* 8. CLOSING — Final CTA */}
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
