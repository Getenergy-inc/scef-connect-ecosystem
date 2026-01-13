import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";
import { toast } from "sonner";
import { 
  Send, CheckCircle, XCircle, Clock, AlertTriangle,
  Eye, RefreshCw
} from "lucide-react";

interface DisbursementRequest {
  id: string;
  requested_by: string;
  wallet_id: string;
  bank_account_id: string;
  amount: number;
  currency: string;
  status: string;
  approved_by: string | null;
  approved_at: string | null;
  notes: string | null;
  rejection_reason: string | null;
  created_at: string;
}

const Disbursements = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<DisbursementRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<DisbursementRequest | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [processing, setProcessing] = useState(false);
  
  const { isSuperAdmin, isAdmin, loading: rolesLoading } = useUserRole(user?.id || null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchRequests();
      }
    });
  }, [navigate]);

  useEffect(() => {
    if (!rolesLoading && !isAdmin && !isSuperAdmin) {
      navigate("/dashboard");
    }
  }, [isAdmin, isSuperAdmin, rolesLoading, navigate]);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("disbursement_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to load disbursement requests");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (request: DisbursementRequest) => {
    setProcessing(true);
    try {
      const { error } = await supabase
        .from("disbursement_requests")
        .update({
          status: "approved",
          approved_by: user.id,
          approved_at: new Date().toISOString(),
        })
        .eq("id", request.id);

      if (error) throw error;

      // Log the action
      await supabase.rpc("log_audit", {
        p_action_type: "disbursement_approved",
        p_entity_type: "disbursement_request",
        p_entity_id: request.id,
        p_user_id: user.id,
        p_new_values: { status: "approved" },
      });

      toast.success("Disbursement approved");
      setIsDialogOpen(false);
      fetchRequests();
    } catch (error) {
      toast.error("Failed to approve disbursement");
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!selectedRequest || !rejectionReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }

    setProcessing(true);
    try {
      const { error } = await supabase
        .from("disbursement_requests")
        .update({
          status: "rejected",
          rejection_reason: rejectionReason,
          approved_by: user.id,
          approved_at: new Date().toISOString(),
        })
        .eq("id", selectedRequest.id);

      if (error) throw error;

      // Log the action
      await supabase.rpc("log_audit", {
        p_action_type: "disbursement_rejected",
        p_entity_type: "disbursement_request",
        p_entity_id: selectedRequest.id,
        p_user_id: user.id,
        p_new_values: { status: "rejected", rejection_reason: rejectionReason },
      });

      toast.success("Disbursement rejected");
      setIsDialogOpen(false);
      setRejectionReason("");
      setSelectedRequest(null);
      fetchRequests();
    } catch (error) {
      toast.error("Failed to reject disbursement");
    } finally {
      setProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" /> Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-700"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
      case "processing":
        return <Badge className="bg-blue-100 text-blue-700"><RefreshCw className="w-3 h-3 mr-1" /> Processing</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" /> Completed</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-700"><AlertTriangle className="w-3 h-3 mr-1" /> Failed</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-700"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  if (loading || rolesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Disbursements | SCEF Finance Admin</title>
      </Helmet>

      <DashboardLayout role="super_admin" title="Disbursements">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Disbursement Requests</h1>
              <p className="text-muted-foreground">Review and approve fund disbursement requests</p>
            </div>
            <Button variant="outline" onClick={fetchRequests}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Pending Requests Alert */}
          {requests.filter(r => r.status === "pending").length > 0 && (
            <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                {requests.filter(r => r.status === "pending").length} disbursement request(s) awaiting your approval
              </p>
            </div>
          )}

          {/* Requests Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                All Disbursement Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              {requests.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Send className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="font-medium">No disbursement requests</p>
                  <p className="text-sm">Requests will appear here when submitted</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          {new Date(request.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell className="font-semibold">
                          {formatCurrency(request.amount, request.currency)}
                        </TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          {request.notes || "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          {request.status === "pending" && (
                            <div className="flex justify-end gap-2">
                              <Button 
                                size="sm" 
                                onClick={() => handleApprove(request)}
                                disabled={processing}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => {
                                  setSelectedRequest(request);
                                  setIsDialogOpen(true);
                                }}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          )}
                          {request.status !== "pending" && (
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Rejection Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Disbursement Request</DialogTitle>
              <DialogDescription>
                Please provide a reason for rejecting this disbursement request.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Textarea
                placeholder="Enter rejection reason..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleReject}
                disabled={processing || !rejectionReason.trim()}
              >
                {processing ? "Rejecting..." : "Reject Request"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </>
  );
};

export default Disbursements;