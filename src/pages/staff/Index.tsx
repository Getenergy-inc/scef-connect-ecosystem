import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { StaffGuard } from "@/components/staff/StaffGuard";
import { StaffLayout } from "@/components/staff/StaffLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  ListTodo, CalendarDays, CalendarRange, FileText, Sparkles,
  ArrowRight, TrendingUp,
} from "lucide-react";
import { useStaffAccess } from "@/hooks/useStaffAccess";

interface Stats {
  todayTasks: number;
  weekDone: number;
  pendingReports: number;
  draftReports: number;
}

const StaffDashboardInner = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>({ todayTasks: 0, weekDone: 0, pendingReports: 0, draftReports: 0 });
  const { profile } = useStaffAccess(userId);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUserId(session?.user?.id ?? null));
  }, []);

  useEffect(() => {
    if (!userId) return;
    const today = new Date().toISOString().slice(0, 10);
    const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
    (async () => {
      const [t, w, pr, dr] = await Promise.all([
        supabase.from("staff_tasks").select("id", { count: "exact", head: true }).eq("user_id", userId).eq("due_date", today).neq("status", "done"),
        supabase.from("staff_tasks").select("id", { count: "exact", head: true }).eq("user_id", userId).eq("status", "done").gte("updated_at", weekAgo),
        supabase.from("staff_reports").select("id", { count: "exact", head: true }).eq("user_id", userId).in("status", ["submitted", "under_review"]),
        supabase.from("staff_reports").select("id", { count: "exact", head: true }).eq("user_id", userId).eq("status", "draft"),
      ]);
      setStats({
        todayTasks: t.count ?? 0,
        weekDone: w.count ?? 0,
        pendingReports: pr.count ?? 0,
        draftReports: dr.count ?? 0,
      });
    })();
  }, [userId]);

  const cards = [
    { label: "Tasks today", value: stats.todayTasks, icon: ListTodo, color: "text-primary" },
    { label: "Done this week", value: stats.weekDone, icon: TrendingUp, color: "text-emerald-600" },
    { label: "Reports in review", value: stats.pendingReports, icon: FileText, color: "text-amber-600" },
    { label: "Draft reports", value: stats.draftReports, icon: FileText, color: "text-muted-foreground" },
  ];

  return (
    <StaffLayout title="Staff Dashboard">
      <Helmet><title>Staff Office | SCEF</title></Helmet>

      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Welcome back{profile?.job_role ? `, ${profile.job_role}` : ""}
          </h2>
          {profile?.department_slug && (
            <Badge variant="secondary" className="capitalize">{profile.department_slug.replace("-", " ")}</Badge>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {cards.map((c) => (
            <Card key={c.label}>
              <CardContent className="pt-5 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">{c.label}</span>
                  <c.icon className={`w-4 h-4 ${c.color}`} />
                </div>
                <p className="text-2xl font-bold text-foreground">{c.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <QuickAction title="Daily Tasks" desc="Manage today's to-dos" href="/staff/tasks" icon={ListTodo} />
          <QuickAction title="Weekly Planner" desc="Goals for this week" href="/staff/weekly" icon={CalendarDays} />
          <QuickAction title="Monthly Planner" desc="Milestones & campaigns" href="/staff/monthly" icon={CalendarRange} />
          <QuickAction title="Submit Daily Report" desc="Today's reporting form" href="/staff/reports?type=daily" icon={FileText} />
          <QuickAction title="AI Assistant" desc="Plan, draft, summarize" href="/staff/ai" icon={Sparkles} highlight />
          <QuickAction title="Team Review" desc="Manager review queue" href="/staff/review" icon={FileText} />
        </div>
      </div>
    </StaffLayout>
  );
};

const QuickAction = ({ title, desc, href, icon: Icon, highlight }: { title: string; desc: string; href: string; icon: any; highlight?: boolean }) => (
  <Card className={highlight ? "border-primary/40 bg-primary/5" : ""}>
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <Icon className={`w-5 h-5 ${highlight ? "text-primary" : "text-muted-foreground"}`} />
        {highlight && <Badge variant="secondary" className="text-[10px]">AI-powered</Badge>}
      </div>
      <CardTitle className="text-base">{title}</CardTitle>
    </CardHeader>
    <CardContent className="pt-0 pb-4 space-y-3">
      <p className="text-xs text-muted-foreground">{desc}</p>
      <Button asChild variant={highlight ? "default" : "outline"} size="sm" className="w-full">
        <Link to={href}>Open <ArrowRight className="w-3 h-3 ml-1" /></Link>
      </Button>
    </CardContent>
  </Card>
);

const StaffDashboard = () => (
  <StaffGuard><StaffDashboardInner /></StaffGuard>
);

export default StaffDashboard;
