import { PageShell } from "@/components/layout/PageShell";
import { MonthlyAdvocacyCalendar } from "@/components/sections/MonthlyAdvocacyCalendar";

const MonthlyProgramCalendar = () => (
  <PageShell
    title="Monthly Advocacy, Webinar & Training Calendar"
    description="Browse SCEF's July 2026 to June 2027 monthly program calendar covering teacher training, school leadership, digital learning, girls' education, TVET, CSR funding, and impact reporting."
    eyebrow="July 2026 – June 2027"
    heading="Monthly Advocacy, Webinar & Training Calendar"
    intro="Browse SCEF's 12-month program calendar across teacher training, school leadership, digital learning, girls' education, TVET, CSR funding, and impact reporting."
  >
    <MonthlyAdvocacyCalendar />
  </PageShell>
);

export default MonthlyProgramCalendar;
