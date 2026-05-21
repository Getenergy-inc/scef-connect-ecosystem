import ConversionPageTemplate from "@/components/conversion/ConversionPageTemplate";
import hero from "@/assets/hero-partners.jpg";

export default function DiasporaAfrica() {
  return (
    <ConversionPageTemplate
      metaTitle="Diaspora Africa Network — Connect, Fund, and Mentor African Education"
      metaDescription="Connect African diaspora supporters with education-impact opportunities, partnerships, funding, mentorship, and projects through the SCEF Diaspora Africa Network."
      canonicalPath="/diaspora-africa"
      kicker="Diaspora Africa Network"
      headline="Your diaspora power, channelled into African education"
      subheadline="Connect African diaspora supporters with education-impact opportunities, partnerships, funding, mentorship, and projects across the continent."
      heroImage={hero}
      heroImageAlt="African diaspora professionals collaborating online with chapter teams"
      primaryCta={{ label: "Join Diaspora Africa", href: "/contact?topic=diaspora" }}
      secondaryCta={{ label: "Become a Member", href: "/membership" }}
      audience={[
        "African professionals living abroad",
        "Diaspora associations and alumni networks",
        "Diaspora-led foundations and businesses",
        "Second-generation Africans seeking purposeful engagement",
      ]}
      whyItMatters="The African diaspora sends home billions every year, but most flows are personal. SCEF's Diaspora Africa Network channels diaspora time, skills, capital, and influence into verified education projects with measurable impact."
      whatYouGet={[
        "Diaspora-only briefings and quarterly calls",
        "Project funding and co-funding pathways",
        "Mentorship matching with African students and educators",
        "EduTourism return-home learning missions",
        "Recognition through NESA-Africa Diaspora categories",
        "Direct access to chapter coordinators in your country of origin",
      ]}
      steps={[
        { title: "Join the network", description: "Register as a diaspora supporter and tell us your interests." },
        { title: "Pick your lane", description: "Funding, mentorship, projects, or partnerships." },
        { title: "Onboarding call", description: "Meet the diaspora coordinator and your matched chapter." },
        { title: "Engage & report", description: "Activity is logged toward recognition and impact reporting." },
      ]}
      trustPoints={[
        { value: "Global", label: "Diaspora chapters" },
        { value: "GFA Wallet", label: "Verified funding rails" },
        { value: "Verified", label: "Project pipeline" },
        { value: "Annual", label: "Diaspora summit" },
      ]}
      faqs={[
        { question: "Do I need to be African by birth?", answer: "No. The network welcomes Africans by birth, descent, and adopted Africans aligned with the mission." },
        { question: "Is there a fee?", answer: "Basic network membership is free. Premium diaspora tiers may apply for governance roles." },
        { question: "Can I fund a project in my home country?", answer: "Yes. Diaspora members can fund chapter-vetted projects with full GFA Wallet routing and reporting." },
      ]}
    />
  );
}
