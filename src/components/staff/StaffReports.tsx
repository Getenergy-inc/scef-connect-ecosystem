import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { StaffGuard } from "./StaffGuard";
import { StaffLayout } from "./StaffLayout";
import { useStaffAccess } from "@/hooks/useStaffAccess";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Sparkles, Save, Send, FileText, Loader2, RefreshCw } from "lucide-react";
import { useSearchParams } from "react-router-dom";

type ReportType = "daily" | "weekly" | "monthly";
type ReportStatus = "draft" | "submitted" | "under_review" | "approved" | "needs_changes";

interface ReportRow {
  id: string;
  user_id: string;
  report_type: ReportType;
  report_date: string;
  period_end: string | null;
  department_slug: string | null;
  key_tasks_completed: string | null;
  issues_encountered: string | null;
  pending_tasks: string | null;
  support_needed: string | null;
  next_priorities: string | null;
  highlights: string | null;
  status: ReportStatus;
  submitted_at: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  review_notes: string | null;
  ai_assisted: boolean | null;
  created_at: string;
  updated_at: string;
}

const STATUS_BADGE: Record<ReportStatus, { label: string; cls: string }> = {
  draft: { label: "Draft", cls: "bg-muted text-muted-foreground" },
  submitted: { label: "Submitted", cls: "bg-blue-500/20 text-blue-700" },
  under_review: { label: "Under review", cls: "bg-amber-500/20 text-amber-700" },
  approved: { label: "Approved", cls: "bg-emerald-500/20 text-emerald-700" },
  needs_changes: { label: "Needs changes", cls: "bg-destructive/20 text-destructive" },
};

const todayISO = () => new Date().toISOString().slice(0, 10);

const StaffReportsInner = () => {
  const [search, setSearch] = useSearchParams();
  const initialType = (search.get("type") as ReportType) || "daily";
  const [reportType, setReportType] = useState<ReportType>(initialType);
  const [userId, setUserId] = useState<string | null>(null);
  const { profile } = useStaffAccess(userId);

  const [draft, setDraft] = useState<Partial<ReportRow>>({
    key_tasks_completed: "",
    issues_encountered: "",
    pending_tasks: "",
    support_needed: "",
    next_priorities: "",
    highlights: "",
  });
  const [history, setHistory] = useState<ReportRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aiBusy, setAiBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUserId(session?.user?.id ?? null));
  }, []);

  useEffect(() => {
    setSearch((s) => {
      const p = new URLSearchParams(s);
      p.set("type", reportType);
      return p;
    });
  }, [reportType, setSearch]);

  const fetchHistory = async () => {
    if (!userId) return;
    setLoading(true);
    const { data } = await supabase
      .from("staff_reports")
      .select("*")
      .eq("user_id", userId)
      .eq("report_type", reportType)
      .order("report_date", { ascending: false })
      .limit(20);
    setHistory((data as ReportRow[] | null) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, reportType]);

  const updateField = (k: keyof ReportRow, v: string) => setDraft((d) => ({ ...d, [k]: v }));

  const buildPayload = (status: ReportStatus): any => {
    const today = todayISO();
    const periodEnd =
      reportType === "weekly"
        ? new Date(Date.now() + 6 * 86400000).toISOString().slice(0, 10)
        : reportType === "monthly"
        ? new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().slice(0, 10)
        : null;
    return {
      user_id: userId,
      report_type: reportType,
      report_date: today,
      period_end: periodEnd,
      department_slug: profile?.department_slug ?? null,
      key_tasks_completed: draft.key_tasks_completed ?? "",
      issues_encountered: draft.issues_encountered ?? "",
      pending_tasks: draft.pending_tasks ?? "",
      support_needed: draft.support_needed ?? "",
      next_priorities: draft.next_priorities ?? "",
      highlights: draft.highlights ?? "",
      status,
      submitted_at: status === "submitted" ? new Date().toISOString() : null,
      ai_assisted: !!draft.ai_assisted,
    };
  };

  const save = async (status: ReportStatus) => {
    if (!userId) return;
    if (status === "submitted" && !draft.key_tasks_completed?.trim()) {
      toast.error("Add at least your completed tasks before submitting");
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("staff_reports").insert(buildPayload(status));
    setSaving(false);
    if (error) {
      toast.error("Could not save report");
      return;
    }
    toast.success(status === "draft" ? "Saved as draft" : "Report submitted for review");
    setDraft({
      key_tasks_completed: "",
      issues_encountered: "",
      pending_tasks: "",
      support_needed: "",
      next_priorities: "",
      highlights: "",
    });
    fetchHistory();
  };

  const aiDraft = async () => {
    if (!userId) return;
    setAiBusy(true);
    try {
      // Pull recent completed tasks as context
      const since =
        reportType === "monthly"
          ? new Date(Date.now() - 30 * 86400000).toISOString()
          : reportType === "weekly"
          ? new Date(Date.now() - 7 * 86400000).toISOString()
          : new Date(Date.now() - 1 * 86400000).toISOString();
      const { data: tasks } = await supabase
        .from("staff_tasks")
        .select("title, status, priority, updated_at")
        .eq("user_id", userId)
        .gte("updated_at", since)
        .order("updated_at", { ascending: false })
        .limit(40);

      const tool = reportType === "weekly" ? "weekly_rollup" : reportType === "monthly" ? "monthly_rollup" : "report_draft";
      const { data, error } = await supabase.functions.invoke("staff-ai-assistant", {
        body: {
          tool,
          context: {
            report_type: reportType,
            department: profile?.department_slug,
            role: profile?.job_role,
            tasks: tasks ?? [],
          },
        },
      });
      if (error) throw error;
      setDraft((d) => ({
        ...d,
        ...data,
        ai_assisted: true,
      }));
      toast.success("AI draft inserted — edit before submitting");
    } catch (e: any) {
      toast.error(e?.message?.includes("402") ? "AI credits required" : "AI draft failed");
    } finally {
      setAiBusy(false);
    }
  };

  const aiBtnLabel = useMemo(
    () =>
      reportType === "daily"
        ? "Draft today's report with AI"
        : reportType === "weekly"
        ? "Roll up the week with AI"
        : "Roll up the month with AI",
    [reportType]
  );

  return (
    <StaffLayout title="Reports">
      <Helmet>
        <title>Reports | SCEF Staff</title>
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-5">
        <Tabs value={reportType} onValueChange={(v) => setReportType(v as ReportType)}>
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value={reportType} className="space-y-5 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    New {reportType} report — {todayISO()}
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={aiDraft}
                    disabled={aiBusy}
                    className="gap-1.5"
                  >
                    {aiBusy ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                    {aiBtnLabel}
                  </Button>
                </div>
                {draft.ai_assisted && (
                  <Badge variant="secondary" className="w-fit text-[10px] mt-1">
                    <Sparkles className="w-3 h-3 mr-1" /> Generated by AI · edit before sending
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <ReportField
                  label="Key tasks completed"
                  value={draft.key_tasks_completed ?? ""}
                  onChange={(v) => updateField("key_tasks_completed", v)}
                  required
                />
                <ReportField
                  label="Issues encountered"
                  value={draft.issues_encountered ?? ""}
                  onChange={(v) => updateField("issues_encountered", v)}
                />
                <ReportField
                  label="Pending tasks"
                  value={draft.pending_tasks ?? ""}
                  onChange={(v) => updateField("pending_tasks", v)}
                />
                <ReportField
                  label="Support needed"
                  value={draft.support_needed ?? ""}
                  onChange={(v) => updateField("support_needed", v)}
                />
                <ReportField
                  label="Next priorities"
                  value={draft.next_priorities ?? ""}
                  onChange={(v) => updateField("next_priorities", v)}
                />
                <ReportField
                  label="Highlights"
                  value={draft.highlights ?? ""}
                  onChange={(v) => updateField("highlights", v)}
                />

                <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                  <Button onClick={() => save("submitted")} disabled={saving}>
                    {saving ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Send className="w-4 h-4 mr-1" />}
                    Submit report
                  </Button>
                  <Button variant="outline" onClick={() => save("draft")} disabled={saving}>
                    <Save className="w-4 h-4 mr-1" /> Save draft
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-sm font-semibold text-foreground">
                  Your recent {reportType} reports
                </h3>
                <Button variant="ghost" size="sm" onClick={fetchHistory} disabled={loading}>
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                </Button>
              </div>
              <div className="space-y-2">
                {loading && (
                  <div className="text-center py-6">
                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground mx-auto" />
                  </div>
                )}
                {!loading && history.length === 0 && (
                  <Card>
                    <CardContent className="pt-6 text-center text-sm text-muted-foreground">
                      No {reportType} reports yet.
                    </CardContent>
                  </Card>
                )}
                {!loading &&
                  history.map((r) => (
                    <Card key={r.id}>
                      <CardContent className="py-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-sm font-medium text-foreground">{r.report_date}</p>
                              <Badge className={STATUS_BADGE[r.status].cls + " text-[10px]"}>
                                {STATUS_BADGE[r.status].label}
                              </Badge>
                              {r.ai_assisted && (
                                <Badge variant="secondary" className="text-[10px]">
                                  <Sparkles className="w-3 h-3 mr-1" /> AI
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {r.key_tasks_completed || "(no completed tasks listed)"}
                            </p>
                            {r.review_notes && (
                              <p className="text-xs italic text-amber-700 mt-1">
                                Reviewer: {r.review_notes}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </StaffLayout>
  );
};

const ReportField = ({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) => (
  <div className="space-y-1.5">
    <Label className="text-xs uppercase tracking-wider text-muted-foreground">
      {label}
      {required && <span className="text-destructive ml-1">*</span>}
    </Label>
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={3}
      className="resize-y"
      placeholder={`Add ${label.toLowerCase()}…`}
    />
  </div>
);

export const StaffReportsPage = () => (
  <StaffGuard>
    <StaffReportsInner />
  </StaffGuard>
);
