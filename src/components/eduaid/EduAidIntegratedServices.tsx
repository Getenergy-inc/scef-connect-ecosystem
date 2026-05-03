import { Link } from "react-router-dom";
import { Monitor, Compass, Building2, GraduationCap, ArrowRight, ClipboardList } from "lucide-react";

/**
 * EduAid-Africa Integrated Services band.
 * Education Online Africa, My Career My Life, RMSA and Training are services
 * delivered UNDER the EduAid-Africa umbrella (not standalone programs).
 */
const services = [
  {
    icon: Monitor,
    title: "Education Online Africa (EOA)",
    blurb:
      "Digital learning, certification, EOA Portal and ACDL/AWPC pathways for students, teachers and institutions — delivered as an EduAid-Africa service.",
    href: "/programs/digital-learning",
    cta: "Visit EOA Portal",
  },
  {
    icon: Compass,
    title: "My Career My Life (MCML)",
    blurb:
      "Twelve-month career guidance for JSS, SS2 and SS3 students — subject choices, TVET, digital skills and mentorship. Starts August 2026.",
    href: "/programs/my-career-my-life",
    cta: "Explore MCML",
  },
  {
    icon: Building2,
    title: "Rebuild My School Africa (RMSA)",
    blurb:
      "School renovation, infrastructure rebuilding and learning environment upgrades powered by CSR and partner funding.",
    href: "/programs/rebuild-my-school-africa",
    cta: "Discover RMSA",
  },
  {
    icon: GraduationCap,
    title: "Monthly Training & Development",
    blurb:
      "Monthly teacher training, school leadership, inclusive education, TVET and M&E — certification pathways for African educators.",
    href: "/programs/training-development",
    cta: "View Training Calendar",
  },
];

export const EduAidIntegratedServices = () => {
  return (
    <section
      id="integrated-services"
      className="bg-neutral-50 py-16 md:py-24 scroll-mt-24"
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
            One umbrella · Four integrated services
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.5rem]">
            EduAid-Africa Integrated Services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Education Online Africa, My Career My Life, Rebuild My School Africa
            and our Monthly Training & Development calendar are all delivered as
            integrated services under the EduAid-Africa platform.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2">
          {services.map(({ icon: Icon, title, blurb, href, cta }) => (
            <article
              key={title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-scef-gold/50 hover:shadow-md md:p-7"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-scef-blue-darker/10 text-scef-blue-darker">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold text-scef-blue-darker md:text-xl">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {blurb}
                  </p>
                  <Link
                    to={href}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-scef-blue-darker transition-colors hover:text-scef-gold-dark"
                  >
                    {cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Register Your School anchor target */}
        <div
          id="register-school"
          className="mx-auto mt-12 max-w-4xl scroll-mt-24 rounded-2xl border border-scef-gold/40 bg-white p-6 text-center md:p-8"
        >
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-scef-gold/15 text-scef-gold-dark">
            <ClipboardList className="h-6 w-6" />
          </span>
          <h3 className="mt-3 font-display text-2xl font-bold text-scef-blue-darker">
            Register Your School with EduAid-Africa
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
            Public, private and faith-based schools can register to access
            scholarships, training, RMSA, EOA digital learning and My Career My
            Life advocacy as integrated EduAid-Africa services.
          </p>
          <Link
            to="/programs/training-development#register"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-scef-blue-darker px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-scef-blue-darker/90"
          >
            Start School Registration
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EduAidIntegratedServices;
