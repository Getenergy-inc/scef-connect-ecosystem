import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams, useNavigate } from "react-router-dom";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, MapPin, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const COUNTRIES = [
  "Nigeria","Ghana","Kenya","South Africa","Rwanda","Uganda","Tanzania","Ethiopia",
  "Egypt","Morocco","Senegal","Côte d'Ivoire","Cameroon","Zambia","Zimbabwe","Botswana",
  "Namibia","Sierra Leone","Liberia","Gambia","Mali","Burkina Faso","Benin","Togo",
  "Niger","Chad","DR Congo","Angola","Mozambique","Madagascar","Malawi","Sudan",
  "South Sudan","Somalia","Tunisia","Algeria","Libya","Mauritania","Mauritius","Lesotho",
  "Eswatini","Guinea","Guinea-Bissau","Cabo Verde","São Tomé and Príncipe","Comoros",
  "Djibouti","Eritrea","Burundi","Central African Republic","Republic of Congo","Gabon",
  "Equatorial Guinea","Seychelles",
  // Diaspora
  "United States","Canada","United Kingdom","France","Germany","Italy","Spain",
  "Netherlands","Belgium","Portugal","Ireland","UAE","Saudi Arabia","Qatar","China",
  "India","Japan","Australia","New Zealand","Brazil","Argentina","Other",
];

const CHAPTER_TYPES = [
  { value: "country", label: "Country Chapter", desc: "National coordinating chapter" },
  { value: "state", label: "State / Regional Chapter", desc: "State or provincial level" },
  { value: "city", label: "City Chapter", desc: "Urban / metropolitan chapter" },
  { value: "campus", label: "Campus Chapter", desc: "University or college" },
  { value: "diaspora", label: "Diaspora Chapter", desc: "Africans abroad / Friends of Africa" },
  { value: "community", label: "Community Chapter", desc: "Town, village or community-led" },
];

const PARTICIPATION = [
  { value: "member", label: "Local Chapter Member" },
  { value: "ambassador", label: "Local Chapter Ambassador" },
  { value: "volunteer", label: "Project Volunteer" },
];

const schema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  country: z.string().min(1, "Select a country"),
  city: z.string().trim().min(2, "Enter your city").max(120),
  chapter_type: z.string().min(1, "Select a chapter type"),
  participation_mode: z.string().min(1),
  motivation: z.string().trim().max(1000).optional().or(z.literal("")),
});

const ChapterSignup = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    country: params.get("country") ?? "",
    city: params.get("city") ?? "",
    chapter_type: params.get("type") ?? "",
    participation_mode: params.get("mode") ?? "member",
    motivation: "",
  });

  const countryOptions = useMemo(() => COUNTRIES, []);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const first = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
      toast.error(first ?? "Please check the form");
      return;
    }
    setLoading(true);
    const d = parsed.data;
    const { error } = await supabase.from("chapter_signups").insert([{
      full_name: d.full_name,
      email: d.email,
      country: d.country,
      city: d.city,
      chapter_type: d.chapter_type,
      participation_mode: d.participation_mode,
      phone: d.phone || null,
      motivation: d.motivation || null,
    }]);
    setLoading(false);
    if (error) {
      toast.error("Could not submit. Please try again.");
      return;
    }
    toast.success("Signup received — welcome to SCEF!");
    setSubmitted(true);
  };

  return (
    <>
      <Helmet>
        <title>Join SCEF Through Your Local Chapter | Signup</title>
        <meta name="description" content="Sign up to join SCEF through your local chapter. Select your country, city, and chapter type to get connected." />
        <link rel="canonical" href="/get-involved/join-chapter/signup" />
      </Helmet>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="border-b bg-gradient-to-br from-scef-blue-darker/5 to-scef-gold/5">
          <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-sm text-scef-blue-darker mb-3">
              <MapPin className="h-4 w-4" /> Local Chapter Signup
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Join SCEF Through Your Local Chapter
            </h1>
            <p className="mt-3 text-muted-foreground">
              Connect with SCEF in your country and city. Tell us where you are and which
              chapter type best fits you — we'll route you to the right local team.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10 max-w-3xl">
          {submitted ? (
            <Card>
              <CardContent className="py-12 text-center">
                <CheckCircle2 className="h-14 w-14 mx-auto text-scef-gold" />
                <h2 className="mt-4 text-2xl font-semibold">You're in.</h2>
                <p className="mt-2 text-muted-foreground">
                  Your local chapter signup for <strong>{form.city}, {form.country}</strong> has been received.
                  A SCEF coordinator will contact you shortly with next steps.
                </p>
                <div className="mt-6 flex flex-wrap gap-3 justify-center">
                  <Button onClick={() => navigate("/chapters")}>Browse Chapters</Button>
                  <Button variant="outline" onClick={() => navigate("/get-involved")}>Explore Get Involved</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-scef-blue-darker" /> Chapter signup form
                </CardTitle>
                <CardDescription>All fields marked * are required.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full name *</Label>
                      <Input id="full_name" value={form.full_name}
                        onChange={(e) => update("full_name", e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" value={form.email}
                        onChange={(e) => update("email", e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (optional)</Label>
                      <Input id="phone" value={form.phone}
                        onChange={(e) => update("phone", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Country *</Label>
                      <Select value={form.country} onValueChange={(v) => update("country", v)}>
                        <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                        <SelectContent className="max-h-72">
                          {countryOptions.map((c) => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-1">
                      <Label htmlFor="city">City *</Label>
                      <Input id="city" placeholder="e.g. Lagos, Nairobi, London"
                        value={form.city} onChange={(e) => update("city", e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Chapter type *</Label>
                      <Select value={form.chapter_type} onValueChange={(v) => update("chapter_type", v)}>
                        <SelectTrigger><SelectValue placeholder="Select chapter type" /></SelectTrigger>
                        <SelectContent>
                          {CHAPTER_TYPES.map((t) => (
                            <SelectItem key={t.value} value={t.value}>
                              {t.label} — <span className="text-muted-foreground">{t.desc}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>How would you like to participate? *</Label>
                    <RadioGroup
                      value={form.participation_mode}
                      onValueChange={(v) => update("participation_mode", v)}
                      className="grid sm:grid-cols-3 gap-3"
                    >
                      {PARTICIPATION.map((p) => (
                        <label key={p.value}
                          className="flex items-center gap-3 rounded-md border p-3 cursor-pointer hover:bg-muted/40">
                          <RadioGroupItem value={p.value} id={`p-${p.value}`} />
                          <span className="text-sm font-medium">{p.label}</span>
                        </label>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motivation">Why do you want to join? (optional)</Label>
                    <Textarea id="motivation" rows={4} maxLength={1000}
                      placeholder="Share a short note about your interest, skills, or projects you'd like to support."
                      value={form.motivation}
                      onChange={(e) => update("motivation", e.target.value)} />
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button type="submit" disabled={loading} className="bg-scef-blue-darker hover:bg-scef-blue-darker/90">
                      {loading ? "Submitting…" : "Submit chapter signup"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => navigate("/chapters")}>
                      Browse chapters instead
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ChapterSignup;
