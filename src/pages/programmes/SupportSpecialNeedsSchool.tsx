import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { CANONICAL_URL, OWNERSHIP_LINE } from "@/config/schoolSupport";
import { SupportIntentProvider, TabKey } from "@/components/school-support/SupportIntentContext";
import { About, Categories, FiveWays, Hero, NoticeStrip, ServiceBand, TextSize, UtilityBar, Watch } from "@/components/school-support/TopSections";
import { DonateForm } from "@/components/school-support/DonateForm";
import { SponsorPartnerForm } from "@/components/school-support/SponsorPartnerForm";
import { EduTourism, Regions } from "@/components/school-support/RegionSections";
import { Connect, Faq, FinalCta, HowItWorks, SponsorshipOverview, SupportDetails, TimetableAndVote } from "@/components/school-support/InfoSections";
import { TakePartTabs } from "@/components/school-support/TakePartTabs";
import { VerifiedSchools } from "@/components/school-support/VerifiedSchools";
import { Section } from "@/components/school-support/ui";
import { BANK_ACCOUNTS } from "@/config/schoolSupport";

const TITLE = "Support a Special-Needs School Across Africa | EduAid-Africa";
const DESCRIPTION = "Nominate, donate, sponsor and attend: one verified special-needs or inclusive school supported in each of Africa's eight regions in 2027. A Rebuild My School Africa service of EduAid-Africa (SCEF).";

const PARAM_TO_TAB: Record<string, TabKey> = { nominate: "nominate", vote: "vote", donate: "donate", sponsor: "sponsor", partner: "sponsor", attend: "attend", volunteer: "attend" };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "NGO", "@id": "https://santoscreations.org/#org", name: "Santos Creations Educational Foundation (SCEF)", url: "https://santoscreations.org", address: { "@type": "PostalAddress", addressCountry: "NG" } },
    { "@type": "WebPage", url: CANONICAL_URL, name: TITLE, description: DESCRIPTION,
      potentialAction: { "@type": "DonateAction", name: "Donate to the Support Fund", recipient: { "@id": "https://santoscreations.org/#org" }, target: `${CANONICAL_URL}#donate` } },
  ],
};

const SupportSpecialNeedsSchool = () => {
  const [params] = useSearchParams();
  const p = (params.get("participation") ?? "").toLowerCase();
  const initialTab = PARAM_TO_TAB[p] ?? "nominate";
  const [size, setSize] = useState<TextSize>("base");
  const [contrast, setContrast] = useState(false);

  useEffect(() => {
    if (!PARAM_TO_TAB[p]) return;
    const t = setTimeout(() => document.getElementById("take-part")?.scrollIntoView({ block: "start" }), 300);
    return () => clearTimeout(t);
  }, [p]);

  const scope = ["eduaid-scope", size === "lg" ? "ea-text-lg" : size === "xl" ? "ea-text-xl" : "", contrast ? "ea-contrast" : ""].join(" ");

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <div className="min-h-screen flex flex-col bg-background">
        <HeaderScreenshot />
        <div className="h-[76px] md:h-[84px]" />
        <SupportIntentProvider initialTab={initialTab} initialMode={p === "partner" ? "partner" : "sponsor"}>
          <main id="main-content" className={scope}>
            <ServiceBand />
            <UtilityBar size={size} setSize={setSize} contrast={contrast} setContrast={setContrast} />
            <Hero />
            <NoticeStrip />
            <About />
            <FiveWays />
            <Section id="donate" eyebrow="Donate to the Support Fund" title="Give by bank transfer"
              intro={<>
                <p>Support Fund money is ring-fenced 100% for this programme. Payments are by bank transfer only, into one of four official accounts of EduAid Africa Ltd at Providus Bank:</p>
                <ul className="mt-2 grid sm:grid-cols-2 gap-1 text-sm">{BANK_ACCOUNTS.map((b) => <li key={b.currency}><strong>{b.currency}</strong> {b.number} · {b.purpose}</li>)}</ul>
              </>}>
              <div className="max-w-3xl"><DonateForm /></div>
            </Section>
            <Section id="sponsor-form" className="bg-eduaid-sand" eyebrow="Sponsor or partner" title="Sponsor a Regional School / Become a Programme Partner">
              <div className="max-w-3xl"><SponsorPartnerForm /></div>
            </Section>
            <Watch />
            <Categories />
            <Regions />
            <EduTourism />
            <HowItWorks />
            <SupportDetails />
            <TakePartTabs />
            <VerifiedSchools />
            <TimetableAndVote />
            <SponsorshipOverview />
            <Faq />
            <FinalCta />
            <Connect />
            <p className="container mx-auto px-4 pb-10 text-xs text-eduaid-muted">{OWNERSHIP_LINE}</p>
          </main>
        </SupportIntentProvider>
        <Footer />
      </div>
    </>
  );
};
export default SupportSpecialNeedsSchool;
