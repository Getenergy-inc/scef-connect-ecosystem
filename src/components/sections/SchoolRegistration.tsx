import { Link } from "react-router-dom";
import { School, HandHeart } from "lucide-react";

/**
 * School Registration & Adopt-a-School Training Model.
 */
export const SchoolRegistration = () => {
  const schoolOptions = [
    "Teacher training",
    "School management training",
    "Student career guidance",
    "My Career My Life sessions",
    "Girls education empowerment sessions",
    "Special needs education support",
    "Digital learning orientation",
    "TVET and vocational awareness",
  ];

  const partnerOptions = [
    "Career guidance training",
    "Teacher development",
    "Special needs education support",
    "Girls education mentorship",
    "Digital learning support",
    "Vocational education exposure",
  ];

  return (
    <section
      id="school-registration"
      className="bg-card py-20 md:py-24"
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
            Schools & Partners
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.5rem]">
            Bring Training and Career Guidance to Your School
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Schools can register for SCEF to deliver training physically,
            virtually, or through local chapters. CSR and institutional partners
            can adopt schools for targeted training tracks.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-background p-6 md:p-8">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-scef-blue-darker text-scef-gold">
              <School className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl font-bold text-scef-blue-darker">
              Schools Can Register For
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-2 text-sm">
              {schoolOptions.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2 text-foreground"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-scef-gold" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6 md:p-8">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-scef-blue-darker text-scef-gold">
              <HandHeart className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl font-bold text-scef-blue-darker">
              Partners Can Adopt Schools For
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-2 text-sm">
              {partnerOptions.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2 text-foreground"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-scef-gold" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/programs/training-development#register"
            className="inline-flex h-12 items-center rounded-md bg-scef-gold px-7 font-semibold text-scef-blue-darker hover:bg-scef-gold-hover"
          >
            Register Your School
          </Link>
          <Link
            to="/partner-with-us"
            className="inline-flex h-12 items-center rounded-md bg-scef-blue-darker px-7 font-semibold text-white hover:bg-scef-blue"
          >
            Adopt a School
          </Link>
          <Link
            to="/partner-with-us"
            className="inline-flex h-12 items-center rounded-md border border-border bg-background px-7 font-semibold text-scef-blue-darker hover:border-scef-gold hover:text-scef-gold-dark"
          >
            Sponsor a Training
          </Link>
          <Link
            to="/contact"
            className="inline-flex h-12 items-center rounded-md border border-border bg-background px-7 font-semibold text-scef-blue-darker hover:border-scef-gold hover:text-scef-gold-dark"
          >
            Request SCEF Visit
          </Link>
        </div>
      </div>
    </section>
  );
};
