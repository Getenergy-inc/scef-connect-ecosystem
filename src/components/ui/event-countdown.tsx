import { useState, useEffect } from "react";
import { Calendar, Clock, CheckCircle2, Vote, Building2, AlertCircle, Radio } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/contexts/LocaleContext";
import { getEventStatus, type EventStatus } from "@/config/nesaSeasonConfig";

interface EventCountdownProps {
  targetDate: Date;
  endDate?: Date;
  eventName: string;
  eventType?: "show" | "gala" | "deadline" | "voting" | "legacy";
  className?: string;
  compact?: boolean;
  featured?: boolean;
  location?: string;
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

const eventTypeConfig = {
  show: {
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-500/20 to-indigo-600/20",
    border: "border-blue-500/40",
    icon: Clock,
    iconBg: "bg-blue-500",
  },
  gala: {
    gradient: "from-amber-400 to-yellow-500",
    bgGradient: "from-amber-400/20 to-yellow-500/20",
    border: "border-amber-500/40",
    icon: Calendar,
    iconBg: "bg-amber-500",
  },
  deadline: {
    gradient: "from-red-500 to-rose-600",
    bgGradient: "from-red-500/20 to-rose-600/20",
    border: "border-red-500/40",
    icon: AlertCircle,
    iconBg: "bg-red-500",
  },
  voting: {
    gradient: "from-emerald-400 to-teal-500",
    bgGradient: "from-emerald-400/20 to-teal-500/20",
    border: "border-emerald-500/40",
    icon: Vote,
    iconBg: "bg-emerald-500",
  },
  legacy: {
    gradient: "from-purple-400 to-violet-500",
    bgGradient: "from-purple-400/20 to-violet-500/20",
    border: "border-purple-500/40",
    icon: Building2,
    iconBg: "bg-purple-500",
  },
};

const StatusBadge = ({ status }: { status: EventStatus }) => {
  if (status === "upcoming") return null;

  const config = {
    now_live: {
      label: "Now Live",
      className: "bg-red-500/20 text-red-400 border-red-500/40",
      icon: Radio,
      pulse: true,
    },
    completed: {
      label: "Completed",
      className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
      icon: CheckCircle2,
      pulse: false,
    },
    closed: {
      label: "Closed",
      className: "bg-white/10 text-white/70 border-white/20",
      icon: CheckCircle2,
      pulse: false,
    },
  }[status];

  const Icon = config.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold uppercase tracking-wide",
        config.className
      )}
    >
      <Icon className={cn("w-3 h-3", config.pulse && "animate-pulse")} />
      {config.label}
    </span>
  );
};

export const EventCountdown = ({
  targetDate,
  endDate,
  eventName,
  eventType = "show",
  className,
  compact = false,
  featured = false,
  location,
}: EventCountdownProps) => {
  const { t } = useLocale();
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(
    calculateTimeRemaining(targetDate)
  );
  const [status, setStatus] = useState<EventStatus>(
    getEventStatus(targetDate, endDate, eventType)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetDate));
      setStatus(getEventStatus(targetDate, endDate, eventType));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, endDate, eventType]);

  const config = eventTypeConfig[eventType];
  const IconComponent = config.icon;
  const isUpcoming = status === "upcoming";

  const TimeBlock = ({ value, label, large = false }: { value: number; label: string; large?: boolean }) => (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "rounded-lg flex items-center justify-center text-white font-bold bg-gradient-to-br shadow-lg tabular-nums",
          large
            ? "w-20 h-20 sm:w-24 sm:h-24 text-3xl sm:text-4xl"
            : compact
            ? "w-12 h-12 text-lg"
            : "w-16 h-16 sm:w-18 sm:h-18 text-2xl sm:text-3xl",
          config.gradient
        )}
      >
        {value.toString().padStart(2, "0")}
      </div>
      <span
        className={cn(
          "mt-2 text-white/70 uppercase tracking-wider font-medium",
          large ? "text-xs sm:text-sm" : compact ? "text-[10px]" : "text-xs"
        )}
      >
        {label}
      </span>
    </div>
  );

  // ----- Compact variant -----
  if (compact) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        {isUpcoming ? (
          <div className="flex gap-2">
            <TimeBlock value={timeRemaining.days} label={t("labels.days") || "Days"} />
            <TimeBlock value={timeRemaining.hours} label={t("labels.hrs") || "Hrs"} />
            <TimeBlock value={timeRemaining.minutes} label={t("labels.min") || "Min"} />
          </div>
        ) : (
          <StatusBadge status={status} />
        )}
      </div>
    );
  }

  // ----- Featured (primary gala) variant -----
  if (featured) {
    return (
      <div
        className={cn(
          "rounded-3xl border-2 p-8 md:p-10 relative overflow-hidden shadow-2xl",
          "border-amber-500/50 bg-gradient-to-br from-amber-950/40 via-black/60 to-blue-950/40",
          className
        )}
      >
        {/* Glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-700/20 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500 text-black shadow-lg">
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <p className="text-amber-400 text-xs uppercase tracking-[0.2em] font-semibold">
                  Main Event
                </p>
                <h3 className="font-display font-bold text-white text-2xl md:text-3xl">
                  {eventName}
                </h3>
              </div>
            </div>
            <StatusBadge status={status} />
          </div>

          {isUpcoming ? (
            <div className="flex justify-center gap-3 sm:gap-6 mb-6">
              <TimeBlock value={timeRemaining.days} label={t("labels.days") || "Days"} large />
              <TimeBlock value={timeRemaining.hours} label={t("labels.hrs") || "Hrs"} large />
              <TimeBlock value={timeRemaining.minutes} label={t("labels.min") || "Min"} large />
              <TimeBlock value={timeRemaining.seconds} label={t("labels.sec") || "Sec"} large />
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-2xl font-bold text-white">
                {status === "now_live"
                  ? "The event is live now"
                  : status === "completed"
                  ? "This event has been completed"
                  : "Closed"}
              </p>
            </div>
          )}

          <div className="text-center pt-6 border-t border-white/10">
            <p className="text-white/80 font-medium">
              {targetDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            {location && (
              <p className="text-amber-400/90 text-sm mt-1">{location}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ----- Standard card variant -----
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 relative overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl",
        config.border,
        className
      )}
      style={{ backgroundColor: "rgba(26, 26, 26, 0.8)" }}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-30", config.bgGradient)} />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3 min-w-0">
            <div className={cn("p-2.5 rounded-xl text-white shadow-lg flex-shrink-0", config.iconBg)}>
              <IconComponent className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-lg truncate">{eventName}</h3>
          </div>
          {!isUpcoming && <StatusBadge status={status} />}
        </div>

        {isUpcoming ? (
          <div className="flex justify-center gap-3 sm:gap-4">
            <TimeBlock value={timeRemaining.days} label={t("labels.days") || "Days"} />
            <TimeBlock value={timeRemaining.hours} label={t("labels.hrs") || "Hrs"} />
            <TimeBlock value={timeRemaining.minutes} label={t("labels.min") || "Min"} />
            <TimeBlock value={timeRemaining.seconds} label={t("labels.sec") || "Sec"} />
          </div>
        ) : (
          <div className="text-center py-6">
            <span className="text-base font-medium text-white/80">
              {status === "now_live"
                ? "Happening now"
                : status === "completed"
                ? "Event completed"
                : "Voting closed"}
            </span>
          </div>
        )}

        <div className="mt-5 text-center">
          <p className="text-sm text-white/60">
            {targetDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
