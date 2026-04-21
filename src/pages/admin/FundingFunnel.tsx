import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { useAuthState } from "@/hooks/useAuthState";
import { useUserRole } from "@/hooks/useUserRole";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { logger } from "@/lib/logger";
import {
  Inbox, FolderKanban, ListChecks, FileBarChart2, ArrowRight, Plus, ShieldAlert,
} from "lucide-react";

interface Inquiry {
  id: string;
  organization_name: string;
  contact_name: string;
  contact_email: string;
  organization_type: string | null;
  funding_range: string | null;
  focus_areas: string[] | null;
  status: string;
  notes: string | null;
  created_at: string;
  converted_project_id: string | null;
}

interface Project {
  id: string;
  partner_name: string;
  project_name: string;
  focus_area: string | null;
  region: string | null;
  total_amount: number;
  disbursed_amount: number;
  currency: string;
  status: string;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
}

interface Milestone {
  id: string;
  project_id: string;
  title: string;
  due_date: string | null;
  amount: number | null;
  status: string;
  display_order: number;
}

interface ProjectReport {
  id: string;
  project_id: string;
  report_period: string;
  beneficiaries_reached: number | null;
  funds_disbursed: number | null;
  highlights: string | null;
  created_at: string;
}

const STATUS_BADGE: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  qualified: "bg-amber-100 text-amber-800",
  in_discussion: "bg-purple-100 text-purple-800",
  converted: "bg-green-100 text-green-800",
  declined: "bg-gray-100 text-gray-700",
  planning: "bg-blue-100 text-blue-800",
  active: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-700",
  paused: "bg-amber-100 text-amber-800",
  cancelled: "bg-red-100 text-red-800",
  pending: "bg-gray-100 text-gray-700",
  in_progress: "bg-blue-100 text-blue-800",
  blocked: "bg-red-100 text-red-800",
};

const FundingFunnel = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuthState();
  const { isAdmin, isSuperAdmin, loading: roleLoading } = useUserRole();
  const isAuthorized = isAdmin || isSuperAdmin;

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [reports, setReports] = useState<ProjectReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  // Convert dialog state
  const [convertOpen, setConvertOpen] = useState(false);
  const [convertInquiry, setConvertInquiry] = useState<Inquiry | null>(null);
  const [newProject, setNewProject] = useState({
    project_name: "",
    focus_area: "",
    region: "",
    total_amount: "",
    currency: "USD",
  });

  // Milestone dialog
  const [milestoneOpen, setMilestoneOpen] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    title: "",
    due_date: "",
    amount: "",
  });

  // Report dialog
  const [reportOpen, setReportOpen] = useState(false);
  const [newReport, setNewReport] = useState({
    report_period: "",
    beneficiaries_reached: "",
    funds_disbursed: "",
    highlights: "",
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) navigate("/auth/sign-in");
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (!isAuthorized) return;
    void loadAll();
  }, [isAuthorized]);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [iRes, pRes, mRes, rRes] = await Promise.all([
        supabase.from("csr_inquiries").select("*").order("created_at", { ascending: false }),
        supabase.from("csr_projects").select("*").order("created_at", { ascending: false }),
        supabase.from("csr_milestones").select("*").order("display_order", { ascending: true }),
        supabase.from("csr_project_reports").select("*").order("created_at", { ascending: false }),
      ]);
      if (iRes.error) throw iRes.error;
      if (pRes.error) throw pRes.error;
      if (mRes.error) throw mRes.error;
      if (rRes.error) throw rRes.error;
      setInquiries(iRes.data || []);
      setProjects(pRes.data || []);
      setMilestones(mRes.data || []);
      setReports(rRes.data || []);
    } catch (err) {
      logger.error("Failed to load funnel data", err);
      toast.error("Failed to load funnel data.");
    } finally {
      setLoading(false);
    }
  };

  const updateInquiryStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("csr_inquiries").update({ status }).eq("id", id);
    if (error) {
      toast.error("Failed to update status.");
      return;
    }
    toast.success("Status updated.");
    void loadAll();
  };

  const openConvert = (inq: Inquiry) => {
    setConvertInquiry(inq);
    setNewProject({
      project_name: "",
      focus_area: inq.focus_areas?.[0] || "",
      region: "",
      total_amount: "",
      currency: "USD",
    });
    setConvertOpen(true);
  };

  const handleConvert = async () => {
    if (!convertInquiry || !newProject.project_name) {
      toast.error("Project name is required.");
      return;
    }
    try {
      const { data, error } = await supabase
        .from("csr_projects")
        .insert({
          inquiry_id: convertInquiry.id,
          partner_name: convertInquiry.organization_name,
          project_name: newProject.project_name,
          focus_area: newProject.focus_area || null,
          region: newProject.region || null,
          total_amount: parseFloat(newProject.total_amount) || 0,
          currency: newProject.currency,
          status: "planning",
        })
        .select()
        .single();
      if (error) throw error;
      await supabase
        .from("csr_inquiries")
        .update({ status: "converted", converted_project_id: data.id })
        .eq("id", convertInquiry.id);
      toast.success("Inquiry converted to project.");
      setConvertOpen(false);
      void loadAll();
    } catch (err) {
      logger.error("Convert failed", err);
      toast.error("Failed to convert inquiry.");
    }
  };

  const handleAddMilestone = async () => {
    if (!activeProjectId || !newMilestone.title) {
      toast.error("Title is required.");
      return;
    }
    const order = milestones.filter((m) => m.project_id === activeProjectId).length;
    const { error } = await supabase.from("csr_milestones").insert({
      project_id: activeProjectId,
      title: newMilestone.title,
      due_date: newMilestone.due_date || null,
      amount: parseFloat(newMilestone.amount) || 0,
      display_order: order,
    });
    if (error) {
      toast.error("Failed to add milestone.");
      return;
    }
    toast.success("Milestone added.");
    setNewMilestone({ title: "", due_date: "", amount: "" });
    setMilestoneOpen(false);
    void loadAll();
  };

  const updateMilestoneStatus = async (id: string, status: string) => {
    const update: Record<string, unknown> = { status };
    if (status === "completed") update.completed_at = new Date().toISOString();
    const { error } = await supabase.from("csr_milestones").update(update).eq("id", id);
    if (error) {
      toast.error("Failed to update milestone.");
      return;
    }
    void loadAll();
  };

  const handleAddReport = async () => {
    if (!activeProjectId || !newReport.report_period) {
      toast.error("Report period is required.");
      return;
    }
    const { error } = await supabase.from("csr_project_reports").insert({
      project_id: activeProjectId,
      report_period: newReport.report_period,
      beneficiaries_reached: parseInt(newReport.beneficiaries_reached) || 0,
      funds_disbursed: parseFloat(newReport.funds_disbursed) || 0,
      highlights: newReport.highlights || null,
      published_at: new Date().toISOString(),
    });
    if (error) {
      toast.error("Failed to add report.");
      return;
    }
    toast.success("Report published.");
    setNewReport({ report_period: "", beneficiaries_reached: "", funds_disbursed: "", highlights: "" });
    setReportOpen(false);
    void loadAll();
  };

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading…</div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <DashboardLayout>
        <Card className="max-w-2xl mx-auto mt-12">
          <CardContent className="p-12 text-center">
            <ShieldAlert className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Admin access required</h2>
            <p className="text-muted-foreground">
              The CSR Funding Funnel is restricted to administrators.
            </p>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  const stats = {
    newInquiries: inquiries.filter((i) => i.status === "new").length,
    activeProjects: projects.filter((p) => p.status === "active" || p.status === "planning").length,
    totalRaised: projects.reduce((sum, p) => sum + Number(p.total_amount || 0), 0),
    totalDisbursed: projects.reduce((sum, p) => sum + Number(p.disbursed_amount || 0), 0),
  };

  const fmt = (n: number, c = "USD") =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: c, maximumFractionDigits: 0 }).format(n);

  const projectMilestones = activeProjectId
    ? milestones.filter((m) => m.project_id === activeProjectId)
    : [];
  const projectReports = activeProjectId
    ? reports.filter((r) => r.project_id === activeProjectId)
    : [];

  return (
    <>
      <Helmet>
        <title>CSR Funding Funnel | SCEF Admin</title>
      </Helmet>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold font-heading text-scef-blue-darker">
              CSR Funding Funnel
            </h1>
            <p className="text-muted-foreground mt-1">
              Donor → project → milestones → reports. End-to-end CSR pipeline management.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">New Inquiries</p>
                <p className="text-2xl font-bold text-scef-blue-darker mt-1">{stats.newInquiries}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Active Projects</p>
                <p className="text-2xl font-bold text-scef-blue-darker mt-1">{stats.activeProjects}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Committed</p>
                <p className="text-2xl font-bold text-scef-blue-darker mt-1">{fmt(stats.totalRaised)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Disbursed</p>
                <p className="text-2xl font-bold text-scef-gold mt-1">{fmt(stats.totalDisbursed)}</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="inquiries">
            <TabsList className="grid w-full grid-cols-3 max-w-xl">
              <TabsTrigger value="inquiries">
                <Inbox className="w-4 h-4 mr-2" />
                Inquiries
              </TabsTrigger>
              <TabsTrigger value="projects">
                <FolderKanban className="w-4 h-4 mr-2" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="reports">
                <FileBarChart2 className="w-4 h-4 mr-2" />
                Reports
              </TabsTrigger>
            </TabsList>

            {/* INQUIRIES */}
            <TabsContent value="inquiries">
              <Card>
                <CardHeader>
                  <CardTitle>Funding Inquiries</CardTitle>
                  <CardDescription>
                    Inbound CSR submissions from /csr-funding-intake. Triage, qualify, and convert.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <p className="text-muted-foreground py-8 text-center">Loading…</p>
                  ) : inquiries.length === 0 ? (
                    <p className="text-muted-foreground py-8 text-center">No inquiries yet.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Organization</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Range</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {inquiries.map((inq) => (
                            <TableRow key={inq.id}>
                              <TableCell>
                                <div className="font-semibold">{inq.organization_name}</div>
                                <div className="text-xs text-muted-foreground capitalize">
                                  {inq.organization_type || "—"}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm">{inq.contact_name}</div>
                                <div className="text-xs text-muted-foreground">{inq.contact_email}</div>
                              </TableCell>
                              <TableCell className="text-sm">{inq.funding_range || "—"}</TableCell>
                              <TableCell>
                                <Select
                                  value={inq.status}
                                  onValueChange={(v) => updateInquiryStatus(inq.id, v)}
                                >
                                  <SelectTrigger className="w-36 h-8">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="new">New</SelectItem>
                                    <SelectItem value="qualified">Qualified</SelectItem>
                                    <SelectItem value="in_discussion">In discussion</SelectItem>
                                    <SelectItem value="converted">Converted</SelectItem>
                                    <SelectItem value="declined">Declined</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell className="text-xs text-muted-foreground">
                                {new Date(inq.created_at).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="text-right">
                                {inq.converted_project_id ? (
                                  <Badge className={STATUS_BADGE.converted}>Converted</Badge>
                                ) : (
                                  <Button size="sm" variant="outline" onClick={() => openConvert(inq)}>
                                    Convert
                                    <ArrowRight className="w-3 h-3 ml-1" />
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* PROJECTS */}
            <TabsContent value="projects">
              <div className="grid lg:grid-cols-3 gap-4">
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle>Projects</CardTitle>
                    <CardDescription>{projects.length} total</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {projects.length === 0 && (
                      <p className="text-sm text-muted-foreground">No projects yet.</p>
                    )}
                    {projects.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setActiveProjectId(p.id)}
                        className={`w-full text-left p-3 rounded-lg border transition ${
                          activeProjectId === p.id
                            ? "border-scef-gold bg-scef-gold/5"
                            : "border-border hover:bg-muted/50"
                        }`}
                      >
                        <div className="font-semibold text-sm">{p.project_name}</div>
                        <div className="text-xs text-muted-foreground">{p.partner_name}</div>
                        <div className="flex items-center justify-between mt-2">
                          <Badge className={STATUS_BADGE[p.status] || ""} variant="secondary">
                            {p.status}
                          </Badge>
                          <span className="text-xs font-mono">{fmt(Number(p.total_amount), p.currency)}</span>
                        </div>
                      </button>
                    ))}
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>
                        {activeProjectId
                          ? projects.find((p) => p.id === activeProjectId)?.project_name
                          : "Select a project"}
                      </CardTitle>
                      <CardDescription>Milestones and delivery tracking</CardDescription>
                    </div>
                    {activeProjectId && (
                      <Dialog open={milestoneOpen} onOpenChange={setMilestoneOpen}>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Plus className="w-4 h-4 mr-1" /> Milestone
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Milestone</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-3">
                            <div>
                              <Label>Title</Label>
                              <Input
                                value={newMilestone.title}
                                onChange={(e) =>
                                  setNewMilestone({ ...newMilestone, title: e.target.value })
                                }
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label>Due date</Label>
                                <Input
                                  type="date"
                                  value={newMilestone.due_date}
                                  onChange={(e) =>
                                    setNewMilestone({ ...newMilestone, due_date: e.target.value })
                                  }
                                />
                              </div>
                              <div>
                                <Label>Amount</Label>
                                <Input
                                  type="number"
                                  value={newMilestone.amount}
                                  onChange={(e) =>
                                    setNewMilestone({ ...newMilestone, amount: e.target.value })
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={handleAddMilestone}>Add</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </CardHeader>
                  <CardContent>
                    {!activeProjectId ? (
                      <p className="text-sm text-muted-foreground py-8 text-center">
                        Select a project on the left to view its milestones.
                      </p>
                    ) : projectMilestones.length === 0 ? (
                      <p className="text-sm text-muted-foreground py-8 text-center">
                        No milestones yet.
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {projectMilestones.map((m) => (
                          <li
                            key={m.id}
                            className="flex items-center justify-between p-3 rounded border"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <ListChecks className="w-4 h-4 text-scef-gold shrink-0" />
                              <div className="min-w-0">
                                <div className="font-medium text-sm truncate">{m.title}</div>
                                <div className="text-xs text-muted-foreground">
                                  {m.due_date ? `Due ${new Date(m.due_date).toLocaleDateString()}` : "No due date"}
                                  {m.amount ? ` • ${fmt(Number(m.amount))}` : ""}
                                </div>
                              </div>
                            </div>
                            <Select
                              value={m.status}
                              onValueChange={(v) => updateMilestoneStatus(m.id, v)}
                            >
                              <SelectTrigger className="w-32 h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in_progress">In progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="blocked">Blocked</SelectItem>
                              </SelectContent>
                            </Select>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* REPORTS */}
            <TabsContent value="reports">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Project Reports</CardTitle>
                    <CardDescription>
                      Quarterly KPI summaries published to partners.
                    </CardDescription>
                  </div>
                  {activeProjectId && (
                    <Dialog open={reportOpen} onOpenChange={setReportOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="w-4 h-4 mr-1" /> Report
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Project Report</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3">
                          <div>
                            <Label>Period (e.g. "Q1 2026")</Label>
                            <Input
                              value={newReport.report_period}
                              onChange={(e) =>
                                setNewReport({ ...newReport, report_period: e.target.value })
                              }
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label>Beneficiaries reached</Label>
                              <Input
                                type="number"
                                value={newReport.beneficiaries_reached}
                                onChange={(e) =>
                                  setNewReport({ ...newReport, beneficiaries_reached: e.target.value })
                                }
                              />
                            </div>
                            <div>
                              <Label>Funds disbursed</Label>
                              <Input
                                type="number"
                                value={newReport.funds_disbursed}
                                onChange={(e) =>
                                  setNewReport({ ...newReport, funds_disbursed: e.target.value })
                                }
                              />
                            </div>
                          </div>
                          <div>
                            <Label>Highlights</Label>
                            <Textarea
                              rows={4}
                              value={newReport.highlights}
                              onChange={(e) =>
                                setNewReport({ ...newReport, highlights: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={handleAddReport}>Publish</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </CardHeader>
                <CardContent>
                  {!activeProjectId ? (
                    <p className="text-sm text-muted-foreground py-8 text-center">
                      Select a project under the Projects tab to view or add reports.
                    </p>
                  ) : projectReports.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-8 text-center">
                      No reports for this project yet.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {projectReports.map((r) => (
                        <div key={r.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-bold text-scef-blue-darker">{r.report_period}</div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(r.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                            <div>
                              <span className="text-muted-foreground">Beneficiaries:</span>{" "}
                              <strong>{r.beneficiaries_reached?.toLocaleString() || 0}</strong>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Disbursed:</span>{" "}
                              <strong>{fmt(Number(r.funds_disbursed || 0))}</strong>
                            </div>
                          </div>
                          {r.highlights && (
                            <p className="text-sm text-muted-foreground border-t pt-2">{r.highlights}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Convert Inquiry Dialog */}
        <Dialog open={convertOpen} onOpenChange={setConvertOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Convert inquiry to project</DialogTitle>
            </DialogHeader>
            {convertInquiry && (
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded text-sm">
                  <div className="font-semibold">{convertInquiry.organization_name}</div>
                  <div className="text-muted-foreground">{convertInquiry.contact_email}</div>
                </div>
                <div>
                  <Label>Project name *</Label>
                  <Input
                    value={newProject.project_name}
                    onChange={(e) => setNewProject({ ...newProject, project_name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Focus area</Label>
                    <Input
                      value={newProject.focus_area}
                      onChange={(e) => setNewProject({ ...newProject, focus_area: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Region</Label>
                    <Input
                      value={newProject.region}
                      onChange={(e) => setNewProject({ ...newProject, region: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Total amount</Label>
                    <Input
                      type="number"
                      value={newProject.total_amount}
                      onChange={(e) =>
                        setNewProject({ ...newProject, total_amount: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Currency</Label>
                    <Input
                      value={newProject.currency}
                      onChange={(e) => setNewProject({ ...newProject, currency: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setConvertOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleConvert}>Create project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </>
  );
};

export default FundingFunnel;
