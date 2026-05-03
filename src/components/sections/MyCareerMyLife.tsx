import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

/**
 * My Career My Life intro band — career guidance program for JSS and SS2/SS3.
 */
export const MyCareerMyLife = () => {
  const audiences = [
    "Junior Secondary School students",
    "SS2 students",
    "SS3 students",
    "Students in underserved schools",
    "Girls and young women needing career exposure",
    "Students in special needs and inclusive schools",
  ];

  return (
    <section className="relative overflow-hidden bg-card py-20 md:py-24">
      <div className="container mx-auto grid items-center gap-10 px-6 md:grid-cols-12 md:gap-12 md:px-8">
        <div className="md:col-span-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-scef-blue-darker/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-blue-darker">
            <Compass className="h-3.5 w-3.5" /> Starts August 2026
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.5rem]">
            My Career My Life: Career Guidance for African Students
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            My Career My Life is SCEF&apos;s student-focused career guidance and
            advocacy program designed for Junior Secondary School students and
            SS2/SS3 students, helping them understand career options, subject
            choices, vocational pathways, digital skills, entrepreneurship, and
            life planning.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/programs/my-career-my-life#register-school"
              className="inline-flex h-11 items-center rounded-md bg-scef-gold px-6 text-sm font-semibold text-scef-blue-darker hover:bg-scef-gold-hover"
            >
              Register Your School
            </Link>
            <Link
              to="/programs/my-career-my-life#request-session"
              className="inline-flex h-11 items-center rounded-md bg-scef-blue-darker px-6 text-sm font-semibold text-white hover:bg-scef-blue"
            >
              Request a Career Session
            </Link>
            <Link
              to="/partner-with-us"
              className="inline-flex h-11 items-center rounded-md border border-border bg-background px-6 text-sm font-semibold text-scef-blue-darker hover:border-scef-gold hover:text-scef-gold-dark"
            >
              Adopt a School
            </Link>
            <Link
              to="/get-involved/volunteer"
              className="inline-flex h-11 items-center rounded-md border border-border bg-background px-6 text-sm font-semibold text-scef-blue-darker hover:border-scef-gold hover:text-scef-gold-dark"
            >
              Volunteer for MCML
            </Link>
          </div>
        </div>

        <div className="md:col-span-6">
          <div className="rounded-2xl border border-border bg-background p-6 shadow-sm md:p-8">
            <h3 className="font-display text-lg font-bold text-scef-blue-darker">
              Target Students
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {audiences.map((a) => (
                <li
                  key={a}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-scef-gold" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
