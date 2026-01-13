import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Star, Globe, Users, Megaphone, Award, CheckCircle, 
  ArrowRight, Heart, Target, Briefcase, GraduationCap,
  MapPin, Calendar
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Ambassador = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    profession: "",
    linkedin: "",
    motivation: "",
    experience: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ambassadorBenefits = [
    {
      icon: Globe,
      title: "Pan-African Network",
      description: "Connect with education advocates across 54 African countries and the diaspora",
    },
    {
      icon: Megaphone,
      title: "Amplify Your Voice",
      description: "Platform to advocate for education quality and access in your community",
    },
    {
      icon: Award,
      title: "Recognition",
      description: "Official SCEF Ambassador certification and recognition at events",
    },
    {
      icon: GraduationCap,
      title: "Training & Resources",
      description: "Access to exclusive training, materials, and advocacy toolkits",
    },
  ];

  const responsibilities = [
    "Advocate for SCEF programs and initiatives in your community",
    "Support local chapter development and member recruitment",
    "Represent SCEF at education events and stakeholder meetings",
    "Share SCEF content and updates through your networks",
    "Provide feedback on program effectiveness and community needs",
    "Participate in monthly ambassador calls and annual summits",
  ];

  const eligibilityCriteria = [
    "Passion for education transformation in Africa",
    "Active presence in education or community development",
    "Strong communication and networking skills",
    "Commitment of 5-10 hours monthly",
    "Professional or community standing in your region",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Ambassador application submitted! We'll review and respond within 7 business days.");
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      country: "",
      profession: "",
      linkedin: "",
      motivation: "",
      experience: "",
    });
    setIsSubmitting(false);
  };

  return (
    <>
      <Helmet>
        <title>Become an Ambassador - SCEF</title>
        <meta name="description" content="Join the SCEF Ambassador Program - Advocate for education transformation across Africa and the diaspora." />
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
                  <Star className="w-10 h-10 text-scef-blue" />
                </div>
                <p className="text-scef-gold font-medium mb-4">Get Involved</p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Become a SCEF Ambassador
                </h1>
                <p className="text-xl text-white/80 leading-relaxed mb-8">
                  Join a network of passionate education advocates driving change across 
                  Africa and the diaspora. Be the voice for quality education in your community.
                </p>
                <Button 
                  size="lg" 
                  className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold"
                  onClick={() => document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="py-16 bg-muted/30 border-b-2 border-black">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                    Ambassador Benefits
                  </h2>
                  <p className="text-muted-foreground">
                    As a SCEF Ambassador, you'll gain access to resources and networks that amplify your impact.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {ambassadorBenefits.map((benefit) => (
                    <Card key={benefit.title} className="border-2 border-black text-center hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="w-14 h-14 mx-auto rounded-xl bg-scef-gold/20 flex items-center justify-center mb-4 border-2 border-black">
                          <benefit.icon className="w-7 h-7 text-scef-blue" />
                        </div>
                        <CardTitle className="text-lg">{benefit.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Responsibilities & Eligibility */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                      Ambassador Responsibilities
                    </h2>
                    <ul className="space-y-3">
                      {responsibilities.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-scef-gold mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                      Eligibility Criteria
                    </h2>
                    <ul className="space-y-3">
                      {eligibilityCriteria.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Target className="w-5 h-5 text-scef-blue mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Application Form */}
          <section id="application-form" className="py-20 bg-muted/30 border-y-2 border-black">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                    Apply to Become an Ambassador
                  </h2>
                  <p className="text-muted-foreground">
                    Complete the form below. Our team will review your application 
                    and respond within 7 business days.
                  </p>
                </div>

                <Card className="border-2 border-black">
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name *</Label>
                          <Input
                            id="fullName"
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                            className="border-2 border-black"
                          />
                        </div>
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
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            className="border-2 border-black"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country *</Label>
                          <Input
                            id="country"
                            required
                            placeholder="e.g., Nigeria, Kenya, Ghana"
                            value={formData.country}
                            onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                            className="border-2 border-black"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="profession">Profession / Role *</Label>
                          <Input
                            id="profession"
                            required
                            placeholder="e.g., Educator, NGO Director"
                            value={formData.profession}
                            onChange={(e) => setFormData(prev => ({ ...prev, profession: e.target.value }))}
                            className="border-2 border-black"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="linkedin">LinkedIn Profile</Label>
                          <Input
                            id="linkedin"
                            type="url"
                            placeholder="https://linkedin.com/in/..."
                            value={formData.linkedin}
                            onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                            className="border-2 border-black"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="motivation">Why do you want to be a SCEF Ambassador? *</Label>
                        <Textarea
                          id="motivation"
                          required
                          rows={4}
                          placeholder="Share your passion for education and how you'd contribute..."
                          value={formData.motivation}
                          onChange={(e) => setFormData(prev => ({ ...prev, motivation: e.target.value }))}
                          className="border-2 border-black"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">Relevant Experience</Label>
                        <Textarea
                          id="experience"
                          rows={3}
                          placeholder="Describe your experience in education, community development, or advocacy..."
                          value={formData.experience}
                          onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                          className="border-2 border-black"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        size="lg"
                        className="w-full bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Other Ways */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                    Other Ways to Get Involved
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-2 border-black hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <Users className="w-10 h-10 text-scef-gold mx-auto mb-4" />
                      <CardTitle>Join as Member</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-muted-foreground mb-4">
                        Become part of our growing community of education advocates.
                      </p>
                      <Button asChild variant="outline" className="border-2 border-black">
                        <Link to="/get-involved/membership">Join Now</Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-black hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <MapPin className="w-10 h-10 text-scef-gold mx-auto mb-4" />
                      <CardTitle>Join a Chapter</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-muted-foreground mb-4">
                        Connect with SCEF members in your country or region.
                      </p>
                      <Button asChild variant="outline" className="border-2 border-black">
                        <Link to="/chapters/join-online">Find Chapter</Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-black hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <Heart className="w-10 h-10 text-scef-gold mx-auto mb-4" />
                      <CardTitle>Donate</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-muted-foreground mb-4">
                        Support education programs across Africa.
                      </p>
                      <Button asChild variant="outline" className="border-2 border-black">
                        <Link to="/donate">Donate Now</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Ambassador;
