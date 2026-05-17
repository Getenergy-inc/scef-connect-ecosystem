import { Link } from "react-router-dom";
import { Calendar, GraduationCap, Compass, Megaphone, Heart, Accessibility, ArrowRight } from "lucide-react";
import { EduAidServiceBrand, type ServiceMedium } from "@/components/eduaid/EduAidServiceBrand";

/**
 * EduAid-Africa Advocacy & Calendars hub.
 * Surfaces every recurring calendar delivered under EduAid-Africa, plus
 * SCEF advocacy days the foundation observes throughout the year.
 */
const calendars: Array<{
  icon: typeof GraduationCap;
  title: string;
  medium: ServiceMedium;
  period: string;
  blurb: string;
  href: string;
  cta: string;
}> = [
  {
    icon: GraduationCap,
    title: "Monthly Training & Webinar Calendar",
    medium: "Webinar",
    period: "July 2026 – June 2027",
    blurb: "Twelve months of teacher training, school leadership, EdTech, TVET, M&E and chapter development.",
    href: "/programs/training-development",
    cta: "View Training Calendar",
  },
  {
    icon: Compass,
    title: "My Career My Life Advocacy Calendar",
    medium: "School Training",
    period: "August 2026 – July 2027",
    blurb: "Twelve months of student-focused career guidance for JSS, SS2 and SS3 — culminating in the Annual Student Showcase.",
    href: "/programs/my-career-my-life",
    cta: "View MCML Calendar",
  },
  {
    icon: Heart,
    title: "Women & Girls Empowerment Calendar",
    medium: "Mentorship Circle",
    period: "Year-round",
    blurb: "Mentorship circles, Girls in STEM, safeguarding workshops and leadership clinics under EduAid-Africa.",
    href: "/programs/women-girls-education",
    cta: "View Women & Girls Calendar",
  },
  {
    icon: Accessibility,
    title: "Special Needs & Inclusive Education Calendar",
    medium: "Workshop",
    period: "Year-round",
    blurb: "Inclusive classroom training, assistive technology and special needs school support cycles.",
    href: "/programs/special-needs-education",
    cta: "View Inclusion Calendar",
  },
];

type AdvocacyDay = { date: string; name: string; medium: ServiceMedium };
const advocacyDays: AdvocacyDay[] = [
  { date: "24 January", name: "International Day of Education", medium: "Campaign" },
  { date: "11 February", name: "International Day of Women & Girls in Science", medium: "Webinar" },
  { date: "8 March", name: "International Women's Day", medium: "Advocacy Walk" },
  { date: "16 June", name: "Day of the African Child", medium: "Advocacy Walk" },
  { date: "12 August", name: "International Youth Day", medium: "Conference" },
  { date: "8 September", name: "International Literacy Day", medium: "Campaign" },
  { date: "5 October", name: "World Teachers' Day", medium: "Conference" },
  { date: "11 October", name: "International Day of the Girl Child", medium: "Advocacy Walk" },
  { date: "20 November", name: "World Children's Day", medium: "Campaign" },
  { date: "3 December", name: "International Day of Persons with Disabilities", medium: "Workshop" },
];

export const EduAidAdvocacyCalendars = () => {
  return (
    <section
      id="advocacy-calendars"
      className="bg-white py-16 md:py-24 scroll-mt-24"
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
            Calendars & Observances
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.5rem]">
            EduAid-Africa Advocacy & Program Calendars
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Every recurring calendar delivered under the EduAid-Africa umbrella —
            plus the global education advocacy days SCEF observes each year.
          </p>
        </div>

        {/* Program calendars grid */}
        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2">
          {calendars.map(({ icon: Icon, title, medium, period, blurb, href, cta }) => (
            <article
              key={title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-scef-gold/50 hover:shadow-md md:p-7"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-scef-blue-darker/10 text-scef-blue-darker">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <div className="flex-1">
                  <EduAidServiceBrand title={title} medium={medium} className="mb-2" />
                  <h3 className="font-display text-lg font-bold text-scef-blue-darker md:text-xl">
                    {title}
                  </h3>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-scef-gold-dark">
                    <Calendar className="h-3.5 w-3.5" />
                    {period}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {blurb}
                  </p>
                  <Link
                    to={href}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-scef-blue-darker transition-colors hover:text-scef-gold-dark"
                  >
                    {cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Global advocacy days */}
        <div className="mx-auto mt-12 max-w-6xl rounded-2xl border border-scef-gold/30 bg-neutral-50 p-6 md:p-8">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-scef-gold/15 text-scef-gold-dark">
              <Megaphone className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-xl font-bold text-scef-blue-darker md:text-2xl">
                SCEF Global Advocacy Calendar
              </h3>
              <p className="mt-1 text-sm text-muted-foreground md:text-base">
                Education-related international days SCEF observes through
                campaigns, webinars and chapter-led activations.
              </p>
            </div>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {advocacyDays.map(({ date, name }) => (
              <li
                key={name}
                className="flex items-start gap-3 rounded-xl border border-border bg-white px-4 py-3"
              >
                <span className="mt-0.5 inline-flex min-w-[72px] justify-center rounded-md bg-scef-blue-darker px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  {date}
                </span>
                <span className="text-sm font-medium leading-snug text-scef-blue-darker">
                  {name}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/calendar"
              className="inline-flex items-center gap-2 rounded-full bg-scef-blue-darker px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-scef-blue-darker/90"
            >
              View Full SCEF Calendar
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/partner-with-us"
              className="inline-flex items-center gap-2 rounded-full border border-scef-blue-darker/20 px-5 py-2.5 text-sm font-semibold text-scef-blue-darker transition-colors hover:border-scef-gold hover:text-scef-gold-dark"
            >
              Partner an Advocacy Day
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EduAidAdvocacyCalendars;
