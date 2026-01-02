import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhoWeAreSection } from "@/components/sections/WhoWeAreSection";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { FeaturedPlatforms } from "@/components/sections/FeaturedPlatforms";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { DigitalBoard } from "@/components/sections/DigitalBoard";
import { ChaptersSection } from "@/components/sections/ChaptersSection";
import { GovernanceSection } from "@/components/sections/GovernanceSection";
import { CTASection } from "@/components/sections/CTASection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SCEF - Santos Creations Educational Foundation | Governing Africa's Education Future</title>
        <meta 
          name="description" 
          content="A pan-African, membership-driven institution governing, funding, certifying, and scaling education programs across Africa and the diaspora. Join SCEF today." 
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
          <FeaturedPlatforms />
          <CertificationsSection />
          <DigitalBoard />
          <ChaptersSection />
          <GovernanceSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
