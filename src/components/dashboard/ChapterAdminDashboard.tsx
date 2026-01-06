import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { WalletWidget } from "./WalletWidget";
import { VerificationStatus } from "./VerificationStatus";
import { 
  Users, Flag, Wallet, MapPin, Calendar, 
  TrendingUp, BarChart3, CheckCircle, AlertCircle
} from "lucide-react";

interface ChapterAdminDashboardProps {
  profile: any;
  user: any;
}

export const ChapterAdminDashboard = ({ profile, user }: ChapterAdminDashboardProps) => {
  const chapterStats = [
    { label: "Total Members", value: "0", icon: Users, change: "+0", color: "text-primary" },
    { label: "Ambassadors", value: "0", icon: Flag, change: "+0", color: "text-gold" },
    { label: "Chapter Balance", value: "$0", icon: Wallet, change: "+$0", color: "text-forest" },
    { label: "Events Held", value: "0", icon: Calendar, change: "0", color: "text-terracotta" },
  ];

  const complianceItems = [
    { name: "Monthly Report", status: "pending", dueDate: "Jan 31, 2026" },
    { name: "Financial Statement", status: "complete", dueDate: "Jan 15, 2026" },
    { name: "Member Verification", status: "pending", dueDate: "Feb 5, 2026" },
  ];

  const upcomingEvents = [
    // Placeholder - will be populated from database
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-terracotta to-terracotta/90 rounded-2xl p-6 text-cream">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-6 h-6" />
              <span className="text-sm font-medium">Chapter Admin</span>
            </div>
            <h2 className="font-display text-2xl font-bold mb-1">
              Chapter Dashboard
            </h2>
            <p className="text-cream/80">
              Manage your chapter members, events, and finances.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" asChild>
              <Link to="/dashboard/events/new">
                <Calendar className="w-4 h-4 mr-2" />
                New Event
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Chapter Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {chapterStats.map((stat) => (
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

      {/* Wallet & Verification Status */}
      <div className="grid lg:grid-cols-2 gap-6">
        <WalletWidget />
        <VerificationStatus 
          emailVerified={!!user?.email}
          profileComplete={!!(profile?.first_name && profile?.last_name)}
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Member Overview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Members
              </CardTitle>
              <CardDescription>Chapter membership overview</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/members">Manage</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Active Members</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Pending Approvals</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Ambassadors</span>
                <span className="font-medium">0</span>
              </div>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">Membership Growth</p>
              <Progress value={0} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">0% toward monthly target</p>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Compliance Status
            </CardTitle>
            <CardDescription>HQ requirements and deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {complianceItems.map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    {item.status === 'complete' ? (
                      <CheckCircle className="w-5 h-5 text-forest" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-gold" />
                    )}
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Due: {item.dueDate}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.status === 'complete' 
                      ? 'bg-forest/10 text-forest' 
                      : 'bg-gold/10 text-gold'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chapter Wallet */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Chapter Wallet
            </CardTitle>
            <CardDescription>Financial overview and transactions</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard/wallet">View Details</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="text-3xl font-bold text-foreground">$0.00</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Donations Received</p>
              <p className="text-3xl font-bold text-forest">$0.00</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Disbursements</p>
              <p className="text-3xl font-bold text-gold">$0.00</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
          <Link to="/dashboard/members">
            <Users className="w-5 h-5" />
            <span>Members</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
          <Link to="/dashboard/events">
            <Calendar className="w-5 h-5" />
            <span>Events</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
          <Link to="/dashboard/wallet">
            <Wallet className="w-5 h-5" />
            <span>Wallet</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
          <Link to="/dashboard/reports">
            <BarChart3 className="w-5 h-5" />
            <span>Reports</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};
