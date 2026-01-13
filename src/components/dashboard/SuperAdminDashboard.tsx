import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Shield, Users, MapPin, Wallet, Briefcase, 
  ClipboardList, Settings, BarChart3, AlertTriangle,
  TrendingUp, Globe, Award, BookOpen
} from "lucide-react";

interface SuperAdminDashboardProps {
  profile: any;
  user: any;
}

export const SuperAdminDashboard = ({ profile, user }: SuperAdminDashboardProps) => {
  const systemStats = [
    { label: "Total Users", value: "0", icon: Users, change: "+0", color: "text-primary" },
    { label: "Active Chapters", value: "0", icon: MapPin, change: "+0", color: "text-forest" },
    { label: "Total Wallet Balance", value: "$0", icon: Wallet, change: "+$0", color: "text-gold" },
    { label: "Active Programs", value: "6", icon: Briefcase, change: "0", color: "text-terracotta" },
  ];

  const recentActivity = [
    // Placeholder - will be populated from audit logs
  ];

  const pendingApprovals = [
    { type: "Chapter", name: "Lagos Chapter", action: "Creation Request", date: "Today" },
    { type: "User", name: "John Doe", action: "Ambassador Upgrade", date: "Yesterday" },
  ];

  const systemHealth = [
    { name: "Database", status: "healthy", uptime: "99.9%" },
    { name: "Authentication", status: "healthy", uptime: "100%" },
    { name: "Storage", status: "healthy", uptime: "99.8%" },
    { name: "Edge Functions", status: "healthy", uptime: "99.5%" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-6 h-6" />
              <span className="text-sm font-medium">Super Admin</span>
            </div>
            <h2 className="font-display text-2xl font-bold mb-1">
              System Control Center
            </h2>
            <p className="text-white/80">
              Full administrative access to SCEF platform.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" asChild>
              <Link to="/dashboard/audit">
                <ClipboardList className="w-4 h-4 mr-2" />
                Audit Logs
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link to="/dashboard/cms">
                <Settings className="w-4 h-4 mr-2" />
                CMS
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {systemStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                <span className="text-xs text-forest">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Three Column Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-gold" />
              Pending Approvals
            </CardTitle>
            <CardDescription>Items requiring your attention</CardDescription>
          </CardHeader>
          <CardContent>
            {pendingApprovals.length > 0 ? (
              <div className="space-y-3">
                {pendingApprovals.map((item, i) => (
                  <div key={i} className="p-3 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {item.type}
                      </span>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.action}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-4 text-muted-foreground">No pending approvals</p>
            )}
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-forest" />
              System Health
            </CardTitle>
            <CardDescription>Infrastructure status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemHealth.map((service) => (
                <div key={service.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      service.status === 'healthy' ? 'bg-forest' : 'bg-terracotta'
                    }`} />
                    <span className="text-sm font-medium">{service.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{service.uptime}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Platform Overview
            </CardTitle>
            <CardDescription>Key metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Countries Active</span>
              <span className="font-bold">0 / 54</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Donations</span>
              <span className="font-bold">$0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Certifications Issued</span>
              <span className="font-bold">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">NESA Nominations</span>
              <span className="font-bold">0</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
        {[
          { icon: Shield, label: "System", href: "/dashboard/system", color: "text-red-500" },
          { icon: Users, label: "Users", href: "/dashboard/users", color: "text-primary" },
          { icon: MapPin, label: "Chapters", href: "/dashboard/chapters", color: "text-forest" },
          { icon: Briefcase, label: "Programs", href: "/dashboard/programs", color: "text-terracotta" },
          { icon: Wallet, label: "Wallets", href: "/dashboard/wallets", color: "text-gold" },
          { icon: Award, label: "Roles", href: "/dashboard/roles", color: "text-purple-500" },
          { icon: BookOpen, label: "eLibrary", href: "/dashboard/elibrary", color: "text-[#0000CD]" },
          { icon: ClipboardList, label: "Digital Board", href: "/admin/digital-board", color: "text-blue-500" },
          { icon: Briefcase, label: "Vacancies", href: "/admin/vacancies", color: "text-forest" },
          { icon: Settings, label: "CMS", href: "/dashboard/cms", color: "text-muted-foreground" },
        ].map((action) => (
          <Button 
            key={action.label}
            variant="outline" 
            className="h-auto py-4 flex-col gap-2" 
            asChild
          >
            <Link to={action.href}>
              <action.icon className={`w-5 h-5 ${action.color}`} />
              <span className="text-xs">{action.label}</span>
            </Link>
          </Button>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5" />
              Recent System Activity
            </CardTitle>
            <CardDescription>Latest actions across the platform</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard/audit">View All Logs</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <ClipboardList className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="font-medium">No recent activity</p>
            <p className="text-sm">System activity will appear here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
