import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhoWeAreSection } from "@/components/sections/WhoWeAreSection";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { GovernanceSnapshot } from "@/components/sections/GovernanceSnapshot";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { DivisionsSection } from "@/components/sections/DivisionsSection";
import { FeaturedPlatforms } from "@/components/sections/FeaturedPlatforms";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ChaptersSection } from "@/components/sections/ChaptersSection";
import { PartnersStakeholdersSection } from "@/components/sections/PartnersStakeholdersSection";
import { CTASection } from "@/components/sections/CTASection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SCEF - Santos Creations Educational Foundation | Governing Africa's Education Future</title>
        <meta 
          name="description" 
          content="Institutional platform governing pan-African education delivery, certifications, and local chapters since 1997. Aligned with UN SDGs 4,5,10,17 and AU Agenda 2063." 
        />
        <meta name="keywords" content="African education, SCEF, education governance, Pan-African, scholarships Africa, NESA Africa, AEPC certification" />
        <link rel="canonical" href="https://scef.org" />
        
        {/* Open Graph */}
        <meta property="og:title" content="SCEF - Santos Creations Educational Foundation" />
        <meta property="og:description" content="Institutional platform governing pan-African education delivery, certifications, and local chapters since 1997." />
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
        <Header />
        <main>
          {/* Hero with integrated Digital Board */}
          <HeroSection />
          
          {/* Institutional Identity */}
          <WhoWeAreSection />
          <ImpactStats />
          
          {/* Governance Snapshot */}
          <GovernanceSnapshot />
          
          {/* Programs & Structure */}
          <ProgramsSection />
          <DivisionsSection />
          <FeaturedPlatforms />
          <CertificationsSection />
          
          {/* Engagement Pathways */}
          <ChaptersSection />
          <PartnersStakeholdersSection />
          
          {/* Final CTA */}
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
