import { 
  GraduationCap, 
  School, 
  Laptop, 
  Users, 
  Globe, 
  HeartHandshake,
  CheckCircle
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const objectives = [
  {
    icon: GraduationCap,
    title: "Scholarship Access",
    description: "Providing full and partial scholarships to underprivileged students across Africa, enabling access to quality education from primary to tertiary level.",
    color: "#1F892B"
  },
  {
    icon: School,
    title: "School Infrastructure",
    description: "Renovating and building schools with modern facilities, libraries, laboratories, and safe learning environments for students and teachers.",
    color: "#FFD700"
  },
  {
    icon: Laptop,
    title: "Digital Education",
    description: "Equipping schools with technology infrastructure and training teachers in ICT integration for modern pedagogy and digital literacy.",
    color: "#1F892B"
  },
  {
    icon: Users,
    title: "Teacher Development",
    description: "Comprehensive training programs for educators in modern teaching methodologies, child psychology, and subject matter expertise.",
    color: "#FFD700"
  },
  {
    icon: Globe,
    title: "Pan-African Reach",
    description: "Expanding educational support across all 54 African nations through strategic partnerships and local chapter networks.",
    color: "#1F892B"
  },
  {
    icon: HeartHandshake,
    title: "Community Engagement",
    description: "Building sustainable education ecosystems through parent involvement, community partnerships, and local stakeholder collaboration.",
    color: "#FFD700"
  }
];

export default function EduAidObjectives() {
  const { t, isRTL } = useLocale();

  return (
    <section className="py-20 bg-[#0A1628] text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#1F892B]/20 border border-[#1F892B]/40 text-[#4ADE80] rounded-full text-sm font-medium mb-4">
            {t('eduaid.objectives.badge') || 'Our Mission'}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            {t('eduaid.objectives.title') || 'Core Objectives'}
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {t('eduaid.objectives.subtitle') || 'Strategic pillars driving educational transformation across the African continent'}
          </p>
        </div>

        {/* Objectives grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {objectives.map((objective, index) => {
            const Icon = objective.icon;
            return (
              <div
                key={index}
                className="group relative bg-slate-800/50 border border-slate-700 hover:border-[#1F892B]/50 rounded-2xl p-6 transition-all duration-300"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${objective.color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: objective.color }} />
                </div>
                
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {objective.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {objective.description}
                </p>

                {/* Decorative corner */}
                <div 
                  className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at 100% 0%, ${objective.color}15 0%, transparent 70%)`
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
