import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhoWeAreSection } from "@/components/sections/WhoWeAreSection";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { DivisionsSection } from "@/components/sections/DivisionsSection";
import { FeaturedPlatforms } from "@/components/sections/FeaturedPlatforms";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { DigitalBoard } from "@/components/sections/DigitalBoard";
import { ChaptersSection } from "@/components/sections/ChaptersSection";
import { PartnersStakeholdersSection } from "@/components/sections/PartnersStakeholdersSection";
import { GovernanceSection } from "@/components/sections/GovernanceSection";
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
      </Helmet>
      
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <WhoWeAreSection />
          <ImpactStats />
          <ProgramsSection />
          <DivisionsSection />
          <FeaturedPlatforms />
          <CertificationsSection />
          <DigitalBoard />
          <ChaptersSection />
          <PartnersStakeholdersSection />
          <GovernanceSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
