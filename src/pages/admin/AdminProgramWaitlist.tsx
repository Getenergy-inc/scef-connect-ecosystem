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
  region: string | null;
  city: string | null;
  age_range: string | null;
  gender: string | null;
  applicant_type: string;
  program_interest: string;
  preferred_african_region: string | null;
  motivation: string | null;
  skills_background: string | null;
  local_chapter_status: string | null;
  referral_source: string | null;
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
    "Submitted", "Full name", "Email", "Phone", "Country", "Region", "City",
    "Age range", "Gender", "Applicant type", "Program", "Preferred region",
    "Motivation", "Skills/Background", "Local chapter", "Referral source",
    "Status", "Admin notes", "Reviewed at",
  ];
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = [headers.join(",")];
  for (const r of rows) {
    lines.push([
      r.created_at, r.full_name, r.email, r.phone, r.country, r.region, r.city,
      r.age_range, r.gender, r.applicant_type, r.program_interest, r.preferred_african_region,
      r.motivation, r.skills_background, r.local_chapter_status, r.referral_source,
      r.status, r.admin_notes, r.reviewed_at,
    ].map(esc).join(","));
  }
  return lines.join("\n");
}

export default function AdminProgramWaitlist() {
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all");
  const [programFilter, setProgramFilter] = useState<string>("all");
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");

  const [editing, setEditing] = useState<Row | null>(null);
  const [editStatus, setEditStatus] = useState<Status>("new");
  const [editNotes, setEditNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const { data = [], isLoading, refetch, isFetching } = useQuery({
    queryKey: ["waitlist-applications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("waitlist_applications")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Row[];
    },
  });

  const programs = useMemo(() => Array.from(new Set(data.map((r) => r.program_interest))).sort(), [data]);
  const regions = useMemo(
    () => Array.from(new Set(data.map((r) => r.preferred_african_region).filter(Boolean) as string[])).sort(),
    [data],
  );
  const countries = useMemo(() => Array.from(new Set(data.map((r) => r.country))).sort(), [data]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return data.filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (programFilter !== "all" && r.program_interest !== programFilter) return false;
      if (regionFilter !== "all" && r.preferred_african_region !== regionFilter) return false;
      if (countryFilter !== "all" && r.country !== countryFilter) return false;
      if (!needle) return true;
      return [r.full_name, r.email, r.phone, r.country].some((v) => v?.toLowerCase().includes(needle));
    });
  }, [data, q, statusFilter, programFilter, regionFilter, countryFilter]);

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
    a.download = `scef-program-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
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
      .from("waitlist_applications")
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
      title="SCEF 2026–2027 Program Waitlist"
      description="Review, filter, and manage applications submitted to the unified SCEF program waitlist."
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
              <Select value={programFilter} onValueChange={setProgramFilter}>
                <SelectTrigger className="w-52"><SelectValue placeholder="Program" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All programs</SelectItem>
                  {programs.map((p) => (<SelectItem key={p} value={p}>{p}</SelectItem>))}
                </SelectContent>
              </Select>
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="w-44"><SelectValue placeholder="Region" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All regions</SelectItem>
                  {regions.map((r) => (<SelectItem key={r} value={r}>{r}</SelectItem>))}
                </SelectContent>
              </Select>
              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger className="w-44"><SelectValue placeholder="Country" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All countries</SelectItem>
                  {countries.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
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
                  <TableHead>Applicant</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Region</TableHead>
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
                        <div className="text-muted-foreground">
                          {[r.region, r.city].filter(Boolean).join(" · ")}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs">{r.applicant_type}</TableCell>
                      <TableCell className="text-xs">{r.program_interest}</TableCell>
                      <TableCell className="text-xs">{r.preferred_african_region ?? "—"}</TableCell>
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
                <Info label="Region / State" value={editing.region ?? "—"} />
                <Info label="City" value={editing.city ?? "—"} />
                <Info label="Age range" value={editing.age_range ?? "—"} />
                <Info label="Gender" value={editing.gender ?? "—"} />
                <Info label="Applicant type" value={editing.applicant_type} />
                <Info label="Program" value={editing.program_interest} />
                <Info label="Preferred region" value={editing.preferred_african_region ?? "—"} />
                <Info label="Local chapter" value={editing.local_chapter_status ?? "—"} />
                <Info label="Referral source" value={editing.referral_source ?? "—"} />
                <Info label="Submitted" value={new Date(editing.created_at).toLocaleString()} />
              </div>

              {editing.motivation && (
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Motivation</div>
                  <p className="mt-1 whitespace-pre-wrap">{editing.motivation}</p>
                </div>
              )}
              {editing.skills_background && (
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Skills / Background</div>
                  <p className="mt-1 whitespace-pre-wrap">{editing.skills_background}</p>
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
