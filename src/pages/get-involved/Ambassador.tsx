import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLocale } from "@/contexts/LocaleContext";
import { 
  Star, Globe, Users, Megaphone, Award, CheckCircle, 
  ArrowRight, Heart, Target, GraduationCap, MapPin, Sparkles
} from "lucide-react";
import { toast } from "sonner";
import { Link, useSearchParams } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Program definitions for display
const programDetails: Record<string, { name: string; color: string }> = {
  "nesa-africa": { name: "NESA Africa", color: "bg-blue-100 text-blue-700" },
  "eduaid-africa": { name: "EduAid Africa", color: "bg-green-100 text-green-700" },
  "rebuild-my-school-africa": { name: "Rebuild My School Africa", color: "bg-orange-100 text-orange-700" },
  "women-girls-education": { name: "Women & Girls Education", color: "bg-pink-100 text-pink-700" },
  "special-needs-education": { name: "Special Needs Education", color: "bg-purple-100 text-purple-700" },
  "education-online-africa": { name: "Education Online Africa", color: "bg-cyan-100 text-cyan-700" },
  "elibrary-nigeria": { name: "eLibrary Nigeria", color: "bg-amber-100 text-amber-700" },
};

const Ambassador = () => {
  const { t, isRTL } = useLocale();
  const [searchParams] = useSearchParams();
  
  // Get query parameters
  const programParam = searchParams.get("program");
  const countryParam = searchParams.get("country");
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    profession: "",
    linkedin: "",
    motivation: "",
    experience: "",
    program: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill form from URL parameters
  useEffect(() => {
    if (countryParam || programParam) {
      setFormData(prev => ({
        ...prev,
        country: countryParam ? decodeURIComponent(countryParam) : prev.country,
        program: programParam || prev.program,
      }));
    }
  }, [countryParam, programParam]);

  const selectedProgram = programParam ? programDetails[programParam] : null;

  const ambassadorBenefits = [
    { icon: Globe, key: "network" },
    { icon: Megaphone, key: "voice" },
    { icon: Award, key: "recognition" },
    { icon: GraduationCap, key: "training" },
  ];

  const responsibilities = t("ambassador.responsibilities.items") as unknown as string[] || [];
  const eligibilityCriteria = t("ambassador.eligibility.items") as unknown as string[] || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success(t("ambassador.form.success"));
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      country: "",
      profession: "",
      linkedin: "",
      motivation: "",
      experience: "",
      program: "",
    });
    setIsSubmitting(false);
  };

  return (
    <>
      <Helmet>
        <title>{t("ambassador.hero.title")} - SCEF</title>
        <meta name="description" content={t("ambassador.hero.subtitle")} />
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
                  <Star className="w-10 h-10 text-scef-blue" />
                </div>
                <p className="text-scef-gold font-medium mb-4">{t("ambassador.hero.badge")}</p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  {t("ambassador.hero.title")}
                </h1>
                <p className="text-xl text-white/80 leading-relaxed mb-8">
                  {t("ambassador.hero.subtitle")}
                </p>
                <Button 
                  size="lg" 
                  className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold"
                  onClick={() => document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" })}
                >
                  {t("cta.joinMember")}
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
                    {t("ambassador.benefits.title")}
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {ambassadorBenefits.map((benefit) => (
                    <Card key={benefit.key} className="border-2 border-black text-center hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="w-14 h-14 mx-auto rounded-xl bg-scef-gold/20 flex items-center justify-center mb-4 border-2 border-black">
                          <benefit.icon className="w-7 h-7 text-scef-blue" />
                        </div>
                        <CardTitle className="text-lg">{t(`ambassador.benefits.${benefit.key}.title`)}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{t(`ambassador.benefits.${benefit.key}.description`)}</p>
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
                      {t("ambassador.responsibilities.title")}
                    </h2>
                    <ul className="space-y-3">
                      {Array.isArray(responsibilities) && responsibilities.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-scef-gold mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                      {t("ambassador.eligibility.title")}
                    </h2>
                    <ul className="space-y-3">
                      {Array.isArray(eligibilityCriteria) && eligibilityCriteria.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
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
                    {t("ambassador.form.title")}
                  </h2>
                  <p className="text-muted-foreground">
                    {t("ambassador.form.subtitle")}
                  </p>
                </div>

                {/* Pre-filled Context Alert */}
                {(selectedProgram || countryParam) && (
                  <Alert className="mb-6 border-2 border-scef-gold bg-scef-gold/10">
                    <Sparkles className="h-4 w-4 text-scef-gold" />
                    <AlertDescription className="text-foreground">
                      <span className="font-medium">Application pre-filled: </span>
                      {selectedProgram && (
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${selectedProgram.color} mr-2`}>
                          {selectedProgram.name} Ambassador
                        </span>
                      )}
                      {countryParam && (
                        <span className="text-muted-foreground">
                          for {decodeURIComponent(countryParam)} chapter
                        </span>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                <Card className="border-2 border-black">
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Program Selection (if coming from program link) */}
                      {selectedProgram && (
                        <div className="space-y-2">
                          <Label>Ambassador Type</Label>
                          <div className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 border-black ${selectedProgram.color}`}>
                            <Award className="w-5 h-5" />
                            <span className="font-medium">{selectedProgram.name} Ambassador</span>
                          </div>
                          <input type="hidden" name="program" value={programParam || ""} />
                        </div>
                      )}

                      {/* Program dropdown for general ambassadors */}
                      {!selectedProgram && (
                        <div className="space-y-2">
                          <Label htmlFor="program">Ambassador Type</Label>
                          <select
                            id="program"
                            value={formData.program}
                            onChange={(e) => setFormData(prev => ({ ...prev, program: e.target.value }))}
                            className="w-full h-10 px-3 py-2 border-2 border-black bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            <option value="">SCEF General Ambassador</option>
                            {Object.entries(programDetails).map(([key, prog]) => (
                              <option key={key} value={key}>{prog.name} Ambassador</option>
                            ))}
                          </select>
                          <p className="text-xs text-muted-foreground">
                            Select a program to become a focused program ambassador, or leave as general for SCEF-wide advocacy.
                          </p>
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">{t("ambassador.form.fullName")} *</Label>
                          <Input
                            id="fullName"
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                            className="border-2 border-black"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">{t("ambassador.form.email")} *</Label>
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
                          <Label htmlFor="phone">{t("ambassador.form.phone")} *</Label>
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
                          <Label htmlFor="country">{t("ambassador.form.country")} *</Label>
                          <Input
                            id="country"
                            required
                            placeholder={t("ambassador.form.countryPlaceholder")}
                            value={formData.country}
                            onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                            className="border-2 border-black"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="profession">{t("ambassador.form.profession")} *</Label>
                          <Input
                            id="profession"
                            required
                            placeholder={t("ambassador.form.professionPlaceholder")}
                            value={formData.profession}
                            onChange={(e) => setFormData(prev => ({ ...prev, profession: e.target.value }))}
                            className="border-2 border-black"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="linkedin">{t("ambassador.form.linkedin")}</Label>
                          <Input
                            id="linkedin"
                            type="url"
                            placeholder={t("ambassador.form.linkedinPlaceholder")}
                            value={formData.linkedin}
                            onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                            className="border-2 border-black"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="motivation">{t("ambassador.form.motivation")} *</Label>
                        <Textarea
                          id="motivation"
                          required
                          rows={4}
                          placeholder={t("ambassador.form.motivationPlaceholder")}
                          value={formData.motivation}
                          onChange={(e) => setFormData(prev => ({ ...prev, motivation: e.target.value }))}
                          className="border-2 border-black"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">{t("ambassador.form.experience")}</Label>
                        <Textarea
                          id="experience"
                          rows={3}
                          placeholder={t("ambassador.form.experiencePlaceholder")}
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
                        {isSubmitting ? t("ambassador.form.submitting") : t("ambassador.form.submit")}
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
                    {t("ambassador.otherWays.title")}
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-2 border-black hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <Users className="w-10 h-10 text-scef-gold mx-auto mb-4" />
                      <CardTitle>{t("ambassador.otherWays.member.title")}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-muted-foreground mb-4">
                        {t("ambassador.otherWays.member.description")}
                      </p>
                      <Button asChild variant="outline" className="border-2 border-black">
                        <Link to="/get-involved/membership">{t("cta.joinMember")}</Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-black hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <MapPin className="w-10 h-10 text-scef-gold mx-auto mb-4" />
                      <CardTitle>{t("ambassador.otherWays.chapter.title")}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-muted-foreground mb-4">
                        {t("ambassador.otherWays.chapter.description")}
                      </p>
                      <Button asChild variant="outline" className="border-2 border-black">
                        <Link to="/chapters/join-online">{t("cta.joinChapter")}</Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-black hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <Heart className="w-10 h-10 text-scef-gold mx-auto mb-4" />
                      <CardTitle>{t("ambassador.otherWays.donate.title")}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-muted-foreground mb-4">
                        {t("ambassador.otherWays.donate.description")}
                      </p>
                      <Button asChild variant="outline" className="border-2 border-black">
                        <Link to="/donate">{t("cta.donateNow")}</Link>
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
