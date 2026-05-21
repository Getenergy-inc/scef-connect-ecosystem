import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import {
  ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight,
  ChevronsLeft, ChevronsRight, Download, Search, Users,
} from "lucide-react";
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
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

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

  const sorted = useMemo(() => {
    const rows = [...filtered];
    rows.sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      if (sortKey === "created_at") {
        const ad = new Date(av).getTime();
        const bd = new Date(bv).getTime();
        return sortDir === "asc" ? ad - bd : bd - ad;
      }
      const cmp = String(av).localeCompare(String(bv), undefined, { sensitivity: "base" });
      return sortDir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [filtered, sortKey, sortDir]);

  const total = sorted.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  // Reset/clamp page when filters or sort or size change
  useEffect(() => {
    setPage(1);
  }, [q, source, sortKey, sortDir, pageSize]);
  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const start = (page - 1) * pageSize;
  const paged = sorted.slice(start, start + pageSize);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
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

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return <ArrowUpDown className="ml-1 inline h-3.5 w-3.5 opacity-50" />;
    return sortDir === "asc"
      ? <ArrowUp className="ml-1 inline h-3.5 w-3.5" />
      : <ArrowDown className="ml-1 inline h-3.5 w-3.5" />;
  };

  return (
    <AdminPageShell
      title="Seychelles 2027 Waiting List"
      description="View, search, sort, paginate, and export submissions from the Indian Ocean Islands Edu-Tourism Conference waiting list."
    >
      <Card>
        <CardContent className="space-y-4 pt-6">
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
                  placeholder="Search name, country, organization…"
                  className="w-72 pl-9"
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
              <Select value={sortKey} onValueChange={(v) => setSortKey(v as SortKey)}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {SORTABLE.map((s) => (
                    <SelectItem key={s.key} value={s.key}>Sort: {s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
                title={sortDir === "asc" ? "Ascending" : "Descending"}
              >
                {sortDir === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
              </Button>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow><TableCell colSpan={7} className="py-10 text-center text-muted-foreground">Loading…</TableCell></TableRow>
                ) : paged.length === 0 ? (
                  <TableRow><TableCell colSpan={7} className="py-10 text-center text-muted-foreground">No submissions found.</TableCell></TableRow>
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
                      <TableCell className="text-xs">{r.submission_status}</TableCell>
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
    </AdminPageShell>
  );
}
