import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Building, Hammer, Users, MapPin, 
  ArrowRight, CheckCircle, Lightbulb, Droplets, Wifi, Shield 
} from "lucide-react";
import { ProgramVideoSection } from "@/components/programs/ProgramVideoSection";

const infrastructureTypes = [
  { name: "Classroom Construction", icon: Building, desc: "New classrooms built to modern standards" },
  { name: "Renovation Projects", icon: Hammer, desc: "Restoring and upgrading existing facilities" },
  { name: "Water & Sanitation", icon: Droplets, desc: "Clean water and proper sanitation facilities" },
  { name: "Technology Infrastructure", icon: Wifi, desc: "Computer labs and internet connectivity" },
  { name: "Solar Power Systems", icon: Lightbulb, desc: "Sustainable energy for rural schools" },
  { name: "Security Upgrades", icon: Shield, desc: "Safe learning environments for all" },
];

const impactStats = [
  { value: "250+", label: "Schools Rebuilt" },
  { value: "150,000+", label: "Students Impacted" },
  { value: "18", label: "Countries" },
  { value: "500+", label: "Classrooms Built" },
];

const featuredProjects = [
  { 
    name: "Lagos Model School", 
    location: "Lagos, Nigeria",
    impact: "1,200 students",
    status: "Completed 2024",
  },
  { 
    name: "Nairobi Community Primary", 
    location: "Nairobi, Kenya",
    impact: "800 students",
    status: "Completed 2023",
  },
  { 
    name: "Accra Technical Institute", 
    location: "Accra, Ghana",
    impact: "600 students",
    status: "In Progress",
  },
];

const RebuildMySchoolAfrica = () => {
  return (
    <>
      <Helmet>
        <title>Rebuild My School Africa | School Infrastructure - SCEF</title>
        <meta 
          name="description" 
          content="Rebuild My School Africa transforms learning environments by constructing and renovating schools across the continent, creating safe spaces for education." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-24 bg-earth overflow-hidden">
            <div className="absolute inset-0 bg-african-pattern opacity-10" />
            <div className="absolute top-20 right-10 w-64 h-64 bg-forest/20 rounded-full blur-3xl" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest/20 text-forest-light text-sm font-medium mb-6">
                  <Building className="w-4 h-4" />
                  Infrastructure Development
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                  Rebuild My School <span className="text-gradient-gold">Africa</span>
                </h1>
                <p className="text-xl text-cream/80 leading-relaxed mb-8 max-w-2xl mx-auto">
                  Transforming learning environments across Africa. Building safe, modern schools where every child can thrive.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-forest text-cream hover:bg-forest-light">
                    <Building className="w-4 h-4 mr-2" />
                    Sponsor a School
                  </Button>
                  <Button size="lg" variant="outline" className="border-cream/30 text-cream hover:bg-cream/10">
                    View Our Projects
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
                    <p className="font-display text-3xl md:text-4xl font-bold text-forest">{stat.value}</p>
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
                    Safe Schools, <span className="text-gradient-gold">Brighter Futures</span>
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    Millions of African children learn in dilapidated buildings—or under trees. Crumbling infrastructure, lack of sanitation, and unsafe conditions drive students away from education.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    RMSA partners with communities, governments, and donors to build and renovate schools that inspire learning and provide safe, dignified spaces for education.
                  </p>
                  <div className="space-y-4">
                    {[
                      "Community-driven project selection",
                      "Sustainable construction practices",
                      "Local labor and materials prioritized",
                      "Long-term maintenance partnerships",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-forest" />
                        <span className="text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  {featuredProjects.map((project) => (
                    <div 
                      key={project.name}
                      className="p-6 rounded-2xl bg-card border border-border hover:border-forest/30 transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-display font-bold text-foreground">{project.name}</h3>
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <MapPin className="w-4 h-4" />
                            {project.location}
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status.includes("Completed") 
                            ? "bg-forest/10 text-forest" 
                            : "bg-gold/10 text-gold"
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-foreground">{project.impact} benefiting</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Infrastructure Types */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  What We <span className="text-gradient-gold">Build</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive infrastructure solutions for modern African schools.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {infrastructureTypes.map((type) => (
                  <div 
                    key={type.name}
                    className="p-6 rounded-2xl bg-background border border-border hover:border-forest/50 transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center mb-4">
                      <type.icon className="w-6 h-6 text-forest" />
                    </div>
                    <h3 className="font-display font-bold text-foreground mb-2">{type.name}</h3>
                    <p className="text-muted-foreground text-sm">{type.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How to Help */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    How You Can <span className="text-gradient-gold">Help</span>
                  </h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center p-6 rounded-2xl bg-card border border-border">
                    <div className="w-16 h-16 mx-auto rounded-full bg-forest/10 flex items-center justify-center mb-4">
                      <Building className="w-8 h-8 text-forest" />
                    </div>
                    <h3 className="font-display font-bold text-foreground mb-2">Sponsor a School</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Fund the construction or renovation of an entire school facility.
                    </p>
                    <p className="text-primary font-semibold">From $50,000</p>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-card border border-border">
                    <div className="w-16 h-16 mx-auto rounded-full bg-terracotta/10 flex items-center justify-center mb-4">
                      <Hammer className="w-8 h-8 text-terracotta" />
                    </div>
                    <h3 className="font-display font-bold text-foreground mb-2">Build a Classroom</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Sponsor a single classroom to expand school capacity.
                    </p>
                    <p className="text-primary font-semibold">From $10,000</p>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-card border border-border">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-4">
                      <Lightbulb className="w-8 h-8 text-gold" />
                    </div>
                    <h3 className="font-display font-bold text-foreground mb-2">Fund Utilities</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Provide solar power, water, or internet connectivity.
                    </p>
                    <p className="text-primary font-semibold">From $5,000</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Video Section */}
          <ProgramVideoSection
            programName="Rebuild My School Africa"
            videoUrl="/videos/program-video-1.mp4"
            videoType="local"
            description="See how RMSA is transforming school infrastructure across Africa, one school at a time."
          />

          {/* CTA */}
          <section className="py-20 bg-earth">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
                Build a School, Build a <span className="text-gold">Future</span>
              </h2>
              <p className="text-cream/70 max-w-xl mx-auto mb-8">
                Partner with us to create safe, inspiring learning environments for Africa&apos;s children.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-forest text-cream hover:bg-forest-light">
                  <Building className="w-4 h-4 mr-2" />
                  Become a Sponsor
                </Button>
                <Button size="lg" variant="outline" className="border-cream/30 text-cream hover:bg-cream/10" asChild>
                  <Link to="/contact">Contact Our Team</Link>
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

export default RebuildMySchoolAfrica;
