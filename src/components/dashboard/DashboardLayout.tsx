import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  BookOpen, LogOut, Bell, Settings, Home, User, Wallet, 
  Heart, MapPin, Award, Users, LayoutDashboard, Shield,
  Briefcase, Flag, ClipboardList, MessageSquare, BarChart3,
  Search, CreditCard, ChevronDown, FileText, Handshake,
  Image, Megaphone, UserCheck
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
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: MapPin, label: "Local Chapters", href: "/dashboard/chapters" },
    { icon: Briefcase, label: "Projects", href: "/dashboard/programs" },
    { icon: Award, label: "Scholarships & Grants", href: "/dashboard/scholarships" },
    { icon: Wallet, label: "Wallet & Transactions", href: "/dashboard/wallets" },
    { icon: Users, label: "Users & Profiles", href: "/dashboard/users" },
    { icon: FileText, label: "Reports", href: "/dashboard/reports" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ],
};

// CMS Admin navigation items (for super_admin and admin roles)
const cmsAdminItems: NavItem[] = [
  { icon: Megaphone, label: "Digital Board", href: "/admin/digital-board" },
  { icon: UserCheck, label: "Endorsements", href: "/admin/endorsements" },
  { icon: Handshake, label: "CRS Partners", href: "/admin/crs-partners" },
  { icon: Briefcase, label: "Vacancies", href: "/admin/vacancies" },
  { icon: BookOpen, label: "eLibrary", href: "/dashboard/elibrary" },
];

const roleBadges: Record<string, { label: string; className: string }> = {
  member: { label: "Member", className: "bg-primary/20 text-primary" },
  ambassador: { label: "Ambassador", className: "bg-scef-gold/25 text-scef-gold-dark" },
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

  const isSuperAdmin = role === "super_admin";

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className={cn(
        "hidden md:flex flex-col border-r border-border",
        isSuperAdmin ? "w-64 bg-[#1e3a5f]" : "w-64 bg-card"
      )}>
        {/* Logo */}
        <div className={cn(
          "p-5 border-b",
          isSuperAdmin ? "border-white/10" : "border-border"
        )}>
          <Link to="/" className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-sm",
              isSuperAdmin ? "bg-scef-gold text-scef-blue-darker" : "bg-gradient-to-br from-scef-gold to-scef-gold-light text-scef-blue-darker"
            )}>
              SCEF
            </div>
            <div>
              <span className={cn(
                "font-display font-bold text-sm",
                isSuperAdmin ? "text-white" : "text-foreground"
              )}>
                Santos Creations
              </span>
              <p className={cn(
                "text-xs",
                isSuperAdmin ? "text-white/60" : "text-muted-foreground"
              )}>
                Educational Foundation
              </p>
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
                  isSuperAdmin 
                    ? isActive 
                      ? "bg-white/20 text-white" 
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                    : isActive 
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

        {/* CMS Admin Section for Super Admin */}
        {isSuperAdmin && (
          <div className="px-4 pb-2">
            <div className="mb-2">
              <span className="px-4 text-xs font-semibold uppercase tracking-wider text-white/40">
                CMS Admin
              </span>
            </div>
            {cmsAdminItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-white/20 text-white" 
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}

        {/* Sidebar Footer */}
        <div className={cn(
          "p-4 border-t space-y-1",
          isSuperAdmin ? "border-white/10" : "border-border"
        )}>
          <Link
            to="/"
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isSuperAdmin 
                ? "text-white/70 hover:bg-white/10 hover:text-white"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Home className="w-5 h-5" />
            Back to Site
          </Link>
          <button
            onClick={handleLogout}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isSuperAdmin 
                ? "text-white/70 hover:bg-red-500/20 hover:text-red-300"
                : "text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            )}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className={cn(
          "h-16 flex items-center justify-between px-6 border-b",
          isSuperAdmin ? "bg-[#1e3a5f] border-white/10" : "bg-card border-border"
        )}>
          {/* Search Bar */}
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full">
              <Search className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
                isSuperAdmin ? "text-white/50" : "text-muted-foreground"
              )} />
              <Input 
                placeholder="Search..." 
                className={cn(
                  "pl-9 w-full",
                  isSuperAdmin 
                    ? "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                    : ""
                )}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* AGC Balance Indicator */}
            {isSuperAdmin && (
              <div className="hidden sm:flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5 text-white">
                <CreditCard className="w-4 h-4" />
                <span className="text-sm font-semibold">1,230.000 AGC</span>
              </div>
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                isSuperAdmin ? "text-white/70 hover:text-white hover:bg-white/10" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Bell className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className={cn(
                isSuperAdmin ? "text-white/70 hover:text-white hover:bg-white/10" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto bg-muted/30">
          {children}
        </main>
      </div>
    </div>
  );
};
