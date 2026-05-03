import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import { eduAidWebinarCalendar, type CalendarRow } from "@/config/trainingCalendar";

type Props = {
  /** When true (landing), only the first 6 rows are shown with a "view all" CTA. */
  preview?: boolean;
  /** Custom dataset (used for My Career My Life via reuse). */
  rows?: CalendarRow[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

/**
 * EduAid-Africa Webinar Training Calendar — 12-month structured calendar
 * starting July 2026. Reusable for My Career My Life via `rows` override.
 */
export const EduAidWebinarCalendar = ({
  preview = false,
  rows = eduAidWebinarCalendar,
  eyebrow = "Starts July 2026",
  title = "Monthly Capacity Building for Educators and Institutions",
  subtitle = "SCEF will host one structured EduAid-Africa training every month from July 2026, serving teachers, school managers, education administrators, volunteers, NGOs, and institutional partners.",
  ctaHref = "/programs/training-development",
  ctaLabel = "View Full Training Calendar",
}: Props) => {
  const visible = preview ? rows.slice(0, 6) : rows;

  return (
    <section className="bg-background py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-scef-gold/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold-dark ring-1 ring-scef-gold/30">
            <CalendarDays className="h-3.5 w-3.5" /> {eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.5rem]">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {subtitle}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl border border-border">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-scef-blue-darker text-white">
                <tr>
                  <th className="px-5 py-3 font-semibold">Month</th>
                  <th className="px-5 py-3 font-semibold">Training Focus</th>
                  <th className="px-5 py-3 font-semibold">Target Audience</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((row, i) => (
                  <tr
                    key={row.month}
                    className={i % 2 === 0 ? "bg-card" : "bg-background"}
                  >
                    <td className="px-5 py-3 font-semibold text-scef-blue-darker whitespace-nowrap">
                      {row.month}
                    </td>
                    <td className="px-5 py-3 text-foreground">{row.focus}</td>
                    <td className="px-5 py-3 text-muted-foreground">{row.audience}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {!preview && (
          <ul className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 text-sm text-muted-foreground md:grid-cols-3">
            {[
              "Live webinar sessions",
              "Replay access",
              "Attendance certificates",
              "Optional paid certificates",
              "Training reports",
              "EduAid Wallet / AGC payment option",
              "School and chapter training dashboard",
            ].map((f) => (
              <li
                key={f}
                className="rounded-lg border border-border bg-card px-4 py-2.5"
              >
                ✓ {f}
              </li>
            ))}
          </ul>
        )}

        {preview && (
          <div className="mt-8 flex justify-center">
            <Link
              to={ctaHref}
              className="inline-flex h-12 items-center rounded-md bg-scef-blue-darker px-7 font-semibold text-white hover:bg-scef-blue"
            >
              {ctaLabel}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
