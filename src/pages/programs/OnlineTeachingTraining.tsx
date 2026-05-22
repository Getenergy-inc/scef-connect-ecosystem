import { Laptop, BookOpen, ClipboardCheck, Award, ShieldCheck, Users, GraduationCap, Globe2 } from "lucide-react";
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
  "Equip non-teachers and volunteers with classroom-ready teaching foundations.",
  "Strengthen serving teachers with modern, inclusive and digital methods.",
  "Standardise safeguarding, ethics and learner-protection practice across EduAid Africa volunteers.",
  "Prepare volunteers for both physical and online education service across Africa.",
  "Build a verified pipeline of trained educators for the EduAid Africa Teacher Corps.",
];

const whoNeeds = [
  "Non-teachers applying to the EduAid Africa Teacher Corps",
  "University students and graduates volunteering in schools",
  "Career mentors and life-skills facilitators",
  "Diaspora professionals and friends of Africa",
  "CSR and corporate volunteers entering schools",
  "Serving teachers seeking refresher and digital upskilling",
  "Special needs caregivers and handlers",
  "Online tutors, club leads and webinar facilitators",
];

const modules = [
  { icon: BookOpen, title: "Foundations of Teaching", body: "Lesson planning, classroom management, learner engagement, low-cost teaching aids and assessment basics." },
  { icon: Users, title: "Inclusive & Gender-Responsive Teaching", body: "Inclusive classrooms, girls' education, learners with special needs, multilingual settings and rural realities." },
  { icon: Laptop, title: "Digital & Online Teaching", body: "Virtual classrooms, recorded lessons, online reading and STEM clubs, simple edtech tools and digital resource creation." },
  { icon: ShieldCheck, title: "Safeguarding & Ethics", body: "Child protection, safe communication, online safety, consent, conduct and approved reporting channels." },
  { icon: GraduationCap, title: "Mentorship & Career Guidance", body: "My Career My Life methods, subject-choice guidance, TVET pathways, school-to-work transitions and youth voice." },
  { icon: Globe2, title: "Crisis & Displacement Awareness", body: "Working through approved partners in IDP, refugee, emergency or conflict-affected learning spaces — referrals and limits of volunteer scope." },
];

const journey: Array<[string, string]> = [
  ["Apply", "Submit the EduAid Africa Teacher Corps volunteer form and pay the relevant form fee."],
  ["Enrol", "Receive your free Online Teaching Training enrolment link by email."],
  ["Study", "Complete six self-paced modules with short videos, readings and reflection prompts."],
  ["Assessment", "Pass a short multiple-choice assessment and submit a written reflection."],
  ["Safeguarding Orientation", "Complete the safeguarding orientation and code-of-conduct declaration."],
  ["Verification", "Identity, reference and (where required) background checks."],
  ["Completion Status", "Receive completion status — Approved, Conditional, Online-Only, Specialist or Not Yet Approved."],
  ["Posting", "Get matched to an approved physical or online service opportunity through Teacher Corps."],
];

const partnerCategories = [
  "Technical training partners",
  "Edtech and digital learning platforms",
  "Funding partners",
  "Universities and colleges of education",
  "Teacher unions and professional bodies",
  "CSR partners",
  "Diaspora education networks",
];

const partnerSupport = [
  "Module content and contextual case studies",
  "Trainer facilitators and assessors",
  "Edtech tools and free learner licences",
  "Scholarships for fee-waived training cohorts",
  "School placement opportunities",
  "Internship and exchange pathways",
];

const impact = [
  "Number of volunteers enrolled",
  "Number of volunteers completing modules",
  "Number of volunteers passing assessment",
  "Number of safeguarding declarations signed",
  "Number of volunteers verified",
  "Number of volunteers posted (online or physical)",
  "Number of partner institutions",
  "Number of countries represented",
];

const safeguardingRules = [
  "Complete safeguarding orientation before any posting",
  "Use only approved communication channels with learners",
  "No unsupervised one-on-one contact with minors",
  "Respect learner privacy, consent and dignity",
  "Report concerns through approved Teacher Corps channels",
  "Serve only in approved assignments and platforms",
];

const OnlineTeachingTraining = () => (
  <PageShell
    title="EduAid Africa Online Teaching Training Programme"
    description="Free online teaching training for EduAid Africa Teacher Corps volunteers — foundations of teaching, inclusion, digital learning and safeguarding."
    eyebrow="EduAid Africa · Capacity Building"
    heading="Online Teaching Training Programme"
    intro="A structured, free online training programme preparing EduAid Africa Teacher Corps volunteers — including non-teachers and serving teachers — for safe, inclusive and effective physical and online education service across Africa."
  >
    <HeroCTAs
      primary={{ label: "Apply to Volunteer", to: "/programs/eduaid-africa-teacher-corps" }}
      secondary={{ label: "Join the Waiting List", to: "/programs/2027-regional-waiting-list-grants" }}
      tertiary={{ label: "Partner With Us", to: "/partner-with-us" }}
      tagline="Train. Verify. Serve. Transform Africa."
    />

    <Section kicker="About the Programme" title="Free training, free posting — after volunteer form submission">
      <Prose>
        <p>
          The EduAid Africa Online Teaching Training Programme is a free, self-paced online
          training delivered to applicants of the EduAid Africa Teacher Corps. Training is
          unlocked after submission of the volunteer form and payment of the relevant form fee.
        </p>
        <p>
          The programme equips volunteers with the foundations of teaching, inclusive practice,
          digital learning, mentorship and safeguarding required to serve safely and effectively
          across African schools, communities and online learning spaces.
        </p>
        <p>
          Only volunteers who complete the training, pass assessment, complete safeguarding
          orientation and verification are approved for posting.
        </p>
      </Prose>
    </Section>

    <Section kicker="Purpose" title="Why this programme exists">
      <Prose>
        <p>
          Education for All in Africa depends on a continental pipeline of safe, trained, verified
          educators. This programme exists to make quality teaching support accessible to anyone
          willing to serve — regardless of their starting background — while protecting the
          dignity, safety and learning rights of every African child.
        </p>
      </Prose>
    </Section>

    <Section kicker="Core Objectives" title="What the programme delivers">
      <BulletGrid items={objectives} cols={2} />
    </Section>

    <Section kicker="Who Needs This Training" title="Who should enrol">
      <BulletGrid items={whoNeeds} />
    </Section>

    <Section kicker="What You Will Learn" title="Training modules">
      <CardGrid items={modules} />
    </Section>

    <Section kicker="How It Works" title="From enrolment to posting">
      <Steps steps={journey} />
    </Section>

    <Section kicker="Assessment & Certification" title="Completion status, not a paid certificate">
      <Prose>
        <p>
          Volunteers complete a short multiple-choice assessment and a written reflection at the
          end of the programme. Successful completion results in an EduAid Africa Teacher Corps
          completion status — used internally for posting decisions.
        </p>
        <p>
          Volunteers seeking a formal, externally recognised teaching credential are referred to
          partner institutions and the wider Education Online Africa certification pathway.
        </p>
      </Prose>
    </Section>

    <Section kicker="Safeguarding Commitment" title="Learner safety first">
      <Safeguarding
        intro="Safeguarding is non-negotiable. All trainees must complete safeguarding orientation and follow strict rules in every service setting."
        rules={safeguardingRules}
      />
    </Section>

    <Section kicker="Fees" title="Training is free for verified Teacher Corps applicants">
      <Prose>
        <p>
          There is no separate training fee. The EduAid Africa Teacher Corps volunteer form fee
          (USD 10–60 depending on category) unlocks free access to this training. Fee details are
          listed on the Teacher Corps page.
        </p>
        <p>
          Payment of any form fee does not guarantee posting. All volunteers must complete
          training, assessment, safeguarding orientation and verification before being posted for
          service.
        </p>
      </Prose>
    </Section>

    <Section kicker="Partnerships" title="Support the training programme">
      <PartnershipBlock
        intro="EduAid Africa welcomes technical, edtech, institutional, funding and CSR partners to strengthen the Online Teaching Training Programme."
        categories={partnerCategories}
        support={partnerSupport}
        ctaLabel="Partner With the Training Programme"
      />
    </Section>

    <Section kicker="What We Track" title="Impact indicators">
      <BulletGrid items={impact} />
    </Section>

    <FinalCTA
      title="Get Trained. Get Verified. Serve Africa."
      body="Complete the EduAid Africa Teacher Corps volunteer form to unlock free access to the Online Teaching Training Programme."
      buttons={[
        { label: "Apply as a Volunteer", to: "/programs/eduaid-africa-teacher-corps" },
        { label: "Partner With Us", to: "/partner-with-us", variant: "outline" },
      ]}
    />
  </PageShell>
);

export default OnlineTeachingTraining;
