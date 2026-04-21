import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { logger } from "@/lib/logger";
import { CheckCircle2, ArrowRight, ShieldCheck, FileSearch, Wallet, BarChart3 } from "lucide-react";

const FOCUS_AREAS = [
  "Scholarships & Bursaries",
  "School Infrastructure (RMSA)",
  "Digital Learning Access",
  "Women & Girls Education",
  "Special Needs Education",
  "Teacher Development",
  "eLibrary & Knowledge Access",
  "Cross-Border CSR Programs",
];

const REGIONS = [
  "West Africa",
  "East Africa",
  "Southern Africa",
  "North Africa",
  "Central Africa",
  "Diaspora",
];

const FUNNEL_STEPS = [
  { icon: FileSearch, title: "1. Intake & Discovery", desc: "Submit your CSR mandate. We respond within 5 business days." },
  { icon: ShieldCheck, title: "2. Scoping & Agreement", desc: "Co-design focus area, KPIs, geography, and governance terms." },
  { icon: Wallet, title: "3. Allocation & Delivery", desc: "Funds flow into a segregated account; chapters execute on the ground." },
  { icon: BarChart3, title: "4. Tracking & Reporting", desc: "Quarterly KPI dashboards and annual impact certificate." },
];

const CsrFundingIntake = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    organization_name: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    country: "",
    organization_type: "",
    funding_range: "",
    focus_areas: [] as string[],
    preferred_regions: [] as string[],
    timeline: "",
    message: "",
  });

  const toggleArr = (key: "focus_areas" | "preferred_regions", value: string) => {
    setForm((p) => ({
      ...p,
      [key]: p[key].includes(value)
        ? p[key].filter((v) => v !== value)
        : [...p[key], value],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.organization_name || !form.contact_name || !form.contact_email) {
      toast.error("Please fill in organization, contact name, and email.");
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("csr_inquiries").insert({
        ...form,
        source: "csr_funding_intake",
      });
      if (error) throw error;
      setSubmitted(true);
      toast.success("Inquiry submitted. Our partnerships team will be in touch.");
    } catch (err) {
      logger.error("CSR inquiry submission failed", err);
      toast.error("Submission failed. Please try again or email partners@santoscreations.org.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>CSR Funding Intake | SCEF Partnership Funnel</title>
        <meta
          name="description"
          content="Submit your CSR mandate to SCEF. From discovery to verified impact reporting — a transparent funnel for corporate, institutional, and diaspora education funding."
        />
        <link rel="canonical" href="https://santoscreations.org/csr-funding-intake" />
      </Helmet>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-scef-blue-darker text-white py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <p className="text-scef-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              CSR Funding Funnel
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-tight">
              From CSR mandate to<br />verified education impact.
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed">
              Tell us about your funding intent. We&rsquo;ll scope the project, allocate funds into a
              segregated account, deliver through verified chapters, and report quarterly.
            </p>
          </div>
        </section>

        {/* Funnel steps */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-4 gap-6">
              {FUNNEL_STEPS.map((s, i) => (
                <Card key={i} className="border-l-4 border-l-scef-gold">
                  <CardContent className="p-6">
                    <s.icon className="w-8 h-8 text-scef-gold mb-3" />
                    <h3 className="font-bold text-scef-blue-darker mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Intake form / success state */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            {submitted ? (
              <Card className="border-2 border-scef-gold/30">
                <CardContent className="p-12 text-center">
                  <CheckCircle2 className="w-16 h-16 text-scef-gold mx-auto mb-6" />
                  <h2 className="text-3xl font-bold font-heading text-scef-blue-darker mb-4">
                    Thank you. Your inquiry is received.
                  </h2>
                  <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                    A SCEF partnerships lead will reach out within 5 business days to begin scoping.
                    For urgent inquiries, email <strong>partners@santoscreations.org</strong>.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild variant="outline">
                      <Link to="/csr-fund-management">Back to CSR overview</Link>
                    </Button>
                    <Button asChild>
                      <Link to="/programs">Explore our programs</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-heading text-scef-blue-darker">
                    Funding Intake Form
                  </CardTitle>
                  <CardDescription>
                    All fields marked with * are required. Your information is reviewed only by SCEF
                    partnerships and governance leads.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="organization_name">Organization name *</Label>
                        <Input
                          id="organization_name"
                          required
                          value={form.organization_name}
                          onChange={(e) => setForm({ ...form, organization_name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="organization_type">Organization type</Label>
                        <Select
                          value={form.organization_type}
                          onValueChange={(v) => setForm({ ...form, organization_type: v })}
                        >
                          <SelectTrigger id="organization_type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="corporate">Corporate</SelectItem>
                            <SelectItem value="foundation">Foundation</SelectItem>
                            <SelectItem value="government">Government / Multilateral</SelectItem>
                            <SelectItem value="diaspora">Diaspora group</SelectItem>
                            <SelectItem value="individual">Individual donor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact_name">Contact name *</Label>
                        <Input
                          id="contact_name"
                          required
                          value={form.contact_name}
                          onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact_email">Contact email *</Label>
                        <Input
                          id="contact_email"
                          type="email"
                          required
                          value={form.contact_email}
                          onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact_phone">Phone</Label>
                        <Input
                          id="contact_phone"
                          value={form.contact_phone}
                          onChange={(e) => setForm({ ...form, contact_phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country / HQ</Label>
                        <Input
                          id="country"
                          value={form.country}
                          onChange={(e) => setForm({ ...form, country: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="funding_range">Indicative funding range</Label>
                        <Select
                          value={form.funding_range}
                          onValueChange={(v) => setForm({ ...form, funding_range: v })}
                        >
                          <SelectTrigger id="funding_range">
                            <SelectValue placeholder="Select range (USD)" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under_5k">Under $5,000</SelectItem>
                            <SelectItem value="5k_50k">$5,000 – $50,000</SelectItem>
                            <SelectItem value="50k_250k">$50,000 – $250,000</SelectItem>
                            <SelectItem value="250k_plus">$250,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeline">Preferred timeline</Label>
                        <Select
                          value={form.timeline}
                          onValueChange={(v) => setForm({ ...form, timeline: v })}
                        >
                          <SelectTrigger id="timeline">
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediate (this quarter)</SelectItem>
                            <SelectItem value="6_months">Next 6 months</SelectItem>
                            <SelectItem value="this_year">This fiscal year</SelectItem>
                            <SelectItem value="multi_year">Multi-year programme</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Focus areas of interest</Label>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {FOCUS_AREAS.map((area) => (
                          <label
                            key={area}
                            className="flex items-start gap-2 p-2 rounded hover:bg-muted/50 cursor-pointer"
                          >
                            <Checkbox
                              checked={form.focus_areas.includes(area)}
                              onCheckedChange={() => toggleArr("focus_areas", area)}
                            />
                            <span className="text-sm leading-tight">{area}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Preferred regions</Label>
                      <div className="grid sm:grid-cols-3 gap-2">
                        {REGIONS.map((r) => (
                          <label
                            key={r}
                            className="flex items-start gap-2 p-2 rounded hover:bg-muted/50 cursor-pointer"
                          >
                            <Checkbox
                              checked={form.preferred_regions.includes(r)}
                              onCheckedChange={() => toggleArr("preferred_regions", r)}
                            />
                            <span className="text-sm">{r}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Tell us about your CSR mandate</Label>
                      <Textarea
                        id="message"
                        rows={5}
                        placeholder="Goals, ESG alignment, expected outcomes, any constraints…"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <Button type="submit" disabled={isSubmitting} className="flex-1">
                        {isSubmitting ? "Submitting…" : "Submit funding inquiry"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button asChild type="button" variant="outline">
                        <Link to="/csr-fund-management">Learn more about CSR services</Link>
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CsrFundingIntake;
