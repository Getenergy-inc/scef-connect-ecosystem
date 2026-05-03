import { Link } from "react-router-dom";
import { GraduationCap, Users, BookOpen, Compass } from "lucide-react";

/**
 * Training, Development & Career Pathways — landing band introducing the
 * EduAid-Africa training program and My Career My Life calendar.
 */
export const TrainingDevelopment = () => {
  return (
    <section className="relative overflow-hidden bg-scef-blue-darker py-20 text-white md:py-24">
      <div className="absolute inset-0 bg-scef-pattern opacity-[0.05]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(45_92%_42%/0.10),transparent_60%)]" />

      <div className="container relative mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-light">
            Capacity Building
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight md:text-[2.5rem]">
            Training, Development & Career Pathways
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
            SCEF provides structured training and capacity development for teachers,
            school leaders, students, volunteers, education stakeholders, and local
            chapters through EduAid-Africa, Education Online Africa, and My Career My Life.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { icon: GraduationCap, label: "Teacher Training" },
            { icon: Users, label: "School Leadership" },
            { icon: Compass, label: "Career Guidance" },
            { icon: BookOpen, label: "TVET & Vocational" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-scef-gold/15 text-scef-gold ring-1 ring-scef-gold/30">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div className="text-sm font-semibold text-white">{label}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/programs/training-development"
            className="inline-flex h-12 items-center rounded-md bg-scef-gold px-7 font-semibold text-scef-blue-darker hover:bg-scef-gold-hover"
          >
            View Training Calendar
          </Link>
          <Link
            to="/programs/training-development#register"
            className="inline-flex h-12 items-center rounded-md border border-white/40 bg-transparent px-7 font-semibold text-white hover:bg-white/10"
          >
            Register for a Webinar
          </Link>
          <Link
            to="/programs/training-development#school-registration"
            className="inline-flex h-12 items-center rounded-md border border-white/40 bg-transparent px-7 font-semibold text-white hover:bg-white/10"
          >
            Register Your School
          </Link>
          <Link
            to="/partner-with-us"
            className="inline-flex h-12 items-center rounded-md border border-white/40 bg-transparent px-7 font-semibold text-white hover:bg-white/10"
          >
            Sponsor a Training
          </Link>
        </div>
      </div>
    </section>
  );
};
