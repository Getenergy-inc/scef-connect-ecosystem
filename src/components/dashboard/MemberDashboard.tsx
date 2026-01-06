import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, Heart, MapPin, Award, BookOpen, 
  Calendar, TrendingUp, Users, Bell
} from "lucide-react";
import { WalletWidget } from "./WalletWidget";
import { VerificationStatus } from "./VerificationStatus";

interface MemberDashboardProps {
  profile: any;
  user: any;
}

export const MemberDashboard = ({ profile, user }: MemberDashboardProps) => {
  const quickStats = [
    { label: "Chapters Joined", value: "0", icon: MapPin, color: "text-forest" },
    { label: "Certifications", value: "0", icon: Award, color: "text-scef-gold" },
    { label: "Donations Made", value: "$0", icon: Heart, color: "text-terracotta" },
    { label: "Events Attended", value: "0", icon: Calendar, color: "text-primary" },
  ];

  const quickActions = [
    { icon: Heart, label: "Donate Now", href: "/donate", color: "bg-terracotta/10 text-terracotta" },
    { icon: MapPin, label: "Join Chapter", href: "/local-chapters", color: "bg-forest/10 text-forest" },
    { icon: Award, label: "Get Certified", href: "/programs/digital-learning", color: "bg-primary/10 text-primary" },
    { icon: Users, label: "Upgrade to Ambassador", href: "/membership#ambassador", color: "bg-scef-gold/10 text-scef-gold" },
  ];

  const programCards = [
    { 
      icon: Award, 
      title: "NESA Awards", 
      description: "Nominate or vote for outstanding educators",
      href: "/programs/nesa-africa",
    },
    { 
      icon: BookOpen, 
      title: "EduAid-Africa", 
      description: "Support scholarships for students in need",
      href: "/programs/eduaid-africa",
    },
    { 
      icon: Users, 
      title: "Rebuild My School", 
      description: "Help rebuild schools across Africa",
      href: "/programs/rebuild-my-school-africa",
    },
  ];

  const announcements = [
    // Placeholder - will be populated from digital board
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-scef-blue to-scef-blue-dark rounded-2xl p-6 text-white border-2 border-black">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold mb-2">
              Welcome back, {profile?.first_name || "Member"}!
            </h2>
            <p className="text-white/80">
              Here's your SCEF membership overview.
            </p>
          </div>
          <Button variant="secondary" size="sm" className="hidden md:flex" asChild>
            <Link to="/updates">
              <Bell className="w-4 h-4 mr-2" />
              Updates
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <Card key={stat.label} className="border-2 border-black">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color} opacity-80`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Link 
            key={action.label} 
            to={action.href}
            className="flex items-center gap-3 p-4 rounded-xl bg-card border-2 border-black hover:shadow-md transition-shadow"
          >
            <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
              <action.icon className="w-5 h-5" />
            </div>
            <span className="font-medium text-foreground text-sm">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Three Column Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="border-2 border-black">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              My Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-black">
                {profile?.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-primary" />
                )}
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {profile?.first_name} {profile?.last_name}
                </p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Member Since</span>
                <span className="font-medium">
                  {profile?.created_at 
                    ? new Date(profile.created_at).toLocaleDateString() 
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location</span>
                <span className="font-medium">
                  {profile?.city && profile?.country 
                    ? `${profile.city}, ${profile.country}` 
                    : "Not set"}
                </span>
              </div>
            </div>
            <Button variant="outline" className="w-full border-2 border-black" asChild>
              <Link to="/dashboard/profile">Edit Profile</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Wallet Widget */}
        <WalletWidget balance={0} agcBalance={0} />

        {/* Verification Status */}
        <VerificationStatus 
          emailVerified={!!user?.email_confirmed_at}
          phoneVerified={!!profile?.phone}
          profileComplete={!!(profile?.first_name && profile?.last_name && profile?.country)}
        />
      </div>

      {/* Programs Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-foreground">Explore Programs</h3>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/programs">View All →</Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {programCards.map((card) => (
            <Card key={card.title} className="hover:shadow-md transition-shadow border-2 border-black">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <card.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to={card.href}>Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity & Announcements */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="border-2 border-black">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest interactions with SCEF</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">No recent activity yet.</p>
              <p className="text-sm">Start by exploring programs or joining a chapter!</p>
            </div>
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card className="border-2 border-black">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Announcements
            </CardTitle>
            <CardDescription>Latest updates from SCEF</CardDescription>
          </CardHeader>
          <CardContent>
            {announcements.length > 0 ? (
              <div className="space-y-3">
                {announcements.map((item: any, i) => (
                  <div key={i} className="p-3 rounded-lg bg-muted">
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="font-medium">No announcements</p>
                <Button variant="link" size="sm" asChild>
                  <Link to="/updates">View all updates</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};