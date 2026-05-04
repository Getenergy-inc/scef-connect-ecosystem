import { Link } from "react-router-dom";
import { Compass, School, Users, ArrowRight } from "lucide-react";

const features = [
  { icon: Compass, title: "Career Guidance", desc: "Structured guidance for JSS, SS2 and SS3 students." },
  { icon: School, title: "School Onboarding", desc: "Onboard your school into the MCML program." },
  { icon: Users, title: "Volunteer Opportunities", desc: "Mentor students and support career events." },
];

export const CareerProgramSection = () => {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase mb-3">
              Career Program
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
              My Career My Life (MCML)
            </h2>
            <p className="text-neutral-700 text-base md:text-lg leading-relaxed mb-6">
              A career guidance program for African students at JSS, SS2 and SS3
              levels — delivered through schools and powered by volunteers under
              EduAid-Africa.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/programs/eduaid-africa#register-school"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#0B5D3B] hover:bg-[#0E7549] text-white text-sm font-semibold transition-colors"
              >
                Register Your School
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/get-involved/volunteer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#0B5D3B] text-[#0B5D3B] hover:bg-[#0B5D3B] hover:text-white text-sm font-semibold transition-colors"
              >
                Volunteer
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid gap-4 sm:grid-cols-3">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 hover:bg-white hover:shadow-md transition-all"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#D4AF37]/15 text-[#0B5D3B] mb-3">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-sm font-bold text-[#0A0A0A] mb-1">{title}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerProgramSection;
