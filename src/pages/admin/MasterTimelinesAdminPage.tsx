import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type CTA = { label: string; to: string; variant?: string };
type Timeline = {
  id: string;
  slug: string;
  eyebrow: string | null;
  title: string;
  description: string | null;
  image_url: string | null;
  image_alt: string | null;
  badge_label: string | null;
  highlights: string[];
  ctas: CTA[];
  display_order: number;
  is_active: boolean;
};

const VARIANTS = ["default", "secondary", "outline", "heroOutline", "ghost", "link"];

export default function MasterTimelinesAdminPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-master-timelines"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("master_timelines")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return (data ?? []) as Timeline[];
    },
  });

  const save = useMutation({
    mutationFn: async (t: Timeline) => {
      const { error } = await (supabase as any)
        .from("master_timelines")
        .update({
          eyebrow: t.eyebrow,
          title: t.title,
          description: t.description,
          image_url: t.image_url,
          image_alt: t.image_alt,
          badge_label: t.badge_label,
          highlights: t.highlights,
          ctas: t.ctas,
          display_order: t.display_order,
          is_active: t.is_active,
        })
        .eq("id", t.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Saved" });
      qc.invalidateQueries({ queryKey: ["admin-master-timelines"] });
      qc.invalidateQueries({ queryKey: ["master-timelines"] });
    },
    onError: (e: any) => toast({ title: "Save failed", description: e.message, variant: "destructive" }),
  });

  return (
    <AdminPageShell title="Master Timelines" description="Edit titles, highlights, images and CTAs for the NESA-Africa and EduAid-Africa timeline cards on the landing page.">
      {isLoading ? (
        <div className="text-muted-foreground">Loading…</div>
      ) : (
        <div className="space-y-6">
          {data?.map((t) => (
            <TimelineEditor key={t.id} initial={t} onSave={(next) => save.mutate(next)} saving={save.isPending} />
          ))}
        </div>
      )}
    </AdminPageShell>
  );
}

function TimelineEditor({
  initial,
  onSave,
  saving,
}: {
  initial: Timeline;
  onSave: (t: Timeline) => void;
  saving: boolean;
}) {
  const [t, setT] = useState<Timeline>({
    ...initial,
    highlights: Array.isArray(initial.highlights) ? initial.highlights : [],
    ctas: Array.isArray(initial.ctas) ? initial.ctas : [],
  });

  const update = <K extends keyof Timeline>(k: K, v: Timeline[K]) => setT((p) => ({ ...p, [k]: v }));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">
          {t.title} <span className="text-xs text-muted-foreground">/ {t.slug}</span>
        </CardTitle>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Switch checked={t.is_active} onCheckedChange={(v) => update("is_active", v)} />
            <span>Active</span>
          </div>
          <Button size="sm" onClick={() => onSave(t)} disabled={saving}>
            <Save className="mr-1 h-4 w-4" /> Save
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Eyebrow"><Input value={t.eyebrow ?? ""} onChange={(e) => update("eyebrow", e.target.value)} /></Field>
          <Field label="Badge label"><Input value={t.badge_label ?? ""} onChange={(e) => update("badge_label", e.target.value)} /></Field>
          <Field label="Title"><Input value={t.title} onChange={(e) => update("title", e.target.value)} /></Field>
          <Field label="Display order"><Input type="number" value={t.display_order} onChange={(e) => update("display_order", Number(e.target.value))} /></Field>
          <Field label="Image URL" className="md:col-span-2"><Input value={t.image_url ?? ""} onChange={(e) => update("image_url", e.target.value)} /></Field>
          <Field label="Image alt text" className="md:col-span-2"><Input value={t.image_alt ?? ""} onChange={(e) => update("image_alt", e.target.value)} /></Field>
          <Field label="Description" className="md:col-span-2">
            <Textarea rows={3} value={t.description ?? ""} onChange={(e) => update("description", e.target.value)} />
          </Field>
        </div>

        {t.image_url && (
          <img src={t.image_url} alt={t.image_alt ?? ""} className="h-32 w-full rounded-md object-cover" />
        )}

        {/* Highlights */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <Label>Highlights</Label>
            <Button size="sm" variant="outline" onClick={() => update("highlights", [...t.highlights, ""])}>
              <Plus className="mr-1 h-3.5 w-3.5" /> Add
            </Button>
          </div>
          <div className="space-y-2">
            {t.highlights.map((h, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={h}
                  onChange={(e) => {
                    const next = [...t.highlights];
                    next[i] = e.target.value;
                    update("highlights", next);
                  }}
                />
                <Button size="icon" variant="ghost" onClick={() => update("highlights", t.highlights.filter((_, j) => j !== i))}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <Label>CTA buttons</Label>
            <Button size="sm" variant="outline" onClick={() => update("ctas", [...t.ctas, { label: "", to: "", variant: "default" }])}>
              <Plus className="mr-1 h-3.5 w-3.5" /> Add
            </Button>
          </div>
          <div className="space-y-2">
            {t.ctas.map((c, i) => (
              <div key={i} className="grid gap-2 md:grid-cols-[1fr_1fr_140px_auto]">
                <Input
                  placeholder="Label"
                  value={c.label}
                  onChange={(e) => {
                    const next = [...t.ctas];
                    next[i] = { ...c, label: e.target.value };
                    update("ctas", next);
                  }}
                />
                <Input
                  placeholder="/path or https://…"
                  value={c.to}
                  onChange={(e) => {
                    const next = [...t.ctas];
                    next[i] = { ...c, to: e.target.value };
                    update("ctas", next);
                  }}
                />
                <select
                  className="h-10 rounded-md border bg-background px-2 text-sm"
                  value={c.variant ?? "default"}
                  onChange={(e) => {
                    const next = [...t.ctas];
                    next[i] = { ...c, variant: e.target.value };
                    update("ctas", next);
                  }}
                >
                  {VARIANTS.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
                <Button size="icon" variant="ghost" onClick={() => update("ctas", t.ctas.filter((_, j) => j !== i))}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <Label className="mb-1 block text-xs uppercase tracking-wide text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
