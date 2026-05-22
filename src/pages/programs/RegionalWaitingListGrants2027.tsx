import { Globe2, GraduationCap, HandHeart, Users, Briefcase, BookOpen, ShieldCheck, Heart } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import {
  Section,
  HeroCTAs,
  Prose,
  BulletGrid,
  CardGrid,
  Steps,
  PartnershipBlock,
  FinalCTA,
} from "@/components/programs/template/ProgramSections";

const objectives = [
  "Open a continental 2027 waiting list across all eight EduAid Africa regions.",
  "Channel teacher grants, school grants and volunteer opportunities into priority countries.",
  "Strengthen regional access to Teacher Corps, Special Needs, Edu-Tourism and My Career My Life services.",
  "Build a verified pipeline of African and diaspora volunteers ready for 2027 deployment.",
  "Track 2027 access transparently — applications, approvals and grants awarded.",
];

const regions: Array<{ icon: typeof Globe2; title: string; body: string }> = [
  { icon: Globe2, title: "West Africa", body: "Nigeria, Ghana, Senegal, Côte d'Ivoire, Sierra Leone, Liberia, The Gambia, Guinea, Cabo Verde, Benin, Togo and partner countries." },
  { icon: Globe2, title: "Central Africa", body: "Cameroon, DRC, Republic of Congo, Gabon, Equatorial Guinea, CAR, Chad, São Tomé & Príncipe." },
  { icon: Globe2, title: "East Africa", body: "Kenya, Uganda, Tanzania, Rwanda, Burundi, South Sudan." },
  { icon: Globe2, title: "Southern Africa", body: "South Africa, Zimbabwe, Zambia, Botswana, Namibia, Lesotho, Eswatini, Mozambique, Malawi, Angola." },
  { icon: Globe2, title: "Sahel", body: "Mali, Burkina Faso, Niger, Mauritania and Sahel-belt partner countries." },
  { icon: Globe2, title: "Horn of Africa", body: "Ethiopia, Eritrea, Djibouti, Somalia." },
  { icon: Globe2, title: "Indian Ocean Islands", body: "Seychelles (2027 flagship), Mauritius, Madagascar, Comoros." },
  { icon: Globe2, title: "African Diaspora", body: "Diaspora professionals and friends of Africa worldwide supporting Africa-based missions." },
];

const grantCategories = [
  { icon: GraduationCap, title: "Teacher Grants", body: "Support for serving teachers, retired teachers and student teachers serving through EduAid Africa Teacher Corps." },
  { icon: HandHeart, title: "Special Needs School Grants", body: "Targeted grants for the regional Special Needs Schools Intervention Programme." },
  { icon: BookOpen, title: "School Support Grants", body: "Reading clubs, STEM clubs, learning kits and remedial learning support for partner schools." },
  { icon: Briefcase, title: "My Career My Life School Grants", body: "Career talks, mentorship, life skills and TVET pathways for JSS, SS2 and SS3 students." },
  { icon: Users, title: "Volunteer Mission Grants", body: "Subsidised access for African-based volunteers, diaspora professionals and friends of Africa." },
  { icon: Heart, title: "Girls & Inclusion Grants", body: "Girls' education mentorship, safeguarding and inclusion-focused interventions." },
];

const whoCanApply = [
  "Schools and education institutions",
  "Teachers and student teachers",
  "Special needs schools and inclusive learning centres",
  "Volunteers — African-based, diaspora and friends of Africa",
  "Local chapters and community partners",
  "NGOs and faith-based education partners",
  "Ministries and district education offices",
];

const journey: Array<[string, string]> = [
  ["Join the Waiting List", "Submit the 2027 regional waiting list form and indicate your region, country and category."],
  ["Confirmation", "Receive confirmation and your waiting list reference."],
  ["Screening", "EduAid Africa screens applications against regional priorities and grant availability."],
  ["Invitation", "Eligible applicants are invited to apply for a specific 2027 grant or mission."],
  ["Approval", "Approved applicants receive a 2027 grant, posting or mission confirmation."],
  ["Reporting", "Beneficiaries submit short impact and accountability reports."],
];

const partnerCategories = [
  "Funding partners",
  "CSR partners",
  "Foundations and development partners",
  "Ministries of education",
  "Diaspora organisations",
  "Schools, universities and teacher institutions",
  "Faith-based and community partners",
];

const partnerSupport = [
  "Regional grant pools",
  "Country-specific teacher grants",
  "Special needs school endowments",
  "Volunteer mission scholarships",
  "Girls' education and inclusion grants",
  "Monitoring, reporting and evaluation support",
];

const impact = [
  "Number of waiting list applications received",
  "Number of regions and countries represented",
  "Number of applicants screened",
  "Number of grants awarded",
  "Number of teachers supported",
  "Number of schools supported",
  "Number of volunteers deployed",
  "Number of partner organisations engaged",
];

const RegionalWaitingListGrants2027 = () => (
  <PageShell
    title="2027 Regional Waiting List & Grants Programme"
    description="A continental 2027 waiting list channelling teacher grants, school grants and volunteer opportunities across all eight EduAid Africa regions."
    eyebrow="EduAid Africa · 2027 Continental Pipeline"
    heading="2027 Regional Waiting List & Grants Programme"
    intro="A continental 2027 access pipeline channelling teacher grants, school grants and volunteer opportunities into all eight EduAid Africa regions — West, Central, East, Southern, Sahel, Horn, Islands and Diaspora."
  >
    <HeroCTAs
      primary={{ label: "Join the 2027 Waiting List", to: "/apply" }}
      secondary={{ label: "Become a Funding Partner", to: "/partner-with-us" }}
      tertiary={{ label: "Apply as a Volunteer", to: "/programs/eduaid-africa-teacher-corps" }}
      tagline="One Continent. Eight Regions. 2027 Access."
    />

    <Section kicker="About the Programme" title="Your gateway to EduAid Africa 2027">
      <Prose>
        <p>
          The 2027 Regional Waiting List & Grants Programme is the continental access pipeline
          for EduAid Africa&apos;s 2027 cycle. It opens early access to teacher grants, school
          grants, special needs school support, My Career My Life programmes and Edu-Tourism
          Missions across all eight regions of Africa.
        </p>
        <p>
          The waiting list is the official entry point for schools, teachers, volunteers and
          partners who want to be considered for 2027 opportunities as they are released.
        </p>
      </Prose>
    </Section>

    <Section kicker="Purpose" title="Why a 2027 waiting list">
      <Prose>
        <p>
          Demand for EduAid Africa programmes is growing faster than 2026 capacity. The 2027
          waiting list ensures equitable, regionally-balanced access — and gives partners the
          visibility they need to fund priority countries and programmes.
        </p>
      </Prose>
    </Section>

    <Section kicker="Core Objectives" title="What 2027 will deliver">
      <BulletGrid items={objectives} cols={2} />
    </Section>

    <Section kicker="Regions" title="Eight EduAid Africa regions for 2027">
      <CardGrid items={regions} />
    </Section>

    <Section kicker="Grant Categories" title="What you can be considered for">
      <CardGrid items={grantCategories} />
    </Section>

    <Section kicker="Who Can Apply" title="Schools, teachers, volunteers and partners">
      <BulletGrid items={whoCanApply} />
    </Section>

    <Section kicker="How It Works" title="From waiting list to 2027 deployment">
      <Steps steps={journey} />
    </Section>

    <Section kicker="Fees & Access" title="Free to join the waiting list">
      <Prose>
        <p>
          Joining the 2027 waiting list is free. Specific programme or volunteer form fees only
          apply once you are invited to apply for a specific 2027 opportunity (for example, the
          Teacher Corps form fee or an Edu-Tourism mission package).
        </p>
        <p>
          Joining the waiting list does not guarantee approval, posting or a grant. All 2027
          beneficiaries must complete training, safeguarding orientation and verification where
          applicable.
        </p>
      </Prose>
    </Section>

    <Section kicker="Safeguarding & Integrity" title="Transparent, accountable, safe">
      <Prose>
        <p>
          All 2027 opportunities follow EduAid Africa safeguarding, child protection and
          financial integrity standards. Reporting in progress for live 2027 application numbers.
        </p>
      </Prose>
    </Section>

    <Section kicker="Partnerships" title="Fund a region. Fund 2027.">
      <PartnershipBlock
        intro="EduAid Africa invites funding, CSR, institutional and development partners to underwrite specific regions, countries or grant categories for 2027."
        categories={partnerCategories}
        support={partnerSupport}
        ctaLabel="Fund a 2027 Region"
      />
    </Section>

    <Section kicker="What We Track" title="2027 access indicators">
      <BulletGrid items={impact} />
    </Section>

    <FinalCTA
      title="Be First in Line for EduAid Africa 2027."
      body="Join the continental 2027 waiting list and help shape Education for All in Africa, region by region."
      buttons={[
        { label: "Join the 2027 Waiting List", to: "/apply" },
        { label: "Become a Funding Partner", to: "/partner-with-us", variant: "secondary" },
        { label: "Apply as a Volunteer", to: "/programs/eduaid-africa-teacher-corps", variant: "outline" },
      ]}
    />
  </PageShell>
);

export default RegionalWaitingListGrants2027;
