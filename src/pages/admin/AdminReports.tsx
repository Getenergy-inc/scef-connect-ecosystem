import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold text-scef-blue-darker mt-1">{value}</p>
        {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
      </CardContent>
    </Card>
  );
}

export default function AdminReports() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-reports"],
    queryFn: async () => {
      const [users, donations, receipts, chapters, contributors, schools, wash, csrInq, csrProj] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("donations").select("amount,payment_status,currency"),
        supabase.from("donation_receipts").select("*", { count: "exact", head: true }),
        supabase.from("chapters").select("status"),
        supabase.from("contributors").select("verification_status"),
        supabase.from("school_nominations").select("status"),
        supabase.from("wash_nominations").select("status"),
        supabase.from("csr_inquiries").select("*", { count: "exact", head: true }),
        supabase.from("csr_projects").select("total_amount,disbursed_amount"),
      ]);

      const paid = (donations.data ?? []).filter((d: any) => d.payment_status === "paid");
      const paidAmount = paid.reduce((s: number, d: any) => s + Number(d.amount || 0), 0);
      const chapterCounts = (chapters.data ?? []).reduce<Record<string, number>>((acc, r: any) => { acc[r.status] = (acc[r.status] ?? 0) + 1; return acc; }, {});
      const contribCounts = (contributors.data ?? []).reduce<Record<string, number>>((acc, r: any) => { acc[r.verification_status] = (acc[r.verification_status] ?? 0) + 1; return acc; }, {});
      const csrCommitted = (csrProj.data ?? []).reduce((s: number, p: any) => s + Number(p.total_amount || 0), 0);
      const csrDisbursed = (csrProj.data ?? []).reduce((s: number, p: any) => s + Number(p.disbursed_amount || 0), 0);

      return {
        users: users.count ?? 0,
        donationsCount: donations.data?.length ?? 0,
        donationsPaid: paid.length,
        paidAmount,
        receipts: receipts.count ?? 0,
        chapterCounts,
        contribCounts,
        schoolNoms: schools.data?.length ?? 0,
        washNoms: wash.data?.length ?? 0,
        csrInquiries: csrInq.count ?? 0,
        csrCommitted,
        csrDisbursed,
      };
    },
  });

  if (isLoading || !data) {
    return <AdminPageShell title="Reports"><p className="text-muted-foreground">Loading metrics…</p></AdminPageShell>;
  }

  return (
    <AdminPageShell title="Reports" description="Platform-wide metrics across users, finance, chapters, and CSR">
      <section>
        <h2 className="font-semibold mb-3">People</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Users" value={data.users} />
          <StatCard label="Contributors approved" value={data.contribCounts.approved ?? 0} sub={`Pending: ${data.contribCounts.pending ?? 0}`} />
          <StatCard label="Active chapters" value={data.chapterCounts.active ?? 0} sub={`Pending: ${data.chapterCounts.pending ?? 0}`} />
          <StatCard label="School nominations" value={data.schoolNoms} sub={`WASH: ${data.washNoms}`} />
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-3">Finance</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Donations" value={data.donationsCount} sub={`Paid: ${data.donationsPaid}`} />
          <StatCard label="Paid total (USD)" value={`$${data.paidAmount.toLocaleString()}`} />
          <StatCard label="Receipts issued" value={data.receipts} />
          <StatCard label="CSR disbursed / committed" value={`$${data.csrDisbursed.toLocaleString()} / $${data.csrCommitted.toLocaleString()}`} sub={`Inquiries: ${data.csrInquiries}`} />
        </div>
      </section>

      <p className="text-xs text-muted-foreground">Unverified figures show as 0 until live data flows in. Reporting in progress.</p>
    </AdminPageShell>
  );
}
