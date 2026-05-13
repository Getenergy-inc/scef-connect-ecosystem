import { Link } from "react-router-dom";
import { ArrowRight, Target, Globe2, GraduationCap, Leaf, HeartHandshake, ShieldCheck } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";

const pillars = [
  { icon: GraduationCap, title: "Universal Access to Quality Learning", body: "Close the access gap for African learners through EduAid-Africa, eLibrary and Education Online Africa." },
  { icon: Target, title: "A Continuous Education Standards System", body: "Operate the NESA-Africa engine as Africa's recognition and standards mechanism for education." },
  { icon: Globe2, title: "Pan-African Network of Chapters", body: "Country, state, city and community chapters delivering education impact at the local level." },
  { icon: Leaf, title: "ESG, Health & Sustainability", body: "Embed climate literacy, health education and green schools across the continent." },
  { icon: HeartHandshake, title: "Inclusion First", body: "Women & girls, special needs and out-of-school children remain non-negotiable focus areas." },
  { icon: ShieldCheck, title: "Trust, Evidence & Verification", body: "Verified data, certificate verification and transparent reporting on every program." },
];

const milestones = [
  { year: "2026", text: "Launch of the unified SCEF ecosystem, monthly advocacy calendar and local chapter rollout." },
  { year: "2028", text: "1,000 active chapters and full continental coverage of NESA-Africa categories." },
  { year: "2031", text: "Education Online Africa scaled as a reference platform for African workforce learning." },
  { year: "2034", text: "Rebuild My School Africa delivers infrastructure across all 5 African regions." },
  { year: "2037", text: "SCEF positioned as a leading Pan-African education transformation institution aligned to SDG 4 and AU Agenda 2063." },
];

const Vision2037 = () => (
  <PageShell
    title="Vision 2037"
    description="SCEF's continental education agenda from 2026 to 2037 — anchored on SDG 4 and AU Agenda 2063."
    eyebrow="About SCEF"
    heading="Vision 2037: A Continent Where Every Learner Counts"
    intro="A 12-year roadmap to position SCEF as a leading Pan-African education transformation institution — aligned to SDG 4 (Quality Education) and the African Union Agenda 2063."
  >
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {pillars.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-xl border border-scef-blue/10 bg-card p-6 hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-lg bg-scef-gold/15 text-scef-gold flex items-center justify-center mb-4">
              <Icon className="w-5 h-5" />
            </div>
            <h2 className="font-display text-lg font-semibold text-scef-blue-darker mb-2">{title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-muted/30 border-y border-scef-blue/10">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-scef-blue-darker mb-8">Roadmap to 2037</h2>
        <ol className="space-y-5 max-w-3xl">
          {milestones.map((m) => (
            <li key={m.year} className="flex gap-5">
              <div className="shrink-0 w-16 text-right font-display font-bold text-scef-gold">{m.year}</div>
              <div className="border-l-2 border-scef-blue/20 pl-5 text-muted-foreground">{m.text}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="container mx-auto px-4 py-12 md:py-16 text-center">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-scef-blue-darker mb-4">Be part of Vision 2037</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto mb-6">Join SCEF as a member, ambassador, partner or donor and help deliver the next 12 years of African education transformation.</p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild className="bg-scef-blue hover:bg-scef-blue-darker text-white">
          <Link to="/get-involved/membership">Become a Member <ArrowRight className="w-4 h-4 ml-1.5" /></Link>
        </Button>
        <Button asChild variant="outline" className="border-scef-blue/30">
          <Link to="/partner-with-us">Partner With Us</Link>
        </Button>
        <Button asChild variant="outline" className="border-scef-blue/30">
          <Link to="/wallet/donate">Donate</Link>
        </Button>
      </div>
    </section>
  </PageShell>
);

export default Vision2037;
