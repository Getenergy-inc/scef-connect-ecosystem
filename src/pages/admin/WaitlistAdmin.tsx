import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Download, Search, Users, Pencil } from "lucide-react";
import { WAITLIST_SOURCE } from "@/config/waitlistConfig";
import { toast } from "@/hooks/use-toast";

const STATUSES = ["new", "reviewed", "accepted", "rejected"] as const;
type Status = (typeof STATUSES)[number];

interface WaitlistRow {
  id: string;
  full_name: string;
  country: string;
  organization: string;
  role: string;
  language: string;
  source: string;
  submission_status: string;
  admin_notes: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
  created_at: string;
}

function toCsv(rows: WaitlistRow[]): string {
  const headers = [
    "Full name", "Country", "Organization", "Role",
    "Language", "Status", "Admin notes", "Source", "Submitted at", "Reviewed at",
  ];
  const esc = (v: string) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = [headers.join(",")];
  for (const r of rows) {
    lines.push([
      r.full_name, r.country, r.organization, r.role,
      r.language, r.submission_status, r.admin_notes ?? "",
      r.source, r.created_at, r.reviewed_at ?? "",
    ].map(esc).join(","));
  }
  return lines.join("\n");
}

const statusVariant: Record<string, string> = {
  new: "bg-blue-100 text-blue-800 border-blue-200",
  reviewed: "bg-amber-100 text-amber-800 border-amber-200",
  accepted: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
};

export default function WaitlistAdmin() {
  const [q, setQ] = useState("");
  const [source, setSource] = useState<string>(WAITLIST_SOURCE);
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all");
  const [editing, setEditing] = useState<WaitlistRow | null>(null);
  const [editStatus, setEditStatus] = useState<Status>("new");
  const [editNotes, setEditNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const { data = [], isLoading, refetch, isFetching } = useQuery({
    queryKey: ["waitlist-submissions", source],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("waitlist_submissions")
        .select("*")
        .eq("source", source)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as WaitlistRow[];
    },
  });

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return data.filter((r) => {
      if (statusFilter !== "all" && r.submission_status !== statusFilter) return false;
      if (!needle) return true;
      return [r.full_name, r.country, r.organization, r.role, r.language, r.submission_status, r.admin_notes ?? ""]
        .some((v) => v?.toLowerCase().includes(needle));
    });
  }, [data, q, statusFilter]);

  const handleExport = () => {
    const csv = toCsv(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `waitlist-${source}-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openEdit = (row: WaitlistRow) => {
    setEditing(row);
    setEditStatus((STATUSES.includes(row.submission_status as Status) ? row.submission_status : "new") as Status);
    setEditNotes(row.admin_notes ?? "");
  };

  const saveEdit = async () => {
    if (!editing) return;
    setSaving(true);
    const { error } = await supabase
      .from("waitlist_submissions")
      .update({
        submission_status: editStatus,
        admin_notes: editNotes.trim() ? editNotes.trim() : null,
      })
      .eq("id", editing.id);
    setSaving(false);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Submission updated" });
    setEditing(null);
    refetch();
  };

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: data.length, new: 0, reviewed: 0, accepted: 0, rejected: 0 };
    for (const r of data) c[r.submission_status] = (c[r.submission_status] ?? 0) + 1;
    return c;
  }, [data]);

  return (
    <AdminPageShell
      title="Seychelles 2027 Waiting List"
      description="View, search, review, and export submissions from the Indian Ocean Islands Edu-Tourism Conference waiting list."
    >
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>
                <strong className="text-foreground">{filtered.length}</strong> of {data.length} submissions
              </span>
            </div>
            <div className="ml-auto flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search name, country, organization, notes…"
                  className="pl-9 w-72"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All ({counts.all})</SelectItem>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s} className="capitalize">
                      {s} ({counts[s] ?? 0})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-64"
                placeholder="source"
              />
              <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
                Refresh
              </Button>
              <Button onClick={handleExport} disabled={!filtered.length}>
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Full name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Lang</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow><TableCell colSpan={9} className="text-center py-10 text-muted-foreground">Loading…</TableCell></TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={9} className="text-center py-10 text-muted-foreground">No submissions found.</TableCell></TableRow>
                ) : (
                  filtered.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                        {new Date(r.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-medium">{r.full_name}</TableCell>
                      <TableCell>{r.country}</TableCell>
                      <TableCell>{r.organization}</TableCell>
                      <TableCell>{r.role}</TableCell>
                      <TableCell className="uppercase text-xs">{r.language}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`capitalize ${statusVariant[r.submission_status] ?? ""}`}>
                          {r.submission_status}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[220px] truncate text-xs text-muted-foreground" title={r.admin_notes ?? ""}>
                        {r.admin_notes ?? "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost" onClick={() => openEdit(r)}>
                          <Pencil className="w-3.5 h-3.5 mr-1" /> Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Review submission</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <div><strong className="text-foreground">{editing.full_name}</strong> · {editing.country}</div>
                <div>{editing.organization} — {editing.role}</div>
                <div className="text-xs mt-1">Submitted {new Date(editing.created_at).toLocaleString()}</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={editStatus} onValueChange={(v) => setEditStatus(v as Status)}>
                  <SelectTrigger id="status"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => (
                      <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Admin notes (private)</Label>
                <Textarea
                  id="notes"
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Internal notes — not visible to the applicant."
                  rows={5}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditing(null)} disabled={saving}>Cancel</Button>
            <Button onClick={saveEdit} disabled={saving}>{saving ? "Saving…" : "Save changes"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminPageShell>
  );
}
