import { Link } from "react-router-dom";
import { siteContent } from "@/config/siteContent";
import { useState } from "react";
import { Play, X } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

export const ProgramsGrid = () => {
  const { programs } = siteContent.homepage;
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const { t } = useLocale();

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-10">
          {t('home.programs.title')}
        </h2>

        {/* Programs Grid - 6 Core Programs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {programs.map((program) => (
            <div key={program.id} className="group">
              {/* Card */}
              <div className="bg-card rounded-xl overflow-hidden border-2 border-black hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                {/* Image/Logo */}
                <Link to={program.href}>
                  <div className="aspect-square overflow-hidden bg-muted flex items-center justify-center p-2">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>

                {/* Title & Video Button */}
                <div className="p-3">
                  <Link to={program.href}>
                    <h3 className="font-display text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem]">
                      {program.title}
                    </h3>
                  </Link>
                  
                  {/* Video Play Button */}
                  {program.video && (
                    <button
                      onClick={() => setActiveVideo(program.video!)}
                      className="mt-2 flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                    >
                      <Play className="w-3 h-3" />
                      Watch Video
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
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
