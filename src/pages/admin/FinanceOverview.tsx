import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";
import { 
  Wallet, Building2, ArrowUpRight, ArrowDownLeft, 
  FileText, Shield, AlertTriangle, TrendingUp,
  CreditCard, Coins, Send, CheckCircle
} from "lucide-react";

const FinanceOverview = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  
  const { isSuperAdmin, isAdmin, loading: rolesLoading } = useUserRole(user?.id || null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchStats();
      }
    });
  }, [navigate]);

  useEffect(() => {
    if (!rolesLoading && !isAdmin && !isSuperAdmin) {
      navigate("/dashboard");
    }
  }, [isAdmin, isSuperAdmin, rolesLoading, navigate]);

  const fetchStats = async () => {
    try {
      // Fetch wallet totals
      const { data: wallets } = await supabase
        .from("wallets")
        .select("balance, agc_balance");
      
      const totalBalance = wallets?.reduce((sum, w) => sum + (Number(w.balance) || 0), 0) || 0;
      const totalAGC = wallets?.reduce((sum, w) => sum + (Number(w.agc_balance) || 0), 0) || 0;

      // Fetch donations
      const { data: donations } = await supabase
        .from("donations")
        .select("amount, payment_status")
        .eq("payment_status", "completed");
      
      const totalDonations = donations?.reduce((sum, d) => sum + (Number(d.amount) || 0), 0) || 0;

      // Fetch pending disbursements
      const { count: pendingDisbursements } = await supabase
        .from("disbursement_requests")
        .select("id", { count: "exact", head: true })
        .eq("status", "pending");

      // Fetch unverified bank accounts
      const { count: unverifiedBanks } = await supabase
        .from("bank_accounts")
        .select("id", { count: "exact", head: true })
        .eq("verification_status", "pending");

      setStats({
        totalBalance,
        totalAGC,
        totalDonations,
        pendingDisbursements: pendingDisbursements || 0,
        unverifiedBanks: unverifiedBanks || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || rolesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <>
      <Helmet>
        <title>Finance Overview | SCEF Admin</title>
        <meta name="description" content="SCEF Finance Administration - Overview of wallets, donations, and disbursements" />
      </Helmet>

      <DashboardLayout role="super_admin" title="Finance Overview">
        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Finance Overview</h1>
              <p className="text-muted-foreground">Manage wallets, bank accounts, and disbursements</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to="/admin/finance/ledger">
                  <FileText className="w-4 h-4 mr-2" />
                  Audit Ledger
                </Link>
              </Button>
              <Button asChild>
                <Link to="/admin/finance/disbursements">
                  <Send className="w-4 h-4 mr-2" />
                  Disbursements
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <Wallet className="w-4 h-4" />
                  Total Wallet Balance
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-32" />
                ) : (
                  <p className="text-2xl font-bold">{formatCurrency(stats?.totalBalance || 0)}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-amber-500" />
                  Total AGC in Circulation
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-32" />
                ) : (
                  <p className="text-2xl font-bold text-amber-600">
                    {stats?.totalAGC.toLocaleString(undefined, { minimumFractionDigits: 3 })} AGC
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  Total Donations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-32" />
                ) : (
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(stats?.totalDonations || 0)}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  Pending Actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-2xl font-bold text-orange-600">{stats?.pendingDisbursements || 0}</p>
                    <p className="text-xs text-muted-foreground">Disbursements</p>
                  </div>
                  <div className="border-l pl-4">
                    <p className="text-2xl font-bold text-orange-600">{stats?.unverifiedBanks || 0}</p>
                    <p className="text-xs text-muted-foreground">Bank Verifications</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bank Accounts */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-500" />
                  Bank Accounts
                </CardTitle>
                <CardDescription>
                  Manage bank accounts for SCEF, chapters, and programs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats?.unverifiedBanks > 0 && (
                    <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 dark:bg-orange-950 p-2 rounded-lg">
                      <AlertTriangle className="w-4 h-4" />
                      {stats.unverifiedBanks} accounts pending verification
                    </div>
                  )}
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/admin/finance/bank-accounts">
                      Manage Bank Accounts
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Disbursements */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-purple-500" />
                  Disbursements
                </CardTitle>
                <CardDescription>
                  Review and approve fund disbursement requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats?.pendingDisbursements > 0 && (
                    <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 dark:bg-orange-950 p-2 rounded-lg">
                      <AlertTriangle className="w-4 h-4" />
                      {stats.pendingDisbursements} requests awaiting approval
                    </div>
                  )}
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/admin/finance/disbursements">
                      View Disbursements
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Audit Ledger */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  Audit Ledger
                </CardTitle>
                <CardDescription>
                  View complete transaction history and audit logs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-950 p-2 rounded-lg">
                    <CheckCircle className="w-4 h-4" />
                    All transactions logged
                  </div>
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/admin/finance/ledger">
                      View Audit Logs
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Financial Activity</CardTitle>
              <CardDescription>Latest transactions and actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No recent activity</p>
                <p className="text-sm">Financial transactions will appear here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default FinanceOverview;