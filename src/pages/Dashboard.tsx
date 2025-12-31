import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, LogOut, Wallet, Heart, MapPin, Calendar, 
  BookOpen, Award, Users, Settings, Bell
} from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();
      
      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  const quickActions = [
    { icon: Wallet, label: "My Wallet", href: "/wallet", color: "bg-gold/10 text-gold" },
    { icon: Heart, label: "Donate", href: "/donate", color: "bg-terracotta/10 text-terracotta" },
    { icon: MapPin, label: "My Chapters", href: "/local-chapters", color: "bg-forest/10 text-forest" },
    { icon: Calendar, label: "Events", href: "/events", color: "bg-primary/10 text-primary" },
  ];

  const dashboardCards = [
    { 
      icon: Award, 
      title: "NESA Awards", 
      description: "Submit nominations or vote for educators",
      href: "/programs/nesa-africa",
      action: "Explore"
    },
    { 
      icon: Users, 
      title: "Local Chapters", 
      description: "Join or create a chapter in your community",
      href: "/local-chapters",
      action: "Browse"
    },
    { 
      icon: BookOpen, 
      title: "Programs", 
      description: "Explore our education initiatives",
      href: "/programs",
      action: "View All"
    },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard | SCEF - Santos Creations Educational Foundation</title>
        <meta name="description" content="Access your SCEF member dashboard to manage your profile, donations, and chapter memberships." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-earth text-cream py-4 px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-earth" />
            </div>
            <span className="font-display font-bold text-lg">SCEF Dashboard</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-cream hover:text-gold">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-cream hover:text-gold">
              <Settings className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-cream hover:text-gold"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Welcome back, {profile?.first_name || "Member"}!
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your SCEF membership.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {quickActions.map((action) => (
              <Link 
                key={action.label} 
                to={action.href}
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:shadow-md transition-shadow"
              >
                <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-foreground">{action.label}</span>
              </Link>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Profile Card */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  My Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">
                      {profile?.first_name} {profile?.last_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium">
                      {profile?.created_at 
                        ? new Date(profile.created_at).toLocaleDateString() 
                        : "N/A"}
                    </p>
                  </div>
                  <Button variant="outline" className="w-full mt-4" asChild>
                    <Link to="/profile/edit">Edit Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Cards */}
            <div className="md:col-span-2 grid gap-4">
              {dashboardCards.map((card) => (
                <Card key={card.title} className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <card.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{card.title}</CardTitle>
                      <CardDescription>{card.description}</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={card.href}>{card.action}</Link>
                    </Button>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest interactions with SCEF</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No recent activity yet.</p>
                <p className="text-sm">Start by exploring programs or joining a chapter!</p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
