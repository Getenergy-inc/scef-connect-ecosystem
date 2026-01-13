import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale } from "@/contexts/LocaleContext";
import { 
  Heart, Users, GraduationCap, HandHeart, Accessibility, 
  BookOpen, Globe, ArrowRight, CheckCircle, Target,
  Lightbulb, Shield, Mic, Eye
} from "lucide-react";

const InclusionAccess = () => {
  const { t } = useLocale();

  const pillars = [
    {
      icon: Users,
      title: "Women & Girls Education",
      description: "Targeted interventions to remove barriers and create pathways for girls and women to access quality education.",
      initiatives: [
        "Girls scholarship programs",
        "Safe learning environment advocacy",
        "Women in STEM initiatives",
        "Mentorship networks for young women",
      ],
      color: "bg-pink-100 text-pink-700",
    },
    {
      icon: Accessibility,
      title: "Special Needs Education Support",
      description: "Inclusive education systems that accommodate learners with disabilities and diverse learning needs.",
      initiatives: [
        "Assistive technology provision",
        "Teacher training for inclusive classrooms",
        "Accessible learning materials",
        "Special needs school partnerships",
      ],
      color: "bg-purple-100 text-purple-700",
    },
    {
      icon: Eye,
      title: "Visual & Hearing Support",
      description: "Specialized resources for learners with visual and hearing impairments.",
      initiatives: [
        "Braille learning materials",
        "Sign language interpreter training",
        "Assistive devices distribution",
        "Accessible digital content",
      ],
      color: "bg-blue-100 text-blue-700",
    },
    {
      icon: Lightbulb,
      title: "Learning Disabilities Advocacy",
      description: "Support for learners with dyslexia, ADHD, autism, and other learning differences.",
      initiatives: [
        "Early screening programs",
        "Specialized learning support",
        "Parent and teacher awareness",
        "Individualized education planning",
      ],
      color: "bg-amber-100 text-amber-700",
    },
  ];

  const impactAreas = [
    { icon: GraduationCap, label: "Girls Enrolled", metric: "Growing" },
    { icon: HandHeart, label: "Special Needs Learners", metric: "Supported" },
    { icon: Globe, label: "Countries Active", metric: "Expanding" },
    { icon: BookOpen, label: "Resources Created", metric: "In Progress" },
  ];

  const programLinks = [
    { title: "Women & Girls Education", href: "/programs/women-girls-education", icon: Users },
    { title: "Special Needs Education", href: "/programs/special-needs-education", icon: Accessibility },
  ];

  return (
    <>
      <Helmet>
        <title>Inclusion & Access Programs - SCEF</title>
        <meta name="description" content="SCEF's inclusive education programs supporting women, girls, and learners with special needs across Africa." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-20 bg-gradient-to-br from-scef-blue via-scef-blue to-purple-900 overflow-hidden">
            <div className="absolute inset-0 bg-african-pattern opacity-10" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-scef-gold flex items-center justify-center mb-6 border-2 border-black">
                  <Heart className="w-10 h-10 text-scef-blue" />
                </div>
                <p className="text-scef-gold font-medium mb-4">SCEF Inclusive Education Programs</p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Inclusion & Access
                </h1>
                <p className="text-xl text-white/80 leading-relaxed mb-8">
                  Education is a right for everyone. SCEF works to remove barriers and create 
                  pathways for women, girls, and learners with special needs to access quality 
                  education and reach their full potential.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold"
                    asChild
                  >
                    <Link to="/donate?focus=inclusion">
                      Support Inclusion Programs
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10"
                    asChild
                  >
                    <Link to="/partner-with-us">Partner With Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Mission Statement */}
          <section className="py-16 bg-muted/30 border-b-2 border-black">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Our Commitment to Inclusive Education
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We believe that every learner deserves access to quality education regardless of gender, 
                  disability, or circumstance. SCEF's inclusion programs address systemic barriers and 
                  create supportive environments where all learners can thrive.
                </p>
              </div>
            </div>
          </section>

          {/* Program Pillars */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Four Pillars of Inclusion
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our comprehensive approach addresses different dimensions of educational exclusion.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {pillars.map((pillar) => (
                  <Card key={pillar.title} className="border-2 border-black hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl ${pillar.color} flex items-center justify-center flex-shrink-0 border-2 border-black`}>
                          <pillar.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <CardTitle className="text-xl mb-1">{pillar.title}</CardTitle>
                          <CardDescription>{pillar.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h4 className="text-sm font-semibold text-foreground mb-3">Key Initiatives:</h4>
                      <ul className="space-y-2">
                        {pillar.initiatives.map((initiative) => (
                          <li key={initiative} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-scef-gold mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{initiative}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Impact Metrics */}
          <section className="py-16 bg-scef-blue/5 border-y-2 border-black">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-2xl font-bold text-center text-foreground mb-8">
                  Our Growing Impact
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {impactAreas.map((area) => (
                    <Card key={area.label} className="border-2 border-black text-center p-6">
                      <area.icon className="w-8 h-8 text-scef-gold mx-auto mb-3" />
                      <p className="font-display font-bold text-xl text-foreground">{area.metric}</p>
                      <p className="text-sm text-muted-foreground">{area.label}</p>
                    </Card>
                  ))}
                </div>
                <p className="text-center text-sm text-muted-foreground mt-6">
                  Impact data reporting in progress. Updated metrics will be available in quarterly reports.
                </p>
              </div>
            </div>
          </section>

          {/* Our Approach */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-3xl font-bold text-center text-foreground mb-12">
                  Our Approach to Inclusive Education
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <Card className="border-2 border-black">
                    <CardHeader className="text-center">
                      <div className="w-14 h-14 mx-auto rounded-xl bg-scef-gold/20 flex items-center justify-center mb-4 border-2 border-black">
                        <Target className="w-7 h-7 text-scef-blue" />
                      </div>
                      <CardTitle className="text-lg">Barrier Identification</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground text-center">
                        We assess and document specific barriers preventing access to education 
                        in each community we serve.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-black">
                    <CardHeader className="text-center">
                      <div className="w-14 h-14 mx-auto rounded-xl bg-scef-gold/20 flex items-center justify-center mb-4 border-2 border-black">
                        <Shield className="w-7 h-7 text-scef-blue" />
                      </div>
                      <CardTitle className="text-lg">Systemic Support</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground text-center">
                        We build systems—not just projects—that create lasting change 
                        through policy advocacy and institutional partnerships.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-black">
                    <CardHeader className="text-center">
                      <div className="w-14 h-14 mx-auto rounded-xl bg-scef-gold/20 flex items-center justify-center mb-4 border-2 border-black">
                        <Mic className="w-7 h-7 text-scef-blue" />
                      </div>
                      <CardTitle className="text-lg">Voice & Agency</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground text-center">
                        We amplify the voices of marginalized learners and ensure they 
                        have agency in shaping their educational experience.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Detailed Programs */}
          <section className="py-16 bg-muted/30 border-y-2 border-black">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-2xl font-bold text-center text-foreground mb-8">
                  Explore Our Programs
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {programLinks.map((program) => (
                    <Link key={program.href} to={program.href}>
                      <Card className="border-2 border-black hover:shadow-lg hover:border-scef-gold transition-all cursor-pointer h-full">
                        <CardContent className="p-6 flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-scef-gold/20 flex items-center justify-center flex-shrink-0 border-2 border-black">
                            <program.icon className="w-7 h-7 text-scef-blue" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-display font-bold text-lg text-foreground">{program.title}</h3>
                            <p className="text-sm text-muted-foreground">Learn more about this program</p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-scef-gold" />
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Get Involved CTA */}
          <section className="py-20 bg-scef-blue border-t-2 border-black">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Join the Movement for Inclusive Education
              </h2>
              <p className="text-white/70 max-w-xl mx-auto mb-8">
                Whether through donation, partnership, or volunteering, you can help create 
                a more inclusive education system across Africa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold"
                  asChild
                >
                  <Link to="/donate?focus=inclusion">
                    Donate Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link to="/get-involved/volunteer">Volunteer With Us</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link to="/partner-with-us">Corporate Partnership</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default InclusionAccess;
