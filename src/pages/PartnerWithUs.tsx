import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLocale } from "@/contexts/LocaleContext";
import { supabase } from "@/integrations/supabase/client";
import { 
  Handshake, Building2, Heart, Globe, Users, Award, 
  CheckCircle, ArrowRight, GraduationCap, Banknote,
  Target, BarChart3, FileCheck
} from "lucide-react";
import { toast } from "sonner";
import { logger } from "@/lib/logger";

const PartnerWithUs = () => {
  const { t, isRTL } = useLocale();
  const [formData, setFormData] = useState({
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    partnershipType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const partnershipTypes = [
    {
      id: "corporate",
      icon: Building2,
      titleKey: "partnerWithUs.pathways.corporate.title",
      descKey: "partnerWithUs.pathways.corporate.description",
      benefitsKey: "partnerWithUs.pathways.corporate.benefits",
    },
    {
      id: "institutional",
      icon: GraduationCap,
      titleKey: "partnerWithUs.pathways.institutional.title",
      descKey: "partnerWithUs.pathways.institutional.description",
      benefitsKey: "partnerWithUs.pathways.institutional.benefits",
    },
    {
      id: "funding",
      icon: Banknote,
      titleKey: "partnerWithUs.pathways.funding.title",
      descKey: "partnerWithUs.pathways.funding.description",
      benefitsKey: "partnerWithUs.pathways.funding.benefits",
    },
    {
      id: "technical",
      icon: Target,
      titleKey: "partnerWithUs.pathways.technical.title",
      descKey: "partnerWithUs.pathways.technical.description",
      benefitsKey: "partnerWithUs.pathways.technical.benefits",
    },
  ];

  const impactAreas = [
    { icon: Users, labelKey: "partnerWithUs.impact.chapters", value: "50+" },
    { icon: Globe, labelKey: "partnerWithUs.impact.countries", value: "15+" },
    { icon: Award, labelKey: "partnerWithUs.impact.recognition", value: "NESA" },
    { icon: Heart, labelKey: "partnerWithUs.impact.learners", value: "Growing" },
  ];

  const csrBenefits = t("partnerWithUs.csr.benefits") as unknown as string[] || [
    "Verified project identification and vetting",
    "Milestone-based disbursement tracking",
    "Quarterly impact and outcome reporting",
    "ESG/SDG alignment documentation",
    "Partner branding and recognition"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Use edge function with rate limiting for partnership inquiries
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const response = await fetch(`${supabaseUrl}/functions/v1/submit-partnership-inquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_name: formData.organizationName,
          contact_name: formData.contactName,
          email: formData.email,
          phone: formData.phone || null,
          partnership_type: formData.partnershipType || null,
          message: formData.message || null,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit inquiry');
      }

      toast.success(t("partnerWithUs.form.success"));
      setFormData({
        organizationName: "",
        contactName: "",
        email: "",
        phone: "",
        partnershipType: "",
        message: "",
      });
    } catch (error: unknown) {
      logger.error("Error submitting inquiry:", error);
      const errorMessage = error instanceof Error ? error.message : '';
      if (errorMessage.includes('Too many requests')) {
        toast.error("Too many submissions. Please try again later.");
      } else {
        toast.error(t("partnerWithUs.form.error"));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t("partnerWithUs.hero.title")} - SCEF</title>
        <meta name="description" content={t("partnerWithUs.hero.subtitle")} />
      </Helmet>

      <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <Header />
        
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-20 bg-scef-blue overflow-hidden">
            <div className="absolute inset-0 bg-african-pattern opacity-10" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-scef-gold flex items-center justify-center mb-6 border-2 border-black">
                  <Handshake className="w-10 h-10 text-scef-blue" />
                </div>
                <p className="text-scef-gold font-medium mb-4">{t("partnerWithUs.hero.badge")}</p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  {t("partnerWithUs.hero.title")}
                </h1>
                <p className="text-xl text-white/80 leading-relaxed mb-8">
                  {t("partnerWithUs.hero.subtitle")}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold"
                    onClick={() => document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    {t("partnerWithUs.hero.ctaStart")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10"
                    asChild
                  >
                    <a href="/resources/organizational-profile">{t("partnerWithUs.hero.ctaProfile")}</a>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Why Partner Section */}
          <section className="py-16 bg-muted/30 border-b-2 border-black">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-3xl font-bold text-center text-foreground mb-4">
                  {t("partnerWithUs.why.title")}
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                  {t("partnerWithUs.why.subtitle")}
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-2 border-black hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <div className="w-14 h-14 mx-auto rounded-xl bg-scef-gold/20 flex items-center justify-center mb-4 border-2 border-black">
                        <FileCheck className="w-7 h-7 text-scef-blue" />
                      </div>
                      <CardTitle className="text-lg">{t("partnerWithUs.why.verified.title")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground text-center">
                        {t("partnerWithUs.why.verified.description")}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-black hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <div className="w-14 h-14 mx-auto rounded-xl bg-scef-gold/20 flex items-center justify-center mb-4 border-2 border-black">
                        <BarChart3 className="w-7 h-7 text-scef-blue" />
                      </div>
                      <CardTitle className="text-lg">{t("partnerWithUs.why.esg.title")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground text-center">
                        {t("partnerWithUs.why.esg.description")}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-black hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <div className="w-14 h-14 mx-auto rounded-xl bg-scef-gold/20 flex items-center justify-center mb-4 border-2 border-black">
                        <Globe className="w-7 h-7 text-scef-blue" />
                      </div>
                      <CardTitle className="text-lg">{t("partnerWithUs.why.scale.title")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground text-center">
                        {t("partnerWithUs.why.scale.description")}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Partnership Types */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t("partnerWithUs.pathways.title")}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t("partnerWithUs.pathways.subtitle")}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {partnershipTypes.map((type) => {
                  const benefits = t(type.benefitsKey) as unknown as string[] || [];
                  return (
                    <Card 
                      key={type.id}
                      className={`cursor-pointer transition-all border-2 border-black hover:shadow-lg ${
                        formData.partnershipType === type.id 
                          ? "ring-2 ring-scef-gold bg-scef-blue/5" 
                          : ""
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, partnershipType: type.id }))}
                    >
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-scef-gold/20 flex items-center justify-center flex-shrink-0 border-2 border-black">
                            <type.icon className="w-6 h-6 text-scef-blue" />
                          </div>
                          <div>
                            <CardTitle className="text-xl mb-1">{t(type.titleKey)}</CardTitle>
                            <CardDescription>{t(type.descKey)}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {Array.isArray(benefits) && benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-scef-gold mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CSR Section */}
          <section className="py-16 bg-scef-blue/5 border-y-2 border-black">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                      {t("partnerWithUs.csr.title")}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {t("partnerWithUs.csr.description")}
                    </p>
                    <ul className="space-y-3 mb-6">
                      {Array.isArray(csrBenefits) && csrBenefits.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-scef-gold mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, partnershipType: "corporate" }));
                        document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      {t("partnerWithUs.csr.cta")}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {impactAreas.map((area) => (
                      <Card key={area.labelKey} className="border-2 border-black text-center p-4">
                        <area.icon className="w-8 h-8 text-scef-gold mx-auto mb-2" />
                        <p className="font-display font-bold text-lg text-foreground">{area.value}</p>
                        <p className="text-xs text-muted-foreground">{t(area.labelKey)}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Inquiry Form */}
          <section id="inquiry-form" className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                    {t("partnerWithUs.form.title")}
                  </h2>
                  <p className="text-muted-foreground">
                    {t("partnerWithUs.form.subtitle")}
                  </p>
                </div>

                <Card className="border-2 border-black">
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="organizationName">{t("partnerWithUs.form.organizationName")} *</Label>
                          <Input
                            id="organizationName"
                            required
                            value={formData.organizationName}
                            onChange={(e) => setFormData(prev => ({ ...prev, organizationName: e.target.value }))}
                            className="border-2 border-black"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactName">{t("partnerWithUs.form.contactName")} *</Label>
                          <Input
                            id="contactName"
                            required
                            value={formData.contactName}
                            onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                            className="border-2 border-black"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">{t("partnerWithUs.form.email")} *</Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="border-2 border-black"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">{t("partnerWithUs.form.phone")}</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            className="border-2 border-black"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>{t("partnerWithUs.form.interest")}</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {partnershipTypes.map((type) => (
                            <Button
                              key={type.id}
                              type="button"
                              variant={formData.partnershipType === type.id ? "default" : "outline"}
                              className={`justify-start border-2 border-black ${
                                formData.partnershipType === type.id 
                                  ? "bg-scef-gold text-scef-blue hover:bg-scef-gold-light" 
                                  : ""
                              }`}
                              onClick={() => setFormData(prev => ({ ...prev, partnershipType: type.id }))}
                            >
                              <type.icon className="w-4 h-4 mr-2" />
                              {t(type.titleKey)}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">{t("partnerWithUs.form.message")}</Label>
                        <Textarea
                          id="message"
                          rows={4}
                          placeholder={t("partnerWithUs.form.messagePlaceholder")}
                          value={formData.message}
                          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          className="border-2 border-black"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        size="lg"
                        className="w-full bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? t("partnerWithUs.form.submitting") : t("partnerWithUs.form.submit")}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PartnerWithUs;
