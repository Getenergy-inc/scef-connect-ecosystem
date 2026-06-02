import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Globe, Lock, Mail, MapPin,
  Phone, ShieldCheck, Sparkles, User as UserIcon, Wallet,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { mapAuthErrorToUserMessage } from "@/lib/errorMapper";
import { logger } from "@/lib/logger";
import { GoogleButton } from "@/components/auth/GoogleButton";
import {
  SCEF_COUNTRIES, REGION_BY_SLUG, type ScefCountry, type ScefRegionSlug,
} from "@/data/scefRegions";

type Step = 1 | 2 | 3;

const STEPS: { num: Step; label: string }[] = [
  { num: 1, label: "Create account" },
  { num: 2, label: "Country & chapter" },
  { num: 3, label: "Welcome" },
];

const accountSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  password: z.string().min(8, "Password must be at least 8 characters").max(128),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
type AccountValues = z.infer<typeof accountSchema>;

const OTHER_DIASPORA = "__diaspora__";
const OTHER_FRIENDS = "__friends__";

const sortedCountries = [...SCEF_COUNTRIES].sort((a, b) => a.name.localeCompare(b.name));

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);

  const [account, setAccount] = useState<AccountValues>({
    firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "",
  });
  const [accountErrors, setAccountErrors] = useState<Partial<Record<keyof AccountValues, string>>>({});

  const [countryKey, setCountryKey] = useState<string>("");
  const [regionOverride, setRegionOverride] = useState<ScefRegionSlug | "">("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) navigate("/dashboard");
    });
  }, [navigate]);

  // Resolve country + region
  const selected = useMemo(() => {
    if (countryKey === OTHER_DIASPORA) {
      return {
        countryName: "Other (Diaspora)",
        region: REGION_BY_SLUG["diaspora-global-africa"],
        regionOptions: [REGION_BY_SLUG["diaspora-global-africa"]],
      };
    }
    if (countryKey === OTHER_FRIENDS) {
      return {
        countryName: "Other (Friends of Africa)",
        region: REGION_BY_SLUG["friends-of-africa"],
        regionOptions: [REGION_BY_SLUG["friends-of-africa"]],
      };
    }
    const c: ScefCountry | undefined = SCEF_COUNTRIES.find((x) => x.slug === countryKey);
    if (!c) return null;
    const options = [c.primaryRegion, ...(c.secondaryTags ?? [])].map((s) => REGION_BY_SLUG[s]);
    const region = regionOverride ? REGION_BY_SLUG[regionOverride] : REGION_BY_SLUG[c.primaryRegion];
    return { countryName: c.name, region, regionOptions: options };
  }, [countryKey, regionOverride]);

  const progressValue = (step / STEPS.length) * 100;

  // ── Step 1 handlers ──
  const setField = (k: keyof AccountValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount((v) => ({ ...v, [k]: e.target.value }));
    if (accountErrors[k]) setAccountErrors((er) => ({ ...er, [k]: undefined }));
  };

  const handleAccountNext = (e: React.FormEvent) => {
    e.preventDefault();
    const r = accountSchema.safeParse(account);
    if (!r.success) {
      const errs: Partial<Record<keyof AccountValues, string>> = {};
      r.error.issues.forEach((i) => {
        const k = i.path[0] as keyof AccountValues;
        if (!errs[k]) errs[k] = i.message;
      });
      setAccountErrors(errs);
      return;
    }
    setStep(2);
  };

  // ── Step 2: create user + assign ──
  const handleFinishRegistration = async () => {
    if (!selected) {
      toast.error("Please select your country to continue.");
      return;
    }
    setLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/dashboard/welcome`;
      const { data, error } = await supabase.auth.signUp({
        email: account.email,
        password: account.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: { first_name: account.firstName, last_name: account.lastName },
        },
      });
      if (error) throw error;

      const newUserId = data.user?.id;
      if (newUserId) {
        await supabase
          .from("profiles")
          .update({
            first_name: account.firstName,
            last_name: account.lastName,
            phone: account.phone || null,
            country: selected.countryName,
            state: selected.region.name,
            engagement_path: "member",
            onboarding_step: "confirmation",
            onboarding_completed: true,
          })
          .eq("user_id", newUserId);
      }
      toast.success(`Welcome! You're registered under ${selected.region.name}.`);
      setStep(3);
    } catch (err: unknown) {
      logger.error("Register error:", err);
      toast.error(mapAuthErrorToUserMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register | Join SCEF as a Free Online Member</title>
        <meta
          name="description"
          content="Create your free SCEF account. Every new member is assigned to a country and regional online chapter during signup."
        />
        <link rel="canonical" href="/register" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-scef-blue-darker via-scef-blue-dark to-scef-blue-darker">
        <Header />

        <main className="pt-28 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <Badge variant="secondary" className="mb-3 bg-scef-gold/15 text-scef-gold border-scef-gold/30">
                  <Sparkles className="w-3.5 h-3.5 mr-1" /> Free Online Membership
                </Badge>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                  Register with SCEF
                </h1>
                <p className="text-white/70 text-sm md:text-base">
                  Every new member starts as a <strong className="text-white">Free Online Member</strong> and is
                  assigned to a country and regional online chapter.
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
                  {/* ── Step 1: Account ── */}
                  {step === 1 && (
                    <>
                      <div>
                        <h2 className="font-semibold text-lg text-foreground mb-1">
                          Create your free account
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          One unified account across SCEF programs, chapters and the GFA Wallet.
                        </p>
                      </div>

                      <GoogleButton redirectTo="/register?google=1" label="Sign up with Google" />

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-card px-2 text-muted-foreground">or with email</span>
                        </div>
                      </div>

                      <form onSubmit={handleAccountNext} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label htmlFor="firstName">First name</Label>
                            <div className="relative">
                              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input id="firstName" value={account.firstName} onChange={setField("firstName")} className="pl-10" />
                            </div>
                            {accountErrors.firstName && <p className="text-xs text-destructive">{accountErrors.firstName}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="lastName">Last name</Label>
                            <div className="relative">
                              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input id="lastName" value={account.lastName} onChange={setField("lastName")} className="pl-10" />
                            </div>
                            {accountErrors.lastName && <p className="text-xs text-destructive">{accountErrors.lastName}</p>}
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input id="email" type="email" value={account.email} onChange={setField("email")} className="pl-10" />
                          </div>
                          {accountErrors.email && <p className="text-xs text-destructive">{accountErrors.email}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="phone">Phone <span className="text-muted-foreground font-normal">(optional)</span></Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input id="phone" type="tel" value={account.phone} onChange={setField("phone")} className="pl-10" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input id="password" type="password" value={account.password} onChange={setField("password")} className="pl-10" placeholder="At least 8 characters" />
                            </div>
                            {accountErrors.password && <p className="text-xs text-destructive">{accountErrors.password}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="confirmPassword">Confirm</Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input id="confirmPassword" type="password" value={account.confirmPassword} onChange={setField("confirmPassword")} className="pl-10" />
                            </div>
                            {accountErrors.confirmPassword && <p className="text-xs text-destructive">{accountErrors.confirmPassword}</p>}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <Button variant="ghost" asChild>
                            <Link to="/auth/sign-in">Already have an account?</Link>
                          </Button>
                          <Button type="submit" size="lg">
                            Continue
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>

                        <p className="text-[11px] text-muted-foreground text-center pt-1">
                          By creating an account you agree to our{" "}
                          <Link to="/terms" className="underline hover:text-foreground">Terms</Link>{" "}and{" "}
                          <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
                        </p>
                      </form>
                    </>
                  )}

                  {/* ── Step 2: Country & Region ── */}
                  {step === 2 && (
                    <>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="font-semibold text-lg text-foreground mb-1">
                            Your country & regional online chapter
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Select your country — we'll assign you to your SCEF regional online chapter.
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                          <ArrowLeft className="w-4 h-4 mr-1" /> Back
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label>Country</Label>
                        <Select
                          value={countryKey}
                          onValueChange={(v) => { setCountryKey(v); setRegionOverride(""); }}
                        >
                          <SelectTrigger>
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4 text-muted-foreground" />
                              <SelectValue placeholder="Select your country" />
                            </div>
                          </SelectTrigger>
                          <SelectContent className="max-h-80">
                            {sortedCountries.map((c) => (
                              <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>
                            ))}
                            <SelectItem value={OTHER_DIASPORA}>Other — African Diaspora (outside Africa)</SelectItem>
                            <SelectItem value={OTHER_FRIENDS}>Other — Friend of Africa (non-African ally)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {selected && selected.regionOptions.length > 1 && (
                        <div className="space-y-2">
                          <Label>Preferred regional chapter</Label>
                          <Select
                            value={regionOverride || selected.region.slug}
                            onValueChange={(v) => setRegionOverride(v as ScefRegionSlug)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {selected.regionOptions.map((r) => (
                                <SelectItem key={r.slug} value={r.slug}>
                                  {r.name} <span className="text-muted-foreground">— {r.scope}</span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-[11px] text-muted-foreground">
                            Your country participates in more than one SCEF region. Pick the one you most identify with.
                          </p>
                        </div>
                      )}

                      {selected && (
                        <Card className="bg-primary/5 border-primary/20">
                          <CardContent className="p-4 space-y-2.5">
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span className="text-muted-foreground">Assigned regional chapter:</span>
                              <strong className="text-foreground">{selected.region.name}</strong>
                            </div>
                            <p className="text-xs text-muted-foreground">{selected.region.shortDescription}</p>
                            <div className="flex items-center gap-2 text-xs">
                              <Wallet className="w-3.5 h-3.5 text-scef-gold" />
                              <span className="text-muted-foreground">GFA Wallet status:</span>
                              <Badge variant="outline" className="text-[10px]">{selected.region.walletStatus}</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg p-3">
                        <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                        <span>
                          Your data is stored securely. You'll start as a Free Online Member — you can upgrade
                          your membership, join a sub-chapter, or volunteer at any time.
                        </span>
                      </div>

                      <Button
                        size="lg"
                        className="w-full"
                        onClick={handleFinishRegistration}
                        disabled={!selected || loading}
                      >
                        {loading ? "Creating your account…" : "Complete registration"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </>
                  )}

                  {/* ── Step 3: Welcome ── */}
                  {step === 3 && selected && (
                    <>
                      <div className="text-center space-y-3 py-4">
                        <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h2 className="font-display text-2xl font-bold text-foreground">
                          Welcome to SCEF{account.firstName ? `, ${account.firstName}` : ""}!
                        </h2>
                        <p className="text-sm text-muted-foreground max-w-md mx-auto">
                          You're now a <strong className="text-foreground">Free Online Member</strong> assigned to the{" "}
                          <strong className="text-foreground">{selected.region.name}</strong> regional online chapter
                          ({selected.countryName}).
                        </p>
                      </div>

                      <Card className="p-4 bg-primary/5 border-primary/20 space-y-1">
                        <p className="text-xs text-muted-foreground">Your regional chapter</p>
                        <p className="font-semibold text-foreground">{selected.region.name}</p>
                        <p className="text-xs text-muted-foreground">{selected.region.impactPathway}</p>
                      </Card>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <Button variant="outline" size="lg" onClick={() => navigate("/dashboard/welcome")}>
                          Go to dashboard
                        </Button>
                        <Button size="lg" onClick={() => navigate("/get-involved/membership-ambassadors")}>
                          Explore membership tiers
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                      <div className="text-center">
                        <Button variant="link" size="sm" onClick={() => navigate(`/local-chapters/region/${selected.region.slug}`)}>
                          View your regional chapter page
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

export default Register;
