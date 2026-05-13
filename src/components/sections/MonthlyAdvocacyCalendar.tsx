import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Video,
  School,
  Users,
  Megaphone,
  HandCoins,
  ArrowRight,
  ChevronsUpDown,
  Globe2,
  MapPin,
  Layers,
} from "lucide-react";
import { monthlyPrograms, programSchedule, type ParticipationMode } from "@/config/monthlyCalendar";
import { Button } from "@/components/ui/button";

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

const ctaButtons: { label: string; to: string }[] = [
  { label: "View Full Calendar", to: "/programs/training-development" },
  { label: "Register for a Webinar", to: "/media/eduaid-webinars" },
  { label: "Host a Program Day", to: "/contact?topic=host-program-day" },
  { label: "Sponsor a Monthly Program", to: "/wallet/donate?fund=monthly-program" },
  { label: "Register Your School", to: "/get-involved/volunteer" },
  { label: "Adopt a School", to: "/wallet/donate?fund=adopt-school" },
  { label: "Join Local Chapter Activity", to: "/chapters/join-online" },
  { label: "Sponsor Advocacy Walk", to: "/wallet/donate?fund=advocacy-walk" },
  { label: "Request SCEF Visit", to: "/contact?topic=scef-visit" },
  { label: "Submit Chapter Activity", to: "/contact?topic=chapter-activity-report" },
];

export const MonthlyAdvocacyCalendar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(
    () =>
      monthlyPrograms.filter((p) =>
        `${p.month} ${p.title}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <section className="bg-scef-pattern py-20 md:py-24" id="monthly-advocacy-calendar">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-scef-gold/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold-dark ring-1 ring-scef-gold/30">
            <CalendarDays className="h-3.5 w-3.5" /> July 2026 – June 2027
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.5rem]">
            Explore Our Monthly Advocacy, Webinar &amp; Training Calendar
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Every month, SCEF leads a focused education, advocacy, and capacity-building theme across Africa. Each monthly theme runs as a flexible <strong>Program Week</strong>. During that week, any school, NGO, partner, volunteer group, ambassador team, local chapter, or regional team may choose one suitable day to host its own activity — physically, online, or hybrid.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Recommended Program Week: the <strong>3rd week</strong> of each month. Recommended main day: <strong>Saturday</strong> of that week — flexible by region.
          </p>
        </div>

        {/* Dropdown */}
        <div className="mx-auto mt-10 max-w-2xl">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-scef-blue-darker">
            Select Monthly Program
          </label>
          <div className="relative rounded-xl border border-border bg-card shadow-sm">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left"
              aria-expanded={open}
              aria-haspopup="listbox"
            >
              <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                <CalendarDays className="h-4 w-4 text-scef-blue-darker" />
                Browse 12 monthly program weeks…
              </span>
              <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
            </button>

            {open && (
              <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-border bg-popover shadow-xl">
                <div className="border-b border-border p-2">
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search a month or theme…"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-scef-gold/40"
                  />
                </div>
                <ul role="listbox" className="max-h-80 overflow-y-auto py-1">
                  {filtered.map((p) => (
                    <li key={p.slug}>
                      <button
                        type="button"
                        onClick={() => {
                          setOpen(false);
                          navigate(`/calendar/${p.slug}`);
                        }}
                        className="flex w-full flex-col items-start gap-1 px-4 py-3 text-left hover:bg-muted"
                      >
                        <span className="text-xs font-semibold uppercase tracking-wider text-scef-gold-dark">
                          {p.month}
                        </span>
                        <span className="text-sm font-medium text-foreground">
                          {p.title}
                        </span>
                        <span className="flex flex-wrap gap-1.5 pt-1">
                          {p.modes.map((m) => (
                            <span
                              key={m}
                              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${modeStyles[m]}`}
                            >
                              {modeIcon(m)} {m}
                            </span>
                          ))}
                        </span>
                      </button>
                    </li>
                  ))}
                  {filtered.length === 0 && (
                    <li className="px-4 py-6 text-center text-sm text-muted-foreground">
                      No programs match “{query}”.
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Cards grid */}
        <div className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {monthlyPrograms.map((p) => (
            <Link
              key={p.slug}
              to={`/calendar/${p.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-scef-gold/40 hover:shadow-md"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold-dark">
                {p.month}
              </span>
              <h3 className="mt-1.5 font-display text-lg font-bold leading-snug text-scef-blue-darker">
                {p.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.modes.map((m) => (
                  <span
                    key={m}
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${modeStyles[m]}`}
                  >
                    {modeIcon(m)} {m}
                  </span>
                ))}
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-scef-blue-darker group-hover:text-scef-gold-dark">
                Open program week
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        {/* Activity icon row */}
        <ul className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 text-xs text-muted-foreground sm:grid-cols-5">
          {[
            { icon: Video, label: "Webinar" },
            { icon: School, label: "School Training" },
            { icon: Users, label: "Local Chapter" },
            { icon: Megaphone, label: "Advocacy Walk" },
            { icon: HandCoins, label: "Sponsorship" },
          ].map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2"
            >
              <Icon className="h-4 w-4 text-scef-blue-darker" />
              <span className="font-medium text-foreground">{label}</span>
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-2.5">
          {ctaButtons.map((c, i) => (
            <Button
              key={c.label}
              asChild
              variant={i === 0 ? "default" : "outline"}
              size="sm"
            >
              <Link to={c.to}>{c.label}</Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MonthlyAdvocacyCalendar;
