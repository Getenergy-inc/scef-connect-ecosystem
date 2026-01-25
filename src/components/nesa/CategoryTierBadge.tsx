import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TierApplicability } from "@/config/nesaCategoriesConfig";

interface CategoryTierBadgeProps {
  tier: keyof TierApplicability;
  className?: string;
}

const tierConfig: Record<keyof TierApplicability, { label: string; className: string }> = {
  platinum: {
    label: 'Platinum',
    className: 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900 border-gray-400',
  },
  gold: {
    label: 'Gold',
    className: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-900 border-amber-500',
  },
  blueGarnet: {
    label: 'Blue Garnet',
    className: 'bg-gradient-to-r from-blue-800 to-blue-900 text-white border-blue-700',
  },
  icon: {
    label: 'Icon',
    className: 'bg-gradient-to-r from-purple-600 to-indigo-700 text-white border-purple-500',
  },
};

export function CategoryTierBadge({ tier, className }: CategoryTierBadgeProps) {
  const config = tierConfig[tier];
  
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "text-xs font-semibold px-2 py-0.5",
        config.className,
        className
      )}
    >
      {config.label}
    </Badge>
  );
}

interface CategoryTierBadgesProps {
  tiers: TierApplicability;
  className?: string;
}

export function CategoryTierBadges({ tiers, className }: CategoryTierBadgesProps) {
  const activeTiers = (Object.keys(tiers) as (keyof TierApplicability)[])
    .filter(tier => tiers[tier]);

  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {activeTiers.map(tier => (
        <CategoryTierBadge key={tier} tier={tier} />
      ))}
    </div>
  );
}
