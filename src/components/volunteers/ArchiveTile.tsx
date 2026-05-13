import { Camera } from "lucide-react";
import { categoryLabels, type ArchiveCategory } from "@/config/volunteersArchive";
import { cn } from "@/lib/utils";

interface ArchiveTileProps {
  src?: string;
  alt: string;
  caption: string;
  year: string;
  category: ArchiveCategory;
  className?: string;
  aspect?: string;
  onClick?: () => void;
}

/**
 * Renders a real photograph when `src` is provided, otherwise renders a
 * labeled SCEF-pattern placeholder tile (no AI faces, no stock people).
 */
export const ArchiveTile = ({
  src,
  alt,
  caption,
  year,
  category,
  className,
  aspect = "aspect-[4/5]",
  onClick,
}: ArchiveTileProps) => {
  const Wrapper = onClick ? "button" : "div";
  return (
    <Wrapper
      onClick={onClick}
      className={cn(
        "group relative w-full overflow-hidden rounded-xl ring-1 ring-border text-left",
        onClick && "cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-scef-gold",
        className,
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={cn("w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]", aspect)}
        />
      ) : (
        <div
          className={cn(
            "relative w-full bg-scef-pattern bg-scef-blue-darker/95 flex flex-col items-center justify-center p-4",
            aspect,
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-scef-blue-darker/70 via-scef-blue-darker/50 to-scef-blue-darker/80" />
          <Camera className="relative w-7 h-7 text-scef-gold/80 mb-2" aria-hidden="true" />
          <span className="relative text-[10px] font-semibold uppercase tracking-[0.2em] text-scef-gold/90">
            Archive photo pending
          </span>
          <span className="relative mt-1 text-[10px] uppercase tracking-[0.18em] text-white/60">
            {categoryLabels[category]}
          </span>
        </div>
      )}

      {/* Caption overlay (always rendered, sits over image or placeholder) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-scef-blue-darker/95 via-scef-blue-darker/40 to-transparent p-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-scef-gold">
            {year}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70">
            {categoryLabels[category]}
          </span>
        </div>
        <p className="mt-1 text-xs md:text-sm font-semibold text-white leading-snug">
          {caption}
        </p>
      </div>
    </Wrapper>
  );
};

export default ArchiveTile;
