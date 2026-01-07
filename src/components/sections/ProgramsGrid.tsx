import { Link } from "react-router-dom";
import { siteContent } from "@/config/siteContent";
import { useState } from "react";
import { Play, X, BookOpen, Building, Award, Heart, Monitor, Briefcase, Accessibility, Library } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Building,
  Award,
  Heart,
  Monitor,
  Briefcase,
  Accessibility,
  Library,
};

export const ProgramsGrid = () => {
  const { programs } = siteContent;
  const allPrograms = [...programs.core, ...programs.digital];
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const { t, isRTL } = useLocale();

  return (
    <section className="py-16 bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-10">
          {t("home.programs.title")}
        </h2>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allPrograms.map((program) => {
            const IconComponent = iconMap[program.icon] || BookOpen;
            return (
              <div key={program.title} className="group">
                {/* Card */}
                <div className="bg-card rounded-xl overflow-hidden border-2 border-black hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col">
                  {/* Icon Header */}
                  <Link to={program.href}>
                    <div className="aspect-video overflow-hidden bg-primary/10 flex items-center justify-center">
                      <IconComponent className="w-16 h-16 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <Link to={program.href}>
                      <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                        {program.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                      {program.description}
                    </p>
                    <Link 
                      to={program.href}
                      className="mt-3 text-sm text-primary font-medium hover:underline inline-flex items-center gap-1"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Video Modal */}
        {activeVideo && (
          <div 
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <div 
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute -top-10 right-0 text-white hover:text-primary transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <video
                src={activeVideo}
                controls
                autoPlay
                className="w-full rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
