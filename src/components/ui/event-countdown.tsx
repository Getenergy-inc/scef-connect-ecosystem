import { useState, useEffect } from "react";
import { Calendar, Clock, Sparkles, Trophy, Vote, Building2, AlertCircle } from "lucide-react";
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
  const config = eventTypeConfig[eventType];
  const IconComponent = config.icon;

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "rounded-lg flex items-center justify-center text-white font-bold bg-gradient-to-br shadow-lg",
          compact ? "w-12 h-12 text-lg" : "w-16 h-16 sm:w-18 sm:h-18 text-2xl sm:text-3xl",
          config.gradient
        )}
        style={{ minWidth: compact ? '3rem' : '4rem' }}
      >
        {value.toString().padStart(2, "0")}
      </div>
      <span className={cn(
        "mt-2 text-white/70 uppercase tracking-wider font-medium",
        compact ? "text-[10px]" : "text-xs"
      )}>
        {label}
      </span>
    </div>
  );

  if (compact) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <div className="flex gap-2">
          <TimeBlock value={timeRemaining.days} label={t("labels.days") || "Days"} />
          <TimeBlock value={timeRemaining.hours} label={t("labels.hrs") || "Hrs"} />
          <TimeBlock value={timeRemaining.minutes} label={t("labels.min") || "Min"} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border p-6 relative overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl",
        config.border,
        className
      )}
      style={{ backgroundColor: 'rgba(26, 26, 26, 0.8)' }}
    >
      {/* Background gradient overlay */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-30",
        config.bgGradient
      )} />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className={cn(
              "p-2.5 rounded-xl text-white shadow-lg",
              config.iconBg
            )}
          >
            <IconComponent className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-lg">{eventName}</h3>
        </div>

        {isExpired ? (
          <div className="text-center py-6">
            <Sparkles className="w-8 h-8 mx-auto mb-2 text-amber-400" />
            <span className="text-lg font-semibold text-white">
              {t("labels.eventStarted") || "Event has started!"}
            </span>
          </div>
        ) : (
          <div className="flex justify-center gap-3 sm:gap-4">
            <TimeBlock value={timeRemaining.days} label={t("labels.days") || "Days"} />
            <TimeBlock value={timeRemaining.hours} label={t("labels.hrs") || "Hrs"} />
            <TimeBlock value={timeRemaining.minutes} label={t("labels.min") || "Min"} />
            <TimeBlock value={timeRemaining.seconds} label={t("labels.sec") || "Sec"} />
          </div>
        )}

        {/* Date display */}
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