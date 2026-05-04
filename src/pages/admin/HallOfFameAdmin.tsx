import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";
import { useAuthState } from "@/hooks/useAuthState";
import { toast } from "sonner";
import { logger } from "@/lib/logger";
import { HOF_BADGES, type HoFProfile } from "@/lib/hallOfFame";

export default function HallOfFameAdmin() {
  const { user, loading: authLoading } = useAuthState();
  const { isAdmin, loading: roleLoading } = useUserRole(user?.id ?? null);
  const [tab, setTab] = useState<"pending" | "approved" | "rejected">("pending");
  const [items, setItems] = useState<HoFProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<HoFProfile | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("hall_of_fame_profiles")
      .select("*")
      .eq("status", tab)
      .order("created_at", { ascending: false });
    if (error) logger.error("HoF admin load", error);
    setItems((data as any) ?? []);
    setLoading(false);
  }

  useEffect(() => { if (isAdmin) load(); }, [tab, isAdmin]);

  if (roleLoading) return <div className="p-12 text-center text-muted-foreground">Loading…</div>;
  if (!isAdmin) return <Navigate to="/" replace />;

  async function save(p: HoFProfile, patch: Partial<HoFProfile>) {
    const { error } = await supabase.from("hall_of_fame_profiles").update(patch).eq("id", p.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Updated");
    setEditing(null);
    load();
  }

  return (
    <>
      <Helmet><title>Hall of Fame Admin — SCEF</title></Helmet>
      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />
        <main className="py-12">
          <div className="container mx-auto px-6 md:px-8">
            <h1 className="font-display text-3xl font-bold text-scef-blue-darker">Hall of Fame Review</h1>
            <p className="mt-2 text-muted-foreground">Review submissions, edit profiles, assign badges, and publish.</p>

            <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="mt-8">
              <TabsList>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>

              <TabsContent value={tab} className="mt-6">
                {loading ? (
                  <p className="text-muted-foreground">Loading…</p>
                ) : items.length === 0 ? (
                  <p className="text-muted-foreground">No submissions in this state.</p>
                ) : (
                  <div className="space-y-4">
                    {items.map((p) => (
                      <div key={p.id} className="rounded-xl border border-border bg-card p-5">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div className="flex gap-4">
                            {p.photo_url && (
                              <img src={p.photo_url} alt={p.full_name} className="h-16 w-16 rounded-lg object-cover" />
                            )}
                            <div>
                              <h3 className="font-display text-lg font-semibold text-scef-blue-darker">{p.full_name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {p.role} · {p.country ?? "—"} · {p.year_start ?? "?"}
                              </p>
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                <Badge variant="outline">{p.status}</Badge>
                                {p.is_verified && <Badge>Verified</Badge>}
                                {p.is_featured && <Badge>Featured</Badge>}
                                {p.badge && <Badge variant="secondary">{p.badge}</Badge>}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => setEditing(p)}>Edit</Button>
                            {p.status !== "approved" && (
                              <Button size="sm" onClick={() => save(p, { status: "approved" })}>Approve</Button>
                            )}
                            {p.status !== "rejected" && (
                              <Button size="sm" variant="destructive" onClick={() => save(p, { status: "rejected" })}>Reject</Button>
                            )}
                          </div>
                        </div>

                        {editing?.id === p.id && (
                          <EditForm profile={p} onSave={(patch) => save(p, patch)} onCancel={() => setEditing(null)} />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

function EditForm({ profile, onSave, onCancel }: { profile: HoFProfile; onSave: (p: Partial<HoFProfile>) => void; onCancel: () => void }) {
  const [f, setF] = useState({
    full_name: profile.full_name,
    role: profile.role,
    badge: profile.badge ?? "",
    contribution_summary: profile.contribution_summary ?? "",
    testimony: profile.testimony ?? "",
    meta_title: profile.meta_title ?? "",
    meta_description: profile.meta_description ?? "",
    is_featured: profile.is_featured,
    is_verified: profile.is_verified,
  });
  const set = (k: string, v: any) => setF((p) => ({ ...p, [k]: v }));
  return (
    <div className="mt-5 grid gap-4 border-t border-border pt-5 md:grid-cols-2">
      <div><Label>Full name</Label><Input value={f.full_name} onChange={(e) => set("full_name", e.target.value)} /></div>
      <div><Label>Role</Label><Input value={f.role} onChange={(e) => set("role", e.target.value)} /></div>
      <div>
        <Label>Badge</Label>
        <select className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={f.badge} onChange={(e) => set("badge", e.target.value)}>
          <option value="">— none —</option>
          {HOF_BADGES.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>
      <div className="flex items-end gap-6">
        <label className="flex items-center gap-2 text-sm"><Switch checked={f.is_verified} onCheckedChange={(v) => set("is_verified", v)} /> Verified</label>
        <label className="flex items-center gap-2 text-sm"><Switch checked={f.is_featured} onCheckedChange={(v) => set("is_featured", v)} /> Featured</label>
      </div>
      <div className="md:col-span-2"><Label>Contribution summary</Label><Textarea rows={3} value={f.contribution_summary} onChange={(e) => set("contribution_summary", e.target.value)} /></div>
      <div className="md:col-span-2"><Label>Testimony</Label><Textarea rows={5} value={f.testimony} onChange={(e) => set("testimony", e.target.value)} /></div>
      <div><Label>SEO meta title</Label><Input value={f.meta_title} onChange={(e) => set("meta_title", e.target.value)} /></div>
      <div><Label>SEO meta description</Label><Input value={f.meta_description} onChange={(e) => set("meta_description", e.target.value)} /></div>
      <div className="md:col-span-2 flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSave(f)}>Save changes</Button>
      </div>
    </div>
  );
}
