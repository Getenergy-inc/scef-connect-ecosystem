import { useEffect, useState } from "react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, X, Inbox, MessageSquare, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import SophiaAnalyticsPanel from "@/components/admin/sophia/SophiaAnalyticsPanel";


interface Faq {
  id: string;
  faq_number: number | null;
  category: string;
  subcategory: string | null;
  question: string;
  short_answer: string;
  full_answer: string | null;
  keywords: string[] | null;
  related_program: string | null;
  audience_type: string | null;
  support_channel: string | null;
  priority_level: string;
  status: string;
  language: string;
  related_url: string | null;
  escalation_required: boolean;
  escalation_department: string | null;
}

interface Unanswered {
  id: string;
  question_text: string;
  user_contact: string | null;
  suggested_category: string | null;
  status: string;
  created_at: string;
}

const STATUS = ["draft", "pending_review", "published", "archived", "needs_update"];
const PRIORITY = ["low", "normal", "high", "urgent"];

const empty: Partial<Faq> = {
  category: "General SCEF",
  question: "",
  short_answer: "",
  full_answer: "",
  status: "published",
  priority_level: "normal",
  language: "en",
  escalation_required: false,
};

  const [tab, setTab] = useState<"faqs" | "unanswered" | "analytics">("faqs");

  const [tab, setTab] = useState<"faqs" | "unanswered">("faqs");
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [unanswered, setUnanswered] = useState<Unanswered[]>([]);
  const [editing, setEditing] = useState<Partial<Faq> | null>(null);
  const [search, setSearch] = useState("");

  const load = async () => {
    const [{ data: f }, { data: u }] = await Promise.all([
      supabase.from("sophia_faqs").select("*").order("faq_number", { ascending: true }),
      supabase.from("sophia_unanswered_questions").select("*").order("created_at", { ascending: false }),
    ]);
    setFaqs((f ?? []) as Faq[]);
    setUnanswered((u ?? []) as Unanswered[]);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    if (!editing) return;
    const payload: any = {
      ...editing,
      keywords: typeof editing.keywords === "string"
        ? (editing.keywords as unknown as string).split(",").map((s) => s.trim()).filter(Boolean)
        : editing.keywords ?? [],
    };
    if (!payload.question || !payload.short_answer || !payload.category) {
      toast.error("Question, short answer, and category are required");
      return;
    }
    const { error } = editing.id
      ? await supabase.from("sophia_faqs").update(payload).eq("id", editing.id)
      : await supabase.from("sophia_faqs").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this FAQ?")) return;
    const { error } = await supabase.from("sophia_faqs").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  const convertToFaq = (u: Unanswered) => {
    setEditing({
      ...empty,
      question: u.question_text,
      short_answer: "",
      category: u.suggested_category || "General SCEF",
      status: "draft",
    });
    setTab("faqs");
  };

  const markUnansweredStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("sophia_unanswered_questions").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  const filtered = faqs.filter((f) =>
    !search ? true : (f.question + f.short_answer + f.category).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminPageShell title="Sophia Knowledge Base Admin" description="Manage FAQs, escalations, and unanswered questions">
      <div className="flex items-center gap-2 border-b border-border">
        <button
          onClick={() => setTab("faqs")}
          className={cn(
            "px-4 py-2 text-sm font-medium border-b-2 -mb-px",
            tab === "faqs" ? "border-scef-gold text-scef-blue-darker" : "border-transparent text-muted-foreground"
          )}
        >
          <MessageSquare className="w-4 h-4 inline mr-2" />
          FAQs ({faqs.length})
        </button>
        <button
          onClick={() => setTab("unanswered")}
          className={cn(
            "px-4 py-2 text-sm font-medium border-b-2 -mb-px",
            tab === "unanswered" ? "border-scef-gold text-scef-blue-darker" : "border-transparent text-muted-foreground"
          )}
        >
          <Inbox className="w-4 h-4 inline mr-2" />
          Unanswered ({unanswered.filter((u) => u.status === "pending_review").length})
        </button>
      </div>

      {tab === "faqs" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search FAQs…"
              className="max-w-md"
            />
            <Button onClick={() => setEditing(empty)} className="bg-scef-blue-darker">
              <Plus className="w-4 h-4 mr-2" /> Add FAQ
            </Button>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="text-left p-3">#</th>
                  <th className="text-left p-3">Category</th>
                  <th className="text-left p-3">Question</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Priority</th>
                  <th className="text-right p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((f) => (
                  <tr key={f.id} className="border-t border-border hover:bg-muted/30">
                    <td className="p-3 text-muted-foreground">{f.faq_number ?? "-"}</td>
                    <td className="p-3">
                      <span className="text-xs px-2 py-0.5 rounded bg-scef-gold/10 text-scef-blue-darker font-medium">
                        {f.category}
                      </span>
                    </td>
                    <td className="p-3 max-w-md truncate">{f.question}</td>
                    <td className="p-3 text-xs">{f.status}</td>
                    <td className="p-3 text-xs">{f.priority_level}</td>
                    <td className="p-3 text-right space-x-2">
                      <button onClick={() => setEditing(f)} className="text-scef-blue-darker hover:opacity-70">
                        <Pencil className="w-4 h-4 inline" />
                      </button>
                      <button onClick={() => remove(f.id)} className="text-destructive hover:opacity-70">
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground">
                      No FAQs.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "unanswered" && (
        <div className="space-y-3">
          {unanswered.length === 0 && (
            <p className="text-muted-foreground text-center py-8">No questions waiting for review.</p>
          )}
          {unanswered.map((u) => (
            <div key={u.id} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-foreground">{u.question_text}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {u.suggested_category && <span className="mr-3">Suggested: {u.suggested_category}</span>}
                    {u.user_contact && <span className="mr-3">Contact: {u.user_contact}</span>}
                    <span>Status: {u.status}</span>
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" variant="outline" onClick={() => markUnansweredStatus(u.id, "archived")}>
                    Archive
                  </Button>
                  <Button size="sm" onClick={() => convertToFaq(u)} className="bg-scef-blue-darker">
                    Convert to FAQ
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor drawer */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-scef-blue-darker">
                {editing.id ? "Edit FAQ" : "New FAQ"}
              </h3>
              <button onClick={() => setEditing(null)} aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <label className="text-xs font-medium space-y-1">
                Category *
                <Input
                  value={editing.category ?? ""}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                />
              </label>
              <label className="text-xs font-medium space-y-1">
                FAQ Number
                <Input
                  type="number"
                  value={editing.faq_number ?? ""}
                  onChange={(e) => setEditing({ ...editing, faq_number: e.target.value ? Number(e.target.value) : null })}
                />
              </label>
            </div>

            <label className="text-xs font-medium space-y-1 block">
              Question *
              <Input
                value={editing.question ?? ""}
                onChange={(e) => setEditing({ ...editing, question: e.target.value })}
              />
            </label>

            <label className="text-xs font-medium space-y-1 block">
              Short Answer *
              <Textarea
                rows={2}
                value={editing.short_answer ?? ""}
                onChange={(e) => setEditing({ ...editing, short_answer: e.target.value })}
              />
            </label>

            <label className="text-xs font-medium space-y-1 block">
              Full Answer
              <Textarea
                rows={4}
                value={editing.full_answer ?? ""}
                onChange={(e) => setEditing({ ...editing, full_answer: e.target.value })}
              />
            </label>

            <label className="text-xs font-medium space-y-1 block">
              Keywords (comma-separated)
              <Input
                value={Array.isArray(editing.keywords) ? editing.keywords.join(", ") : (editing.keywords as any) ?? ""}
                onChange={(e) => setEditing({ ...editing, keywords: e.target.value as any })}
              />
            </label>

            <div className="grid sm:grid-cols-3 gap-3">
              <label className="text-xs font-medium space-y-1">
                Status
                <select
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  value={editing.status ?? "published"}
                  onChange={(e) => setEditing({ ...editing, status: e.target.value })}
                >
                  {STATUS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
              <label className="text-xs font-medium space-y-1">
                Priority
                <select
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  value={editing.priority_level ?? "normal"}
                  onChange={(e) => setEditing({ ...editing, priority_level: e.target.value })}
                >
                  {PRIORITY.map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
              <label className="text-xs font-medium space-y-1">
                Program
                <Input
                  value={editing.related_program ?? ""}
                  onChange={(e) => setEditing({ ...editing, related_program: e.target.value })}
                />
              </label>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <label className="text-xs font-medium space-y-1">
                Audience
                <Input
                  value={editing.audience_type ?? ""}
                  onChange={(e) => setEditing({ ...editing, audience_type: e.target.value })}
                />
              </label>
              <label className="text-xs font-medium space-y-1">
                Channel
                <Input
                  value={editing.support_channel ?? ""}
                  onChange={(e) => setEditing({ ...editing, support_channel: e.target.value })}
                />
              </label>
            </div>

            <label className="text-xs font-medium space-y-1 block">
              Related URL
              <Input
                value={editing.related_url ?? ""}
                onChange={(e) => setEditing({ ...editing, related_url: e.target.value })}
              />
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={!!editing.escalation_required}
                onChange={(e) => setEditing({ ...editing, escalation_required: e.target.checked })}
              />
              Requires escalation
            </label>
            {editing.escalation_required && (
              <label className="text-xs font-medium space-y-1 block">
                Escalation Department
                <Input
                  value={editing.escalation_department ?? ""}
                  onChange={(e) => setEditing({ ...editing, escalation_department: e.target.value })}
                />
              </label>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
              <Button onClick={save} className="bg-scef-blue-darker">Save</Button>
            </div>
          </div>
        </div>
      )}
    </AdminPageShell>
  );
}
