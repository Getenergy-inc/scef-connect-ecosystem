import { Link } from "react-router-dom";
import { GraduationCap, Users, Sparkles, Accessibility, Briefcase, ArrowRight } from "lucide-react";

const tracks = [
  { icon: GraduationCap, title: "EduAid-Africa Monthly Webinars", desc: "Live monthly sessions for teachers and schools." },
  { icon: Users, title: "Teacher & School Training", desc: "Capacity building for educators across Africa." },
  { icon: Sparkles, title: "Leadership & Development", desc: "School leadership and management programs." },
  { icon: Accessibility, title: "Inclusive Education", desc: "Training for special needs and inclusion." },
  { icon: Briefcase, title: "TVET & Career Development", desc: "Skills, vocational and career pathways." },
];

export const TrainingWebinarsSection = () => {
  return (
    <section className="bg-neutral-50 py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#0B5D3B] uppercase mb-3">
            Training & Webinars
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
            EduAid-Africa Training & Webinar Programs
          </h2>
          <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
            Continuous monthly programs powering teacher capacity, school
            leadership, inclusive education and career readiness.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[#D4AF37]/60 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#0B5D3B]/10 text-[#0B5D3B] mb-4">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="text-base font-bold text-[#0A0A0A] mb-1.5">{title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/media/webinars"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#0B5D3B] hover:bg-[#0E7549] text-white text-sm font-semibold transition-colors"
          >
            Register for Webinar
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/programs/eduaid-africa"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#D4AF37] hover:bg-[#E5C24A] text-[#0A0A0A] text-sm font-semibold transition-colors"
          >
            Sponsor Training
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrainingWebinarsSection;
