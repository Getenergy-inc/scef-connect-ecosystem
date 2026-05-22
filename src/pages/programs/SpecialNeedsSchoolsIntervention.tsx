import { HandHeart, GraduationCap, ShieldCheck, Users, BookOpen, Globe2, Heart, Laptop } from "lucide-react";
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

const objectives = [
  "Establish one supported special needs schools intervention in each African region in 2027.",
  "Train teachers, caregivers, handlers and classroom assistants in inclusive education practice.",
  "Expand access to assistive learning materials and accessible classrooms.",
  "Strengthen safeguarding, dignity and rights of learners with special needs.",
  "Build a regional network of inclusive education partners across Africa.",
];

const tracks = [
  { icon: GraduationCap, title: "Teacher & Handler Training", body: "Inclusive pedagogy, individualised learning plans, behaviour support, sign language basics, low-vision adaptation and classroom assistant training." },
  { icon: HandHeart, title: "Assistive Learning Support", body: "Tactile materials, large-print and audio resources, simple assistive devices, accessible learning kits and adapted assessments." },
  { icon: ShieldCheck, title: "Safeguarding & Dignity", body: "Child protection, anti-bullying, dignified communication, consent, learner voice and safe referral pathways for special needs learners." },
  { icon: Heart, title: "Family & Caregiver Support", body: "Caregiver circles, home-learning guidance, peer support and rights awareness for parents and guardians of learners with special needs." },
  { icon: Laptop, title: "Digital Inclusion", body: "Accessible digital learning tools, screen readers, simple assistive apps and inclusive online clubs through Education Online Africa." },
  { icon: BookOpen, title: "Curriculum Adaptation Support", body: "Working with partner schools to adapt lessons, materials and assessments for inclusive classrooms." },
];

const beneficiaries = [
  "Special needs schools in each African region",
  "Inclusive public and mission schools",
  "Teachers, caregivers and handlers",
  "Classroom assistants and counsellors",
  "Learners with visual, hearing, physical, intellectual and developmental needs",
  "Families and caregivers of learners with special needs",
  "Ministry, district and faith-based education partners",
];

const journey: Array<[string, string]> = [
  ["Regional Nomination", "Partner schools, ministries and chapters nominate one supported intervention school per African region for 2027."],
  ["Needs Assessment", "EduAid Africa and partners conduct a school needs and safeguarding assessment."],
  ["Teacher & Handler Training", "Selected teachers, handlers and assistants enrol in inclusive education training."],
  ["Assistive Materials Deployment", "Accessible materials and assistive learning kits are deployed."],
  ["Volunteer Posting", "Verified Teacher Corps special needs volunteers and trainers are matched to the school."],
  ["Monitoring & Reporting", "Quarterly safeguarding, learning and inclusion reporting with partners."],
];

const safeguardingRules = [
  "No unsupervised one-on-one contact with learners",
  "Dignified, learner-first communication at all times",
  "Use of approved communication and referral channels",
  "Respect for privacy, photo and video consent",
  "Strict supervision of all assessments and home visits",
  "Zero tolerance for stigmatising or discriminatory language",
];

const partnerCategories = [
  "Special needs schools and inclusive education networks",
  "Ministries of education and social welfare",
  "Disability rights organisations",
  "Assistive technology providers",
  "Funding and CSR partners",
  "Universities and teacher training institutions",
  "Faith-based and community partners",
];

const partnerSupport = [
  "Assistive learning materials and devices",
  "Teacher and handler training scholarships",
  "Accessible classroom upgrades",
  "Safeguarding and counsellor training",
  "Regional intervention funding",
  "Volunteer trainer deployment",
];

const impact = [
  "Number of regional intervention schools supported",
  "Number of teachers and handlers trained",
  "Number of classroom assistants supported",
  "Number of learners with special needs reached",
  "Number of assistive learning kits deployed",
  "Number of safeguarding orientations delivered",
  "Number of caregivers engaged",
  "Number of partner organisations",
];

const SpecialNeedsSchoolsIntervention = () => (
  <PageShell
    title="EduAid Africa Special Needs Schools Intervention Programme"
    description="A regional intervention supporting one special needs school per African region in 2027 — teacher training, assistive learning, safeguarding and inclusive education."
    eyebrow="EduAid Africa · Inclusive Education"
    heading="Special Needs Schools Intervention Programme"
    intro="A regional inclusive education intervention supporting one special needs school in each African region for 2027 — strengthening teachers, handlers, assistive learning and safeguarding for learners with special needs."
  >
    <HeroCTAs
      primary={{ label: "Partner With Us", to: "/partner-with-us" }}
      secondary={{ label: "Volunteer as a Special Needs Trainer", to: "/programs/eduaid-africa-teacher-corps" }}
      tertiary={{ label: "Join the 2027 Waiting List", to: "/programs/2027-regional-waiting-list-grants" }}
      tagline="Inclusion. Dignity. Access."
    />

    <Section kicker="About the Programme" title="Inclusive education, one region at a time">
      <Prose>
        <p>
          The EduAid Africa Special Needs Schools Intervention Programme is a regional inclusive
          education initiative supporting special needs schools across Africa. In 2027, EduAid
          Africa will support one special needs school in each African region — building a
          continental footprint for inclusive teacher training, assistive learning and
          safeguarding.
        </p>
        <p>
          The programme works directly with schools, ministries, disability rights organisations
          and partners to strengthen teaching capacity, deploy assistive learning support and
          protect the dignity and rights of every learner.
        </p>
      </Prose>
    </Section>

    <Section kicker="Purpose & Mission" title="Why this programme exists">
      <Prose>
        <p>
          Millions of learners with special needs across Africa face limited access to trained
          teachers, accessible classrooms and dignified learning experiences. This programme
          exists to close that gap with regional, verifiable, partnership-led interventions —
          contributing directly to Education for All in Africa.
        </p>
      </Prose>
    </Section>

    <Section kicker="Core Objectives" title="What we will deliver">
      <BulletGrid items={objectives} cols={2} />
    </Section>

    <Section kicker="What We Do" title="Service Tracks">
      <CardGrid items={tracks} />
    </Section>

    <Section kicker="Who Benefits" title="Schools, teachers, learners and families">
      <BulletGrid items={beneficiaries} />
    </Section>

    <Section kicker="How It Works" title="From regional nomination to reporting">
      <Steps steps={journey} />
    </Section>

    <Section kicker="Safeguarding Commitment" title="Learner safety and dignity first">
      <Safeguarding
        intro="Every volunteer, trainer and partner working with this programme must follow strict safeguarding rules."
        rules={safeguardingRules}
      />
    </Section>

    <Section kicker="Fees & Access" title="Free for selected schools — partner-funded">
      <Prose>
        <p>
          Selected regional intervention schools access training, assistive materials and
          volunteer trainers free of charge — costs are covered by EduAid Africa and partners.
        </p>
        <p>
          Specialist volunteers may apply through the Teacher Corps at the Special Needs
          Volunteer Trainer category (free or USD 10). Fees announced soon for any optional
          add-on training cohorts in 2027.
        </p>
      </Prose>
    </Section>

    <Section kicker="Partnerships" title="Support inclusive education in your region">
      <PartnershipBlock
        intro="EduAid Africa invites schools, ministries, disability rights organisations, assistive technology providers and funding partners to support the Special Needs Schools Intervention Programme."
        categories={partnerCategories}
        support={partnerSupport}
        ctaLabel="Partner With the Programme"
      />
    </Section>

    <Section kicker="What We Track" title="Impact indicators">
      <BulletGrid items={impact} />
    </Section>

    <FinalCTA
      title="Inclusive Education for Every African Child."
      body="Help EduAid Africa support one special needs school in each African region in 2027."
      buttons={[
        { label: "Partner With Us", to: "/partner-with-us" },
        { label: "Volunteer as a Special Needs Trainer", to: "/programs/eduaid-africa-teacher-corps", variant: "secondary" },
        { label: "Join the 2027 Waiting List", to: "/programs/2027-regional-waiting-list-grants", variant: "outline" },
      ]}
    />
  </PageShell>
);

export default SpecialNeedsSchoolsIntervention;
