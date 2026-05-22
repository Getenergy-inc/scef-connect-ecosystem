import { Link } from "react-router-dom";
import { Briefcase, GraduationCap, Heart, Laptop, Users, BookOpen, ShieldCheck, HandHeart } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import {
  Section,
  HeroCTAs,
  Prose,
  BulletGrid,
  CardGrid,
  Steps,
  Safeguarding,
  PartnershipBlock,
  FinalCTA,
} from "@/components/programs/template/ProgramSections";
import { MyCareerMyLife } from "@/components/sections/MyCareerMyLife";
import { EduAidWebinarCalendar } from "@/components/sections/EduAidWebinarCalendar";
import { MCMLMedia } from "@/components/sections/MCMLMedia";
import { myCareerMyLifeCalendar } from "@/config/trainingCalendar";

const objectives = [
  "Guide JSS, SS2 and SS3 students through informed subject and career choices.",
  "Open TVET, digital, entrepreneurship and university pathways for African youth.",
  "Strengthen girls' career confidence, leadership and STEM exposure.",
  "Include vulnerable and special needs learners in career advocacy.",
  "Build a verified mentor network across schools, chapters and online clubs.",
];

const tracks = [
  { icon: Briefcase, title: "Career Guidance & Subject Choice", body: "Structured sessions on subject selection, career pathways, tertiary options and labour-market awareness." },
  { icon: GraduationCap, title: "Life Skills & Personal Development", body: "Goal setting, financial literacy, communication, time management, resilience and decision-making." },
  { icon: Users, title: "Mentorship Programme", body: "1-to-many and small-group mentoring with verified professionals, alumni and diaspora mentors." },
  { icon: Heart, title: "Girls' Career Support", body: "Confidence circles, STEM exposure, leadership labs and safeguarding-aware mentorship for girls." },
  { icon: BookOpen, title: "TVET & Entrepreneurship Pathways", body: "Vocational, technical and entrepreneurship pathways including youth enterprise and apprenticeship awareness." },
  { icon: Laptop, title: "Digital Career Clubs", body: "Online career clubs covering coding, design, data, AI literacy and digital work readiness." },
  { icon: GraduationCap, title: "School Career Clubs & Career Talks", body: "School-based career clubs, monthly career talks and chapter-led career days." },
  { icon: HandHeart, title: "Vulnerable & Special Needs Support", body: "Inclusive career advocacy for learners with special needs, displaced learners and out-of-school youth, delivered through approved partners." },
];

const audience = [
  "JSS students (Junior Secondary)",
  "SS2 and SS3 students (Senior Secondary)",
  "Out-of-school and second-chance learners",
  "Girls' education programmes",
  "Special needs and inclusive education settings",
  "School counsellors and career masters",
  "Chapter mentors and volunteers",
  "Diaspora professionals and friends of Africa",
];

const journey: Array<[string, string]> = [
  ["Register Your School", "Schools register for the My Career My Life programme through SCEF or local chapters."],
  ["Apply as a Mentor", "Mentors apply through the EduAid Africa Teacher Corps under the My Career My Life Mentor category."],
  ["Training & Safeguarding", "Mentors complete the Online Teaching Training Programme and safeguarding orientation."],
  ["Verification", "Identity, reference and (where required) background checks."],
  ["Delivery", "Career talks, mentorship sessions and digital career clubs delivered physically and online."],
  ["Reporting", "Schools and mentors submit short impact reports each term."],
];

const safeguardingRules = [
  "All mentor sessions follow safeguarding and child-protection rules",
  "No unsupervised one-on-one contact with minors",
  "Approved school, chapter and online channels only",
  "Respect for learner privacy and consent",
  "Gender-sensitive and inclusive facilitation",
  "Approved referrals for counselling or specialist support",
];

const partnerCategories = [
  "Schools and ministries of education",
  "Universities, TVET institutions and exam bodies",
  "Industry, professional and diaspora networks",
  "Edtech and digital learning partners",
  "CSR partners",
  "Faith-based and community partners",
];

const partnerSupport = [
  "Mentor networks and chapter coordinators",
  "Career talk facilitators",
  "Digital career club content and tools",
  "Girls' career scholarships and STEM kits",
  "School career club starter packs",
  "Career fair and roadshow sponsorship",
];

const impact = [
  "Number of schools enrolled",
  "Number of students reached",
  "Number of girls mentored",
  "Number of mentors verified",
  "Number of career talks delivered",
  "Number of school career clubs supported",
  "Number of digital career club participants",
  "Number of chapters and countries engaged",
];

const MyCareerMyLifePage = () => {
  return (
    <PageShell
      title="My Career My Life Services"
      description="SCEF and EduAid Africa career guidance, life skills, mentorship and TVET pathways for African JSS, SS2 and SS3 students — delivered physically and online."
      eyebrow="EduAid Africa · Career & Life Pathways"
      heading="My Career My Life Services"
      intro="A continental career guidance, life skills and mentorship programme for African JSS, SS2 and SS3 students — combining school career clubs, career talks, digital career clubs and verified mentors, delivered physically and online."
    >
      <HeroCTAs
        primary={{ label: "Register Your School", to: "#register-school" }}
        secondary={{ label: "Become a Career Mentor", to: "/programs/eduaid-africa-teacher-corps" }}
        tertiary={{ label: "Partner With Us", to: "/partner-with-us" }}
        tagline="Guide. Mentor. Open Pathways."
      />

      <Section kicker="About the Programme" title="Career, life skills and mentorship at scale">
        <Prose>
          <p>
            My Career My Life Services is SCEF&apos;s flagship career, life-skills and mentorship
            programme for African students. It supports JSS, SS2 and SS3 learners with structured
            career guidance, mentorship, TVET awareness, digital career clubs and inclusive
            advocacy — across schools, local chapters and online platforms.
          </p>
          <p>
            The programme operates under EduAid Africa and is delivered with verified mentors
            recruited through the EduAid Africa Teacher Corps.
          </p>
        </Prose>
      </Section>

      <Section kicker="Purpose & Mission" title="Why this programme exists">
        <Prose>
          <p>
            Too many African students transition through secondary school without clear career
            guidance, role models or pathways. My Career My Life exists to close that gap —
            opening informed, inclusive and verified routes into education, work and
            entrepreneurship for every learner.
          </p>
        </Prose>
      </Section>

      <Section kicker="Core Objectives" title="What the programme delivers">
        <BulletGrid items={objectives} cols={2} />
      </Section>

      <Section kicker="What We Do" title="Service Tracks">
        <CardGrid items={tracks} />
      </Section>

      <Section kicker="Who Benefits" title="Students, schools, mentors and partners">
        <BulletGrid items={audience} />
      </Section>

      <section id="register-school">
        <MyCareerMyLife />
      </section>

      <Section kicker="How It Works" title="From school registration to learner impact">
        <Steps steps={journey} />
      </Section>

      <Section kicker="Safeguarding Commitment" title="Safe mentorship, learner-first">
        <Safeguarding rules={safeguardingRules} />
      </Section>

      <Section kicker="Fees & Access" title="Free for schools — mentor form fee applies">
        <Prose>
          <p>
            My Career My Life is free for registered schools and learners. Mentors apply through
            the EduAid Africa Teacher Corps under the <strong>My Career My Life Mentor</strong>{" "}
            category (form fee USD 15). Schools, partners and chapters may sponsor mentors,
            career talks or school career clubs.
          </p>
          <p>
            Payment of a mentor form fee does not guarantee posting. All mentors must complete
            training, safeguarding orientation and verification before being deployed.
          </p>
        </Prose>
      </Section>

      <Section kicker="Partnerships" title="Support African career pathways">
        <PartnershipBlock
          intro="SCEF and EduAid Africa invite schools, universities, industry, edtech and CSR partners to support My Career My Life Services."
          categories={partnerCategories}
          support={partnerSupport}
          ctaLabel="Partner With My Career My Life"
        />
      </Section>

      <EduAidWebinarCalendar
        rows={myCareerMyLifeCalendar}
        eyebrow="Starts August 2026"
        title="My Career My Life Monthly Advocacy Calendar"
        subtitle="A 12-month advocacy and career-guidance calendar reaching JSS, SS2 and SS3 students across schools, chapters and partner networks."
      />

      <MCMLMedia />

      <Section kicker="What We Track" title="Impact indicators">
        <BulletGrid items={impact} />
      </Section>

      <FinalCTA
        title="Guide a Generation. Open African Pathways."
        body="Register your school, become a verified mentor, or partner with us to deliver My Career My Life Services across Africa."
        buttons={[
          { label: "Register Your School", to: "#register-school" },
          { label: "Become a Career Mentor", to: "/programs/eduaid-africa-teacher-corps", variant: "secondary" },
          { label: "Partner With Us", to: "/partner-with-us", variant: "outline" },
        ]}
      />
    </PageShell>
  );
};

export default MyCareerMyLifePage;
