import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { DigitalBoard } from "@/components/sections/DigitalBoard";
import { ChaptersSection } from "@/components/sections/ChaptersSection";
import { CTASection } from "@/components/sections/CTASection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SCEF - Santos Creations Educational Foundation | Transforming Education Across Africa</title>
        <meta 
          name="description" 
          content="Join SCEF to support scholarships, education awards, inclusive learning, and community chapters across Africa. Together we build sustainable futures through education." 
        />
        <meta name="keywords" content="African education, scholarships Africa, NESA Africa, education foundation, Pan-African education, SCEF" />
        <link rel="canonical" href="https://scef.org" />
      </Helmet>
      
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <ImpactStats />
          <ProgramsSection />
          <DigitalBoard />
          <ChaptersSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
