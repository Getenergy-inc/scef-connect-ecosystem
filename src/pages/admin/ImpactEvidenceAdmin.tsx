import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  useAllImpactMetrics,
  useClaimsRegister,
  type ImpactMetricRow,
} from "@/hooks/useImpactMetrics";
import {
  EVIDENCE_STATUS_LABEL,
  METRIC_TYPE_LABEL,
  type EvidenceStatus,
  type MetricType,
} from "@/data/impactEvidence";

const WORKFLOW_STATES = [
  "DRAFT",
  "EVIDENCE_UPLOADED",
  "UNDER_REVIEW",
  "VERIFIED",
  "APPROVED_FOR_PUBLICATION",
  "PUBLISHED",
  "WITHDRAWN",
] as const;

const emptyForm = {
  programme: "",
  metric_name: "",
  metric_value: "",
  unit: "",
  reporting_period: "",
  geographic_scope: "",
  metric_type: "ACHIEVED" as MetricType,
  evidence_status: "UNVERIFIED" as EvidenceStatus,
  workflow_state: "DRAFT" as (typeof WORKFLOW_STATES)[number],
  evidence_source: "",
  evidence_document: "",
  source_url: "",
  verification_date: "",
  methodology: "",
  display_key: "",
  notes: "",
  public_display: false,
};

const riskVariant = (risk: string) =>
  risk === "CRITICAL" || risk === "HIGH" ? "destructive" : "secondary";

const ImpactEvidenceAdmin = () => {
  const queryClient = useQueryClient();
  const { data: metrics = [], isLoading } = useAllImpactMetrics();
  const { data: register = [] } = useClaimsRegister();
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof typeof emptyForm>(
    key: K,
    value: (typeof emptyForm)[K],
  ) => setForm((f) => ({ ...f, [key]: value }));

  const publishable = (m: Pick<ImpactMetricRow, "metric_type" | "evidence_status">) =>
    m.metric_type !== "ACHIEVED" ||
    m.evidence_status === "VERIFIED" ||
    m.evidence_status === "EXTERNAL_VERIFIED";

  const handleCreate = async () => {
    if (!form.programme.trim() || !form.metric_name.trim()) {
      toast({ title: "Programme and metric name are required", variant: "destructive" });
      return;
    }
    if (form.public_display && form.workflow_state !== "PUBLISHED") {
      toast({
        title: "Not publishable yet",
        description: "A figure is only visible publicly once its state is PUBLISHED.",
      });
    }
    if (
      form.workflow_state === "PUBLISHED" &&
      form.metric_type === "ACHIEVED" &&
      !publishable(form)
    ) {
      toast({
        title: "Evidence required",
        description:
          "An achieved result can only be published when its evidence status is Verified or Verified — external source.",
        variant: "destructive",
      });
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("impact_metrics").insert({
      ...form,
      metric_value: form.metric_value || null,
      unit: form.unit || null,
      reporting_period: form.reporting_period || null,
      geographic_scope: form.geographic_scope || null,
      evidence_source: form.evidence_source || null,
      evidence_document: form.evidence_document || null,
      source_url: form.source_url || null,
      verification_date: form.verification_date || null,
      methodology: form.methodology || null,
      display_key: form.display_key || null,
      notes: form.notes || null,
    });
    setSaving(false);
    if (error) {
      toast({ title: "Could not save", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Metric saved as a draft record" });
    setForm({ ...emptyForm });
    queryClient.invalidateQueries({ queryKey: ["impact-metrics"] });
  };

  const advance = async (
    row: ImpactMetricRow,
    state: (typeof WORKFLOW_STATES)[number],
  ) => {
    if (state === "PUBLISHED" && row.metric_type === "ACHIEVED" && !publishable(row)) {
      toast({
        title: "Evidence required",
        description:
          "Verify the evidence before publishing this figure as an achieved result.",
        variant: "destructive",
      });
      return;
    }
    const { error } = await supabase
      .from("impact_metrics")
      .update({
        workflow_state: state,
        public_display: state === "PUBLISHED" ? row.public_display : false,
      })
      .eq("id", row.id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["impact-metrics"] });
  };

  const toggleVisibility = async (row: ImpactMetricRow, next: boolean) => {
    if (next && (row.workflow_state !== "PUBLISHED" || !publishable(row))) {
      toast({
        title: "Not eligible for public display",
        description:
          "Only published, evidence-verified records may be shown on the public website.",
        variant: "destructive",
      });
      return;
    }
    const { error } = await supabase
      .from("impact_metrics")
      .update({ public_display: next })
      .eq("id", row.id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["impact-metrics"] });
  };

  return (
    <AdminPageShell
      title="Impact Evidence Control"
      description="Central register of impact figures and the internal claims & evidence register. Figures are never published automatically — each record moves through draft, evidence, review, verification and approval before it can appear publicly."
    >
      <Tabs defaultValue="metrics">
        <TabsList>
          <TabsTrigger value="metrics">Impact metrics</TabsTrigger>
          <TabsTrigger value="new">Add metric</TabsTrigger>
          <TabsTrigger value="register">Claims &amp; evidence register</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                All recorded metrics ({metrics.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              {isLoading ? (
                <p className="text-sm text-muted-foreground">Loading…</p>
              ) : metrics.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No metrics recorded yet. Use “Add metric” to register a figure and
                  its supporting evidence.
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Programme</TableHead>
                      <TableHead>Metric</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Evidence</TableHead>
                      <TableHead>Workflow</TableHead>
                      <TableHead>Public</TableHead>
                      <TableHead />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {metrics.map((m) => (
                      <TableRow key={m.id}>
                        <TableCell className="font-medium">{m.programme}</TableCell>
                        <TableCell>
                          {m.metric_name}
                          {m.reporting_period && (
                            <div className="text-xs text-muted-foreground">
                              {m.reporting_period}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{m.metric_value ?? "—"}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {METRIC_TYPE_LABEL[m.metric_type]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              m.evidence_status === "VERIFIED" ||
                              m.evidence_status === "EXTERNAL_VERIFIED"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {EVIDENCE_STATUS_LABEL[m.evidence_status]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={m.workflow_state}
                            onValueChange={(v) =>
                              advance(m, v as (typeof WORKFLOW_STATES)[number])
                            }
                          >
                            <SelectTrigger className="w-[210px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {WORKFLOW_STATES.map((s) => (
                                <SelectItem key={s} value={s}>
                                  {s.split("_").join(" ")}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={m.public_display}
                            onCheckedChange={(v) => toggleVisibility(m, v)}
                          />
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {m.source_url ? (
                            <a
                              href={m.source_url}
                              target="_blank"
                              rel="noreferrer"
                              className="underline"
                            >
                              Source
                            </a>
                          ) : (
                            "No source"
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Register a new figure</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Programme</Label>
                <Input
                  value={form.programme}
                  onChange={(e) => set("programme", e.target.value)}
                  placeholder="Women & Girls Education"
                />
              </div>
              <div>
                <Label>Metric name</Label>
                <Input
                  value={form.metric_name}
                  onChange={(e) => set("metric_name", e.target.value)}
                  placeholder="Girls supported"
                />
              </div>
              <div>
                <Label>Value</Label>
                <Input
                  value={form.metric_value}
                  onChange={(e) => set("metric_value", e.target.value)}
                  placeholder="Leave blank until evidence exists"
                />
              </div>
              <div>
                <Label>Unit</Label>
                <Input value={form.unit} onChange={(e) => set("unit", e.target.value)} />
              </div>
              <div>
                <Label>Reporting period</Label>
                <Input
                  value={form.reporting_period}
                  onChange={(e) => set("reporting_period", e.target.value)}
                  placeholder="Jan–Dec 2025"
                />
              </div>
              <div>
                <Label>Geographic scope</Label>
                <Input
                  value={form.geographic_scope}
                  onChange={(e) => set("geographic_scope", e.target.value)}
                  placeholder="Nigeria / West Africa"
                />
              </div>
              <div>
                <Label>Classification</Label>
                <Select
                  value={form.metric_type}
                  onValueChange={(v) => set("metric_type", v as MetricType)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(METRIC_TYPE_LABEL) as MetricType[]).map((k) => (
                      <SelectItem key={k} value={k}>
                        {METRIC_TYPE_LABEL[k]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Evidence status</Label>
                <Select
                  value={form.evidence_status}
                  onValueChange={(v) => set("evidence_status", v as EvidenceStatus)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(EVIDENCE_STATUS_LABEL) as EvidenceStatus[]).map((k) => (
                      <SelectItem key={k} value={k}>
                        {EVIDENCE_STATUS_LABEL[k]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Evidence source</Label>
                <Input
                  value={form.evidence_source}
                  onChange={(e) => set("evidence_source", e.target.value)}
                  placeholder="Audited 2025 financial statements"
                />
              </div>
              <div>
                <Label>Evidence document / file reference</Label>
                <Input
                  value={form.evidence_document}
                  onChange={(e) => set("evidence_document", e.target.value)}
                />
              </div>
              <div>
                <Label>Source URL</Label>
                <Input
                  value={form.source_url}
                  onChange={(e) => set("source_url", e.target.value)}
                />
              </div>
              <div>
                <Label>Verification date</Label>
                <Input
                  type="date"
                  value={form.verification_date}
                  onChange={(e) => set("verification_date", e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <Label>Methodology</Label>
                <Textarea
                  value={form.methodology}
                  onChange={(e) => set("methodology", e.target.value)}
                  rows={3}
                />
              </div>
              <div className="md:col-span-2">
                <Label>Internal notes</Label>
                <Textarea
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  rows={2}
                />
              </div>
              <div className="md:col-span-2 flex items-center gap-3 rounded-lg border border-border p-4">
                <Switch
                  checked={form.public_display}
                  onCheckedChange={(v) => set("public_display", v)}
                />
                <div className="text-sm">
                  <div className="font-medium">Request public display</div>
                  <div className="text-muted-foreground">
                    The figure appears publicly only once the record reaches the
                    published state with verified evidence.
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <Button onClick={handleCreate} disabled={saving}>
                  {saving ? "Saving…" : "Save as draft"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="register" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Internal audit summary (admin only)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                Site-wide claims scan covering home, about, impact, programme,
                division, partnership, membership and chapter pages plus reusable
                components and translation files.
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  Claims reviewed and registered: {register.length}; critical (financial
                  or institutional) risk items:{" "}
                  {register.filter((r) => r.risk_level === "CRITICAL").length}; high
                  risk: {register.filter((r) => r.risk_level === "HIGH").length}.
                </li>
                <li>
                  Figures withdrawn from public display pending evidence: Women &amp;
                  Girls beneficiary, completion-rate and annual investment figures;
                  digital learning platform usage; eLibrary users, resources and state
                  coverage; partnership totals and programmes-funded amount; EduAid
                  beneficiary and chapter membership counts; home impact counters.
                </li>
                <li>
                  Unsupported superlatives reworded on Santos Media, OMBDD, TDSD, Join
                  and the featured platforms component.
                </li>
                <li>
                  Documents required from management: audited financial statements,
                  annual report, programme M&amp;E records, partnership and endorsement
                  agreements, chapter membership registry, platform analytics exports.
                </li>
                <li>
                  Recommended next steps: register verified figures here with reporting
                  periods and sources, then publish them so public pages read from this
                  record instead of hard-coded values; confirm each endorsement listing
                  against a signed document.
                </li>
              </ul>
              <p className="pt-2">
                This summary is internal and is not exposed on any public page.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Internal claims &amp; evidence register ({register.length})
              </CardTitle>
            </CardHeader>

            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ref</TableHead>
                    <TableHead>Page</TableHead>
                    <TableHead>Claim</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Approved wording</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {register.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="whitespace-nowrap font-mono text-xs">
                        {r.claim_ref}
                      </TableCell>
                      <TableCell className="text-xs">{r.page_path}</TableCell>
                      <TableCell className="max-w-[420px] text-xs">
                        {r.exact_claim}
                        {r.recommended_correction && (
                          <div className="mt-1 text-muted-foreground">
                            Action: {r.recommended_correction}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={riskVariant(r.risk_level)}>{r.risk_level}</Badge>
                      </TableCell>
                      <TableCell className="text-xs">{r.verification_status}</TableCell>
                      <TableCell className="text-xs">
                        {r.approved_public_wording ?? "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminPageShell>
  );
};

export default ImpactEvidenceAdmin;
