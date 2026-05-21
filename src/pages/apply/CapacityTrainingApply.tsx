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
  CheckCircle2, Loader2, GraduationCap, Users, BookOpen, Laptop,
  ArrowRight, ShieldAlert,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import heroImage from "@/assets/photos/scef-volunteers-outreach.jpg";
import sideImage from "@/assets/photos/scef-landscape-aerial.jpg";

const TRAINING_AREAS = [
  "Teacher training and classroom innovation",
  "School management and leadership",
  "Inclusive education and special needs support",
  "Digital learning and EdTech tools",
  "Curriculum development and assessment",
  "Education policy, governance, and compliance",
  "Career guidance systems",
  "Girls education and safeguarding",
  "TVET and vocational education",
  "School funding, CSR, and grant readiness",
  "Community education and local chapter models",
  "Monitoring, evaluation, and impact reporting",
];

const APPLICANT_CATEGORIES = [
  "Teacher",
  "School leader",
  "Student",
  "Volunteer",
  "Local chapter member",
  "Ambassador",
  "NGO worker",
  "Community leader",
  "Project coordinator",
];

const DELIVERY_PREFS = ["Online", "Physical", "Hybrid"];

const APPLYING_AS = ["Individual", "Organization"];

const impactIcons = [
  { icon: GraduationCap, title: "Teacher Growth", body: "Classroom innovation and pedagogy." },
  { icon: Users, title: "Leadership", body: "School and community leadership skills." },
  { icon: Laptop, title: "EdTech", body: "Digital learning and modern tools." },
  { icon: BookOpen, title: "Curriculum", body: "Assessment and curriculum design." },
];

const schema = z.object({
  full_name: z.string().trim().min(2, "Full name is required").max(120),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(5, "Phone / WhatsApp required").max(40),
  country: z.string().trim().min(2, "Country is required").max(80),
  region_state: z.string().trim().min(2, "Region / state is required").max(120),
  applicant_category: z.string().min(1, "Select applicant category"),
  training_area: z.string().min(1, "Select training area"),
  delivery_preference: z.string().min(1, "Select delivery preference"),
  applying_as: z.string().min(1, "Select individual or organization"),
  organization_name: z.string().trim().max(200).optional().or(z.literal("")),
  why_training: z.string().trim().min(20, "Please share at least a short explanation").max(2000),
  knowledge_application: z.string().trim().min(20, "Please share at least a short explanation").max(2000),
  is_scef_member: z.boolean(),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent is required" }) }),
  hp: z.string().max(0).optional(),
});

type FormState = {
  full_name: string; email: string; phone: string;
  country: string; region_state: string;
  applicant_category: string;
  training_area: string;
  delivery_preference: string;
  applying_as: string;
  organization_name: string;
  why_training: string;
  knowledge_application: string;
  is_scef_member: boolean;
  consent: boolean;
  hp: string;
};

const initial: FormState = {
  full_name: "", email: "", phone: "",
  country: "", region_state: "",
  applicant_category: "",
  training_area: "",
  delivery_preference: "",
  applying_as: "",
  organization_name: "",
  why_training: "",
  knowledge_application: "",
  is_scef_member: false,
  consent: false,
  hp: "",
};

export default function CapacityTrainingApply() {
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
      for (const issue of parsed.error.issues) fe[issue.path[0] as string] = issue.message;
      setErrors(fe);
      toast({ title: "Please review the form", description: "Some required fields are missing.", variant: "destructive" });
      return;
    }
    if (form.hp) return;

    setSubmitting(true);
    const d = parsed.data;
    const { error } = await supabase.from("capacity_training_waitlist").insert({
      full_name: d.full_name,
      email: d.email,
      phone: d.phone,
      country: d.country,
      region_state: d.region_state,
      applicant_category: d.applicant_category,
      training_area: d.training_area,
      delivery_preference: d.delivery_preference,
      applying_as: d.applying_as,
      organization_name: d.organization_name || null,
      why_training: d.why_training,
      knowledge_application: d.knowledge_application,
      is_scef_member: d.is_scef_member,
      consent: d.consent,
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
        <title>SCEF Capacity Training Waitlist 2026–2027 | SCEF</title>
        <meta
          name="description"
          content="Apply for SCEF Capacity Training Programs 2026–2027 — teacher training, school leadership, EdTech, inclusive education and more for educators and community leaders across Africa."
        />
        <link rel="canonical" href="https://santoscreations.org/apply/capacity-training" />
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
                alt="SCEF community training session"
                className="h-full w-full object-cover opacity-25"
                width={1600}
                height={900}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-scef-blue-darker via-scef-blue-darker/90 to-emerald-900/70" />
            </div>
            <div className="container mx-auto max-w-6xl px-6 md:px-8 py-16 md:py-24">
              <div className="inline-flex items-center gap-2 rounded-full border border-scef-gold/50 bg-scef-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold">
                <GraduationCap className="h-3.5 w-3.5" />
                Program year · 2026–2027
              </div>
              <h1 className="mt-5 max-w-3xl font-display text-3xl font-bold leading-[1.05] tracking-tight md:text-5xl">
                Apply for SCEF Capacity Training Programs
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
                Join the waiting list for SCEF training programs designed for teachers, school leaders, youth,
                women, local chapter members, volunteers, ambassadors, and community project leaders.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-scef-gold hover:bg-scef-gold/90 text-scef-blue-darker font-semibold">
                  <a href="#apply">
                    Join Capacity Training Waitlist
                    <ArrowRight className="ms-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-scef-blue-darker">
                  <Link to="/partner-with-us?project=capacity-training">Partner With SCEF</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-scef-blue-darker">
                  <Link to="/wallet/donate?project=capacity-training">Sponsor a Trainee</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <section className="bg-white py-14 md:py-20">
            <div className="container mx-auto max-w-5xl px-6 md:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">
                Program purpose
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-4xl">
                Building capacity across the education ecosystem.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
                SCEF Capacity Training Programs strengthen the knowledge, skills, and leadership of educators,
                school leaders, community workers, and project coordinators across Africa — combining
                classroom innovation, digital learning, inclusive education, and impact reporting.
              </p>

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

          {/* TRAINING AREAS */}
          <section className="bg-muted/40 border-y border-border py-14 md:py-20">
            <div className="container mx-auto max-w-5xl px-6 md:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">
                Training areas
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-[2rem]">
                Choose your training focus
              </h2>
              <ul className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
                {TRAINING_AREAS.map((area) => (
                  <li
                    key={area}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm text-scef-blue-darker"
                  >
                    <BookOpen className="mt-0.5 h-4 w-4 flex-none text-emerald-700" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="container mx-auto max-w-6xl px-6 md:px-8 mt-10">
              <img
                src={sideImage}
                alt="SCEF programs landscape"
                loading="lazy"
                width={1600}
                height={900}
                className="w-full rounded-2xl object-cover shadow-xl"
              />
            </div>
          </section>

          {/* APPLY FORM */}
          <section id="apply" className="bg-white py-14 md:py-20">
            <div className="container mx-auto max-w-3xl px-6 md:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">
                Application form
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-[2rem]">
                Join the Capacity Training Waitlist
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Complete this short form to express interest in the 2026–2027 capacity training program year.
              </p>

              <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900 flex gap-3">
                <ShieldAlert className="mt-0.5 h-5 w-5 flex-none" />
                <p className="text-sm leading-relaxed">
                  Joining the waitlist does not guarantee selection. SCEF will review applications based on
                  training area, eligibility, available trainers, and partner support.
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
                    <p className="mt-3 text-sm leading-relaxed text-scef-blue-darker">
                      Your SCEF Capacity Training waitlist application has been received. SCEF will review
                      applications based on training area, applicant category, delivery preference, and
                      available trainers and partner support.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <Button asChild variant="outline">
                        <Link to="/programs">Explore SCEF Programs</Link>
                      </Button>
                      <Button asChild className="bg-scef-blue-darker text-white hover:bg-scef-blue-darker/90">
                        <Link to="/get-involved/membership">Become a Member</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={onSubmit} className="mt-8 space-y-6">
                  {/* honeypot */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.hp}
                    onChange={(e) => set("hp", e.target.value)}
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                    aria-hidden="true"
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="full_name">Full name *</Label>
                      <Input id="full_name" value={form.full_name} onChange={(e) => set("full_name", e.target.value)} />
                      {errors.full_name && <p className="mt-1 text-xs text-destructive">{errors.full_name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
                      {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone / WhatsApp *</Label>
                      <Input id="phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                      {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                    </div>
                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Input id="country" value={form.country} onChange={(e) => set("country", e.target.value)} />
                      {errors.country && <p className="mt-1 text-xs text-destructive">{errors.country}</p>}
                    </div>
                    <div>
                      <Label htmlFor="region_state">Region / State *</Label>
                      <Input id="region_state" value={form.region_state} onChange={(e) => set("region_state", e.target.value)} />
                      {errors.region_state && <p className="mt-1 text-xs text-destructive">{errors.region_state}</p>}
                    </div>
                    <div>
                      <Label>Applicant category *</Label>
                      <Select value={form.applicant_category} onValueChange={(v) => set("applicant_category", v)}>
                        <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                        <SelectContent>
                          {APPLICANT_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      {errors.applicant_category && <p className="mt-1 text-xs text-destructive">{errors.applicant_category}</p>}
                    </div>
                    <div>
                      <Label>Training area of interest *</Label>
                      <Select value={form.training_area} onValueChange={(v) => set("training_area", v)}>
                        <SelectTrigger><SelectValue placeholder="Select training area" /></SelectTrigger>
                        <SelectContent>
                          {TRAINING_AREAS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      {errors.training_area && <p className="mt-1 text-xs text-destructive">{errors.training_area}</p>}
                    </div>
                    <div>
                      <Label>Delivery preference *</Label>
                      <Select value={form.delivery_preference} onValueChange={(v) => set("delivery_preference", v)}>
                        <SelectTrigger><SelectValue placeholder="Online / Physical / Hybrid" /></SelectTrigger>
                        <SelectContent>
                          {DELIVERY_PREFS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      {errors.delivery_preference && <p className="mt-1 text-xs text-destructive">{errors.delivery_preference}</p>}
                    </div>
                    <div>
                      <Label>Applying as *</Label>
                      <Select value={form.applying_as} onValueChange={(v) => set("applying_as", v)}>
                        <SelectTrigger><SelectValue placeholder="Individual or Organization" /></SelectTrigger>
                        <SelectContent>
                          {APPLYING_AS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      {errors.applying_as && <p className="mt-1 text-xs text-destructive">{errors.applying_as}</p>}
                    </div>
                    {form.applying_as === "Organization" && (
                      <div>
                        <Label htmlFor="organization_name">Organization name</Label>
                        <Input
                          id="organization_name"
                          value={form.organization_name}
                          onChange={(e) => set("organization_name", e.target.value)}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="why_training">Why do you want this training? *</Label>
                    <Textarea
                      id="why_training"
                      rows={4}
                      value={form.why_training}
                      onChange={(e) => set("why_training", e.target.value)}
                    />
                    {errors.why_training && <p className="mt-1 text-xs text-destructive">{errors.why_training}</p>}
                  </div>

                  <div>
                    <Label htmlFor="knowledge_application">How will you apply the knowledge? *</Label>
                    <Textarea
                      id="knowledge_application"
                      rows={4}
                      value={form.knowledge_application}
                      onChange={(e) => set("knowledge_application", e.target.value)}
                    />
                    {errors.knowledge_application && <p className="mt-1 text-xs text-destructive">{errors.knowledge_application}</p>}
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                    <Checkbox
                      id="is_scef_member"
                      checked={form.is_scef_member}
                      onCheckedChange={(c) => set("is_scef_member", c === true)}
                    />
                    <Label htmlFor="is_scef_member" className="text-sm leading-relaxed">
                      I am already a SCEF member.
                    </Label>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                    <Checkbox
                      id="consent"
                      checked={form.consent}
                      onCheckedChange={(c) => set("consent", c === true)}
                    />
                    <Label htmlFor="consent" className="text-sm leading-relaxed">
                      I consent to SCEF storing the information I submit for the purpose of reviewing this
                      capacity training waitlist application. *
                    </Label>
                  </div>
                  {errors.consent && <p className="text-xs text-destructive">{errors.consent}</p>}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="w-full bg-scef-blue-darker text-white hover:bg-scef-blue-darker/90 font-semibold"
                  >
                    {submitting ? (
                      <><Loader2 className="me-2 h-4 w-4 animate-spin" /> Submitting…</>
                    ) : (
                      <>Join Capacity Training Waitlist <ArrowRight className="ms-2 h-4 w-4" /></>
                    )}
                  </Button>
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
