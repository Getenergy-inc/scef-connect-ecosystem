import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const TopUtilityNav = () => {
  const { t, isRTL } = useLocale();

  const utilityLinks = [
    { key: 'gov.bot', href: '/governance#bot' },
    { key: 'gov.boa', href: '/governance#boa' },
    { key: 'gov.bod', href: '/governance#bod' },
    { key: 'gov.lcps', href: '/governance#lcps' },
    { key: 'gov.management', href: '/governance#management' },
  ];

  return (
    <div className="bg-scef-blue-darker text-white/80 text-xs">
      <div className="container mx-auto px-4">
        {/* Desktop: Horizontal links */}
        <div className="hidden md:flex items-center justify-between py-2">
          <div className="flex items-center gap-1">
            {utilityLinks.map((link, index) => (
              <span key={link.key} className="flex items-center">
                <Link
                  to={link.href}
                  className="px-3 py-1 hover:text-scef-gold transition-colors font-medium"
                >
                  {t(link.key)}
                </Link>
                {index < utilityLinks.length - 1 && (
                  <span className="text-white/30">|</span>
                )}
              </span>
            ))}
          </div>
          <LanguageSwitcher variant="inline" />
        </div>

        {/* Mobile: Horizontal scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex items-center justify-between gap-4 py-2 px-2 whitespace-nowrap">
            <div className="flex items-center gap-3">
              {utilityLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.key}
                  to={link.href}
                  className="text-white/70 hover:text-scef-gold transition-colors font-medium text-[10px]"
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>
            <LanguageSwitcher variant="header" className="text-xs" />
          </div>
        </div>
      </div>
    </div>
  );
};
