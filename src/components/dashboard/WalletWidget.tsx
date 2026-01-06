import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, RefreshCcw } from "lucide-react";

interface WalletWidgetProps {
  balance?: number;
  agcBalance?: number;
  currency?: string;
  showActions?: boolean;
}

export const WalletWidget = ({ 
  balance = 0, 
  agcBalance = 0, 
  currency = "USD",
  showActions = true 
}: WalletWidgetProps) => {
  const recentTransactions = [
    // Placeholder - will be populated from database
  ];

  return (
    <Card className="border-2 border-black">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-scef-gold" />
            GFA Wallet
          </CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <RefreshCcw className="w-4 h-4" />
          </Button>
        </div>
        <CardDescription>Your SCEF digital wallet</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Balance Display */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-scef-blue to-scef-blue-dark text-white">
            <p className="text-xs text-white/70 mb-1">Cash Balance</p>
            <p className="text-2xl font-bold">${balance.toLocaleString()}</p>
            <p className="text-xs text-white/60">{currency}</p>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-scef-gold to-scef-gold-dark text-scef-blue">
            <p className="text-xs text-scef-blue/70 mb-1">AGC Balance</p>
            <p className="text-2xl font-bold">{agcBalance.toLocaleString()}</p>
            <p className="text-xs text-scef-blue/60">Africa Gold Coin</p>
          </div>
        </div>

        {/* Quick Actions */}
        {showActions && (
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" size="sm" className="flex-col h-auto py-3" asChild>
              <Link to="/wallet#fund">
                <Plus className="w-4 h-4 mb-1" />
                <span className="text-xs">Fund</span>
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="flex-col h-auto py-3" asChild>
              <Link to="/wallet#send">
                <ArrowUpRight className="w-4 h-4 mb-1" />
                <span className="text-xs">Send</span>
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="flex-col h-auto py-3" asChild>
              <Link to="/wallet#history">
                <ArrowDownLeft className="w-4 h-4 mb-1" />
                <span className="text-xs">History</span>
              </Link>
            </Button>
          </div>
        )}

        {/* Recent Transactions */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Recent Activity</p>
          {recentTransactions.length > 0 ? (
            <div className="space-y-2">
              {recentTransactions.map((tx: any, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      tx.type === 'credit' ? 'bg-forest/10' : 'bg-terracotta/10'
                    }`}>
                      {tx.type === 'credit' ? (
                        <ArrowDownLeft className="w-4 h-4 text-forest" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-terracotta" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{tx.description}</p>
                      <p className="text-xs text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                  <span className={`font-semibold ${
                    tx.type === 'credit' ? 'text-forest' : 'text-terracotta'
                  }`}>
                    {tx.type === 'credit' ? '+' : '-'}${tx.amount}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground text-sm">
              <p>No recent transactions</p>
            </div>
          )}
        </div>

        <Button variant="outline" className="w-full" asChild>
          <Link to="/wallet">View Full Wallet</Link>
        </Button>
      </CardContent>
    </Card>
  );
};