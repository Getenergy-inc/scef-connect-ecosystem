/**
 * Training & Career calendars data — used across landing sections and dedicated pages.
 */

export type CalendarRow = {
  month: string;
  focus: string;
  audience: string;
};

export const eduAidWebinarCalendar: CalendarRow[] = [
  { month: "July 2026", focus: "Teacher Training & Classroom Innovation", audience: "Teachers" },
  { month: "August 2026", focus: "School Management & Leadership", audience: "School owners, principals, administrators" },
  { month: "September 2026", focus: "Inclusive Education & Special Needs Support", audience: "Teachers, special needs educators, school managers" },
  { month: "October 2026", focus: "Digital Learning & EdTech Tools", audience: "Teachers, ICT coordinators, schools" },
  { month: "November 2026", focus: "Curriculum Development & Assessment", audience: "Teachers, academic heads" },
  { month: "December 2026", focus: "Education Policy, Governance & Compliance", audience: "School management, NGOs, chapter leaders" },
  { month: "January 2027", focus: "Career Guidance Systems for Schools", audience: "Counselors, teachers, school leaders" },
  { month: "February 2027", focus: "Girls Education, Gender Inclusion & Safeguarding", audience: "Teachers, women/girls program leads" },
  { month: "March 2027", focus: "TVET & Vocational Education Development", audience: "Vocational schools, technical trainers" },
  { month: "April 2027", focus: "School Funding, CSR & Grant Readiness", audience: "School owners, NGOs, chapter leaders" },
  { month: "May 2027", focus: "Community Education & Local Chapter Models", audience: "LCPs, volunteers, ambassadors" },
  { month: "June 2027", focus: "Monitoring, Evaluation & Impact Reporting", audience: "Admins, CSR partners, project managers" },
];

export const myCareerMyLifeCalendar: CalendarRow[] = [
  { month: "August 2026", focus: "Discovering My Strengths & Interests", audience: "JSS students" },
  { month: "September 2026", focus: "Choosing Subjects for Future Careers", audience: "JSS3 / SS1 transition" },
  { month: "October 2026", focus: "Career Pathways After Secondary School", audience: "SS2 students" },
  { month: "November 2026", focus: "University, Polytechnic, TVET & Vocational Options", audience: "SS2/SS3 students" },
  { month: "December 2026", focus: "Digital Skills and Future Jobs", audience: "JSS / SSS students" },
  { month: "January 2027", focus: "Entrepreneurship and Self-Discovery", audience: "SS2/SS3 students" },
  { month: "February 2027", focus: "Girls in STEM, TVET and Leadership", audience: "Girls and young women" },
  { month: "March 2027", focus: "Career Guidance for Special Needs Students", audience: "Inclusive schools" },
  { month: "April 2027", focus: "Workplace Readiness and Communication Skills", audience: "SS3 students" },
  { month: "May 2027", focus: "Financial Literacy and Career Planning", audience: "SS2/SS3 students" },
  { month: "June 2027", focus: "Mentorship, Volunteering and Leadership", audience: "All students" },
  { month: "July 2027", focus: "My Career My Life Annual Student Showcase", audience: "Schools and partners" },
];
