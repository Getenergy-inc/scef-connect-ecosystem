import { Helmet } from "react-helmet-async";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { LandingHero } from "@/components/sections/LandingHero";
import { RmsaHero } from "@/components/sections/RmsaHero";
import { SpecialNeedsSection } from "@/components/sections/SpecialNeedsSection";
import { HowRmsaWorks } from "@/components/sections/HowRmsaWorks";
import { WalletVotingSection } from "@/components/sections/WalletVotingSection";
import { FeaturedCampaigns } from "@/components/sections/FeaturedCampaigns";
import { RmsaFinalCTA } from "@/components/sections/RmsaFinalCTA";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { WhoWeAreLean } from "@/components/sections/WhoWeAreLean";
import { ImpactStripLabels } from "@/components/sections/ImpactStripLabels";

import { EndorsedBySection } from "@/components/sections/EndorsedBySection";
import { CRSPartnersStrip } from "@/components/sections/CRSPartnersStrip";
import { CSRFundManagement } from "@/components/sections/CSRFundManagement";
import { SixCoreServices } from "@/components/sections/SixCoreServices";
import { AdvocacyServices } from "@/components/sections/AdvocacyServices";
import { StoriesOfTransformation } from "@/components/sections/StoriesOfTransformation";
import { LocalChaptersSnapshot } from "@/components/sections/LocalChaptersSnapshot";
import { WaysToSupport } from "@/components/sections/WaysToSupport";
import { StickyMobileJoin } from "@/components/layout/StickyMobileJoin";
import { Reveal } from "@/components/ui/reveal";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SCEF — Empowering Africa Through Education, Innovation & Opportunity</title>
        <meta
          name="description"
          content="Santos Creations Educational Foundation — a membership-driven Pan-African foundation advancing education across regions through advocacy, digital access, and strategic partnerships."
        />
        <meta
          name="keywords"
          content="African education, SCEF, NESA Africa, EduAid Africa, education standards, eLibrary Nigeria, Pan-African education, Rebuild My School Africa, membership"
        />
        <link rel="canonical" href="https://santoscreations.org" />

        <meta property="og:title" content="SCEF — Empowering Africa Through Education, Innovation & Opportunity" />
        <meta
          property="og:description"
          content="A membership-driven Pan-African foundation advancing education across regions through advocacy, digital access, and strategic partnerships."
        />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NGO",
            name: "Santos Creations Educational Foundation",
            alternateName: "SCEF",
            url: "https://santoscreations.org",
            description: "Membership-driven Pan-African education foundation",
            foundingDate: "1997",
            areaServed: "Africa",
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />

        <main>
          {/* 1. HERO — clear value + 4 primary CTAs */}
          <LandingHero />

          {/* 2. PRIMARY ACTION — Rebuild My School Africa (strongest conversion engine) */}
          <RmsaHero />

          {/* 3. WHAT SCEF DOES — 6 core education services */}
          <Reveal>
            <SixCoreServices />
          </Reveal>

          {/* 4. SPECIAL NEEDS — emotional, inclusion-first */}
          <Reveal>
            <SpecialNeedsSection />
          </Reveal>

          {/* 5. HOW IT WORKS — 5 simple steps */}
          <Reveal>
            <HowRmsaWorks />
          </Reveal>

          {/* 6. IMPACT SNAPSHOT — visual numbers */}
          <Reveal>
            <ImpactStripLabels />
          </Reveal>

          {/* 7. WALLET + VOTING — Fund · Vote · Track */}
          <Reveal>
            <WalletVotingSection />
          </Reveal>

          {/* 8. FEATURED CAMPAIGNS — image · name · progress · donate/vote */}
          <Reveal>
            <FeaturedCampaigns />
          </Reveal>

          {/* 8b. Before & After transformations (visual proof) */}
          <Reveal>
            <BeforeAfterSection />
          </Reveal>

          {/* 9. CSR & EDUCATION FUND MANAGEMENT — process steps for serious users */}
          <Reveal>
            <CSRFundManagement />
          </Reveal>

          {/* 10. WAYS TO SUPPORT EDUCATION IN AFRICA */}
          <Reveal>
            <WaysToSupport />
          </Reveal>

          {/* 11. ADVOCACY & MEDIA — Voice & Visibility (NESA TV, It's In Me, Campaigns) */}
          <Reveal>
            <AdvocacyServices />
          </Reveal>

          {/* 11b. Stories of transformation */}
          <Reveal>
            <StoriesOfTransformation />
          </Reveal>

          {/* 12. LOCAL CHAPTERS — join / view */}
          <Reveal>
            <LocalChaptersSnapshot />
          </Reveal>

          {/* --- Secondary institutional context (demoted below conversion flow) --- */}

          {/* Who we are — institutional context */}
          <Reveal>
            <WhoWeAreLean />
          </Reveal>

          {/* Trusted & endorsed by */}
          <Reveal>
            <EndorsedBySection />
          </Reveal>

          {/* Supporting partners */}
          <Reveal>
            <CRSPartnersStrip />
          </Reveal>

          {/* 13. FINAL CTA — Donate · Nominate · Partner */}
          <Reveal>
            <RmsaFinalCTA />
          </Reveal>
        </main>

        <Footer />
        <StickyMobileJoin />
      </div>
    </>
  );
};

export default Index;
