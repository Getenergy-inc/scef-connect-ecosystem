import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { Calendar, Megaphone, ArrowRight } from "lucide-react";
import { eduAidWebinarCalendar, myCareerMyLifeCalendar } from "@/config/trainingCalendar";

const advocacyDays = [
  { date: "24 Jan", name: "International Day of Education" },
  { date: "11 Feb", name: "International Day of Women & Girls in Science" },
  { date: "8 Mar", name: "International Women's Day" },
  { date: "16 Jun", name: "Day of the African Child" },
  { date: "12 Aug", name: "International Youth Day" },
  { date: "8 Sep", name: "International Literacy Day" },
  { date: "5 Oct", name: "World Teachers' Day" },
  { date: "11 Oct", name: "International Day of the Girl Child" },
  { date: "20 Nov", name: "World Children's Day" },
  { date: "3 Dec", name: "International Day of Persons with Disabilities" },
];

const Row = ({ month, focus, audience }: { month: string; focus: string; audience: string }) => (
  <li className="grid grid-cols-1 gap-2 rounded-xl border border-border bg-card p-4 sm:grid-cols-[140px_1fr_220px] sm:items-center">
    <span className="inline-flex w-fit rounded-md bg-scef-blue-darker px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">{month}</span>
    <span className="text-sm font-semibold text-scef-blue-darker">{focus}</span>
    <span className="text-xs text-muted-foreground">{audience}</span>
  </li>
);

export default function AdvocacyTimeline() {
  return (
    <>
      <Helmet>
        <title>Advocacy & Program Timeline — SCEF</title>
        <meta name="description" content="Every SCEF advocacy day and EduAid-Africa program calendar in one timeline." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />

        <main className="container mx-auto px-6 py-12 md:px-8 md:py-16">
          <header className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
              Calendars · Observances · Cycles
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-scef-blue-darker md:text-5xl">
              SCEF Advocacy & Program Timeline
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              All recurring SCEF advocacy days plus every EduAid-Africa program calendar in one place.
            </p>
          </header>

          {/* Global advocacy days */}
          <section className="mx-auto mt-12 max-w-5xl">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-scef-blue-darker">
              <Megaphone className="h-5 w-5 text-scef-gold-dark" />
              Global Advocacy Days SCEF Observes
            </h2>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {advocacyDays.map(({ date, name }) => (
                <li key={name} className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3">
                  <span className="mt-0.5 inline-flex min-w-[60px] justify-center rounded-md bg-scef-blue-darker px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-white">{date}</span>
                  <span className="text-sm font-medium text-scef-blue-darker">{name}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Training calendar */}
          <section className="mx-auto mt-14 max-w-5xl">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-scef-blue-darker">
              <Calendar className="h-5 w-5 text-scef-gold-dark" />
              EduAid-Africa Training Calendar (Jul 2026 – Jun 2027)
            </h2>
            <ul className="mt-5 space-y-2">
              {eduAidWebinarCalendar.map((r) => <Row key={r.month} {...r} />)}
            </ul>
          </section>

          {/* MCML calendar */}
          <section className="mx-auto mt-14 max-w-5xl">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-scef-blue-darker">
              <Calendar className="h-5 w-5 text-scef-gold-dark" />
              My Career My Life Calendar (Aug 2026 – Jul 2027)
            </h2>
            <ul className="mt-5 space-y-2">
              {myCareerMyLifeCalendar.map((r) => <Row key={r.month} {...r} />)}
            </ul>
          </section>

          {/* CTA */}
          <div className="mx-auto mt-14 flex max-w-3xl flex-wrap justify-center gap-3">
            <Link to="/programs/eduaid-africa" className="inline-flex items-center gap-2 rounded-full bg-scef-blue-darker px-6 py-3 text-sm font-semibold text-white hover:bg-scef-blue-darker/90">
              Explore EduAid-Africa <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/partner-with-us" className="inline-flex items-center gap-2 rounded-full border border-scef-blue-darker/20 px-6 py-3 text-sm font-semibold text-scef-blue-darker hover:border-scef-gold hover:text-scef-gold-dark">
              Partner an Advocacy Day
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
