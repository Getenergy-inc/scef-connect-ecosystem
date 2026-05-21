import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { z } from "zod";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2, Loader2, Sprout, BookOpen, Apple, Leaf,
  HandCoins, ArrowRight, MapPin, ShieldAlert,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import heroImage from "@/assets/photos/scef-landscape-aerial.jpg";
import farmImage from "@/assets/photos/scef-volunteers-outreach.jpg";

const APPLICANT_TYPES = [
  "Trainee farmer", "IDP participant", "Local farmer",
  "Volunteer", "Trainer", "Community leader",
  "Government representative", "Sponsor / Partner", "Land access partner",
];

const SUPPORT_OPTIONS = [
  "Training", "Land access", "Farming inputs",
  "Market access", "Volunteer opportunity", "Partnership",
];

const FARMING_EXP = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "some", label: "Some experience" },
];

const objectives = [
  "Create livelihood opportunities through farming.",
  "Train participants in permaculture and sustainable farming practices.",
  "Improve access to fresh food crops through direct farm-to-community supply.",
  "Reduce unnecessary food price hikes caused by exploitative middlemen.",
  "Support poverty reduction through agriculture-based community engagement.",
  "Promote chemical-free farming practices that restore soil dignity and improve nutrition.",
  "Engage up to 1,000 local participants during the pilot phase, subject to land access, funding, local government support, and operational readiness.",
];

const impactIcons = [
  { icon: HandCoins, title: "Livelihood", body: "Sustainable income through farming." },
  { icon: BookOpen, title: "Training", body: "Permaculture and climate-smart practices." },
  { icon: Apple, title: "Food Security", body: "Direct farm-to-community supply." },
  { icon: Leaf, title: "Sustainability", body: "Chemical-free, soil-restoring agriculture." },
];

const govSupport = [
  "Identify communities and applicants who need the opportunity.",
  "Support community entry and trust-building.",
  "Assist with access to suitable land through lawful lease or paid arrangement.",
  "Support local coordination and security guidance where needed.",
  "Participate actively in monitoring, visibility, and project success.",
];

const targetGroups = [
  "IDPs and displaced persons",
  "Local farmers",
  "Youth and women interested in agriculture",
  "Community members seeking livelihood opportunities",
  "Local agriculture volunteers",
  "Permaculture trainers",
  "Local chapter project volunteers",
  "Local government and community partners",
  "Landowners or land access partners",
  "Sponsors and food security partners",
];

const schema = z.object({
  full_name: z.string().trim().min(2, "Full name is required").max(120),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(5, "Phone / WhatsApp required").max(40),
  country: z.string().trim().min(2).max(80),
  state: z.string().trim().max(80).optional().or(z.literal("")),
  lga_community: z.string().trim().max(120).optional().or(z.literal("")),
  applicant_type: z.string().min(1, "Select an applicant type"),
  located_in_borno: z.boolean(),
  farming_experience: z.enum(["yes", "no", "some"]).optional(),
  permaculture_interest: z.boolean(),
  available_practical_training: z.boolean(),
  support_needed: z.array(z.string()).default([]),
  motivation: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent is required" }) }),
  hp: z.string().max(0).optional(),
});

type FormState = {
  full_name: string; email: string; phone: string;
  country: string; state: string; lga_community: string;
  applicant_type: string;
  located_in_borno: boolean;
  farming_experience: "yes" | "no" | "some" | "";
  permaculture_interest: boolean;
  available_practical_training: boolean;
  support_needed: string[];
  motivation: string;
  consent: boolean;
  hp: string;
};

const initial: FormState = {
  full_name: "", email: "", phone: "",
  country: "Nigeria", state: "", lga_community: "",
  applicant_type: "",
  located_in_borno: false,
  farming_experience: "",
  permaculture_interest: false,
  available_practical_training: false,
  support_needed: [],
  motivation: "",
  consent: false,
  hp: "",
};

export default function GreenHorizonApply() {
  const [form, setForm] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleSupport = (opt: string) =>
    setForm((f) => ({
      ...f,
      support_needed: f.support_needed.includes(opt)
        ? f.support_needed.filter((x) => x !== opt)
        : [...f.support_needed, opt],
    }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const parsed = schema.safeParse({
      ...form,
      farming_experience: form.farming_experience || undefined,
    });
    if (!parsed.success) {
      const fe: Record<string, string> = {};
      for (const issue of parsed.error.issues) fe[issue.path[0] as string] = issue.message;
      setErrors(fe);
      toast({ title: "Please review the form", description: "Some required fields are missing.", variant: "destructive" });
      return;
    }
    if (form.hp) return;

    setSubmitting(true);
    const d = parsed.data;
    const { error } = await supabase.from("green_horizon_waitlist").insert({
      full_name: d.full_name,
      email: d.email,
      phone: d.phone,
      country: d.country,
      applicant_type: d.applicant_type,
      located_in_borno: d.located_in_borno,
      permaculture_interest: d.permaculture_interest,
      available_practical_training: d.available_practical_training,
      support_needed: d.support_needed,
      consent: d.consent,
      state: d.state || null,
      lga_community: d.lga_community || null,
      farming_experience: d.farming_experience ?? null,
      motivation: d.motivation || null,
    });
    setSubmitting(false);

    if (error) {
      toast({ title: "Submission failed", description: error.message, variant: "destructive" });
      return;
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>Green Horizon Initiative Project Waitlist — Borno Pilot | SCEF</title>
        <meta
          name="description"
          content="Join the Green Horizon Initiative Project waitlist — a livelihood, permaculture training and food security project piloting in Borno State, Nigeria with SCEF."
        />
        <link rel="canonical" href="https://santoscreations.org/apply/green-horizon" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px]" />

        <main>
          {/* HERO */}
          <section className="relative isolate overflow-hidden bg-scef-blue-darker text-white">
            <div className="absolute inset-0 -z-10">
              <img
                src={heroImage}
                alt="Aerial farmland landscape used in SCEF community projects"
                className="h-full w-full object-cover opacity-25"
                width={1600}
                height={900}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-scef-blue-darker via-scef-blue-darker/90 to-emerald-900/70" />
            </div>
            <div className="container mx-auto max-w-6xl px-6 md:px-8 py-16 md:py-24">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200">
                <Leaf className="h-3.5 w-3.5" />
                Pilot phase · Borno State, Nigeria
              </div>
              <h1 className="mt-5 max-w-3xl font-display text-3xl font-bold leading-[1.05] tracking-tight md:text-5xl">
                Green Horizon Initiative Project Waitlist
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
                A livelihood, agriculture training and food security initiative designed to support IDPs, local
                communities and vulnerable households through farming, permaculture and fair market access.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
                  <a href="#apply">
                    Join Green Horizon Waitlist
                    <ArrowRight className="ms-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-scef-blue-darker">
                  <Link to="/partner-with-us?project=green-horizon">Partner With Green Horizon</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-scef-blue-darker">
                  <Link to="/wallet/donate?project=green-horizon">Sponsor Farming Inputs</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <section className="bg-white py-14 md:py-20">
            <div className="container mx-auto max-w-5xl px-6 md:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">
                About the project
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-4xl">
                Livelihoods, training and food security — starting in Borno.
              </h2>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                <p>
                  The Green Horizon Initiative Project is a SCEF-supported livelihood and food security project
                  designed to begin in Borno State, Nigeria, where many internally displaced persons and
                  vulnerable families need sustainable economic opportunities.
                </p>
                <p>
                  The project will engage local people in farming, train participants in permaculture and
                  climate-conscious farming practices, support better crop yields, and create a fair crop
                  purchase model that reduces dependency on exploitative middlemen.
                </p>
                <p className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                  Our long-term goal is to support livelihood recovery, reduce dependency, improve food access,
                  and help more families move toward stability through productive agriculture and community
                  participation.
                </p>
              </div>

              {/* IMPACT ICONS */}
              <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
                {impactIcons.map(({ icon: Icon, title, body }) => (
                  <div key={title} className="rounded-xl border border-border bg-card p-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div className="mt-3 font-semibold text-scef-blue-darker">{title}</div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* OBJECTIVES */}
          <section className="bg-muted/40 border-y border-border py-14 md:py-20">
            <div className="container mx-auto max-w-5xl px-6 md:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">
                Project objectives
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-[2rem]">
                What this pilot is designed to achieve
              </h2>
              <ol className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                {objectives.map((o, i) => (
                  <li
                    key={o}
                    className="flex gap-3 rounded-xl border border-border bg-card p-4"
                  >
                    <div className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      {i + 1}
                    </div>
                    <span className="text-sm leading-relaxed text-scef-blue-darker">{o}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* TARGET + GOVERNMENT */}
          <section className="bg-white py-14 md:py-20">
            <div className="container mx-auto max-w-6xl px-6 md:px-8 grid gap-10 md:grid-cols-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">
                  Who this is for
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold text-scef-blue-darker">
                  Target applicants
                </h3>
                <ul className="mt-5 space-y-2.5 text-sm text-scef-blue-darker">
                  {targetGroups.map((g) => (
                    <li key={g} className="flex items-start gap-2">
                      <Sprout className="mt-0.5 h-4 w-4 flex-none text-emerald-700" />
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">
                  Local government support needed
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold text-scef-blue-darker">
                  Partnership we are seeking
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  SCEF seeks collaboration with local government and community leaders to:
                </p>
                <ul className="mt-4 space-y-2.5 text-sm text-scef-blue-darker">
                  {govSupport.map((g) => (
                    <li key={g} className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 flex-none text-emerald-700" />
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="container mx-auto max-w-6xl px-6 md:px-8 mt-10">
              <img
                src={farmImage}
                alt="SCEF community outreach volunteers working with local people on the ground"
                loading="lazy"
                width={1600}
                height={900}
                className="w-full rounded-2xl object-cover shadow-xl"
              />
            </div>
          </section>

          {/* APPLY FORM */}
          <section id="apply" className="bg-muted/40 border-t border-border py-14 md:py-20">
            <div className="container mx-auto max-w-3xl px-6 md:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">
                Application form
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-[2rem]">
                Join the Green Horizon Waitlist
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Complete this short form to express interest in the Borno pilot.
              </p>

              <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900 flex gap-3">
                <ShieldAlert className="mt-0.5 h-5 w-5 flex-none" />
                <p className="text-sm leading-relaxed">
                  Joining the waitlist does not guarantee selection. SCEF will screen applicants based on
                  project location, readiness, vulnerability, available resources, and partner support.
                </p>
              </div>

              {submitted ? (
                <Card className="mt-8 border-emerald-300 bg-emerald-50">
                  <CardContent className="p-8 text-center">
                    <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-200 text-emerald-800">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-bold text-scef-blue-darker">
                      Application received
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-emerald-900/90">
                      Thank you for joining the Green Horizon Initiative Project waitlist. SCEF will review
                      applications and contact shortlisted applicants when opportunities become available.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <Button asChild variant="outline">
                        <Link to="/programs/green-horizon-initiative">Back to project page</Link>
                      </Button>
                      <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                        <Link to="/">Back to Home</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={onSubmit} className="mt-8 space-y-8 rounded-2xl border border-border bg-card p-6 md:p-8">
                  {/* Personal */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Full name" required error={errors.full_name}>
                      <Input value={form.full_name} onChange={(e) => set("full_name", e.target.value)} maxLength={120} />
                    </Field>
                    <Field label="Email address" required error={errors.email}>
                      <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} maxLength={255} />
                    </Field>
                    <Field label="Phone / WhatsApp number" required error={errors.phone}>
                      <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} maxLength={40} />
                    </Field>
                    <Field label="Country" required error={errors.country}>
                      <Input value={form.country} onChange={(e) => set("country", e.target.value)} maxLength={80} />
                    </Field>
                    <Field label="State" error={errors.state}>
                      <Input value={form.state} onChange={(e) => set("state", e.target.value)} maxLength={80} placeholder="e.g. Borno" />
                    </Field>
                    <Field label="LGA / Community" error={errors.lga_community}>
                      <Input value={form.lga_community} onChange={(e) => set("lga_community", e.target.value)} maxLength={120} />
                    </Field>
                  </div>

                  {/* Applicant type */}
                  <Field label="Are you applying as" required error={errors.applicant_type}>
                    <Select value={form.applicant_type} onValueChange={(v) => set("applicant_type", v)}>
                      <SelectTrigger><SelectValue placeholder="Select an option" /></SelectTrigger>
                      <SelectContent>
                        {APPLICANT_TYPES.map((o) => (<SelectItem key={o} value={o}>{o}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </Field>

                  {/* Borno + experience */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Are you located in Borno State?">
                      <label className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5 text-sm">
                        <Checkbox
                          checked={form.located_in_borno}
                          onCheckedChange={(v) => set("located_in_borno", v === true)}
                        />
                        Yes, I am currently located in Borno State.
                      </label>
                    </Field>
                    <Field label="Do you have farming experience?" error={errors.farming_experience}>
                      <Select
                        value={form.farming_experience}
                        onValueChange={(v) => set("farming_experience", v as FormState["farming_experience"])}
                      >
                        <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                        <SelectContent>
                          {FARMING_EXP.map((o) => (<SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>

                  {/* Interest + availability */}
                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="flex items-start gap-3 rounded-lg border border-border bg-background p-3 text-sm">
                      <Checkbox
                        checked={form.permaculture_interest}
                        onCheckedChange={(v) => set("permaculture_interest", v === true)}
                      />
                      <span>I am interested in permaculture training.</span>
                    </label>
                    <label className="flex items-start gap-3 rounded-lg border border-border bg-background p-3 text-sm">
                      <Checkbox
                        checked={form.available_practical_training}
                        onCheckedChange={(v) => set("available_practical_training", v === true)}
                      />
                      <span>I am available for practical farm training.</span>
                    </label>
                  </div>

                  {/* Support needed */}
                  <div>
                    <Label className="text-sm font-medium text-scef-blue-darker">What support do you need?</Label>
                    <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {SUPPORT_OPTIONS.map((opt) => {
                        const checked = form.support_needed.includes(opt);
                        return (
                          <label
                            key={opt}
                            className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm cursor-pointer transition-colors ${
                              checked
                                ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                                : "border-border bg-background hover:bg-muted/50"
                            }`}
                          >
                            <Checkbox checked={checked} onCheckedChange={() => toggleSupport(opt)} />
                            {opt}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Motivation */}
                  <Field label="Short motivation" error={errors.motivation}>
                    <Textarea
                      value={form.motivation}
                      onChange={(e) => set("motivation", e.target.value)}
                      rows={4} maxLength={2000}
                      placeholder="Tell us briefly why you want to join the Green Horizon Initiative…"
                    />
                  </Field>

                  {/* Honeypot */}
                  <input
                    type="text"
                    name="website"
                    value={form.hp}
                    onChange={(e) => set("hp", e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  />

                  {/* Consent */}
                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <label className="flex items-start gap-3 text-sm">
                      <Checkbox
                        checked={form.consent}
                        onCheckedChange={(v) => set("consent", v === true)}
                      />
                      <span className="text-scef-blue-darker">
                        I agree that SCEF may contact me about the Green Horizon Initiative — screening,
                        interviews, training schedules and project updates.
                      </span>
                    </label>
                    {errors.consent && <p className="mt-2 text-xs text-destructive">{errors.consent}</p>}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={submitting}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="me-2 h-4 w-4 animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        "Join Green Horizon Waitlist"
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Your information is protected. Only SCEF administrators can access submissions.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

function Field({
  label, required, error, children,
}: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-scef-blue-darker">
        {label}{required && <span className="ms-0.5 text-destructive">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
