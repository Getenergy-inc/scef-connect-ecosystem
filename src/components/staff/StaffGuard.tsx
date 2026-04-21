import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useStaffAccess } from "@/hooks/useStaffAccess";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export const StaffGuard = ({ children }: Props) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/auth/sign-in?redirect=/staff");
        return;
      }
      setUserId(session.user.id);
      setAuthChecked(true);
    });
  }, [navigate]);

  const { loading, profile, hasAccess, isPending } = useStaffAccess(userId);

  if (!authChecked || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-muted-foreground animate-pulse">Verifying staff access…</p>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20 p-6">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 space-y-4 text-center">
            <div className="w-14 h-14 rounded-full bg-amber-500/15 text-amber-600 flex items-center justify-center mx-auto">
              <Clock className="w-7 h-7" />
            </div>
            <h2 className="font-display text-xl font-bold text-foreground">Awaiting approval</h2>
            <p className="text-sm text-muted-foreground">
              Your staff application is under review. You'll receive an email once an administrator activates your access.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/dashboard">Back to my dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!hasAccess && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20 p-6">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 space-y-4 text-center">
            <div className="w-14 h-14 rounded-full bg-destructive/15 text-destructive flex items-center justify-center mx-auto">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <h2 className="font-display text-xl font-bold text-foreground">Staff access required</h2>
            <p className="text-sm text-muted-foreground">
              The Staff Office is reserved for SCEF internal team members. If you're staff, apply for access from sign-up.
            </p>
            <div className="flex gap-2">
              <Button asChild variant="outline" className="flex-1">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button asChild className="flex-1">
                <Link to="/auth/sign-up?path=staff">Apply</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};
