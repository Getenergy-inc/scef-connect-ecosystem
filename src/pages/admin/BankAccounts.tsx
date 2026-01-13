import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";
import { toast } from "sonner";
import { 
  Building2, Plus, CheckCircle, XCircle, Clock,
  MoreHorizontal, Trash2, Edit, Eye
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BankAccount {
  id: string;
  owner_type: string;
  owner_id: string | null;
  bank_name: string;
  account_number_masked: string;
  account_name: string;
  country: string;
  currency: string;
  verification_status: string;
  is_primary: boolean;
  created_at: string;
}

const BankAccounts = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [newAccount, setNewAccount] = useState({
    owner_type: "scef",
    bank_name: "",
    account_number: "",
    account_name: "",
    routing_number: "",
    country: "",
    currency: "USD",
  });
  
  const { isSuperAdmin, isAdmin, loading: rolesLoading } = useUserRole(user?.id || null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchAccounts();
      }
    });
  }, [navigate]);

  useEffect(() => {
    if (!rolesLoading && !isAdmin && !isSuperAdmin) {
      navigate("/dashboard");
    }
  }, [isAdmin, isSuperAdmin, rolesLoading, navigate]);

  const fetchAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from("bank_accounts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAccounts(data || []);
    } catch (error) {
      console.error("Error fetching accounts:", error);
      toast.error("Failed to load bank accounts");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    if (!newAccount.bank_name || !newAccount.account_number || !newAccount.account_name || !newAccount.country) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      // Mask account number
      const masked = newAccount.account_number.slice(-4).padStart(newAccount.account_number.length, "*");

      const { error } = await supabase.from("bank_accounts").insert({
        owner_type: newAccount.owner_type,
        bank_name: newAccount.bank_name,
        account_number_masked: masked,
        account_name: newAccount.account_name,
        routing_number: newAccount.routing_number || null,
        country: newAccount.country,
        currency: newAccount.currency,
        verification_status: "pending",
      });

      if (error) throw error;

      toast.success("Bank account added successfully");
      setIsDialogOpen(false);
      setNewAccount({
        owner_type: "scef",
        bank_name: "",
        account_number: "",
        account_name: "",
        routing_number: "",
        country: "",
        currency: "USD",
      });
      fetchAccounts();
    } catch (error: any) {
      toast.error(error.message || "Failed to add bank account");
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerify = async (id: string) => {
    try {
      const { error } = await supabase
        .from("bank_accounts")
        .update({ verification_status: "verified" })
        .eq("id", id);

      if (error) throw error;
      toast.success("Bank account verified");
      fetchAccounts();
    } catch (error) {
      toast.error("Failed to verify account");
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await supabase
        .from("bank_accounts")
        .update({ verification_status: "rejected" })
        .eq("id", id);

      if (error) throw error;
      toast.success("Bank account rejected");
      fetchAccounts();
    } catch (error) {
      toast.error("Failed to reject account");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this bank account?")) return;

    try {
      const { error } = await supabase
        .from("bank_accounts")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Bank account deleted");
      fetchAccounts();
    } catch (error) {
      toast.error("Failed to delete account");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" /> Verified</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-700"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-700"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
    }
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
        <title>Bank Accounts | SCEF Finance Admin</title>
      </Helmet>

      <DashboardLayout role="super_admin" title="Bank Accounts">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Bank Accounts</h1>
              <p className="text-muted-foreground">Manage verified bank accounts for disbursements</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Bank Account
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Bank Account</DialogTitle>
                  <DialogDescription>
                    Add a new bank account for receiving disbursements
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <Select 
                      value={newAccount.owner_type} 
                      onValueChange={(v) => setNewAccount({ ...newAccount, owner_type: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scef">SCEF Master Account</SelectItem>
                        <SelectItem value="chapter">Chapter Account</SelectItem>
                        <SelectItem value="program">Program Account</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Bank Name *</Label>
                    <Input
                      placeholder="e.g., First Bank Nigeria"
                      value={newAccount.bank_name}
                      onChange={(e) => setNewAccount({ ...newAccount, bank_name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Name *</Label>
                    <Input
                      placeholder="Account holder name"
                      value={newAccount.account_name}
                      onChange={(e) => setNewAccount({ ...newAccount, account_name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Number *</Label>
                    <Input
                      type="password"
                      placeholder="Enter account number"
                      value={newAccount.account_number}
                      onChange={(e) => setNewAccount({ ...newAccount, account_number: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Routing/Sort Code</Label>
                    <Input
                      placeholder="Optional"
                      value={newAccount.routing_number}
                      onChange={(e) => setNewAccount({ ...newAccount, routing_number: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Country *</Label>
                      <Input
                        placeholder="e.g., Nigeria"
                        value={newAccount.country}
                        onChange={(e) => setNewAccount({ ...newAccount, country: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Currency</Label>
                      <Select 
                        value={newAccount.currency} 
                        onValueChange={(v) => setNewAccount({ ...newAccount, currency: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="NGN">NGN</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateAccount} disabled={submitting}>
                    {submitting ? "Adding..." : "Add Account"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Accounts Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                All Bank Accounts
              </CardTitle>
            </CardHeader>
            <CardContent>
              {accounts.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Building2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="font-medium">No bank accounts configured</p>
                  <p className="text-sm">Add a bank account to enable disbursements</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bank</TableHead>
                      <TableHead>Account</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accounts.map((account) => (
                      <TableRow key={account.id}>
                        <TableCell className="font-medium">{account.bank_name}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-mono text-sm">{account.account_number_masked}</p>
                            <p className="text-xs text-muted-foreground">{account.account_name}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {account.owner_type}
                          </Badge>
                        </TableCell>
                        <TableCell>{account.country}</TableCell>
                        <TableCell>{getStatusBadge(account.verification_status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {account.verification_status === "pending" && (
                                <>
                                  <DropdownMenuItem onClick={() => handleVerify(account.id)}>
                                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                    Verify
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleReject(account.id)}>
                                    <XCircle className="w-4 h-4 mr-2 text-red-500" />
                                    Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                              <DropdownMenuItem onClick={() => handleDelete(account.id)}>
                                <Trash2 className="w-4 h-4 mr-2 text-red-500" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default BankAccounts;