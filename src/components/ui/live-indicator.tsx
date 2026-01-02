import { cn } from "@/lib/utils";

interface LiveIndicatorProps {
  isLive: boolean;
  className?: string;
}

export const LiveIndicator = ({ isLive, className }: LiveIndicatorProps) => {
  if (!isLive) return null;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wide animate-pulse",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
      </span>
      Live
    </div>
  );
};
