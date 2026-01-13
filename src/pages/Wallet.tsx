import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";
import { 
  Wallet as WalletIcon, Plus, ArrowUpRight, ArrowDownLeft, 
  Coins, History, RefreshCw 
} from "lucide-react";
import { WalletHeader } from "@/components/wallet/WalletHeader";
import { FundWalletModal } from "@/components/wallet/FundWalletModal";
import { WithdrawModal } from "@/components/wallet/WithdrawModal";
import { TransactionHistory } from "@/components/wallet/TransactionHistory";
import gfaWalletLogo from "@/assets/gfa-wallet-logo.jpg";

const Wallet = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [wallet, setWallet] = useState<any>(null);
  const [fundModalOpen, setFundModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchWallet(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchWallet = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("wallets")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) throw error;
      setWallet(data);
    } catch (error) {
      logger.error("Error fetching wallet:", error);
    } finally {
      setLoading(false);
    }
  };

  // Real-time subscription for wallet balance updates
  useEffect(() => {
    if (!wallet?.id) return;

    const channel = supabase
      .channel(`wallet-balance-${wallet.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "wallets",
          filter: `id=eq.${wallet.id}`,
        },
        (payload) => {
          logger.log("Wallet balance updated:", payload);
          setWallet(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [wallet?.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-primary">Loading wallet...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Wallet | SCEF - Santos Creations Educational Foundation</title>
        <meta name="description" content="Manage your SCEF wallet, view transactions, and fund education initiatives with GFA Wallet and Afri Gold Coin." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Header with GFA Wallet Logo */}
              <WalletHeader />

              {/* Balance Cards */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* USD Balance */}
                <Card className="bg-gradient-to-br from-earth to-earth/90 text-cream overflow-hidden relative">
                  <div className="absolute top-3 right-3 opacity-20">
                    <img src={gfaWalletLogo} alt="" className="w-16 h-16 rounded-lg object-contain" />
                  </div>
                  <CardHeader>
                    <CardDescription className="text-cream/70">Available Balance</CardDescription>
                    <CardTitle className="text-4xl font-display">
                      ${wallet?.balance?.toFixed(2) || "0.00"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" onClick={() => setFundModalOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Funds
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-cream/30 text-cream hover:bg-cream/10"
                        onClick={() => setWithdrawModalOpen(true)}
                      >
                        <ArrowDownLeft className="w-4 h-4 mr-2" />
                        Withdraw
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* AGC Balance */}
                <Card className="bg-gradient-to-br from-gold/20 to-gold/10 border-gold/30">
                  <CardHeader>
                    <CardDescription className="flex items-center gap-2">
                      <Coins className="w-4 h-4" />
                      Afri Gold Coin (AGC)
                    </CardDescription>
                    <CardTitle className="text-4xl font-display text-gold">
                      {wallet?.agc_balance?.toFixed(4) || "0.0000"} AGC
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Convert to AGC
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      AGC enables voting and exclusive member benefits
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: Plus, label: "Add Funds", action: () => setFundModalOpen(true) },
                  { icon: ArrowDownLeft, label: "Withdraw", action: () => setWithdrawModalOpen(true) },
                  { icon: ArrowUpRight, label: "Donate", action: () => navigate("/donate") },
                  { icon: History, label: "History", action: () => document.getElementById("transaction-history")?.scrollIntoView({ behavior: "smooth" }) },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Transaction History with Pagination */}
              <div id="transaction-history">
                <TransactionHistory 
                  walletId={wallet?.id || null} 
                  onFundWallet={() => setFundModalOpen(true)}
                />
              </div>

              {/* Info Section */}
              <div className="mt-8 p-6 rounded-xl bg-muted/50 border border-border">
                <div className="flex items-start gap-4">
                  <img src={gfaWalletLogo} alt="GFA Wallet" className="w-12 h-12 rounded-lg object-contain" />
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-3">
                      About GFA Wallet & AGC
                    </h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• <strong>GFA Wallet</strong> is your personal funding account for all SCEF activities.</p>
                      <p>• <strong>Afri Gold Coin (AGC)</strong> is SCEF's utility token for voting, governance, and exclusive benefits.</p>
                      <p>• Convert USD to AGC to participate in NESA voting and member decisions.</p>
                      <p>• All transactions are secure, transparent, and auditable.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      {/* Modals */}
      <FundWalletModal open={fundModalOpen} onOpenChange={setFundModalOpen} />
      <WithdrawModal 
        open={withdrawModalOpen} 
        onOpenChange={setWithdrawModalOpen}
        balance={wallet?.balance || 0}
        hasBankAccount={false} // TODO: Check from bank_accounts table
      />
    </>
  );
};

export default Wallet;
