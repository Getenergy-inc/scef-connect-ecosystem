import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";

export default function AdminDonations() {
  const [q, setQ] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["admin-donations"],
    queryFn: async () => {
      const { data } = await supabase
        .from("donations")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      return data ?? [];
    },
  });

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return (data ?? []).filter(
      (d) => !s || d.donor_email?.toLowerCase().includes(s) || d.donor_name?.toLowerCase().includes(s)
    );
  }, [data, q]);

  const totals = useMemo(() => {
    const paid = (data ?? []).filter((d) => d.payment_status === "paid");
    return {
      count: data?.length ?? 0,
      paidCount: paid.length,
      paidAmount: paid.reduce((s, d) => s + Number(d.amount || 0), 0),
    };
  }, [data]);

  return (
    <AdminPageShell title="Donations" description="All donation transactions">
      <div className="grid sm:grid-cols-3 gap-4">
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Total donations</p><p className="text-2xl font-bold text-scef-blue-darker">{totals.count}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Paid</p><p className="text-2xl font-bold text-scef-blue-darker">{totals.paidCount}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Paid amount</p><p className="text-2xl font-bold text-scef-gold">${totals.paidAmount.toLocaleString()}</p></CardContent></Card>
      </div>
      <Input placeholder="Search by donor name/email…" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-md" />
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Donor</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && <tr><td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">Loading…</td></tr>}
              {!isLoading && filtered.length === 0 && <tr><td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">No donations.</td></tr>}
              {filtered.map((d) => (
                <tr key={d.id} className="border-t">
                  <td className="px-4 py-3">{new Date(d.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{d.is_anonymous ? "Anonymous" : (d.donor_name || d.donor_email || "—")}</td>
                  <td className="px-4 py-3 font-medium">{d.currency} {Number(d.amount).toLocaleString()}</td>
                  <td className="px-4 py-3">{d.payment_method || "—"}</td>
                  <td className="px-4 py-3"><Badge variant={d.payment_status === "paid" ? "default" : "secondary"}>{d.payment_status}</Badge></td>
                  <td className="px-4 py-3">{d.receipt_sent ? "Sent" : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminPageShell>
  );
}
