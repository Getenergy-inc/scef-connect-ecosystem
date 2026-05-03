import { Link } from "react-router-dom";
import { Mic, Video, FileText, Megaphone } from "lucide-react";

/**
 * My Career My Life — Advocacy & Media Production volunteer recruitment band.
 */
export const MCMLMedia = () => {
  const roles = [
    "Script writers",
    "Voice-over artists",
    "Video producers",
    "Video editors",
    "Presenters and anchors",
    "Career mentors",
    "School outreach coordinators",
    "Social media volunteers",
    "Research assistants",
    "Production assistants",
  ];

  const outputs = [
    { icon: Video, label: "Career guidance videos" },
    { icon: Mic, label: "Voice-over explainers" },
    { icon: FileText, label: "School training scripts" },
    { icon: Megaphone, label: "NESA TV career episodes" },
  ];

  return (
    <section className="bg-background py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
            Volunteer · Produce · Tell Career Stories
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.5rem]">
            My Career My Life Advocacy & Media Production
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            SCEF will recruit volunteers and media contributors to support
            real-time and pre-recorded career guidance content for students
            across NESA TV, It&apos;s In Me Radio, and social channels.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <h3 className="font-display text-lg font-bold text-scef-blue-darker">
              Volunteer Roles Needed
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
              {roles.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-2 text-foreground"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-scef-gold" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <h3 className="font-display text-lg font-bold text-scef-blue-darker">
              Content Outputs
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {outputs.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-start rounded-lg border border-border bg-background p-4"
                >
                  <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-scef-gold/15 text-scef-gold-dark ring-1 ring-scef-gold/30">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold text-scef-blue-darker">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/get-involved/volunteer"
            className="inline-flex h-12 items-center rounded-md bg-scef-gold px-7 font-semibold text-scef-blue-darker hover:bg-scef-gold-hover"
          >
            Volunteer for Production
          </Link>
          <Link
            to="/programs/my-career-my-life#submit-story"
            className="inline-flex h-12 items-center rounded-md border border-border bg-background px-7 font-semibold text-scef-blue-darker hover:border-scef-gold hover:text-scef-gold-dark"
          >
            Submit a Career Story
          </Link>
          <Link
            to="/get-involved/volunteer"
            className="inline-flex h-12 items-center rounded-md border border-border bg-background px-7 font-semibold text-scef-blue-darker hover:border-scef-gold hover:text-scef-gold-dark"
          >
            Join Media Team
          </Link>
          <Link
            to="/partner-with-us"
            className="inline-flex h-12 items-center rounded-md border border-border bg-background px-7 font-semibold text-scef-blue-darker hover:border-scef-gold hover:text-scef-gold-dark"
          >
            Sponsor Career Content
          </Link>
        </div>
      </div>
    </section>
  );
};
