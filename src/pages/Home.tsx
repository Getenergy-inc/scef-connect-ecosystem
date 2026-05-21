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

/**
 * Editorial / magazine-style landing layout.
 * Same content blocks as before — regrouped into named "departments"
 * with thin editorial dividers and a clearer reading rhythm.
 */
const EditorialDivider = ({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede?: string;
}) => (
  <div className="border-t border-scef-blue-darker/10 bg-background">
    <div className="container mx-auto px-6 md:px-8 py-10 md:py-14">
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-scef-gold-dark">
            {kicker}
          </p>
          <div className="mt-3 h-px w-12 bg-scef-gold/70" />
        </div>
        <div className="md:col-span-9">
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-scef-blue-darker">
            {title}
          </h2>
          {lede && (
            <p className="mt-2 max-w-2xl text-sm md:text-base leading-relaxed text-muted-foreground">
              {lede}
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
);

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
        <div className="h-[76px] md:h-[84px]" />

        <main>
          {/* 1. MASTHEAD — Hero */}
          <LandingHero />

          {/* 2. EDITORIAL OPENING — Who we are + quick actions */}
          <WhoWeAre />
          <QuickActionsBar />

          {/* 3. DEPARTMENT — RECOGNITION & IMPACT */}
          <EditorialDivider
            kicker="Department 01 · Recognition & Impact"
            title="The 2026–2027 Master Timelines"
            lede="From continental recognition through NESA-Africa to delivery on the ground through EduAid-Africa — two parallel timelines, one mission."
          />
          <Reveal>
            <MasterTimelinesDuo />
          </Reveal>

          {/* 4. DEPARTMENT — PROGRAMS IN MOTION */}
          <EditorialDivider
            kicker="Department 02 · Programs in Motion"
            title="12 months of advocacy, training and delivery"
            lede="A rolling continental calendar of webinars, training weeks and school activations across SCEF chapters."
          />
          <Reveal>
            <MonthlyAdvocacyCalendar />
          </Reveal>

          {/* 5. DEPARTMENT — CORE SERVICES & SPOTLIGHTS */}
          <EditorialDivider
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
          <EditorialDivider
            kicker="Department 04 · Announcement"
            title="Indian Ocean Islands Edu-Tourism Conference 2027"
            lede="Seychelles Regional Edition. Join the waiting list to reserve your seat."
          />
          <Reveal>
            <Seychelles2027WaitingList />
          </Reveal>

          {/* 7. DEPARTMENT — STORIES & PEOPLE */}
          <EditorialDivider
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
