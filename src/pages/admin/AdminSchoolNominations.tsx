import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

function NomTable({ kind }: { kind: "school" | "wash" }) {
  const qc = useQueryClient();
  const table = kind === "school" ? "school_nominations" : "wash_nominations";
  const { data, isLoading } = useQuery({
    queryKey: ["admin-noms", kind],
    queryFn: async () => {
      const { data } = await supabase.from(table as any).select("*").order("created_at", { ascending: false }).limit(500);
      return data ?? [];
    },
  });

  const setStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from(table as any).update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Updated"); qc.invalidateQueries({ queryKey: ["admin-noms", kind] }); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left">
            <tr>
              <th className="px-4 py-3">School</th>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3">{kind === "school" ? "Support" : "Needs"}</th>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">Loading…</td></tr>}
            {!isLoading && (data ?? []).length === 0 && <tr><td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">No nominations.</td></tr>}
            {(data ?? []).map((n: any) => (
              <tr key={n.id} className="border-t">
                <td className="px-4 py-3 font-medium">{n.school_name}</td>
                <td className="px-4 py-3">{n.country || "—"}</td>
                <td className="px-4 py-3 max-w-xs truncate">{kind === "school" ? n.support_type : (n.needs_categories || []).join(", ")}</td>
                <td className="px-4 py-3">{new Date(n.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-3"><Badge variant={n.status === "approved" ? "default" : n.status === "rejected" ? "destructive" : "secondary"}>{n.status || "pending"}</Badge></td>
                <td className="px-4 py-3 space-x-2">
                  {(n.status ?? "pending") === "pending" && (
                    <>
                      <Button size="sm" onClick={() => setStatus.mutate({ id: n.id, status: "approved" })}>Approve</Button>
                      <Button size="sm" variant="outline" onClick={() => setStatus.mutate({ id: n.id, status: "rejected" })}>Reject</Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default function AdminSchoolNominations() {
  return (
    <AdminPageShell title="School & WASH Nominations" description="Review school support and WASH project nominations">
      <Tabs defaultValue="school">
        <TabsList>
          <TabsTrigger value="school">School Nominations</TabsTrigger>
          <TabsTrigger value="wash">WASH Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="school" className="mt-4"><NomTable kind="school" /></TabsContent>
        <TabsContent value="wash" className="mt-4"><NomTable kind="wash" /></TabsContent>
      </Tabs>
    </AdminPageShell>
  );
}
