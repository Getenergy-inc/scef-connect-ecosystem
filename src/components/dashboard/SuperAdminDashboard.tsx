import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Shield, Users, MapPin, Wallet, Briefcase, 
  ClipboardList, Settings, BookOpen, Award,
  LayoutDashboard, FileText, CreditCard, Heart,
  RefreshCw
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
import { useSuperAdminDashboard } from "@/hooks/useSuperAdminDashboard";

interface SuperAdminDashboardProps {
  profile: any;
  user: any;
}

export const SuperAdminDashboard = ({ profile, user }: SuperAdminDashboardProps) => {
  const {
    stats,
    statsLoading,
    transactions,
    transactionsLoading,
    chapterHealth,
    chapterHealthLoading,
    donationChartData,
    donationChartLoading,
    refetchAll,
  } = useSuperAdminDashboard();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatAGC = (amount: number) => {
    return amount.toLocaleString("en-US", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    });
  };

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
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white/70 hover:text-white hover:bg-white/10"
              onClick={refetchAll}
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
            <div className="bg-white/10 rounded-lg px-4 py-2 flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              {statsLoading ? (
                <Skeleton className="h-5 w-24 bg-white/20" />
              ) : (
                <span className="font-semibold">{formatAGC(stats?.totalAGC || 0)} AGC</span>
              )}
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
      {statsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : (
        <DashboardStatsCards
          totalAGC={formatAGC(stats?.totalAGC || 0)}
          totalDonations={formatCurrency(stats?.totalDonations || 0)}
          activeProjects={stats?.activePrograms || 0}
          scholarshipsAwarded={stats?.totalMembers || 0}
        />
      )}

      {/* Two Column Layout - Transaction History & Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <TransactionHistoryTable 
          transactions={transactions} 
          maxRows={5} 
          isLoading={transactionsLoading}
        />
        <DonationsDisbursementsChart 
          data={donationChartData} 
          isLoading={donationChartLoading}
        />
      </div>

      {/* Three Column Layout - Activity, Chapters, Compliance */}
      <div className="grid lg:grid-cols-3 gap-6">
        <ActivityFeed activities={undefined} maxItems={5} />
        <ChapterHealthCard 
          chapters={chapterHealth} 
          isLoading={chapterHealthLoading}
        />
        <div className="space-y-6">
          <RegisteredMembersCard 
            totalMembers={stats?.totalMembers || 0} 
            monthlyGrowth={8.5} 
            isLoading={statsLoading}
          />
          <ComplianceAlertsCard alerts={undefined} />
        </div>
      </div>

      {/* Chapters Overview Chart + Extra Stats */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ChaptersOverviewChart 
          activeChapters={stats?.activeChapters || 0} 
          totalChapters={stats?.totalChapters || 0} 
          isLoading={statsLoading}
        />
        
        {/* Platform Overview */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: MapPin, label: "Countries Active", value: statsLoading ? null : `${stats?.activeChapters || 0} / 54`, color: "text-teal-500", bg: "bg-teal-50 dark:bg-teal-950" },
            { icon: Briefcase, label: "Active Programs", value: statsLoading ? null : String(stats?.activePrograms || 0), color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950" },
            { icon: BookOpen, label: "eLibrary Resources", value: statsLoading ? null : (stats?.elibraryResources || 0).toLocaleString(), color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950" },
            { icon: Award, label: "Total Chapters", value: statsLoading ? null : String(stats?.totalChapters || 0), color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950" },
          ].map((item) => (
            <div key={item.label} className="bg-card border border-border rounded-xl p-5">
              <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center mb-3`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              {item.value === null ? (
                <Skeleton className="h-8 w-16 mb-1" />
              ) : (
                <p className="text-2xl font-bold text-foreground">{item.value}</p>
              )}
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
            { icon: Heart, label: "CRS Partners", href: "/admin/crs-partners", color: "text-pink-500" },
            { icon: Briefcase, label: "Vacancies", href: "/admin/vacancies", color: "text-green-500" },
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
