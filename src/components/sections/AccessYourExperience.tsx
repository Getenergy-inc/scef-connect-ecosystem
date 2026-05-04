import { useState } from "react";
import { Link } from "react-router-dom";
import { LogIn, UserPlus, ChevronDown, ArrowRight } from "lucide-react";

const loginOptions = [
  { label: "Member Login", href: "/auth/sign-in?role=member" },
  { label: "Volunteer Login", href: "/auth/sign-in?role=volunteer" },
  { label: "Partner Login", href: "/auth/sign-in?role=partner" },
  { label: "Chapter Login", href: "/auth/sign-in?role=chapter" },
  { label: "Admin Login", href: "/auth/sign-in?role=admin" },
];

const signupOptions = [
  { label: "Become a Member", href: "/auth/sign-up?role=member" },
  { label: "Join as Volunteer", href: "/auth/sign-up?role=volunteer" },
  { label: "Register as Partner / Sponsor", href: "/auth/sign-up?role=partner" },
  { label: "Create Local Chapter Account", href: "/auth/sign-up?role=chapter" },
];

const Card = ({
  title,
  icon: Icon,
  options,
  primaryCta,
  primaryHref,
  accent,
}: {
  title: string;
  icon: typeof LogIn;
  options: { label: string; href: string }[];
  primaryCta: string;
  primaryHref: string;
  accent: "green" | "gold";
}) => {
  const [open, setOpen] = useState(false);
  const accentClasses =
    accent === "green"
      ? "from-[#0B5D3B] to-[#0E7549] text-white"
      : "from-[#D4AF37] to-[#B8961F] text-[#0A0A0A]";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-7 md:p-8 shadow-sm hover:shadow-xl transition-all">
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${accentClasses}`} />
      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${accentClasses} mb-5`}>
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-[#0A0A0A] mb-2">{title}</h3>
      <p className="text-sm text-neutral-600 mb-5">
        Choose how you want to {title.toLowerCase()} and continue your journey.
      </p>

      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="w-full inline-flex items-center justify-between gap-2 px-4 py-3 rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-sm font-semibold text-[#0A0A0A] transition-colors"
        aria-expanded={open}
      >
        Select {title.toLowerCase()} type
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul className="mt-2 rounded-lg border border-neutral-200 overflow-hidden bg-white shadow-sm">
          {options.map((opt) => (
            <li key={opt.label}>
              <Link
                to={opt.href}
                className="flex items-center justify-between gap-2 px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-[#0B5D3B]/5 hover:text-[#0B5D3B] transition-colors border-b border-neutral-100 last:border-b-0"
              >
                {opt.label}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link
        to={primaryHref}
        className="mt-5 inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-lg bg-[#0B5D3B] hover:bg-[#0E7549] text-white text-sm font-semibold transition-colors"
      >
        {primaryCta}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export const AccessYourExperience = () => {
  return (
    <section className="bg-white py-14 md:py-20 border-y border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase mb-3">
            Membership Platform
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
            Access Your Experience
          </h2>
          <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
            SCEF is a membership-driven ecosystem. Log in or sign up to access
            dashboards, wallets, chapters, training and engagement tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <Card
            title="Login"
            icon={LogIn}
            options={loginOptions}
            primaryCta="Login"
            primaryHref="/auth/sign-in"
            accent="green"
          />
          <Card
            title="Sign Up"
            icon={UserPlus}
            options={signupOptions}
            primaryCta="Sign Up"
            primaryHref="/auth/sign-up"
            accent="gold"
          />
        </div>
      </div>
    </section>
  );
};

export default AccessYourExperience;
