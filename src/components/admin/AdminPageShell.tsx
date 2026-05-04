import { Helmet } from "react-helmet-async";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuthState } from "@/hooks/useAuthState";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface Props {
  title: string;
  description?: string;
  children: ReactNode;
}

export function AdminPageShell({ title, description, children }: Props) {
  const navigate = useNavigate();
  const { isAuthenticated, loading, user } = useAuthState();

  const { data: isAdmin, isLoading: roleLoading } = useQuery({
    queryKey: ["is-admin", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user!.id)
        .in("role", ["admin", "super_admin", "hq_admin"]);
      return (data?.length ?? 0) > 0;
    },
  });

  useEffect(() => {
    if (!loading && !isAuthenticated) navigate("/auth/sign-in");
    if (!loading && !roleLoading && isAuthenticated && isAdmin === false) {
      navigate("/dashboard");
    }
  }, [loading, roleLoading, isAuthenticated, isAdmin, navigate]);

  if (loading || roleLoading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading…
      </div>
    );
  }

  return (
    <>
      <Helmet><title>{title} — SCEF Admin</title></Helmet>
      <DashboardLayout role="admin" title={title}>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-scef-blue-darker">{title}</h1>
            {description && <p className="text-muted-foreground">{description}</p>}
          </div>
          {children}
        </div>
      </DashboardLayout>
    </>
  );
}
