import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import {
  ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight,
  ChevronsLeft, ChevronsRight, Download, Search, Users, Pencil,
} from "lucide-react";
import { WAITLIST_SOURCE } from "@/config/waitlistConfig";
import { toast } from "sonner";

type WaitlistStatus = "new" | "reviewed" | "accepted" | "rejected";

const STATUS_OPTIONS: { value: WaitlistStatus | "all"; label: string }[] = [
  { value: "all", label: "All statuses" },
  { value: "new", label: "New" },
  { value: "reviewed", label: "Reviewed" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
];

const STATUS_STYLES: Record<WaitlistStatus, string> = {
  new: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  reviewed: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  accepted: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
  rejected: "bg-rose-100 text-rose-800 hover:bg-rose-100",
};

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
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
}

type SortKey =
  | "created_at" | "full_name" | "country" | "organization"
  | "role" | "language" | "submission_status";
type SortDir = "asc" | "desc";

const SORTABLE: { key: SortKey; label: string }[] = [
  { key: "created_at", label: "Submitted" },
  { key: "full_name", label: "Full name" },
  { key: "country", label: "Country" },
  { key: "organization", label: "Organization" },
  { key: "role", label: "Role" },
  { key: "language", label: "Lang" },
  { key: "submission_status", label: "Status" },
];

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

function toCsv(rows: WaitlistRow[]): string {
  const headers = [
    "Full name", "Country", "Organization", "Role",
    "Language", "Status", "Admin notes", "Reviewed at",
    "Source", "Submitted at",
  ];
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = [headers.join(",")];
  for (const r of rows) {
    lines.push([
      r.full_name, r.country, r.organization, r.role,
      r.language, r.submission_status, r.admin_notes ?? "",
      r.reviewed_at ?? "", r.source, r.created_at,
    ].map(esc).join(","));
  }
  return lines.join("\n");
}

export default function WaitlistAdmin() {
  const [q, setQ] = useState("");
  const [source, setSource] = useState<string>(WAITLIST_SOURCE);
  const [statusFilter, setStatusFilter] = useState<WaitlistStatus | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const [editing, setEditing] = useState<WaitlistRow | null>(null);
  const [editStatus, setEditStatus] = useState<WaitlistStatus>("new");
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

  const sorted = useMemo(() => {
    const rows = [...filtered];
    rows.sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      if (sortKey === "created_at") {
        const ad = new Date(av as string).getTime();
        const bd = new Date(bv as string).getTime();
        return sortDir === "asc" ? ad - bd : bd - ad;
      }
      const cmp = String(av).localeCompare(String(bv), undefined, { sensitivity: "base" });
      return sortDir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [filtered, sortKey, sortDir]);

  const total = sorted.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  useEffect(() => { setPage(1); }, [q, source, statusFilter, sortKey, sortDir, pageSize]);
  useEffect(() => { if (page > pageCount) setPage(pageCount); }, [page, pageCount]);

  const start = (page - 1) * pageSize;
  const paged = sorted.slice(start, start + pageSize);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { new: 0, reviewed: 0, accepted: 0, rejected: 0 };
    for (const r of data) {
      counts[r.submission_status] = (counts[r.submission_status] ?? 0) + 1;
    }
    return counts;
  }, [data]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir(key === "created_at" ? "desc" : "asc");
    }
  };

  const handleExport = () => {
    const csv = toCsv(sorted);
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

  const openEditor = (row: WaitlistRow) => {
    setEditing(row);
    setEditStatus((["new","reviewed","accepted","rejected"].includes(row.submission_status)
      ? row.submission_status
      : "new") as WaitlistStatus);
    setEditNotes(row.admin_notes ?? "");
  };

  const saveEditor = async () => {
    if (!editing) return;
    setSaving(true);
    const { data: userData } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("waitlist_submissions")
      .update({
        submission_status: editStatus,
        admin_notes: editNotes.trim() ? editNotes : null,
        reviewed_by: userData.user?.id ?? null,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", editing.id);
    setSaving(false);
    if (error) {
      toast.error("Could not update submission", { description: error.message });
      return;
    }
    toast.success("Submission updated");
    setEditing(null);
    refetch();
  };

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return <ArrowUpDown className="ml-1 inline h-3.5 w-3.5 opacity-50" />;
    return sortDir === "asc"
      ? <ArrowUp className="ml-1 inline h-3.5 w-3.5" />
      : <ArrowDown className="ml-1 inline h-3.5 w-3.5" />;
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const s = (["new","reviewed","accepted","rejected"].includes(status)
      ? status
      : "new") as WaitlistStatus;
    return <Badge className={`${STATUS_STYLES[s]} capitalize`} variant="secondary">{s}</Badge>;
  };

  return (
    <AdminPageShell
      title="Seychelles 2027 Waiting List"
      description="Review submissions, move them through the workflow (new → reviewed → accepted/rejected), and capture admin notes."
    >
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(["new","reviewed","accepted","rejected"] as WaitlistStatus[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(statusFilter === s ? "all" : s)}
                className={`rounded-md border p-3 text-left transition ${statusFilter === s ? "border-primary ring-1 ring-primary" : "hover:bg-muted/50"}`}
              >
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{s}</div>
                <div className="mt-1 text-2xl font-semibold">{statusCounts[s] ?? 0}</div>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>
                <strong className="text-foreground">{total}</strong> of {data.length} submissions
              </span>
            </div>
            <div className="ml-auto flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search name, country, organization, notes…"
                  className="w-72 pl-9"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as WaitlistStatus | "all")}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-56"
                placeholder="source"
              />
              <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
                Refresh
              </Button>
              <Button onClick={handleExport} disabled={!total}>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {SORTABLE.map((s) => (
                    <TableHead key={s.key}>
                      <button
                        type="button"
                        onClick={() => toggleSort(s.key)}
                        className="inline-flex items-center text-left font-semibold hover:text-foreground"
                      >
                        {s.label}
                        <SortIcon k={s.key} />
                      </button>
                    </TableHead>
                  ))}
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow><TableCell colSpan={9} className="py-10 text-center text-muted-foreground">Loading…</TableCell></TableRow>
                ) : paged.length === 0 ? (
                  <TableRow><TableCell colSpan={9} className="py-10 text-center text-muted-foreground">No submissions found.</TableCell></TableRow>
                ) : (
                  paged.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                        {new Date(r.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-medium">{r.full_name}</TableCell>
                      <TableCell>{r.country}</TableCell>
                      <TableCell>{r.organization}</TableCell>
                      <TableCell>{r.role}</TableCell>
                      <TableCell className="text-xs uppercase">{r.language}</TableCell>
                      <TableCell><StatusBadge status={r.submission_status} /></TableCell>
                      <TableCell className="max-w-[260px] truncate text-xs text-muted-foreground" title={r.admin_notes ?? ""}>
                        {r.admin_notes || <span className="opacity-50">—</span>}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => openEditor(r)}>
                          <Pencil className="mr-1 h-3.5 w-3.5" /> Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Rows per page</span>
              <Select value={String(pageSize)} onValueChange={(v) => setPageSize(Number(v))}>
                <SelectTrigger className="h-8 w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAGE_SIZE_OPTIONS.map((n) => (
                    <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="ml-3">
                {total === 0 ? "0" : `${start + 1}–${Math.min(start + pageSize, total)}`} of {total}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" onClick={() => setPage(1)} disabled={page <= 1}>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="px-2 text-sm">
                Page <strong>{page}</strong> of {pageCount}
              </span>
              <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(pageCount, p + 1))} disabled={page >= pageCount}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setPage(pageCount)} disabled={page >= pageCount}>
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Review submission</DialogTitle>
            <DialogDescription>
              {editing ? `${editing.full_name} · ${editing.organization} · ${editing.country}` : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Status</label>
              <Select value={editStatus} onValueChange={(v) => setEditStatus(v as WaitlistStatus)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Admin notes</label>
              <Textarea
                rows={5}
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                placeholder="Internal notes (visible to admins only)…"
              />
            </div>
            {editing?.reviewed_at && (
              <p className="text-xs text-muted-foreground">
                Last reviewed {new Date(editing.reviewed_at).toLocaleString()}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)} disabled={saving}>Cancel</Button>
            <Button onClick={saveEditor} disabled={saving}>{saving ? "Saving…" : "Save changes"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminPageShell>
  );
}
