import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, Calendar, FileText, Settings, MessageSquare } from "lucide-react";
import { useAuthState } from "@/hooks/useAuthState";

const ChapterAdmin = () => {
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
    { label: "Active Members", value: "45", icon: Users },
    { label: "Pending Approvals", value: "3", icon: FileText },
    { label: "Events This Month", value: "2", icon: Calendar },
    { label: "Messages", value: "8", icon: MessageSquare },
  ];

  return (
    <>
      <Helmet>
        <title>Chapter Admin Portal - SCEF</title>
      </Helmet>
      
      <DashboardLayout role="chapter_admin" title="Chapter Admin">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-scef-gold/10 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-scef-gold" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Chapter Administration</h1>
              <p className="text-muted-foreground">Manage your local SCEF chapter</p>
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
                <Users className="w-5 h-5" />
                <span>Manage Members</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Calendar className="w-5 h-5" />
                <span>Schedule Event</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Settings className="w-5 h-5" />
                <span>Chapter Settings</span>
              </Button>
            </CardContent>
          </Card>

          {/* Coming Soon Notice */}
          <Card className="bg-muted/50 border-dashed">
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">
                Full chapter management features coming soon. Stay tuned for updates.
              </p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ChapterAdmin;
