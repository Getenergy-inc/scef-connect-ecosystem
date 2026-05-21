import { Link } from "react-router-dom";
import { useState } from "react";
import { Heart, LogIn, Wallet, ChevronDown, Menu } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

/**
 * Slim institutional governance/utility bar.
 * Left: SCEF governance & leadership links (BOT, BOA, BOD, LCPs, Management).
 * Right: compact utility actions (Donate, Login, Wallet, Language).
 */
const GOVERNANCE = [
  { name: "Board of Trustees (BOT)", short: "BOT", href: "/governance?tier=bot" },
  { name: "Board of Advisors (BOA)", short: "BOA", href: "/governance?tier=boa" },
  { name: "Board of Directors (BOD)", short: "BOD", href: "/governance?tier=bod" },
  { name: "Local Chapter Presidents (LCPs)", short: "LCPs", href: "/governance?tier=lcp" },
  { name: "Management Team", short: "Management", href: "/governance?tier=management" },
];

const UTILITY = [
  { name: "Donate", href: "/donate", icon: Heart },
  { name: "Log In", href: "/auth/sign-in", icon: LogIn },
  { name: "Wallet", href: "/wallet", icon: Wallet },
];

export const TopUtilityNav = () => {
  const { isRTL } = useLocale();
  const [mobileGovOpen, setMobileGovOpen] = useState(false);

  return (
    <div
      className="bg-scef-blue-darker text-white/85 text-[11.5px] border-b border-white/5"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between h-8">
          {/* Governance links — left */}
          <ul className="flex items-center">
            <li className="pr-3 mr-1 border-r border-white/15">
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/55 font-semibold">
                Governance
              </span>
            </li>
            {GOVERNANCE.map((link, i) => (
              <li key={link.short} className="flex items-center">
                <Link
                  to={link.href}
                  title={link.name}
                  className="px-2.5 py-1 hover:text-scef-gold transition-colors font-medium tracking-tight whitespace-nowrap"
                >
                  <span className="hidden xl:inline">{link.name}</span>
                  <span className="xl:hidden">{link.short}</span>
                </Link>
                {i < GOVERNANCE.length - 1 && (
                  <span className="text-white/15 select-none">·</span>
                )}
              </li>
            ))}
          </ul>

          {/* Utility — right */}
          <div className="flex items-center gap-1">
            {UTILITY.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 hover:text-scef-gold transition-colors font-medium tracking-tight whitespace-nowrap",
                    isRTL && "flex-row-reverse"
                  )}
                >
                  <Icon className="w-3 h-3 opacity-70" />
                  {link.name}
                </Link>
              );
            })}
            <span className="text-white/15 mx-1 select-none">·</span>
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center justify-between h-8 text-[11px]">
          <button
            onClick={() => setMobileGovOpen((o) => !o)}
            className="flex items-center gap-1 px-1 py-1 font-semibold tracking-tight text-white/90 hover:text-scef-gold"
            aria-expanded={mobileGovOpen}
            aria-label="Governance & Leadership"
          >
            <Menu className="w-3.5 h-3.5 opacity-70" />
            Governance
            <ChevronDown
              className={cn("w-3 h-3 transition-transform", mobileGovOpen && "rotate-180")}
            />
          </button>
          <div className="flex items-center gap-3">
            <Link to="/donate" className="text-white/85 hover:text-scef-gold font-medium">
              Donate
            </Link>
            <Link to="/auth/sign-in" className="text-white/85 hover:text-scef-gold font-medium">
              Log In
            </Link>
            <LanguageSwitcher />
          </div>
        </div>

        {mobileGovOpen && (
          <div className="md:hidden border-t border-white/10 py-2 animate-fade-in">
            <ul className="flex flex-col">
              {GOVERNANCE.map((link) => (
                <li key={link.short}>
                  <Link
                    to={link.href}
                    onClick={() => setMobileGovOpen(false)}
                    className="block px-2 py-1.5 text-[12px] text-white/85 hover:text-scef-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/wallet"
                  onClick={() => setMobileGovOpen(false)}
                  className="block px-2 py-1.5 text-[12px] text-white/70 hover:text-scef-gold border-t border-white/10 mt-1"
                >
                  Wallet Access (GFA)
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
