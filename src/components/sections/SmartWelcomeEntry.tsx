import { Link } from "react-router-dom";
import { Globe2, Users, ShieldCheck, ArrowRight } from "lucide-react";

/**
 * Smart Welcome Entry Layer — guides users by role.
 * Brand: deep green #0B5D3B, gold #D4AF37, black #0A0A0A, white.
 */
const entries = [
  {
    icon: Globe2,
    title: "Visitor",
    blurb:
      "Explore programs, donate, nominate schools, vote with AGC, and watch SCEF media.",
    cta: "Explore SCEF",
    href: "/about",
    accent: "from-[#0B5D3B] to-[#0E7549]",
  },
  {
    icon: Users,
    title: "Member",
    blurb:
      "Access your dashboard, wallet, chapter, training, and participation tools.",
    cta: "Member Login",
    href: "/auth/sign-in",
    accent: "from-[#D4AF37] to-[#B8961F]",
  },
  {
    icon: ShieldCheck,
    title: "Staff",
    blurb:
      "Secure access to admin dashboards, reports, campaigns, and operations.",
    cta: "Staff Login",
    href: "/staff",
    accent: "from-[#0A0A0A] to-[#2a2a2a]",
  },
];

export const SmartWelcomeEntry = () => {
  return (
    <section className="bg-white py-14 md:py-20 border-y border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase mb-3">
            Welcome to SCEF
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
            Choose how you want to engage
          </h2>
          <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
            Empowering Africa through education, innovation, opportunity,
            transparent funding, and community-driven impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {entries.map(({ icon: Icon, title, blurb, cta, href, accent }) => (
            <Link
              key={title}
              to={href}
              className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-7 md:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${accent}`}
              />
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${accent} text-white mb-5`}
              >
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#0A0A0A] mb-2">
                {title}
              </h3>
              <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-5">
                {blurb}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B5D3B] group-hover:gap-3 transition-all">
                {cta}
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
