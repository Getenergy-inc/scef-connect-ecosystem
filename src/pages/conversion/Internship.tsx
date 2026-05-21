import ConversionPageTemplate from "@/components/conversion/ConversionPageTemplate";
import hero from "@/assets/hero-education.jpg";

export default function Internship() {
  return (
    <ConversionPageTemplate
      metaTitle="SCEF Internship Program — Hands-On Experience in Education Impact"
      metaDescription="Apply for a SCEF internship in nonprofit operations, education programs, media, research, partnerships, and community development across Africa."
      canonicalPath="/internship"
      kicker="Internship Program"
      headline="Build your career advancing education across Africa"
      subheadline="Gain hands-on experience inside a pan-African education-impact ecosystem — across programs, media, research, partnerships, and community development."
      heroImage={hero}
      heroImageAlt="Young African professionals collaborating on education programs"
      primaryCta={{ label: "Apply for Internship", href: "/contact?topic=internship" }}
      secondaryCta={{ label: "About SCEF", href: "/about" }}
      audience={[
        "University students and recent graduates",
        "Early-career professionals in education, media, or development",
        "Young leaders from SCEF local chapters and diaspora networks",
        "Researchers interested in African education systems",
      ]}
      whyItMatters="Africa's education future needs a new generation of practitioners who understand recognition, funding, and grassroots delivery. SCEF interns work alongside coordinators across NESA-Africa, EduAid-Africa, RMSA, eLibrary, and Santos Media — turning learning into real institutional contribution."
      whatYouGet={[
        "Structured mentorship from program leads",
        "Exposure to NESA-Africa, EduAid, RMSA, eLibrary and Santos Media",
        "Real project ownership, not coffee runs",
        "Networking with diaspora and partner organisations",
        "Certificate of completion and reference letter",
        "Pathway to ambassador, volunteer, or staff roles",
      ]}
      steps={[
        { title: "Submit application", description: "Complete the short interest form and upload your CV." },
        { title: "Screening call", description: "A 20-minute conversation with the program team." },
        { title: "Track placement", description: "We match you to a division aligned with your skills and goals." },
        { title: "Onboarding & start", description: "Begin a 3–6 month structured internship with clear deliverables." },
      ]}
      requirements={[
        "Strong written and spoken English (French, Portuguese, Arabic, or Swahili a plus)",
        "Commitment of at least 12 hours per week for 3–6 months",
        "Reliable internet for remote tracks",
        "Alignment with SCEF safeguarding and conduct standards",
      ]}
      trustPoints={[
        { value: "5", label: "Active program tracks" },
        { value: "20+", label: "Countries with chapter presence" },
        { value: "Verified", label: "Reporting in progress" },
        { value: "100%", label: "Mentor-led placements" },
      ]}
      faqs={[
        { question: "Is the internship paid?", answer: "Most tracks are unpaid learning placements; selected project-funded tracks include a stipend. The placement letter will specify the arrangement." },
        { question: "Can I intern remotely?", answer: "Yes. Many SCEF tracks are fully remote, while some chapter and media tracks are hybrid or in-person." },
        { question: "How long is the internship?", answer: "Standard placements are 3–6 months with the option to extend or convert into ambassador or volunteer roles." },
        { question: "Will I get a certificate?", answer: "Yes. Every successful intern receives an official completion certificate and a reference letter on request." },
      ]}
    />
  );
}
