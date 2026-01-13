import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { 
  Heart, Award, Users, Calendar, FileText, Wallet,
  CheckCircle, Clock, AlertCircle, ArrowRight, 
  GraduationCap, Star, TrendingUp, Gift
} from "lucide-react";
import gfaWalletLogo from "@/assets/gfa-wallet-logo.jpg";

interface Donation {
  id: string;
  amount: number;
  currency: string;
  payment_status: string;
  created_at: string;
  program_id: string | null;
}

interface UserRole {
  role: string;
  created_at: string;
}

interface ChapterMembership {
  chapter_id: string;
  joined_at: string;
  is_admin: boolean;
  chapters?: {
    name: string;
    country: string;
  };
}

interface Event {
  id: string;
  title: string;
  start_date: string;
  location: string | null;
  is_virtual: boolean;
}

const Activity = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [chapterMembership, setChapterMembership] = useState<ChapterMembership | null>(null);
  const [wallet, setWallet] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/auth?redirect=/dashboard/activity");
      } else {
        setUser(session.user);
        fetchAllData(session.user.id);
      }
    });
  }, [navigate]);

  const fetchAllData = async (userId: string) => {
    try {
      // Fetch all data in parallel
      const [profileRes, donationsRes, rolesRes, chapterRes, walletRes] = await Promise.all([
        supabase.from("profiles").select("*, chapters(name, country)").eq("user_id", userId).maybeSingle(),
        supabase.from("donations").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(10),
        supabase.from("user_roles").select("*").eq("user_id", userId),
        supabase.from("chapter_members").select("*, chapters(name, country)").eq("user_id", userId).maybeSingle(),
        supabase.from("wallets").select("*").eq("user_id", userId).maybeSingle(),
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (donationsRes.data) setDonations(donationsRes.data);
      if (rolesRes.data) setRoles(rolesRes.data);
      if (chapterRes.data) setChapterMembership(chapterRes.data);
      if (walletRes.data) setWallet(walletRes.data);
    } catch (error) {
      console.error("Error fetching activity data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalDonations = () => {
    return donations
      .filter(d => d.payment_status === "completed")
      .reduce((sum, d) => sum + d.amount, 0);
  };

  const getMembershipStatus = () => {
    const memberRole = roles.find(r => r.role === "member");
    const ambassadorRole = roles.find(r => ["ambassador"].includes(r.role));
    
    if (ambassadorRole) return { status: "Ambassador", tier: "Active", color: "bg-amber-500" };
    if (memberRole) return { status: "Member", tier: "Active", color: "bg-green-500" };
    return { status: "Guest", tier: "Inactive", color: "bg-gray-500" };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending": return <Clock className="w-4 h-4 text-amber-500" />;
      default: return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <DashboardLayout role="member" title="My Activity">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-primary">Loading activity...</div>
        </div>
      </DashboardLayout>
    );
  }

  const membership = getMembershipStatus();

  return (
    <>
      <Helmet>
        <title>My Activity | SCEF Dashboard</title>
        <meta name="description" content="View your SCEF activity including donations, membership, certifications, and chapter events." />
      </Helmet>

      <DashboardLayout role="member" title="My Activity">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">My Activity</h1>
            <p className="text-muted-foreground">Your complete SCEF engagement overview</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-950 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">${getTotalDonations().toFixed(0)}</p>
                    <p className="text-xs text-muted-foreground">Total Donated</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">${wallet?.balance?.toFixed(2) || "0.00"}</p>
                    <p className="text-xs text-muted-foreground">Wallet Balance</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                    <Award className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{roles.length}</p>
                    <p className="text-xs text-muted-foreground">Active Roles</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                    <Star className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{wallet?.agc_balance?.toFixed(2) || "0.00"}</p>
                    <p className="text-xs text-muted-foreground">AGC Balance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid grid-cols-5 w-full max-w-2xl">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="donations">Donations</TabsTrigger>
              <TabsTrigger value="membership">Membership</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Membership Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Membership Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${membership.color}`} />
                        <span className="text-lg font-semibold">{membership.status}</span>
                      </div>
                      <Badge variant={membership.tier === "Active" ? "default" : "secondary"}>
                        {membership.tier}
                      </Badge>
                    </div>
                    
                    {chapterMembership?.chapters && (
                      <div className="p-3 rounded-lg bg-muted/50 mb-4">
                        <p className="text-sm text-muted-foreground">Chapter</p>
                        <p className="font-medium">{chapterMembership.chapters.name}</p>
                        <p className="text-sm text-muted-foreground">{chapterMembership.chapters.country}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <Link to="/membership">Upgrade</Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <Link to="/get-involved/ambassador">Ambassador</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* GFA Wallet Card */}
                <Card className="bg-gradient-to-br from-earth to-earth/90 text-cream">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-cream">
                      <img src={gfaWalletLogo} alt="GFA Wzip" className="w-6 h-6 rounded object-contain" />
                      GFA Wzip
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-cream/70 text-sm">Available Balance</p>
                      <p className="text-3xl font-display font-bold">${wallet?.balance?.toFixed(2) || "0.00"}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-cream/70 text-xs">AGC Balance</p>
                        <p className="font-semibold">{wallet?.agc_balance?.toFixed(4) || "0.0000"}</p>
                      </div>
                      <div>
                        <p className="text-cream/70 text-xs">Currency</p>
                        <p className="font-semibold">{wallet?.currency || "USD"}</p>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm" asChild className="w-full">
                      <Link to="/wallet">
                        Manage Wallet
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Donations */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5" />
                      Recent Donations
                    </CardTitle>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/donate">Make a Donation</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {donations.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Gift className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p className="font-medium mb-1">No donations yet</p>
                      <p className="text-sm mb-4">Your generosity helps transform education across Africa</p>
                      <Button asChild>
                        <Link to="/donate">Make Your First Donation</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {donations.slice(0, 5).map((donation) => (
                        <div key={donation.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(donation.payment_status)}
                            <div>
                              <p className="font-medium">${donation.amount.toFixed(2)} {donation.currency}</p>
                              <p className="text-xs text-muted-foreground">{formatDate(donation.created_at)}</p>
                            </div>
                          </div>
                          <Badge variant={donation.payment_status === "completed" ? "default" : "secondary"}>
                            {donation.payment_status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Roles */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Your Roles & Permissions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {roles.map((role, idx) => (
                      <Badge key={idx} variant="outline" className="capitalize py-1.5 px-3">
                        {role.role.replace("_", " ")}
                      </Badge>
                    ))}
                    {roles.length === 0 && (
                      <p className="text-muted-foreground text-sm">No special roles assigned</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Donations Tab */}
            <TabsContent value="donations">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Donation History</CardTitle>
                      <CardDescription>All your contributions to SCEF programs</CardDescription>
                    </div>
                    <Button asChild>
                      <Link to="/donate">
                        <Heart className="w-4 h-4 mr-2" />
                        Donate Now
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {donations.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Heart className="w-16 h-16 mx-auto mb-4 opacity-30" />
                      <p className="text-lg font-medium mb-2">No donations yet</p>
                      <p className="text-sm mb-6">Start making an impact today</p>
                      <Button asChild>
                        <Link to="/donate">Make Your First Donation</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {donations.map((donation) => (
                        <div key={donation.id} className="flex items-center justify-between p-4 rounded-xl border border-border">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Heart className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold text-lg">${donation.amount.toFixed(2)} {donation.currency}</p>
                              <p className="text-sm text-muted-foreground">{formatDate(donation.created_at)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {getStatusIcon(donation.payment_status)}
                            <Badge variant={donation.payment_status === "completed" ? "default" : "secondary"}>
                              {donation.payment_status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Membership Tab */}
            <TabsContent value="membership">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Membership</CardTitle>
                    <CardDescription>Your membership status and benefits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${membership.color}`} />
                          <div>
                            <p className="font-semibold text-lg">{membership.status}</p>
                            <p className="text-sm text-muted-foreground">Since {profile?.created_at ? formatDate(profile.created_at) : "N/A"}</p>
                          </div>
                        </div>
                        <Badge>{membership.tier}</Badge>
                      </div>

                      {chapterMembership?.chapters && (
                        <div className="p-4 rounded-xl border border-border">
                          <p className="text-sm font-medium text-muted-foreground mb-1">Chapter Assignment</p>
                          <p className="font-semibold">{chapterMembership.chapters.name}</p>
                          <p className="text-sm text-muted-foreground">{chapterMembership.chapters.country}</p>
                          {chapterMembership.is_admin && (
                            <Badge variant="secondary" className="mt-2">Chapter Admin</Badge>
                          )}
                        </div>
                      )}

                      <Button className="w-full" asChild>
                        <Link to="/membership">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Upgrade Membership
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Ambassador Program</CardTitle>
                    <CardDescription>Become an SCEF Ambassador</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {roles.some(r => r.role === "ambassador") ? (
                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="w-5 h-5 text-amber-600" />
                            <span className="font-semibold text-amber-700 dark:text-amber-400">Ambassador Active</span>
                          </div>
                          <p className="text-sm text-amber-600 dark:text-amber-500">
                            Thank you for being an SCEF Ambassador!
                          </p>
                        </div>
                      ) : (
                        <div className="p-4 rounded-xl bg-muted/50 border border-border">
                          <p className="text-sm text-muted-foreground mb-3">
                            Join our Ambassador Program and help spread the mission of quality education across Africa.
                          </p>
                          <ul className="text-sm space-y-2 mb-4">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Exclusive networking opportunities
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Priority event access
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Leadership recognition
                            </li>
                          </ul>
                        </div>
                      )}
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/get-involved/ambassador">
                          <Award className="w-4 h-4 mr-2" />
                          {roles.some(r => r.role === "ambassador") ? "View Ambassador Status" : "Apply Now"}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Certifications Tab */}
            <TabsContent value="certifications">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Certifications</CardTitle>
                      <CardDescription>Your NESA certifications and verification status</CardDescription>
                    </div>
                    <Button variant="outline" asChild>
                      <Link to="/certifications">
                        <FileText className="w-4 h-4 mr-2" />
                        Request Certification
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <GraduationCap className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p className="text-lg font-medium mb-2">No certifications yet</p>
                    <p className="text-sm mb-6">
                      NESA certifications verify educational standards and achievements
                    </p>
                    <Button asChild>
                      <Link to="/certifications">Explore Certifications</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Chapter Events</CardTitle>
                      <CardDescription>Events you've registered for or attended</CardDescription>
                    </div>
                    <Button variant="outline" asChild>
                      <Link to="/chapter/inbox">
                        <Calendar className="w-4 h-4 mr-2" />
                        View Calendar
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Calendar className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p className="text-lg font-medium mb-2">No events registered</p>
                    <p className="text-sm mb-6">
                      Check your chapter inbox for upcoming events
                    </p>
                    <Button asChild>
                      <Link to="/chapter/inbox">View Chapter Inbox</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Activity;