import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings, Bell, Shield, Globe, Palette, LogOut } from "lucide-react";
import { useAuthState } from "@/hooks/useAuthState";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuthState();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/auth/sign-in");
    }
  }, [isAuthenticated, loading, navigate]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Settings - SCEF</title>
      </Helmet>
      
      <DashboardLayout role="member" title="Settings">
        <div className="max-w-2xl space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Settings className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Manage your account preferences</p>
            </div>
          </div>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notif">Email notifications</Label>
                <Switch id="email-notif" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="chapter-notif">Chapter updates</Label>
                <Switch id="chapter-notif" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="event-notif">Event reminders</Label>
                <Switch id="event-notif" defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <CardTitle>Privacy</CardTitle>
              </div>
              <CardDescription>Control your privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="public-profile">Public profile</Label>
                <Switch id="public-profile" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="show-activity">Show activity status</Label>
                <Switch id="show-activity" defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Language */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-muted-foreground" />
                <CardTitle>Language & Region</CardTitle>
              </div>
              <CardDescription>Set your preferred language</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Language settings can be changed using the language switcher in the header.
              </p>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-muted-foreground" />
                <CardTitle>Appearance</CardTitle>
              </div>
              <CardDescription>Customize the look and feel</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Theme customization coming soon.
              </p>
            </CardContent>
          </Card>

          {/* Sign Out */}
          <Card className="border-destructive/50">
            <CardContent className="pt-6">
              <Button variant="destructive" onClick={handleSignOut} className="w-full">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default SettingsPage;
