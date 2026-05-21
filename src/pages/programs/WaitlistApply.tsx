import { useState } from "react";
import { Helmet } from "react-helmet-async";
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
import { CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const APPLICANT_TYPES = [
  "Individual", "Student", "Teacher", "Farmer",
  "IDP / Displaced person", "Volunteer", "Intern",
  "Local chapter member", "Ambassador",
  "Sponsor / Partner", "Organization representative", "Government representative",
];

const PROGRAMS = [
  "Capacity Training", "Green Horizon Initiative", "Vocational Training Scholarship",
  "My Career, My Life", "Local Chapter Membership", "Ambassador Program",
  "Volunteer for a Project", "Internship", "EduTourism", "Sponsorship / Partnership",
];

const REGIONS = [
  "North Africa", "West Africa", "Central Africa",
  "East Africa", "Southern Africa", "Diaspora / International",
];

const AGE_RANGES = ["Under 18", "18–24", "25–34", "35–44", "45–54", "55+"];
const GENDERS = ["Female", "Male", "Prefer not to say"];
const CHAPTER_OPTIONS = ["Yes", "No", "Interested"];

const schema = z.object({
  full_name: z.string().trim().min(2, "Full name is required").max(120),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(5, "Phone / WhatsApp required").max(40),
  country: z.string().trim().min(2, "Country is required").max(80),
  region: z.string().trim().max(80).optional().or(z.literal("")),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  age_range: z.string().max(20).optional().or(z.literal("")),
  gender: z.string().max(40).optional().or(z.literal("")),
  applicant_type: z.string().min(1, "Select an applicant type"),
  program_interest: z.string().min(1, "Select a program"),
  preferred_african_region: z.string().max(80).optional().or(z.literal("")),
  motivation: z.string().trim().max(2000).optional().or(z.literal("")),
  skills_background: z.string().trim().max(2000).optional().or(z.literal("")),
  local_chapter_status: z.string().max(20).optional().or(z.literal("")),
  referral_source: z.string().trim().max(200).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent is required" }) }),
  hp: z.string().max(0).optional(), // honeypot
});

type FormState = {
  full_name: string; email: string; phone: string;
  country: string; region: string; city: string;
  age_range: string; gender: string;
  applicant_type: string; program_interest: string; preferred_african_region: string;
  motivation: string; skills_background: string;
  local_chapter_status: string; referral_source: string;
  consent: boolean; hp: string;
};

const initial: FormState = {
  full_name: "", email: "", phone: "",
  country: "", region: "", city: "",
  age_range: "", gender: "",
  applicant_type: "", program_interest: "", preferred_african_region: "",
  motivation: "", skills_background: "",
  local_chapter_status: "", referral_source: "",
  consent: false, hp: "",
};

export default function WaitlistApply() {
  const [form, setForm] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fe: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        fe[issue.path[0] as string] = issue.message;
      }
      setErrors(fe);
      toast({ title: "Please review the form", description: "Some required fields are missing.", variant: "destructive" });
      return;
    }
    if (form.hp) return; // honeypot tripped — silently drop

    setSubmitting(true);
    const d = parsed.data;
    const { error } = await supabase.from("waitlist_applications").insert({
      full_name: d.full_name,
      email: d.email,
      phone: d.phone,
      country: d.country,
      applicant_type: d.applicant_type,
      program_interest: d.program_interest,
      consent: d.consent,
      region: d.region || null,
      city: d.city || null,
      age_range: d.age_range || null,
      gender: d.gender || null,
      preferred_african_region: d.preferred_african_region || null,
      motivation: d.motivation || null,
      skills_background: d.skills_background || null,
      local_chapter_status: d.local_chapter_status || null,
      referral_source: d.referral_source || null,
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
        <title>SCEF 2026–2027 Program Waitlist Application</title>
        <meta
          name="description"
          content="Apply to join the SCEF 2026–2027 Program Waitlist — Capacity Training, Green Horizon Initiative, Scholarships, Local Chapters, Ambassador, Volunteer, Internship, EduTourism and Partnerships."
        />
        <link rel="canonical" href="https://santoscreations.org/programs/waitlist" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px]" />

        <main className="container mx-auto max-w-3xl px-6 md:px-8 py-12 md:py-16">
          <header className="mb-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
              SCEF 2026–2027 Cycle
            </p>
            <h1 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight text-scef-blue-darker">
              SCEF 2026–2027 Program Waitlist Application
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              One unified form to express interest across SCEF programs — training, scholarships, local chapters,
              ambassadorship, volunteering, internships, EduTourism and partnerships.
            </p>
          </header>

          {submitted ? (
            <Card className="border-scef-gold/40 bg-scef-gold/5">
              <CardContent className="p-8 text-center">
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-scef-gold/20 text-scef-gold-dark">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold text-scef-blue-darker">
                  Application received
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  Thank you for joining the SCEF 2026–2027 Program Waitlist. Your application has been received.
                  SCEF will review applications and contact shortlisted applicants when opportunities become available.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Button asChild variant="outline">
                    <a href="/programs">Explore Programs</a>
                  </Button>
                  <Button asChild className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-darker font-semibold">
                    <a href="/">Back to Home</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <form onSubmit={onSubmit} className="space-y-8">
              {/* Personal */}
              <section className="space-y-4">
                <h2 className="font-display text-lg font-bold text-scef-blue-darker">Your details</h2>
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
                  <Field label="State / Region / Province" error={errors.region}>
                    <Input value={form.region} onChange={(e) => set("region", e.target.value)} maxLength={80} />
                  </Field>
                  <Field label="City / Community" error={errors.city}>
                    <Input value={form.city} onChange={(e) => set("city", e.target.value)} maxLength={120} />
                  </Field>
                  <Field label="Age range" error={errors.age_range}>
                    <Selector value={form.age_range} onChange={(v) => set("age_range", v)} placeholder="Select…" options={AGE_RANGES} />
                  </Field>
                  <Field label="Gender (optional)" error={errors.gender}>
                    <Selector value={form.gender} onChange={(v) => set("gender", v)} placeholder="Prefer not to say" options={GENDERS} />
                  </Field>
                </div>
              </section>

              {/* Application */}
              <section className="space-y-4">
                <h2 className="font-display text-lg font-bold text-scef-blue-darker">Your application</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Are you applying as" required error={errors.applicant_type}>
                    <Selector value={form.applicant_type} onChange={(v) => set("applicant_type", v)} placeholder="Select an option" options={APPLICANT_TYPES} />
                  </Field>
                  <Field label="Program of interest" required error={errors.program_interest}>
                    <Selector value={form.program_interest} onChange={(v) => set("program_interest", v)} placeholder="Select a program" options={PROGRAMS} />
                  </Field>
                  <Field label="Preferred African region" error={errors.preferred_african_region}>
                    <Selector value={form.preferred_african_region} onChange={(v) => set("preferred_african_region", v)} placeholder="Select a region" options={REGIONS} />
                  </Field>
                  <Field label="Do you belong to a local chapter?" error={errors.local_chapter_status}>
                    <Selector value={form.local_chapter_status} onChange={(v) => set("local_chapter_status", v)} placeholder="Select…" options={CHAPTER_OPTIONS} />
                  </Field>
                </div>

                <Field label="Why do you want to join this program?" error={errors.motivation}>
                  <Textarea
                    value={form.motivation}
                    onChange={(e) => set("motivation", e.target.value)}
                    rows={4} maxLength={2000}
                    placeholder="Share a short motivation…"
                  />
                </Field>

                <Field label="Skills or background" error={errors.skills_background}>
                  <Textarea
                    value={form.skills_background}
                    onChange={(e) => set("skills_background", e.target.value)}
                    rows={3} maxLength={2000}
                    placeholder="Your experience, training, languages, etc."
                  />
                </Field>

                <Field label="How did you hear about SCEF?" error={errors.referral_source}>
                  <Input
                    value={form.referral_source}
                    onChange={(e) => set("referral_source", e.target.value)}
                    maxLength={200}
                    placeholder="Social media, friend, event, partner…"
                  />
                </Field>
              </section>

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
                    I agree that SCEF may contact me about program opportunities, screening, interviews, and updates.
                  </span>
                </label>
                {errors.consent && <p className="mt-2 text-xs text-destructive">{errors.consent}</p>}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-darker font-semibold"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="me-2 h-4 w-4 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
                <p className="text-xs text-muted-foreground">
                  Your information is protected. Only SCEF administrators can access submissions.
                </p>
              </div>
            </form>
          )}
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

function Selector({
  value, onChange, options, placeholder,
}: { value: string; onChange: (v: string) => void; options: string[]; placeholder: string }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o} value={o}>{o}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
