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
import { toast } from "@/hooks/use-toast";

const STATUSES = ["new", "reviewed", "shortlisted", "accepted", "rejected", "waitlisted"] as const;
type Status = (typeof STATUSES)[number];

interface Row {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  state_region: string;
  preferred_african_region: string;
  age_range: string;
  training_category: string;
  education_level: string;
  employment_status: string;
  why_scholarship: string;
  community_impact: string;
  is_scef_member: boolean;
  chapter_connection: string | null;
  scholarship_need: string;
  consent: boolean;
  status: string;
  admin_notes: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
  created_at: string;
}

const statusVariant: Record<string, string> = {
  new: "bg-blue-100 text-blue-800 border-blue-200",
  reviewed: "bg-amber-100 text-amber-800 border-amber-200",
  shortlisted: "bg-purple-100 text-purple-800 border-purple-200",
  accepted: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
  waitlisted: "bg-slate-100 text-slate-800 border-slate-200",
};

function toCsv(rows: Row[]): string {
  const headers = [
    "Submitted", "Full name", "Email", "Phone", "Country", "State/Region",
    "Preferred region", "Age range", "Training category", "Education", "Employment",
    "Scholarship need", "SCEF member", "Chapter connection",
    "Why scholarship", "Community impact",
    "Status", "Admin notes", "Reviewed at",
  ];
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = [headers.join(",")];
  for (const r of rows) {
    lines.push([
      r.created_at, r.full_name, r.email, r.phone, r.country, r.state_region,
      r.preferred_african_region, r.age_range, r.training_category, r.education_level, r.employment_status,
      r.scholarship_need, r.is_scef_member ? "yes" : "no", r.chapter_connection,
      r.why_scholarship, r.community_impact,
      r.status, r.admin_notes, r.reviewed_at,
    ].map(esc).join(","));
  }
  return lines.join("\n");
}

export default function AdminVocationalScholarshipWaitlist() {
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all");
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [needFilter, setNeedFilter] = useState<string>("all");

  const [editing, setEditing] = useState<Row | null>(null);
  const [editStatus, setEditStatus] = useState<Status>("new");
  const [editNotes, setEditNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const { data = [], isLoading, refetch, isFetching } = useQuery({
    queryKey: ["vocational-scholarship-waitlist"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vocational_scholarship_waitlist")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Row[];
    },
  });

  const regions = useMemo(
    () => Array.from(new Set(data.map((r) => r.preferred_african_region).filter(Boolean))).sort(),
    [data],
  );
  const categories = useMemo(
    () => Array.from(new Set(data.map((r) => r.training_category).filter(Boolean))).sort(),
    [data],
  );
  const needs = useMemo(
    () => Array.from(new Set(data.map((r) => r.scholarship_need).filter(Boolean))).sort(),
    [data],
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return data.filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (regionFilter !== "all" && r.preferred_african_region !== regionFilter) return false;
      if (categoryFilter !== "all" && r.training_category !== categoryFilter) return false;
      if (needFilter !== "all" && r.scholarship_need !== needFilter) return false;
      if (!needle) return true;
      return [r.full_name, r.email, r.phone, r.country, r.state_region]
        .some((v) => v?.toLowerCase().includes(needle));
    });
  }, [data, q, statusFilter, regionFilter, categoryFilter, needFilter]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: data.length };
    for (const s of STATUSES) c[s] = 0;
    for (const r of data) c[r.status] = (c[r.status] ?? 0) + 1;
    return c;
  }, [data]);

  const handleExport = () => {
    const csv = toCsv(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const suffix = regionFilter !== "all" ? `-${regionFilter.toLowerCase().replace(/\s+/g, "-")}` : "";
    a.download = `scef-vocational-scholarship${suffix}-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openEdit = (row: Row) => {
    setEditing(row);
    setEditStatus((STATUSES.includes(row.status as Status) ? row.status : "new") as Status);
    setEditNotes(row.admin_notes ?? "");
  };

  const saveEdit = async () => {
    if (!editing) return;
    setSaving(true);
    const { error } = await supabase
      .from("vocational_scholarship_waitlist")
      .update({
        status: editStatus,
        admin_notes: editNotes.trim() ? editNotes.trim() : null,
      })
      .eq("id", editing.id);
    setSaving(false);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Application updated" });
    setEditing(null);
    refetch();
  };

  return (
    <AdminPageShell
      title="Vocational Scholarship Waitlist 2026–2027"
      description="Review, filter, and manage applications submitted to the SCEF Vocational Training Scholarship waitlist."
    >
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>
                <strong className="text-foreground">{filtered.length}</strong> of {data.length} applications
              </span>
            </div>
            <div className="ml-auto flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search name, email, phone, country…"
                  className="pl-9 w-72"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as "all" | Status)}>
                <SelectTrigger className="w-44"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses ({counts.all})</SelectItem>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s} className="capitalize">
                      {s} ({counts[s] ?? 0})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="w-48"><SelectValue placeholder="African region" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All regions</SelectItem>
                  {regions.map((r) => (<SelectItem key={r} value={r}>{r}</SelectItem>))}
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-56"><SelectValue placeholder="Training category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
                </SelectContent>
              </Select>
              <Select value={needFilter} onValueChange={setNeedFilter}>
                <SelectTrigger className="w-44"><SelectValue placeholder="Scholarship need" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All needs</SelectItem>
                  {needs.map((n) => (<SelectItem key={n} value={n}>{n}</SelectItem>))}
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>Refresh</Button>
              <Button onClick={handleExport} disabled={!filtered.length}>
                <Download className="w-4 h-4 mr-2" /> Export CSV
              </Button>
            </div>
          </div>

          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Full name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Need</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow><TableCell colSpan={9} className="text-center py-10 text-muted-foreground">Loading…</TableCell></TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={9} className="text-center py-10 text-muted-foreground">No applications found.</TableCell></TableRow>
                ) : (
                  filtered.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                        {new Date(r.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-medium">{r.full_name}</TableCell>
                      <TableCell className="text-xs">
                        <div>{r.email}</div>
                        <div className="text-muted-foreground">{r.phone}</div>
                      </TableCell>
                      <TableCell className="text-xs">
                        <div>{r.country}</div>
                        <div className="text-muted-foreground">{r.state_region}</div>
                      </TableCell>
                      <TableCell className="text-xs">{r.preferred_african_region}</TableCell>
                      <TableCell className="text-xs">{r.training_category}</TableCell>
                      <TableCell className="text-xs">{r.scholarship_need}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`capitalize ${statusVariant[r.status] ?? ""}`}>
                          {r.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost" onClick={() => openEdit(r)}>
                          <Pencil className="w-3.5 h-3.5 mr-1" /> Review
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review application</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4 text-sm">
              <div className="grid gap-3 sm:grid-cols-2">
                <Info label="Full name" value={editing.full_name} />
                <Info label="Email" value={editing.email} />
                <Info label="Phone" value={editing.phone} />
                <Info label="Country" value={editing.country} />
                <Info label="State / Region" value={editing.state_region} />
                <Info label="Preferred region" value={editing.preferred_african_region} />
                <Info label="Age range" value={editing.age_range} />
                <Info label="Training category" value={editing.training_category} />
                <Info label="Education level" value={editing.education_level} />
                <Info label="Employment" value={editing.employment_status} />
                <Info label="Scholarship need" value={editing.scholarship_need} />
                <Info label="SCEF member" value={editing.is_scef_member ? "Yes" : "No"} />
                <Info label="Chapter connection" value={editing.chapter_connection ?? "—"} />
                <Info label="Submitted" value={new Date(editing.created_at).toLocaleString()} />
              </div>

              {editing.why_scholarship && (
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Why scholarship</div>
                  <p className="mt-1 whitespace-pre-wrap">{editing.why_scholarship}</p>
                </div>
              )}
              {editing.community_impact && (
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Community impact</div>
                  <p className="mt-1 whitespace-pre-wrap">{editing.community_impact}</p>
                </div>
              )}

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

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-sm text-scef-blue-darker">{value}</div>
    </div>
  );
}
