import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Award, BookOpen, Home, Heart, Accessibility, Globe, Library, ExternalLink } from "lucide-react";

const programs = [
  {
    icon: Award,
    title: "NESA-Africa",
    subtitle: "Nigeria Excellence in Secondary Education Awards",
    description: "Celebrating academic excellence and leadership among secondary school students across Africa. The annual awards recognize outstanding students, teachers, and schools making a difference.",
    features: ["Annual Awards Ceremony", "Scholarship Opportunities", "Leadership Development", "Pan-African Recognition"],
    href: "/programs/nesa-africa",
  },
  {
    icon: BookOpen,
    title: "EduAid-Africa",
    subtitle: "Educational Aid & Scholarship Program",
    description: "Providing financial support and educational resources to underprivileged students across Africa. Our scholarship program opens doors to quality education for those who need it most.",
    features: ["Merit-Based Scholarships", "Need-Based Support", "Learning Materials", "Mentorship Programs"],
    href: "/programs/eduaid-africa",
  },
  {
    icon: Home,
    title: "Rebuild My School Africa",
    subtitle: "Infrastructure Development Initiative",
    description: "Transforming learning environments by reconstructing and renovating schools across the continent. Safe, modern facilities inspire better learning outcomes.",
    features: ["School Construction", "Facility Renovation", "Technology Infrastructure", "Community Engagement"],
    href: "/programs/rebuild-my-school-africa",
  },
  {
    icon: Heart,
    title: "Women & Girls Education",
    subtitle: "Gender Equality in Education",
    description: "Empowering women and girls through targeted education initiatives, mentorship programs, and advocacy for equal access to learning opportunities.",
    features: ["Girls' Scholarships", "Mentorship Network", "STEM for Girls", "Community Advocacy"],
    href: "/programs/women-girls-education",
  },
  {
    icon: Accessibility,
    title: "Special Needs Education",
    subtitle: "Inclusive Education for All",
    description: "Ensuring every child has access to quality education regardless of physical or learning challenges. We advocate for and implement inclusive education practices.",
    features: ["Inclusive Classrooms", "Teacher Training", "Assistive Technology", "Policy Advocacy"],
    href: "/programs/special-needs-education",
  },
  {
    icon: Globe,
    title: "Education Online Africa",
    subtitle: "Digital Learning Platforms",
    description: "Bridging the digital divide with e-learning platforms and resources that make quality education accessible from anywhere on the continent.",
    features: ["E-Learning Platform", "Digital Resources", "Virtual Classrooms", "Mobile Learning"],
    href: "/programs/education-online-africa",
  },
  {
    icon: Library,
    title: "eLibrary Nigeria",
    subtitle: "Digital Library Resources",
    description: "A comprehensive digital library providing free access to textbooks, research materials, and educational content for students and educators.",
    features: ["Free Textbooks", "Research Papers", "Study Guides", "24/7 Access"],
    href: "/programs/elibrary-nigeria",
  },
];

const Programs = () => {
  return (
    <>
      <Helmet>
        <title>Programs - SCEF | Education Initiatives Across Africa</title>
        <meta 
          name="description" 
          content="Explore SCEF's flagship programs including NESA-Africa Awards, EduAid scholarships, school rebuilding initiatives, and inclusive education programs." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-20 bg-scef-blue overflow-hidden">
            <div className="absolute inset-0 bg-african-pattern opacity-5" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-scef-gold text-sm mb-6">
                  <BookOpen className="w-4 h-4" />
                  Our Programs
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Flagship <span className="text-scef-gold">Programs</span>
                </h1>
                <p className="text-xl text-white/80 leading-relaxed">
                  Discover our comprehensive suite of education initiatives designed to transform learning outcomes across Africa.
                </p>
              </div>
            </div>
          </section>

          {/* External Platforms Section */}
          <section className="py-16 bg-scef-blue/5 border-y-2 border-border">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Our Digital <span className="text-scef-gold">Platforms</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Access our flagship digital platforms delivering education resources and recognition across Africa.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* eLibrary Nigeria */}
                <a
                  href="https://www.elibrarynigeria.com.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card rounded-2xl border-2 border-border p-8 hover:border-scef-blue/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-scef-blue/10 border-2 border-scef-blue/20 flex items-center justify-center mb-6">
                    <Library className="w-7 h-7 text-scef-blue" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-scef-blue transition-colors flex items-center gap-2">
                    eLibrary Nigeria
                    <ExternalLink className="w-4 h-4 text-scef-gold" />
                  </h3>
                  <p className="text-sm text-scef-gold font-medium mb-4">elibrarynigeria.com.ng</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Nigeria's premier digital library platform providing free access to thousands of textbooks, research papers, journals, and educational resources. Supporting students and educators with 24/7 access to quality learning materials across all academic levels.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-scef-gold" />
                      50,000+ Free Digital Resources
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-scef-gold" />
                      Primary to University Materials
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-scef-gold" />
                      Offline Download Available
                    </li>
                  </ul>
                </a>

                {/* NESA Africa */}
                <a
                  href="https://nesa.africa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card rounded-2xl border-2 border-border p-8 hover:border-scef-blue/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-scef-blue/10 border-2 border-scef-blue/20 flex items-center justify-center mb-6">
                    <Award className="w-7 h-7 text-scef-blue" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-scef-blue transition-colors flex items-center gap-2">
                    NESA Africa
                    <ExternalLink className="w-4 h-4 text-scef-gold" />
                  </h3>
                  <p className="text-sm text-scef-gold font-medium mb-4">nesa.africa</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    The Nigeria Excellence in Secondary Education Awards celebrates academic excellence across Africa. Annual recognition program honoring outstanding students, teachers, and schools driving educational transformation continent-wide.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-scef-gold" />
                      Annual Continental Awards
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-scef-gold" />
                      Scholarship Opportunities
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-scef-gold" />
                      Leadership Development
                    </li>
                  </ul>
                </a>

                {/* EduAid Africa */}
                <a
                  href="https://eduaid.africa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card rounded-2xl border-2 border-border p-8 hover:border-scef-blue/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-scef-blue/10 border-2 border-scef-blue/20 flex items-center justify-center mb-6">
                    <BookOpen className="w-7 h-7 text-scef-blue" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-scef-blue transition-colors flex items-center gap-2">
                    EduAid Africa
                    <ExternalLink className="w-4 h-4 text-scef-gold" />
                  </h3>
                  <p className="text-sm text-scef-gold font-medium mb-4">eduaid.africa</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Comprehensive scholarship and educational aid platform connecting underprivileged students with funding opportunities, mentorship programs, and learning resources to break barriers to quality education across Africa.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-scef-gold" />
                      Merit & Need-Based Scholarships
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-scef-gold" />
                      Mentorship Network
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-scef-gold" />
                      Learning Materials Support
                    </li>
                  </ul>
                </a>
              </div>
            </div>
          </section>

          {/* Programs Grid */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  All <span className="text-scef-gold">Programs</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Explore our complete range of education initiatives transforming learning outcomes across Africa.
                </p>
              </div>
              <div className="space-y-8">
                {programs.map((program) => (
                  <div
                    key={program.title}
                    className="group bg-card rounded-2xl border-2 border-border overflow-hidden hover:border-scef-blue/30 hover:shadow-lg transition-all duration-500"
                  >
                    <div className="grid lg:grid-cols-3 gap-0">
                      {/* Content */}
                      <div className="lg:col-span-2 p-8 lg:p-12">
                        <div className="flex items-start gap-6">
                          <div className="w-16 h-16 rounded-xl bg-scef-blue/10 border-2 border-scef-blue/20 flex items-center justify-center shrink-0">
                            <program.icon className="w-8 h-8 text-scef-blue" />
                          </div>
                          <div className="flex-1">
                            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2 group-hover:text-scef-blue transition-colors">
                              {program.title}
                            </h2>
                            <p className="text-sm font-medium text-scef-gold mb-4">
                              {program.subtitle}
                            </p>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                              {program.description}
                            </p>
                            <Link
                              to={program.href}
                              className="inline-flex items-center gap-2 text-scef-blue font-semibold hover:gap-3 transition-all"
                            >
                              Learn More
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                      
                      {/* Features */}
                      <div className="bg-scef-blue/5 p-8 lg:p-12 flex flex-col justify-center border-l-2 border-border">
                        <h3 className="font-display font-semibold text-foreground mb-4">Key Features</h3>
                        <ul className="space-y-3">
                          {program.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3 text-muted-foreground">
                              <span className="w-2 h-2 rounded-full bg-scef-gold" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Programs;
