import { 
  Users, 
  Baby, 
  GraduationCap, 
  Briefcase, 
  Heart,
  School
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { PENDING_METRIC } from "@/data/impactEvidence";

const targetGroups = [
  {
    icon: Baby,
    title: "Early Childhood (3-6 years)",
    description: "Foundation programs for pre-primary education, early literacy, and child development support.",
    stats: PENDING_METRIC
  },
  {
    icon: School,
    title: "Primary School Students",
    description: "Scholarships, school supplies, and infrastructure support for children aged 6-12.",
    stats: PENDING_METRIC
  },
  {
    icon: Users,
    title: "Secondary School Students",
    description: "Full tuition support, career guidance, and STEM education programs for teenagers.",
    stats: PENDING_METRIC
  },
  {
    icon: GraduationCap,
    title: "University Students",
    description: "Higher education scholarships, research grants, and mentorship programs.",
    stats: PENDING_METRIC
  },
  {
    icon: Briefcase,
    title: "Educators & Teachers",
    description: "Professional development, ICT training, and teaching methodology workshops.",
    stats: PENDING_METRIC
  },
  {
    icon: Heart,
    title: "Vulnerable Communities",
    description: "Special focus on refugees, girls, orphans, and children with disabilities.",
    stats: PENDING_METRIC
  }
];

export default function EduAidTargetGroups() {
  const { t, isRTL } = useLocale();

  return (
    <section className="py-20 bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            {t('eduaid.target.badge') || 'Who We Serve'}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('eduaid.target.title') || 'Target Beneficiaries'}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('eduaid.target.subtitle') || 'Reaching learners at every stage of their educational journey'}
          </p>
        </div>

        {/* Target groups grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {targetGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <div
                key={index}
                className="relative bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1F892B]/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-[#1F892B]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">
                      {group.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {group.description}
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted rounded-full text-xs font-medium text-foreground">
                      <span className="w-2 h-2 bg-[#1F892B] rounded-full" />
                      <span className="italic text-muted-foreground">{t('eduaid.reporting') || 'Reporting in progress'}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
