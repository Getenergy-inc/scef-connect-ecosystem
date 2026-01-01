import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  BookOpen, LogOut, Bell, Settings, Home, User, Wallet, 
  Heart, MapPin, Award, Users, LayoutDashboard, Shield,
  Briefcase, Flag, ClipboardList, MessageSquare, BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

interface DashboardLayoutProps {
  children: ReactNode;
  role: "member" | "ambassador" | "volunteer" | "chapter_admin" | "admin" | "super_admin";
  title: string;
}

const roleNavItems: Record<string, NavItem[]> = {
  member: [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: User, label: "My Profile", href: "/dashboard/profile" },
    { icon: Wallet, label: "My Wallet", href: "/wallet" },
    { icon: MapPin, label: "My Chapters", href: "/dashboard/chapters" },
    { icon: Award, label: "Certifications", href: "/dashboard/certifications" },
    { icon: Heart, label: "My Donations", href: "/dashboard/donations" },
  ],
  ambassador: [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: Flag, label: "Campaigns", href: "/dashboard/campaigns" },
    { icon: BarChart3, label: "Performance", href: "/dashboard/performance" },
    { icon: Users, label: "Referrals", href: "/dashboard/referrals" },
    { icon: Wallet, label: "My Wallet", href: "/wallet" },
    { icon: ClipboardList, label: "Reports", href: "/dashboard/reports" },
  ],
  volunteer: [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: ClipboardList, label: "My Tasks", href: "/dashboard/tasks" },
    { icon: Users, label: "My Team", href: "/dashboard/team" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
    { icon: BarChart3, label: "Progress", href: "/dashboard/progress" },
  ],
  chapter_admin: [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: Users, label: "Members", href: "/dashboard/members" },
    { icon: Flag, label: "Ambassadors", href: "/dashboard/ambassadors" },
    { icon: Wallet, label: "Chapter Wallet", href: "/dashboard/wallet" },
    { icon: MapPin, label: "Events", href: "/dashboard/events" },
    { icon: BarChart3, label: "Reports", href: "/dashboard/reports" },
  ],
  admin: [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: Users, label: "Users", href: "/dashboard/users" },
    { icon: MapPin, label: "Chapters", href: "/dashboard/chapters" },
    { icon: Briefcase, label: "Programs", href: "/dashboard/programs" },
    { icon: Wallet, label: "Financials", href: "/dashboard/financials" },
    { icon: BarChart3, label: "Reports", href: "/dashboard/reports" },
  ],
  super_admin: [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: Shield, label: "System Control", href: "/dashboard/system" },
    { icon: Users, label: "All Users", href: "/dashboard/users" },
    { icon: MapPin, label: "All Chapters", href: "/dashboard/chapters" },
    { icon: Briefcase, label: "All Programs", href: "/dashboard/programs" },
    { icon: Wallet, label: "Wallet Governance", href: "/dashboard/wallets" },
    { icon: ClipboardList, label: "Audit Logs", href: "/dashboard/audit" },
    { icon: Settings, label: "CMS", href: "/dashboard/cms" },
  ],
};

const roleBadges: Record<string, { label: string; className: string }> = {
  member: { label: "Member", className: "bg-primary/20 text-primary" },
  ambassador: { label: "Ambassador", className: "bg-gold/20 text-gold" },
  volunteer: { label: "Volunteer", className: "bg-forest/20 text-forest" },
  chapter_admin: { label: "Chapter Admin", className: "bg-terracotta/20 text-terracotta" },
  admin: { label: "Admin", className: "bg-purple-500/20 text-purple-600" },
  super_admin: { label: "Super Admin", className: "bg-red-500/20 text-red-600" },
};

export const DashboardLayout = ({ children, role, title }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = roleNavItems[role] || roleNavItems.member;
  const badge = roleBadges[role] || roleBadges.member;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-earth" />
            </div>
            <div>
              <span className="font-display font-bold text-foreground">SCEF</span>
              <div className={cn("text-xs px-2 py-0.5 rounded-full mt-0.5 inline-block", badge.className)}>
                {badge.label}
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <h1 className="font-display text-xl font-bold text-foreground">{title}</h1>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
