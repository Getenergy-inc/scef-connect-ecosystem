import { useState } from "react";
import { Link } from "react-router-dom";
import { VacancyApplicationForm } from "@/components/vacancies/VacancyApplicationForm";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Shield,
  Users,
  Building2,
  Globe,
  Laptop,
  TrendingUp,
  Tv,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  FileCheck,
  Lock,
  MessageCircle,
} from "lucide-react";

const SOPHIA_WA =
  "https://wa.me/2348109765897?text=Hello%20Sophia%2C%20I%20want%20to%20apply%20for%20a%20SCEF%20division%20or%20vacancy.";

const heroCtas = [
  { label: "View Our Five Divisions", href: "#divisions" },
  { label: "View Current Vacancies", href: "#vacancies" },
  { label: "Apply as Volunteer", href: "/volunteer" },
  { label: "Apply as Intern", href: "/internship" },
  { label: "Join a Local Chapter", href: "/chapters/join-online" },
  { label: "Contact Sophia Support", href: SOPHIA_WA, external: true },
];

const governanceLayers = [
  {
    code: "BOT",
    icon: Shield,
    title: "Board of Trustees (BOT)",
    subtitle: "Custodianship Layer",
    role: "The BOT is the legal, fiduciary, and mission-protection authority of SCEF.",
    responsibilities: [
      "Protect SCEF's mission and assets",
      "Safeguard institutional continuity",
      "Approve constitutional changes",
      "Provide fiduciary oversight",
      "Appoint or ratify major governance structures where applicable",
      "Protect SCEF's independence and credibility",
    ],
    restrictions: [
      "BOT should not manage daily operations",
      "BOT should not run programs directly",
      "BOT should not interfere with operational staffing",
      "BOT should not approve chapters outside official compliance processes",
    ],
  },
  {
    code: "BOD",
    icon: Building2,
    title: "Board of Directors (BOD)",
    subtitle: "Strategic Control Layer",
    role: "The BOD provides strategic direction, institutional performance oversight, policy approval, and executive accountability.",
    responsibilities: [
      "Approve strategic plans",
      "Approve annual budgets",
      "Oversee executive performance",
      "Approve major institutional policies",
      "Establish audit, governance, finance, ethics, and risk committees",
      "Review division performance",
    ],
    extras: {
      label: "Mandatory Committees",
      items: [
        "Audit & Risk Committee",
        "Governance & Ethics Committee",
        "Finance & Investment Committee",
        "Safeguarding & Compliance Committee",
      ],
    },
  },
  {
    code: "BOA",
    icon: Users,
    title: "Board of Advisers (BOA)",
    subtitle: "Expert Intelligence Layer",
    role: "The BOA provides expert guidance, policy advice, technical credibility, donor confidence, and sector intelligence.",
    responsibilities: [
      "Advise on education policy",
      "Advise on technology, media, finance, governance, partnerships, and regional expansion",
      "Support donor and government credibility",
      "Provide expert review for major initiatives",
    ],
    restrictions: [
      "BOA is advisory only",
      "BOA does not vote on governance decisions",
      "BOA does not approve funds",
      "BOA does not manage staff or chapters",
    ],
  },
  {
    code: "LCP",
    icon: Globe,
    title: "Local Chapter Presidents (LCPs)",
    subtitle: "Licensed Execution Layer",
    role: "Local Chapters are licensed implementation units that execute SCEF-approved programs at country, regional, diaspora, and community levels.",
    responsibilities: [
      "Implement approved SCEF programs",
      "Mobilize local members, volunteers, schools, and partners",
      "Submit activity reports",
      "Maintain compliance records",
      "Support EduAid-Africa, NESA-Africa, Rebuild My School Africa, eLibrary Nigeria, Education Online Africa, local training, media outreach, and community education projects",
    ],
    restrictions: [
      "LCPs do not own SCEF assets",
      "LCPs do not speak for SCEF globally without authorization",
      "LCPs do not raise funds outside approved SCEF frameworks",
      "LCPs do not operate independently from SCEF compliance controls",
    ],
  },
];

const divisions = [
  {
    code: "SOBCD",
    icon: Shield,
    title: "Strategic Operations & Business Compliance Division",
    role: "Governance, compliance, operations, finance oversight, risk, and institutional accountability backbone of SCEF.",
    purpose:
      "To ensure that SCEF operates with structure, accountability, transparency, safeguarding, compliance, legal discipline, financial oversight, donor trust, and governance integrity.",
    responsibilities: [
      "Governance frameworks and policies",
      "Legal and regulatory compliance",
      "Organization Secretary functions",
      "BOT, BOD, and BOA coordination support",
      "Risk and ethics management",
      "Safeguarding coordination",
      "Chapter approvals, sanctions, and compliance review",
      "Institutional finance and audit oversight",
      "Annual reports and governance documentation",
      "Volunteer and staffing compliance",
      "Strategic planning and reporting",
      "Fundraising governance and donor compliance controls",
    ],
    units: [
      "Governance & Compliance Unit",
      "Event Execution Unit",
      "Membership & Recognition Unit",
      "Fundraising & Partnerships Unit",
      "Financial Oversight Unit",
      "Local Chapter Compliance Support Unit",
      "Technology Integration & Security Compliance Unit",
      "Strategic Planning & Reporting Unit",
      "Volunteer & Staffing Management Unit",
    ],
    roles: [
      "Organization Secretary",
      "Compliance Support Officer",
      "Governance Support Officer",
      "Safeguarding Assistant",
      "Finance Documentation Assistant",
      "Grant Writing Assistant",
      "Monitoring & Evaluation Assistant",
      "Volunteer Coordination Officer",
      "Policy Documentation Assistant",
      "Strategic Reporting Assistant",
      "PA to CVO / HR & Admin Support",
    ],
  },
  {
    code: "TDSD",
    icon: Laptop,
    title: "Technology & Digital Services Division",
    role: "SCEF's digital infrastructure, platform development, data, automation, AI, cybersecurity, and education technology division.",
    purpose:
      "To build and maintain the digital systems that allow SCEF to scale, track, verify, automate, report, and deliver education programs transparently across Africa and the diaspora.",
    responsibilities: [
      "Website and mobile app development",
      "APIs, databases, and dashboards",
      "GFA Wallet and payment integration support",
      "Sophia FAQ, chatbot and analytics",
      "Cybersecurity and data protection",
      "AI tools and automation",
      "ICT and digital skills training",
      "eLibrary Nigeria",
      "Education Online Africa",
      "Internal admin systems",
      "QA testing and technical documentation",
    ],
    units: [
      "SCEF website & mobile app",
      "eLibrary Nigeria",
      "Education Online Africa",
      "Sophia Help Center & Knowledge Base",
      "GFA Wallet integration support",
      "Internal dashboards",
      "Chapter reporting portals",
    ],
    roles: [
      "Technology Lead",
      "Frontend / Backend / Full-Stack Developer",
      "UI/UX Designer",
      "Product Manager / APM",
      "QA Tester",
      "Database Assistant",
      "DevOps Support",
      "Sophia Knowledge Base Assistant",
      "Cybersecurity Support Volunteer",
      "Analytics Support Assistant",
      "Technical Documentation Assistant",
    ],
  },
  {
    code: "OMBDD",
    icon: TrendingUp,
    title: "Online Media Business Development Division",
    role: "Online growth, sponsorship acquisition, partnership conversion, digital business development, and revenue-growth division.",
    purpose:
      "To grow SCEF's online visibility, convert digital engagement into partnerships, support sponsorship pipelines, and strengthen revenue development through online channels.",
    responsibilities: [
      "Digital growth strategy",
      "Online partnerships and sponsorship acquisition",
      "Digital campaign conversion",
      "CSR outreach support",
      "Online donor engagement",
      "Affiliate fundraising coordination",
      "Social media business development",
      "Partnership pipeline management",
      "CRM support and digital campaign reporting",
    ],
    units: [
      "Online business development only — does not manage governance, technology platforms, broadcast content, chapter approvals, funds, or award/beneficiary decisions.",
    ],
    roles: [
      "Business Development Assistant",
      "Partnership Outreach Volunteer",
      "Sponsorship Support Officer",
      "CSR Outreach Volunteer",
      "Fundraising Campaign Assistant",
      "Digital Campaign Assistant",
      "Social Media BD Volunteer",
      "CRM Support Assistant",
      "Affiliate Fundraising Partner",
      "Donor Outreach Assistant",
    ],
  },
  {
    code: "Santos Media",
    icon: Tv,
    title: "Santos Media Division",
    role: "Official education media, content production, broadcasting, storytelling, webinar, and public engagement division of SCEF.",
    purpose:
      "To produce, distribute, monetize, and archive credible education-focused media that promotes advocacy, public trust, stakeholder engagement, and social impact documentation.",
    responsibilities: [
      "Content production and broadcast scheduling",
      "Media storytelling and education advocacy",
      "Webinar and event coverage production",
      "Interview production",
      "Media archive management",
      "Sponsor visibility production",
      "Media monetization coordination",
      "Partner media collaboration",
    ],
    units: [
      "NESA Africa TV",
      "It's In Me Radio",
      "EduAid-Africa Webinar Series",
      "EduAid Education Tourism Show",
      "SCEF media archive",
      "Educational podcasts and live sessions",
    ],
    roles: [
      "Media Director",
      "Content Producer",
      "Video Editor",
      "Presenter / Host",
      "Script Writer",
      "Webinar Coordinator",
      "Podcast Assistant",
      "Broadcast Support Volunteer",
      "Media Archive Assistant",
      "Event Coverage Volunteer",
    ],
  },
  {
    code: "LCS",
    icon: Globe,
    title: "Local Chapter Services",
    role: "Grassroots execution, local chapter onboarding, chapter compliance tracking, ambassador coordination, and community implementation division.",
    purpose:
      "To ensure that SCEF's continental education vision becomes measurable local action through online, hybrid, physical, and diaspora chapters.",
    responsibilities: [
      "Online local chapter onboarding",
      "Hybrid chapter upgrade support",
      "Physical chapter development",
      "Country desk coordination",
      "Membership onboarding",
      "Ambassador coordination",
      "Chapter performance tracking",
      "Community outreach support",
      "School and community engagement",
      "Diaspora chapter engagement",
      "Chapter compliance reporting to SOBCD",
    ],
    units: [
      "Online, Hybrid, Physical, and Diaspora chapter desks",
      "Country and regional chapter coordination",
    ],
    roles: [
      "Local Chapter Coordinator",
      "Membership Support Assistant",
      "Ambassador Support Officer",
      "Country Chapter Volunteer",
      "Community Outreach Officer",
      "Chapter Documentation Assistant",
      "Local Chapter President Support",
      "Diaspora Chapter Support Volunteer",
      "Regional Chapter Assistant",
      "Chapter Reporting Volunteer",
    ],
  },
];

const placementTable: Array<{ program: string; placement: string }> = [
  { program: "NESA-Africa", placement: "Governance: SOBCD • Media: Santos Media • Growth: OMBDD • Tech: TDSD" },
  { program: "EduAid-Africa", placement: "Governance: SOBCD • Fundraising: OMBDD • Media: Santos Media • Delivery: LCS" },
  { program: "Rebuild My School Africa", placement: "Governance: SOBCD • Fundraising: OMBDD • Delivery: LCS • Reporting: TDSD" },
  { program: "Education Online Africa", placement: "Operated under TDSD" },
  { program: "eLibrary Nigeria", placement: "Operated under TDSD • Promoted through LCS" },
  { program: "Women & Girls Education", placement: "Delivery: LCS • Safeguarding: SOBCD • Media: Santos Media" },
  { program: "Special Needs Education Support", placement: "Delivery: LCS • Safeguarding & Inclusion: SOBCD" },
  { program: "NESA Africa TV", placement: "Santos Media" },
  { program: "It's In Me Radio", placement: "Santos Media" },
  { program: "EduAid Webinar Series", placement: "Santos Media • Coordination: SOBCD • Tech: TDSD" },
  { program: "EduAid Education Tourism Show", placement: "Santos Media" },
  { program: "Sophia Help Center", placement: "TDSD • Escalation across all divisions" },
];

const chapterStages = [
  {
    stage: "Stage 1",
    title: "Online Local Chapter",
    purpose:
      "To test seriousness, build a data trail, train leadership, and establish basic community presence.",
    prerequisites: [
      "Minimum 5 verified core members",
      "1 Chapter Lead / Local Chapter President nominee",
      "1 Compliance Officer or Compliance Focal Person",
      "Verified registration on SCEF digital platform",
      "All core members complete KYC where applicable",
      "Active participation in at least one SCEF program",
      "Minimum 3 documented online or community activities",
      "Completion of governance, ethics, safeguarding, and reporting training",
      "Submission of monthly activity reports",
      "Minimum 6 months active performance before upgrade consideration",
    ],
    restrictions: [
      "No independent fundraising without approval",
      "No use of SCEF name for contracts without approval",
      "No physical office claim unless verified",
      "No public representation beyond approved chapter scope",
    ],
  },
  {
    stage: "Stage 2",
    title: "Hybrid Local Chapter",
    purpose:
      "To grant limited physical presence and controlled community implementation authority.",
    prerequisites: [
      "Minimum 25 active members",
      "Minimum 5 trained ambassadors",
      "3-member Chapter Advisory Panel",
      "Signed chapter compliance charter",
      "Verified physical meeting space or shared office",
      "Active digital reporting desk",
      "Clean wallet and financial tracking history",
      "Zero unresolved audit or compliance flags",
      "At least 1 completed and verified local project",
      "Quarterly performance reports",
      "Approval from SOBCD with LCS recommendation",
    ],
    restrictions: [
      "Licensed for 12 months",
      "Subject to quarterly review",
      "Can be downgraded, suspended, or upgraded based on performance",
    ],
  },
  {
    stage: "Stage 3",
    title: "Full Local Chapter",
    purpose: "To authorize advanced chapter operations and larger program implementation.",
    prerequisites: [
      "Sustained performance",
      "Clean audits",
      "Leadership stability",
      "Verified community impact",
      "Strong membership base",
      "Approved governance structure",
      "Ability to manage multi-program execution",
      "Strong safeguarding and compliance record",
      "Approval from SCEF governance structure",
    ],
    restrictions: [
      "Larger funding allocation eligibility",
      "Multi-program implementation",
      "Regional events and local partnerships under HQ approval",
      "Chapter microsite or dashboard access",
      "Public reporting recognition",
    ],
  },
];

const hqRoles = [
  "Chief Visionary / Executive Lead",
  "Operations & Compliance Lead / SOBCD Lead",
  "Technology Lead / TDSD Lead",
  "Finance & Audit Officer",
  "Media Director / Santos Media Lead",
  "Partnerships & Growth Lead / OMBDD Lead",
  "Local Chapter Services Lead",
  "Executive Assistant / PA to CVO",
  "Legal or Compliance Associate (part-time)",
  "Admin and HR Support (as funding allows)",
];

const internTracks = [
  "Technology and Digital Services",
  "Research and Policy",
  "Media Production",
  "Partnerships and Fundraising",
  "Compliance and Safeguarding",
  "Local Chapter Services",
  "Data and Reporting",
  "Administration and Executive Office Support",
];

const vacancies = [
  { title: "Frontend Developer", division: "TDSD", type: "Volunteer", location: "Remote", deadline: "Open / Rolling Application" },
  { title: "UI/UX Designer", division: "TDSD", type: "Intern", location: "Remote", deadline: "Open / Rolling Application" },
  { title: "Product Management Support", division: "TDSD", type: "Volunteer", location: "Remote", deadline: "Open / Rolling Application" },
  { title: "QA Tester", division: "TDSD", type: "Volunteer", location: "Remote", deadline: "Open / Rolling Application" },
  { title: "Sophia Support Assistant", division: "TDSD", type: "Volunteer", location: "Remote", deadline: "Open / Rolling Application" },
  { title: "Social Media BD Volunteer", division: "OMBDD", type: "Volunteer", location: "Remote", deadline: "Open / Rolling Application" },
  { title: "Partnership Outreach Volunteer", division: "OMBDD", type: "Volunteer", location: "Remote", deadline: "Open / Rolling Application" },
  { title: "Fundraising Campaign Assistant", division: "OMBDD", type: "Volunteer", location: "Remote", deadline: "Open / Rolling Application" },
  { title: "CSR Outreach Volunteer", division: "OMBDD", type: "Volunteer", location: "Remote / Hybrid", deadline: "Open / Rolling Application" },
  { title: "Content Producer", division: "Santos Media", type: "Volunteer", location: "Remote / Hybrid", deadline: "Open / Rolling Application" },
  { title: "Video Editor", division: "Santos Media", type: "Volunteer", location: "Remote", deadline: "Open / Rolling Application" },
  { title: "Webinar Coordinator", division: "Santos Media", type: "Volunteer", location: "Remote", deadline: "Open / Rolling Application" },
  { title: "Event Coverage Volunteer", division: "Santos Media", type: "Volunteer", location: "Onsite", deadline: "Open / Rolling Application" },
  { title: "Grant Writing Assistant", division: "SOBCD", type: "Intern", location: "Remote", deadline: "Open / Rolling Application" },
  { title: "Compliance Support Volunteer", division: "SOBCD", type: "Volunteer", location: "Remote", deadline: "Open / Rolling Application" },
  { title: "Safeguarding Support Assistant", division: "SOBCD", type: "Volunteer", location: "Remote", deadline: "Open / Rolling Application" },
  { title: "Monitoring & Evaluation Assistant", division: "SOBCD", type: "Intern", location: "Remote", deadline: "Open / Rolling Application" },
  { title: "Local Chapter Coordinator", division: "LCS", type: "Volunteer", location: "Country-based", deadline: "Open / Rolling Application" },
  { title: "Membership Support Volunteer", division: "LCS", type: "Volunteer", location: "Remote", deadline: "Open / Rolling Application" },
  { title: "Chapter Documentation Assistant", division: "LCS", type: "Volunteer", location: "Remote", deadline: "Open / Rolling Application" },
  { title: "Diaspora Chapter Support Volunteer", division: "LCS", type: "Volunteer", location: "Diaspora", deadline: "Open / Rolling Application" },
];

const applicationSteps = [
  "Choose a division, vacancy, or chapter support area.",
  "Review role requirements, reporting line, and weekly availability.",
  "Submit CV, short introduction, availability, relevant experience, and portfolio links where applicable.",
  "Attend screening or interview where required.",
  "Complete onboarding, safeguarding acknowledgment, code of conduct, and role orientation.",
  "Receive supervisor, task board, and reporting channel.",
  "Begin assigned work and submit weekly reports.",
];

const policyLinks = [
  { name: "Code of Conduct", href: "/policies/code-of-conduct" },
  { name: "Safeguarding Policy", href: "/policies/safeguarding" },
  { name: "Child Protection Policy", href: "/policies/child-protection" },
  { name: "Volunteer Code", href: "/policies/volunteer-code" },
  { name: "Whistleblower / Report a Concern", href: "/policies/whistleblower" },
  { name: "Data Protection Policy", href: "/privacy" },
];

const SectionHeading = ({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) => (
  <div className="max-w-3xl mb-10">
    {eyebrow && (
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-2">
        {eyebrow}
      </p>
    )}
    <h2 className="font-display text-2xl md:text-3xl font-bold text-scef-blue-darker mb-3">
      {title}
    </h2>
    {intro && (
      <p className="text-muted-foreground leading-relaxed text-base">{intro}</p>
    )}
  </div>
);

const OurDivisionsVacancies = () => {
  return (
    <PageShell
      title="Our Divisions, Governance Structure & Vacancies"
      description="Explore SCEF's governance structure, five official divisions, local chapter approval framework, staffing model, volunteer opportunities, internships, and current vacancies across SCEF, EduAid-Africa, NESA-Africa, eLibrary Nigeria, Santos Media, and local chapters."
      eyebrow="About SCEF"
      heading="Our Divisions, Governance Structure & Vacancies"
      intro="A clear view of how Santos Creations Educational Foundation governs, operates, staffs, supervises, and scales education programs across Africa and the diaspora."
    >
      {/* Hero CTAs + description */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <p className="max-w-4xl text-muted-foreground leading-relaxed mb-6">
            Santos Creations Educational Foundation operates through a structured governance system,
            five official divisions, compliant local chapters, lean staffing, volunteers, interns,
            consultants, project teams, and digital platforms. This structure enables SCEF to deliver
            Education for All through transparency, accountability, partnerships, technology, media,
            and grassroots participation.
          </p>
          <div className="flex flex-wrap gap-2">
            {heroCtas.map((cta) =>
              cta.external ? (
                <Button key={cta.label} asChild size="sm" variant="outline">
                  <a href={cta.href} target="_blank" rel="noopener noreferrer">
                    {cta.label}
                  </a>
                </Button>
              ) : cta.href.startsWith("#") ? (
                <Button key={cta.label} asChild size="sm" variant="outline">
                  <a href={cta.href}>{cta.label}</a>
                </Button>
              ) : (
                <Button key={cta.label} asChild size="sm" variant="outline">
                  <Link to={cta.href}>{cta.label}</Link>
                </Button>
              )
            )}
          </div>
        </div>
      </section>

      {/* Institutional positioning */}
      <section className="bg-scef-pattern border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <SectionHeading
            eyebrow="Institutional Positioning"
            title="A hybrid governance and implementation platform for education in Africa"
          />
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
            <p className="text-muted-foreground leading-relaxed">
              Santos Creations Educational Foundation provides the institutional framework for
              education standards, funding systems, recognition platforms, digital learning
              infrastructure, media advocacy, and local chapter execution.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              SCEF is not one project, one award, one media channel, or one donation platform. It is
              the central governance and operating system through which education programs, digital
              platforms, media systems, funding mechanisms, and local chapters are designed,
              regulated, implemented, monitored, and scaled.
            </p>
          </div>
        </div>
      </section>

      {/* Governance architecture */}
      <section id="governance" className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <SectionHeading
            eyebrow="Governance Architecture"
            title="How SCEF Is Governed"
            intro="Four governance layers — fiduciary custodianship, strategic control, expert intelligence, and licensed local execution — form SCEF's accountability backbone."
          />
          <div className="grid md:grid-cols-2 gap-5">
            {governanceLayers.map((layer) => (
              <div
                key={layer.code}
                className="bg-card rounded-xl border border-border p-6 hover:border-scef-gold transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-lg bg-scef-blue-darker text-scef-gold flex items-center justify-center">
                    <layer.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-scef-gold uppercase">
                      {layer.code} · {layer.subtitle}
                    </div>
                    <h3 className="font-display text-lg font-bold text-scef-blue-darker">
                      {layer.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{layer.role}</p>

                <p className="text-xs font-semibold uppercase tracking-wide text-scef-blue-darker mb-2">
                  Responsibilities
                </p>
                <ul className="space-y-1.5 mb-4">
                  {layer.responsibilities.map((r) => (
                    <li key={r} className="flex gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-scef-gold shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>

                {"extras" in layer && layer.extras && (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-wide text-scef-blue-darker mb-2">
                      {layer.extras.label}
                    </p>
                    <ul className="space-y-1.5 mb-4">
                      {layer.extras.items.map((r) => (
                        <li key={r} className="flex gap-2 text-sm text-muted-foreground">
                          <FileCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {"restrictions" in layer && layer.restrictions && (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-2">
                      Restrictions
                    </p>
                    <ul className="space-y-1.5">
                      {layer.restrictions.map((r) => (
                        <li key={r} className="flex gap-2 text-sm text-muted-foreground">
                          <Lock className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Five divisions */}
      <section id="divisions" className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <SectionHeading
            eyebrow="Official Five Divisions"
            title="Five Divisions. One Institution."
            intro="SCEF operates exclusively through these five official divisions. All departments, units, projects, vacancies, internships, volunteers, media, technology, fundraising, Sophia support, and local chapter functions sit under them."
          />
          <div className="space-y-5">
            {divisions.map((d, idx) => (
              <div
                key={d.code}
                className="bg-card rounded-xl border border-border p-6 md:p-8"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-scef-blue-darker text-scef-gold flex items-center justify-center shrink-0">
                    <d.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-scef-gold uppercase">
                      Division {idx + 1} · {d.code}
                    </div>
                    <h3 className="font-display text-xl font-bold text-scef-blue-darker">
                      {d.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{d.role}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-5 max-w-4xl">
                  <span className="font-semibold text-scef-blue-darker">Purpose: </span>
                  {d.purpose}
                </p>

                <div className="grid md:grid-cols-3 gap-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-scef-blue-darker mb-2">
                      Core Responsibilities
                    </p>
                    <ul className="space-y-1.5">
                      {d.responsibilities.map((r) => (
                        <li key={r} className="flex gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-3.5 h-3.5 text-scef-gold shrink-0 mt-1" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-scef-blue-darker mb-2">
                      {d.code === "SOBCD" ? "Units" : "Platforms / Scope"}
                    </p>
                    <ul className="space-y-1.5">
                      {d.units.map((r) => (
                        <li key={r} className="flex gap-2 text-sm text-muted-foreground">
                          <Building2 className="w-3.5 h-3.5 text-primary shrink-0 mt-1" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-scef-blue-darker mb-2">
                      Typical Roles
                    </p>
                    <ul className="space-y-1.5">
                      {d.roles.map((r) => (
                        <li key={r} className="flex gap-2 text-sm text-muted-foreground">
                          <Briefcase className="w-3.5 h-3.5 text-scef-gold shrink-0 mt-1" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program placement table */}
      <section className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <SectionHeading
            eyebrow="Programs & Platforms"
            title="Where each program and platform sits"
            intro="A single placement reference for every SCEF-facing program, platform, and service."
          />
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm min-w-[640px]">
              <thead className="bg-scef-blue-darker text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Program / Platform</th>
                  <th className="text-left px-4 py-3 font-semibold">Division Placement</th>
                </tr>
              </thead>
              <tbody>
                {placementTable.map((row, i) => (
                  <tr key={row.program} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                    <td className="px-4 py-3 font-medium text-scef-blue-darker">{row.program}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.placement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Chapter approval framework */}
      <section className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <SectionHeading
            eyebrow="Chapter Framework"
            title="How SCEF Local Chapters Are Approved and Upgraded"
            intro="Three structured stages with clear prerequisites, restrictions, and review cycles."
          />
          <Accordion type="multiple" className="space-y-3">
            {chapterStages.map((s) => (
              <AccordionItem
                key={s.stage}
                value={s.stage}
                className="bg-card rounded-xl border border-border px-5"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="text-left">
                    <div className="text-[10px] font-bold tracking-widest text-scef-gold uppercase">
                      {s.stage}
                    </div>
                    <div className="font-display text-lg font-bold text-scef-blue-darker">
                      {s.title}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    <span className="font-semibold text-scef-blue-darker">Purpose: </span>
                    {s.purpose}
                  </p>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-scef-blue-darker mb-2">
                        Prerequisites
                      </p>
                      <ul className="space-y-1.5">
                        {s.prerequisites.map((r) => (
                          <li key={r} className="flex gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-3.5 h-3.5 text-scef-gold shrink-0 mt-1" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-2">
                        {s.stage === "Stage 1" ? "Restrictions" : "Status & Privileges"}
                      </p>
                      <ul className="space-y-1.5">
                        {s.restrictions.map((r) => (
                          <li key={r} className="flex gap-2 text-sm text-muted-foreground">
                            <Lock className="w-3.5 h-3.5 text-primary shrink-0 mt-1" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Lean staffing model */}
      <section className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <SectionHeading
            eyebrow="Staffing Model"
            title="Lean Staffing: HQ to Chapters to Projects"
            intro="SCEF scales through systems, dashboards, trained volunteers, interns, chapters, and project-based teams — not through unnecessary payroll expansion."
          />
          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-card rounded-xl border border-border p-6">
              <Building2 className="w-6 h-6 text-scef-gold mb-3" />
              <h3 className="font-display font-bold text-scef-blue-darker mb-3">HQ Core Staff</h3>
              <ul className="space-y-1.5">
                {hqRoles.map((r) => (
                  <li key={r} className="flex gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-scef-gold shrink-0 mt-1" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <GraduationCap className="w-6 h-6 text-scef-gold mb-3" />
              <h3 className="font-display font-bold text-scef-blue-darker mb-3">Internship Tracks</h3>
              <ul className="space-y-1.5 mb-4">
                {internTracks.map((r) => (
                  <li key={r} className="flex gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-scef-gold shrink-0 mt-1" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground border-t border-border pt-3">
                Duration 3–6 months · weekly reporting · supervisor assigned · completion
                certificate where criteria are met · safeguarding and code of conduct required.
              </p>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <Users className="w-6 h-6 text-scef-gold mb-3" />
              <h3 className="font-display font-bold text-scef-blue-darker mb-3">
                Volunteers & Project Teams
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Volunteers are task-specific and digitally tracked. They do not replace core staff,
                must have assigned tasks, submit reports, and comply with safeguarding and conduct
                policies.
              </p>
              <p className="text-sm text-muted-foreground">
                Projects operate as temporary delivery units (Project Lead, Finance & Reporting
                Officer, Technical/Field Staff, Media Support, M&amp;E Support, volunteers and
                interns as required). When the project ends, the team is dissolved or reassigned.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vacancies */}
      <section id="vacancies" className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <SectionHeading
            eyebrow="Current Vacancies"
            title="Open roles across SCEF divisions"
            intro="Filter by division, role type, and location. All vacancies are open on a rolling basis unless a deadline is published."
          />
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full text-sm min-w-[720px]">
              <thead className="bg-scef-blue-darker text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Role</th>
                  <th className="text-left px-4 py-3 font-semibold">Division</th>
                  <th className="text-left px-4 py-3 font-semibold">Type</th>
                  <th className="text-left px-4 py-3 font-semibold">Location</th>
                  <th className="text-left px-4 py-3 font-semibold">Deadline</th>
                  <th className="text-left px-4 py-3 font-semibold">Apply</th>
                </tr>
              </thead>
              <tbody>
                {vacancies.map((v, i) => (
                  <tr key={v.title} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                    <td className="px-4 py-3 font-medium text-scef-blue-darker">{v.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{v.division}</td>
                    <td className="px-4 py-3 text-muted-foreground">{v.type}</td>
                    <td className="px-4 py-3 text-muted-foreground">{v.location}</td>
                    <td className="px-4 py-3 text-muted-foreground">{v.deadline}</td>
                    <td className="px-4 py-3">
                      <Button asChild size="sm" variant="outline" className="h-8 px-3 text-[12px]">
                        <a href={SOPHIA_WA} target="_blank" rel="noopener noreferrer">
                          Apply
                        </a>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Roles are listed as "Open / Rolling Application" unless deadlines are officially
            published. SCEF does not promise payment for volunteer roles unless they are explicitly
            funded.
          </p>
        </div>
      </section>

      {/* Application process & form */}
      <section className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <SectionHeading
                eyebrow="Application Process"
                title="How to apply in seven steps"
              />
              <ol className="space-y-3">
                {applicationSteps.map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-scef-blue-darker text-scef-gold text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-sm text-muted-foreground pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <SectionHeading
                eyebrow="Application Form"
                title="What we'll collect"
                intro="Backend onboarding is being prepared. While we finalize it, applications are accepted via Sophia Support on WhatsApp."
              />
              <div className="bg-card rounded-xl border border-border p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-scef-blue-darker mb-3">
                  Required Fields
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-muted-foreground mb-5">
                  {[
                    "Full name",
                    "Email",
                    "Phone / WhatsApp",
                    "Country & City",
                    "Preferred division",
                    "Preferred role",
                    "Volunteer / intern / staff / consultant",
                    "Weekly availability",
                    "Relevant experience",
                    "Tools you can use",
                    "CV upload",
                    "Portfolio / LinkedIn / GitHub / website",
                    "Short introduction",
                    "Why you want to support SCEF",
                    "Consent to SCEF Code of Conduct",
                    "Safeguarding acknowledgment",
                    "Data privacy consent",
                  ].map((f) => (
                    <li key={f} className="flex gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-scef-gold shrink-0 mt-1" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full">
                  <a href={SOPHIA_WA} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4" />
                    Apply through Sophia Support
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & safeguarding */}
      <section className="bg-scef-blue-darker text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-2">
              Compliance & Safeguarding
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              A safeguarded, accountable institution
            </h2>
            <p className="text-white/85 leading-relaxed mb-6">
              All SCEF volunteers, interns, staff, consultants, ambassadors, chapter leaders, media
              contributors, technology contributors, partners, and local chapter representatives are
              required to follow the SCEF Code of Conduct, Safeguarding Policy, Child Protection
              Policy, Anti-Harassment Policy, Conflict of Interest Policy, Data Protection Policy,
              Anti-Fraud Policy, Anti-Corruption Policy, and Whistleblower Protection standards.
            </p>
            <div className="flex flex-wrap gap-2">
              {policyLinks.map((p) => (
                <Button
                  key={p.name}
                  asChild
                  size="sm"
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white hover:text-scef-blue-darker"
                >
                  <Link to={p.href}>
                    {p.name}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default OurDivisionsVacancies;
