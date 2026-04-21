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

const pillars = [
  {
    icon: GraduationCap,
    title: "EduAid Africa",
    blurb: "Scholarships, grants, school support",
    href: "/programs/eduaid-africa",
  },
  {
    icon: Award,
    title: "Awards & Recognition",
    blurb: "NESA-Africa standards engine",
    href: "/programs/nesa-africa",
  },
  {
    icon: Megaphone,
    title: "Advocacy Services",
    blurb: "Policy, voice, representation",
    href: "/about",
  },
  {
    icon: Globe2,
    title: "Education Online",
    blurb: "Digital learning across Africa",
    href: "/programs/digital-learning",
  },
  {
    icon: BookOpen,
    title: "eLibrary Nigeria",
    blurb: "Open knowledge access",
    href: "/programs/elibrary-nigeria",
  },
  {
    icon: Handshake,
    title: "CSR & Partnerships",
    blurb: "Build with corporate partners",
    href: "/partners",
  },
];

export const ServicePillars = () => {
  return (
    <section className="relative bg-scef-blue-darker py-20 text-white md:py-28">
      <div className="absolute inset-0 bg-scef-pattern opacity-[0.06]" />
      <div className="container relative mx-auto px-4">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-scef-gold">
              What We Do
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl lg:text-5xl">
              Six pillars. One mission.
            </h2>
          </div>
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-scef-gold-light hover:text-scef-gold"
          >
            View all programs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map(({ icon: Icon, title, blurb, href }) => (
            <Link
              key={title}
              to={href}
              className="group relative flex flex-col gap-6 bg-scef-blue-darker p-8 transition-all hover:bg-scef-blue-dark"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-scef-gold/15 text-scef-gold transition-transform group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-white">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm text-white/60">{blurb}</p>
              </div>
              <div className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-scef-gold-light">
                View Service
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
