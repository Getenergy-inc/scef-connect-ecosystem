import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, Upload, Wallet } from "lucide-react";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  SCHOLARSHIP_APP_TYPE,
  SCHOLARSHIP_CATEGORIES,
  DOC_TYPES,
  PRIORITY_GROUPS,
  type ScholarshipCategorySlug,
} from "@/lib/scholarship";

const profileSchema = z.object({
  full_name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(5).max(40),
  country: z.string().trim().min(2).max(60),
  institution_type: z.string().min(1),
});

const STEPS = [
  "Profile",
  "Category",
  "Documents",
  "EduAid Wallet",
  "Review & Submit",
] as const;

type DocKey = (typeof DOC_TYPES)[number]["key"];

const Apply = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [userId, setUserId] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Step 1
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [institutionType, setInstitutionType] = useState("");

  // Step 2
  const initialCategory =
    (params.get("category") as ScholarshipCategorySlug) || "";
  const [category, setCategory] = useState<ScholarshipCategorySlug | "">(
    initialCategory
  );
  const [priorityGroups, setPriorityGroups] = useState<string[]>([]);
  const [statement, setStatement] = useState("");

  // Step 3 — uploaded doc URLs by key
  const [docs, setDocs] = useState<Partial<Record<DocKey, string>>>({});
  const [uploading, setUploading] = useState<DocKey | null>(null);

  // Step 4 — wallet acknowledgement
  const [walletAck, setWalletAck] = useState(false);

  // Step 5 — final consent
  const [consent, setConsent] = useState(false);

  // Auth gating
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserId(session?.user?.id ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id ?? null);
      setAuthLoading(false);
      if (!session?.user) {
        navigate("/auth?redirect=/scholarship/apply", { replace: true });
      } else {
        setEmail((e) => e || session.user.email || "");
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const progress = useMemo(
    () => Math.round(((step + 1) / STEPS.length) * 100),
    [step]
  );

  const handleUpload = async (key: DocKey, file: File) => {
    if (!userId) return;
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max 10MB", variant: "destructive" });
      return;
    }
    setUploading(key);
    const ext = file.name.split(".").pop() || "bin";
    const path = `${userId}/${key}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("scholarship-docs")
      .upload(path, file, { upsert: true, cacheControl: "3600" });
    setUploading(null);
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      return;
    }
    setDocs((prev) => ({ ...prev, [key]: path }));
    toast({ title: "Uploaded", description: DOC_TYPES.find((d) => d.key === key)?.label });
  };

  const validateStep = (): string | null => {
    if (step === 0) {
      const r = profileSchema.safeParse({
        full_name: fullName,
        email,
        phone,
        country,
        institution_type: institutionType,
      });
      if (!r.success) return "Please complete all profile fields correctly.";
    }
    if (step === 1) {
      if (!category) return "Choose a scholarship category.";
      if (statement.trim().length < 50) return "Statement of purpose must be at least 50 characters.";
    }
    if (step === 2) {
      const missing = DOC_TYPES.filter((d) => d.required && !docs[d.key]);
      if (missing.length) return `Required document missing: ${missing.map((m) => m.label).join(", ")}`;
    }
    if (step === 3 && !walletAck) return "Acknowledge the EduAid Wallet activation.";
    if (step === 4 && !consent) return "You must consent to submit.";
    return null;
  };

  const next = () => {
    const err = validateStep();
    if (err) {
      toast({ title: "Please review", description: err, variant: "destructive" });
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const submit = async () => {
    const err = validateStep();
    if (err) {
      toast({ title: "Please review", description: err, variant: "destructive" });
      return;
    }
    if (!userId) return;
    setSubmitting(true);
    const payload = {
      programme: "EduAid-Africa Scholarship 2026–2027",
      profile: { full_name: fullName, email, phone, country, institution_type: institutionType },
      category,
      priority_groups: priorityGroups,
      statement,
      documents: docs,
      wallet_activated: walletAck,
    };
    const { error } = await supabase.from("applications").insert({
      user_id: userId,
      application_type: SCHOLARSHIP_APP_TYPE,
      status: "submitted",
      payload,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Submission failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Application submitted", description: "Track status in your applicant dashboard." });
    navigate("/scholarship/my-application", { replace: true });
  };

  if (authLoading) {
    return (
      <div className="grid min-h-screen place-items-center text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Apply · EduAid-Africa Scholarship 2026–2027 | SCEF</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />

        <main className="container mx-auto max-w-4xl px-6 py-12 md:px-8">
          <Link
            to="/scholarship/eduaid-2026"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-scef-blue-darker"
          >
            <ArrowLeft className="h-4 w-4" /> Back to programme
          </Link>

          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-4xl">
            Scholarship Application
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Step {step + 1} of {STEPS.length} — {STEPS[step]}
          </p>

          {/* Progress */}
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-scef-gold transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8">
            {step === 0 && (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="full_name">Full name</Label>
                  <Input id="full_name" value={fullName} maxLength={120} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} maxLength={255} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={phone} maxLength={40} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" value={country} maxLength={60} onChange={(e) => setCountry(e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <Label>Institution type</Label>
                  <Select value={institutionType} onValueChange={setInstitutionType}>
                    <SelectTrigger><SelectValue placeholder="Select your institution type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vocational">Vocational / technical</SelectItem>
                      <SelectItem value="college">College</SelectItem>
                      <SelectItem value="polytechnic">Polytechnic</SelectItem>
                      <SelectItem value="university">University</SelectItem>
                      <SelectItem value="professional">Professional / certification body</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <Label className="mb-3 block">Scholarship category</Label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {SCHOLARSHIP_CATEGORIES.map((c) => (
                      <button
                        key={c.slug}
                        type="button"
                        onClick={() => setCategory(c.slug)}
                        className={`rounded-xl border p-4 text-left transition-colors ${
                          category === c.slug
                            ? "border-scef-gold bg-scef-gold/5 ring-2 ring-scef-gold/30"
                            : "border-border bg-background hover:border-scef-gold/40"
                        }`}
                      >
                        <p className="font-display text-sm font-bold text-scef-blue-darker">{c.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{c.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">Priority groups (select any that apply)</Label>
                  <div className="flex flex-wrap gap-2">
                    {PRIORITY_GROUPS.map((g) => {
                      const active = priorityGroups.includes(g);
                      return (
                        <button
                          key={g}
                          type="button"
                          onClick={() =>
                            setPriorityGroups((prev) =>
                              active ? prev.filter((x) => x !== g) : [...prev, g]
                            )
                          }
                          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                            active
                              ? "border-scef-gold bg-scef-gold/15 text-scef-blue-darker"
                              : "border-border bg-background text-muted-foreground hover:border-scef-gold/40"
                          }`}
                        >
                          {g}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label htmlFor="statement">Statement of purpose</Label>
                  <Textarea
                    id="statement"
                    rows={6}
                    maxLength={2000}
                    value={statement}
                    onChange={(e) => setStatement(e.target.value)}
                    placeholder="Tell us about your education goals, financial need and how this scholarship will help you contribute to your community."
                  />
                  <p className="mt-1 text-xs text-muted-foreground">{statement.length}/2000</p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3">
                {DOC_TYPES.map((d) => {
                  const uploaded = docs[d.key];
                  const isUp = uploading === d.key;
                  return (
                    <div
                      key={d.key}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-background p-4"
                    >
                      <div>
                        <p className="font-display text-sm font-bold text-scef-blue-darker">
                          {d.label} {d.required && <span className="text-scef-gold-dark">*</span>}
                        </p>
                        {uploaded && (
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            <CheckCircle2 className="me-1 inline h-3.5 w-3.5 text-[hsl(145_63%_28%)]" />
                            Uploaded
                          </p>
                        )}
                      </div>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg,.webp"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleUpload(d.key, f);
                          }}
                        />
                        <span className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-semibold text-scef-blue-darker hover:border-scef-gold/40">
                          {isUp ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                          {uploaded ? "Replace" : "Upload"}
                        </span>
                      </label>
                    </div>
                  );
                })}
                <p className="text-xs text-muted-foreground">PDF, PNG, JPG up to 10MB. Files are private and only visible to you and the review team.</p>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div className="flex items-start gap-4 rounded-xl border border-border bg-background p-5">
                  <Wallet className="mt-1 h-6 w-6 text-scef-gold-dark" />
                  <div>
                    <p className="font-display text-base font-bold text-scef-blue-darker">
                      EduAid Wallet (powered by GFA)
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Your wallet is the official channel for scholarship
                      tracking, exam payments (where applicable) and
                      disbursements. You can activate it now or after
                      submission — it's required before any award is released.
                    </p>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="mt-4 border-scef-gold/40 text-scef-blue-darker hover:bg-scef-gold/10"
                    >
                      <Link to="/wallet" target="_blank">Open Wallet</Link>
                    </Button>
                  </div>
                </div>
                <label className="flex cursor-pointer items-center gap-3 text-sm">
                  <Checkbox checked={walletAck} onCheckedChange={(v) => setWalletAck(Boolean(v))} />
                  I understand the EduAid Wallet is required for disbursement and tracking.
                </label>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <h3 className="font-display text-lg font-bold text-scef-blue-darker">Review your application</h3>
                <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                  <div><dt className="text-xs uppercase text-muted-foreground">Name</dt><dd>{fullName}</dd></div>
                  <div><dt className="text-xs uppercase text-muted-foreground">Email</dt><dd>{email}</dd></div>
                  <div><dt className="text-xs uppercase text-muted-foreground">Country</dt><dd>{country}</dd></div>
                  <div><dt className="text-xs uppercase text-muted-foreground">Category</dt><dd className="capitalize">{category}</dd></div>
                  <div className="sm:col-span-2"><dt className="text-xs uppercase text-muted-foreground">Priority groups</dt><dd>{priorityGroups.join(", ") || "—"}</dd></div>
                  <div className="sm:col-span-2"><dt className="text-xs uppercase text-muted-foreground">Documents</dt><dd>{Object.keys(docs).length} uploaded</dd></div>
                </dl>
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background p-4 text-sm">
                  <Checkbox checked={consent} onCheckedChange={(v) => setConsent(Boolean(v))} />
                  <span>
                    I confirm the information provided is accurate and consent to SCEF and EduAid-Africa processing my application, including verification of documents, in line with the privacy policy.
                  </span>
                </label>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0 || submitting}
            >
              <ArrowLeft className="me-2 h-4 w-4" /> Back
            </Button>
            {step < STEPS.length - 1 ? (
              <Button onClick={next} className="bg-scef-blue-darker hover:bg-scef-blue">
                Continue <ArrowRight className="ms-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={submit}
                disabled={submitting}
                className="bg-scef-gold text-scef-blue-darker hover:bg-scef-gold-hover"
              >
                {submitting ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <CheckCircle2 className="me-2 h-4 w-4" />}
                Submit Application
              </Button>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Apply;
