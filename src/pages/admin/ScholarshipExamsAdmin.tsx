import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Trash2, ListChecks, GraduationCap, PlayCircle } from "lucide-react";

type Exam = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category_slug: string | null;
  duration_minutes: number;
  pass_score_percent: number;
  max_attempts: number;
  is_published: boolean;
  opens_at: string | null;
  closes_at: string | null;
};

const empty: Partial<Exam> = {
  slug: "",
  title: "",
  description: "",
  category_slug: "",
  duration_minutes: 30,
  pass_score_percent: 60,
  max_attempts: 1,
  is_published: true,
};

export default function ScholarshipExamsAdmin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [exams, setExams] = useState<Exam[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Exam>>(empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/auth"); return; }
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
      const ok = roles?.some(r => ["admin","super_admin","hq_admin"].includes(r.role as string));
      if (!ok) { navigate("/dashboard"); return; }
      setIsAdmin(true);
      await load();
      setLoading(false);
    })();
  }, [navigate]);

  const load = async () => {
    const { data, error } = await supabase
      .from("scholarship_exams")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) { toast.error(error.message); return; }
    setExams((data ?? []) as Exam[]);
  };

  const startNew = () => { setEditing(empty); setOpen(true); };
  const startEdit = (e: Exam) => { setEditing(e); setOpen(true); };

  const save = async () => {
    if (!editing.slug || !editing.title) { toast.error("Slug and title required"); return; }
    setSaving(true);
    const payload = {
      slug: editing.slug,
      title: editing.title,
      description: editing.description || null,
      category_slug: editing.category_slug || null,
      duration_minutes: Number(editing.duration_minutes) || 30,
      pass_score_percent: Number(editing.pass_score_percent) || 60,
      max_attempts: Number(editing.max_attempts) || 1,
      is_published: !!editing.is_published,
    };
    const { error } = editing.id
      ? await supabase.from("scholarship_exams").update(payload).eq("id", editing.id)
      : await supabase.from("scholarship_exams").insert(payload);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(editing.id ? "Exam updated" : "Exam created");
    setOpen(false);
    await load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this exam and all its questions/attempts?")) return;
    const { error } = await supabase.from("scholarship_exams").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Exam deleted");
    await load();
  };

  const togglePublish = async (e: Exam) => {
    const { error } = await supabase.from("scholarship_exams")
      .update({ is_published: !e.is_published }).eq("id", e.id);
    if (error) { toast.error(error.message); return; }
    await load();
  };

  if (loading) {
    return (
      <DashboardLayout role="super_admin" title="Scholarship Exams">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }
  if (!isAdmin) return null;

  return (
    <>
      <Helmet><title>Scholarship Exams Admin · SCEF</title></Helmet>
      <DashboardLayout role="super_admin" title="Scholarship Exams">
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-scef-gold/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-scef-gold" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Scholarship Exams</h1>
                <p className="text-muted-foreground">Create, publish and manage assessments</p>
              </div>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button onClick={startNew}><Plus className="w-4 h-4 mr-2" />New Exam</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editing.id ? "Edit Exam" : "New Exam"}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-2">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Slug</Label>
                      <Input value={editing.slug ?? ""} onChange={e => setEditing(s => ({ ...s, slug: e.target.value }))} placeholder="eduaid-2026-general" />
                    </div>
                    <div className="space-y-2">
                      <Label>Category (optional)</Label>
                      <Input value={editing.category_slug ?? ""} onChange={e => setEditing(s => ({ ...s, category_slug: e.target.value }))} placeholder="vocational | college | tertiary | professional" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input value={editing.title ?? ""} onChange={e => setEditing(s => ({ ...s, title: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea rows={3} value={editing.description ?? ""} onChange={e => setEditing(s => ({ ...s, description: e.target.value }))} />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Duration (minutes)</Label>
                      <Input type="number" min={1} max={240} value={editing.duration_minutes ?? 30} onChange={e => setEditing(s => ({ ...s, duration_minutes: Number(e.target.value) }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Pass score %</Label>
                      <Input type="number" min={0} max={100} value={editing.pass_score_percent ?? 60} onChange={e => setEditing(s => ({ ...s, pass_score_percent: Number(e.target.value) }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Max attempts</Label>
                      <Input type="number" min={1} value={editing.max_attempts ?? 1} onChange={e => setEditing(s => ({ ...s, max_attempts: Number(e.target.value) }))} />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch checked={!!editing.is_published} onCheckedChange={v => setEditing(s => ({ ...s, is_published: v }))} />
                    <Label>Published</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={save} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {exams.length === 0 ? (
            <Card><CardContent className="py-12 text-center text-muted-foreground">No exams yet. Create one to get started.</CardContent></Card>
          ) : (
            <div className="grid gap-4">
              {exams.map(e => (
                <Card key={e.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {e.title}
                          <Badge variant={e.is_published ? "default" : "secondary"}>
                            {e.is_published ? "Published" : "Draft"}
                          </Badge>
                          {e.category_slug && <Badge variant="outline">{e.category_slug}</Badge>}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          /{e.slug} · {e.duration_minutes} min · pass {e.pass_score_percent}% · {e.max_attempts} attempt(s)
                        </CardDescription>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Button asChild size="sm" variant="secondary">
                          <Link to={`/admin/scholarship/exams/${e.id}/questions`}>
                            <ListChecks className="w-4 h-4 mr-1" /> Questions
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => togglePublish(e)}>
                          {e.is_published ? "Unpublish" : "Publish"}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => startEdit(e)}><Pencil className="w-4 h-4" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => remove(e.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                      </div>
                    </div>
                  </CardHeader>
                  {e.description && <CardContent className="text-sm text-muted-foreground">{e.description}</CardContent>}
                </Card>
              ))}
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
}
