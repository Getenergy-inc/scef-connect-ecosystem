import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContributorAvatarProps {
  src?: string;
  alt: string;
  /** Tailwind size classes, e.g. "w-24 h-24" */
  size?: string;
  className?: string;
}

/**
 * Circular passport-style avatar.
 * Renders a real headshot when `src` is set, otherwise a respectful
 * SCEF-branded placeholder ring (no AI faces, no stock people).
 */
export const ContributorAvatar = ({
  src,
  alt,
  size = "w-24 h-24",
  className,
}: ContributorAvatarProps) => {
  return (
    <div
      className={cn(
        "relative shrink-0 rounded-full overflow-hidden ring-2 ring-scef-gold/40 ring-offset-2 ring-offset-background bg-scef-blue-darker",
        size,
        className,
      )}
    >
      {src ? (
        <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-scef-pattern bg-scef-blue-darker/95 flex flex-col items-center justify-center text-scef-gold/80">
          <UserRound className="w-1/2 h-1/2" aria-hidden="true" />
          <span className="sr-only">Passport photo pending</span>
        </div>
      )}
      {!src && (
        <span className="absolute inset-x-0 bottom-0 bg-scef-blue-darker/85 text-[8px] font-semibold uppercase tracking-[0.15em] text-scef-gold/90 text-center py-0.5">
          Photo pending
        </span>
      )}
    </div>
  );
};

export default ContributorAvatar;
