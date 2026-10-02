import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

const PROJECT_STATUSES = ["IDEA","CONCEPT","DESIGN","FUNDING_READY","FUNDRAISING","PARTIALLY_FUNDED","FUNDED","PRE_IMPLEMENTATION","ACTIVE","PAUSED","COMPLETED","CLOSED","ARCHIVED"];
const OPP_STATUSES = ["UNVERIFIED","VERIFIED_ACTIVE","VERIFIED_UPCOMING","VERIFIED_CLOSED","CONFLICT_REQUIRES_RESOLUTION","SUSPICIOUS","DUPLICATE"];
const APP_STAGES = ["DISCOVERY","VERIFICATION","ELIGIBILITY","PROJECT_MATCHING","MANAGEMENT_REVIEW","GO_NO_GO","PROPOSAL","BUDGET","DOCUMENTATION","INTERNAL_REVIEW","APPROVAL","SUBMISSION_READY","SUBMITTED","ACKNOWLEDGED","DUE_DILIGENCE","SHORTLISTED","AWARDED","UNSUCCESSFUL","CLOSED"];
const PARTNER_STAGES = ["PROSPECT","RESEARCHED","CONTACT_PLANNED","CONTACTED","RESPONDED","MEETING","DUE_DILIGENCE","PROPOSAL","NEGOTIATION","MOU_REVIEW","FORMAL_PARTNER","INACTIVE","DECLINED"];

function useRows(table: string, order = "created_at") {
  return useQuery({
    queryKey: ["cc", table],
    queryFn: async () => {
      const { data, error } = await db.from(table).select("*").order(order, { ascending: false });
      if (error) throw error;
      return data as Record<string, any>[];
    },
  });
}

function deadlineBand(deadline?: string | null) {
  if (!deadline) return { label: "No deadline", days: null as number | null };
  const days = Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000);
  if (days < 0) return { label: "Expired", days };
  if (days <= 3) return { label: "CRITICAL", days };
  if (days <= 7) return { label: "URGENT", days };
  if (days <= 14) return { label: "PRIORITY", days };
  if (days <= 30) return { label: "PREPARATION", days };
  return { label: "PIPELINE", days };
}

function StageSelect({ value, options, onChange }: { value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <select
      aria-label="Change stage"
      className="border border-input bg-background rounded-md px-2 py-1 text-xs"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((o) => <option key={o} value={o}>{o.replace(/_/g, " ")}</option>)}
    </select>
  );
}

function QuickAdd({ fields, onSubmit }: { fields: { name: string; label: string; type?: string }[]; onSubmit: (v: Record<string, string>) => Promise<void> }) {
  const [v, setV] = useState<Record<string, string>>({});
  return (
    <form
      className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 items-end"
      onSubmit={async (e) => { e.preventDefault(); await onSubmit(v); setV({}); }}
    >
      {fields.map((f) => (
        <label key={f.name} className="text-xs text-muted-foreground space-y-1">
          <span>{f.label}</span>
          <Input type={f.type ?? "text"} value={v[f.name] ?? ""} onChange={(e) => setV({ ...v, [f.name]: e.target.value })} />
        </label>
      ))}
      <Button type="submit">Add record</Button>
    </form>
  );
}

export default function CommandCentre() {
  const qc = useQueryClient();
  const projects = useRows("projects");
  const opps = useRows("funding_opportunities");
  const apps = useRows("funding_applications");
  const partners = useRows("partners");

  const run = async (table: string, p: Promise<{ error: any }>, msg: string) => {
    const { error } = await p;
    if (error) { toast.error(error.message); return; }
    toast.success(msg);
    qc.invalidateQueries({ queryKey: ["cc", table] });
  };
  const update = (table: string, id: string, patch: Record<string, unknown>) =>
    run(table, db.from(table).update(patch).eq("id", id), "Updated");

  const p = projects.data ?? [];
  const o = opps.data ?? [];
  const a = apps.data ?? [];
  const pt = partners.data ?? [];
  const gap = p.reduce((s, r) => s + Number(r.funding_gap ?? 0), 0);
  const secured = p.reduce((s, r) => s + Number(r.funding_secured ?? 0), 0);
  const dueWeek = o.filter((r) => { const d = deadlineBand(r.deadline).days; return d !== null && d >= 0 && d <= 7; }).length;

  const approve = async (appId: string) => {
    const { data: u } = await supabase.auth.getUser();
    await run("funding_applications", db.from("application_approvals").insert({
      application_id: appId, approval_step: "EXECUTIVE", decision: "APPROVED", approver_name: u.user?.email,
    }), "Executive approval recorded");
  };

  return (
    <AdminPageShell title="Command Centre" description="Project bank, funding pipeline and partnership records. Internal only.">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          ["Projects", p.length],
          ["Funding secured (USD)", secured.toLocaleString()],
          ["Funding gap (USD)", gap.toLocaleString()],
          ["Deadlines in 7 days", dueWeek],
          ["Formal verified partners", pt.filter((r) => r.stage === "FORMAL_PARTNER" && r.verification === "VERIFIED").length],
        ].map(([l, v]) => (
          <Card key={l as string}><CardContent className="p-4">
            <p className="text-2xl font-bold text-scef-blue-darker">{v}</p>
            <p className="text-xs text-muted-foreground">{l}</p>
          </CardContent></Card>
        ))}
      </div>

      <Tabs defaultValue="projects">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="projects">Project Bank</TabsTrigger>
          <TabsTrigger value="opps">Funding Opportunities</TabsTrigger>
          <TabsTrigger value="apps">Applications</TabsTrigger>
          <TabsTrigger value="partners">Partnership CRM</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <Card><CardHeader><CardTitle className="text-base">Add project</CardTitle></CardHeader><CardContent>
            <QuickAdd
              fields={[{ name: "project_code", label: "Project code" }, { name: "title", label: "Title" }, { name: "country", label: "Country" }, { name: "total_budget", label: "Total budget (USD)", type: "number" }]}
              onSubmit={(v) => run("projects", db.from("projects").insert({ ...v, total_budget: Number(v.total_budget || 0) }), "Project added")}
            />
          </CardContent></Card>
          <Table>
            <TableHeader><TableRow><TableHead>Code</TableHead><TableHead>Title</TableHead><TableHead>Status</TableHead><TableHead>Funding status</TableHead><TableHead className="text-right">Budget</TableHead><TableHead className="text-right">Gap</TableHead></TableRow></TableHeader>
            <TableBody>
              {p.length === 0 && <TableRow><TableCell colSpan={6} className="text-muted-foreground">No projects recorded yet.</TableCell></TableRow>}
              {p.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-xs">{r.project_code}</TableCell>
                  <TableCell>{r.title}</TableCell>
                  <TableCell><StageSelect value={r.project_status} options={PROJECT_STATUSES} onChange={(v) => update("projects", r.id, { project_status: v })} /></TableCell>
                  <TableCell><Badge variant="outline">{String(r.funding_status).replace(/_/g, " ")}</Badge></TableCell>
                  <TableCell className="text-right">{Number(r.total_budget ?? 0).toLocaleString()}</TableCell>
                  <TableCell className="text-right">{Number(r.funding_gap ?? 0).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="opps" className="space-y-4">
          <Card><CardHeader><CardTitle className="text-base">Add opportunity (enters as Unverified)</CardTitle></CardHeader><CardContent>
            <QuickAdd
              fields={[{ name: "call_title", label: "Call title" }, { name: "reference_number", label: "Reference" }, { name: "official_url", label: "Official URL" }, { name: "deadline", label: "Deadline", type: "date" }]}
              onSubmit={(v) => run("funding_opportunities", db.from("funding_opportunities").insert({ ...v, deadline: v.deadline || null }), "Opportunity added")}
            />
          </CardContent></Card>
          <Table>
            <TableHeader><TableRow><TableHead>Call</TableHead><TableHead>Deadline</TableHead><TableHead>Urgency</TableHead><TableHead>Verification</TableHead><TableHead>Decision</TableHead></TableRow></TableHeader>
            <TableBody>
              {o.length === 0 && <TableRow><TableCell colSpan={5} className="text-muted-foreground">No opportunities recorded yet.</TableCell></TableRow>}
              {o.map((r) => { const b = deadlineBand(r.deadline); return (
                <TableRow key={r.id}>
                  <TableCell>{r.official_url ? <a className="underline" href={r.official_url} target="_blank" rel="noreferrer">{r.call_title}</a> : r.call_title}</TableCell>
                  <TableCell>{r.deadline ? new Date(r.deadline).toLocaleDateString() : "—"}</TableCell>
                  <TableCell><Badge variant={b.label === "CRITICAL" || b.label === "URGENT" ? "destructive" : "secondary"}>{b.label}{b.days !== null && b.days >= 0 ? ` · ${b.days}d` : ""}</Badge></TableCell>
                  <TableCell><StageSelect value={r.verification_status} options={OPP_STATUSES} onChange={(v) => update("funding_opportunities", r.id, { verification_status: v, last_verified: new Date().toISOString().slice(0, 10) })} /></TableCell>
                  <TableCell><StageSelect value={r.management_decision ?? ""} options={["", "GO", "HOLD", "NO_GO", "MORE_INFO"]} onChange={(v) => update("funding_opportunities", r.id, { management_decision: v || null })} /></TableCell>
                </TableRow>
              ); })}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="apps" className="space-y-4">
          <Card><CardHeader><CardTitle className="text-base">Add application</CardTitle></CardHeader><CardContent>
            <QuickAdd
              fields={[{ name: "title", label: "Title" }, { name: "owner", label: "Owner" }, { name: "amount_requested", label: "Amount (USD)", type: "number" }]}
              onSubmit={(v) => run("funding_applications", db.from("funding_applications").insert({ ...v, amount_requested: Number(v.amount_requested || 0) }), "Application added")}
            />
            <p className="text-xs text-muted-foreground mt-3">Submission Ready needs executive approval from someone other than the drafter. Submitted needs submission evidence. Both are enforced by the database.</p>
          </CardContent></Card>
          <Table>
            <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Owner</TableHead><TableHead>Stage</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {a.length === 0 && <TableRow><TableCell colSpan={4} className="text-muted-foreground">No applications recorded yet.</TableCell></TableRow>}
              {a.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.title}</TableCell>
                  <TableCell>{r.owner ?? "—"}</TableCell>
                  <TableCell><StageSelect value={r.stage} options={APP_STAGES} onChange={(v) => {
                    if (v === "SUBMITTED") {
                      const ev = window.prompt("Submission evidence (portal receipt reference or URL)");
                      if (!ev) return;
                      update("funding_applications", r.id, { stage: v, submission_evidence: ev });
                    } else update("funding_applications", r.id, { stage: v });
                  }} /></TableCell>
                  <TableCell><Button size="sm" variant="outline" onClick={() => approve(r.id)}>Record executive approval</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="partners" className="space-y-4">
          <Card><CardHeader><CardTitle className="text-base">Add organisation (enters as Prospect)</CardTitle></CardHeader><CardContent>
            <QuickAdd
              fields={[{ name: "organisation", label: "Organisation" }, { name: "partner_type", label: "Type" }, { name: "country", label: "Country" }, { name: "relationship_owner", label: "Relationship owner" }]}
              onSubmit={(v) => run("partners", db.from("partners").insert(v), "Organisation added")}
            />
            <p className="text-xs text-muted-foreground mt-3">An organisation appears publicly only when it is a Formal Partner, Verified, and has logo/name permission.</p>
          </CardContent></Card>
          <Table>
            <TableHeader><TableRow><TableHead>Organisation</TableHead><TableHead>Stage</TableHead><TableHead>Verification</TableHead><TableHead>Public permission</TableHead></TableRow></TableHeader>
            <TableBody>
              {pt.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.organisation}</TableCell>
                  <TableCell><StageSelect value={r.stage} options={PARTNER_STAGES} onChange={(v) => update("partners", r.id, { stage: v })} /></TableCell>
                  <TableCell><StageSelect value={r.verification} options={["UNVERIFIED", "VERIFIED"]} onChange={(v) => update("partners", r.id, { verification: v })} /></TableCell>
                  <TableCell><StageSelect value={r.public_display_permission ? "YES" : "NO"} options={["NO", "YES"]} onChange={(v) => update("partners", r.id, { public_display_permission: v === "YES" })} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </AdminPageShell>
  );
}
