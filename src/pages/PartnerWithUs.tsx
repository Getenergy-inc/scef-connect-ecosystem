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
  CheckCircle, ArrowRight, Briefcase, GraduationCap, Banknote,
  Target, BarChart3, FileCheck
} from "lucide-react";
import { toast } from "sonner";

const PartnerWithUs = () => {
  const { t } = useLocale();
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
      title: "Corporate Partner",
      description: "CSR programs, employee engagement, and brand alignment with education impact",
      benefits: [
        "CSR for Education Funds Management",
        "Impact reporting aligned with ESG/SDG",
        "Employee volunteer programs",
        "Brand visibility on SCEF platforms",
      ],
    },
    {
      id: "institutional",
      icon: GraduationCap,
      title: "Institutional Partner",
      description: "Schools, universities, and education bodies collaborating on standards and programs",
      benefits: [
        "NESA recognition pathways",
        "Curriculum alignment support",
        "Student exchange opportunities",
        "Joint research initiatives",
      ],
    },
    {
      id: "funding",
      icon: Banknote,
      title: "Funding Partner",
      description: "Foundations, multilaterals, and donors supporting scalable education interventions",
      benefits: [
        "Verified project pipelines",
        "Tracked disbursement systems",
        "Quarterly outcome reporting",
        "Direct impact visibility",
      ],
    },
    {
      id: "technical",
      icon: Target,
      title: "Technical Partner",
      description: "Technology providers and service organizations enabling digital transformation",
      benefits: [
        "Platform integration opportunities",
        "Co-branded digital solutions",
        "Innovation lab participation",
        "Technical advisory roles",
      ],
    },
  ];

  const impactAreas = [
    { icon: Users, label: "Chapter Network", value: "50+ Chapters" },
    { icon: Globe, label: "Countries Reached", value: "15+ Countries" },
    { icon: Award, label: "Recognition Programs", value: "NESA-Africa" },
    { icon: Heart, label: "Learners Supported", value: "Growing Impact" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from("partnership_inquiries").insert({
        company_name: formData.organizationName,
        contact_name: formData.contactName,
        email: formData.email,
        phone: formData.phone || null,
        partnership_type: formData.partnershipType || null,
        message: formData.message || null,
      });

      if (error) throw error;

      toast.success("Partnership inquiry submitted! We'll be in touch within 48 hours.");
      setFormData({
        organizationName: "",
        contactName: "",
        email: "",
        phone: "",
        partnershipType: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Partner With Us - SCEF</title>
        <meta name="description" content="Partner with Santos Creations Educational Foundation to drive sustainable education impact across Africa." />
      </Helmet>

      <div className="min-h-screen bg-background">
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
                <p className="text-scef-gold font-medium mb-4">SDG 4 • AU Agenda 2063 Aligned</p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Partner With SCEF
                </h1>
                <p className="text-xl text-white/80 leading-relaxed mb-8">
                  Join Africa's growing education ecosystem. Partner with us to deliver measurable, 
                  sustainable impact through verified programs and transparent accountability.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold"
                    onClick={() => document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Start Partnership Conversation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10"
                    asChild
                  >
                    <a href="/resources/organizational-profile">View Our Profile</a>
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
                  Why Partner With SCEF?
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                  We provide a structured, accountable pathway for education investment with measurable outcomes.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-2 border-black hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <div className="w-14 h-14 mx-auto rounded-xl bg-scef-gold/20 flex items-center justify-center mb-4 border-2 border-black">
                        <FileCheck className="w-7 h-7 text-scef-blue" />
                      </div>
                      <CardTitle className="text-lg">Verified Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground text-center">
                        All projects are verified with milestone tracking, disbursement monitoring, and outcome documentation.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-black hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <div className="w-14 h-14 mx-auto rounded-xl bg-scef-gold/20 flex items-center justify-center mb-4 border-2 border-black">
                        <BarChart3 className="w-7 h-7 text-scef-blue" />
                      </div>
                      <CardTitle className="text-lg">ESG/SDG Reporting</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground text-center">
                        Partner-ready reporting aligned with global sustainability frameworks and compliance standards.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-black hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <div className="w-14 h-14 mx-auto rounded-xl bg-scef-gold/20 flex items-center justify-center mb-4 border-2 border-black">
                        <Globe className="w-7 h-7 text-scef-blue" />
                      </div>
                      <CardTitle className="text-lg">Pan-African Scale</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground text-center">
                        Chapter-driven delivery across Africa's five regions plus the diaspora network.
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
                  Partnership Pathways
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Choose the partnership model that aligns with your organization's goals and capacity.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {partnershipTypes.map((type) => (
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
                          <CardTitle className="text-xl mb-1">{type.title}</CardTitle>
                          <CardDescription>{type.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {type.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-scef-gold mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
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
                      CSR for Education Funds Management
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      SCEF provides comprehensive CSR management services for corporations and institutions 
                      seeking to deploy education funds with accountability and measurable impact.
                    </p>
                    <ul className="space-y-3 mb-6">
                      {[
                        "Verified project identification and vetting",
                        "Milestone-based disbursement tracking",
                        "Quarterly impact and outcome reporting",
                        "ESG/SDG alignment documentation",
                        "Partner branding and recognition",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
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
                      Explore CSR Partnership
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {impactAreas.map((area) => (
                      <Card key={area.label} className="border-2 border-black text-center p-4">
                        <area.icon className="w-8 h-8 text-scef-gold mx-auto mb-2" />
                        <p className="font-display font-bold text-lg text-foreground">{area.value}</p>
                        <p className="text-xs text-muted-foreground">{area.label}</p>
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
                    Start the Conversation
                  </h2>
                  <p className="text-muted-foreground">
                    Tell us about your organization and how you'd like to partner. 
                    Our partnerships team will respond within 48 hours.
                  </p>
                </div>

                <Card className="border-2 border-black">
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="organizationName">Organization Name *</Label>
                          <Input
                            id="organizationName"
                            required
                            value={formData.organizationName}
                            onChange={(e) => setFormData(prev => ({ ...prev, organizationName: e.target.value }))}
                            className="border-2 border-black"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactName">Contact Name *</Label>
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
                          <Label htmlFor="email">Email *</Label>
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
                          <Label htmlFor="phone">Phone</Label>
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
                        <Label>Partnership Interest</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {partnershipTypes.map((type) => (
                            <Button
                              key={type.id}
                              type="button"
                              variant={formData.partnershipType === type.id ? "default" : "outline"}
                              className={`justify-start border-2 border-black ${
                                formData.partnershipType === type.id 
                                  ? "bg-scef-gold text-scef-blue" 
                                  : ""
                              }`}
                              onClick={() => setFormData(prev => ({ ...prev, partnershipType: type.id }))}
                            >
                              <type.icon className="w-4 h-4 mr-2" />
                              {type.title}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Tell us more about your partnership goals</Label>
                        <Textarea
                          id="message"
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          placeholder="Describe your organization's focus, capacity, and how you envision partnering with SCEF..."
                          className="border-2 border-black"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Partnership Inquiry"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="py-16 bg-scef-blue border-t-2 border-black">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                Prefer to Talk Directly?
              </h2>
              <p className="text-white/70 max-w-xl mx-auto mb-6">
                Reach out to our partnerships team for a direct conversation about collaboration opportunities.
              </p>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10"
                asChild
              >
                <a href="/contact">Contact Partnerships Team</a>
              </Button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PartnerWithUs;
