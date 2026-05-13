import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Award, Heart, Tv, GraduationCap, Users, Building2, Megaphone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageShell from "@/components/layout/PageShell";

interface Phase {
  id: string;
  date: string;
  title: string;
  bullets: string[];
}

const summaryStages: { date: string; label: string }[] = [
  { date: "May 20–31, 2026", label: "Public Pre-Nomination Launch" },
  { date: "June 2026", label: "Evidence Education, Africa Education Icon Awareness & First EduAid Webinar" },
  { date: "July 2026", label: "Platinum TV Show, Africa Education Icon TV Show, CSR & Diaspora Recognition" },
  { date: "August 2026", label: "Gold Recognition, Influencers, Footballers, Musicians, Youth & Culture" },
  { date: "September 2026", label: "Momentum Show, Voting Education & Gala Build-Up" },
  { date: "October 22, 2026", label: "Blue Garnet Awards Gala" },
  { date: "Nov 2026 – Oct 2027", label: "EduAid-Africa Webinars, Rebuild My School Africa, CSR/Donor Campaigns & Impact Reporting" },
];

const phases: Phase[] = [
  {
    id: "phase-1",
    date: "May 20 – May 31, 2026",
    title: "Phase 1 — Pre-Nomination Launch",
    bullets: [
      "Launch public pre-nomination campaign",
      "Start influencer, footballer, and musician recognition campaign",
      "Begin evidence education",
      "Start social media push across Instagram, TikTok, Facebook, X, LinkedIn, WhatsApp, Telegram, YouTube Shorts and other platforms",
    ],
  },
  {
    id: "phase-2",
    date: "June 2026",
    title: "Phase 2 — Public Education, Evidence & EduAid Webinar Launch",
    bullets: [
      "Internal campaign strengthening",
      "Evidence education campaign",
      "First EduAid-Africa webinar preparation and launch",
      "Africa Education Icon awareness",
      "CSR awareness preparation",
    ],
  },
  {
    id: "phase-3",
    date: "July 2026",
    title: "Phase 3 — Platinum TV, Africa Education Icon & CSR Build-Up",
    bullets: [
      "Platinum Award TV countdown",
      "Platinum Award TV Online Show on July 11, 2026",
      "Africa Education Icon countdown",
      "Diaspora African Certificate of Recognition pre-nomination",
      "CSR for Education pre-nomination campaign",
      "Africa Education Icon Online TV Show on July 25, 2026",
    ],
  },
  {
    id: "phase-4",
    date: "August 2026",
    title: "Phase 4 — Gold Recognition, Youth & Cultural Impact",
    bullets: [
      "Gold Special Recognition campaign",
      "Gold Recognition TV countdown",
      "Gold Certificate / Gold Special Recognition Online TV Show on August 15, 2026",
      "Evidence cleanup",
      "Membership, ambassadors, and local chapter media campaign",
    ],
  },
  {
    id: "phase-5",
    date: "September 2026",
    title: "Phase 5 — Momentum, Voting Education & Gala Build-Up",
    bullets: [
      "Shortlist-readiness education",
      "Voting education campaign",
      "Momentum Show countdown",
      "NESA-Africa Momentum Online TV Show on September 19, 2026",
      "Gala build-up, ticket videos, sponsor invitations, merchandise teaser, Blue Garnet awareness",
    ],
  },
  {
    id: "phase-6",
    date: "October 2026",
    title: "Phase 6 — Blue Garnet Awards Gala & Impact Transition",
    bullets: [
      "Gala countdown",
      "Partner spotlights",
      "Nominee stories",
      "Final ticket push",
      "NESA-Africa 2026 Gala / Blue Garnet Awards Gala on October 22, 2026",
      "Recognition-to-impact transition",
      "Rebuild My School Africa launch",
    ],
  },
];

const monthlyImpact: { month: string; theme: string }[] = [
  { month: "November 2026", theme: "From Awards to Impact" },
  { month: "December 2026", theme: "School Nomination and Special Needs Awareness" },
  { month: "January 2027", theme: "New Year Education-Impact Activation" },
  { month: "February 2027", theme: "CSR for Inclusive Education" },
  { month: "March 2027", theme: "Regional School Shortlisting" },
  { month: "April 2027", theme: "Infrastructure and Learning Environment" },
  { month: "May 2027", theme: "One-Year Recognition-to-Impact Review" },
  { month: "June 2027", theme: "Mid-Year Impact Review" },
  { month: "July 2027", theme: "Diaspora Support for African Schools" },
  { month: "August 2027", theme: "Youth, Volunteers and Ambassadors for School Impact" },
  { month: "September 2027", theme: "Final School Intervention Funding Push" },
  { month: "October 2027", theme: "Final Impact Reporting and Next-Cycle Planning" },
];

const ctas: { label: string; to: string; icon: any }[] = [
  { label: "Recommend an Education Champion", to: "/nominate", icon: Award },
  { label: "Sponsor NESA-Africa", to: "/partner-with-us", icon: Heart },
  { label: "Buy Blue Garnet Gala Ticket", to: "/awards/blue-garnet", icon: Sparkles },
  { label: "Sponsor NESA TV", to: "/media/nesa-tv", icon: Tv },
  { label: "Support Rebuild My School Africa", to: "/programs/rebuild-my-school-africa", icon: Building2 },
  { label: "Sponsor EduAid-Africa Webinar", to: "/media/eduaid-webinars", icon: GraduationCap },
  { label: "Become a Local Chapter Partner", to: "/chapters", icon: Users },
  { label: "Join as Ambassador", to: "/get-involved/ambassador", icon: Megaphone },
  { label: "Become a Media Partner", to: "/partner-with-us", icon: Tv },
  { label: "Support CSR for Education", to: "/csr-funding", icon: Heart },
];

const NesaMasterTimeline = () => {
  return (
    <PageShell
      title="NESA-Africa Master Timeline 2026–2027"
      description="The complete NESA-Africa operating timeline from May 20, 2026 to October 2027 — pre-nomination, online TV shows, Blue Garnet Awards Gala, EduAid-Africa webinars, Rebuild My School Africa and CSR/donor impact reporting."
      eyebrow="NESA-Africa"
      heading="NESA-Africa Master Timeline 2026–2027"
      intro="From public recognition to measurable school impact — NESA-Africa 2026 begins with pre-nomination campaigns on May 20, 2026, delivers the Blue Garnet Awards Gala on October 22, 2026, and transitions into EduAid-Africa and Rebuild My School Africa impact cycles through October 2027."
    >
      {/* Hero CTAs */}
      <section className="container mx-auto px-4 pt-10">
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg"><a href="#timeline">View Timeline</a></Button>
          <Button asChild size="lg" variant="secondary"><Link to="/partner-with-us">Sponsor NESA-Africa</Link></Button>
          <Button asChild size="lg" variant="outline"><Link to="/nominate">Nominate / Recommend</Link></Button>
          <Button asChild size="lg" variant="outline"><Link to="/awards/blue-garnet">Buy Gala Ticket</Link></Button>
          <Button asChild size="lg" variant="outline"><Link to="/programs/rebuild-my-school-africa">Support Rebuild My School Africa</Link></Button>
        </div>
      </section>

      {/* Section 1: Timeline Summary */}
      <section id="timeline" className="container mx-auto px-4 py-14">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-scef-blue-darker mb-8">
          Timeline Summary
        </h2>
        <ol className="relative border-l-2 border-scef-gold/40 pl-6 space-y-6">
          {summaryStages.map((s, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[34px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-scef-gold text-scef-blue-dark text-xs font-bold">
                {i + 1}
              </span>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold">
                {s.date}
              </p>
              <p className="text-base md:text-lg text-scef-blue-darker font-semibold">
                {s.label}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Section 2: Phase breakdown */}
      <section className="bg-scef-pattern border-y border-scef-blue/10">
        <div className="container mx-auto px-4 py-14">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-scef-blue-darker mb-8">
            Full Phase Breakdown
          </h2>
          <Accordion type="multiple" className="space-y-3">
            {phases.map((p) => (
              <AccordionItem
                key={p.id}
                value={p.id}
                className="border border-scef-blue/10 bg-background rounded-lg px-4"
              >
                <AccordionTrigger className="text-left">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold">
                      {p.date}
                    </p>
                    <p className="text-base md:text-lg font-bold text-scef-blue-darker">
                      {p.title}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    {p.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button asChild size="sm" variant="secondary"><Link to="/partner-with-us">Sponsor this phase</Link></Button>
                    <Button asChild size="sm" variant="outline"><Link to="/nominate">Recommend a champion</Link></Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Section 3: Post-Gala Impact Timeline */}
      <section className="container mx-auto px-4 py-14">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-scef-blue-darker mb-2">
          EduAid-Africa / Rebuild My School Africa Impact Cycle
        </h2>
        <p className="text-muted-foreground mb-3 max-w-3xl">
          After the October 2026 gala, the campaign shifts from recognition to measurable education impact.
        </p>
        <p className="text-sm font-semibold text-scef-blue-darker mb-8">
          Monthly cycle: EduAid Webinar → School Story → CSR / Donor Appeal → Regional Update → Impact Report
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {monthlyImpact.map((m) => (
            <Card key={m.month} className="border-scef-blue/10">
              <CardHeader className="pb-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {m.month}
                </p>
                <CardTitle className="text-lg text-scef-blue-darker">{m.theme}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 4: Key CTAs */}
      <section className="bg-scef-pattern border-y border-scef-blue/10">
        <div className="container mx-auto px-4 py-14">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-scef-blue-darker mb-8">
            Take Action
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ctas.map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.label}
                  to={c.to}
                  className="group flex items-center justify-between gap-3 rounded-lg border border-scef-blue/10 bg-background px-4 py-4 hover:border-scef-gold hover:shadow-md transition"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-scef-gold/15 text-scef-gold">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="font-semibold text-scef-blue-darker">{c.label}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-scef-gold group-hover:translate-x-1 transition" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final operating rule */}
      <section className="container mx-auto px-4 py-14">
        <div className="rounded-xl border-2 border-scef-gold/40 bg-scef-blue-darker text-white p-6 md:p-10 text-center">
          <p className="text-base md:text-xl font-semibold leading-relaxed">
            “May 20 starts public recognition. October 22 delivers the Blue Garnet Awards Gala.
            November 2026 to October 2027 turns recognition into measurable school impact.”
          </p>
        </div>
      </section>
    </PageShell>
  );
};

export default NesaMasterTimeline;
