import { Activity, School, Vote, GraduationCap, Building2 } from "lucide-react";

/**
 * Live activity strip — placeholder labels per project policy:
 * unverified metrics must read "Reporting in progress".
 */

const items = [
  { icon: Activity, label: "Donations today", value: "Reporting in progress" },
  { icon: School, label: "Schools nominated", value: "Reporting in progress" },
  { icon: Vote, label: "AGC votes cast", value: "Reporting in progress" },
  {
    icon: GraduationCap,
    label: "Scholarship applications",
    value: "Reporting in progress",
  },
  {
    icon: Building2,
    label: "Schools registered for training",
    value: "Reporting in progress",
  },
];

export const LiveActivityFeed = () => {
  return (
    <section className="border-y border-border bg-[#0B5D3B] py-6 text-white">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mb-4 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4AF37]">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#D4AF37]" />
          Live Activity
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {items.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-lg bg-white/5 p-3 ring-1 ring-white/10"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                <Icon className="h-4 w-4" strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <div className="truncate text-xs font-semibold text-white">
                  {value}
                </div>
                <div className="truncate text-[10px] uppercase tracking-wider text-white/65">
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveActivityFeed;
