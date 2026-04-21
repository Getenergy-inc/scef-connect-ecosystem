import { ENGAGEMENT_PATHS, type EngagementPath } from "@/lib/onboarding";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PathPickerProps {
  selected: EngagementPath | null;
  onSelect: (path: EngagementPath) => void;
}

export const PathPicker = ({ selected, onSelect }: PathPickerProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {ENGAGEMENT_PATHS.map((path) => {
        const Icon = path.icon;
        const isSelected = selected === path.id;
        return (
          <button
            key={path.id}
            type="button"
            onClick={() => onSelect(path.id)}
            className={cn(
              "text-left transition-all duration-200 group",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
            )}
          >
            <Card
              className={cn(
                "p-4 h-full border-2 transition-all duration-200",
                isSelected
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border hover:border-primary/50 hover:shadow-sm"
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm text-foreground truncate">
                      {path.title}
                    </h3>
                    {path.badge && (
                      <Badge variant="secondary" className="text-[10px] py-0 px-1.5 shrink-0">
                        {path.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {path.description}
                  </p>
                </div>
                <ArrowRight
                  className={cn(
                    "w-4 h-4 mt-2 shrink-0 transition-all",
                    isSelected
                      ? "text-primary translate-x-0.5"
                      : "text-muted-foreground/40 group-hover:text-primary"
                  )}
                />
              </div>
            </Card>
          </button>
        );
      })}
    </div>
  );
};
