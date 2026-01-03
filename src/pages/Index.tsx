import { Helmet } from "react-helmet-async";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { HeroScreenshot } from "@/components/sections/HeroScreenshot";
import { ProgramsGrid } from "@/components/sections/ProgramsGrid";
import { ExploreSection } from "@/components/sections/ExploreSection";
import { GovernanceSnapshot } from "@/components/sections/GovernanceSnapshot";
import { PartnersStakeholdersSection } from "@/components/sections/PartnersStakeholdersSection";
import { CTASection } from "@/components/sections/CTASection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SCEF - Santos Creations Educational Foundation | Governing Africa's Education Future</title>
        <meta 
          name="description" 
          content="Achieving Education for All in 57 African Countries – Driven by Membership, Diaspora Strength, CSR Partnerships, and Grassroots Empowerment." 
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
        <HeaderScreenshot />
        
        {/* Spacer for fixed header */}
        <div className="h-[88px] md:h-[96px]" />
        
        <main>
          {/* Hero with Digital Board */}
          <HeroScreenshot />
          
          {/* Our Programs */}
          <ProgramsGrid />
          
          {/* Explore Section */}
          <ExploreSection />
          
          {/* Governance Snapshot */}
          <GovernanceSnapshot />
          
          {/* Partners & Stakeholders */}
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
