import { useEffect, useMemo, useState } from "react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Check, X, Send, Archive, Loader2, ImageOff } from "lucide-react";

type Status = "pending" | "approved" | "rejected" | "published" | "archived";

interface Submission {
  id: string;
  contributor_name: string;
  contributor_email: string;
  organization: string | null;
  category: string;
  program: string | null;
  year: string | null;
  location: string | null;
  caption: string;
  story: string | null;
  photo_url: string;
  photo_alt: string | null;
  status: Status;
  reviewer_notes: string | null;
  created_at: string;
}

const TABS: { value: Status; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "published", label: "Published" },
  { value: "rejected", label: "Rejected" },
  { value: "archived", label: "Archived" },
];

const statusVariant: Record<Status, "default" | "secondary" | "outline" | "destructive"> = {
  pending: "secondary",
  approved: "default",
  published: "default",
  rejected: "destructive",
  archived: "outline",
};

const AdminMediaSubmissions = () => {
  const [tab, setTab] = useState<Status>("pending");
  const [rows, setRows] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const fetchRows = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("media_submissions")
      .select("*")
      .eq("status", tab)
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) toast.error("Failed to load submissions");
    setRows((data as Submission[] | null) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const counts = useMemo(() => rows.length, [rows]);

  const update = async (r: Submission, next: Status, requireNote = false) => {
    const note = notes[r.id]?.trim() || null;
    if (requireNote && !note) {
      toast.error("Please add a reviewer note");
      return;
    }
    setBusyId(r.id);
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("media_submissions")
      .update({
        status: next,
        reviewer_notes: note,
        reviewed_by: user?.id ?? null,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", r.id);
    setBusyId(null);
    if (error) {
      toast.error("Update failed");
      return;
    }
    toast.success(`Submission ${next}`);
    fetchRows();
  };

  return (
    <AdminPageShell
      title="Media Moderation"
      description="Review contributor submissions, approve or reject, and publish accepted media to the public archive."
    >
      <Tabs value={tab} onValueChange={(v) => setTab(v as Status)}>
        <TabsList className="flex-wrap h-auto">
          {TABS.map((t) => (
            <TabsTrigger key={t.value} value={t.value}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {TABS.map((t) => (
          <TabsContent key={t.value} value={t.value} className="mt-4 space-y-4">
            {loading && (
              <div className="text-center py-10">
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground mx-auto" />
              </div>
            )}
            {!loading && counts === 0 && (
              <Card>
                <CardContent className="pt-6 text-center text-sm text-muted-foreground">
                  No submissions in this state.
                </CardContent>
              </Card>
            )}
            {!loading &&
              rows.map((r) => (
                <Card key={r.id}>
                  <CardContent className="pt-6 grid md:grid-cols-[200px,1fr] gap-4">
                    <div className="aspect-[4/3] bg-muted rounded-md overflow-hidden flex items-center justify-center">
                      {r.photo_url ? (
                        <img
                          src={r.photo_url}
                          alt={r.photo_alt ?? r.caption}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageOff className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-foreground">{r.caption}</p>
                          <p className="text-xs text-muted-foreground">
                            {r.contributor_name} · {r.contributor_email}
                            {r.organization && <> · {r.organization}</>}
                          </p>
                        </div>
                        <Badge variant={statusVariant[r.status]} className="capitalize">
                          {r.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <Field label="Category" value={r.category} />
                        <Field label="Program" value={r.program} />
                        <Field label="Year" value={r.year} />
                        <Field label="Location" value={r.location} />
                      </div>

                      {r.story && (
                        <p className="text-xs text-muted-foreground whitespace-pre-wrap border-l-2 border-border pl-3">
                          {r.story}
                        </p>
                      )}

                      <div className="space-y-1.5">
                        <Label className="text-xs">Reviewer notes</Label>
                        <Textarea
                          rows={2}
                          value={notes[r.id] ?? r.reviewer_notes ?? ""}
                          onChange={(e) =>
                            setNotes((n) => ({ ...n, [r.id]: e.target.value }))
                          }
                          placeholder="Optional feedback (required when rejecting)"
                        />
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {(r.status === "pending" || r.status === "rejected") && (
                          <Button
                            size="sm"
                            onClick={() => update(r, "approved")}
                            disabled={busyId === r.id}
                          >
                            <Check className="w-4 h-4 mr-1" /> Approve
                          </Button>
                        )}
                        {r.status === "approved" && (
                          <Button
                            size="sm"
                            onClick={() => update(r, "published")}
                            disabled={busyId === r.id}
                          >
                            <Send className="w-4 h-4 mr-1" /> Publish to Archive
                          </Button>
                        )}
                        {r.status !== "rejected" && r.status !== "archived" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => update(r, "rejected", true)}
                            disabled={busyId === r.id}
                          >
                            <X className="w-4 h-4 mr-1" /> Reject
                          </Button>
                        )}
                        {(r.status === "published" || r.status === "approved") && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => update(r, "archived")}
                            disabled={busyId === r.id}
                          >
                            <Archive className="w-4 h-4 mr-1" /> Archive
                          </Button>
                        )}
                        {r.status === "archived" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => update(r, "published")}
                            disabled={busyId === r.id}
                          >
                            Restore
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </AdminPageShell>
  );
};

const Field = ({ label, value }: { label: string; value: string | null }) => (
  <div>
    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className="text-foreground capitalize">{value || "—"}</p>
  </div>
);

export default AdminMediaSubmissions;
