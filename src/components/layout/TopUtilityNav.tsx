import { Link } from "react-router-dom";
import { siteContent } from "@/config/siteContent";
import { ChevronRight } from "lucide-react";

export const TopUtilityNav = () => {
  return (
    <div className="bg-scef-blue-darker text-white/80 text-xs">
      <div className="container mx-auto px-4">
        {/* Desktop: Horizontal links */}
        <div className="hidden md:flex items-center justify-center gap-1 py-2">
          {siteContent.utilityLinks.map((link, index) => (
            <span key={link.name} className="flex items-center">
              <Link
                to={link.href}
                className="px-3 py-1 hover:text-scef-gold transition-colors font-medium"
              >
                {link.name}
              </Link>
              {index < siteContent.utilityLinks.length - 1 && (
                <span className="text-white/30">|</span>
              )}
            </span>
          ))}
        </div>

        {/* Mobile: Horizontal scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-4 py-2 px-2 whitespace-nowrap">
            {siteContent.utilityLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="flex items-center gap-1 text-white/70 hover:text-scef-gold transition-colors font-medium"
              >
                {link.name}
                <ChevronRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
