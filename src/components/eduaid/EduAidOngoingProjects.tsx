import { MapPin, Calendar, Users, Building, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";

const projects = [
  {
    title: "Lagos Education Hub",
    location: "Lagos State, Nigeria",
    type: "Digital Learning Center",
    status: "In Progress",
    progress: 75,
    beneficiaries: "2,500+ students",
    timeline: "Q2 2025"
  },
  {
    title: "Nairobi Teacher Training",
    location: "Nairobi, Kenya",
    type: "Educator Development",
    status: "Active",
    progress: 60,
    beneficiaries: "800+ teachers",
    timeline: "Ongoing"
  },
  {
    title: "Accra School Renovation",
    location: "Greater Accra, Ghana",
    type: "Infrastructure",
    status: "In Progress",
    progress: 45,
    beneficiaries: "1,200+ students",
    timeline: "Q3 2025"
  },
  {
    title: "Johannesburg Scholarship Fund",
    location: "Gauteng, South Africa",
    type: "Scholarships",
    status: "Active",
    progress: 90,
    beneficiaries: "500+ scholars",
    timeline: "2025 Cycle"
  }
];

export default function EduAidOngoingProjects() {
  const { t, isRTL } = useLocale();

  return (
    <section className="py-20 bg-muted/30" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 bg-[#1F892B]/10 text-[#1F892B] rounded-full text-sm font-medium mb-4">
              {t('eduaid.projects.badge') || 'Active Projects'}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              {t('eduaid.projects.title') || 'Ongoing Initiatives'}
            </h2>
            <p className="text-muted-foreground max-w-xl">
              {t('eduaid.projects.subtitle') || 'Current projects transforming education across the African continent'}
            </p>
          </div>
          <Button asChild variant="outline" className="w-fit">
            <Link to="/reports" className="flex items-center gap-2">
              {t('eduaid.projects.viewAll') || 'View All Projects'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-card border-2 border-border hover:border-[#1F892B]/40 rounded-2xl p-6 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </div>
                </div>
                <span className="px-3 py-1 bg-[#1F892B]/10 text-[#1F892B] text-xs font-medium rounded-full">
                  {project.status}
                </span>
              </div>

              {/* Type badge */}
              <div className="inline-block px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full mb-4">
                {project.type}
              </div>

              {/* Progress bar */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-foreground font-medium">{project.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#1F892B] to-[#4ADE80] rounded-full transition-all duration-1000"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-border text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span className="italic">{t('eduaid.reporting') || 'Reporting in progress'}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {project.timeline}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
