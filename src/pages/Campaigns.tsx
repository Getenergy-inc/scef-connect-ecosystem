import { Helmet } from "react-helmet-async";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { FeaturedCampaigns } from "@/components/sections/FeaturedCampaigns";
import { CSRFundManagement } from "@/components/sections/CSRFundManagement";
import { Reveal } from "@/components/ui/reveal";

export default function Campaigns() {
  return (
    <>
      <Helmet>
        <title>Active Campaigns — SCEF</title>
        <meta name="description" content="Featured SCEF campaigns and CSR education fund management." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />
        <main>
          <header className="container mx-auto px-6 py-12 text-center md:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
              Featured Initiatives
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-scef-blue-darker md:text-5xl">
              Active Campaigns
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Donate to a live campaign or sponsor a verified education fund.
            </p>
          </header>
          <Reveal><FeaturedCampaigns /></Reveal>
          <Reveal><CSRFundManagement /></Reveal>
        </main>
        <Footer />
      </div>
    </>
  );
}
