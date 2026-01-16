import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, GraduationCap, MapPin, Users, ArrowRight, CheckCircle2, Building2, Wallet } from "lucide-react";

const certificationTracks = [
  {
    title: "Education Leadership",
    description: "Develop leadership skills for educational institutions and programs.",
    modules: 6,
    duration: "12 weeks",
    color: "gold",
  },
  {
    title: "Digital Pedagogy",
    description: "Master online teaching methods and educational technology.",
    modules: 8,
    duration: "16 weeks",
    color: "terracotta",
  },
  {
    title: "Inclusive Education",
    description: "Specialization in special needs and inclusive learning environments.",
    modules: 5,
    duration: "10 weeks",
    color: "forest",
  },
  {
    title: "Education Policy",
    description: "Understanding education governance, policy development, and advocacy.",
    modules: 4,
    duration: "8 weeks",
    color: "primary",
  },
];

const benefits = [
  "Industry-aligned curriculum developed with education experts",
  "Hybrid delivery: Online learning + practical assessments",
  "Licensed examination centres across Africa",
  "Recognized credentials for career advancement",
  "Payments via GFA Wallet with flexible plans",
  "Affiliate training partner network",
];

const colorClasses = {
  gold: "bg-scef-gold/25 text-scef-gold-dark border-scef-gold/40",
  terracotta: "bg-terracotta/15 text-terracotta border-terracotta/30",
  forest: "bg-forest/15 text-forest border-forest/30",
  primary: "bg-primary/15 text-primary border-primary/30",
};

const Certifications = () => {
  return (
    <>
      <Helmet>
        <title>AEPC Certifications - SCEF | Africa Education & Productivity Certification</title>
        <meta 
          name="description" 
          content="Africa Education & Productivity Certification (AEPC) - hybrid, industry-aligned certifications delivered via affiliate training partners and licensed examination centres across Africa." 
        />
        <meta name="keywords" content="AEPC, education certification Africa, professional development, SCEF certifications" />
        <link rel="canonical" href="https://scef.org/certifications" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-20 bg-earth overflow-hidden">
            <div className="absolute inset-0 bg-african-pattern opacity-10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/10 text-cream/90 text-sm mb-6">
                  <Award className="w-4 h-4" />
                  Certifications
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                  Africa Education & Productivity{" "}
                  <span className="text-gradient-gold">Certification (AEPC)</span>
                </h1>
                <p className="text-xl text-cream/80 leading-relaxed mb-8">
                  Hybrid, industry-aligned certifications delivered via affiliate training partners and licensed examination centres across Africa—powered by SCEF and delivered through Education Online Africa.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/certifications/enroll">
                      <GraduationCap className="w-5 h-5" />
                      Enroll Now
                    </Link>
                  </Button>
                  <Button variant="heroOutline" size="lg" asChild>
                    <Link to="/partners/training">
                      <Users className="w-5 h-5" />
                      Become Training Partner
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  How AEPC <span className="text-gradient-gold">Works</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-display font-bold text-gold">1</span>
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-2">Choose Track</h3>
                  <p className="text-sm text-muted-foreground">Select a certification track aligned with your career goals</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-terracotta/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-display font-bold text-terracotta">2</span>
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-2">Learn Online</h3>
                  <p className="text-sm text-muted-foreground">Complete modules via Education Online Africa platform</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-display font-bold text-forest">3</span>
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-2">Take Exam</h3>
                  <p className="text-sm text-muted-foreground">Visit a licensed examination centre for assessment</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-display font-bold text-primary">4</span>
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-2">Get Certified</h3>
                  <p className="text-sm text-muted-foreground">Receive your AEPC credential and join alumni network</p>
                </div>
              </div>
            </div>
          </section>

          {/* Certification Tracks */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Certification <span className="text-gradient-gold">Tracks</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Industry-aligned programs designed for education professionals across Africa.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {certificationTracks.map((track) => {
                  const colors = colorClasses[track.color as keyof typeof colorClasses];
                  return (
                    <div
                      key={track.title}
                      className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow"
                    >
                      <div className={`inline-block px-3 py-1 rounded-full ${colors} text-xs font-semibold mb-4`}>
                        {track.modules} Modules • {track.duration}
                      </div>
                      <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                        {track.title}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {track.description}
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/certifications/${track.title.toLowerCase().replace(/ /g, '-')}`}>
                          Learn More
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                    Why Choose <span className="text-gradient-gold">AEPC</span>?
                  </h2>
                  <ul className="space-y-4">
                    {benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <div className="bg-background rounded-2xl p-6 border border-border">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-terracotta/10 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-terracotta" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-foreground">Training Partners</h4>
                        <p className="text-sm text-muted-foreground">Become an affiliate training centre</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/partners/training">
                        Apply as Partner
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>

                  <div className="bg-background rounded-2xl p-6 border border-border">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-forest" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-foreground">Exam Centres</h4>
                        <p className="text-sm text-muted-foreground">Find a licensed centre near you</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/certifications/centres">
                        Find Centres
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>

                  <div className="bg-background rounded-2xl p-6 border border-border">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-foreground">GFA Wallet Payments</h4>
                        <p className="text-sm text-muted-foreground">Flexible payment options available</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/wallet">
                        Setup Wallet
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-earth">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-6">
                Advance Your Career with <span className="text-gradient-gold">AEPC</span>
              </h2>
              <p className="text-cream/70 max-w-2xl mx-auto mb-8">
                Join thousands of education professionals across Africa with recognized credentials.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/certifications/enroll">
                  <GraduationCap className="w-5 h-5" />
                  Start Your Certification
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Certifications;
