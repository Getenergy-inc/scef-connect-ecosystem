import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const TopUtilityNav = () => {
  const { t, isRTL } = useLocale();

  const utilityLinks = [
    { name: t("nav.utility.bot"), href: "/governance#bot" },
    { name: t("nav.utility.boa"), href: "/governance#boa" },
    { name: t("nav.utility.bod"), href: "/governance#bod" },
    { name: t("nav.utility.lcps"), href: "/governance#lcps" },
    { name: t("nav.utility.management"), href: "/governance#management" },
  ];

  return (
    <div className="bg-scef-blue-darker text-white/75 text-[11px] border-b border-white/5" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        {/* Desktop: Horizontal links */}
        <div className="hidden md:flex items-center justify-between h-7">
          <div className="flex items-center">
            {utilityLinks.map((link, index) => (
              <span key={link.name} className="flex items-center">
                <Link
                  to={link.href}
                  className="px-2.5 py-0.5 hover:text-scef-gold transition-colors font-medium tracking-tight"
                >
                  {link.name}
                </Link>
                {index < utilityLinks.length - 1 && (
                  <span className="text-white/20 select-none">·</span>
                )}
              </span>
            ))}
          </div>
          <LanguageSwitcher />
        </div>

        {/* Mobile: Horizontal scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-3 py-1.5 px-1 whitespace-nowrap">
            {utilityLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "flex items-center gap-1 text-white/70 hover:text-scef-gold transition-colors font-medium",
                  isRTL && "flex-row-reverse"
                )}
              >
                {link.name}
                <ChevronRight className={cn("w-3 h-3", isRTL && "rotate-180")} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
