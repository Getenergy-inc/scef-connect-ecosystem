import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { StaffGuard } from "./StaffGuard";
import { StaffLayout } from "./StaffLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Sparkles, ListTodo, Users, MessageSquare, Handshake, Building2, Loader2, Copy } from "lucide-react";

type ToolKey =
  | "task_breakdown"
  | "meeting_summary"
  | "comm_draft"
  | "partner_summary"
  | "chapter_support";

interface ToolConfig {
  key: ToolKey;
  label: string;
  icon: any;
  prompt: string;
  placeholder: string;
}

const TOOLS: ToolConfig[] = [
  {
    key: "task_breakdown",
    label: "Task Breakdown",
    icon: ListTodo,
    prompt: "Convert a high-level goal into actionable tasks.",
    placeholder: "e.g. Launch the EduAid Q1 webinar series across 5 chapters",
  },
  {
    key: "meeting_summary",
    label: "Meeting Summary",
    icon: Users,
    prompt: "Paste meeting notes — get a summary + action items.",
    placeholder: "Paste raw meeting notes here…",
  },
  {
    key: "comm_draft",
    label: "Communication Draft",
    icon: MessageSquare,
    prompt: "Draft a professional internal/external message.",
    placeholder: "e.g. Follow-up to Lagos chapter on outstanding partnership MOU",
  },
  {
    key: "partner_summary",
    label: "Partner / CSR Summary",
    icon: Handshake,
    prompt: "Summarise partner status & deliverables.",
    placeholder: "Describe the partner engagement, deliverables, and current state…",
  },
  {
    key: "chapter_support",
    label: "Chapter Support",
    icon: Building2,
    prompt: "Triage a chapter request into priority + suggested response.",
    placeholder: "Describe the chapter request or ticket…",
  },
];

const Hub = () => {
  const [active, setActive] = useState<ToolKey>("task_breakdown");
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<any>(null);

  const tool = TOOLS.find((t) => t.key === active)!;

  const run = async () => {
    if (!input.trim()) {
      toast.error("Add some context first");
      return;
    }
    setBusy(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("staff-ai-assistant", {
        body: { tool: active, context: { input } },
      });
      if (error) throw error;
      setResult(data);
    } catch (e: any) {
      toast.error(e?.message?.includes("402") ? "AI credits required" : "AI request failed");
    } finally {
      setBusy(false);
    }
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      toast.success("Copied");
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <StaffLayout title="AI Assistant">
      <Helmet>
        <title>AI Assistant | SCEF Staff</title>
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-5">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Embedded AI tools
          </h2>
          <p className="text-sm text-muted-foreground">
            Workflow helpers for planning, reporting, and partner/chapter operations. All output is editable before you use it.
          </p>
        </div>

        <Tabs value={active} onValueChange={(v) => { setActive(v as ToolKey); setResult(null); setInput(""); }}>
          <TabsList className="flex flex-wrap h-auto">
            {TOOLS.map((t) => (
              <TabsTrigger key={t.key} value={t.key} className="gap-1.5">
                <t.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={active} className="mt-4 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{tool.label}</CardTitle>
                <p className="text-xs text-muted-foreground">{tool.prompt}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">Context / input</Label>
                  <Textarea
                    rows={5}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={tool.placeholder}
                  />
                </div>
                <Button onClick={run} disabled={busy} className="gap-1.5">
                  {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  {busy ? "Generating…" : "Run"}
                </Button>
              </CardContent>
            </Card>

            {result && (
              <Card className="border-primary/40 bg-primary/5">
                <CardHeader className="pb-2 flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Result
                    <Badge variant="secondary" className="text-[10px]">edit before sending</Badge>
                  </CardTitle>
                  <Button size="sm" variant="ghost" onClick={copyResult}>
                    <Copy className="w-3.5 h-3.5" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <ResultRenderer toolKey={active} result={result} />
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </StaffLayout>
  );
};

const ResultRenderer = ({ toolKey, result }: { toolKey: ToolKey; result: any }) => {
  if (toolKey === "task_breakdown") {
    return (
      <ul className="space-y-1.5 list-disc pl-5 text-sm text-foreground">
        {(result.suggestions ?? []).map((s: string, i: number) => <li key={i}>{s}</li>)}
      </ul>
    );
  }
  if (toolKey === "meeting_summary") {
    return (
      <div className="space-y-3 text-sm">
        <p className="text-foreground">{result.summary}</p>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Action items</p>
          <ul className="space-y-1 list-disc pl-5">
            {(result.action_items ?? []).map((a: any, i: number) => (
              <li key={i}><strong>{a.owner}:</strong> {a.task} <span className="text-muted-foreground">({a.due})</span></li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  if (toolKey === "comm_draft") {
    return (
      <div className="space-y-2 text-sm">
        <p><span className="text-xs uppercase text-muted-foreground">Subject:</span> <strong>{result.subject}</strong></p>
        <Textarea rows={8} defaultValue={result.body} className="font-sans" />
      </div>
    );
  }
  if (toolKey === "partner_summary") {
    return (
      <div className="space-y-3 text-sm">
        <p>{result.status_summary}</p>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Outstanding deliverables</p>
          <ul className="space-y-1 list-disc pl-5">
            {(result.outstanding_deliverables ?? []).map((s: string, i: number) => <li key={i}>{s}</li>)}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Recommended next steps</p>
          <ul className="space-y-1 list-disc pl-5">
            {(result.recommended_next_steps ?? []).map((s: string, i: number) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      </div>
    );
  }
  if (toolKey === "chapter_support") {
    return (
      <div className="space-y-3 text-sm">
        <div className="flex flex-wrap gap-2">
          <Badge>{result.priority}</Badge>
          <Badge variant="outline">{result.category}</Badge>
        </div>
        <p>{result.suggested_response}</p>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Follow-up tasks</p>
          <ul className="space-y-1 list-disc pl-5">
            {(result.follow_up_tasks ?? []).map((s: string, i: number) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      </div>
    );
  }
  return <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>;
};

export const StaffAIPage = () => (
  <StaffGuard>
    <Hub />
  </StaffGuard>
);
