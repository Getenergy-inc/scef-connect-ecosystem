import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { 
  Wallet as WalletIcon, Plus, ArrowUpRight, ArrowDownLeft, 
  CreditCard, Coins, History, RefreshCw 
} from "lucide-react";

const Wallet = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [wallet, setWallet] = useState<any>(null);

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
      console.error("Error fetching wallet:", error);
    } finally {
      setLoading(false);
    }
  };

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
              {/* Header */}
              <div className="mb-8">
                <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                  GFA Wallet
                </h1>
                <p className="text-muted-foreground">
                  Manage your funds and support education initiatives
                </p>
              </div>

              {/* Balance Cards */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* USD Balance */}
                <Card className="bg-gradient-to-br from-earth to-earth/90 text-cream">
                  <CardHeader>
                    <CardDescription className="text-cream/70">Available Balance</CardDescription>
                    <CardTitle className="text-4xl font-display">
                      ${wallet?.balance?.toFixed(2) || "0.00"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Funds
                      </Button>
                      <Button variant="outline" size="sm" className="border-cream/30 text-cream hover:bg-cream/10">
                        <ArrowUpRight className="w-4 h-4 mr-2" />
                        Send
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
                  { icon: Plus, label: "Add Funds", action: () => {} },
                  { icon: ArrowUpRight, label: "Send", action: () => {} },
                  { icon: CreditCard, label: "Donate", action: () => navigate("/donate") },
                  { icon: History, label: "History", action: () => {} },
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

              {/* Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5" />
                    Recent Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <WalletIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p className="text-lg font-medium mb-2">No transactions yet</p>
                    <p className="text-sm mb-4">Start by adding funds to your wallet</p>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Funds
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Info Section */}
              <div className="mt-8 p-6 rounded-xl bg-muted/50 border border-border">
                <h3 className="font-display text-lg font-bold text-foreground mb-3">
                  About GFA Wallet & AGC
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• <strong>GFA Wallet</strong> is your personal funding account for all SCEF activities.</p>
                  <p>• <strong>Afri Gold Coin (AGC)</strong> is SCEF's utility token for voting, governance, and exclusive benefits.</p>
                  <p>• Convert USD to AGC to participate in NESA voting and member decisions.</p>
                  <p>• All transactions are secure and transparent.</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Wallet;
