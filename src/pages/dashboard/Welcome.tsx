import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { 
  CheckCircle, Wallet, User, Users, BookOpen, 
  Heart, Award, ArrowRight, Sparkles
} from "lucide-react";
import scefLogo from "@/assets/scef-logo.jpg";

const Welcome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchProfile(session.user.id);
      }
    });
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data } = await supabase
        .from("profiles")
        .select("*, chapters(name, country)")
        .eq("user_id", userId)
        .maybeSingle();
      
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  const nextSteps = [
    {
      icon: User,
      title: "Complete Your Profile",
      description: "Add your bio, photo, and contact details",
      href: "/dashboard/profile",
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-950",
    },
    {
      icon: Wallet,
      title: "Fund Your Wallet",
      description: "Add funds to your GFA Wallet for transactions",
      href: "/wallet",
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-950",
    },
    {
      icon: BookOpen,
      title: "Explore Programs",
      description: "Discover SCEF's education initiatives across Africa",
      href: "/programs",
      color: "text-green-500",
      bg: "bg-green-50 dark:bg-green-950",
    },
    {
      icon: Heart,
      title: "Make a Donation",
      description: "Support education and transform lives",
      href: "/donate",
      color: "text-red-500",
      bg: "bg-red-50 dark:bg-red-950",
    },
    {
      icon: Award,
      title: "Become a Member",
      description: "Join as a member and unlock exclusive benefits",
      href: "/membership",
      color: "text-purple-500",
      bg: "bg-purple-50 dark:bg-purple-950",
    },
    {
      icon: Users,
      title: "Connect with Chapter",
      description: "Engage with your local chapter community",
      href: "/chapter/inbox",
      color: "text-teal-500",
      bg: "bg-teal-50 dark:bg-teal-950",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Welcome to SCEF | Dashboard</title>
        <meta name="description" content="Welcome to Santos Creations Educational Foundation. Get started with your dashboard." />
      </Helmet>

      <DashboardLayout role="member" title="Welcome">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Hero */}
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-6 shadow-lg">
              <Sparkles className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Welcome to SCEF, {profile?.first_name || "Member"}!
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your account has been successfully created. You're now part of a global community 
              dedicated to transforming education across Africa.
            </p>
          </div>

          {/* Chapter Assignment */}
          {profile?.chapters && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="flex items-center gap-4 py-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">You are registered under:</p>
                  <p className="text-lg text-primary font-display">
                    {profile.chapters.name} ({profile.chapters.country})
                  </p>
                </div>
                <Button variant="outline" asChild>
                  <Link to="/chapter/inbox">
                    View Chapter
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* GFA Wallet Card */}
          <Card className="bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] text-white overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <img 
                  src={scefLogo} 
                  alt="GFA Wallet" 
                  className="w-24 h-24 rounded-xl object-contain bg-white p-2"
                />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-display text-xl font-bold mb-2">Your GFA Wallet is Ready</h3>
                  <p className="text-white/70 mb-4">
                    All your donations, dues, and transactions flow through your secure GFA Wallet. 
                    Fund it to get started with memberships, certifications, and more.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                    <Button variant="secondary" asChild>
                      <Link to="/wallet">
                        <Wallet className="w-4 h-4 mr-2" />
                        Open Wallet
                      </Link>
                    </Button>
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                      <Link to="/wallet/fund">
                        Fund Wallet
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps Grid */}
          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              Next Steps
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nextSteps.map((step) => (
                <Card 
                  key={step.title} 
                  className="hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => navigate(step.href)}
                >
                  <CardContent className="p-5">
                    <div className={`w-10 h-10 rounded-lg ${step.bg} flex items-center justify-center mb-3`}>
                      <step.icon className={`w-5 h-5 ${step.color}`} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                    <div className="flex items-center gap-1 mt-3 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Get started <ArrowRight className="w-3 h-3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle>What's Included</CardTitle>
              <CardDescription>Your SCEF membership benefits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Personal Dashboard & Profile",
                  "GFA Wallet for all transactions",
                  "Chapter correspondence & updates",
                  "Access to all SCEF programs",
                  "Donation tracking & receipts",
                  "Event registration & certificates",
                  "Member-only resources",
                  "Voting rights (with AGC)",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Continue Button */}
          <div className="text-center pb-8">
            <Button size="lg" asChild>
              <Link to="/dashboard">
                Go to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Welcome;