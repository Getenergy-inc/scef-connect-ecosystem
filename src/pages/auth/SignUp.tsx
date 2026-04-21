import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { mapAuthErrorToUserMessage } from "@/lib/errorMapper";
import { logger } from "@/lib/logger";
import { PathPicker } from "@/components/auth/PathPicker";
import { AccountForm, type AccountFormValues } from "@/components/auth/AccountForm";
import { PathFormRouter } from "@/components/auth/paths/PathFormRouter";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { ENGAGEMENT_PATHS, PATH_NEXT_STEP, type EngagementPath } from "@/lib/onboarding";

type Step = 1 | 2 | 3 | 4;

const STEPS: { num: Step; label: string }[] = [
  { num: 1, label: "Engagement Path" },
  { num: 2, label: "Create Account" },
  { num: 3, label: "Profile Setup" },
  { num: 4, label: "Confirmation" },
];

const SignUp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialPath = searchParams.get("path") as EngagementPath | null;

  const [step, setStep] = useState<Step>(1);
  const [path, setPath] = useState<EngagementPath | null>(initialPath ?? null);
  const [account, setAccount] = useState<AccountFormValues | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) navigate("/dashboard");
    });
  }, [navigate]);

  const progressValue = (step / STEPS.length) * 100;

  const handlePathNext = () => {
    if (!path) {
      toast.error("Please choose an engagement path to continue.");
      return;
    }
    setStep(2);
  };

  const handleAccountSubmit = async (values: AccountFormValues) => {
    if (!path) return;
    setLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/dashboard`;
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: { first_name: values.firstName, last_name: values.lastName },
        },
      });
      if (error) throw error;

      const newUserId = data.user?.id;
      if (newUserId) {
        setUserId(newUserId);
        await supabase
          .from("profiles")
          .update({
            first_name: values.firstName,
            last_name: values.lastName,
            phone: values.phone || null,
            country: values.country,
            state: values.region || null,
            engagement_path: path,
            onboarding_step: "profile",
          })
          .eq("user_id", newUserId);

        // Assign path-specific app role (member is already added by handle_new_user trigger)
        await supabase.rpc("assign_path_role" as never, {
          _user_id: newUserId,
          _path: path,
        } as never);
      }

      setAccount(values);
      toast.success("Account created. Almost there!");
      setStep(3);
    } catch (error: unknown) {
      logger.error("Sign up error:", error);
      toast.error(mapAuthErrorToUserMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleProfileContinue = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      await supabase
        .from("profiles")
        .update({ onboarding_step: "confirmation" })
        .eq("user_id", session.user.id);
    }
    setStep(4);
  };

  const handleFinish = () => {
    if (!path) { navigate("/dashboard"); return; }
    navigate(PATH_NEXT_STEP[path].href);
  };

  const currentPathMeta = path ? ENGAGEMENT_PATHS.find((p) => p.id === path) : null;

  return (
    <>
      <Helmet>
        <title>Join SCEF | Create Your Account</title>
        <meta name="description" content="Sign up to SCEF — choose how you want to engage: as a member, chapter participant, ambassador, sponsor, endorser, or NESA awards participant." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-scef-blue-darker via-scef-blue-dark to-scef-blue-darker">
        <Header />

        <main className="pt-28 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                  Join SCEF
                </h1>
                <p className="text-white/70 text-sm md:text-base">
                  One unified account. Multiple ways to make impact across Africa.
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2 text-xs text-white/70">
                  <span>Step {step} of {STEPS.length}</span>
                  <span>{STEPS[step - 1].label}</span>
                </div>
                <Progress value={progressValue} className="h-1.5 bg-white/10" />
              </div>

              <Card className="bg-card border-border shadow-xl">
                <CardContent className="pt-6 pb-6 space-y-5">
                  {step === 1 && (
                    <>
                      <div>
                        <h2 className="font-semibold text-lg text-foreground mb-1">
                          How would you like to engage with SCEF?
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Pick the path that fits you best — you can add more roles later.
                        </p>
                      </div>
                      <PathPicker selected={path} onSelect={setPath} />
                      <div className="flex items-center justify-between pt-2">
                        <Button variant="ghost" asChild>
                          <Link to="/auth/sign-in">Already have an account?</Link>
                        </Button>
                        <Button size="lg" onClick={handlePathNext} disabled={!path}>
                          Continue
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="font-semibold text-lg text-foreground mb-1">
                            Create your account
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {currentPathMeta && (
                              <>Joining as: <span className="text-foreground font-medium">{currentPathMeta.title}</span></>
                            )}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                          <ArrowLeft className="w-4 h-4 mr-1" />
                          Change
                        </Button>
                      </div>

                      <GoogleButton redirectTo="/dashboard" label="Sign up with Google" />

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-card px-2 text-muted-foreground">or with email</span>
                        </div>
                      </div>

                      <AccountForm
                        defaultValues={account ?? undefined}
                        onSubmit={handleAccountSubmit}
                        loading={loading}
                        submitLabel="Create Account & Continue"
                      />

                      <p className="text-[11px] text-muted-foreground text-center pt-2">
                        By creating an account you agree to our{" "}
                        <Link to="/terms" className="underline hover:text-foreground">Terms</Link>
                        {" "}and{" "}
                        <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
                      </p>
                    </>
                  )}

                  {step === 3 && path && (
                    <>
                      <div>
                        <h2 className="font-semibold text-lg text-foreground mb-1">
                          Set up your {currentPathMeta?.title.toLowerCase()} profile
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          We only ask what's relevant to your path. You can update this anytime from your dashboard.
                        </p>
                      </div>

                      {userId ? (
                        <PathFormRouter
                          path={path}
                          userId={userId}
                          onComplete={handleProfileContinue}
                        />
                      ) : (
                        <p className="text-sm text-destructive">
                          Session not ready. Please go back and try again.
                        </p>
                      )}

                      <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg p-3">
                        <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                        <span>Your data is stored securely and only visible to you and SCEF administrators.</span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
                          <ArrowLeft className="w-4 h-4 mr-1" />
                          Back
                        </Button>
                        <Button variant="link" size="sm" onClick={handleProfileContinue}>
                          Skip for now
                        </Button>
                      </div>
                    </>
                  )}

                  {step === 4 && path && (
                    <>
                      <div className="text-center space-y-3 py-4">
                        <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h2 className="font-display text-2xl font-bold text-foreground">
                          Welcome to SCEF{account?.firstName ? `, ${account.firstName}` : ""}!
                        </h2>
                        <p className="text-sm text-muted-foreground max-w-md mx-auto">
                          Your account is ready. Here's your recommended next step to start making impact.
                        </p>
                      </div>

                      <Card className="p-4 bg-primary/5 border-primary/20">
                        <p className="text-xs text-muted-foreground mb-1">Recommended next step</p>
                        <p className="font-semibold text-foreground">{PATH_NEXT_STEP[path].label}</p>
                      </Card>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <Button variant="outline" size="lg" onClick={() => navigate("/dashboard")}>
                          Go to Dashboard
                        </Button>
                        <Button size="lg" onClick={handleFinish}>
                          {PATH_NEXT_STEP[path].label}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SignUp;
