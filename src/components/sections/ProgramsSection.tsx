import { Link } from "react-router-dom";
import { ArrowRight, Award, BookOpen, Home, Heart, Accessibility, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const programs = [
  {
    icon: Award,
    title: "NESA-Africa",
    description: "Nigeria Excellence in Secondary Education Awards celebrating academic achievement and leadership across Africa.",
    color: "bg-gold/10 text-gold border-gold/20",
    href: "/programs/nesa-africa",
  },
  {
    icon: BookOpen,
    title: "EduAid-Africa",
    description: "Scholarship and educational support programs providing access to quality education for underprivileged students.",
    color: "bg-terracotta/10 text-terracotta border-terracotta/20",
    href: "/programs/eduaid-africa",
  },
  {
    icon: Home,
    title: "Rebuild My School Africa",
    description: "Infrastructure development initiative reconstructing and renovating schools across the continent.",
    color: "bg-forest/10 text-forest border-forest/20",
    href: "/programs/rebuild-my-school-africa",
  },
  {
    icon: Heart,
    title: "Women & Girls Education",
    description: "Empowering women and girls through education, mentorship, and leadership development programs.",
    color: "bg-gold/10 text-gold border-gold/20",
    href: "/programs/women-girls-education",
  },
  {
    icon: Accessibility,
    title: "Special Needs Education",
    description: "Inclusive education initiatives ensuring every child has access to learning opportunities.",
    color: "bg-terracotta/10 text-terracotta border-terracotta/20",
    href: "/programs/special-needs-education",
  },
  {
    icon: Globe,
    title: "Education Online Africa",
    description: "Digital learning platforms and e-learning resources making education accessible everywhere.",
    color: "bg-forest/10 text-forest border-forest/20",
    href: "/programs/education-online-africa",
  },
];

export const ProgramsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Our Programs
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Flagship <span className="text-gradient-gold">Programs</span>
            </h2>
          </div>
          <Button variant="outline" size="lg" asChild>
            <Link to="/programs">
              View All Programs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <Link
              key={program.title}
              to={program.href}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-lg overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Hover Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon */}
              <div className={`relative w-16 h-16 rounded-xl ${program.color} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <program.icon className="w-8 h-8" />
              </div>
              
              {/* Content */}
              <h3 className="relative font-display text-xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                {program.title}
              </h3>
              <p className="relative text-muted-foreground leading-relaxed mb-6">
                {program.description}
              </p>
              
              {/* Arrow */}
              <div className="relative flex items-center gap-2 text-primary font-medium">
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
