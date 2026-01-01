import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  GraduationCap, BookOpen, Heart, Users, 
  ArrowRight, CheckCircle, Target, Wallet, HandHeart 
} from "lucide-react";

const scholarshipTypes = [
  { 
    name: "Merit Scholarships", 
    desc: "For outstanding academic performers",
    amount: "Up to $5,000/year",
    icon: GraduationCap,
  },
  { 
    name: "Need-Based Grants", 
    desc: "Supporting students from low-income families",
    amount: "Variable support",
    icon: Heart,
  },
  { 
    name: "Girls in Education", 
    desc: "Empowering female students across Africa",
    amount: "Up to $3,000/year",
    icon: Users,
  },
  { 
    name: "STEM Scholarships", 
    desc: "Promoting science and technology education",
    amount: "Up to $4,000/year",
    icon: Target,
  },
];

const impactStats = [
  { value: "15,000+", label: "Scholarships Awarded" },
  { value: "$2M+", label: "Funding Distributed" },
  { value: "25+", label: "Countries Reached" },
  { value: "92%", label: "Graduation Rate" },
];

const howItWorks = [
  { step: "1", title: "Apply", desc: "Submit your application with academic records and financial information" },
  { step: "2", title: "Review", desc: "Our team evaluates applications based on merit and need" },
  { step: "3", title: "Award", desc: "Selected students receive funding directly to their institutions" },
  { step: "4", title: "Support", desc: "Ongoing mentorship and resources throughout your education" },
];

const EduAidAfrica = () => {
  return (
    <>
      <Helmet>
        <title>EduAid-Africa | Scholarships & Educational Funding - SCEF</title>
        <meta 
          name="description" 
          content="EduAid-Africa provides scholarships and educational funding to students across Africa, breaking financial barriers to quality education." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-24 bg-earth overflow-hidden">
            <div className="absolute inset-0 bg-african-pattern opacity-10" />
            <div className="absolute top-20 right-10 w-64 h-64 bg-terracotta/20 rounded-full blur-3xl" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-terracotta/20 text-terracotta-light text-sm font-medium mb-6">
                  <GraduationCap className="w-4 h-4" />
                  Scholarships & Funding
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                  EduAid <span className="text-gradient-gold">Africa</span>
                </h1>
                <p className="text-xl text-cream/80 leading-relaxed mb-8 max-w-2xl mx-auto">
                  Breaking financial barriers to education. Providing scholarships, grants, and learning resources to students who need it most.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-terracotta text-cream hover:bg-terracotta-light">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Apply for Scholarship
                  </Button>
                  <Button size="lg" variant="outline" className="border-cream/30 text-cream hover:bg-cream/10" asChild>
                    <Link to="/donate">Fund a Student</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Impact Stats */}
          <section className="py-12 bg-card border-b border-border">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {impactStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-display text-3xl md:text-4xl font-bold text-terracotta">{stat.value}</p>
                    <p className="text-muted-foreground text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                    Education Should Not Be a <span className="text-gradient-gold">Privilege</span>
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    Millions of talented African students are denied access to quality education due to financial constraints. EduAid-Africa exists to change that reality.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Through scholarships, grants, learning materials, and mentorship, we ensure that no deserving student is left behind because of their economic circumstances.
                  </p>
                  <div className="space-y-4">
                    {[
                      "Full and partial scholarships available",
                      "Support for primary through university education",
                      "Mentorship and career guidance included",
                      "Learning materials and resources provided",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-forest" />
                        <span className="text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-terracotta/10 rounded-3xl p-8 border border-terracotta/20">
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 mx-auto rounded-full bg-terracotta/20 flex items-center justify-center mb-4">
                        <Heart className="w-10 h-10 text-terracotta" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-foreground mb-2">Your Impact</h3>
                      <p className="text-muted-foreground">Every donation transforms a life</p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-background rounded-xl">
                        <span className="text-foreground">$50</span>
                        <span className="text-muted-foreground text-sm">Textbooks for 1 year</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-background rounded-xl">
                        <span className="text-foreground">$250</span>
                        <span className="text-muted-foreground text-sm">School fees for 1 term</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-background rounded-xl">
                        <span className="text-foreground">$1,000</span>
                        <span className="text-muted-foreground text-sm">Full year scholarship</span>
                      </div>
                    </div>
                    <Button className="w-full mt-6" asChild>
                      <Link to="/donate">
                        <HandHeart className="w-4 h-4 mr-2" />
                        Donate Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Scholarship Types */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Scholarship <span className="text-gradient-gold">Programs</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Multiple scholarship tracks designed to meet different needs and aspirations.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {scholarshipTypes.map((scholarship) => (
                  <div 
                    key={scholarship.name}
                    className="p-6 rounded-2xl bg-background border border-border hover:border-terracotta/50 transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center mb-4">
                      <scholarship.icon className="w-6 h-6 text-terracotta" />
                    </div>
                    <h3 className="font-display font-bold text-foreground mb-2">{scholarship.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{scholarship.desc}</p>
                    <p className="text-primary font-semibold text-sm">{scholarship.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  How It <span className="text-gradient-gold">Works</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  A simple, transparent process from application to graduation.
                </p>
              </div>
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-4 gap-6">
                  {howItWorks.map((item, index) => (
                    <div key={item.step} className="relative text-center">
                      {index < howItWorks.length - 1 && (
                        <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-border" />
                      )}
                      <div className="w-16 h-16 mx-auto rounded-full bg-terracotta text-cream flex items-center justify-center font-display text-2xl font-bold mb-4">
                        {item.step}
                      </div>
                      <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-earth">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
                Ready to Transform Your <span className="text-gold">Future</span>?
              </h2>
              <p className="text-cream/70 max-w-xl mx-auto mb-8">
                Applications are open year-round. Take the first step toward achieving your educational dreams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-terracotta text-cream hover:bg-terracotta-light">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Apply for Scholarship
                </Button>
                <Button size="lg" variant="outline" className="border-cream/30 text-cream hover:bg-cream/10" asChild>
                  <Link to="/contact">Contact Us</Link>
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

export default EduAidAfrica;
