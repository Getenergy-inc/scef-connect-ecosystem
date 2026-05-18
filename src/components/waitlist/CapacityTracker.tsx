import { useLocale } from "@/contexts/LocaleContext";
import { WAITLIST_CAPACITY } from "@/config/waitlistConfig";
import { Users } from "lucide-react";

interface Props {
  submissionsCount: number;
}

export const CapacityTracker = ({ submissionsCount }: Props) => {
  const { t } = useLocale();
  const remaining = Math.max(0, WAITLIST_CAPACITY - submissionsCount);
  const isFull = remaining === 0;
  const almostFull = !isFull && remaining <= Math.max(20, WAITLIST_CAPACITY * 0.1);
  const pct = Math.min(100, (submissionsCount / WAITLIST_CAPACITY) * 100);

  const text = isFull
    ? t("waitingList.waitlistFull")
    : t("waitingList.remainingSpots")
        .replace("{count}", remaining.toLocaleString())
        .replace("{total}", WAITLIST_CAPACITY.toLocaleString());

  return (
    <div className="bg-white/5 border border-white/15 rounded-lg p-3 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-2">
        <Users className="w-4 h-4 text-scef-gold" />
        <span className="text-xs font-medium text-white/90">{text}</span>
        {almostFull && (
          <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-scef-gold">
            {t("waitingList.almostFull")}
          </span>
        )}
      </div>
      <div
        className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-scef-gold transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};
