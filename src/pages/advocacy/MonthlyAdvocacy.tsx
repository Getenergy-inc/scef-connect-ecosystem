import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Users } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { monthlyPrograms } from "@/config/monthlyCalendar";
import { MasterTimelineCTA } from "@/components/nesa/MasterTimelineCTA";

const MonthlyAdvocacy = () => (
  <PageShell
    title="Monthly Advocacy Services"
    description="A focused education, advocacy and capacity-building theme every month from July 2026 to June 2027."
    eyebrow="Advocacy & Training"
    heading="Monthly Advocacy, Webinar & Training Calendar"
    intro="Every month, SCEF leads a focused education, advocacy and capacity-building theme across Africa — delivered through webinars, school visits, local chapter activities, advocacy walks, media campaigns and partner-supported training."
  >
    <MasterTimelineCTA />
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {monthlyPrograms.map((p) => (
          <article key={p.slug} className="rounded-xl border border-scef-blue/10 bg-card p-6 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-scef-gold mb-2">
              <CalendarDays className="w-4 h-4" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">{p.month}</span>
            </div>
            <h2 className="font-display text-lg font-semibold text-scef-blue-darker mb-2 leading-snug">{p.title}</h2>
            <p className="text-sm text-muted-foreground flex-1">{p.summary}</p>

            <div className="flex flex-wrap gap-1.5 mt-4">
              {p.modes.map((m) => (
                <Badge key={m} variant="outline" className="border-scef-blue/30 text-scef-blue-darker text-[10px]">{m}</Badge>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-3">
              <Users className="w-3.5 h-3.5" />
              <span>{p.audience}</span>
            </div>

            <div className="flex gap-2 mt-5">
              <Button asChild size="sm" className="bg-scef-blue hover:bg-scef-blue-darker text-white flex-1">
                <Link to={`/calendar/${p.slug}`}>View & Register <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>

    <section className="bg-muted/30 border-y border-scef-blue/10">
      <div className="container mx-auto px-4 py-12 md:py-16 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-scef-blue-darker mb-4">Bring a monthly program to your school or chapter</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Schools, NGOs, partners, volunteers, ambassadors and local chapters can host any monthly theme as a flexible program week.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="bg-scef-blue hover:bg-scef-blue-darker text-white">
            <Link to="/partner-with-us">Partner With Us</Link>
          </Button>
          <Button asChild variant="outline" className="border-scef-blue/30">
            <Link to="/chapters">Find a Local Chapter</Link>
          </Button>
          <Button asChild variant="outline" className="border-scef-blue/30">
            <Link to="/get-involved/membership">Join SCEF</Link>
          </Button>
        </div>
      </div>
    </section>
  </PageShell>
);

export default MonthlyAdvocacy;
