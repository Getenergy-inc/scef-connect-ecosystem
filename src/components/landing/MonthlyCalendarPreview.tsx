import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Laptop, Sparkles } from "lucide-react";

const months = [
  {
    icon: BookOpen,
    month: "Featured",
    title: "Teacher Training & Classroom Innovation",
    body: "Equipping educators with modern pedagogy, lesson design, and classroom innovation tools.",
  },
  {
    icon: Laptop,
    month: "Featured",
    title: "Digital Learning & EdTech Tools",
    body: "Expanding digital learning access, EdTech adoption, and AI-supported teaching across Africa.",
  },
  {
    icon: Sparkles,
    month: "Featured",
    title: "Girls Education, Gender Inclusion & Safeguarding",
    body: "Advancing girls' education, gender inclusion, child safeguarding, and inclusive learning support.",
  },
];

export const MonthlyCalendarPreview = () => {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-scef-gold">
            12-Month Calendar · Jul 2026 – Jun 2027
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-4xl">
            Monthly Advocacy, Webinar &amp; Training Calendar
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Explore SCEF's July 2026 to June 2027 calendar covering teacher
            training, school leadership, digital learning, inclusive education,
            girls' education, TVET, CSR funding, and impact reporting.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {months.map(({ icon: Icon, ...m }) => (
            <article
              key={m.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-scef-gold/40 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-scef-blue-darker/10 text-scef-blue-darker">
                <Icon className="h-6 w-6" />
              </div>
              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-scef-gold">
                {m.month}
              </p>
              <h3 className="mt-1 font-display text-lg font-bold leading-snug text-scef-blue-darker">
                {m.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {m.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" className="bg-scef-blue-darker text-white hover:bg-scef-blue-darker/90">
            <Link to="/monthly-program-calendar">
              View Full Monthly Calendar
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MonthlyCalendarPreview;
