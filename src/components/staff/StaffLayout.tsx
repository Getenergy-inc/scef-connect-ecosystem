import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, ListTodo, CalendarDays, CalendarRange, FileText,
  Sparkles, Users, LogOut, Home, Bell, ShieldCheck,
} from "lucide-react";

interface Props {
  children: ReactNode;
  title: string;
}

const NAV = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/staff" },
  { icon: ListTodo, label: "Daily Tasks", href: "/staff/tasks" },
  { icon: CalendarDays, label: "Weekly Planner", href: "/staff/weekly" },
  { icon: CalendarRange, label: "Monthly Planner", href: "/staff/monthly" },
  { icon: FileText, label: "Reports", href: "/staff/reports" },
  { icon: Sparkles, label: "AI Assistant", href: "/staff/ai" },
  { icon: Users, label: "Team Review", href: "/staff/review" },
];

export const StaffLayout = ({ children, title }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-muted/20">
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-[hsl(var(--sidebar-background,220_30%_12%))] text-white">
        <div className="p-5 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-scef-gold text-scef-blue-darker font-display font-bold text-sm flex items-center justify-center">
              SCEF
            </div>
            <div>
              <p className="font-display font-bold text-sm">Staff Office</p>
              <p className="text-xs text-white/60">Internal portal</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-1">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white"
          >
            <Home className="w-5 h-5" />
            Member Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/70 hover:bg-destructive/30 hover:text-white"
          >
            <LogOut className="w-5 h-5" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <h1 className="font-display text-lg font-semibold text-foreground">{title}</h1>
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
        </header>

        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};
