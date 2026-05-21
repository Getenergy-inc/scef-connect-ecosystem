import ConversionPageTemplate from "@/components/conversion/ConversionPageTemplate";
import hero from "@/assets/hero-chapters.jpg";

export default function RegionalCoverage() {
  return (
    <ConversionPageTemplate
      metaTitle="SCEF Regional Coverage — Education Impact Across African Regions"
      metaDescription="Explore SCEF's regional education-impact focus across Africa and opportunities for regional leadership through chapters and continental programs."
      canonicalPath="/regional-coverage"
      kicker="Regional Coverage"
      headline="A continental footprint, delivered region by region"
      subheadline="Explore SCEF's regional education-impact focus across Africa and opportunities for regional leadership through chapters, partnerships, and continental programs."
      heroImage={hero}
      heroImageAlt="Map of Africa highlighting SCEF regional chapter coverage"
      primaryCta={{ label: "View Local Chapters", href: "/local-chapters" }}
      secondaryCta={{ label: "Start a Chapter", href: "/chapters/start" }}
      audience={[
        "Regional coordinators and education leaders",
        "Country directors and chapter presidents",
        "Multilateral partners scoping regional initiatives",
        "Diaspora networks active across multiple countries",
      ]}
      whyItMatters="Africa is not one market. SCEF's regional structure — West, East, Central, Southern, North, Indian Ocean, and Diaspora — lets recognition, funding, and projects flow at the right scale, with local accountability and continental visibility."
      whatYouGet={[
        "Regional chapter networks and contacts",
        "Region-specific NESA-Africa categories",
        "EduAid scholarship corridors per region",
        "Regional partner introductions",
        "Quarterly regional reporting",
        "Regional leadership pathways",
      ]}
      steps={[
        { title: "Pick your region", description: "Browse SCEF's seven operational regions." },
        { title: "Connect with chapter", description: "We route you to the right country and city chapter." },
        { title: "Take a role", description: "Join as member, ambassador, coordinator, or regional lead." },
        { title: "Deliver & report", description: "Contribute to regional initiatives with chapter support." },
      ]}
      trustPoints={[
        { value: "7", label: "Operational regions" },
        { value: "20+", label: "Country presence" },
        { value: "Verified", label: "Reporting in progress" },
        { value: "Live", label: "Regional pipelines" },
      ]}
      faqs={[
        { question: "Which regions are active?", answer: "West, East, Central, Southern, North Africa, Indian Ocean Islands, and the Diaspora Africa network." },
        { question: "Can I lead a region?", answer: "Yes. Regional Coordinator roles open by application and chapter election cycles." },
        { question: "How do I find my country chapter?", answer: "Visit Local Chapters and select your country, or contact us to be routed to the nearest active chapter." },
      ]}
    />
  );
}
