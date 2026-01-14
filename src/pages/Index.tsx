import { Helmet } from "react-helmet-async";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { HeroScreenshot } from "@/components/sections/HeroScreenshot";
import { DigitalBoard } from "@/components/sections/DigitalBoard";
import { ProgramsGrid } from "@/components/sections/ProgramsGrid";
import { ExploreSection } from "@/components/sections/ExploreSection";
import { GovernanceSnapshot } from "@/components/sections/GovernanceSnapshot";
import { PartnersStakeholdersSection } from "@/components/sections/PartnersStakeholdersSection";
import { EndorsedBySection } from "@/components/sections/EndorsedBySection";
import { CRSPartnersSection } from "@/components/sections/CRSPartnersSection";
import { CTASection } from "@/components/sections/CTASection";
import { useLocale } from "@/contexts/LocaleContext";

const Index = () => {
  const { t } = useLocale();
  
  return (
    <>
      <Helmet>
        <title>{t("home.hero.title")} - SCEF</title>
        <meta 
          name="description" 
          content={t("home.hero.subtitle")} 
        />
        <meta name="keywords" content="African education, SCEF, education governance, Pan-African, scholarships Africa, NESA Africa, AEPC certification" />
        <link rel="canonical" href="https://scef.org" />
        
        {/* Open Graph */}
        <meta property="og:title" content="SCEF - Santos Creations Educational Foundation" />
        <meta property="og:description" content={t("home.hero.subtitle")} />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NGO",
            "name": "Santos Creations Educational Foundation",
            "alternateName": "SCEF",
            "url": "https://scef.org",
            "description": "Pan-African education governance institution",
            "foundingDate": "1997",
            "areaServed": "Africa"
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen">
        <HeaderScreenshot />
        
        {/* Spacer for fixed header */}
        <div className="h-[88px] md:h-[96px]" />
        
        <main>
          {/* Hero with Digital Board */}
          <HeroScreenshot />
          
          {/* Digital Board Section */}
          <DigitalBoard />
          
          {/* Our Programs */}
          <ProgramsGrid />
          
          {/* Explore Section */}
          <ExploreSection />
          
          {/* Governance Snapshot */}
          <GovernanceSnapshot />
          
          {/* Endorsed By */}
          <EndorsedBySection />
          
          {/* Partners & Stakeholders */}
          <PartnersStakeholdersSection />
          
          {/* CRS Partners */}
          <CRSPartnersSection variant="compact" />
          
          {/* Final CTA */}
          <CTASection />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
