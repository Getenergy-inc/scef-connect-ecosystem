import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import { Download, Search, Users } from "lucide-react";
import { WAITLIST_SOURCE } from "@/config/waitlistConfig";

interface WaitlistRow {
  id: string;
  full_name: string;
  country: string;
  organization: string;
  role: string;
  language: string;
  source: string;
  submission_status: string;
  created_at: string;
}

function toCsv(rows: WaitlistRow[]): string {
  const headers = [
    "Full name", "Country", "Organization", "Role",
    "Language", "Status", "Source", "Submitted at",
  ];
  const esc = (v: string) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = [headers.join(",")];
  for (const r of rows) {
    lines.push([
      r.full_name, r.country, r.organization, r.role,
      r.language, r.submission_status, r.source, r.created_at,
    ].map(esc).join(","));
  }
  return lines.join("\n");
}

export default function WaitlistAdmin() {
  const [q, setQ] = useState("");
  const [source, setSource] = useState<string>(WAITLIST_SOURCE);

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
    if (!needle) return data;
    return data.filter((r) =>
      [r.full_name, r.country, r.organization, r.role, r.language, r.submission_status]
        .some((v) => v?.toLowerCase().includes(needle))
    );
  }, [data, q]);

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

  return (
    <AdminPageShell
      title="Seychelles 2027 Waiting List"
      description="View, search, and export submissions from the Indian Ocean Islands Edu-Tourism Conference waiting list."
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
                  placeholder="Search name, country, organization…"
                  className="pl-9 w-72"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow><TableCell colSpan={7} className="text-center py-10 text-muted-foreground">Loading…</TableCell></TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={7} className="text-center py-10 text-muted-foreground">No submissions found.</TableCell></TableRow>
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
                      <TableCell className="text-xs">{r.submission_status}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AdminPageShell>
  );
}
