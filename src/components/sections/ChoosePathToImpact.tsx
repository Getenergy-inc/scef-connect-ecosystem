import { Link } from "react-router-dom";
import {
  Heart,
  School,
  UserPlus,
  Accessibility,
  Building2,
  GraduationCap,
  Users,
  Handshake,
  ArrowRight,
} from "lucide-react";

const paths = [
  { icon: Heart, title: "Donate to Education", href: "/donate" },
  { icon: School, title: "Nominate a School", href: "/nominate" },
  { icon: UserPlus, title: "Support Women & Girls", href: "/programs/women-girls-education" },
  { icon: Accessibility, title: "Support Special Needs Schools", href: "/programs/special-needs-education" },
  { icon: Building2, title: "Register Your School", href: "/programs/training-development#register" },
  { icon: GraduationCap, title: "Sponsor Training", href: "/programs/eduaid-africa" },
  { icon: Users, title: "Join a Local Chapter", href: "/chapters/join" },
  { icon: Handshake, title: "Become a Partner", href: "/partner-with-us" },
];

export const ChoosePathToImpact = () => {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0B5D3B]">
            Get Involved
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-scef-blue-darker md:text-4xl">
            Choose Your Path to Impact
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
            Pick the action that matches your capacity — every path strengthens
            education across Africa.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {paths.map(({ icon: Icon, title, href }) => (
            <Link
              key={title}
              to={href}
              className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/50 hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#0B5D3B]/10 text-[#0B5D3B] transition-colors group-hover:bg-[#0B5D3B] group-hover:text-white">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div className="flex flex-1 items-center justify-between gap-2">
                <span className="text-sm font-semibold leading-tight text-scef-blue-darker">
                  {title}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-[#D4AF37]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChoosePathToImpact;
