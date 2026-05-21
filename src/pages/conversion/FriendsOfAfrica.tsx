import ConversionPageTemplate from "@/components/conversion/ConversionPageTemplate";
import hero from "@/assets/hero-partners.jpg";

export default function FriendsOfAfrica() {
  return (
    <ConversionPageTemplate
      metaTitle="Friends of Africa — Global Partners Advancing African Education"
      metaDescription="Partner with SCEF as a global friend of African education through sponsorship, advocacy, technical support, or institutional collaboration."
      canonicalPath="/friends-of-africa"
      kicker="Friends of Africa"
      headline="Stand with African education as a global partner"
      subheadline="Partner with SCEF as a global friend of African education through sponsorship, advocacy, technical support, or institutional collaboration."
      heroImage={hero}
      heroImageAlt="International institutional partners meeting with SCEF leadership"
      primaryCta={{ label: "Become a Partner", href: "/contact?topic=friends-of-africa" }}
      secondaryCta={{ label: "Partner With Us", href: "/partner-with-us" }}
      audience={[
        "International foundations and NGOs",
        "Universities and research institutions",
        "Multilateral and bilateral development agencies",
        "Global corporations with Africa CSR mandates",
      ]}
      whyItMatters="Africa's education progress accelerates when global friends bring credible partnership — not parachute projects. The Friends of Africa partnership lets institutions co-design, co-fund, and co-deliver with SCEF's chapter-led network and verified governance."
      whatYouGet={[
        "Co-branded partnership agreements",
        "Access to SCEF's pan-African chapter network",
        "Research, MEL and reporting collaboration",
        "Joint events, webinars, and Santos Media coverage",
        "ECOSOC-track aligned governance interface",
        "Multi-year partnership horizons",
      ]}
      steps={[
        { title: "Initial inquiry", description: "Share your institution's interest and partnership theme." },
        { title: "Discovery call", description: "Scope objectives, geographies, and governance fit." },
        { title: "MoU and design", description: "Co-design the partnership and sign the MoU." },
        { title: "Launch & report", description: "Launch jointly with quarterly reporting and review." },
      ]}
      requirements={[
        "Registered institution with verifiable governance",
        "Alignment with SCEF safeguarding and ethics standards",
        "Willingness for transparent, co-branded reporting",
        "Minimum 12-month partnership horizon",
      ]}
      trustPoints={[
        { value: "ECOSOC", label: "Track aligned" },
        { value: "Pan-African", label: "Chapter network" },
        { value: "Verified", label: "Governance & MEL" },
        { value: "Multi-year", label: "Partnership horizons" },
      ]}
      faqs={[
        { question: "Is this only for international partners?", answer: "Friends of Africa is designed for global institutional partners. African institutions partner via the standard Partner With Us pathway." },
        { question: "Can we fund a specific country program?", answer: "Yes — partnerships can be continental, regional, country-specific, or thematic." },
        { question: "How is impact reported?", answer: "Quarterly impact and financial reports plus an annual joint review session." },
      ]}
    />
  );
}
