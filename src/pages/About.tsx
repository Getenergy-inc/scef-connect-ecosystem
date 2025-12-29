import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Eye, Heart, Users, Award, Globe, ArrowRight } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We lead with empathy and care for every student and community we serve.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We pursue the highest standards in education and organizational integrity.",
  },
  {
    icon: Users,
    title: "Inclusion",
    description: "We believe every child deserves access to quality education regardless of circumstance.",
  },
  {
    icon: Globe,
    title: "Pan-African Unity",
    description: "We collaborate across borders to strengthen education systems continent-wide.",
  },
];

const milestones = [
  { year: "2015", event: "SCEF Founded in Lagos, Nigeria" },
  { year: "2017", event: "First NESA-Africa Awards Ceremony" },
  { year: "2019", event: "Expansion to 10 African Countries" },
  { year: "2021", event: "Launch of EduAid Scholarship Program" },
  { year: "2023", event: "50,000+ Students Impacted" },
  { year: "2024", event: "Digital Transformation & Online Chapters" },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About SCEF - Our Mission, Vision & Values | Santos Creations Educational Foundation</title>
        <meta 
          name="description" 
          content="Learn about SCEF's mission to transform education across Africa through scholarships, advocacy, and community empowerment. Discover our story and impact." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-20 bg-earth overflow-hidden">
            <div className="absolute inset-0 bg-african-pattern opacity-10" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/10 text-cream/90 text-sm mb-6">
                  About SCEF
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                  Empowering Africa Through <span className="text-gradient-gold">Education</span>
                </h1>
                <p className="text-xl text-cream/80 leading-relaxed">
                  The Santos Creations Educational Foundation is a membership-driven Pan-African education advocacy ecosystem dedicated to transforming education and building sustainable futures across the continent.
                </p>
              </div>
            </div>
          </section>

          {/* Vision & Mission */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="bg-card rounded-2xl p-10 border border-border">
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                    <Eye className="w-7 h-7 text-gold" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Vision</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    A continent where every child has access to quality education, where schools are safe havens of learning, and where education serves as the foundation for sustainable development and prosperity.
                  </p>
                </div>
                
                <div className="bg-card rounded-2xl p-10 border border-border">
                  <div className="w-14 h-14 rounded-xl bg-terracotta/10 flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-terracotta" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To advocate for educational excellence, provide scholarships and resources, rebuild schools, and create community-driven chapters that empower local education ecosystems across Africa.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Our Core <span className="text-gradient-gold">Values</span>
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value) => (
                  <div key={value.title} className="bg-background rounded-2xl p-8 border border-border text-center hover:shadow-lg transition-shadow">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Our <span className="text-gradient-gold">Journey</span>
                </h2>
              </div>
              <div className="max-w-3xl mx-auto">
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className="flex gap-6 mb-8 last:mb-0">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {milestone.year}
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="w-0.5 flex-1 bg-border mt-2" />
                      )}
                    </div>
                    <div className="pb-8">
                      <p className="text-foreground font-medium text-lg">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-earth">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-6">
                Be Part of the Movement
              </h2>
              <p className="text-cream/70 max-w-2xl mx-auto mb-8">
                Join thousands of members and supporters working to transform education across Africa.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/membership">
                    Become a Member
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <Link to="/contact">
                    Contact Us
                  </Link>
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

export default About;
