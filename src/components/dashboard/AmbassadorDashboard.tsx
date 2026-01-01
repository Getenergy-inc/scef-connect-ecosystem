import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Flag, Users, Wallet, TrendingUp, Target, 
  Award, BarChart3, ArrowUpRight, Calendar
} from "lucide-react";

interface AmbassadorDashboardProps {
  profile: any;
  user: any;
}

export const AmbassadorDashboard = ({ profile, user }: AmbassadorDashboardProps) => {
  const performanceStats = [
    { label: "Total Referrals", value: "0", icon: Users, change: "+0%", color: "text-forest" },
    { label: "Active Campaigns", value: "0", icon: Flag, change: "0", color: "text-gold" },
    { label: "Commission Earned", value: "$0", icon: Wallet, change: "+$0", color: "text-terracotta" },
    { label: "Conversion Rate", value: "0%", icon: TrendingUp, change: "0%", color: "text-primary" },
  ];

  const targets = [
    { name: "Monthly Referrals", current: 0, target: 10, unit: "members" },
    { name: "Campaign Reach", current: 0, target: 500, unit: "people" },
    { name: "Donation Facilitated", current: 0, target: 1000, unit: "USD" },
  ];

  const activeCampaigns = [
    { 
      name: "Q1 Membership Drive", 
      status: "active",
      progress: 0,
      endDate: "Mar 31, 2026"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-gold to-gold-light rounded-2xl p-6 text-earth">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-6 h-6" />
              <span className="text-sm font-medium">Ambassador</span>
            </div>
            <h2 className="font-display text-2xl font-bold mb-1">
              Welcome, Ambassador {profile?.first_name || ""}!
            </h2>
            <p className="text-earth/80">
              Track your campaigns, referrals, and earnings.
            </p>
          </div>
          <Button variant="secondary" asChild>
            <Link to="/dashboard/campaigns/new">
              <Flag className="w-4 h-4 mr-2" />
              New Campaign
            </Link>
          </Button>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Targets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Monthly Targets
            </CardTitle>
            <CardDescription>Track your progress toward monthly goals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {targets.map((target) => (
              <div key={target.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">{target.name}</span>
                  <span className="text-muted-foreground">
                    {target.current} / {target.target} {target.unit}
                  </span>
                </div>
                <Progress value={(target.current / target.target) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Active Campaigns */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Flag className="w-5 h-5" />
                Active Campaigns
              </CardTitle>
              <CardDescription>Your ongoing ambassador campaigns</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/campaigns">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {activeCampaigns.length > 0 ? (
              <div className="space-y-4">
                {activeCampaigns.map((campaign) => (
                  <div key={campaign.name} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{campaign.name}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-forest/10 text-forest">
                        {campaign.status}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <Progress value={campaign.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{campaign.progress}% complete</span>
                        <span>Ends {campaign.endDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Flag className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No active campaigns</p>
                <Button variant="link" asChild>
                  <Link to="/dashboard/campaigns/new">Create your first campaign</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Referrals */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Recent Referrals
            </CardTitle>
            <CardDescription>Members who joined through your link</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard/referrals">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="font-medium">No referrals yet</p>
            <p className="text-sm">Share your ambassador link to start earning!</p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
          <Link to="/dashboard/campaigns">
            <Flag className="w-5 h-5" />
            <span>Campaigns</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
          <Link to="/dashboard/referrals">
            <Users className="w-5 h-5" />
            <span>Referrals</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
          <Link to="/wallet">
            <Wallet className="w-5 h-5" />
            <span>Earnings</span>
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
