import { Helmet } from "react-helmet-async";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { LiveActivityFeed } from "@/components/sections/LiveActivityFeed";
import { HeroDigitalBoard } from "@/components/sections/HeroDigitalBoard";
import { ImpactStripLabels } from "@/components/sections/ImpactStripLabels";
import { Reveal } from "@/components/ui/reveal";

export default function LiveActivity() {
  return (
    <>
      <Helmet>
        <title>Live Activity & Impact — SCEF</title>
        <meta name="description" content="Live SCEF activity feed, digital board and verified impact metrics." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />
        <main>
          <header className="container mx-auto px-6 py-12 text-center md:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
              Real-time transparency
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-scef-blue-darker md:text-5xl">
              Live Activity & Impact
            </h1>
          </header>
          <HeroDigitalBoard />
          <LiveActivityFeed />
          <Reveal><ImpactStripLabels /></Reveal>
        </main>
        <Footer />
      </div>
    </>
  );
}
