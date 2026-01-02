import { Link } from "react-router-dom";
import { ArrowRight, Award, BookOpen, Home, Heart, Accessibility, Globe, Radio, Tv, Video, Library } from "lucide-react";
import { Button } from "@/components/ui/button";

const educationPrograms = [
  {
    icon: BookOpen,
    title: "EduAid-Africa",
    description: "Scholarships & funding for underprivileged students across Africa.",
    href: "/programs/eduaid-africa",
  },
  {
    icon: Home,
    title: "Rebuild My School Africa",
    description: "Infrastructure development rebuilding schools across the continent.",
    href: "/programs/rebuild-my-school-africa",
  },
  {
    icon: Heart,
    title: "Women & Girls Education",
    description: "Empowering women and girls through education and mentorship.",
    href: "/programs/women-girls-education",
  },
  {
    icon: Accessibility,
    title: "Special Needs Education",
    description: "Inclusive education ensuring every child has access to learning.",
    href: "/programs/special-needs-education",
  },
];

const digitalLearning = [
  {
    icon: Globe,
    title: "Education Online Africa",
    description: "Modern digital learning platforms and e-resources.",
    href: "/programs/digital-learning",
  },
  {
    icon: Library,
    title: "eLibrary Nigeria",
    description: "Promoting Nigerian local content e-libraries with searchable books and resources.",
    href: "/programs/elibrary-nigeria",
  },
];

const recognitionPrograms = [
  {
    icon: Award,
    title: "NESA-Africa",
    description: "New Education Standard Award: 2025–2037 program with regional rotation hosting from 2027.",
    href: "/programs/nesa-africa",
  },
];

const mediaPrograms = [
  {
    icon: Tv,
    title: "NESA Africa TV",
    description: "Educational broadcasting platform.",
    href: "/media",
  },
  {
    icon: Radio,
    title: "It's In Me Radio",
    description: "Inspiring stories from educators.",
    href: "/media",
  },
  {
    icon: Video,
    title: "EduAid Webinar Series",
    description: "Expert-led educational webinars.",
    href: "/media",
  },
  {
    icon: Globe,
    title: "EduAid Education Tourism Show",
    description: "Showcasing education destinations across Africa.",
    href: "/media",
  },
];

export const ProgramsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-blue/10 text-scef-blue text-sm font-medium mb-4 border-2 border-black">
              <BookOpen className="w-4 h-4" />
              Programs & Platforms
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              What We <span className="text-scef-gold">Deliver</span>
            </h2>
          </div>
          <Button variant="outline" size="lg" className="border-scef-blue text-scef-blue hover:bg-scef-blue hover:text-white border-2" asChild>
            <Link to="/programs">
              Explore All Programs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Education Programs Grid */}
        <div className="mb-12">
          <h3 className="font-display text-xl font-bold text-foreground mb-6">Education Programs</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {educationPrograms.map((program, index) => (
              <Link
                key={program.title}
                to={program.href}
                className="group relative bg-card rounded-2xl p-6 border-2 border-black hover:border-scef-gold hover:shadow-lg transition-all duration-500 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-scef-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative w-12 h-12 rounded-xl bg-scef-blue border-2 border-black flex items-center justify-center mb-4 group-hover:bg-scef-gold transition-colors duration-300">
                  <program.icon className="w-6 h-6 text-scef-gold group-hover:text-scef-blue-dark transition-colors" />
                </div>
                
                <h3 className="relative font-display text-lg font-bold text-card-foreground mb-2 group-hover:text-scef-blue transition-colors">
                  {program.title}
                </h3>
                <p className="relative text-muted-foreground text-sm leading-relaxed mb-4">
                  {program.description}
                </p>
                
                <div className="relative flex items-center gap-2 text-scef-gold text-sm font-semibold">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Digital Learning & Recognition Row */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Digital Learning */}
          <div className="bg-card rounded-2xl p-8 border-2 border-black">
            <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-scef-gold" />
              Digital Learning
            </h3>
            <div className="space-y-4">
              {digitalLearning.map((program) => (
                <Link
                  key={program.title}
                  to={program.href}
                  className="flex items-center justify-between p-4 rounded-xl bg-background border-2 border-black hover:border-scef-blue/30 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <program.icon className="w-5 h-5 text-scef-blue" />
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-scef-blue transition-colors">
                        {program.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{program.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-scef-blue group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Recognition */}
          <div className="bg-card rounded-2xl p-8 border-2 border-black">
            <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-scef-gold" />
              Recognition & Accountability
            </h3>
            <div className="space-y-4">
              {recognitionPrograms.map((program) => (
                <Link
                  key={program.title}
                  to={program.href}
                  className="flex items-center justify-between p-4 rounded-xl bg-background border-2 border-black hover:border-scef-blue/30 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <program.icon className="w-5 h-5 text-scef-blue" />
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-scef-blue transition-colors">
                        {program.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{program.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-scef-blue group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Media Platforms */}
        <div className="bg-card rounded-2xl p-8 border-2 border-black">
          <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Tv className="w-5 h-5 text-scef-gold" />
            Media Platforms
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mediaPrograms.map((program) => (
              <Link
                key={program.title}
                to={program.href}
                className="flex items-center justify-between p-4 rounded-xl bg-background border-2 border-black hover:border-scef-blue/30 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <program.icon className="w-5 h-5 text-scef-blue" />
                  <div>
                    <h4 className="font-semibold text-foreground group-hover:text-scef-blue transition-colors text-sm">
                      {program.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">{program.description}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-scef-blue group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
