import { Helmet } from "react-helmet-async";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { LeanHero } from "@/components/landing/LeanHero";
import { RecognitionToImpact } from "@/components/landing/RecognitionToImpact";
import { MonthlyCalendarPreview } from "@/components/landing/MonthlyCalendarPreview";
import { ImpactSnapshot } from "@/components/landing/ImpactSnapshot";
import { FlagshipPreview } from "@/components/landing/FlagshipPreview";
import { WomenGirlsPreview } from "@/components/landing/WomenGirlsPreview";
import { FinalCtaLean } from "@/components/landing/FinalCtaLean";
import { StickyMobileJoin } from "@/components/layout/StickyMobileJoin";
import { Reveal } from "@/components/ui/reveal";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>SCEF — Connecting Recognition to Education Impact Across Africa</title>
        <meta
          name="description"
          content="SCEF powers education recognition, scholarships, school support, teacher development, digital learning, and community-led education impact across Africa."
        />
        <link rel="canonical" href="https://santoscreations.org/" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />

        <main>
          <LeanHero />

          <Reveal>
            <RecognitionToImpact />
          </Reveal>

          <Reveal>
            <MonthlyCalendarPreview />
          </Reveal>

          <Reveal>
            <ImpactSnapshot />
          </Reveal>

          <Reveal>
            <FlagshipPreview />
          </Reveal>

          <Reveal>
            <WomenGirlsPreview />
          </Reveal>

          <Reveal>
            <FinalCtaLean />
          </Reveal>
        </main>

        <Footer />
        <StickyMobileJoin />
      </div>
    </>
  );
};

export default Home;
