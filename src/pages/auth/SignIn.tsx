import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import gfaWalletLogo from "@/assets/gfa-wallet-logo.jpg";
import { mapAuthErrorToUserMessage } from "@/lib/errorMapper";
import { logger } from "@/lib/logger";

const SignIn = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate(redirectTo);
      }
    });
  }, [navigate, redirectTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      toast.success("Welcome back!");
      navigate(redirectTo);
    } catch (error: unknown) {
      logger.error("Sign in error:", error);
      toast.error(mapAuthErrorToUserMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In | SCEF - Santos Creations Educational Foundation</title>
        <meta name="description" content="Sign in to your SCEF account to access your dashboard, wallet, and more." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-earth via-earth/95 to-earth">
        <Header />
        
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              {/* Logo & Title */}
              <div className="text-center mb-8">
                <img 
                  src={gfaWalletLogo} 
                  alt="GFA Wallet" 
                  className="w-20 h-20 mx-auto rounded-xl object-contain bg-white p-2 shadow-lg mb-4"
                />
                <h1 className="font-display text-3xl font-bold text-cream mb-2">
                  Welcome Back
                </h1>
                <p className="text-cream/70">
                  Sign in to access your dashboard
                </p>
              </div>

              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link 
                          to="/auth/forgot-password" 
                          className="text-xs text-primary hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? "Signing in..." : "Sign In"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      Don't have an account?{" "}
                      <Link 
                        to={`/auth/sign-up${redirectTo !== "/dashboard" ? `?redirect=${redirectTo}` : ""}`}
                        className="text-primary hover:underline font-medium"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Info */}
              <p className="text-center text-cream/50 text-xs mt-6">
                By signing in, you agree to our{" "}
                <Link to="/terms" className="underline">Terms of Service</Link>
                {" "}and{" "}
                <Link to="/privacy" className="underline">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SignIn;