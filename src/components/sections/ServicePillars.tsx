import { Link } from "react-router-dom";
import {
  GraduationCap,
  Award,
  Megaphone,
  Globe2,
  BookOpen,
  Handshake,
  ArrowRight,
} from "lucide-react";
import { MembershipBadge } from "@/components/ui/membership-badge";

const pillars = [
  {
    icon: GraduationCap,
    title: "EduAid Africa",
    blurb: "Advocacy-driven aid for universal access",
    href: "/programs/eduaid-africa",
  },
  {
    icon: Award,
    title: "Rebuild My School Africa",
    blurb: "Institutional rebuilding via member support",
    href: "/programs/rebuild-my-school-africa",
  },
  {
    icon: Megaphone,
    title: "Women & Girls Education",
    blurb: "Member-led empowerment initiatives",
    href: "/programs/women-girls-education",
  },
  {
    icon: Globe2,
    title: "Special Needs Education",
    blurb: "Inclusive advocacy for all learners",
    href: "/programs/special-needs-education",
  },
  {
    icon: BookOpen,
    title: "Education Online Africa",
    blurb: "Digital platforms powered by members",
    href: "/programs/digital-learning",
  },
  {
    icon: Handshake,
    title: "eLibrary Nigeria",
    blurb: "Member-accessible knowledge hub",
    href: "/programs/elibrary-nigeria",
  },
  {
    icon: Award,
    title: "NESA-Africa (2026–2037)",
    blurb: "Prestigious awards recognizing advocates",
    href: "/programs/nesa-africa",
  },
];

export const ServicePillars = () => {
  return (
    <section className="relative bg-background py-24 text-scef-blue-darker md:py-36">
      <div className="container relative mx-auto px-6 md:px-8">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
              What We Do
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight md:text-[2.75rem]">
              Six pillars. One mission.
            </h2>
          </div>
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-scef-blue-darker hover:text-scef-gold-dark"
          >
            View all programs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map(({ icon: Icon, title, blurb, href }, i) => (
            <Link
              key={title}
              to={href}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-scef-gold/40 hover:shadow-2xl hover:shadow-scef-blue/5 md:p-10"
            >
              {/* Premium hover gradient */}
              <div className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-br from-scef-gold/0 via-scef-gold/0 to-scef-gold/[0.04] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Number marker + member badge */}
              <div className="mb-8 flex items-start justify-between">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-scef-blue-darker text-scef-gold transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-4deg]">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <MembershipBadge variant="outline" label="Member-backed" className="opacity-0 -translate-y-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0" />
                  <span className="font-display text-sm font-medium text-muted-foreground/60 tabular-nums">
                    0{i + 1}
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="font-display text-2xl font-semibold leading-tight">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {blurb}
                </p>
              </div>

              <div className="mt-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-scef-blue-darker">
                <span className="transition-colors group-hover:text-scef-gold-dark">
                  Explore
                </span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-hover:text-scef-gold-dark" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
