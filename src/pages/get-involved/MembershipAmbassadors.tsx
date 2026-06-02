import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  HandHeart,
  Award,
  Shield,
  MessageCircle,
  CheckCircle2,
  Globe2,
  GraduationCap,
  Building2,
  Sparkles,
  ClipboardList,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SOPHIA_GENERAL =
  "https://wa.me/2348109765897?text=Hello%20Sophia%2C%20I%20want%20to%20join%20SCEF%20as%20a%20member%2C%20volunteer%20or%20ambassador.";
const SOPHIA_VA1 =
  "https://wa.me/2348109765897?text=Hello%20Sophia%2C%20I%20want%20to%20volunteer%20and%20receive%20Ambassador%201%20status.";

const heroCtas = [
  { label: "Join as a Free Member", to: "/auth/sign-up?path=member", primary: true },
  { label: "Apply as a Volunteer", to: "/get-involved/volunteer" },
  { label: "Become a Volunteer Ambassador 1", to: "/get-involved/volunteer?tier=ambassador-1" },
  { label: "Become an Ambassador", to: "/get-involved/ambassador/apply" },
  { label: "Join a Local Chapter", to: "/local-chapters" },
];

const threeWays = [
  {
    icon: Users,
    title: "Join as a Member",
    body:
      "Membership gives users access to the SCEF ecosystem, local chapters, learning opportunities, advocacy activities, updates, and participation pathways.",
    cta: { label: "Join as a Member", to: "/auth/sign-up?path=member" },
  },
  {
    icon: HandHeart,
    title: "Join as a Volunteer",
    body:
      "Volunteering is for individuals who actively support SCEF projects, media, operations, technology, local chapters, fundraising, research, training, outreach, or community impact. All approved SCEF volunteers are offered Ambassador 1 status during active service.",
    cta: { label: "Apply as a Volunteer", to: "/get-involved/volunteer" },
  },
  {
    icon: Award,
    title: "Join as an Education Ambassador",
    body:
      "Ambassadorship is for members and volunteers who want to formally represent SCEF, support campaigns, mobilize communities, promote programs, connect partners, and lead education advocacy within an approved country, region, project, or diaspora network.",
    cta: { label: "Become an Ambassador", to: "/get-involved/ambassador/apply" },
  },
];

const membershipTiers = [
  {
    name: "General Membership",
    price: "Free",
    voting: "No voting rights",
    eligibility:
      "Open to adults, supporters, educators, students, professionals, volunteers, donors, and members of the public.",
    bestFor: "People who want to receive updates, participate in basic online activities, and support SCEF's mission.",
    benefits: [
      "Free online membership",
      "Assignment to country and regional online chapter",
      "Access to SCEF updates",
      "Participation in selected public programs",
      "Access to volunteer and ambassador upgrade pathways",
      "Access to Sophia support",
      "Opportunity to support EduAid-Africa, NESA-Africa, RMSA, and other programs",
    ],
  },
  {
    name: "Youth Membership",
    price: "Free",
    voting: "No voting rights",
    eligibility: "Young people aged 13–17, with parent or guardian consent where required.",
    bestFor: "Young people interested in education, leadership, mentorship, digital learning, career guidance, and youth advocacy.",
    benefits: [
      "Youth learning and mentorship access",
      "Career guidance opportunities",
      "Participation in youth-friendly SCEF programs",
      "Access to selected digital learning resources",
      "Assignment to appropriate youth-safe online membership category",
      "Safeguarding and consent protection",
    ],
    note:
      "Youth members are not permitted to engage in adult-only financial activities, sensitive representation duties, unsupervised field activities, or high-risk roles.",
  },
  {
    name: "Standard Membership",
    price: "$50 / year",
    voting: "Yes, where applicable under SCEF governance rules",
    eligibility: "Adults and professionals who want deeper participation in SCEF activities.",
    bestFor: "Engaged supporters ready to take on advisory roles and leadership.",
    benefits: [
      "Standard member recognition",
      "Voting and advisory participation where applicable",
      "Priority access to selected trainings and events",
      "Discounted access to trainings, edu-tours, webinars, and merchandise",
      "Opportunity to support local chapter activities",
      "Eligibility for selected leadership and committee opportunities",
      "Access to member-only updates and learning resources",
    ],
  },
  {
    name: "Organizational Membership",
    price: "$200 / year",
    voting: "Institutional advisory participation where applicable",
    eligibility: "Schools, NGOs, companies, associations, institutions, media organizations, and education-focused organizations.",
    bestFor: "Institutions seeking partnership, CSR, and collaboration pathways.",
    benefits: [
      "Organizational listing where approved",
      "Partnership and collaboration opportunities",
      "Priority access to SCEF partnership programs",
      "Eligibility for school support, CSR, training, and institutional engagement",
      "Participation in selected NESA-Africa and EduAid-Africa activities",
      "Access to donor, CSR, or partner engagement channels",
    ],
  },
  {
    name: "Lifetime Membership",
    price: "$1,000 one-time",
    voting: "Advisory eligibility where approved",
    eligibility:
      "Long-term supporters, philanthropists, institutional leaders, education advocates, diaspora leaders, and major SCEF supporters.",
    bestFor: "Champions investing in SCEF's long-term legacy and 2035 vision.",
    benefits: [
      "Lifetime member recognition",
      "Priority invitation to selected SCEF events",
      "Advisory eligibility where approved",
      "Recognition on SCEF platforms where applicable",
      "Long-term access to member benefits",
      "Stronger participation in SCEF legacy and 2035 vision activities",
    ],
  },
];

const ambassadorTiers = [
  {
    tier: "Ambassador 1",
    subtitle: "Volunteer / Project-Based Ambassador",
    fee: "$100/yr — waived during active approved volunteer service",
    admin: "$10 one-time (may be waived)",
    hours: "5 hours/month",
    focus: "One approved SCEF program, project, division, or local chapter assignment.",
    bestFor: "Approved SCEF volunteers, project-based advocates, and individuals supporting one major SCEF initiative.",
    roles: [
      "Support one selected SCEF project",
      "Promote awareness campaigns",
      "Mobilize nominations, donations, or participation where approved",
      "Share project updates",
      "Support online engagement",
      "Submit monthly activity reports",
    ],
  },
  {
    tier: "Ambassador 2",
    subtitle: "Local Chapter / Multi-Project Ambassador",
    fee: "$200/yr",
    admin: "$20 one-time",
    hours: "10 hours/month",
    focus: "Multiple SCEF programs through a local chapter.",
    bestFor: "Individuals working through a country, regional, diaspora, or online local chapter.",
    roles: [
      "Support multiple SCEF programs",
      "Work with a country or regional online chapter",
      "Mobilize members, volunteers, schools, and community partners",
      "Support EduAid-Africa and NESA-Africa activities",
      "Assist with local chapter reporting",
      "Support regional advocacy and school support campaigns",
    ],
  },
  {
    tier: "Ambassador 3",
    subtitle: "Strategic / Continental / Diaspora Ambassador",
    fee: "$300/yr",
    admin: "$50 one-time",
    hours: "15 hours/month",
    focus: "National, continental, diaspora, or strategic representation.",
    bestFor:
      "Senior advocates, diaspora leaders, education professionals, fundraisers, media personalities, institutional partners, and strategic connectors.",
    roles: [
      "Represent SCEF at national, regional, continental, or diaspora levels where approved",
      "Lead strategic advocacy and partnership efforts",
      "Support fundraising, donor relations, and sponsorship introductions",
      "Coordinate major campaigns or regional initiatives",
      "Support local chapter growth and institutional visibility",
      "Submit quarterly strategic activity reports",
    ],
  },
];

const pathwayStages = [
  { stage: "Stage 1", title: "Free Online Member", text: "Every signup starts as a Free Online Member under their country and region." },
  { stage: "Stage 2", title: "Approved Volunteer", text: "Apply and get accepted into a volunteer role under a SCEF division, project, or local chapter." },
  { stage: "Stage 3", title: "Volunteer Ambassador 1", text: "Once onboarded, you are offered Ambassador 1 status, assigned to country chapter, region, project, supervisor, and reporting system." },
  { stage: "Stage 4", title: "Ambassador 2 Upgrade", text: "Active for 3–6 months, reporting regularly, supporting multiple SCEF projects through a local chapter with demonstrated leadership and compliance." },
  { stage: "Stage 5", title: "Ambassador 3 Upgrade", text: "Demonstrates national, regional, diaspora, or strategic leadership capacity with strong performance and SCEF approval for expanded representation." },
];

const memberBenefits = [
  "Free online membership option",
  "Country and regional chapter assignment",
  "SCEF updates",
  "Access to selected public programs",
  "Opportunity to upgrade membership",
  "Access to Sophia support",
  "Opportunity to support SCEF programs",
];

const volunteerBenefits = [
  "Free Online Membership",
  "Ambassador 1 recognition during active service",
  "Volunteer onboarding and orientation",
  "Digital volunteer / ambassador badge where approved",
  "Project briefing materials and SCEF toolkit",
  "Country and regional online chapter assignment",
  "Opportunity to support NESA-Africa, EduAid-Africa, RMSA, eLibrary Nigeria, EOA, Santos Media",
  "Eligibility for certificate after verified service",
  "Eligibility for Ambassador 2 upgrade after performance review",
  "Sophia support and volunteer help desk",
];

const ambassadorBenefits = [
  "Official Ambassador Certificate",
  "Digital Ambassador Badge",
  "Profile listing on approved SCEF, NESA-Africa, or EduAid-Africa platforms",
  "Representation rights within approved chapter, country, region, or project scope",
  "Access to Ambassador Toolkit, training, and orientation",
  "Priority media features and ambassador spotlight opportunities",
  "Eligibility for approved fundraising commission or referral reward structures",
  "Eligibility for travel or event representation, subject to budget and approval",
  "Discounts on trainings, edu-tours, webinars, and merchandise",
  "Nomination privileges within approved NESA-Africa rules",
  "Eligibility for leadership consideration within local chapters",
  "Opportunity to contribute to SCEF 2035 impact goals",
];

const memberDuties = [
  "Support Education for All",
  "Follow SCEF communication and participation rules",
  "Respect SCEF policies",
  "Participate responsibly in chapter or program activities",
];

const volunteerDuties = [
  "Support their assigned project or division",
  "Attend onboarding where required",
  "Follow SCEF's Code of Conduct",
  "Follow safeguarding and child protection rules",
  "Submit activity reports",
  "Use approved communication materials only",
  "Respect confidentiality and data protection rules",
  "Avoid unauthorized fundraising or representation",
  "Report concerns through the proper channel",
];

const ambassadorDuties = [
  "Promote Education for All",
  "Uphold SCEF's mission, vision, ethics, and safeguarding standards",
  "Support approved SCEF programs and campaigns",
  "Mobilize members, volunteers, schools, partners, and communities",
  "Support NESA-Africa nomination and voting awareness where applicable",
  "Promote EduAid-Africa scholarships, school support, and impact stories",
  "Organize or co-host approved virtual or local engagement sessions",
  "Represent SCEF professionally at approved events, panels, webinars, and expos",
  "Submit regular activity reports",
  "Support local chapter development",
  "Help connect SCEF to donors, partners, sponsors, institutions, and media",
  "Follow all SCEF communication, branding, compliance, and reporting rules",
];

const rewardChannels = [
  "Fundraising commission on approved funds raised through unique ambassador links",
  "Sponsorship sourcing bonus",
  "Merchandise affiliate sales",
  "EduAid-Africa donation referral tracking",
  "Event ticket referral rewards where applicable",
  "Approved Afri-Gold Coin or GFA Wallet reward points where active",
  "Participation allowance for approved projects, subject to budget",
  "Ambassador upgrade or leadership nomination after verified service",
  "Certificate, badge, recommendation, or media recognition after verified service",
];

const regions = [
  "North Africa",
  "West Africa",
  "Central Africa",
  "East Africa",
  "Southern Africa",
  "Sahel Region",
  "Horn of Africa",
  "Indian Ocean",
  "Diaspora / Global Africa",
  "Friends of Africa",
];

const chapterTypes = ["Country Online Chapter", "Hybrid Chapter", "Physical Chapter", "Diaspora Chapter", "Friends of Africa Chapter"];

const applyMember = [
  "Complete the SCEF membership form",
  "Select your country and user type",
  "Receive Free Online Membership assignment",
  "Join your country or regional online chapter",
  "Participate in programs, trainings, campaigns, and local chapter activities",
  "Upgrade to Standard, Organizational, Lifetime, Volunteer, or Ambassador when ready",
];

const applyVolunteer = [
  "Complete the SCEF volunteer application form",
  "Select your preferred division, project, country, region, or chapter",
  "Submit CV, profile, experience, availability, and tools",
  "Attend screening or onboarding where required",
  "Accept the SCEF Code of Conduct, safeguarding, and reporting rules",
  "Receive your volunteer assignment",
  "Receive Ambassador 1 status during active approved volunteer service",
  "Submit reports and complete assigned tasks",
  "Become eligible for certificate, recognition, or Ambassador 2 upgrade",
];

const applyAmbassador = [
  "Complete the Ambassador Registration Form",
  "Select your Ambassador Tier",
  "Select your preferred country, region, and chapter",
  "Select your project focus or programs of interest",
  "Upload your CV or short profile where required",
  "Submit a 2-minute video explaining why you support SCEF",
  "Pay the approved administrative fee or request a waiver",
  "Complete onboarding, code of conduct, safeguarding, and reporting orientation",
  "Receive your Ambassador Welcome Toolkit",
  "Start representing SCEF within your approved scope",
];

const compliancePolicies = [
  "SCEF Code of Conduct",
  "Safeguarding Policy",
  "Child Protection Policy",
  "Women and Girls Protection Standards",
  "Anti-Harassment Policy",
  "Data Protection Policy",
  "Conflict of Interest Policy",
  "Anti-Fraud and Anti-Corruption Policy",
  "Whistleblower Protection Policy",
  "Local Chapter Compliance Rules",
  "SCEF communication and branding rules",
  "SCEF reporting standards",
];

const faqs = [
  {
    q: "What happens when I sign up?",
    a: "Every signup is automatically enrolled as a Free Online Member and assigned to your country and regional online chapter — regardless of which SCEF platform you signed up through (NESA-Africa, EduAid-Africa, RMSA, eLibrary Nigeria, EOA, Santos Media, NESA TV, It's In Me Radio, Local Chapter Services, or Sophia).",
  },
  {
    q: "Do all volunteers really get Ambassador 1 status?",
    a: "Yes. All approved SCEF volunteers are offered Ambassador 1 — Project-Based Ambassador status during active approved volunteer service. Annual dues are waived during that service period.",
  },
  {
    q: "Can I raise funds as an Ambassador 1?",
    a: "No. No member, volunteer, or ambassador may raise funds, collect cash, sign contracts, issue receipts, promise awards or scholarships, or represent SCEF financially without official approval. All fundraising must pass through approved SCEF channels.",
  },
  {
    q: "If I join from EduAid-Africa and later support NESA-Africa, will I have two profiles?",
    a: "No. SCEF maintains one central member profile. Additional programs are added as linked program interests to the same profile.",
  },
  {
    q: "Can administrative fees be waived?",
    a: "Yes. SCEF may approve waivers, discounts, sponsorships, or deferred payment for inclusivity — especially for youth, underserved communities, educators, high-impact volunteers, and strategic contributors.",
  },
];

const sectionPad = "py-14 md:py-20";

export default function MembershipAmbassadors() {
  return (
    <div className="bg-background text-foreground">
      <Helmet>
        <title>Join SCEF as a Member, Volunteer or Ambassador | Santos Creations Educational Foundation</title>
        <meta
          name="description"
          content="Join SCEF as a free member, volunteer ambassador, standard member, organizational member, lifetime member, or Education Ambassador. All approved volunteers receive Ambassador 1 status during active service and are assigned to their country and regional chapter."
        />
        <link rel="canonical" href="https://santoscreations.org/get-involved/membership-ambassadors" />
        <meta property="og:title" content="Join SCEF as a Member, Volunteer or Ambassador" />
        <meta property="og:description" content="One SCEF membership system. One central profile. One ambassador structure. Join free, volunteer, or represent Africa as an Education Ambassador." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1B3B] via-[#0E2A52] to-[#0B5D3B] text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_10%,#D4AF37_0,transparent_40%),radial-gradient(circle_at_80%_80%,#D4AF37_0,transparent_45%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Badge className="bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#D4AF37] mb-5 tracking-wide">
            ONE SCEF MEMBERSHIP SYSTEM
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl">
            Join SCEF as a Member, Volunteer or Ambassador
          </h1>
          <p className="mt-4 text-lg md:text-xl font-medium text-[#D4AF37]">
            Empower Education. Lead Change. Represent Africa.
          </p>
          <p className="mt-5 max-w-3xl text-sm md:text-base text-white/85 leading-relaxed">
            Santos Creations Educational Foundation invites students, educators, professionals, volunteers, donors,
            partners, diaspora supporters, institutions, and education advocates to join its Pan-African education
            movement. Contribute through membership, volunteering, and the Education Ambassador structure to advance
            NESA-Africa, EduAid-Africa, Rebuild My School Africa, eLibrary Nigeria, Education Online Africa, Women &
            Girls Education, Special Needs Education Support, Santos Media, and local chapter activities across Africa
            and the diaspora.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {heroCtas.map((c) => (
              <Button
                key={c.label}
                asChild
                size="lg"
                className={
                  c.primary
                    ? "bg-[#D4AF37] hover:bg-[#E5C24A] text-[#0A0A0A] font-semibold"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/30"
                }
              >
                <Link to={c.to}>
                  {c.label} <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
            ))}
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white/40 text-white hover:bg-white/10">
              <a href={SOPHIA_GENERAL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-1.5" /> Chat with Sophia
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 1 — Three Ways */}
      <section className={`${sectionPad} bg-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Section 1" title="Three Ways to Join SCEF" />
          <div className="grid gap-6 md:grid-cols-3 mt-10">
            {threeWays.map(({ icon: Icon, title, body, cta }) => (
              <Card key={title} className="border-neutral-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-[#0B5D3B]/10 text-[#0B5D3B] flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-700 leading-relaxed mb-5">{body}</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={cta.to}>{cta.label} <ArrowRight className="w-4 h-4 ml-1.5" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — Membership Structure */}
      <section className={`${sectionPad} bg-neutral-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Section 2" title="Membership Structure" subtitle="One central SCEF profile across all programs and chapters." />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
            {membershipTiers.map((t) => (
              <Card key={t.name} className="flex flex-col border-neutral-200">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-lg">{t.name}</CardTitle>
                    <Badge className="bg-[#0B5D3B] text-white shrink-0">{t.price}</Badge>
                  </div>
                  <CardDescription className="text-xs">{t.voting}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-xs uppercase tracking-wide text-neutral-500 mb-1">Eligibility</p>
                  <p className="text-sm text-neutral-700 mb-3">{t.eligibility}</p>
                  <p className="text-xs uppercase tracking-wide text-neutral-500 mb-1">Best For</p>
                  <p className="text-sm text-neutral-700 mb-4">{t.bestFor}</p>
                  <p className="text-xs uppercase tracking-wide text-neutral-500 mb-2">Benefits</p>
                  <ul className="space-y-1.5 mb-4">
                    {t.benefits.map((b) => (
                      <li key={b} className="flex gap-2 text-sm text-neutral-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0B5D3B] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  {t.note && (
                    <div className="mt-auto rounded-md bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900">
                      <strong>Note:</strong> {t.note}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — Free Online Auto-Enrollment */}
      <section className={`${sectionPad} bg-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Section 3" title="Free Online Membership Auto-Enrollment" />
          <div className="grid gap-6 lg:grid-cols-2 mt-10 items-start">
            <Card className="border-[#0B5D3B]/20 bg-[#0B5D3B]/5">
              <CardContent className="p-6">
                <p className="text-sm text-neutral-800 leading-relaxed">
                  Every person who signs up on SCEF or any SCEF project platform is automatically enrolled into the{" "}
                  <strong>Free Online Membership Tier</strong> under their country and region. Applies to signups from:
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {[
                    "SCEF",
                    "NESA-Africa",
                    "EduAid-Africa",
                    "Rebuild My School Africa",
                    "eLibrary Nigeria",
                    "Education Online Africa",
                    "Women & Girls Education",
                    "Special Needs Education Support",
                    "Santos Media",
                    "NESA Africa TV",
                    "It's In Me Radio",
                    "Local Chapter Services",
                    "Sophia Help Center",
                  ].map((p) => (
                    <Badge key={p} variant="outline" className="bg-white">
                      {p}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="border-neutral-200">
              <CardHeader>
                <CardTitle className="text-base">Example: Uganda signup via NESA-Africa</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-y-2 text-sm">
                  <dt className="text-neutral-500">Membership Tier</dt>
                  <dd className="font-medium">Free Online Membership</dd>
                  <dt className="text-neutral-500">Country Chapter</dt>
                  <dd className="font-medium">Uganda Online Chapter</dd>
                  <dt className="text-neutral-500">Region</dt>
                  <dd className="font-medium">East Africa</dd>
                  <dt className="text-neutral-500">Signup Source</dt>
                  <dd className="font-medium">NESA-Africa</dd>
                  <dt className="text-neutral-500">Linked Program</dt>
                  <dd className="font-medium">NESA-Africa</dd>
                </dl>
                <p className="mt-4 text-xs text-neutral-600 italic">
                  If the same person later joins EduAid-Africa, no second profile is created — the central SCEF profile
                  is updated and EduAid-Africa is added as a linked program.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Volunteer to Ambassador 1 */}
      <section className={`${sectionPad} bg-gradient-to-br from-[#0B1B3B] to-[#0B5D3B] text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Section 4"
            title="Volunteer With SCEF and Receive Ambassador 1 Status"
            theme="dark"
          />
          <p className="mt-6 max-w-4xl text-white/85 text-sm md:text-base leading-relaxed">
            All approved SCEF volunteers are offered <strong>Ambassador 1 — Project-Based Ambassador</strong> status
            during their active volunteer service. Volunteers are not isolated helpers — they are part of SCEF's
            Pan-African membership, local chapter, and education advocacy system.
          </p>

          <div className="grid gap-6 md:grid-cols-2 mt-8">
            <Card className="bg-white/10 border-white/20 text-white backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white">Volunteer Ambassador 1 — At a Glance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <Row k="Status Type" v="Volunteer Ambassador 1" />
                <Row k="Membership Link" v="Free Online Membership + Ambassador 1 Status" />
                <Row k="Annual Due" v="Waived during active approved volunteer service" />
                <Row k="Administrative Fee" v="May be waived, sponsored, deferred, or applied where required" />
                <Row k="Minimum Service" v="5 hours per month" />
                <Row k="Focus" v="One approved SCEF project, division, campaign, or local chapter" />
              </CardContent>
            </Card>

            <Card className="bg-amber-50/95 border-amber-200 text-neutral-900">
              <CardHeader>
                <CardTitle className="text-amber-900 flex items-center gap-2">
                  <Shield className="w-5 h-5" /> Important Clarification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">
                  Ambassador 1 status is a recognition and structured participation pathway — not unrestricted authority.
                  A Volunteer Ambassador 1 <strong>cannot</strong>:
                </p>
                <ul className="space-y-1.5 text-sm">
                  {[
                    "Raise funds independently",
                    "Collect cash on behalf of SCEF",
                    "Sign contracts or issue receipts",
                    "Promise awards, nominations, scholarships, grants, votes, or benefits",
                    "Represent SCEF at official events without approval",
                    "Use the SCEF name, logo, or identity outside approved guidelines",
                    "Operate wallets, payment links, or donation channels independently",
                    "Speak for SCEF outside their approved volunteer assignment",
                  ].map((x) => (
                    <li key={x} className="flex gap-2">
                      <span className="text-amber-700 shrink-0">•</span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-[#D4AF37] hover:bg-[#E5C24A] text-[#0A0A0A] font-semibold">
              <Link to="/get-involved/volunteer">Apply as a Volunteer Ambassador 1</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white/40 text-white hover:bg-white/10">
              <a href={SOPHIA_VA1} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-1.5" /> Ask Sophia about Ambassador 1
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 5 + 6 — Ambassador Tiers */}
      <section className={`${sectionPad} bg-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Sections 5 & 6" title="Ambassador Tiers" subtitle="One unified ambassador structure across all SCEF programs." />
          <div className="grid gap-6 lg:grid-cols-3 mt-10">
            {ambassadorTiers.map((t) => (
              <Card key={t.tier} className="border-neutral-200 flex flex-col">
                <CardHeader className="bg-gradient-to-br from-[#0B1B3B] to-[#0B5D3B] text-white rounded-t-lg">
                  <Badge className="bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#D4AF37] w-fit mb-2">{t.tier}</Badge>
                  <CardTitle className="text-white text-lg">{t.subtitle}</CardTitle>
                </CardHeader>
                <CardContent className="pt-5 flex-1 flex flex-col">
                  <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                    <Stat label="Annual Due" value={t.fee} />
                    <Stat label="Admin Fee" value={t.admin} />
                    <Stat label="Service" value={t.hours} />
                    <Stat label="Focus" value={t.focus} />
                  </div>
                  <p className="text-xs uppercase tracking-wide text-neutral-500 mb-1">Best For</p>
                  <p className="text-sm text-neutral-700 mb-3">{t.bestFor}</p>
                  <p className="text-xs uppercase tracking-wide text-neutral-500 mb-2">Core Role</p>
                  <ul className="space-y-1.5">
                    {t.roles.map((r) => (
                      <li key={r} className="flex gap-2 text-sm text-neutral-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0B5D3B] shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Admin fee table */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-2">Section 7: Administrative Onboarding Fee</h3>
            <p className="text-sm text-neutral-700 max-w-3xl mb-5">
              To support onboarding, verification, training materials, digital badges, and toolkit preparation, SCEF may
              charge a one-time administrative fee at registration. Waivers, sponsorships, and deferrals are available.
            </p>
            <div className="overflow-x-auto rounded-lg border border-neutral-200">
              <table className="w-full text-sm">
                <thead className="bg-neutral-50 text-left">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Ambassador Tier</th>
                    <th className="px-4 py-3 font-semibold">One-Time Admin Fee</th>
                    <th className="px-4 py-3 font-semibold">Annual Due</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  <tr><td className="px-4 py-3">Ambassador 1</td><td className="px-4 py-3">$10</td><td className="px-4 py-3">$100 (waived during active service)</td></tr>
                  <tr><td className="px-4 py-3">Ambassador 2</td><td className="px-4 py-3">$20</td><td className="px-4 py-3">$200</td></tr>
                  <tr><td className="px-4 py-3">Ambassador 3</td><td className="px-4 py-3">$50</td><td className="px-4 py-3">$300</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — Pathway */}
      <section className={`${sectionPad} bg-neutral-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Section 8" title="Volunteer-to-Ambassador Upgrade Pathway" />
          <ol className="mt-10 relative border-l-2 border-[#D4AF37] ml-3 space-y-8">
            {pathwayStages.map((s, i) => (
              <li key={s.stage} className="ml-6">
                <div className="absolute -left-[13px] mt-1 w-6 h-6 rounded-full bg-[#0B5D3B] text-white text-xs flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <Badge variant="outline" className="mb-2">{s.stage}</Badge>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="text-sm text-neutral-700 mt-1 max-w-3xl">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SECTION 9 — Benefits via Tabs */}
      <section className={`${sectionPad} bg-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Section 9" title="Benefits" />
          <Tabs defaultValue="member" className="mt-10">
            <TabsList className="grid w-full max-w-xl mx-auto grid-cols-3">
              <TabsTrigger value="member">Members</TabsTrigger>
              <TabsTrigger value="volunteer">Volunteers / VA1</TabsTrigger>
              <TabsTrigger value="ambassador">Ambassadors</TabsTrigger>
            </TabsList>
            <TabsContent value="member"><BenefitList items={memberBenefits} /></TabsContent>
            <TabsContent value="volunteer"><BenefitList items={volunteerBenefits} /></TabsContent>
            <TabsContent value="ambassador"><BenefitList items={ambassadorBenefits} /></TabsContent>
          </Tabs>
        </div>
      </section>

      {/* SECTION 10 — Duties */}
      <section className={`${sectionPad} bg-neutral-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Section 10" title="Duties and Expectations" />
          <div className="grid gap-6 md:grid-cols-3 mt-10">
            <DutyCard icon={Users} title="Members" items={memberDuties} />
            <DutyCard icon={HandHeart} title="Volunteers / VA1" items={volunteerDuties} />
            <DutyCard icon={Award} title="Ambassadors" items={ambassadorDuties} />
          </div>
        </div>
      </section>

      {/* SECTION 11 — Rewards */}
      <section className={`${sectionPad} bg-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Section 11" title="Income, Reward and Recognition Opportunities" />
          <div className="grid gap-6 lg:grid-cols-2 mt-10 items-start">
            <ul className="grid sm:grid-cols-2 gap-3">
              {rewardChannels.map((r) => (
                <li key={r} className="flex gap-3 p-4 rounded-lg border border-neutral-200 bg-white">
                  <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <span className="text-sm text-neutral-800">{r}</span>
                </li>
              ))}
            </ul>
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="text-amber-900 flex items-center gap-2">
                  <Shield className="w-5 h-5" /> Compliance Note
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-amber-900 space-y-2">
                <p>
                  No member, volunteer, or ambassador may raise funds, collect cash, sign contracts, issue receipts,
                  promise awards, guarantee nominations, scholarships, or votes, or represent SCEF financially without
                  official approval.
                </p>
                <p>All fundraising, sponsorship, donation, ticketing, and wallet activity must pass through approved SCEF channels.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 12 — Chapter */}
      <section className={`${sectionPad} bg-neutral-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Section 12" title="Choose Your Chapter" />
          <div className="grid gap-6 lg:grid-cols-2 mt-10">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Compass className="w-5 h-5 text-[#0B5D3B]"/>Chapter Options</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {chapterTypes.map((c) => (
                    <li key={c} className="flex gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-[#0B5D3B] mt-0.5"/>{c}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Globe2 className="w-5 h-5 text-[#0B5D3B]"/>SCEF Ten-Region Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {regions.map((r) => (
                    <Badge key={r} variant="outline" className="bg-white">{r}</Badge>
                  ))}
                </div>
                <Button asChild variant="link" className="px-0 mt-4 text-[#0B5D3B]">
                  <Link to="/local-chapters">Browse all chapters <ArrowRight className="w-4 h-4 ml-1"/></Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 13 — How to Apply */}
      <section className={`${sectionPad} bg-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Section 13" title="How to Apply" />
          <div className="grid gap-6 md:grid-cols-3 mt-10">
            <ApplyCard icon={Users} title="As a Member" steps={applyMember} cta={{label: "Join as a Member", to: "/auth/sign-up?path=member"}} />
            <ApplyCard icon={HandHeart} title="As a Volunteer / VA1" steps={applyVolunteer} cta={{label: "Apply as a Volunteer Ambassador 1", to: "/get-involved/volunteer"}} />
            <ApplyCard icon={Award} title="As an Ambassador" steps={applyAmbassador} cta={{label: "Become an Ambassador", to: "/get-involved/ambassador/apply"}} />
          </div>
        </div>
      </section>

      {/* SECTION 15 — Dashboard preview */}
      <section className={`${sectionPad} bg-neutral-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Section 15" title="Member, Volunteer and Ambassador Dashboard" subtitle="After signup, every user sees a unified dashboard." />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Membership tier",
              "Volunteer status",
              "Ambassador tier",
              "Country chapter",
              "Region",
              "Linked programs",
              "Membership status",
              "Volunteer assignment",
              "Ambassador status",
              "Supervisor / reporting officer",
              "Activity report status",
              "Available trainings",
              "Referral links where approved",
              "Donation / fundraising links where approved",
              "Chapter activities",
              "Certificates or digital badge status",
              "Upgrade options",
              "Contact Sophia Support",
            ].map((item) => (
              <div key={item} className="flex gap-2 p-3 rounded-md border border-neutral-200 bg-white text-sm">
                <ClipboardList className="w-4 h-4 text-[#0B5D3B] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-[#0B5D3B] hover:bg-[#0E7549] text-white">
              <Link to="/dashboard">Go to your dashboard <ArrowRight className="w-4 h-4 ml-1.5"/></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 17 — Compliance */}
      <section className={`${sectionPad} bg-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Section 17" title="Compliance and Safeguarding Notice" />
          <p className="mt-6 max-w-4xl text-sm text-neutral-700 leading-relaxed">
            All members, volunteers, ambassadors, interns, staff, consultants, partners, and local chapter
            representatives must comply with:
          </p>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {compliancePolicies.map((p) => (
              <div key={p} className="flex gap-2 p-3 rounded-md border border-neutral-200 bg-neutral-50 text-sm">
                <Shield className="w-4 h-4 text-[#0B5D3B] shrink-0 mt-0.5" />
                <span>{p}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-neutral-600 max-w-4xl italic">
            SCEF reserves the right to reject, suspend, remove, downgrade, or blacklist any member, volunteer,
            ambassador, intern, consultant, partner, or chapter representative who violates its policies, misrepresents
            the organization, abuses authority, exploits beneficiaries, misuses funds, violates safeguarding standards,
            or acts against the mission of SCEF.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className={`${sectionPad} bg-neutral-50`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="FAQs" title="Frequently Asked Questions" />
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-neutral-700 leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* SECTION 20 — Final CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B5D3B] via-[#0E2A52] to-[#0B1B3B] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#D4AF37] mb-4">JOIN THE MOVEMENT</Badge>
          <h2 className="text-3xl md:text-5xl font-bold max-w-3xl mx-auto">There is a place for you in SCEF.</h2>
          <p className="mt-5 max-w-2xl mx-auto text-white/85">
            Start with free online membership. Apply as a volunteer. Receive Ambassador 1 status during active approved
            service. Grow into Ambassador 2 or Ambassador 3. Represent your country. Support a region. Help transform
            education across Africa.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-[#D4AF37] hover:bg-[#E5C24A] text-[#0A0A0A] font-semibold">
              <Link to="/auth/sign-up?path=member">Join as a Free Member</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white/40 text-white hover:bg-white/10">
              <Link to="/get-involved/volunteer">Apply as a Volunteer Ambassador 1</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white/40 text-white hover:bg-white/10">
              <Link to="/get-involved/ambassador/apply">Become an Ambassador</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white/40 text-white hover:bg-white/10">
              <Link to="/local-chapters">Join a Local Chapter</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white/40 text-white hover:bg-white/10">
              <Link to="/programs/eduaid-africa">Support EduAid-Africa</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white/40 text-white hover:bg-white/10">
              <Link to="/programs/nesa-africa">Participate in NESA-Africa</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white/40 text-white hover:bg-white/10">
              <a href={SOPHIA_GENERAL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-1.5" /> Contact Sophia Support
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ----- helpers ----- */

function SectionHeader({ eyebrow, title, subtitle, theme = "light" }: { eyebrow: string; title: string; subtitle?: string; theme?: "light" | "dark" }) {
  const eyebrowCls = theme === "dark" ? "text-[#D4AF37]" : "text-[#D4AF37]";
  const titleCls = theme === "dark" ? "text-white" : "text-[#0A0A0A]";
  const subCls = theme === "dark" ? "text-white/80" : "text-neutral-600";
  return (
    <div className="max-w-3xl">
      <p className={`text-xs font-semibold tracking-[0.2em] uppercase ${eyebrowCls}`}>{eyebrow}</p>
      <h2 className={`mt-2 text-2xl sm:text-3xl md:text-4xl font-bold ${titleCls}`}>{title}</h2>
      {subtitle && <p className={`mt-3 text-base ${subCls}`}>{subtitle}</p>}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-3 gap-3 py-1.5 border-b border-white/10 last:border-0">
      <dt className="text-white/70 col-span-1">{k}</dt>
      <dd className="col-span-2 text-white">{v}</dd>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-neutral-50 border border-neutral-200 p-2">
      <p className="text-[10px] uppercase tracking-wide text-neutral-500">{label}</p>
      <p className="text-xs font-semibold text-neutral-800 leading-snug">{value}</p>
    </div>
  );
}

function BenefitList({ items }: { items: string[] }) {
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((b) => (
        <div key={b} className="flex gap-3 p-4 rounded-lg border border-neutral-200 bg-white">
          <CheckCircle2 className="w-5 h-5 text-[#0B5D3B] shrink-0 mt-0.5" />
          <span className="text-sm text-neutral-800">{b}</span>
        </div>
      ))}
    </div>
  );
}

function DutyCard({ icon: Icon, title, items }: { icon: typeof Users; title: string; items: string[] }) {
  return (
    <Card>
      <CardHeader>
        <div className="w-10 h-10 rounded-lg bg-[#0B5D3B]/10 text-[#0B5D3B] flex items-center justify-center mb-2">
          <Icon className="w-5 h-5" />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((i) => (
            <li key={i} className="flex gap-2 text-sm text-neutral-700">
              <CheckCircle2 className="w-4 h-4 text-[#0B5D3B] shrink-0 mt-0.5" />
              <span>{i}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function ApplyCard({ icon: Icon, title, steps, cta }: { icon: typeof Users; title: string; steps: string[]; cta: { label: string; to: string } }) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 text-[#0B5D3B] flex items-center justify-center mb-2">
          <Icon className="w-5 h-5" />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ol className="space-y-2 mb-5">
          {steps.map((s, i) => (
            <li key={s} className="flex gap-2 text-sm text-neutral-700">
              <span className="shrink-0 w-5 h-5 rounded-full bg-[#0B5D3B] text-white text-[11px] font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
        <Button asChild className="mt-auto bg-[#0B5D3B] hover:bg-[#0E7549] text-white">
          <Link to={cta.to}>{cta.label} <ArrowRight className="w-4 h-4 ml-1.5"/></Link>
        </Button>
      </CardContent>
    </Card>
  );
}
