import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DashboardStats {
  totalAGC: number;
  totalDonations: number;
  activeChapters: number;
  totalChapters: number;
  totalMembers: number;
  activePrograms: number;
  elibraryResources: number;
  totalWalletBalance: number;
}

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: string;
  type: "donation" | "disbursement" | "dues" | "purchase" | "contribution" | "transfer" | "agc_purchase" | "credit" | "debit";
}

export interface WalletTransaction {
  id: string;
  date: Date;
  type: string;
  amount: number;
  description: string;
  walletId: string;
  referenceId?: string;
}

export interface ChapterHealth {
  name: string;
  status: "good" | "fair" | "poor";
  members: number;
  country: string;
}

export interface DonationChartData {
  month: string;
  donations: number;
  disbursements: number;
}

export function useSuperAdminDashboard() {
  // Fetch dashboard stats
  const statsQuery = useQuery({
    queryKey: ["super-admin-stats"],
    queryFn: async (): Promise<DashboardStats> => {
      // Fetch total AGC from all wallets
      const { data: wallets, error: walletsError } = await supabase
        .from("wallets")
        .select("agc_balance, balance");
      
      if (walletsError) throw walletsError;

      const totalAGC = wallets?.reduce((sum, w) => sum + (Number(w.agc_balance) || 0), 0) || 0;
      const totalWalletBalance = wallets?.reduce((sum, w) => sum + (Number(w.balance) || 0), 0) || 0;

      // Fetch total donations
      const { data: donations, error: donationsError } = await supabase
        .from("donations")
        .select("amount, payment_status")
        .eq("payment_status", "completed");
      
      if (donationsError) throw donationsError;

      const totalDonations = donations?.reduce((sum, d) => sum + (Number(d.amount) || 0), 0) || 0;

      // Fetch chapters count
      const { data: chapters, error: chaptersError } = await supabase
        .from("chapters")
        .select("id, status");
      
      if (chaptersError) throw chaptersError;

      const totalChapters = chapters?.length || 0;
      const activeChapters = chapters?.filter(c => c.status === "active").length || 0;

      // Fetch profiles count (members)
      const { count: totalMembers, error: profilesError } = await supabase
        .from("profiles")
        .select("id", { count: "exact", head: true });
      
      if (profilesError) throw profilesError;

      // Fetch active programs
      const { count: activePrograms, error: programsError } = await supabase
        .from("programs")
        .select("id", { count: "exact", head: true })
        .eq("is_active", true);
      
      if (programsError) throw programsError;

      // Fetch eLibrary resources
      const { count: elibraryResources, error: elibraryError } = await supabase
        .from("elibrary_resources")
        .select("id", { count: "exact", head: true })
        .eq("is_published", true);
      
      if (elibraryError) throw elibraryError;

      return {
        totalAGC,
        totalDonations: totalDonations + totalWalletBalance,
        totalWalletBalance,
        activeChapters,
        totalChapters,
        totalMembers: totalMembers || 0,
        activePrograms: activePrograms || 0,
        elibraryResources: elibraryResources || 0,
      };
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Fetch wallet transactions
  const walletTransactionsQuery = useQuery({
    queryKey: ["super-admin-wallet-transactions"],
    queryFn: async (): Promise<WalletTransaction[]> => {
      const { data: walletTxns, error } = await supabase
        .from("wallet_transactions")
        .select("id, created_at, transaction_type, amount, description, wallet_id, reference_id")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;

      return (walletTxns || []).map((t) => ({
        id: t.id,
        date: new Date(t.created_at),
        type: t.transaction_type,
        amount: Number(t.amount) || 0,
        description: t.description || "",
        walletId: t.wallet_id,
        referenceId: t.reference_id || undefined,
      }));
    },
    refetchInterval: 30000,
  });

  // Fetch combined transactions (donations + wallet transactions)
  const transactionsQuery = useQuery({
    queryKey: ["super-admin-transactions"],
    queryFn: async (): Promise<Transaction[]> => {
      // Fetch donations
      const { data: donations, error: donationsError } = await supabase
        .from("donations")
        .select("id, created_at, donor_name, amount, currency, payment_status, is_anonymous")
        .order("created_at", { ascending: false })
        .limit(20);

      if (donationsError) throw donationsError;

      // Fetch wallet transactions
      const { data: walletTxns, error: walletError } = await supabase
        .from("wallet_transactions")
        .select("id, created_at, transaction_type, amount, description")
        .order("created_at", { ascending: false })
        .limit(20);

      if (walletError) throw walletError;

      const donationTxns: Transaction[] = (donations || []).map((d) => ({
        id: d.id,
        date: new Date(d.created_at),
        description: d.is_anonymous ? "Anonymous Donation" : (d.donor_name || "Donation"),
        amount: `${d.currency || "USD"} ${Number(d.amount).toLocaleString()}`,
        type: "donation" as const,
      }));

      const walletTxnsMapped: Transaction[] = (walletTxns || []).map((t) => {
        const typeMap: Record<string, Transaction["type"]> = {
          "credit": "credit",
          "debit": "debit",
          "agc_purchase": "agc_purchase",
          "transfer": "transfer",
          "dues": "dues",
          "purchase": "purchase",
          "contribution": "contribution",
        };
        
        return {
          id: t.id,
          date: new Date(t.created_at),
          description: t.description || t.transaction_type,
          amount: `USD ${Number(t.amount).toLocaleString()}`,
          type: typeMap[t.transaction_type] || "credit" as const,
        };
      });

      // Combine and sort by date
      const allTxns = [...donationTxns, ...walletTxnsMapped]
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, 30);

      return allTxns;
    },
    refetchInterval: 30000,
  });

  // Fetch chapter health data
  const chapterHealthQuery = useQuery({
    queryKey: ["super-admin-chapter-health"],
    queryFn: async (): Promise<ChapterHealth[]> => {
      const { data: chapters, error } = await supabase
        .from("chapters")
        .select("id, name, status, member_count, country")
        .eq("status", "active")
        .order("member_count", { ascending: false })
        .limit(10);

      if (error) throw error;

      return (chapters || []).map((c) => {
        // Determine health based on member count
        let status: "good" | "fair" | "poor" = "good";
        if ((c.member_count || 0) < 50) {
          status = "poor";
        } else if ((c.member_count || 0) < 100) {
          status = "fair";
        }

        return {
          name: c.name,
          status,
          members: c.member_count || 0,
          country: c.country,
        };
      });
    },
    refetchInterval: 60000,
  });

  // Fetch donation chart data (last 6 months)
  const donationChartQuery = useQuery({
    queryKey: ["super-admin-donation-chart"],
    queryFn: async (): Promise<DonationChartData[]> => {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      const { data: donations, error } = await supabase
        .from("donations")
        .select("created_at, amount")
        .gte("created_at", sixMonthsAgo.toISOString())
        .eq("payment_status", "completed");

      if (error) throw error;

      // Group by month
      const monthlyData: Record<string, { donations: number; disbursements: number }> = {};
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      // Initialize last 6 months
      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const key = `${months[date.getMonth()]} ${date.getFullYear()}`;
        monthlyData[key] = { donations: 0, disbursements: 0 };
      }

      // Aggregate donations
      (donations || []).forEach((d) => {
        const date = new Date(d.created_at);
        const key = `${months[date.getMonth()]} ${date.getFullYear()}`;
        if (monthlyData[key]) {
          monthlyData[key].donations += Number(d.amount) || 0;
        }
      });

      return Object.entries(monthlyData).map(([month, data]) => ({
        month: month.split(" ")[0], // Just show month abbreviation
        donations: data.donations,
        disbursements: data.disbursements,
      }));
    },
    refetchInterval: 60000,
  });

  return {
    stats: statsQuery.data,
    statsLoading: statsQuery.isLoading,
    statsError: statsQuery.error,
    
    transactions: transactionsQuery.data || [],
    transactionsLoading: transactionsQuery.isLoading,

    walletTransactions: walletTransactionsQuery.data || [],
    walletTransactionsLoading: walletTransactionsQuery.isLoading,
    
    chapterHealth: chapterHealthQuery.data || [],
    chapterHealthLoading: chapterHealthQuery.isLoading,
    
    donationChartData: donationChartQuery.data || [],
    donationChartLoading: donationChartQuery.isLoading,
    
    isLoading: statsQuery.isLoading || transactionsQuery.isLoading || chapterHealthQuery.isLoading,
    refetchAll: () => {
      statsQuery.refetch();
      transactionsQuery.refetch();
      walletTransactionsQuery.refetch();
      chapterHealthQuery.refetch();
      donationChartQuery.refetch();
    },
  };
}
