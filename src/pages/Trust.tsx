import { Helmet } from "react-helmet-async";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { EndorsedBySection } from "@/components/sections/EndorsedBySection";
import { LocalChaptersSnapshot } from "@/components/sections/LocalChaptersSnapshot";
import { FinalCTABand } from "@/components/sections/FinalCTABand";
import { Reveal } from "@/components/ui/reveal";

export default function Trust() {
  return (
    <>
      <Helmet>
        <title>Trust, Partners & Chapters — SCEF</title>
        <meta name="description" content="SCEF endorsements, strategic partners, and our Pan-African local chapters network." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />
        <main>
          <header className="container mx-auto px-6 py-12 text-center md:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
              Recognition · Partnership · Reach
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-scef-blue-darker md:text-5xl">
              Trust, Partners & Chapters
            </h1>
          </header>
          <Reveal><EndorsedBySection /></Reveal>
          <Reveal><LocalChaptersSnapshot /></Reveal>
          <Reveal><FinalCTABand /></Reveal>
        </main>
        <Footer />
      </div>
    </>
  );
}
