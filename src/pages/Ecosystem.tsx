import { Helmet } from "react-helmet-async";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { ExploreEcosystem } from "@/components/sections/ExploreEcosystem";
import { QuickActionsBar } from "@/components/sections/QuickActionsBar";
import { ChoosePathToImpact } from "@/components/sections/ChoosePathToImpact";

export default function Ecosystem() {
  return (
    <>
      <Helmet>
        <title>SCEF Ecosystem — Explore Every Pillar</title>
        <meta name="description" content="Explore the full SCEF ecosystem: programs, services, chapters, wallet, advocacy and media." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />
        <main>
          <header className="container mx-auto px-6 py-12 text-center md:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
              Discover the platform
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-scef-blue-darker md:text-5xl">
              The SCEF Ecosystem
            </h1>
          </header>
          <QuickActionsBar />
          <ExploreEcosystem />
          <ChoosePathToImpact />
        </main>
        <Footer />
      </div>
    </>
  );
}
