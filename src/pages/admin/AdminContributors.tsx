import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function generateBadgeCode(role: string, year: number, seq: number) {
  const map: Record<string, string> = { volunteer: "VOL", ambassador: "AMB", intern: "INT", partner: "PAR" };
  const code = map[role?.toLowerCase()] ?? "CON";
  return `SCEF-${code}-${year}-${String(seq).padStart(4, "0")}`;
}

export default function AdminContributors() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-contributors"],
    queryFn: async () => {
      const { data } = await supabase
        .from("contributors")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      return data ?? [];
    },
  });

  const approve = useMutation({
    mutationFn: async (c: any) => {
      const year = new Date().getFullYear();
      const { count } = await supabase
        .from("contributors")
        .select("*", { count: "exact", head: true })
        .eq("verification_status", "approved");
      const seq = (count ?? 0) + 1;
      const badge = generateBadgeCode(c.role || "volunteer", year, seq);
      const slug = (c.full_name || "contributor").toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 60) + "-" + badge.toLowerCase();
      const { error } = await supabase.from("contributors").update({
        verification_status: "approved",
        badge_code: badge,
        public_slug: slug,
      }).eq("id", c.id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Contributor approved + badge generated"); qc.invalidateQueries({ queryKey: ["admin-contributors"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  const reject = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("contributors").update({ verification_status: "rejected" }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Rejected"); qc.invalidateQueries({ queryKey: ["admin-contributors"] }); },
  });

  return (
    <AdminPageShell title="Contributors" description="Verify volunteer / ambassador / intern submissions and issue badge codes">
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Program</th>
                <th className="px-4 py-3">Badge</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && <tr><td colSpan={7} className="px-4 py-6 text-center text-muted-foreground">Loading…</td></tr>}
              {!isLoading && (data ?? []).length === 0 && <tr><td colSpan={7} className="px-4 py-6 text-center text-muted-foreground">No contributors.</td></tr>}
              {(data ?? []).map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="px-4 py-3 font-medium">{c.full_name || "—"}</td>
                  <td className="px-4 py-3 capitalize">{c.role || "—"}</td>
                  <td className="px-4 py-3">{c.country || "—"}</td>
                  <td className="px-4 py-3">{c.program_supported || "—"}</td>
                  <td className="px-4 py-3 font-mono text-xs">{c.badge_code || "—"}</td>
                  <td className="px-4 py-3">
                    <Badge variant={c.verification_status === "approved" ? "default" : c.verification_status === "rejected" ? "destructive" : "secondary"}>
                      {c.verification_status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    {c.verification_status === "pending" && (
                      <>
                        <Button size="sm" onClick={() => approve.mutate(c)}>Approve</Button>
                        <Button size="sm" variant="outline" onClick={() => reject.mutate(c.id)}>Reject</Button>
                      </>
                    )}
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
