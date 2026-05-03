import { Link } from "react-router-dom";
import {
  Heart,
  School,
  Vote,
  ClipboardList,
  Users,
  GraduationCap,
  Handshake,
} from "lucide-react";

/**
 * Quick Actions Bar — fast-access strip of the most common conversion actions.
 * Horizontal scroll on mobile, grid on desktop.
 */
const actions = [
  { icon: Heart, label: "Donate", href: "/donate" },
  { icon: School, label: "Nominate a School", href: "/nominate" },
  { icon: Vote, label: "Vote with AGC", href: "/vote" },
  { icon: ClipboardList, label: "Register Your School", href: "/programs/my-career-my-life" },
  { icon: Users, label: "Join a Chapter", href: "/chapters/join-online" },
  { icon: GraduationCap, label: "Sponsor Training", href: "/programs/training-development" },
  { icon: Handshake, label: "Become a Partner", href: "/partner-with-us" },
];

export const QuickActionsBar = () => {
  return (
    <section className="bg-[#0A0A0A] border-y-4 border-[#D4AF37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-5">
        <div className="flex items-center gap-3 md:gap-4 overflow-x-auto md:overflow-visible md:flex-wrap md:justify-center scrollbar-hide">
          {actions.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              to={href}
              className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-[#D4AF37] text-white hover:text-[#0A0A0A] border border-white/10 hover:border-[#D4AF37] text-sm font-semibold whitespace-nowrap transition-all"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
