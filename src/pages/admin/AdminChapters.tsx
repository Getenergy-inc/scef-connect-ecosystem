import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminChapters() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-chapters"],
    queryFn: async () => {
      const { data } = await supabase
        .from("chapters")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      return data ?? [];
    },
  });

  const setStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("chapters").update({ status: status as any }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_, v) => { toast.success(`Chapter ${v.status}`); qc.invalidateQueries({ queryKey: ["admin-chapters"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <AdminPageShell title="Chapters" description="Approve, suspend, and review SCEF chapters">
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Country / City</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Members</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && <tr><td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">Loading…</td></tr>}
              {!isLoading && (data ?? []).length === 0 && <tr><td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">No chapters.</td></tr>}
              {(data ?? []).map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3">{[c.city, c.country].filter(Boolean).join(", ")}</td>
                  <td className="px-4 py-3 capitalize">{c.chapter_type}</td>
                  <td className="px-4 py-3">{c.member_count ?? 0}</td>
                  <td className="px-4 py-3">
                    <Badge variant={c.status === "active" ? "default" : c.status === "pending" ? "secondary" : "outline"}>{c.status}</Badge>
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    {c.status !== "active" && (
                      <Button size="sm" onClick={() => setStatus.mutate({ id: c.id, status: "active" })}>Approve</Button>
                    )}
                    {c.status !== "suspended" && (
                      <Button size="sm" variant="outline" onClick={() => setStatus.mutate({ id: c.id, status: "suspended" })}>Suspend</Button>
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
