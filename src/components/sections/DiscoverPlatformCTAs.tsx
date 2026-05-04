import { Link } from "react-router-dom";
import {
  BookOpen,
  School,
  Accessibility,
  Heart,
  MapPin,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

const cards = [
  {
    icon: BookOpen,
    title: "Explore Programs",
    desc: "Discover SCEF's flagship education programs across Africa.",
    cta: "Browse Programs",
    href: "/programs",
  },
  {
    icon: School,
    title: "Fund a School",
    desc: "Support school rebuilding and adoption through RMSA.",
    cta: "Fund a School",
    href: "/programs/rebuild-my-school-africa",
  },
  {
    icon: Accessibility,
    title: "Support Special Needs Education",
    desc: "Advance inclusive education for learners with disabilities.",
    cta: "Support Now",
    href: "/programs/special-needs-education",
  },
  {
    icon: Heart,
    title: "Empower Women & Girls",
    desc: "Back scholarships, mentorship and leadership pathways.",
    cta: "Empower Now",
    href: "/programs/women-girls-education",
  },
  {
    icon: MapPin,
    title: "Join Local Chapters",
    desc: "Engage with SCEF in your country, state or city.",
    cta: "Join a Chapter",
    href: "/chapters/join-online",
  },
  {
    icon: GraduationCap,
    title: "Access Training & Webinars",
    desc: "Monthly EduAid-Africa training for teachers and schools.",
    cta: "View Calendar",
    href: "/media/webinars",
  },
];

export const DiscoverPlatformCTAs = () => {
  return (
    <section className="bg-neutral-50 py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#0B5D3B] uppercase mb-3">
            Discover the Platform
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
            Take Action Today
          </h2>
          <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
            Pick the action that matches your capacity — every step strengthens
            education across Africa.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ icon: Icon, title, desc, cta, href }) => (
            <div
              key={title}
              className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[#D4AF37]/60 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0B5D3B]/10 text-[#0B5D3B] mb-4 group-hover:bg-[#0B5D3B] group-hover:text-white transition-colors">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">{title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-5 flex-1">
                {desc}
              </p>
              <Link
                to={href}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#0B5D3B] hover:bg-[#0E7549] text-white text-sm font-semibold transition-colors"
              >
                {cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverPlatformCTAs;
