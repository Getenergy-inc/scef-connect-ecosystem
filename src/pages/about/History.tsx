import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";

const timeline = [
  { year: "1997", title: "Foundational beginnings", body: "The seeds of SCEF are planted through grassroots education and youth development work." },
  { year: "2010", title: "Formal incorporation", body: "Santos Creations Educational Foundation is formally established as a not-for-profit dedicated to African education." },
  { year: "2015", title: "EduAid-Africa launches", body: "Direct learner sponsorship program begins, supporting school fees, books and meals for vulnerable children." },
  { year: "2018", title: "NESA-Africa standards engine", body: "The New Education Standards Award Africa is created as a continental recognition mechanism." },
  { year: "2021", title: "Education Online Africa & eLibrary", body: "Digital learning and reading access expand through Education Online Africa and eLibrary Nigeria." },
  { year: "2024", title: "Pan-African chapter rollout", body: "Local chapters are activated across countries, states and cities to deliver impact community by community." },
  { year: "2026", title: "Unified SCEF ecosystem", body: "Launch of the unified web ecosystem, monthly advocacy calendar and the Vision 2037 roadmap." },
];

const History = () => (
  <PageShell
    title="Our History"
    description="The SCEF journey since 1997 — milestones, founders and the path to becoming a Pan-African education NGO."
    eyebrow="About SCEF"
    heading="Our History"
    intro="From grassroots education work to a Pan-African education institution — the SCEF journey has always centered learners, teachers and communities."
  >
    <section className="container mx-auto px-4 py-12 md:py-16">
      <ol className="relative max-w-3xl mx-auto border-l-2 border-scef-blue/15 pl-6 space-y-8">
        {timeline.map((t) => (
          <li key={t.year} className="relative">
            <span className="absolute -left-[34px] top-1.5 w-5 h-5 rounded-full bg-scef-gold ring-4 ring-background" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-1">{t.year}</p>
            <h2 className="font-display text-lg md:text-xl font-semibold text-scef-blue-darker mb-1">{t.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.body}</p>
          </li>
        ))}
      </ol>
    </section>

    <section className="bg-muted/30 border-t border-scef-blue/10">
      <div className="container mx-auto px-4 py-12 md:py-16 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-scef-blue-darker mb-4">Continue the story</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">Help write the next chapter of African education by joining, partnering with or supporting SCEF.</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="bg-scef-blue hover:bg-scef-blue-darker text-white">
            <Link to="/about/vision-2037">Read Vision 2037 <ArrowRight className="w-4 h-4 ml-1.5" /></Link>
          </Button>
          <Button asChild variant="outline" className="border-scef-blue/30">
            <Link to="/get-involved/membership">Join SCEF</Link>
          </Button>
          <Button asChild variant="outline" className="border-scef-blue/30">
            <Link to="/wallet/donate">Donate</Link>
          </Button>
        </div>
      </div>
    </section>
  </PageShell>
);

export default History;
