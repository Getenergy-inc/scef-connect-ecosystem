import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Trash2, ArrowLeft, ArrowUp, ArrowDown, CheckCircle2 } from "lucide-react";

type Question = {
  id: string;
  exam_id: string;
  position: number;
  prompt: string;
  options: string[];
  correct_index: number;
  points: number;
};

type Exam = { id: string; title: string; slug: string };

const blank = (): Partial<Question> => ({
  position: 1, prompt: "", options: ["", "", "", ""], correct_index: 0, points: 1,
});

export default function ScholarshipExamQuestionsAdmin() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState<Exam | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Question>>(blank());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/auth"); return; }
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
      const ok = roles?.some(r => ["admin","super_admin","hq_admin"].includes(r.role as string));
      if (!ok) { navigate("/dashboard"); return; }
      await load();
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examId]);

  const load = async () => {
    if (!examId) return;
    const [{ data: ex }, { data: qs, error }] = await Promise.all([
      supabase.from("scholarship_exams").select("id,title,slug").eq("id", examId).maybeSingle(),
      supabase.from("scholarship_exam_questions").select("*").eq("exam_id", examId).order("position"),
    ]);
    if (error) toast.error(error.message);
    setExam(ex as Exam | null);
    const norm = (qs ?? []).map((q: any) => ({
      ...q,
      options: Array.isArray(q.options) ? q.options : (typeof q.options === "string" ? JSON.parse(q.options) : []),
    })) as Question[];
    setQuestions(norm);
  };

  const startNew = () => {
    const nextPos = questions.length ? Math.max(...questions.map(q => q.position)) + 1 : 1;
    setEditing({ ...blank(), position: nextPos });
    setOpen(true);
  };
  const startEdit = (q: Question) => { setEditing({ ...q, options: [...q.options] }); setOpen(true); };

  const save = async () => {
    if (!examId) return;
    const opts = (editing.options ?? []).map(o => (o ?? "").trim());
    if (!editing.prompt?.trim()) { toast.error("Prompt required"); return; }
    if (opts.length < 2 || opts.some(o => !o)) { toast.error("Provide at least 2 non-empty options"); return; }
    if (editing.correct_index == null || editing.correct_index < 0 || editing.correct_index >= opts.length) {
      toast.error("Select the correct answer"); return;
    }
    setSaving(true);
    const payload = {
      exam_id: examId,
      position: Number(editing.position) || 1,
      prompt: editing.prompt.trim(),
      options: opts,
      correct_index: Number(editing.correct_index),
      points: Number(editing.points) || 1,
    };
    const { error } = editing.id
      ? await supabase.from("scholarship_exam_questions").update(payload).eq("id", editing.id)
      : await supabase.from("scholarship_exam_questions").insert(payload);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Saved");
    setOpen(false);
    await load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this question?")) return;
    const { error } = await supabase.from("scholarship_exam_questions").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    await load();
  };

  const move = async (q: Question, dir: -1 | 1) => {
    const sorted = [...questions].sort((a, b) => a.position - b.position);
    const idx = sorted.findIndex(x => x.id === q.id);
    const swap = sorted[idx + dir];
    if (!swap) return;
    // Two-step swap to avoid unique (exam_id, position) collision
    const tmp = -Math.abs(q.position) - 1;
    const e1 = await supabase.from("scholarship_exam_questions").update({ position: tmp }).eq("id", q.id);
    if (e1.error) { toast.error(e1.error.message); return; }
    const e2 = await supabase.from("scholarship_exam_questions").update({ position: q.position }).eq("id", swap.id);
    if (e2.error) { toast.error(e2.error.message); return; }
    const e3 = await supabase.from("scholarship_exam_questions").update({ position: swap.position }).eq("id", q.id);
    if (e3.error) { toast.error(e3.error.message); return; }
    await load();
  };

  const setOption = (i: number, v: string) => {
    setEditing(s => {
      const opts = [...(s.options ?? [])];
      opts[i] = v;
      return { ...s, options: opts };
    });
  };
  const addOption = () => setEditing(s => ({ ...s, options: [...(s.options ?? []), ""] }));
  const removeOption = (i: number) => setEditing(s => {
    const opts = [...(s.options ?? [])];
    opts.splice(i, 1);
    let ci = s.correct_index ?? 0;
    if (ci >= opts.length) ci = Math.max(0, opts.length - 1);
    return { ...s, options: opts, correct_index: ci };
  });

  if (loading) {
    return (
      <DashboardLayout role="super_admin" title="Exam Questions">
        <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <Helmet><title>{exam?.title ?? "Exam"} — Questions · SCEF</title></Helmet>
      <DashboardLayout role="super_admin" title={exam?.title ?? "Exam Questions"}>
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <Button asChild variant="ghost" size="sm" className="mb-2">
                <Link to="/admin/scholarship/exams"><ArrowLeft className="w-4 h-4 mr-1" /> All exams</Link>
              </Button>
              <h1 className="text-2xl font-bold">{exam?.title}</h1>
              <p className="text-muted-foreground text-sm">/{exam?.slug} · {questions.length} question(s) · {questions.reduce((s,q)=>s+q.points,0)} total points</p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button onClick={startNew}><Plus className="w-4 h-4 mr-2" />Add Question</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader><DialogTitle>{editing.id ? "Edit Question" : "New Question"}</DialogTitle></DialogHeader>
                <div className="grid gap-4 py-2">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Position</Label>
                      <Input type="number" min={1} value={editing.position ?? 1} onChange={e => setEditing(s => ({ ...s, position: Number(e.target.value) }))} />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label>Points</Label>
                      <Input type="number" min={1} value={editing.points ?? 1} onChange={e => setEditing(s => ({ ...s, points: Number(e.target.value) }))} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Prompt</Label>
                    <Textarea rows={3} value={editing.prompt ?? ""} onChange={e => setEditing(s => ({ ...s, prompt: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Options (select the correct one)</Label>
                    <RadioGroup
                      value={String(editing.correct_index ?? 0)}
                      onValueChange={v => setEditing(s => ({ ...s, correct_index: Number(v) }))}
                    >
                      <div className="space-y-2">
                        {(editing.options ?? []).map((opt, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <RadioGroupItem value={String(i)} id={`opt-${i}`} />
                            <Input value={opt} onChange={e => setOption(i, e.target.value)} placeholder={`Option ${i + 1}`} />
                            <Button type="button" size="icon" variant="ghost" onClick={() => removeOption(i)} disabled={(editing.options?.length ?? 0) <= 2}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                    <Button type="button" variant="outline" size="sm" onClick={addOption}><Plus className="w-4 h-4 mr-1" />Add option</Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={save} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {questions.length === 0 ? (
            <Card><CardContent className="py-12 text-center text-muted-foreground">No questions yet.</CardContent></Card>
          ) : (
            <div className="grid gap-3">
              {questions.map((q, idx) => (
                <Card key={q.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <CardTitle className="text-base">
                          <span className="text-muted-foreground mr-2">Q{q.position}.</span>{q.prompt}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          <Badge variant="outline" className="mr-2">{q.points} pt</Badge>
                          {q.options.length} options
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button size="icon" variant="ghost" onClick={() => move(q, -1)} disabled={idx === 0}><ArrowUp className="w-4 h-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => move(q, 1)} disabled={idx === questions.length - 1}><ArrowDown className="w-4 h-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => startEdit(q)}><Pencil className="w-4 h-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => remove(q.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm">
                      {q.options.map((opt, i) => (
                        <li key={i} className={`flex items-center gap-2 ${i === q.correct_index ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                          {i === q.correct_index ? <CheckCircle2 className="w-4 h-4 text-scef-gold" /> : <span className="w-4 h-4 inline-block" />}
                          {opt}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
}
