import ConversionPageTemplate from "@/components/conversion/ConversionPageTemplate";
import hero from "@/assets/hero-partners.jpg";

export default function Sponsorship() {
  return (
    <ConversionPageTemplate
      metaTitle="Sponsor a Program — Partner With SCEF Across Africa"
      metaDescription="Sponsor NESA-Africa awards, EduAid scholarships, school transformation, webinars, or regional education projects through SCEF's verified sponsorship pathways."
      canonicalPath="/sponsorship"
      kicker="Sponsorship"
      headline="Sponsor education impact at scale across Africa"
      subheadline="Partner with SCEF to sponsor awards, school transformation, webinars, scholarships, or regional education projects — with transparent reporting and brand recognition."
      heroImage={hero}
      heroImageAlt="Corporate partners signing an education sponsorship agreement"
      primaryCta={{ label: "Request Sponsorship Pack", href: "/contact?topic=sponsorship" }}
      secondaryCta={{ label: "Partner With Us", href: "/partner-with-us" }}
      audience={[
        "Corporations with CSR or education mandates",
        "Foundations and family offices",
        "Government and multilateral agencies",
        "High-impact philanthropists and diaspora investors",
      ]}
      whyItMatters="Recognition without funding stalls. SCEF's sponsorship model lets your organisation back the exact lever you care about — an award category, a school rebuild, a scholarship cohort, or a regional campaign — with verified delivery and reporting."
      whatYouGet={[
        "Branded placement across NESA-Africa, EduAid, and Santos Media",
        "Named scholarship, school, or award category options",
        "Quarterly impact and financial reporting",
        "Co-branded webinars and event participation",
        "Tax-deductible structures where applicable",
        "Continental visibility across SCEF chapters",
      ]}
      steps={[
        { title: "Request the pack", description: "Tell us your CSR theme, budget range, and target region." },
        { title: "Sponsorship design", description: "We propose 2–3 fit-for-purpose sponsorship structures." },
        { title: "Agreement & onboarding", description: "Sign the MoU and complete GFA Wallet routing." },
        { title: "Deliver & report", description: "We deliver, document, and report on impact each quarter." },
      ]}
      requirements={[
        "Registered organisation with valid documentation",
        "Alignment with SCEF safeguarding and anti-bribery policy",
        "Minimum 12-month sponsorship horizon recommended",
        "Willingness to be publicly acknowledged",
      ]}
      trustPoints={[
        { value: "GFA Wallet", label: "Verified payment layer" },
        { value: "Quarterly", label: "Impact reporting" },
        { value: "ECOSOC", label: "Track aligned governance" },
        { value: "Pan-African", label: "Continental reach" },
      ]}
      faqs={[
        { question: "What's the minimum sponsorship amount?", answer: "Sponsorship tiers start at the chapter level and scale to continental partnerships. The sponsorship pack outlines current bands." },
        { question: "Can we sponsor a specific country or region?", answer: "Yes. SCEF supports country, regional, and thematic sponsorships across its chapter network." },
        { question: "How are funds disbursed?", answer: "All sponsorship funds route through GFA Wallet for verified, auditable disbursement." },
        { question: "Will our brand be visible?", answer: "Yes — across event collateral, webinars, microsites, and reports, per the tier you select." },
      ]}
    />
  );
}
