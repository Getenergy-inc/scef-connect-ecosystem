import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpRight, ArrowDownLeft, RefreshCw, Coins, 
  CreditCard, Send, Download
} from "lucide-react";
import type { WalletTransaction } from "@/hooks/useSuperAdminDashboard";

interface WalletTransactionsCardProps {
  transactions: WalletTransaction[];
  isLoading?: boolean;
  maxRows?: number;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "credit":
    case "deposit":
      return <ArrowDownLeft className="w-4 h-4 text-green-500" />;
    case "debit":
    case "withdrawal":
      return <ArrowUpRight className="w-4 h-4 text-red-500" />;
    case "agc_purchase":
      return <Coins className="w-4 h-4 text-amber-500" />;
    case "transfer":
      return <Send className="w-4 h-4 text-blue-500" />;
    case "dues":
      return <CreditCard className="w-4 h-4 text-purple-500" />;
    default:
      return <RefreshCw className="w-4 h-4 text-muted-foreground" />;
  }
};

const getTypeBadge = (type: string) => {
  const variants: Record<string, { label: string; className: string }> = {
    credit: { label: "Credit", className: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" },
    debit: { label: "Debit", className: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" },
    agc_purchase: { label: "AGC Purchase", className: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300" },
    transfer: { label: "Transfer", className: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" },
    dues: { label: "Dues", className: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" },
    purchase: { label: "Purchase", className: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300" },
    contribution: { label: "Contribution", className: "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300" },
  };

  const config = variants[type] || { label: type, className: "bg-gray-100 text-gray-700" };

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};

export const WalletTransactionsCard = ({ 
  transactions, 
  isLoading = false,
  maxRows = 10 
}: WalletTransactionsCardProps) => {
  const displayTxns = transactions.slice(0, maxRows);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Coins className="w-5 h-5 text-amber-500" />
          Wallet Transactions
        </CardTitle>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <Skeleton className="h-5 w-24" />
              </div>
            ))}
          </div>
        ) : displayTxns.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Coins className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No wallet transactions yet</p>
            <p className="text-sm">Transactions will appear here when users make purchases or transfers</p>
          </div>
        ) : (
          <div className="space-y-1">
            {displayTxns.map((txn) => (
              <div 
                key={txn.id} 
                className="flex items-center justify-between py-3 border-b border-border last:border-0 hover:bg-muted/50 transition-colors rounded-lg px-2 -mx-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    {getTypeIcon(txn.type)}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">
                      {txn.description || txn.type}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {txn.date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getTypeBadge(txn.type)}
                  <span className={`font-semibold text-sm ${
                    txn.type === "credit" || txn.type === "deposit" 
                      ? "text-green-600" 
                      : txn.type === "debit" || txn.type === "withdrawal"
                      ? "text-red-600"
                      : "text-foreground"
                  }`}>
                    {txn.type === "credit" || txn.type === "deposit" ? "+" : "-"}
                    ${txn.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!isLoading && transactions.length > maxRows && (
          <div className="mt-4 pt-4 border-t border-border text-center">
            <Button variant="ghost" size="sm">
              View All {transactions.length} Transactions
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};