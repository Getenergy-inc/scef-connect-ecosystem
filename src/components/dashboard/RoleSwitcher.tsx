import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, UserCog } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

interface Props {
  roles: AppRole[];
  activeRole: AppRole;
  variant?: "light" | "dark";
}

const ROLE_LABEL: Partial<Record<AppRole, string>> = {
  member: "Member",
  ambassador: "Ambassador",
  volunteer: "Volunteer",
  donor: "Donor",
  partner: "Partner / Sponsor",
  chapter_admin: "Chapter Admin",
  admin: "Admin",
  super_admin: "Super Admin",
  hq_admin: "HQ Admin",
  staff: "Staff",
  division_lead: "Division Lead",
  board_bot: "Board of Trustees",
  board_boa: "Board of Advisers",
  board_bod: "Board of Directors",
  lcp: "Local Chapter President",
};

const ROLE_DESTINATION: Partial<Record<AppRole, string>> = {
  staff: "/staff",
  admin: "/dashboard",
  super_admin: "/dashboard",
  chapter_admin: "/portal/chapter-admin",
  ambassador: "/portal/ambassador",
  partner: "/portal/sponsor",
  volunteer: "/dashboard",
  member: "/dashboard",
};

const STORAGE_KEY = "scef.activeRole";

export const setActiveRole = (role: AppRole) => {
  try {
    localStorage.setItem(STORAGE_KEY, role);
  } catch {}
};

export const getActiveRole = (): AppRole | null => {
  try {
    return (localStorage.getItem(STORAGE_KEY) as AppRole) || null;
  } catch {
    return null;
  }
};

export const RoleSwitcher = ({ roles, activeRole, variant = "light" }: Props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!roles || roles.length <= 1) return null;

  const handleSelect = (role: AppRole) => {
    setActiveRole(role);
    setOpen(false);
    const dest = ROLE_DESTINATION[role] ?? "/dashboard";
    navigate(dest);
    // Force a hard refresh of dashboard so role-aware UI updates immediately
    if (dest === "/dashboard") {
      // small timeout to allow router to settle
      setTimeout(() => window.location.reload(), 50);
    }
  };

  const isDark = variant === "dark";

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={
            isDark
              ? "text-white/80 hover:bg-white/10 hover:text-white gap-1.5"
              : "text-foreground hover:bg-muted gap-1.5"
          }
        >
          <UserCog className="w-4 h-4" />
          <span className="hidden sm:inline text-xs font-medium">
            {ROLE_LABEL[activeRole] ?? activeRole}
          </span>
          <ChevronDown className="w-3 h-3 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs">Switch role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {roles.map((r) => (
          <DropdownMenuItem
            key={r}
            onClick={() => handleSelect(r)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span>{ROLE_LABEL[r] ?? r}</span>
            {r === activeRole && <Check className="w-3.5 h-3.5 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
