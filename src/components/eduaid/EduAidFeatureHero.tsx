import { Target, Building, GraduationCap, TrendingUp } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

interface Feature {
  title: string;
  description: string;
  stats?: {
    current?: string;
    percentage: string;
  };
}

interface EduAidFeatureHeroProps {
  title: string;
  description: string;
  features: Feature[];
}

export default function EduAidFeatureHero({ title, description, features }: EduAidFeatureHeroProps) {
  const { isRTL } = useLocale();
  const icons = [GraduationCap, Building, Target];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container px-4 md:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#1F892B]/10 text-[#1F892B] rounded-full text-sm font-medium mb-4">
            Vision 2032
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = icons[index] || Target;
            return (
              <div
                key={index}
                className="group relative bg-card border-2 border-border hover:border-[#1F892B]/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-[#1F892B]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1F892B]/20 transition-colors">
                  <Icon className="w-7 h-7 text-[#1F892B]" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  {feature.description}
                </p>

                {/* Progress indicator */}
                {feature.stats && (
                  <div className="space-y-3">
                    {feature.stats.current && (
                      <p className="text-xs text-muted-foreground italic">
                        {feature.stats.current}
                      </p>
                    )}
                    <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#1F892B] to-[#4ADE80] rounded-full transition-all duration-1000"
                        style={{ width: feature.stats.percentage }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#1F892B] font-semibold">{feature.stats.percentage} achieved</span>
                      <TrendingUp className="w-4 h-4 text-[#1F892B]" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
