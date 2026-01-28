import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, BarChart3, FileText, Image, Download, Calendar } from "lucide-react";
import { useAuthState } from "@/hooks/useAuthState";

const SponsorPortal = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuthState();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/auth/sign-in");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  const stats = [
    { label: "Total Contribution", value: "$5,000", icon: Heart },
    { label: "Programs Supported", value: "3", icon: FileText },
    { label: "Impact Reports", value: "4", icon: BarChart3 },
    { label: "Events Sponsored", value: "2", icon: Calendar },
  ];

  return (
    <>
      <Helmet>
        <title>Sponsor Portal - SCEF</title>
      </Helmet>
      
      <DashboardLayout role="member" title="Sponsor Portal">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-scef-gold/10 flex items-center justify-center">
              <Heart className="w-6 h-6 text-scef-gold" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Sponsor Portal</h1>
              <p className="text-muted-foreground">Track your sponsorship impact and access resources</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <BarChart3 className="w-5 h-5" />
                <span>View Impact Reports</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Image className="w-5 h-5" />
                <span>Brand Assets</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Download className="w-5 h-5" />
                <span>Download Receipts</span>
              </Button>
            </CardContent>
          </Card>

          {/* Coming Soon Notice */}
          <Card className="bg-muted/50 border-dashed">
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">
                Full sponsor management features coming soon. Stay tuned for updates.
              </p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default SponsorPortal;
