import { Link } from "react-router-dom";
import { Calendar, Award, Sparkles, Users, Tv, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PhaseEvent {
  index: number;
  title: string;
  date: string;
  status: string;
  description: string;
  tags: string[];
  agc?: boolean;
}

const phase1Events: PhaseEvent[] = [
  {
    index: 1,
    title: "Public Pre-Nomination Activation",
    date: "20 May 2026",
    status: "Upcoming",
    description:
      "Launches the early public engagement phase through pre-nomination forms, graphics, and a weekly storytelling calendar. Invites the general public — especially Gen Z audiences across Africa, the African diaspora, and friends of Africa — to identify public figures and changemakers supporting education before the official nomination and voting portal opens.",
    tags: ["Pre-Nomination", "Gen Z Engagement", "Public Database", "Social Media Activation"],
  },
  {
    index: 2,
    title: "Africa Education Icon Nominations Open & Close",
    date: "12 July – 12 September 2026",
    status: "Upcoming",
    description:
      "Two-month nomination window for lifetime achievement entries. Opens on 12 July and closes on 12 September 2026. Scope: Africa Education Icon — Lifetime Achievement (2006–2026).",
    tags: ["Lifetime Achievement", "Nomination Window", "Legacy Pipeline"],
  },
  {
    index: 3,
    title: "Jury Onboarding",
    date: "29 June – 10 July 2026",
    status: "Upcoming",
    description:
      "Selected jury members complete orientation, governance review, conflict-of-interest guidance, and scoring calibration.",
    tags: ["Integrity", "Governance", "Scoring Calibration"],
  },
  {
    index: 4,
    title: "Platinum Recognition Show",
    date: "5 July 2026",
    status: "Upcoming",
    description:
      "Launches the public season with baseline recognition of institutional and leadership impact across education.",
    tags: ["Credibility", "Visibility", "Campaign Opening"],
  },
  {
    index: 5,
    title: "Gold Certificate Nominations Close",
    date: "10 July 2026",
    status: "Upcoming",
    description: "Final deadline for Influencers Education Impact Award entries before voting and category review.",
    tags: ["Pipeline Lock-In", "Category Review", "Voting Readiness"],
    agc: true,
  },
  {
    index: 6,
    title: "Africa Education Icon Show",
    date: "12 July 2026",
    status: "Upcoming",
    description:
      "Honours transformational leaders whose work has shaped African education over the past two decades.",
    tags: ["Authority", "Continental Positioning", "Lifetime Recognition"],
  },
  {
    index: 7,
    title: "Gold Certificate Voting",
    date: "20 July – 15 August 2026",
    status: "Upcoming",
    description:
      "Mass public voting phase across eligible categories using AGC participation credits, with regional activation and audience growth.",
    tags: ["Participation", "Audience Growth", "Regional Activation"],
    agc: true,
  },
  {
    index: 8,
    title: "Gold Certificate Winners Show",
    date: "22 August 2026",
    status: "Upcoming",
    description: "Official announcement of Influencers Education Impact Award 2026 Edition winners.",
    tags: ["Amplification", "Media Assets", "Winner Visibility"],
    agc: true,
  },
  {
    index: 9,
    title: "Momentum Phase",
    date: "23 August – 15 September 2026",
    status: "Upcoming",
    description:
      "A focused storytelling, media, partnership, and audience-building phase designed to carry the visibility from the Gold Certificate Winners Show into the final Blue Garnet voting window.",
    tags: ["Momentum", "Storytelling", "Media Build-Up", "Partnership Visibility"],
  },
  {
    index: 10,
    title: "Blue Garnet Voting",
    date: "16 September – 22 October 2026",
    status: "Upcoming",
    description:
      "Final competitive voting window leading directly into the gala. Voting closes on gala day for transparency and suspense.",
    tags: ["Prestige", "Suspense", "Public + Jury"],
    agc: true,
  },
  {
    index: 11,
    title: "Blue Garnet Awards Gala",
    date: "22 October 2026",
    status: "Upcoming",
    description:
      "The peak event of the season — a live continental recognition ceremony and media moment celebrating Africa's education changemakers.",
    tags: ["Continental Spotlight", "Live Broadcast", "Main Gala", "Recognition", "Impact"],
    agc: true,
  },
];

const phase2Events: PhaseEvent[] = [
  {
    index: 1,
    title: "Rebuild My School Africa Launch",
    date: "23 October 2026",
    status: "Upcoming",
    description:
      "Official transition from awards visibility into school-focused intervention and social impact across African regions.",
    tags: ["Legacy", "Social Impact", "Regional Schools"],
  },
  {
    index: 2,
    title: "Regional School Nomination & Verification",
    date: "November – December 2026",
    status: "Upcoming",
    description:
      "Communities, chapters, partners, and the public nominate formal, informal, and special needs schools for possible intervention. Schools are reviewed based on need, evidence, location, and impact potential.",
    tags: ["School Nomination", "Verification", "Regional Mapping"],
  },
  {
    index: 3,
    title: "EduAid Africa Scholarship & Learning Access Planning",
    date: "December 2026 – January 2027",
    status: "Upcoming",
    description:
      "EduAid Africa structures scholarship support, learning access services, student support pathways, and education aid planning for selected communities and school categories.",
    tags: ["Scholarships", "Learning Access", "Education Aid"],
  },
  {
    index: 4,
    title: "Infrastructure & Special Needs School Support Planning",
    date: "January – March 2027",
    status: "Upcoming",
    description:
      "Rebuild My School Africa prepares intervention plans for infrastructure improvement, special needs school support, classroom needs, learning materials, accessibility, and regional project costing.",
    tags: ["Infrastructure", "Special Needs Schools", "Accessibility"],
  },
  {
    index: 5,
    title: "CSR, Donations & Fundraising Activation",
    date: "March – June 2027",
    status: "Upcoming",
    description:
      "SCEF activates CSR for Education, donor engagement, public fundraising, and partner support to fund approved school interventions and EduAid Africa services.",
    tags: ["CSR", "Donations", "Fundraising", "Partnerships"],
  },
  {
    index: 6,
    title: "Regional School Interventions",
    date: "June – September 2027",
    status: "Upcoming",
    description:
      "Implementation phase for selected school support projects across African regions, including formal, informal, and special needs education environments.",
    tags: ["Implementation", "Regional Impact", "School Support"],
  },
  {
    index: 7,
    title: "Impact Reporting & Legacy Review",
    date: "October 2027",
    status: "Upcoming",
    description:
      "SCEF publishes impact updates, partner reports, school intervention outcomes, scholarship summaries, and lessons for the next NESA-Africa cycle.",
    tags: ["Impact Report", "Transparency", "Legacy Review"],
  },
];

const summaryCards = [
  {
    eyebrow: "Award Campaign Period",
    title: "20 May → 22 Oct 2026",
    body: "Public pre-nomination, voting, recognition shows, momentum phase, and Blue Garnet Awards Gala",
    icon: Award,
  },
  {
    eyebrow: "Main Gala",
    title: "22 October 2026",
    body: "Blue Garnet Awards Gala",
    icon: Sparkles,
  },
  {
    eyebrow: "Impact Phase",
    title: "23 Oct 2026 → Oct 2027",
    body: "Rebuild My School Africa + EduAid Africa services",
    icon: Users,
  },
  {
    eyebrow: "Continuous Engine",
    title: "Always-On",
    body: "Partnerships · CSR · Media · Fundraising",
    icon: Tv,
  },
];

const EventCard = ({ ev }: { ev: PhaseEvent }) => (
  <Card className="border-scef-blue/10 bg-background h-full">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-scef-gold text-scef-blue-darker text-sm font-bold">
          {ev.index}
        </span>
        <div className="flex flex-wrap gap-1.5 justify-end">
          <Badge variant="outline" className="text-[10px] border-scef-blue/20 text-scef-blue-darker">
            {ev.status}
          </Badge>
          {ev.agc && (
            <Badge className="text-[10px] bg-scef-gold/15 text-scef-gold border border-scef-gold/30 hover:bg-scef-gold/20">
              AGC
            </Badge>
          )}
        </div>
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold flex items-center gap-1.5">
        <Calendar className="w-3.5 h-3.5" />
        {ev.date}
      </p>
      <CardTitle className="text-base md:text-lg text-scef-blue-darker leading-snug">
        {ev.title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{ev.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {ev.tags.map((t) => (
          <span
            key={t}
            className="text-[10px] uppercase tracking-wide font-semibold text-scef-blue-darker bg-scef-blue/5 border border-scef-blue/10 rounded-full px-2 py-0.5"
          >
            {t}
          </span>
        ))}
      </div>
    </CardContent>
  </Card>
);

const NesaSeason2026Timeline = () => {
  return (
    <section id="season-2026" className="bg-background border-y border-scef-blue/10">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-scef-gold mb-2">
            2026 Season
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-darker mb-4">
            2026 Season Programme Timeline
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            A continental journey from public pre-nomination activation on 20 May 2026 to the live
            Blue Garnet Awards Gala on 22 October 2026, followed by a 12-month social impact phase
            through Rebuild My School Africa and EduAid Africa services from 23 October 2026 to
            October 2027.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Button asChild size="lg">
              <Link to="/nominate">Nominate Now</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/nesa-africa/categories">View Categories</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/csr-partnership">Partner With Us</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/nesa-tv">Watch NESA TV</Link>
            </Button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {summaryCards.map((c) => {
            const Icon = c.icon;
            return (
              <Card key={c.eyebrow} className="border-scef-blue/10 bg-scef-blue-darker text-white">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-scef-gold/20 text-scef-gold">
                      <Icon className="w-4 h-4" />
                    </span>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-scef-gold">
                      {c.eyebrow}
                    </p>
                  </div>
                  <CardTitle className="text-lg text-white">{c.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/80 leading-relaxed">{c.body}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="text-sm md:text-base text-muted-foreground italic mb-12 max-w-3xl">
          Recognition leads to action. After the awards, the spotlight shifts into measurable
          education impact through scholarships, school infrastructure support, regional
          interventions, and services for formal, informal, and special needs schools.
        </p>

        {/* Phase 1 */}
        <div className="mb-14">
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-scef-gold mb-1">
              Phase 1 · Season 1
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-scef-blue-darker mb-2">
              Award Campaign, Voting & Gala Journey
            </h3>
            <p className="text-sm font-semibold text-scef-blue-darker mb-3">
              20 May 2026 → 22 October 2026
            </p>
            <p className="text-sm md:text-base text-muted-foreground max-w-3xl leading-relaxed">
              The 2026 award season runs as a phased continental campaign designed to build
              credibility, public participation, Gen Z engagement, visibility, partnerships, voting
              suspense, momentum, and final recognition at the Blue Garnet Awards Gala.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {phase1Events.map((ev) => (
              <EventCard key={ev.index} ev={ev} />
            ))}
          </div>
        </div>

        {/* Transition strip */}
        <div className="rounded-xl border border-scef-gold/30 bg-scef-pattern p-5 md:p-6 mb-14 flex flex-wrap items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <Badge className="bg-scef-blue-darker text-white hover:bg-scef-blue-darker">
              Recognition
            </Badge>
            <ArrowRight className="w-4 h-4 text-scef-gold" />
            <Badge className="bg-scef-gold text-scef-blue-darker hover:bg-scef-gold">Impact</Badge>
          </div>
          <p className="text-sm md:text-base text-scef-blue-darker font-medium max-w-2xl">
            The Blue Garnet Gala closes Phase 1. From 23 October 2026, the campaign transitions into
            the Rebuild My School Africa and EduAid Africa social impact phase.
          </p>
        </div>

        {/* Phase 2 */}
        <div>
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-scef-gold mb-1">
              Phase 2 · Social Impact
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-scef-blue-darker mb-2">
              Post-Award Social Impact Journey
            </h3>
            <p className="text-sm font-semibold text-scef-blue-darker mb-3">
              23 October 2026 → October 2027
            </p>
            <p className="text-sm md:text-base text-muted-foreground max-w-3xl leading-relaxed">
              After the Blue Garnet Awards Gala, the campaign transitions from recognition into
              measurable education impact. Through Rebuild My School Africa and EduAid Africa, SCEF
              will support school-focused interventions, scholarships, education infrastructure,
              learning access, and regional education services across formal, informal, and special
              needs schools.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {phase2Events.map((ev) => (
              <EventCard key={ev.index} ev={ev} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NesaSeason2026Timeline;
