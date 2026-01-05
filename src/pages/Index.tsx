import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/NewHeroSection";
import { QuickPathSelector } from "@/components/sections/QuickPathSelector";
import { DigitalBoard } from "@/components/sections/DigitalBoard";
import { ImpactCounters } from "@/components/sections/ImpactCounters";
import { ObjectivesSection } from "@/components/sections/ObjectivesSection";
import { ProgramsGrid } from "@/components/sections/ProgramsGrid";
import { EOAHighlight } from "@/components/sections/EOAHighlight";
import { SantosMediaPreview } from "@/components/sections/SantosMediaPreview";
import { DivisionsPreview } from "@/components/sections/DivisionsPreview";
import { ChaptersConversion } from "@/components/sections/ChaptersConversion";
import { PartnershipsTrust } from "@/components/sections/PartnershipsTrust";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { useLocale } from "@/contexts/LocaleContext";

const Index = () => {
  const { t } = useLocale();

  return (
    <>
      <Helmet>
        <title>SCEF - Santos Creations Educational Foundation | Education for All Across Africa</title>
        <meta 
          name="description" 
          content="SCEF is a membership-driven Pan-African NGO strengthening education through governance, digital learning & certification, media advocacy, compliant local chapters, and accountable partnerships." 
        />
        <meta name="keywords" content="African education, SCEF, education governance, Pan-African, scholarships Africa, NESA Africa, EduAid Africa, RMSA, EOA" />
        <link rel="canonical" href="https://scef.org" />
        
        {/* Open Graph */}
        <meta property="og:title" content="SCEF - Education for All Across Africa" />
        <meta property="og:description" content="Membership-driven Pan-African NGO advancing education across 54+ African countries through governance, certification, and grassroots chapters." />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NGO",
            "name": "Santos Creations Educational Foundation",
            "alternateName": "SCEF",
            "url": "https://scef.org",
            "description": "Pan-African education governance institution serving 54+ countries",
            "foundingDate": "1997",
            "areaServed": "Africa"
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen">
        <Header />
        
        <main>
          {/* Hero Section */}
          <HeroSection />
          
          {/* Quick Path Selector - 4 tiles */}
          <QuickPathSelector />
          
          {/* Digital Announcement Board */}
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
                Education Updates
              </h2>
              <DigitalBoard />
            </div>
          </section>
          
          {/* Impact Counters */}
          <ImpactCounters />
          
          {/* What We Do - 6 Objectives */}
          <ObjectivesSection />
          
          {/* Programs Grid - 6 programs */}
          <ProgramsGrid />
          
          {/* EOA Highlight Strip */}
          <EOAHighlight />
          
          {/* Santos Media Preview */}
          <SantosMediaPreview />
          
          {/* Divisions Preview - 6 divisions */}
          <DivisionsPreview />
          
          {/* Chapters Conversion Block */}
          <ChaptersConversion />
          
          {/* Partnerships/CSR Trust Block */}
          <PartnershipsTrust />
          
          {/* Final CTA Band */}
          <FinalCTA />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
