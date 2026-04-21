import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MultiOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: MultiOption[];
  selected: string[];
  onChange: (next: string[]) => void;
  max?: number;
}

export const MultiSelect = ({ options, selected, onChange, max }: MultiSelectProps) => {
  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      if (max && selected.length >= max) return;
      onChange([...selected, value]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isActive = selected.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => toggle(opt.value)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              isActive
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-foreground border-border hover:border-primary/50"
            )}
          >
            {isActive && <Check className="w-3 h-3" />}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};
