import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * Mobile-only sticky Join SCEF CTA. Renders on the homepage only.
 */
export const StickyMobileJoin = () => {
  const { pathname } = useLocation();
  if (pathname !== "/") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-scef-blue-darker/95 px-4 py-3 shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-md md:hidden">
      <Link
        to="/join"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-scef-gold text-base font-semibold text-scef-blue-darker transition-colors hover:bg-scef-gold-hover"
      >
        Join SCEF
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
};
