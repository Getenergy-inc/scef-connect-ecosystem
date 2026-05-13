/**
 * SCEF Monthly Advocacy, Webinar & Training Calendar
 * July 2026 – June 2027
 */

export type ParticipationMode = "Online" | "Physical" | "Hybrid";

export type MonthlyProgram = {
  slug: string;
  month: string;       // e.g. "July 2026"
  title: string;       // e.g. "Teacher Training & Classroom Innovation Week"
  short: string;       // dropdown short label
  summary: string;     // 1–2 sentences for cards & overview
  modes: ParticipationMode[];
  audience: string;
};

export const monthlyPrograms: MonthlyProgram[] = [
  {
    slug: "july-2026-teacher-training",
    month: "July 2026",
    title: "Teacher Training & Classroom Innovation Week",
    short: "Teacher Training & Classroom Innovation",
    summary:
      "Equipping teachers across Africa with classroom innovation, pedagogy upgrades, and student engagement skills.",
    modes: ["Online", "Physical", "Hybrid"],
    audience: "Teachers, school managers, education NGOs",
  },
  {
    slug: "august-2026-school-leadership",
    month: "August 2026",
    title: "School Management & Leadership Week",
    short: "School Management & Leadership",
    summary:
      "Strengthening school owners, principals, and administrators in governance, operations, and institutional leadership.",
    modes: ["Online", "Hybrid"],
    audience: "School owners, principals, administrators",
  },
  {
    slug: "september-2026-inclusive-education",
    month: "September 2026",
    title: "Inclusive Education & Special Needs Support Week",
    short: "Inclusive Education & Special Needs",
    summary:
      "Advancing inclusive classrooms, special needs education and safeguarding for vulnerable learners.",
    modes: ["Online", "Physical", "Hybrid"],
    audience: "Special needs educators, schools, NGOs",
  },
  {
    slug: "october-2026-digital-learning",
    month: "October 2026",
    title: "Digital Learning & EdTech Tools Week",
    short: "Digital Learning & EdTech",
    summary:
      "Bringing schools, teachers and students into the digital learning era through EdTech tools and digital labs.",
    modes: ["Online", "Hybrid"],
    audience: "Teachers, ICT coordinators, schools",
  },
  {
    slug: "november-2026-curriculum-assessment",
    month: "November 2026",
    title: "Curriculum Development & Assessment Week",
    short: "Curriculum Development & Assessment",
    summary:
      "Improving curriculum design, learning outcomes and assessment standards across African schools.",
    modes: ["Online", "Hybrid"],
    audience: "Teachers, academic heads, examiners",
  },
  {
    slug: "december-2026-policy-governance",
    month: "December 2026",
    title: "Education Policy, Governance & Compliance Week",
    short: "Policy, Governance & Compliance",
    summary:
      "Engaging policymakers, NGOs and institutional leaders on education governance, compliance and reform.",
    modes: ["Online", "Physical", "Hybrid"],
    audience: "Policy makers, NGOs, institutional leaders",
  },
  {
    slug: "january-2027-career-guidance",
    month: "January 2027",
    title: "Career Guidance Systems for Schools Week",
    short: "Career Guidance Systems",
    summary:
      "Embedding career guidance frameworks into schools so every learner can plan their pathway.",
    modes: ["Online", "Hybrid"],
    audience: "Counselors, teachers, school leaders",
  },
  {
    slug: "february-2027-girls-education",
    month: "February 2027",
    title: "Girls Education, Gender Inclusion & Safeguarding Week",
    short: "Girls Education & Gender Inclusion",
    summary:
      "Championing girls’ education, gender inclusion, and safeguarding in schools and communities.",
    modes: ["Online", "Physical", "Hybrid"],
    audience: "Girls, women, schools, advocates",
  },
  {
    slug: "march-2027-tvet-vocational",
    month: "March 2027",
    title: "TVET & Vocational Education Development Week",
    short: "TVET & Vocational Education",
    summary:
      "Promoting technical, vocational and entrepreneurship pathways for African youth and out-of-school learners.",
    modes: ["Online", "Physical", "Hybrid"],
    audience: "Vocational schools, technical trainers, youth",
  },
  {
    slug: "april-2027-school-funding-csr",
    month: "April 2027",
    title: "School Funding, CSR & Grant Readiness Week",
    short: "School Funding, CSR & Grants",
    summary:
      "Preparing schools and NGOs to access CSR partnerships, grants and structured funding.",
    modes: ["Online", "Hybrid"],
    audience: "Schools, NGOs, chapter leaders",
  },
  {
    slug: "may-2027-local-chapter-models",
    month: "May 2027",
    title: "Community Education & Local Chapter Models Week",
    short: "Community Education & Local Chapters",
    summary:
      "Activating local chapters, volunteers and ambassadors around grassroots education advocacy.",
    modes: ["Physical", "Hybrid"],
    audience: "LCPs, volunteers, ambassadors, communities",
  },
  {
    slug: "june-2027-impact-reporting",
    month: "June 2027",
    title: "Monitoring, Evaluation & Impact Reporting Week",
    short: "Monitoring, Evaluation & Impact",
    summary:
      "Closing the year with transparent monitoring, evaluation and public impact reporting across SCEF.",
    modes: ["Online", "Hybrid"],
    audience: "Admins, CSR partners, project managers",
  },
];

/**
 * Recommended SCEF Program Week dates and main day (3rd week of each month, Saturday).
 * Local chapters, schools, and partners may still pick any other day in the same week.
 */
export const programSchedule: Record<
  string,
  { weekRange: string; mainDay: string }
> = {
  "july-2026-teacher-training": { weekRange: "July 13–19, 2026", mainDay: "Saturday, July 18, 2026" },
  "august-2026-school-leadership": { weekRange: "August 10–16, 2026", mainDay: "Saturday, August 15, 2026" },
  "september-2026-inclusive-education": { weekRange: "September 14–20, 2026", mainDay: "Saturday, September 19, 2026" },
  "october-2026-digital-learning": { weekRange: "October 12–18, 2026", mainDay: "Saturday, October 17, 2026" },
  "november-2026-curriculum-assessment": { weekRange: "November 16–22, 2026", mainDay: "Saturday, November 21, 2026" },
  "december-2026-policy-governance": { weekRange: "December 14–20, 2026", mainDay: "Saturday, December 19, 2026" },
  "january-2027-career-guidance": { weekRange: "January 11–17, 2027", mainDay: "Saturday, January 16, 2027" },
  "february-2027-girls-education": { weekRange: "February 15–21, 2027", mainDay: "Saturday, February 20, 2027" },
  "march-2027-tvet-vocational": { weekRange: "March 15–21, 2027", mainDay: "Saturday, March 20, 2027" },
  "april-2027-school-funding-csr": { weekRange: "April 12–18, 2027", mainDay: "Saturday, April 17, 2027" },
  "may-2027-local-chapter-models": { weekRange: "May 10–16, 2027", mainDay: "Saturday, May 15, 2027" },
  "june-2027-impact-reporting": { weekRange: "June 14–20, 2027", mainDay: "Saturday, June 19, 2027" },
};

/**
 * Flexible activity options. During the Program Week, any participating
 * region, chapter, school or partner may pick one suitable day to deliver
 * any of these — physically, online, or hybrid.
 */
export type FlexibleActivity = {
  label: string;
  modes: ParticipationMode[];
  description: string;
};

export const flexibleActivities: FlexibleActivity[] = [
  { label: "Host a Webinar", modes: ["Online", "Hybrid"], description: "Open or themed webinar led by a school, partner, or chapter." },
  { label: "Run School Training", modes: ["Physical", "Hybrid"], description: "In-school training session for teachers or learners." },
  { label: "Organize Local Chapter Outreach", modes: ["Physical"], description: "Grassroots outreach led by an SCEF local chapter." },
  { label: "Lead an Advocacy Walk", modes: ["Physical", "Hybrid"], description: "Community walk amplifying the monthly advocacy theme." },
  { label: "Host a Media Session", modes: ["Online", "Hybrid"], description: "Studio talk, podcast, or NESA TV / It's In Me Radio episode." },
  { label: "Conduct a Partner Roundtable", modes: ["Online", "Physical", "Hybrid"], description: "Convene CSR partners, NGOs, or institutions." },
  { label: "Organize Edu-Tourism", modes: ["Physical"], description: "Cross-school or cross-region educational visit." },
  { label: "Request SCEF School Visit", modes: ["Physical"], description: "Invite an SCEF team or ambassador to your school." },
  { label: "Submit Activity Report", modes: ["Online"], description: "Upload attendance, photos, and impact notes after delivery." },
];

export const getMonthlyProgram = (slug: string) =>
  monthlyPrograms.find((p) => p.slug === slug);

export const getProgramSchedule = (slug: string) => programSchedule[slug];

/**
 * @deprecated Replaced by the flexible Program Week model.
 * Kept only for backward compatibility — do not use in new code.
 */
export const weeklyStructure: { day: string; activity: string }[] = [];

