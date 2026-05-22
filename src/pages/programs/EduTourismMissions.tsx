import { Globe2, GraduationCap, Users, BookOpen, Heart, ShieldCheck, Briefcase, Laptop } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import {
  Section,
  HeroCTAs,
  Prose,
  BulletGrid,
  CardGrid,
  Steps,
  Safeguarding,
  FeesTable,
  PartnershipBlock,
  FinalCTA,
} from "@/components/programs/template/ProgramSections";

const objectives = [
  "Combine education service, school exchange and cultural learning across African regions.",
  "Mobilise diaspora, friends of Africa and African professionals into structured education missions.",
  "Strengthen schools and communities visited through verified volunteer service.",
  "Showcase African destinations, hospitality and cultural heritage responsibly.",
  "Channel mission proceeds into teacher grants and regional EduAid Africa programmes.",
];

const tracks = [
  { icon: GraduationCap, title: "School Exchange & Volunteer Teaching", body: "Short-term volunteer teaching, reading clubs, STEM clubs, mentorship and teacher peer-exchange in partner schools." },
  { icon: Users, title: "Cultural Learning & Community Engagement", body: "Guided cultural learning, community visits, language immersion and youth dialogue with local learners and leaders." },
  { icon: Heart, title: "Girls' Education & Inclusion Missions", body: "Mentorship circles, safeguarding awareness, dignity kits and inclusive learning support during the mission." },
  { icon: Briefcase, title: "Career & Life-Skills Missions", body: "My Career My Life sessions, career talks, TVET awareness and entrepreneurship dialogue with senior secondary students." },
  { icon: Globe2, title: "Regional Tourism & Hospitality", body: "Curated, ethical tourism experiences in partnership with local hospitality providers and conservation partners." },
  { icon: Laptop, title: "Digital Storytelling & Media Impact", body: "Volunteers contribute stories, photos and short videos to NESA TV and EduAid Africa media channels under approved guidelines." },
];

const regions = [
  "West Africa",
  "Central Africa",
  "East Africa",
  "Southern Africa",
  "Sahel",
  "Horn of Africa",
  "Indian Ocean Islands (Seychelles 2027 flagship mission)",
  "African Diaspora — outbound missions to Africa",
];

const whoCanJoin = [
  "African diaspora professionals",
  "Friends of Africa worldwide",
  "African teachers and student teachers",
  "University students and graduates",
  "Career mentors and life-skills facilitators",
  "Faith and community education volunteers",
  "CSR and corporate volunteer teams",
  "School-led student missions (with chaperone)",
];

const journey: Array<[string, string]> = [
  ["Apply", "Submit the EduAid Africa Teacher Corps form selecting Edu-Tourism Mission Volunteer."],
  ["Choose Region", "Indicate preferred region — West, Central, East, Southern, Sahel, Horn, Islands or Diaspora outbound."],
  ["Training", "Complete the Online Teaching Training Programme and safeguarding orientation."],
  ["Verification", "Identity, reference and (where required) background checks."],
  ["Mission Briefing", "Receive country, school, hospitality and cultural briefing pack."],
  ["Serve", "Deliver the mission with partner schools, communities and hospitality providers."],
  ["Report Impact", "Submit a mission impact report — stories, photos and metrics."],
];

const fees: Array<[string, string]> = [
  ["Edu-Tourism Mission Volunteer (form fee)", "USD 60"],
  ["Mission Package — Local (regional volunteer)", "Fees announced soon"],
  ["Mission Package — Diaspora / International", "Fees announced soon"],
  ["Mission Package — CSR / Corporate Team", "Fees announced soon"],
  ["Seychelles 2027 Indian Ocean Islands Flagship", "Fees announced soon"],
];

const safeguardingRules = [
  "All missions follow safeguarding and child-protection rules",
  "No unsupervised one-on-one contact with minors",
  "Approved school and hospitality partners only",
  "Photo and video consent required",
  "Respect for cultural, religious and community norms",
  "Ethical, low-impact tourism behaviour",
];

const partnerCategories = [
  "Schools and universities",
  "Ministries of education, tourism and culture",
  "Hospitality providers and tour operators",
  "Diaspora associations and friends of Africa networks",
  "CSR partners",
  "Conservation and community partners",
  "Faith-based partners",
];

const partnerSupport = [
  "School placements",
  "Hospitality and logistics",
  "Mission scholarships and teacher grants",
  "Cultural and language guides",
  "Safeguarding and medical support",
  "Mission storytelling and media production",
];

const impact = [
  "Number of missions delivered",
  "Number of volunteers deployed",
  "Number of schools and communities reached",
  "Number of learners engaged",
  "Number of countries covered",
  "Number of teacher grants funded from mission proceeds",
  "Number of partner organisations engaged",
];

const EduTourismMissions = () => (
  <PageShell
    title="EduAid Africa Edu-Tourism Missions"
    description="Regional education missions combining volunteer teaching, school exchange, cultural learning, hospitality and storytelling — with proceeds funding teacher grants."
    eyebrow="EduAid Africa · Education Missions"
    heading="Edu-Tourism Missions"
    intro="Regional education missions across Africa combining volunteer teaching, school exchange, cultural learning, ethical tourism and storytelling. Mission proceeds support teacher grants and EduAid Africa regional programmes."
  >
    <HeroCTAs
      primary={{ label: "Join the 2027 Waiting List", to: "/programs/2027-regional-waiting-list-grants" }}
      secondary={{ label: "Apply as Mission Volunteer", to: "/programs/eduaid-africa-teacher-corps" }}
      tertiary={{ label: "Partner With Us", to: "/partner-with-us" }}
      tagline="Serve. Travel. Learn. Transform."
    />

    <Section kicker="About the Programme" title="Education missions across Africa">
      <Prose>
        <p>
          EduAid Africa Edu-Tourism Missions are structured regional missions that combine
          short-term volunteer teaching, school exchange, cultural learning, ethical tourism and
          storytelling. Each mission strengthens a host school or community while building
          lifelong African and diaspora connections.
        </p>
        <p>
          The 2027 flagship is the <strong>Indian Ocean Islands / Seychelles 2027</strong> mission,
          launching the Islands regional pillar of EduAid Africa.
        </p>
      </Prose>
    </Section>

    <Section kicker="Purpose & Vision" title="Why education missions matter">
      <Prose>
        <p>
          Africa&apos;s schools and communities benefit when global goodwill is channelled into
          safe, verified, locally-led education service. Edu-Tourism Missions turn travel into
          tangible learning impact — and a sustainable funding stream for teacher grants across
          the continent.
        </p>
      </Prose>
    </Section>

    <Section kicker="Core Objectives" title="What missions deliver">
      <BulletGrid items={objectives} cols={2} />
    </Section>

    <Section kicker="What We Do" title="Mission Service Tracks">
      <CardGrid items={tracks} />
    </Section>

    <Section kicker="Regions" title="2027 mission regions">
      <BulletGrid items={regions} cols={2} />
    </Section>

    <Section kicker="Who Can Join" title="Mission volunteers and teams">
      <BulletGrid items={whoCanJoin} />
    </Section>

    <Section kicker="How It Works" title="From application to mission impact">
      <Steps steps={journey} />
    </Section>

    <Section kicker="Fees & Mission Packages" title="Mission packages">
      <FeesTable
        rows={fees}
        headers={["Mission Category", "Fee"]}
        note="Payment of any form fee or package fee does not guarantee mission placement. All mission volunteers must complete training, safeguarding orientation and verification before deployment."
      />
    </Section>

    <Section kicker="Safeguarding & Ethics" title="Safe missions, ethical travel">
      <Safeguarding rules={safeguardingRules} />
    </Section>

    <Section kicker="Partnerships" title="Support African education missions">
      <PartnershipBlock
        intro="EduAid Africa welcomes schools, ministries, hospitality providers, diaspora networks and CSR partners to support Edu-Tourism Missions."
        categories={partnerCategories}
        support={partnerSupport}
        ctaLabel="Partner With Edu-Tourism Missions"
      />
    </Section>

    <Section kicker="What We Track" title="Mission impact indicators">
      <BulletGrid items={impact} />
    </Section>

    <FinalCTA
      title="Africa Awaits. Bring Your Skills, Your Voice, Your Heart."
      body="Join an EduAid Africa Edu-Tourism Mission and help transform learning across Africa."
      buttons={[
        { label: "Join the 2027 Waiting List", to: "/programs/2027-regional-waiting-list-grants" },
        { label: "Apply as Mission Volunteer", to: "/programs/eduaid-africa-teacher-corps", variant: "secondary" },
        { label: "Partner With Us", to: "/partner-with-us", variant: "outline" },
      ]}
    />
  </PageShell>
);

export default EduTourismMissions;
