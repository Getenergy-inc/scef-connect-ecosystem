import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { ProgramTemplateAppendix } from "@/components/programs/template/ProgramTemplateAppendix";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";
import {
  WASH_NEEDS_CATEGORIES,
  WASH_SPONSORSHIP_TYPES,
  type WashSponsorshipType,
} from "@/lib/wash";
import {
  Droplets,
  Heart,
  School as SchoolIcon,
  ShieldCheck,
  Sparkles,
  Sun,
  Accessibility,
  ArrowRight,
} from "lucide-react";

export default function SchoolWash() {
  return (
    <>
      <Helmet>
        <title>School WASH & Sanitation Support — SCEF</title>
        <meta
          name="description"
          content="Safe toilets, better hygiene, better learning. SCEF's School WASH initiative supports toilet construction, girls' hygiene, handwashing, solar water systems and disability-friendly access across African schools."
        />
        <link rel="canonical" href="https://santoscreations.org/programs/school-wash" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[76px] md:h-[84px]" />

        <main>
          {/* Hero */}
          <section className="bg-scef-blue-darker py-20 text-white md:py-28">
            <div className="container mx-auto px-6 md:px-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-scef-gold">
                EduAid-Africa · Rebuild My School Africa
              </p>
              <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] md:text-6xl">
                Safe Toilets. <span className="text-gradient-gold italic">Better Hygiene.</span> Better Learning.
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-white/75">
                Many schools across Africa still struggle with poor sanitation, unsafe toilets, lack of privacy for girls,
                inadequate handwashing facilities and limited access to clean water. SCEF's School WASH initiative
                supports school sanitation and hygiene interventions that improve health, dignity, attendance and
                learning outcomes.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-scef-gold text-scef-blue-darker hover:bg-scef-gold-hover">
                  <a href="#sponsor"><Heart className="me-2 h-4 w-4" /> Support School WASH</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                  <a href="#nominate">Nominate a School <ArrowRight className="ms-2 h-4 w-4" /></a>
                </Button>
              </div>
            </div>
          </section>

          {/* Focus areas */}
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-6 md:px-8">
              <h2 className="font-display text-3xl font-bold text-scef-blue-darker md:text-4xl">Focus Areas</h2>
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { icon: SchoolIcon, title: "School Toilets", desc: "Construction & renovation of safe, durable toilet blocks." },
                  { icon: Sparkles, title: "Girls' Hygiene & MHM", desc: "Gender-sensitive toilets and menstrual hygiene support." },
                  { icon: Droplets, title: "Handwashing Stations", desc: "Hygiene education and accessible washing systems." },
                  { icon: Sun, title: "Solar Water Systems", desc: "Sustainable water supply where infrastructure is limited." },
                  { icon: Accessibility, title: "Disability-Friendly Access", desc: "Inclusive sanitation for every learner." },
                  { icon: ShieldCheck, title: "Maintenance Training", desc: "Capacity building for school staff and committees." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="rounded-2xl border border-border bg-card p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-scef-gold/15 text-scef-gold-dark">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-scef-blue-darker">{title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Forms */}
          <section className="bg-card/50 py-16 md:py-20">
            <div className="container mx-auto grid gap-10 px-6 md:px-8 lg:grid-cols-2">
              <NominateSchoolForm />
              <SponsorWashForm />
            </div>
          </section>

          {/* Footer CTA */}
          <section className="bg-scef-blue-darker py-16 text-white">
            <div className="container mx-auto px-6 text-center md:px-8">
              <h2 className="font-display text-3xl font-bold md:text-4xl">Partner on School WASH Projects</h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/75">
                Companies and CSR partners can fund WASH at scale through verified school cohorts.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="bg-scef-gold text-scef-blue-darker hover:bg-scef-gold-hover">
                  <Link to="/partner-with-us">Become a CSR Partner</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                  <Link to="/wallet/donate?designation=school-wash">Donate via GFA Wallet</Link>
                </Button>
              </div>
            </div>
          </section>
          <ProgramTemplateAppendix programName="School WASH & Sanitation" />
        </main>

        <Footer />
      </div>
    </>
  );
}

function NominateSchoolForm() {
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [hasWater, setHasWater] = useState(false);
  const [hasDisability, setHasDisability] = useState(false);

  const toggleCat = (c: string) =>
    setCategories((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSubmitting(true);
    try {
      const { error } = await supabase.from("wash_nominations").insert({
        school_name: String(fd.get("school_name") || ""),
        school_address: String(fd.get("school_address") || ""),
        country: String(fd.get("country") || ""),
        region: String(fd.get("region") || "") || null,
        contact_name: String(fd.get("contact_name") || ""),
        contact_email: String(fd.get("contact_email") || ""),
        contact_phone: String(fd.get("contact_phone") || "") || null,
        enrollment_total: fd.get("enrollment_total") ? Number(fd.get("enrollment_total")) : null,
        girls_enrollment: fd.get("girls_enrollment") ? Number(fd.get("girls_enrollment")) : null,
        current_facilities: String(fd.get("current_facilities") || "") || null,
        needs_summary: String(fd.get("needs_summary") || ""),
        needs_categories: categories,
        has_water_access: hasWater,
        has_disability_access: hasDisability,
      });
      if (error) throw error;
      toast({ title: "School nominated", description: "Our team will review and follow up." });
      form.reset();
      setCategories([]);
      setHasWater(false);
      setHasDisability(false);
    } catch (err) {
      logger.error("WASH nomination error", err);
      toast({ title: "Submission failed", description: "Please review the form and try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form id="nominate" onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <h2 className="font-display text-2xl font-bold text-scef-blue-darker">Nominate a School for WASH Support</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Verified nominations are prioritized for sponsor-matched WASH projects.
      </p>
      <div className="mt-6 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="School Name" name="school_name" required />
          <Field label="Country" name="country" required />
        </div>
        <Field label="School Address" name="school_address" required />
        <Field label="Region / State (optional)" name="region" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Contact Name" name="contact_name" required />
          <Field label="Contact Email" name="contact_email" type="email" required />
        </div>
        <Field label="Contact Phone (optional)" name="contact_phone" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Total enrollment" name="enrollment_total" type="number" />
          <Field label="Girls enrollment" name="girls_enrollment" type="number" />
        </div>
        <div>
          <Label htmlFor="current_facilities">Current sanitation facilities (briefly)</Label>
          <Textarea id="current_facilities" name="current_facilities" rows={3} />
        </div>
        <div>
          <Label htmlFor="needs_summary">What does the school need? *</Label>
          <Textarea id="needs_summary" name="needs_summary" required rows={4} />
        </div>
        <div>
          <Label className="mb-2 block">Needs categories</Label>
          <div className="grid gap-2 sm:grid-cols-2">
            {WASH_NEEDS_CATEGORIES.map((c) => (
              <label key={c} className="flex items-center gap-2 text-sm">
                <Checkbox checked={categories.includes(c)} onCheckedChange={() => toggleCat(c)} />
                {c}
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={hasWater} onCheckedChange={(v) => setHasWater(!!v)} />
            School currently has water access
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={hasDisability} onCheckedChange={(v) => setHasDisability(!!v)} />
            Has disability-accessible facilities
          </label>
        </div>
      </div>
      <Button type="submit" disabled={submitting} className="mt-6 w-full bg-scef-blue-darker text-white hover:bg-scef-blue-darker/90">
        {submitting ? "Submitting…" : "Submit Nomination"}
      </Button>
    </form>
  );
}

function SponsorWashForm() {
  const [submitting, setSubmitting] = useState(false);
  const [type, setType] = useState<WashSponsorshipType>("toilets");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSubmitting(true);
    try {
      const { error } = await supabase.from("wash_sponsorships").insert({
        sponsor_name: String(fd.get("sponsor_name") || ""),
        sponsor_email: String(fd.get("sponsor_email") || ""),
        sponsor_phone: String(fd.get("sponsor_phone") || "") || null,
        organization: String(fd.get("organization") || "") || null,
        sponsorship_type: type,
        amount_pledged: fd.get("amount_pledged") ? Number(fd.get("amount_pledged")) : null,
        currency: String(fd.get("currency") || "USD"),
        preferred_country: String(fd.get("preferred_country") || "") || null,
        message: String(fd.get("message") || "") || null,
      });
      if (error) throw error;
      toast({ title: "Pledge received", description: "Thank you. Our partnerships team will reach out shortly." });
      form.reset();
      setType("toilets");
    } catch (err) {
      logger.error("WASH sponsorship error", err);
      toast({ title: "Submission failed", description: "Please review the form and try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form id="sponsor" onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <h2 className="font-display text-2xl font-bold text-scef-blue-darker">Sponsor a WASH Project</h2>
      <p className="mt-2 text-sm text-muted-foreground">Pledge support for toilets, hygiene, water or disability access.</p>
      <div className="mt-6 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Your Name" name="sponsor_name" required />
          <Field label="Email" name="sponsor_email" type="email" required />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Phone (optional)" name="sponsor_phone" />
          <Field label="Organization (optional)" name="organization" />
        </div>
        <div>
          <Label>Sponsorship Type *</Label>
          <Select value={type} onValueChange={(v) => setType(v as WashSponsorshipType)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {WASH_SPONSORSHIP_TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Amount Pledged" name="amount_pledged" type="number" />
          <Field label="Currency" name="currency" defaultValue="USD" />
          <Field label="Preferred Country" name="preferred_country" />
        </div>
        <div>
          <Label htmlFor="message">Message (optional)</Label>
          <Textarea id="message" name="message" rows={3} />
        </div>
      </div>
      <Button type="submit" disabled={submitting} className="mt-6 w-full bg-scef-gold text-scef-blue-darker hover:bg-scef-gold-hover">
        {submitting ? "Submitting…" : "Submit Pledge"}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}{required && " *"}</Label>
      <Input id={name} name={name} type={type} required={required} defaultValue={defaultValue} />
    </div>
  );
}
