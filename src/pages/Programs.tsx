import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Award, BookOpen, Home, Heart, Accessibility, Globe, Library } from "lucide-react";

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

          {/* Programs Grid */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
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
