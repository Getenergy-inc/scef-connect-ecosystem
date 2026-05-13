import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  GraduationCap,
  School,
  Heart,
  Users,
  BookOpen,
  Building2,
  Megaphone,
  HandCoins,
  LineChart,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";

const sections = [
  {
    icon: BookOpen,
    title: "Overview",
    body: "EduAid-Africa transforms recognition into measurable education impact through a continuous cycle of programs designed to support learners, schools, teachers and communities across Africa.",
  },
  {
    icon: Megaphone,
    title: "Monthly EduAid-Africa Webinars",
    body: "Free monthly webinars equip educators, parents and community leaders with practical knowledge on scholarships, digital learning, career pathways and education advocacy.",
  },
  {
    icon: Building2,
    title: "Rebuild My School Africa Impact Cycle",
    body: "Identify schools in need, mobilise CSR and donor support, deliver rebuilding/renovation works, and report measurable outcomes to all stakeholders.",
  },
  {
    icon: Heart,
    title: "Send a Child to School Campaign",
    body: "Sponsor school fees, uniforms, books and learning materials for vulnerable children through transparent, designated donor accounts.",
  },
  {
    icon: GraduationCap,
    title: "My Career, My Life Career Pathways",
    body: "Career guidance and life-skills sessions for secondary and tertiary students, hosted in partnership with schools, ambassadors and local chapters.",
  },
  {
    icon: Users,
    title: "Girls & Women Education Support",
    body: "Targeted programs for girls and women — re-entry support, mentorship, scholarships and protection against barriers to education.",
  },
  {
    icon: BookOpen,
    title: "eLibrary Africa / eLibrary Nigeria Access",
    body: "Free and subsidised access to digital learning resources for schools, students, teachers and self-learners through SCEF eLibrary platforms.",
  },
  {
    icon: HandCoins,
    title: "School Adoption & CSR Partnership",
    body: "Long-term adoption of schools by corporates, foundations and diaspora groups under structured CSR partnership agreements.",
  },
  {
    icon: School,
    title: "Local Chapter Education Projects",
    body: "Country, state and city chapters run grassroots education projects — outreach, training, advocacy walks and community learning hubs.",
  },
  {
    icon: LineChart,
    title: "Impact Reporting & Donor Accountability",
    body: "Quarterly impact reports, regional participation reports and donor-facing dashboards ensure transparency and traceable outcomes.",
  },
];

const ctas = [
  { label: "Sponsor EduAid-Africa", to: "/wallet/donate?fund=eduaid-africa" },
  { label: "Adopt a School", to: "/wallet/donate?fund=adopt-school" },
  { label: "Send a Child to School", to: "/wallet/donate?fund=send-a-child-to-school" },
  { label: "Support eLibrary Africa", to: "/wallet/donate?fund=elibrary-africa" },
  { label: "Sponsor Teacher Training", to: "/wallet/donate?fund=teacher-training" },
  { label: "Join EduAid Webinar", to: "/#monthly-advocacy-calendar" },
  { label: "Become an EduAid Partner", to: "/partner-with-us" },
];

const EduAidMasterTimeline = () => {
  return (
    <PageShell>
      <Helmet>
        <title>EduAid-Africa Master Timeline 2026–2027 | SCEF</title>
        <meta
          name="description"
          content="EduAid-Africa transforms education support into measurable impact through scholarships, school rebuilding, teacher training, digital learning, girls education, career guidance, CSR partnerships, local chapter projects and monthly impact reporting."
        />
        <link
          rel="canonical"
          href="https://santoscreations.org/eduaid-africa/master-timeline"
        />
      </Helmet>

      {/* Hero */}
      <section className="bg-scef-blue-darker py-16 text-white md:py-20">
        <div className="container mx-auto px-6 md:px-8">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold ring-1 ring-scef-gold/30">
            <Sparkles className="h-3.5 w-3.5" /> EduAid-Africa 2026–2027
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl">
            EduAid-Africa Master Timeline 2026–2027
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            EduAid-Africa transforms education support into measurable impact
            through scholarships, school rebuilding, teacher training, digital
            learning, girls education, career guidance, CSR partnerships, local
            chapter projects, and monthly impact reporting.
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {ctas.slice(0, 4).map((c) => (
              <Button key={c.label} asChild variant="secondary">
                <Link to={c.to}>{c.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-6 md:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            {sections.map(({ icon: Icon, title, body }) => (
              <Card key={title} className="border-border bg-card">
                <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-scef-gold/15 text-scef-blue-darker">
                    <Icon className="h-5 w-5" />
                  </span>
                  <CardTitle className="font-display text-base text-scef-blue-darker">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Final CTA block */}
          <div className="mt-12 rounded-2xl bg-scef-blue-darker p-8 text-white md:p-10">
            <h2 className="font-display text-2xl font-bold">Support EduAid-Africa</h2>
            <p className="mt-2 text-sm text-white/80">
              Choose a designated fund or partnership pathway and help convert
              recognition into measurable education impact.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {ctas.map((c) => (
                <Button key={c.label} asChild variant="heroOutline">
                  <Link to={c.to}>
                    {c.label} <ArrowRight className="ml-1 h-3.5 w-3.5" />
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

export default EduAidMasterTimeline;
