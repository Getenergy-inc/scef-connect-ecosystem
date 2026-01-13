import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2, Globe, Users, Award, Target, FileText, 
  Download, CheckCircle, Calendar, MapPin, ArrowRight,
  BookOpen, Briefcase, Heart
} from "lucide-react";
import { Link } from "react-router-dom";

const OrganizationalProfile = () => {
  const quickFacts = [
    { label: "Founded", value: "1997", icon: Calendar },
    { label: "Registered", value: "2010", icon: FileText },
    { label: "Headquarters", value: "Lagos, Nigeria", icon: MapPin },
    { label: "Alignment", value: "SDG 4 + AU Agenda 2063", icon: Globe },
  ];

  const corePrograms = [
    {
      name: "NESA-Africa",
      description: "New Education Standard Award - Recognition and quality benchmarking",
      link: "/programs/nesa-africa",
    },
    {
      name: "EduAid-Africa",
      description: "Scholarships, learner support, and education funding pathways",
      link: "/programs/eduaid-africa",
    },
    {
      name: "Rebuild My School Africa",
      description: "School infrastructure renewal and learning environment improvement",
      link: "/programs/rebuild-my-school-africa",
    },
    {
      name: "Education Online Africa",
      description: "Digital learning platforms and verifiable certification",
      link: "/programs/digital-learning",
    },
    {
      name: "Women & Girls Education",
      description: "Targeted interventions for access and outcomes",
      link: "/programs/women-girls-education",
    },
    {
      name: "Special Needs Education",
      description: "Inclusive education and assistive learning support",
      link: "/programs/special-needs-education",
    },
  ];

  const divisions = [
    { name: "BGEO", fullName: "Board Governance & Executive Office" },
    { name: "SOBCD", fullName: "Strategic Operations & Business Compliance Division" },
    { name: "TDSD", fullName: "Technology & Digital Services Division" },
    { name: "OMBDD", fullName: "Online Media Business Development Division" },
    { name: "Santos Media", fullName: "Santos Media Division" },
    { name: "LCS", fullName: "Local Chapter Services Division" },
  ];

  const partnershipBenefits = [
    "Verified project pipelines with milestone tracking",
    "ESG/SDG-aligned impact reporting",
    "CSR for Education Funds Management services",
    "Partner branding and recognition programs",
    "Access to Pan-African chapter network",
    "Quarterly outcome documentation",
  ];

  return (
    <>
      <Helmet>
        <title>Organizational Profile - SCEF</title>
        <meta name="description" content="Santos Creations Educational Foundation organizational profile - governance, programs, and partnership information." />
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
                  <Building2 className="w-10 h-10 text-scef-blue" />
                </div>
                <p className="text-scef-gold font-medium mb-4">Partner Resources</p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Organizational Profile
                </h1>
                <p className="text-xl text-white/80 leading-relaxed mb-8">
                  Santos Creations Educational Foundation (SCEF) — A membership-driven 
                  Pan-African education foundation advancing Education for All.
                </p>
                <Button 
                  size="lg" 
                  className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Full Profile (PDF)
                </Button>
              </div>
            </div>
          </section>

          {/* Quick Facts */}
          <section className="py-12 bg-muted/30 border-b-2 border-black">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {quickFacts.map((fact) => (
                  <Card key={fact.label} className="border-2 border-black text-center">
                    <CardContent className="pt-6">
                      <fact.icon className="w-8 h-8 text-scef-gold mx-auto mb-2" />
                      <p className="font-display font-bold text-xl text-foreground">{fact.value}</p>
                      <p className="text-sm text-muted-foreground">{fact.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-2 border-black">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-scef-gold/20 flex items-center justify-center mb-4 border-2 border-black">
                        <Target className="w-6 h-6 text-scef-blue" />
                      </div>
                      <CardTitle className="text-2xl">Our Mission</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        To build a continuous, ever-growing standard of education in Africa through 
                        governance-backed, chapter-driven delivery models that make education 
                        transformation measurable, inclusive, and scalable.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-black">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-scef-gold/20 flex items-center justify-center mb-4 border-2 border-black">
                        <Globe className="w-6 h-6 text-scef-blue" />
                      </div>
                      <CardTitle className="text-2xl">Our Vision</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        A Pan-African education ecosystem where every learner has access to quality 
                        education, verified skills pathways, and sustainable support systems aligned 
                        with SDG 4 and AU Agenda 2063.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Core Programs */}
          <section className="py-16 bg-muted/30 border-y-2 border-black">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                    Core Programs
                  </h2>
                  <p className="text-muted-foreground">
                    Integrated programs designed to work together for comprehensive education impact.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {corePrograms.map((program) => (
                    <Card key={program.name} className="border-2 border-black hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{program.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{program.description}</p>
                        <Link 
                          to={program.link}
                          className="text-scef-blue hover:text-scef-gold text-sm font-medium inline-flex items-center"
                        >
                          Learn More <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Organizational Structure */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                    Organizational Structure
                  </h2>
                  <p className="text-muted-foreground">
                    Six operational divisions ensuring coordinated delivery of programs and governance.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {divisions.map((division) => (
                    <div 
                      key={division.name}
                      className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border-2 border-black"
                    >
                      <div className="w-10 h-10 rounded-lg bg-scef-gold/20 flex items-center justify-center flex-shrink-0 border border-black">
                        <Briefcase className="w-5 h-5 text-scef-blue" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{division.name}</p>
                        <p className="text-sm text-muted-foreground">{division.fullName}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Button asChild variant="outline" className="border-2 border-black">
                    <Link to="/divisions">
                      View All Divisions
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Partnership Benefits */}
          <section className="py-16 bg-scef-blue/5 border-y-2 border-black">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                      Partnership Benefits
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      SCEF provides structured pathways for organizations to engage with 
                      education transformation through verified, accountable partnerships.
                    </p>
                    <ul className="space-y-3">
                      {partnershipBenefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-scef-gold mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <Card className="border-2 border-black">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold text-lg mb-2">Ready to Partner?</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Start the conversation with our partnerships team.
                        </p>
                        <Button asChild className="w-full bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold">
                          <Link to="/partner-with-us">
                            Partner With Us
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-black">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold text-lg mb-2">Support Education</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Make a direct impact through our verified programs.
                        </p>
                        <Button asChild variant="outline" className="w-full border-2 border-black">
                          <Link to="/donate">
                            Donate Now
                            <Heart className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 bg-scef-blue">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="font-display text-3xl font-bold text-white mb-4">
                  Join the SCEF Ecosystem
                </h2>
                <p className="text-white/80 mb-8">
                  Whether as a member, partner, or supporter — there's a pathway for you to 
                  contribute to education transformation in Africa.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button 
                    asChild
                    size="lg" 
                    className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold"
                  >
                    <Link to="/get-involved/membership">Join SCEF</Link>
                  </Button>
                  <Button 
                    asChild
                    size="lg" 
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10"
                  >
                    <Link to="/about">Learn More About Us</Link>
                  </Button>
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

export default OrganizationalProfile;
