/**
 * EduAid-Africa Scholarship 2026–2027 shared constants.
 * Keep titles in English; translate at render time via LocaleContext when needed.
 */
export const SCHOLARSHIP_APP_TYPE = "eduaid_scholarship_2026";

export const SCHOLARSHIP_CATEGORIES = [
  {
    slug: "vocational",
    title: "Vocational & Technical Skills",
    desc: "Hands-on trades, technical skills, entrepreneurship and vocational training.",
    eligibility: "16+ · Trade or technical pathway",
  },
  {
    slug: "college",
    title: "College & Polytechnic Support",
    desc: "Students enrolled in colleges, polytechnics and technical institutions.",
    eligibility: "Admission letter or enrolment proof",
  },
  {
    slug: "tertiary",
    title: "Tertiary Education Support",
    desc: "University-level undergraduate and postgraduate applicants.",
    eligibility: "Academic record + admission letter",
  },
  {
    slug: "professional",
    title: "Professional Certification",
    desc: "Short courses, digital skills, teacher training and career development.",
    eligibility: "Career goals + relevant background",
  },
] as const;

export type ScholarshipCategorySlug =
  (typeof SCHOLARSHIP_CATEGORIES)[number]["slug"];

export const PRIORITY_GROUPS = [
  "Persons with disabilities",
  "Special needs school graduates",
  "Female students in STEM",
  "Rural / underserved community",
  "Vocational & technical learners",
  "Rebuild My School Africa community",
] as const;

export const STUDY_AREAS = [
  "Engineering & Technology",
  "Health & Medical Sciences",
  "Education & Teaching",
  "Agriculture & Environmental Studies",
  "ICT & Digital Skills",
  "Vocational Skills (tailoring, carpentry, electrical, welding…)",
  "Business & Entrepreneurship",
] as const;

export const TIMELINE = [
  { label: "Applications Open", value: "Reporting in progress" },
  { label: "Eligibility Review", value: "Reporting in progress" },
  { label: "Online Exam / Screening", value: "Reporting in progress" },
  { label: "Shortlist Announcement", value: "Reporting in progress" },
  { label: "Final Selection", value: "Reporting in progress" },
  { label: "Wallet Disbursement", value: "Reporting in progress" },
  { label: "Onboarding & Mentorship", value: "Reporting in progress" },
] as const;

export const DOC_TYPES = [
  { key: "id", label: "Valid ID", required: true },
  { key: "admission", label: "Admission Letter", required: false },
  { key: "academic", label: "Academic / Skills Record", required: true },
  { key: "statement", label: "Statement of Need", required: true },
  { key: "recommendation", label: "Recommendation Letter (optional)", required: false },
] as const;
