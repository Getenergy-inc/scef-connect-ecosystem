import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import NesaSeason2026Timeline from "@/components/sections/NesaSeason2026Timeline";
import {
  CategoryPathwaysSection,
  ContinentalReachSection,
  LiveWindowsSection,
} from "@/components/sections/NesaTimelineExtras";

const NesaTimeline2026 = () => {
  return (
    <>
      <Helmet>
        <title>NESA-Africa 2026 Season Programme Timeline — SCEF</title>
        <meta
          name="description"
          content="The official NESA-Africa 2026 Season Programme Timeline — from public pre-nomination on 20 May 2026 to the Blue Garnet Awards Gala on 22 October 2026, followed by a 12-month Rebuild My School Africa and EduAid-Africa impact phase through October 2027."
        />
        <link rel="canonical" href="https://santoscreations.org/programs/nesa-africa/timeline" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <HeaderScreenshot />
        <div className="h-[76px] md:h-[84px]" />

        {/* HERO */}
        <header className="relative overflow-hidden bg-scef-blue-darker text-white">
          <div
            aria-hidden
            className="absolute inset-0 opacity-25 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1800&q=70')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-scef-blue-darker via-scef-blue-darker/90 to-transparent" />
          <div className="container mx-auto px-4 py-16 md:py-24 relative">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-scef-gold mb-3">
                NESA-Africa · 2026 Season
              </p>
              <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-4">
                NESA-Africa 2026 Season Programme Timeline
              </h1>
              <p className="text-base md:text-lg text-white/85 leading-relaxed">
                A continental journey from public pre-nomination activation on 20 May 2026 to the
                live Blue Garnet Awards Gala on 22 October 2026, followed by a 12-month social
                impact phase through Rebuild My School Africa and EduAid-Africa services from 23
                October 2026 to October 2027.
              </p>
              <div className="flex flex-wrap gap-3 mt-7">
                <Button asChild size="lg" variant="hero">
                  <Link to="/nominate">Nominate Now</Link>
                </Button>
                <Button asChild size="lg" variant="heroOutline">
                  <Link to="/categories">View Categories</Link>
                </Button>
                <Button asChild size="lg" variant="heroOutline">
                  <Link to="/partner-with-us">Partner With Us</Link>
                </Button>
                <Button asChild size="lg" variant="heroOutline">
                  <Link to="/media/nesa-tv">Watch NESA TV</Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main>
          {/* Phase 1 + Phase 2 + Summary */}
          <NesaSeason2026Timeline />

          {/* Category Pathways */}
          <CategoryPathwaysSection />

          {/* Continental Reach */}
          <ContinentalReachSection />

          {/* Live Windows */}
          <LiveWindowsSection />

          {/* Closing band */}
          <section className="container mx-auto px-4 py-14">
            <div className="rounded-xl border-2 border-scef-gold/40 bg-scef-blue-darker text-white p-6 md:p-10 text-center">
              <p className="text-base md:text-xl font-semibold leading-relaxed">
                "20 May starts public recognition. 22 October delivers the Blue Garnet Awards Gala.
                23 October 2026 to October 2027 turns recognition into measurable school impact."
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default NesaTimeline2026;
