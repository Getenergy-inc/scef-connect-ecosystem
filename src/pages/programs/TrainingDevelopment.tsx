import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { EduAidWebinarCalendar } from "@/components/sections/EduAidWebinarCalendar";
import { SchoolRegistration } from "@/components/sections/SchoolRegistration";
import {
  Section,
  Prose,
  CardGrid,
  Steps,
  Safeguarding,
  PartnershipBlock,
  FinalCTA,
} from "@/components/programs/template/ProgramSections";
import {
  GraduationCap,
  Users,
  Laptop,
  Award,
  BookOpen,
  Briefcase,
} from "lucide-react";

const TrainingDevelopment = () => {
  return (
    <>
      <Helmet>
        <title>Training, Development & Career Pathways — SCEF</title>
        <meta
          name="description"
          content="EduAid-Africa monthly training calendar for teachers, school leaders, NGOs and chapter leaders. Register your school, sponsor a training, or attend a webinar."
        />
        <link rel="canonical" href="https://santoscreations.org/programs/training-development" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[76px] md:h-[84px]" />

        {/* Hero */}
        <section className="relative overflow-hidden bg-scef-blue-darker py-20 text-white md:py-28">
          <div className="absolute inset-0 bg-scef-pattern opacity-[0.06]" />
          <div className="container relative mx-auto max-w-4xl px-6 text-center md:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-light">
              Capacity Building · Starts July 2026
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Training, Development & Career Pathways
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              Structured monthly training and capacity development for teachers,
              school leaders, students, volunteers and education stakeholders —
              powered by EduAid-Africa, Education Online Africa, and the GFA Wallet.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="#register"
                className="inline-flex h-12 items-center rounded-md bg-scef-gold px-7 font-semibold text-scef-blue-darker hover:bg-scef-gold-hover"
              >
                Register for a Webinar
              </Link>
              <Link
                to="/partner-with-us"
                className="inline-flex h-12 items-center rounded-md border border-white/40 px-7 font-semibold text-white hover:bg-white/10"
              >
                Sponsor a Training
              </Link>
            </div>
          </div>
        </section>

        <main>
          <Section kicker="About" title="Purpose of Training & Development">
            <Prose>
              <p>
                SCEF&apos;s Training & Development pillar equips African educators,
                school leaders, students, and volunteers with the modern pedagogy,
                digital literacy, leadership, and entrepreneurship skills needed
                to raise learning outcomes across the continent. All trainings are
                delivered through Education Online Africa and certified via the
                ACDL/AWPC system with 24-month validity.
              </p>
            </Prose>
          </Section>

          <Section kicker="Tracks" title="Six Capacity-Building Tracks">
            <CardGrid
              items={[
                { icon: GraduationCap, title: "Teacher Pedagogy", body: "Modern, inclusive classroom methods, lesson design and assessment." },
                { icon: Laptop, title: "Digital Literacy & EdTech", body: "ICT in teaching, online classrooms, digital tools and AI in education." },
                { icon: Users, title: "School Leadership", body: "Principals, administrators and chapter leads — governance and quality assurance." },
                { icon: BookOpen, title: "Student Career Pathways", body: "Career guidance, subject choices and life planning for JSS–SS3 learners." },
                { icon: Briefcase, title: "Vocational & Enterprise", body: "Practical skills, entrepreneurship and youth employability." },
                { icon: Award, title: "Certification & CPD", body: "ACDL/AWPC certificates with 24-month CPD renewal cycle." },
              ]}
            />
          </Section>

          <Section kicker="How It Works" title="Volunteer & Trainee Journey">
            <Steps
              steps={[
                ["Register", "Submit your training interest via the form below or register your school."],
                ["Verify", "Identity, school affiliation and prior learning are verified."],
                ["Train", "Attend the monthly webinar, workshop or self-paced module on Education Online Africa."],
                ["Assess", "Complete the assessment and CPD reflection task."],
                ["Certify", "Receive an ACDL/AWPC digital certificate valid for 24 months."],
              ]}
            />
          </Section>

          <Section kicker="Safeguarding" title="Quality & Safeguarding Commitment">
            <Safeguarding
              intro="All SCEF trainings follow institutional safeguarding and quality assurance rules."
              rules={[
                "Verified trainer credentials and ethics agreement",
                "Child-protection compliance for any school-based session",
                "Data privacy for participants and learners",
                "Independent quality assurance per cohort",
                "Transparent grievance and feedback channel",
                "No paid endorsements or sponsor-driven content",
              ]}
            />
          </Section>

          <div id="register">
            <EduAidWebinarCalendar />
            <SchoolRegistration />
          </div>

          <Section kicker="Partnerships" title="Partner With Training & Development">
            <PartnershipBlock
              intro="We partner with ministries, universities, EdTech firms, NGOs and CSR teams to scale teacher capacity across Africa."
              categories={[
                "Education ministries & agencies",
                "Universities & colleges of education",
                "EdTech companies",
                "Foundations & CSR partners",
                "NGOs & teacher unions",
                "Diaspora professional networks",
              ]}
              support={[
                "Sponsor a monthly webinar cohort",
                "Fund a chapter trainer cycle",
                "Provide content or curriculum",
                "Underwrite ACDL/AWPC certifications",
                "Donate devices or connectivity",
                "Host a regional training mission",
              ]}
            />
          </Section>

          <Section kicker="Impact" title="What We Measure">
            <CardGrid
              items={[
                { icon: Users, title: "Educators Trained", body: "Reporting in progress." },
                { icon: GraduationCap, title: "Certificates Issued", body: "Reporting in progress." },
                { icon: Award, title: "Schools Engaged", body: "Reporting in progress." },
              ]}
            />
          </Section>

          <FinalCTA
            title="Train. Certify. Transform Classrooms."
            body="Join the next cohort, register your school, or sponsor a training cycle."
            buttons={[
              { label: "Register for a Webinar", to: "#register" },
              { label: "Sponsor a Training", to: "/partner-with-us", variant: "secondary" },
              { label: "Explore EduAid-Africa", to: "/programs/eduaid-africa", variant: "outline" },
            ]}
          />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TrainingDevelopment;
