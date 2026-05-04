import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
import { useMemo, useState } from "react";

export default function AdminReceipts() {
  const [q, setQ] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["admin-receipts"],
    queryFn: async () => {
      const { data } = await supabase
        .from("donation_receipts")
        .select("*")
        .order("issued_at", { ascending: false })
        .limit(500);
      return data ?? [];
    },
  });

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return (data ?? []).filter(
      (r) => !s || r.receipt_number?.toLowerCase().includes(s) || r.donor_name?.toLowerCase().includes(s)
    );
  }, [data, q]);

  return (
    <AdminPageShell title="Receipts" description="Generated donation receipts (format: SCEF-RCPT-YYYY-NNNNNN)">
      <Input placeholder="Search by receipt # or donor…" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-md" />
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left">
              <tr>
                <th className="px-4 py-3">Receipt #</th>
                <th className="px-4 py-3">Donor</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Purpose</th>
                <th className="px-4 py-3">Issued</th>
                <th className="px-4 py-3">PDF</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && <tr><td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">Loading…</td></tr>}
              {!isLoading && filtered.length === 0 && <tr><td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">No receipts yet.</td></tr>}
              {filtered.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="px-4 py-3 font-mono text-xs">{r.receipt_number}</td>
                  <td className="px-4 py-3">{r.donor_name || "—"}</td>
                  <td className="px-4 py-3">{r.currency} {Number(r.amount || 0).toLocaleString()}</td>
                  <td className="px-4 py-3">{r.purpose || "—"}</td>
                  <td className="px-4 py-3">{new Date(r.issued_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    {r.receipt_pdf_url ? (
                      <Button asChild size="sm" variant="ghost">
                        <a href={r.receipt_pdf_url} target="_blank" rel="noreferrer"><Download className="w-3 h-3 mr-1" />PDF</a>
                      </Button>
                    ) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminPageShell>
  );
}
