import { Link } from "react-router-dom";
import { ArrowRight, Award, BookOpen, Home, Heart, Accessibility, Globe, Radio, Tv, Video, Library } from "lucide-react";
import { Button } from "@/components/ui/button";

const educationPrograms = [
  {
    icon: BookOpen,
    title: "EduAid-Africa",
    description: "Scholarships & Funding for underprivileged students across Africa.",
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
  {
    icon: Globe,
    title: "Digital Learning",
    description: "Modern digital learning platforms and e-resources.",
    href: "/programs/digital-learning",
  },
  {
    icon: Library,
    title: "eLibrary Nigeria",
    description: "Digital library resources for Nigerian students and educators.",
    href: "/programs/elibrary-nigeria",
  },
];

const recognitionPrograms = [
  {
    icon: Award,
    title: "NESA-Africa",
    description: "New Education Standard Award celebrating excellence.",
    href: "/programs/nesa-africa",
  },
  {
    icon: BookOpen,
    title: "Nominee Research Corps",
    description: "Research-driven nomination processes.",
    href: "/programs/nominee-research-corps",
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
];

export const ProgramsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-blue/10 text-scef-blue text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Programs & Platforms
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              What We <span className="text-scef-gold">Do</span>
            </h2>
          </div>
          <Button variant="outline" size="lg" className="border-scef-blue text-scef-blue hover:bg-scef-blue hover:text-white" asChild>
            <Link to="/programs">
              Explore All Programs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Education Programs Grid */}
        <div className="mb-16">
          <h3 className="font-display text-xl font-bold text-foreground mb-6">Education Programs</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationPrograms.map((program, index) => (
              <Link
                key={program.title}
                to={program.href}
                className="group relative bg-card rounded-2xl p-8 border-2 border-black hover:border-scef-gold hover:shadow-lg transition-all duration-500 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-scef-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative w-14 h-14 rounded-xl bg-scef-blue border-2 border-black flex items-center justify-center mb-5 group-hover:bg-scef-gold transition-colors duration-300">
                  <program.icon className="w-7 h-7 text-scef-gold group-hover:text-scef-blue-dark transition-colors" />
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

        {/* Recognition & Media Row */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recognition */}
          <div className="bg-card rounded-2xl p-8 border border-border">
            <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-scef-gold" />
              Recognition & Research
            </h3>
            <div className="space-y-4">
              {recognitionPrograms.map((program) => (
                <Link
                  key={program.title}
                  to={program.href}
                  className="flex items-center justify-between p-4 rounded-xl bg-background border border-border hover:border-scef-blue/30 transition-colors group"
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

          {/* Media */}
          <div className="bg-card rounded-2xl p-8 border border-border">
            <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Tv className="w-5 h-5 text-scef-gold" />
              Media Platforms
            </h3>
            <div className="space-y-4">
              {mediaPrograms.map((program) => (
                <Link
                  key={program.title}
                  to={program.href}
                  className="flex items-center justify-between p-4 rounded-xl bg-background border border-border hover:border-scef-blue/30 transition-colors group"
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
      </div>
    </section>
  );
};
