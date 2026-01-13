import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";
import { 
  ArrowUpRight, ArrowDownLeft, RefreshCw, Coins, 
  CreditCard, Send, History, ChevronLeft, ChevronRight,
  Wallet as WalletIcon
} from "lucide-react";

interface Transaction {
  id: string;
  wallet_id: string;
  transaction_type: string;
  amount: number;
  description: string | null;
  reference_id: string | null;
  created_at: string;
}

interface TransactionHistoryProps {
  walletId: string | null;
  onFundWallet?: () => void;
}

const PAGE_SIZE = 10;

const getTypeIcon = (type: string) => {
  switch (type) {
    case "credit":
    case "deposit":
    case "donation_received":
      return <ArrowDownLeft className="w-4 h-4 text-green-500" />;
    case "debit":
    case "withdrawal":
    case "donation":
      return <ArrowUpRight className="w-4 h-4 text-red-500" />;
    case "agc_purchase":
    case "agc_conversion":
      return <Coins className="w-4 h-4 text-amber-500" />;
    case "transfer":
    case "transfer_out":
    case "transfer_in":
      return <Send className="w-4 h-4 text-blue-500" />;
    case "dues":
    case "membership":
      return <CreditCard className="w-4 h-4 text-purple-500" />;
    default:
      return <RefreshCw className="w-4 h-4 text-muted-foreground" />;
  }
};

const getTypeBadge = (type: string) => {
  const variants: Record<string, { label: string; className: string }> = {
    credit: { label: "Credit", className: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300" },
    deposit: { label: "Deposit", className: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300" },
    donation_received: { label: "Donation", className: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300" },
    debit: { label: "Debit", className: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300" },
    withdrawal: { label: "Withdrawal", className: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300" },
    donation: { label: "Donation", className: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300" },
    agc_purchase: { label: "AGC Purchase", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300" },
    agc_conversion: { label: "AGC Convert", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300" },
    transfer: { label: "Transfer", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" },
    transfer_out: { label: "Sent", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" },
    transfer_in: { label: "Received", className: "bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300" },
    dues: { label: "Dues", className: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300" },
    membership: { label: "Membership", className: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300" },
  };

  const config = variants[type] || { label: type.replace(/_/g, " "), className: "bg-muted text-muted-foreground" };

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};

const isCredit = (type: string) => {
  return ["credit", "deposit", "donation_received", "transfer_in"].includes(type);
};

export const TransactionHistory = ({ walletId, onFundWallet }: TransactionHistoryProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const fetchTransactions = useCallback(async () => {
    if (!walletId) return;

    try {
      setLoading(true);
      
      // Get total count
      const { count } = await supabase
        .from("wallet_transactions")
        .select("*", { count: "exact", head: true })
        .eq("wallet_id", walletId);

      setTotalCount(count || 0);

      // Get paginated transactions
      const { data, error } = await supabase
        .from("wallet_transactions")
        .select("*")
        .eq("wallet_id", walletId)
        .order("created_at", { ascending: false })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      logger.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  }, [walletId, page]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Real-time subscription for new transactions
  useEffect(() => {
    if (!walletId) return;

    const channel = supabase
      .channel(`wallet-transactions-${walletId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "wallet_transactions",
          filter: `wallet_id=eq.${walletId}`,
        },
        (payload) => {
          logger.log("Transaction update received:", payload);
          // Refetch when there's any change
          fetchTransactions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [walletId, fetchTransactions]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const hasNext = page < totalPages - 1;
  const hasPrev = page > 0;

  if (!walletId) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          <WalletIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Wallet not found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <History className="w-5 h-5 text-primary" />
          Transaction History
        </CardTitle>
        {totalCount > 0 && (
          <span className="text-sm text-muted-foreground">
            {totalCount} total transaction{totalCount !== 1 ? "s" : ""}
          </span>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <Skeleton className="h-5 w-24" />
              </div>
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <WalletIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium mb-2">No transactions yet</p>
            <p className="text-sm mb-4">Start by adding funds to your wallet</p>
            {onFundWallet && (
              <Button onClick={onFundWallet}>Add Funds</Button>
            )}
          </div>
        ) : (
          <>
            <div className="space-y-1">
              {transactions.map((txn) => (
                <div 
                  key={txn.id} 
                  className="flex items-center justify-between py-3 border-b border-border last:border-0 hover:bg-muted/50 transition-colors rounded-lg px-3 -mx-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      {getTypeIcon(txn.transaction_type)}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">
                        {txn.description || txn.transaction_type.replace(/_/g, " ")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(txn.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      {txn.reference_id && (
                        <p className="text-xs text-muted-foreground font-mono">
                          Ref: {txn.reference_id.slice(0, 12)}...
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:block">
                      {getTypeBadge(txn.transaction_type)}
                    </div>
                    <span className={`font-semibold text-sm min-w-[80px] text-right ${
                      isCredit(txn.transaction_type)
                        ? "text-green-600 dark:text-green-400" 
                        : "text-red-600 dark:text-red-400"
                    }`}>
                      {isCredit(txn.transaction_type) ? "+" : "-"}
                      ${Math.abs(txn.amount).toLocaleString(undefined, { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 2 
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Page {page + 1} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setPage(p => p - 1)}
                    disabled={!hasPrev}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setPage(p => p + 1)}
                    disabled={!hasNext}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
