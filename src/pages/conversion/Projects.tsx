import ConversionPageTemplate from "@/components/conversion/ConversionPageTemplate";
import hero from "@/assets/hero-schoolgirl.jpg";

export default function Projects() {
  return (
    <ConversionPageTemplate
      metaTitle="Join a SCEF Project — Active Education Impact Projects Across Africa"
      metaDescription="Take part in active SCEF projects supporting schools, students, teachers, women and girls, and local communities across Africa."
      canonicalPath="/projects"
      kicker="Join a Project"
      headline="Put your time and skills behind real education projects"
      subheadline="Take part in active SCEF projects supporting schools, students, teachers, women and girls, and local communities across Africa."
      heroImage={hero}
      heroImageAlt="Community volunteers working on a SCEF school improvement project"
      primaryCta={{ label: "Browse Open Projects", href: "/contact?topic=projects" }}
      secondaryCta={{ label: "Volunteer Instead", href: "/volunteer" }}
      audience={[
        "Skilled professionals offering pro-bono support",
        "Local chapter members ready for delivery roles",
        "Diaspora networks funding or staffing projects",
        "Partner organisations co-running initiatives",
      ]}
      whyItMatters="Projects are where SCEF's recognition and partnerships become outcomes — classrooms rebuilt, scholarships disbursed, teachers trained, girls re-enrolled. Joining a project means joining the delivery edge of the ecosystem."
      whatYouGet={[
        "Direct role on a live SCEF project",
        "Project coordinator support and onboarding",
        "Contribution log toward ambassador and recognition tiers",
        "Cross-chapter collaboration and visibility",
        "Impact certificate and reference",
        "Optional press coverage via Santos Media",
      ]}
      steps={[
        { title: "Browse projects", description: "Review open delivery, funding, and advocacy projects." },
        { title: "Express interest", description: "Tell us which project and the role you want to play." },
        { title: "Project briefing", description: "Join the project briefing and meet the team." },
        { title: "Deliver & report", description: "Contribute, log activity, and receive your impact certificate." },
      ]}
      trustPoints={[
        { value: "Live", label: "Project tracking" },
        { value: "Chapter-led", label: "Local delivery" },
        { value: "Verified", label: "Outcome reporting" },
        { value: "Open", label: "To members & partners" },
      ]}
      faqs={[
        { question: "Do I need to be a member first?", answer: "Membership is encouraged but not required for short pro-bono contributions. Sustained roles require membership." },
        { question: "Can I propose a project?", answer: "Yes. Members and chapters can propose projects via the project intake form, subject to alignment and governance review." },
        { question: "Is funding required?", answer: "Some projects require funding; others need time and skills. The brief specifies what each project needs." },
      ]}
    />
  );
}
