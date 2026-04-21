import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface MembershipBadgeProps {
  variant?: "gold" | "outline" | "subtle";
  label?: string;
  className?: string;
}

/**
 * Reusable badge expressing SCEF's "membership-run NGO" identity.
 * Use on program cards, hero strips, dashboards, and CTA contexts.
 */
export const MembershipBadge = ({
  variant = "gold",
  label = "Membership-run NGO",
  className,
}: MembershipBadgeProps) => {
  const styles = {
    gold: "bg-scef-gold text-scef-blue-dark border-scef-gold",
    outline: "bg-transparent text-scef-gold border-scef-gold/50",
    subtle: "bg-white/10 text-white border-white/20 backdrop-blur-sm",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold uppercase tracking-[0.14em]",
        styles[variant],
        className
      )}
    >
      <Users className="w-3 h-3" />
      {label}
    </span>
  );
};
