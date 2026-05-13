import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  CalendarDays,
  Video,
  School,
  Users,
  Megaphone,
  HandCoins,
  Award,
  Download,
  MapPin,
  Globe2,
  Layers,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { WebinarRegistrationForm } from "@/components/calendar/WebinarRegistrationForm";
import {
  getMonthlyProgram,
  monthlyPrograms,
  flexibleActivities,
  programSchedule,
  type ParticipationMode,
} from "@/config/monthlyCalendar";

const modeStyles: Record<ParticipationMode, string> = {
  Online: "bg-scef-blue-darker/10 text-scef-blue-darker ring-scef-blue-darker/20",
  Physical: "bg-scef-gold/15 text-scef-gold-dark ring-scef-gold/30",
  Hybrid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

const modeIcon = (m: ParticipationMode) => {
  if (m === "Online") return <Globe2 className="h-3 w-3" />;
  if (m === "Physical") return <MapPin className="h-3 w-3" />;
  return <Layers className="h-3 w-3" />;
};

const sections = [
  { icon: Video, title: "Live Webinar Replays", body: "All registered participants receive replay access and the program brief by email." },
  { icon: Users, title: "Local Chapter Activity", body: "Coordinate with your nearest SCEF local chapter for grassroots delivery." },
  { icon: Megaphone, title: "Advocacy Walk / Outreach", body: "Join or host an advocacy walk, media campaign or community outreach." },
  { icon: School, title: "School Training Option", body: "Bring this program week into your school as an institutional training session." },
  { icon: HandCoins, title: "Partner Adoption Opportunity", body: "Adopt this monthly theme as a CSR or institutional partner." },
  { icon: Award, title: "Speaker / Facilitator Information", body: "Lead facilitators and partner experts will be confirmed before the program week." },
];

const MonthlyProgramPage = () => {
  const { slug = "" } = useParams();
  const program = getMonthlyProgram(slug);
  if (!program) return <Navigate to="/" replace />;

  const schedule = programSchedule[slug];
  const idx = monthlyPrograms.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? monthlyPrograms[idx - 1] : null;
  const next = idx < monthlyPrograms.length - 1 ? monthlyPrograms[idx + 1] : null;

  return (
    <>
      <Helmet>
        <title>{program.month} — {program.title} | SCEF</title>
        <meta name="description" content={program.summary} />
        <link rel="canonical" href={`https://santoscreations.org/calendar/${program.slug}`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />

        <main>
          {/* Hero */}
          <section className="bg-scef-blue-darker py-16 text-white md:py-20">
            <div className="container mx-auto px-6 md:px-8">
              <Link
                to="/#monthly-advocacy-calendar"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-scef-gold hover:underline"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Monthly Calendar
              </Link>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold ring-1 ring-scef-gold/30">
                <CalendarDays className="h-3.5 w-3.5" /> {program.month} · Program Week
              </p>
              <h1 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl">
                {program.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
                {program.summary}
              </p>
              {schedule && (
                <div className="mt-5 inline-flex flex-col gap-1 rounded-xl bg-white/5 px-4 py-3 text-sm ring-1 ring-white/15 sm:flex-row sm:items-center sm:gap-4">
                  <span><span className="text-white/60">Recommended Program Week:</span> <strong className="text-white">{schedule.weekRange}</strong></span>
                  <span className="hidden sm:inline text-white/30">·</span>
                  <span><span className="text-white/60">Main day:</span> <strong className="text-scef-gold">{schedule.mainDay}</strong></span>
                </div>
              )}
              <div className="mt-5 flex flex-wrap gap-2">
                {program.modes.map((m) => (
                  <span
                    key={m}
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${modeStyles[m]}`}
                  >
                    {modeIcon(m)} {m}
                  </span>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-2.5">
                <Button asChild variant="secondary"><a href="#register">Register for the Program Day</a></Button>
                <Button asChild variant="heroOutline"><Link to={`/wallet/donate?fund=${program.slug}`}>Sponsor This Month&rsquo;s Program</Link></Button>
                <Button asChild variant="heroOutline"><Link to="/chapters/join-online">Host a Local Chapter Activity</Link></Button>
                <Button asChild variant="heroOutline"><Link to="/contact?topic=scef-visit">Request SCEF Visit</Link></Button>
              </div>
            </div>
          </section>

          {/* Overview */}
          <section className="py-16 md:py-20">
            <div className="container mx-auto max-w-5xl px-6 md:px-8">
              <h2 className="font-display text-2xl font-bold text-scef-blue-darker md:text-3xl">Program Overview</h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                The {program.month} program week is delivered as a flexible 7-day cycle, allowing schools, NGOs,
                ambassadors, volunteers and partners to participate online, physically, or hybrid based on their
                location and capacity. Target audience: <strong>{program.audience}</strong>.
              </p>

              {/* Weekly schedule */}
              <h3 className="mt-10 font-display text-xl font-bold text-scef-blue-darker">Weekly Schedule</h3>
              <div className="mt-4 overflow-hidden rounded-xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-scef-blue-darker text-white">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Day</th>
                      <th className="px-4 py-3 font-semibold">Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weeklyStructure.map((row, i) => (
                      <tr key={row.day} className={i % 2 === 0 ? "bg-card" : "bg-background"}>
                        <td className="px-4 py-3 font-semibold text-scef-blue-darker whitespace-nowrap">{row.day}</td>
                        <td className="px-4 py-3 text-foreground">{row.activity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Webinar Registration Form */}
              <div id="register" className="mt-12 scroll-mt-32">
                <WebinarRegistrationForm program={program} />
              </div>

              {/* Sections grid */}
              <div className="mt-12 grid gap-4 md:grid-cols-2">
                {sections.map(({ icon: Icon, title, body }) => (
                  <div key={title} className="rounded-xl border border-border bg-card p-5">
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-scef-blue-darker/10 text-scef-blue-darker">
                        <Icon className="h-4.5 w-4.5" />
                      </span>
                      <h4 className="font-display text-base font-bold text-scef-blue-darker">{title}</h4>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                ))}
              </div>

              {/* Certificate + Download */}
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-scef-gold/30 bg-scef-gold/5 p-5">
                  <h4 className="font-display text-base font-bold text-scef-blue-darker">Certificate Option</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Optional paid certificate of participation issued via SCEF Education Online Africa.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <h4 className="font-display text-base font-bold text-scef-blue-darker">Downloadable Program Brief</h4>
                  <p className="mt-2 text-sm text-muted-foreground">Reporting in progress — brief PDF will be published before the program week opens.</p>
                  <Button variant="outline" size="sm" className="mt-3" disabled>
                    <Download className="mr-1 h-4 w-4" /> Download Brief
                  </Button>
                </div>
              </div>

              {/* Final CTA */}
              <div className="mt-12 rounded-2xl bg-scef-blue-darker p-8 text-white md:p-10">
                <h3 className="font-display text-2xl font-bold">Support &amp; Payment Options</h3>
                <p className="mt-2 text-sm text-white/80">
                  Sponsor this program week, register your school, or contribute through the GFA Wallet.
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <Button asChild variant="secondary"><Link to={`/wallet/donate?fund=${program.slug}`}>Sponsor This Program</Link></Button>
                  <Button asChild variant="heroOutline"><Link to="/support-us">All Support Options</Link></Button>
                  <Button asChild variant="heroOutline"><Link to="/contact">Request SCEF Visit</Link></Button>
                </div>
              </div>

              {/* Prev / Next */}
              <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
                {prev ? (
                  <Link to={`/calendar/${prev.slug}`} className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-scef-blue-darker">
                    <ArrowLeft className="h-4 w-4" />
                    <span><span className="block text-[10px] uppercase tracking-wider">Previous</span><span className="font-semibold text-foreground">{prev.month}</span></span>
                  </Link>
                ) : <span />}
                {next && (
                  <Link to={`/calendar/${next.slug}`} className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-scef-blue-darker sm:text-right">
                    <span><span className="block text-[10px] uppercase tracking-wider">Next</span><span className="font-semibold text-foreground">{next.month}</span></span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default MonthlyProgramPage;
