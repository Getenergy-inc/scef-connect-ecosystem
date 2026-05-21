import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Megaphone, Globe, Building2, GraduationCap, MapPin, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const COUNTRIES = [
  "Nigeria","Ghana","Kenya","South Africa","Rwanda","Uganda","Tanzania","Ethiopia",
  "Egypt","Morocco","Senegal","Côte d'Ivoire","Cameroon","Zambia","Zimbabwe","Botswana",
  "Namibia","Sierra Leone","Liberia","Gambia","Mali","Burkina Faso","Benin","Togo",
  "Niger","Chad","DR Congo","Angola","Mozambique","Madagascar","Malawi","Sudan",
  "South Sudan","Somalia","Tunisia","Algeria","Libya","Mauritania","Mauritius","Lesotho",
  "Eswatini","Guinea","Guinea-Bissau","Cabo Verde","Comoros","Djibouti","Eritrea",
  "Burundi","Central African Republic","Republic of Congo","Gabon","Equatorial Guinea",
  "Seychelles","United States","Canada","United Kingdom","France","Germany","UAE",
  "Saudi Arabia","Australia","Brazil","Other",
];

type RoleKey = "country" | "regional" | "city" | "campus" | "community" | "diaspora";

const ROLES: { key: RoleKey; title: string; desc: string; Icon: any }[] = [
  { key: "country",   title: "Country Ambassador",   desc: "Represent SCEF nationally and lead a country chapter.", Icon: Globe },
  { key: "regional",  title: "Regional / State Ambassador", desc: "Lead at state, province or regional level.",       Icon: MapPin },
  { key: "city",      title: "City Ambassador",      desc: "Coordinate SCEF activities in your city.",                Icon: Building2 },
  { key: "campus",    title: "Campus Ambassador",    desc: "Champion SCEF at your university or college.",            Icon: GraduationCap },
  { key: "community", title: "Community Ambassador", desc: "Lead in your town, village or community.",                Icon: Users },
  { key: "diaspora",  title: "Diaspora Ambassador",  desc: "Represent SCEF abroad with the African diaspora.",        Icon: Megaphone },
];

const TIME_COMMITMENTS = ["1–3 hrs / week", "4–6 hrs / week", "7–10 hrs / week", "10+ hrs / week"];
const AGE_RANGES = ["Under 18", "18–24", "25–34", "35–44", "45–54", "55+"];
const YEARS = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5+", "Postgraduate", "Recent graduate"];

const schema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  country: z.string().min(1, "Select a country"),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  role_type: z.enum(["country","regional","city","campus","community","diaspora"]),
  region: z.string().trim().max(120).optional().or(z.literal("")),
  institution: z.string().trim().max(160).optional().or(z.literal("")),
  year_of_study: z.string().trim().max(60).optional().or(z.literal("")),
  community_name: z.string().trim().max(160).optional().or(z.literal("")),
  profession: z.string().trim().max(120).optional().or(z.literal("")),
  age_range: z.string().trim().max(20).optional().or(z.literal("")),
  languages: z.string().trim().max(200).optional().or(z.literal("")),
  social_handles: z.string().trim().max(300).optional().or(z.literal("")),
  time_commitment: z.string().trim().max(40).optional().or(z.literal("")),
  leadership_experience: z.string().trim().max(1500).optional().or(z.literal("")),
  motivation: z.string().trim().min(40, "Tell us why in at least 40 characters").max(2000),
});

const AmbassadorApply = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const initialRole = (params.get("role") as RoleKey) || "country";
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    country: params.get("country") ?? "",
    city: "",
    role_type: initialRole,
    region: "",
    institution: "",
    year_of_study: "",
    community_name: "",
    profession: "",
    age_range: "",
    languages: "",
    social_handles: "",
    time_commitment: "",
    leadership_experience: "",
    motivation: "",
  });
  const [agree, setAgree] = useState(false);

  const role = form.role_type as RoleKey;
  const u = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const roleFieldsRequired = useMemo(() => {
    const m: Record<string, string> = {};
    if (role === "regional") m.region = "State / region is required";
    if (role === "city") m.city = "City is required";
    if (role === "campus") { m.institution = "Institution is required"; m.year_of_study = "Year is required"; }
    if (role === "community") m.community_name = "Community / town is required";
    return m;
  }, [role]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) { toast.error("Please agree to the Ambassador Code of Conduct"); return; }

    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const first = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
      toast.error(first ?? "Please check the form");
      return;
    }
    for (const [k, msg] of Object.entries(roleFieldsRequired)) {
      if (!((form as any)[k] || "").toString().trim()) { toast.error(msg); return; }
    }

    setLoading(true);
    const d = parsed.data;
    const id = crypto.randomUUID();
    const { error } = await supabase.from("ambassador_applications").insert([{
      id,
      full_name: d.full_name,
      email: d.email,
      phone: d.phone || null,
      country: d.country,
      city: d.city || null,
      role_type: d.role_type,
      region: d.region || null,
      institution: d.institution || null,
      year_of_study: d.year_of_study || null,
      community_name: d.community_name || null,
      profession: d.profession || null,
      age_range: d.age_range || null,
      languages: d.languages || null,
      social_handles: d.social_handles || null,
      time_commitment: d.time_commitment || null,
      leadership_experience: d.leadership_experience || null,
      motivation: d.motivation,
    }]);
    if (error) {
      setLoading(false);
      toast.error("Could not submit application. Please try again.");
      return;
    }

    // Fire-and-forget confirmation email (no-op if email infra not yet active)
    try {
      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "ambassador-application-confirmation",
          recipientEmail: d.email,
          idempotencyKey: `ambassador-apply-${id}`,
          templateData: {
            name: d.full_name,
            roleTitle: ROLES.find((r) => r.key === d.role_type)?.title ?? "SCEF Ambassador",
            country: d.country,
          },
        },
      });
    } catch (_) { /* email infra optional */ }

    setLoading(false);
    setSubmitted(true);
    toast.success("Application submitted — check your email for confirmation.");
  };

  return (
    <>
      <Helmet>
        <title>Apply as a SCEF Ambassador | Application Form</title>
        <meta name="description" content="Apply to become a SCEF Ambassador. Choose your ambassador role and submit your application to represent SCEF locally, regionally, or globally." />
        <link rel="canonical" href="/ambassador/apply" />
      </Helmet>
      <Header />

      <main className="min-h-screen bg-background">
        <section className="border-b bg-gradient-to-br from-scef-blue-darker/5 to-scef-gold/10">
          <div className="container mx-auto max-w-4xl px-6 py-12 md:py-16">
            <div className="inline-flex items-center gap-2 text-sm text-scef-blue-darker mb-3">
              <Megaphone className="h-4 w-4" /> Ambassador Application
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-scef-blue-darker">
              Apply as a SCEF Ambassador
            </h1>
            <p className="mt-3 text-muted-foreground">
              Represent SCEF in your country, region, city, campus, community, or the diaspora.
              Select your ambassador role and complete the application — you'll receive a confirmation email after submitting.
            </p>
          </div>
        </section>

        <section className="container mx-auto max-w-4xl px-6 py-10">
          {submitted ? (
            <Card>
              <CardContent className="py-12 text-center">
                <CheckCircle2 className="h-14 w-14 mx-auto text-scef-gold" />
                <h2 className="mt-4 text-2xl font-semibold">Application received</h2>
                <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
                  Thank you, {form.full_name.split(" ")[0]}. Your application for
                  <strong> {ROLES.find(r => r.key === role)?.title}</strong> in {form.country} has been received.
                  We've sent a confirmation to <strong>{form.email}</strong>. A SCEF coordinator will be in touch
                  with next steps.
                </p>
                <div className="mt-6 flex flex-wrap gap-3 justify-center">
                  <Button onClick={() => navigate("/get-involved")}>Explore Get Involved</Button>
                  <Button variant="outline" onClick={() => navigate("/chapters/signup")}>Join a Local Chapter</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Role selection */}
              <Card>
                <CardHeader>
                  <CardTitle>1. Choose your ambassador role</CardTitle>
                  <CardDescription>Each role has slightly different requirements.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {ROLES.map((r) => {
                      const active = role === r.key;
                      return (
                        <button
                          type="button"
                          key={r.key}
                          onClick={() => u("role_type", r.key)}
                          className={`text-left rounded-xl border p-4 transition ${
                            active
                              ? "border-scef-blue-darker bg-scef-blue-darker/5 ring-1 ring-scef-blue-darker/20"
                              : "border-border hover:bg-muted/40"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <r.Icon className="h-4 w-4 text-scef-blue-darker" />
                            <span className="font-semibold text-sm">{r.title}</span>
                          </div>
                          <p className="mt-1.5 text-xs text-muted-foreground">{r.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Personal */}
              <Card>
                <CardHeader>
                  <CardTitle>2. About you</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full name *</Label>
                    <Input id="full_name" value={form.full_name} onChange={(e) => u("full_name", e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" value={form.email} onChange={(e) => u("email", e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone / WhatsApp</Label>
                    <Input id="phone" value={form.phone} onChange={(e) => u("phone", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Age range</Label>
                    <Select value={form.age_range} onValueChange={(v) => u("age_range", v)}>
                      <SelectTrigger><SelectValue placeholder="Select age range" /></SelectTrigger>
                      <SelectContent>{AGE_RANGES.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profession">Profession / occupation</Label>
                    <Input id="profession" value={form.profession} onChange={(e) => u("profession", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="languages">Languages spoken</Label>
                    <Input id="languages" placeholder="e.g. English, French, Swahili"
                      value={form.languages} onChange={(e) => u("languages", e.target.value)} />
                  </div>
                </CardContent>
              </Card>

              {/* Location + role-specific */}
              <Card>
                <CardHeader>
                  <CardTitle>3. Where you'll represent SCEF</CardTitle>
                  <CardDescription>Role-specific fields adjust based on your selection above.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Country *</Label>
                    <Select value={form.country} onValueChange={(v) => u("country", v)}>
                      <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                      <SelectContent className="max-h-72">
                        {COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  {(role === "city" || role === "regional" || role === "campus" || role === "community" || role === "diaspora") && (
                    <div className="space-y-2">
                      <Label htmlFor="city">City {role === "city" && "*"}</Label>
                      <Input id="city" value={form.city} onChange={(e) => u("city", e.target.value)} />
                    </div>
                  )}

                  {role === "regional" && (
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="region">State / region *</Label>
                      <Input id="region" placeholder="e.g. Lagos State, Eastern Cape"
                        value={form.region} onChange={(e) => u("region", e.target.value)} />
                    </div>
                  )}

                  {role === "campus" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="institution">University / college *</Label>
                        <Input id="institution" value={form.institution}
                          onChange={(e) => u("institution", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Year of study *</Label>
                        <Select value={form.year_of_study} onValueChange={(v) => u("year_of_study", v)}>
                          <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
                          <SelectContent>{YEARS.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {role === "community" && (
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="community_name">Community / town *</Label>
                      <Input id="community_name" value={form.community_name}
                        onChange={(e) => u("community_name", e.target.value)} />
                    </div>
                  )}

                  {role === "diaspora" && (
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="region">Diaspora region / country of residence</Label>
                      <Input id="region" placeholder="e.g. London, UK"
                        value={form.region} onChange={(e) => u("region", e.target.value)} />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Commitment + motivation */}
              <Card>
                <CardHeader>
                  <CardTitle>4. Experience & commitment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Weekly time commitment</Label>
                      <Select value={form.time_commitment} onValueChange={(v) => u("time_commitment", v)}>
                        <SelectTrigger><SelectValue placeholder="Select availability" /></SelectTrigger>
                        <SelectContent>{TIME_COMMITMENTS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="social_handles">Social handles (optional)</Label>
                      <Input id="social_handles" placeholder="LinkedIn, X, Instagram"
                        value={form.social_handles} onChange={(e) => u("social_handles", e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leadership_experience">Leadership / advocacy experience (optional)</Label>
                    <Textarea id="leadership_experience" rows={3} maxLength={1500}
                      placeholder="Briefly share past roles, projects, or community work."
                      value={form.leadership_experience}
                      onChange={(e) => u("leadership_experience", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motivation">Why do you want to be a SCEF Ambassador? *</Label>
                    <Textarea id="motivation" rows={5} maxLength={2000} required
                      placeholder="Tell us what motivates you and what you'd like to achieve."
                      value={form.motivation}
                      onChange={(e) => u("motivation", e.target.value)} />
                  </div>

                  <label className="flex items-start gap-3 rounded-md border p-3 text-sm">
                    <Checkbox checked={agree} onCheckedChange={(v) => setAgree(!!v)} className="mt-0.5" />
                    <span>
                      I agree to represent SCEF in line with the Ambassador Code of Conduct and
                      uphold its values of education advocacy, integrity, and inclusion.
                    </span>
                  </label>
                </CardContent>
              </Card>

              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit" disabled={loading} size="lg"
                  className="bg-scef-blue-darker hover:bg-scef-blue-darker/90">
                  {loading ? "Submitting…" : "Submit ambassador application"}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate("/get-involved")}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AmbassadorApply;
