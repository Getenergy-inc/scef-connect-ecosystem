import { Link, useLocation } from "react-router-dom";
import { Heart, Users, Calendar, Mail } from "lucide-react";

/**
 * Mobile-first sticky action bar — visible on all public pages.
 * 4 quick actions + floating WhatsApp button.
 */
const HIDDEN_PREFIXES = ["/auth", "/dashboard", "/admin", "/staff", "/portal", "/chapter/inbox", "/messages"];

export const StickyMobileJoin = () => {
  const { pathname } = useLocation();
  if (HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) return null;

  const actions = [
    { label: "Join", href: "/auth/sign-up", icon: Users },
    { label: "Donate", href: "/donate", icon: Heart, primary: true },
    { label: "Calendar", href: "/calendar", icon: Calendar },
    { label: "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <>
      {/* Mobile-only sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-scef-blue-darker/95 px-2 py-2 shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-md md:hidden">
        <div className="grid grid-cols-4 gap-1">
          {actions.map(({ label, href, icon: Icon, primary }) => (
            <Link
              key={label}
              to={href}
              className={
                primary
                  ? "flex flex-col items-center justify-center gap-1 rounded-lg bg-scef-gold px-2 py-2 text-[11px] font-semibold text-scef-blue-darker transition-colors hover:bg-scef-gold-hover"
                  : "flex flex-col items-center justify-center gap-1 rounded-lg px-2 py-2 text-[11px] font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-scef-gold"
              }
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
