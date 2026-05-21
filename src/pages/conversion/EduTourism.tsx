import ConversionPageTemplate from "@/components/conversion/ConversionPageTemplate";
import hero from "@/assets/hero-chapters.jpg";

export default function EduTourism() {
  return (
    <ConversionPageTemplate
      metaTitle="EduTourism Africa — Learning Missions & School Visits Across Africa"
      metaDescription="Apply to join SCEF's EduTourism program — education-focused travel, school visits, cultural exchange, and impact missions across African nations."
      canonicalPath="/edutourism"
      kicker="EduTourism"
      headline="Experience African education from the inside"
      subheadline="Join education-focused travel, school visits, cultural exchange, learning missions, and impact experiences across Africa — co-designed with local chapters."
      heroImage={hero}
      heroImageAlt="International delegation visiting an African school on an EduTourism mission"
      primaryCta={{ label: "Apply for EduTourism", href: "/contact?topic=edutourism" }}
      secondaryCta={{ label: "View Calendar", href: "/calendar" }}
      audience={[
        "Diaspora Africans returning for purposeful travel",
        "International educators and school leaders",
        "Foundations scoping investment regions",
        "Student leadership and university groups",
      ]}
      whyItMatters="Africa's education story is best understood on the ground. EduTourism turns visitors into informed advocates by pairing curated travel with school visits, chapter meetings, and structured learning missions."
      whatYouGet={[
        "Curated multi-country education itineraries",
        "Verified school and chapter access",
        "Local guide and translator support",
        "Cultural and historical immersion days",
        "Optional CPD certification for educators",
        "Post-mission impact report and network introductions",
      ]}
      steps={[
        { title: "Submit interest", description: "Tell us your dates, regions, and learning goals." },
        { title: "Itinerary design", description: "We co-design a 5–14 day learning mission." },
        { title: "Confirmation", description: "Secure your spot with a deposit via GFA Wallet." },
        { title: "Travel & report", description: "Travel with SCEF and receive your post-mission report." },
      ]}
      requirements={[
        "Valid passport and applicable visas",
        "Standard travel insurance",
        "Adherence to SCEF safeguarding and conduct policy",
        "Vaccinations per destination requirements",
      ]}
      trustPoints={[
        { value: "Chapter-led", label: "Local coordination" },
        { value: "Verified", label: "School partners" },
        { value: "Safeguarded", label: "Child protection standards" },
        { value: "Curated", label: "Education-only itineraries" },
      ]}
      faqs={[
        { question: "Which countries are available?", answer: "Active EduTourism corridors include Nigeria, Ghana, Kenya, Rwanda, South Africa, Senegal, and Seychelles — with more added each season." },
        { question: "Can we customise the itinerary?", answer: "Yes. Groups and institutions can co-design itineraries with the SCEF EduTourism team." },
        { question: "Is this voluntourism?", answer: "No. EduTourism prioritises observation, learning, and structured engagement — not unqualified service delivery in schools." },
        { question: "What does it cost?", answer: "Costs vary by route, group size, and accommodation tier. A detailed quote is shared after the design call." },
      ]}
    />
  );
}
