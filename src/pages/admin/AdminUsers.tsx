import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";

export default function AdminUsers() {
  const [q, setQ] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, email, first_name, last_name, country, created_at, onboarding_completed")
        .order("created_at", { ascending: false })
        .limit(500);
      const { data: roles } = await supabase.from("user_roles").select("user_id, role");
      const roleMap = new Map<string, string[]>();
      roles?.forEach((r) => {
        const arr = roleMap.get(r.user_id) ?? [];
        arr.push(r.role);
        roleMap.set(r.user_id, arr);
      });
      return profiles?.map((p) => ({ ...p, roles: roleMap.get(p.user_id) ?? [] })) ?? [];
    },
  });

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return (data ?? []).filter(
      (u) =>
        !s ||
        u.email?.toLowerCase().includes(s) ||
        u.first_name?.toLowerCase().includes(s) ||
        u.last_name?.toLowerCase().includes(s)
    );
  }, [data, q]);

  return (
    <AdminPageShell title="Users" description="All registered SCEF users and their roles">
      <Input placeholder="Search by name or email…" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-md" />
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Roles</th>
                <th className="px-4 py-3">Onboarded</th>
                <th className="px-4 py-3">Joined</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (<tr><td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">Loading…</td></tr>)}
              {!isLoading && filtered.length === 0 && (<tr><td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">No users found.</td></tr>)}
              {filtered.map((u) => (
                <tr key={u.user_id} className="border-t">
                  <td className="px-4 py-3">{[u.first_name, u.last_name].filter(Boolean).join(" ") || "—"}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">{u.country || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {u.roles.map((r) => <Badge key={r} variant="secondary">{r}</Badge>)}
                    </div>
                  </td>
                  <td className="px-4 py-3">{u.onboarding_completed ? "Yes" : "No"}</td>
                  <td className="px-4 py-3">{new Date(u.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminPageShell>
  );
}
