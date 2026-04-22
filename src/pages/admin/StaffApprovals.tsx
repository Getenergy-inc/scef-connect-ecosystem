import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Check, X, ShieldAlert, Loader2, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "@/hooks/useAuthState";
import { useUserRole } from "@/hooks/useUserRole";

interface PendingProfile {
  id: string;
  user_id: string;
  department_slug: string | null;
  job_role: string | null;
  office_type: string | null;
  work_region: string | null;
  access_level: string;
  status: string;
  employee_id: string | null;
  created_at: string;
  profile?: { first_name: string | null; last_name: string | null; email: string | null } | null;
}

const STATUS_TABS = ["pending", "active", "suspended", "archived"] as const;

const StaffApprovals = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading, user } = useAuthState();
  const { isAdmin, loading: roleLoading } = useUserRole(user?.id ?? null);

  const [tab, setTab] = useState<typeof STATUS_TABS[number]>("pending");
  const [rows, setRows] = useState<PendingProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) navigate("/auth/sign-in?redirect=/admin/staff-approvals");
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (!roleLoading && !isAdmin) {
      // Will render the access-denied card below
    }
  }, [roleLoading, isAdmin]);

  const fetchRows = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("staff_profiles")
      .select("*")
      .eq("status", tab)
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Could not load staff profiles");
      setRows([]);
      setLoading(false);
      return;
    }
    const userIds = (data ?? []).map((r: any) => r.user_id);
    const { data: profiles } = userIds.length
      ? await supabase
          .from("profiles")
          .select("user_id, first_name, last_name, email")
          .in("user_id", userIds)
      : { data: [] as any[] };
    const map = new Map((profiles ?? []).map((p: any) => [p.user_id, p]));
    setRows(
      (data ?? []).map((r: any) => ({
        ...r,
        profile: map.get(r.user_id) ?? null,
      }))
    );
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, isAdmin]);

  const updateStatus = async (id: string, status: "active" | "suspended" | "archived") => {
    setBusyId(id);
    const target = rows.find((r) => r.id === id);
    const { error } = await supabase.from("staff_profiles").update({ status }).eq("id", id);
    if (error) {
      setBusyId(null);
      toast.error("Update failed");
      return;
    }

    // Sync the user_roles table so RoleSwitcher / dashboards pick up the staff role.
    if (target?.user_id) {
      if (status === "active") {
        await supabase
          .from("user_roles")
          .insert({ user_id: target.user_id, role: "staff" })
          // ignore unique-violation if already present
          .then(({ error: insErr }) => {
            if (insErr && !String(insErr.message).toLowerCase().includes("duplicate")) {
              console.warn("Role grant warning:", insErr.message);
            }
          });
      } else if (status === "suspended" || status === "archived") {
        await supabase
          .from("user_roles")
          .delete()
          .eq("user_id", target.user_id)
          .eq("role", "staff");
      }
    }

    setBusyId(null);
    toast.success(
      status === "active"
        ? "Staff access activated & role granted"
        : status === "suspended"
        ? "Access suspended & role revoked"
        : "Profile archived"
    );
    fetchRows();
  };

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20 p-6">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 space-y-4 text-center">
            <ShieldAlert className="w-12 h-12 text-destructive mx-auto" />
            <h2 className="font-display text-xl font-bold text-foreground">Admins only</h2>
            <p className="text-sm text-muted-foreground">
              Only platform administrators can review and approve staff applications.
            </p>
            <Button asChild variant="outline">
              <a href="/dashboard">Back to dashboard</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Staff Approvals | SCEF Admin</title>
      </Helmet>
      <DashboardLayout role="super_admin" title="Staff Approvals">
        <div className="max-w-5xl mx-auto space-y-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Staff Office access
              </h2>
              <p className="text-sm text-muted-foreground">
                Approve, suspend, or archive internal staff applications.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={fetchRows} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
            <TabsList>
              {STATUS_TABS.map((s) => (
                <TabsTrigger key={s} value={s} className="capitalize">
                  {s}
                </TabsTrigger>
              ))}
            </TabsList>

            {STATUS_TABS.map((s) => (
              <TabsContent key={s} value={s} className="mt-4 space-y-3">
                {loading && (
                  <div className="text-center py-10">
                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground mx-auto" />
                  </div>
                )}
                {!loading && rows.length === 0 && (
                  <Card>
                    <CardContent className="pt-6 text-center text-sm text-muted-foreground">
                      No {s} staff profiles.
                    </CardContent>
                  </Card>
                )}
                {!loading &&
                  rows.map((r) => (
                    <Card key={r.id}>
                      <CardHeader className="pb-2">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <CardTitle className="text-base">
                              {r.profile?.first_name || "—"} {r.profile?.last_name || ""}
                            </CardTitle>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {r.profile?.email ?? "(no email)"} · applied{" "}
                              {new Date(r.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge
                            variant={
                              r.status === "active"
                                ? "default"
                                : r.status === "pending"
                                ? "secondary"
                                : "outline"
                            }
                            className="capitalize"
                          >
                            {r.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                          <Field label="Department" value={r.department_slug?.replace(/-/g, " ")} />
                          <Field label="Role" value={r.job_role} />
                          <Field label="Office" value={r.office_type} />
                          <Field label="Region" value={r.work_region} />
                          <Field label="Access level" value={r.access_level} />
                          <Field label="Employee ID" value={r.employee_id} />
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                          {r.status !== "active" && (
                            <Button
                              size="sm"
                              onClick={() => updateStatus(r.id, "active")}
                              disabled={busyId === r.id}
                            >
                              <Check className="w-4 h-4 mr-1" /> Approve
                            </Button>
                          )}
                          {r.status === "active" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateStatus(r.id, "suspended")}
                              disabled={busyId === r.id}
                            >
                              Suspend
                            </Button>
                          )}
                          {r.status !== "archived" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => updateStatus(r.id, "archived")}
                              disabled={busyId === r.id}
                            >
                              <X className="w-4 h-4 mr-1" /> Archive
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

const Field = ({ label, value }: { label: string; value: string | null | undefined }) => (
  <div>
    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className="text-foreground capitalize mt-0.5">{value || "—"}</p>
  </div>
);

export default StaffApprovals;
