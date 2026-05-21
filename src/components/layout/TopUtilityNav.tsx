import { Link } from "react-router-dom";
import { Heart, UserPlus, LogIn, Wallet, Wallet as WalletIcon, CheckSquare } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

/**
 * Slim institutional utility bar — dark, compact, one row.
 * Left: primary user actions. Right: language + wallet/tasks shortcuts.
 */
export const TopUtilityNav = () => {
  const { isRTL } = useLocale();

  const leftLinks = [
    { name: "Donate", href: "/donate", icon: Heart },
    { name: "Become a Member", href: "/auth/sign-up", icon: UserPlus },
    { name: "Log In / Sign Up", href: "/auth/sign-in", icon: LogIn },
    { name: "Wallet Access (GFA)", href: "/wallet", icon: Wallet },
  ];

  const rightLinks = [
    { name: "My Wallet", href: "/wallet", icon: WalletIcon },
    { name: "Tasks", href: "/dashboard/activity", icon: CheckSquare },
  ];

  return (
    <div
      className="bg-scef-blue-darker text-white/80 text-[11.5px] border-b border-white/5"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between h-8">
          <ul className="flex items-center">
            {leftLinks.map((link, i) => (
              <li key={link.name} className="flex items-center">
                <Link
                  to={link.href}
                  className="px-3 py-1 hover:text-scef-gold transition-colors font-medium tracking-tight whitespace-nowrap"
                >
                  {link.name}
                </Link>
                {i < leftLinks.length - 1 && (
                  <span className="text-white/15 select-none">·</span>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <span className="text-white/15 mx-2 select-none">·</span>
            {rightLinks.map((link) => {
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
          </div>
        </div>

        {/* Mobile: horizontal scroll, compact */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-4 py-1.5 px-1 whitespace-nowrap text-[11px]">
            {[...leftLinks, ...rightLinks].map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-white/75 hover:text-scef-gold transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
};
