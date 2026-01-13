import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Shield, Users, MapPin, Wallet, Briefcase, 
  ClipboardList, Settings, BookOpen, Award,
  LayoutDashboard, FileText, CreditCard, Heart
} from "lucide-react";

// Super Admin Dashboard Components
import { DashboardStatsCards } from "./super-admin/DashboardStatsCards";
import { TransactionHistoryTable } from "./super-admin/TransactionHistoryTable";
import { DonationsDisbursementsChart } from "./super-admin/DonationsDisbursementsChart";
import { ChaptersOverviewChart } from "./super-admin/ChaptersOverviewChart";
import { ChapterHealthCard } from "./super-admin/ChapterHealthCard";
import { ActivityFeed } from "./super-admin/ActivityFeed";
import { ComplianceAlertsCard } from "./super-admin/ComplianceAlertsCard";
import { RegisteredMembersCard } from "./super-admin/RegisteredMembersCard";
import { QuickActionsTabs } from "./super-admin/QuickActionsTabs";

interface SuperAdminDashboardProps {
  profile: any;
  user: any;
}

// Sample transaction data - in production, this would come from Supabase
const sampleTransactions = [
  { id: "1", date: new Date("2023-10-29"), description: "Major Donor Contribution", amount: "$75,000", type: "donation" as const },
  { id: "2", date: new Date("2023-10-29"), description: "Lagos Chapter Operations", amount: "$4,400", type: "disbursement" as const },
  { id: "3", date: new Date("2023-10-29"), description: "Nairobi Chapter Grant", amount: "$3,400", type: "disbursement" as const },
  { id: "4", date: new Date("2023-10-27"), description: "Pretoria Chapter Funding", amount: "$1,420", type: "disbursement" as const },
  { id: "5", date: new Date("2023-10-25"), description: "Annual Membership Dues", amount: "$2,500", type: "dues" as const },
  { id: "6", date: new Date("2023-10-24"), description: "AGC Token Purchase", amount: "$5,000", type: "purchase" as const },
];

// Sidebar navigation items for super admin
const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
  { icon: MapPin, label: "Local Chapters", href: "/dashboard/chapters" },
  { icon: Briefcase, label: "Projects & Programs", href: "/dashboard/programs" },
  { icon: Users, label: "Users & Profiles", href: "/dashboard/users" },
  { icon: Wallet, label: "Wallet & Transactions", href: "/dashboard/wallets" },
  { icon: Award, label: "Scholarships & Grants", href: "/dashboard/scholarships" },
  { icon: Heart, label: "Donations & CSR Partners", href: "/dashboard/donations" },
  { icon: FileText, label: "Media & Reports", href: "/dashboard/reports" },
  { icon: Shield, label: "Admin & Governance", href: "/dashboard/governance" }
];

export const SuperAdminDashboard = ({ profile, user }: SuperAdminDashboardProps) => {
  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] rounded-xl p-5 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold">Super Admin Dashboard</h2>
              <p className="text-white/70 text-sm">Santos Creations Educational Foundation</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/10 rounded-lg px-4 py-2 flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span className="font-semibold">1,230.000 AGC</span>
            </div>
            <Button variant="secondary" size="sm" asChild>
              <Link to="/admin/digital-board">
                <ClipboardList className="w-4 h-4 mr-2" />
                CMS
              </Link>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <Link to="/dashboard/settings">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Navigation Tabs */}
      <QuickActionsTabs />

      {/* Main Stats Cards */}
      <DashboardStatsCards
        totalAGC="1,230.000"
        totalDonations="$750,000"
        activeProjects={44}
        scholarshipsAwarded={1420}
      />

      {/* Two Column Layout - Transaction History & Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <TransactionHistoryTable transactions={sampleTransactions} maxRows={5} />
        <DonationsDisbursementsChart data={undefined} />
      </div>

      {/* Three Column Layout - Activity, Chapters, Compliance */}
      <div className="grid lg:grid-cols-3 gap-6">
        <ActivityFeed activities={undefined} maxItems={5} />
        <ChapterHealthCard chapters={undefined} />
        <div className="space-y-6">
          <RegisteredMembersCard totalMembers={22580} monthlyGrowth={8.5} />
          <ComplianceAlertsCard alerts={undefined} />
        </div>
      </div>

      {/* Chapters Overview Chart + Extra Stats */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ChaptersOverviewChart activeChapters={44} totalChapters={57} />
        
        {/* Platform Overview */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: MapPin, label: "Countries Active", value: "12 / 54", color: "text-teal-500", bg: "bg-teal-50 dark:bg-teal-950" },
            { icon: Briefcase, label: "Active Programs", value: "6", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950" },
            { icon: BookOpen, label: "eLibrary Resources", value: "1,240", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950" },
            { icon: Award, label: "NESA Nominations", value: "328", color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950" },
          ].map((item) => (
            <div key={item.label} className="bg-card border border-border rounded-xl p-5">
              <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center mb-3`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <p className="text-2xl font-bold text-foreground">{item.value}</p>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Admin Actions Grid */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-3">
          {[
            { icon: Shield, label: "System", href: "/dashboard/system", color: "text-red-500" },
            { icon: Users, label: "Users", href: "/dashboard/users", color: "text-primary" },
            { icon: MapPin, label: "Chapters", href: "/dashboard/chapters", color: "text-teal-500" },
            { icon: Briefcase, label: "Programs", href: "/dashboard/programs", color: "text-purple-500" },
            { icon: Wallet, label: "Wallets", href: "/dashboard/wallets", color: "text-amber-500" },
            { icon: Award, label: "Roles", href: "/dashboard/roles", color: "text-orange-500" },
            { icon: BookOpen, label: "eLibrary", href: "/dashboard/elibrary", color: "text-blue-500" },
            { icon: ClipboardList, label: "Digital Board", href: "/admin/digital-board", color: "text-indigo-500" },
            { icon: Briefcase, label: "Vacancies", href: "/admin/vacancies", color: "text-green-500" },
            { icon: Settings, label: "CMS", href: "/dashboard/cms", color: "text-slate-500" },
          ].map((action) => (
            <Button 
              key={action.label}
              variant="outline" 
              className="h-auto py-4 flex-col gap-2 hover:bg-muted" 
              asChild
            >
              <Link to={action.href}>
                <action.icon className={`w-5 h-5 ${action.color}`} />
                <span className="text-xs font-medium">{action.label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
