import { useEffect, useState } from "react";
import { Activity, GraduationCap, HandCoins, School, Vote } from "lucide-react";

/**
 * Live Activity Feed strip — shows rotating "happening now" updates.
 * All metrics use "Reporting in progress" placeholders per project rules.
 * When real data is wired, replace the static items with a Supabase query.
 */

type Item = {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
};

const ITEMS: Item[] = [
  { Icon: HandCoins, label: "Donations this week", value: "Reporting in progress" },
  { Icon: School, label: "Schools nominated today", value: "Reporting in progress" },
  { Icon: Vote, label: "AGC votes this cycle", value: "Reporting in progress" },
  { Icon: GraduationCap, label: "Scholarship applications", value: "Reporting in progress" },
];

export const LiveActivityFeed = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % ITEMS.length),
      4000,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section aria-label="Live activity" className="bg-background">
      <div className="container mx-auto px-4 pb-8 md:px-8">
        <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-sm md:px-6">
          <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
            <div className="inline-flex items-center gap-2">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-scef-gold opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-scef-gold" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-scef-blue-darker">
                <Activity className="me-1 inline h-3 w-3" /> Live Activity
              </span>
            </div>

            <ul className="grid w-full grid-cols-2 gap-3 md:flex md:flex-1 md:justify-end md:gap-6">
              {ITEMS.map((it, i) => {
                const isActive = i === active;
                return (
                  <li
                    key={it.label}
                    className={`flex items-center gap-2 transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-70"
                    }`}
                  >
                    <span
                      className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                        isActive
                          ? "bg-scef-gold text-scef-blue-darker"
                          : "bg-scef-blue-darker/10 text-scef-blue-darker"
                      }`}
                    >
                      <it.Icon className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0 leading-tight">
                      <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {it.label}
                      </p>
                      <p className="truncate text-xs font-bold text-scef-blue-darker md:text-sm">
                        {it.value}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveActivityFeed;
