import { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/contexts/LocaleContext";

interface EventCountdownProps {
  targetDate: Date;
  eventName: string;
  eventType?: "show" | "gala" | "deadline" | "voting" | "legacy";
  className?: string;
  compact?: boolean;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

const calculateTimeRemaining = (targetDate: Date): TimeRemaining => {
  const now = new Date().getTime();
  const target = targetDate.getTime();
  const total = target - now;

  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((total % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((total % (1000 * 60)) / 1000),
    total,
  };
};

const eventTypeColors = {
  show: "from-blue-600 to-indigo-700",
  gala: "from-amber-500 to-yellow-600",
  deadline: "from-red-500 to-rose-600",
  voting: "from-emerald-500 to-teal-600",
  legacy: "from-purple-500 to-violet-600",
};

const eventTypeBorders = {
  show: "border-blue-500/30",
  gala: "border-amber-500/30",
  deadline: "border-red-500/30",
  voting: "border-emerald-500/30",
  legacy: "border-purple-500/30",
};

export const EventCountdown = ({
  targetDate,
  eventName,
  eventType = "show",
  className,
  compact = false,
}: EventCountdownProps) => {
  const { t } = useLocale();
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(
    calculateTimeRemaining(targetDate)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const isExpired = timeRemaining.total <= 0;

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "rounded-lg flex items-center justify-center text-white font-bold bg-gradient-to-br shadow-lg",
          compact ? "w-10 h-10 text-base" : "w-14 h-14 sm:w-16 sm:h-16 text-xl sm:text-2xl",
          eventTypeColors[eventType]
        )}
      >
        {value.toString().padStart(2, "0")}
      </div>
      <span className={cn(
        "mt-1.5 text-muted-foreground uppercase tracking-wide",
        compact ? "text-[10px]" : "text-xs"
      )}>
        {label}
      </span>
    </div>
  );

  const Separator = () => (
    <div className={cn(
      "flex items-center text-muted-foreground font-light self-start",
      compact ? "text-lg mt-2" : "text-2xl mt-4"
    )}>
      :
    </div>
  );

  if (compact) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="flex gap-1">
          <TimeBlock value={timeRemaining.days} label={t("labels.days") || "Days"} />
          <Separator />
          <TimeBlock value={timeRemaining.hours} label={t("labels.hrs") || "Hrs"} />
          <Separator />
          <TimeBlock value={timeRemaining.minutes} label={t("labels.min") || "Min"} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border bg-card/50 backdrop-blur-sm p-4 sm:p-6",
        eventTypeBorders[eventType],
        className
      )}
    >
      <div className="flex items-center gap-2 mb-4">
        <div
          className={cn(
            "p-2 rounded-lg bg-gradient-to-br text-white",
            eventTypeColors[eventType]
          )}
        >
          {eventType === "gala" ? (
            <Calendar className="w-4 h-4" />
          ) : (
            <Clock className="w-4 h-4" />
          )}
        </div>
        <h3 className="font-semibold text-foreground">{eventName}</h3>
      </div>

      {isExpired ? (
        <div className="text-center py-4">
          <span className="text-lg font-medium text-muted-foreground">
            {t("labels.eventStarted") || "Event has started"}
          </span>
        </div>
      ) : (
        <div className="flex justify-center gap-2 sm:gap-3">
          <TimeBlock value={timeRemaining.days} label={t("labels.days") || "Days"} />
          <Separator />
          <TimeBlock value={timeRemaining.hours} label={t("labels.hrs") || "Hrs"} />
          <Separator />
          <TimeBlock value={timeRemaining.minutes} label={t("labels.min") || "Min"} />
          <Separator />
          <TimeBlock value={timeRemaining.seconds} label={t("labels.sec") || "Sec"} />
        </div>
      )}

      <div className="mt-4 text-center text-sm text-muted-foreground">
        {targetDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    </div>
  );
};
