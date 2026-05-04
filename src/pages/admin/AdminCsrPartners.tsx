import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdminCsrPartners() {
  const { data: inquiries, isLoading: l1 } = useQuery({
    queryKey: ["csr-inq"],
    queryFn: async () => (await supabase.from("csr_inquiries").select("*").order("created_at", { ascending: false }).limit(200)).data ?? [],
  });
  const { data: projects, isLoading: l2 } = useQuery({
    queryKey: ["csr-proj"],
    queryFn: async () => (await supabase.from("csr_projects").select("*").order("created_at", { ascending: false }).limit(200)).data ?? [],
  });

  const totalDisbursed = (projects ?? []).reduce((s, p) => s + Number(p.disbursed_amount || 0), 0);
  const totalCommitted = (projects ?? []).reduce((s, p) => s + Number(p.total_amount || 0), 0);

  return (
    <AdminPageShell title="CSR Partners" description="Inquiries, partners, and active CSR projects">
      <div className="grid sm:grid-cols-3 gap-4">
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Inquiries</p><p className="text-2xl font-bold">{inquiries?.length ?? 0}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Active projects</p><p className="text-2xl font-bold">{projects?.length ?? 0}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Disbursed / Committed</p><p className="text-xl font-bold text-scef-gold">${totalDisbursed.toLocaleString()} / ${totalCommitted.toLocaleString()}</p></CardContent></Card>
      </div>

      <div>
        <h2 className="font-semibold mb-2">Inquiries</h2>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left">
                <tr>
                  <th className="px-4 py-3">Organization</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Country</th>
                  <th className="px-4 py-3">Funding</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {l1 && <tr><td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">Loading…</td></tr>}
                {(inquiries ?? []).map((i) => (
                  <tr key={i.id} className="border-t">
                    <td className="px-4 py-3 font-medium">{i.organization_name}</td>
                    <td className="px-4 py-3">{i.contact_name} <div className="text-xs text-muted-foreground">{i.contact_email}</div></td>
                    <td className="px-4 py-3">{i.country || "—"}</td>
                    <td className="px-4 py-3">{i.funding_range || "—"}</td>
                    <td className="px-4 py-3"><Badge variant="secondary">{i.status}</Badge></td>
                    <td className="px-4 py-3">{new Date(i.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div>
        <h2 className="font-semibold mb-2">Active Projects</h2>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left">
                <tr>
                  <th className="px-4 py-3">Project</th>
                  <th className="px-4 py-3">Partner</th>
                  <th className="px-4 py-3">Country</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Disbursed</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {l2 && <tr><td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">Loading…</td></tr>}
                {(projects ?? []).map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="px-4 py-3 font-medium">{p.project_name}</td>
                    <td className="px-4 py-3">{p.partner_name}</td>
                    <td className="px-4 py-3">{p.country || "—"}</td>
                    <td className="px-4 py-3">{p.currency} {Number(p.total_amount).toLocaleString()}</td>
                    <td className="px-4 py-3">{p.currency} {Number(p.disbursed_amount).toLocaleString()}</td>
                    <td className="px-4 py-3"><Badge>{p.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminPageShell>
  );
}
