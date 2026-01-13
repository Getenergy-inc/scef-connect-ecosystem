import { 
  GraduationCap, 
  Building, 
  Laptop, 
  BookOpen, 
  Users, 
  Heart,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/LocaleContext";

const programs = [
  {
    icon: GraduationCap,
    title: "Scholarship Program",
    description: "Full and partial scholarships for students from underprivileged backgrounds, covering tuition, books, and living expenses.",
    link: "/donate",
    color: "#1F892B"
  },
  {
    icon: Building,
    title: "School Renovation",
    description: "Rebuild My School Africa initiative: renovating classrooms, building libraries, and creating safe learning environments.",
    link: "/programs/rebuild-my-school-africa",
    color: "#2563EB"
  },
  {
    icon: Laptop,
    title: "Digital Learning Centers",
    description: "Establishing computer labs and e-learning facilities with internet connectivity in underserved schools.",
    link: "/programs/digital-learning",
    color: "#8B5CF6"
  },
  {
    icon: BookOpen,
    title: "Teacher Training",
    description: "Professional development programs for educators in modern pedagogy, ICT skills, and inclusive education practices.",
    link: "/programs/nesa-africa",
    color: "#F59E0B"
  },
  {
    icon: Users,
    title: "Community Education",
    description: "Adult literacy programs, vocational training, and parent engagement initiatives for holistic community development.",
    link: "/chapters",
    color: "#EC4899"
  },
  {
    icon: Heart,
    title: "Emergency Education Aid",
    description: "Rapid response education support for communities affected by conflict, natural disasters, or extreme poverty.",
    link: "/donate",
    color: "#EF4444"
  }
];

export default function EduAidPrograms() {
  const { t, isRTL } = useLocale();

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary-foreground rounded-full text-sm font-medium mb-4 border border-secondary/30">
            {t('eduaid.programs.badge') || 'Impact Initiatives'}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('eduaid.programs.title') || 'Programs & Initiatives'}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('eduaid.programs.subtitle') || 'Comprehensive education support programs designed to transform lives and communities'}
          </p>
        </div>

        {/* Programs grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <Link
                key={index}
                to={program.link}
                className="group bg-card border-2 border-border hover:border-primary/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${program.color}15` }}
                >
                  <Icon className="w-7 h-7" style={{ color: program.color }} />
                </div>
                
                <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {program.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {program.description}
                </p>
                
                <span className="inline-flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </span>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-[#1F892B] hover:bg-[#1F892B]/90">
            <Link to="/programs" className="flex items-center gap-2">
              {t('eduaid.programs.cta') || 'View All Programs'}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
