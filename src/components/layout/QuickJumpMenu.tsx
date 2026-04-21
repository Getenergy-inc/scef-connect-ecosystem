import { Link } from "react-router-dom";
import { ChevronDown, Map } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { quickJumpSections, totalPageCount } from "@/config/sitemapConfig";

interface QuickJumpMenuProps {
  variant?: "light" | "dark";
}

export const QuickJumpMenu = ({ variant = "light" }: QuickJumpMenuProps) => {
  const isDark = variant === "dark";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={
            isDark
              ? "bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white gap-2"
              : "bg-card border-border text-foreground gap-2"
          }
        >
          <Map className="w-4 h-4" />
          Jump to a page
          <ChevronDown className="w-3.5 h-3.5 opacity-70" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64 max-h-[70vh] overflow-y-auto">
        <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">
          Browse {totalPageCount}+ pages
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {quickJumpSections.map((s) => {
          const Icon = s.icon;
          return (
            <DropdownMenuItem key={s.href} asChild>
              <Link to={s.href} className="flex items-center gap-2.5 cursor-pointer">
                <Icon className="w-4 h-4 text-scef-blue" />
                <span className="text-sm">{s.label}</span>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
