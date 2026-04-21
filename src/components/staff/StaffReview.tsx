import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { StaffGuard } from "./StaffGuard";
import { StaffLayout } from "./StaffLayout";
import { useStaffAccess } from "@/hooks/useStaffAccess";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Check, RotateCw, Loader2, ShieldAlert, FileText } from "lucide-react";

type ReportType = "daily" | "weekly" | "monthly";
type ReportStatus = "draft" | "submitted" | "under_review" | "approved" | "needs_changes";

interface ReportRow {
  id: string;
  user_id: string;
  report_type: ReportType;
  report_date: string;
  department_slug: string | null;
  key_tasks_completed: string | null;
  issues_encountered: string | null;
  pending_tasks: string | null;
  support_needed: string | null;
  next_priorities: string | null;
  highlights: string | null;
  status: ReportStatus;
  submitted_at: string | null;
  ai_assisted: boolean | null;
  author?: { first_name: string | null; last_name: string | null; email: string | null } | null;
}

const TABS: { value: ReportStatus; label: string }[] = [
  { value: "submitted", label: "New submissions" },
  { value: "under_review", label: "Under review" },
  { value: "approved", label: "Approved" },
  { value: "needs_changes", label: "Needs changes" },
];

const ReviewInner = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const { profile, isManager } = useStaffAccess(userId);
  const [tab, setTab] = useState<ReportStatus>("submitted");
  const [rows, setRows] = useState<ReportRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUserId(session?.user?.id ?? null));
  }, []);

  const fetchRows = async () => {
    if (!isManager || !profile) return;
    setLoading(true);
    let q = supabase
      .from("staff_reports")
      .select("*")
      .eq("status", tab)
      .order("submitted_at", { ascending: false, nullsFirst: false })
      .limit(50);

    // Department managers see only their dept; admins/executives can see all
    if (profile.access_level === "manager" && profile.department_slug) {
      q = q.eq("department_slug", profile.department_slug);
    }

    const { data } = await q;
    const reports = (data as ReportRow[] | null) ?? [];
    const userIds = [...new Set(reports.map((r) => r.user_id))];
    const { data: profiles } = userIds.length
      ? await supabase
          .from("profiles")
          .select("user_id, first_name, last_name, email")
          .in("user_id", userIds)
      : { data: [] as any[] };
    const map = new Map((profiles ?? []).map((p: any) => [p.user_id, p]));
    setRows(reports.map((r) => ({ ...r, author: map.get(r.user_id) ?? null })));
    setLoading(false);
  };

  useEffect(() => {
    fetchRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, isManager, profile?.department_slug]);

  const updateStatus = async (
    r: ReportRow,
    nextStatus: "under_review" | "approved" | "needs_changes"
  ) => {
    if (!userId) return;
    setBusyId(r.id);
    const { error } = await supabase
      .from("staff_reports")
      .update({
        status: nextStatus,
        reviewed_by: userId,
        reviewed_at: new Date().toISOString(),
        review_notes: notes[r.id] || null,
      })
      .eq("id", r.id);
    setBusyId(null);
    if (error) {
      toast.error("Update failed");
      return;
    }
    toast.success(
      nextStatus === "approved"
        ? "Report approved"
        : nextStatus === "needs_changes"
        ? "Sent back for changes"
        : "Marked under review"
    );
    fetchRows();
  };

  if (!isManager) {
    return (
      <StaffLayout title="Team Review">
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="pt-6 space-y-3 text-center">
              <ShieldAlert className="w-10 h-10 text-muted-foreground mx-auto" />
              <h2 className="font-display text-lg font-semibold text-foreground">Manager access required</h2>
              <p className="text-sm text-muted-foreground">
                The review queue is available to managers, directors, and executives.
              </p>
            </CardContent>
          </Card>
        </div>
      </StaffLayout>
    );
  }

  return (
    <StaffLayout title="Team Review">
      <Helmet>
        <title>Team Review | SCEF Staff</title>
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-4">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Manager review queue</h2>
          <p className="text-sm text-muted-foreground">
            Review submissions, approve, or request changes.
            {profile?.access_level === "manager" && profile?.department_slug && (
              <> Scoped to <strong className="capitalize">{profile.department_slug.replace("-", " ")}</strong>.</>
            )}
          </p>
        </div>

        <Tabs value={tab} onValueChange={(v) => setTab(v as ReportStatus)}>
          <TabsList>
            {TABS.map((t) => (
              <TabsTrigger key={t.value} value={t.value}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {TABS.map((t) => (
            <TabsContent key={t.value} value={t.value} className="mt-4 space-y-3">
              {loading && (
                <div className="text-center py-8">
                  <Loader2 className="w-5 h-5 animate-spin text-muted-foreground mx-auto" />
                </div>
              )}
              {!loading && rows.length === 0 && (
                <Card>
                  <CardContent className="pt-6 text-center text-sm text-muted-foreground">
                    No reports in this state.
                  </CardContent>
                </Card>
              )}
              {!loading &&
                rows.map((r) => (
                  <Card key={r.id}>
                    <CardHeader className="pb-2">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <CardTitle className="text-base flex items-center gap-2">
                            <FileText className="w-4 h-4 text-primary" />
                            {r.author?.first_name || "Staff"} {r.author?.last_name || ""} —{" "}
                            <span className="capitalize">{r.report_type}</span> · {r.report_date}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground">
                            {r.department_slug?.replace(/-/g, " ") || "—"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {r.ai_assisted && (
                            <Badge variant="secondary" className="text-[10px]">AI-assisted</Badge>
                          )}
                          <Badge variant="outline" className="capitalize text-[10px]">
                            {r.status.replace("_", " ")}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid sm:grid-cols-2 gap-3 text-xs">
                        <ReadField label="Completed" value={r.key_tasks_completed} />
                        <ReadField label="Issues" value={r.issues_encountered} />
                        <ReadField label="Pending" value={r.pending_tasks} />
                        <ReadField label="Support needed" value={r.support_needed} />
                        <ReadField label="Next priorities" value={r.next_priorities} />
                        <ReadField label="Highlights" value={r.highlights} />
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-border">
                        <Label className="text-xs">Reviewer notes (optional)</Label>
                        <Textarea
                          rows={2}
                          value={notes[r.id] ?? ""}
                          onChange={(e) => setNotes((n) => ({ ...n, [r.id]: e.target.value }))}
                          placeholder="Feedback for the author…"
                        />
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          onClick={() => updateStatus(r, "approved")}
                          disabled={busyId === r.id}
                        >
                          <Check className="w-4 h-4 mr-1" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(r, "needs_changes")}
                          disabled={busyId === r.id}
                        >
                          <RotateCw className="w-4 h-4 mr-1" /> Request changes
                        </Button>
                        {r.status !== "under_review" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => updateStatus(r, "under_review")}
                            disabled={busyId === r.id}
                          >
                            Mark under review
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
    </StaffLayout>
  );
};

const ReadField = ({ label, value }: { label: string; value: string | null }) => (
  <div>
    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className="text-foreground whitespace-pre-wrap mt-0.5">{value || "—"}</p>
  </div>
);

export const StaffReviewPage = () => (
  <StaffGuard>
    <ReviewInner />
  </StaffGuard>
);
