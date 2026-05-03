import { Megaphone, Tv, HeartHandshake, School, Compass, Landmark } from "lucide-react";

const items = [
  {
    icon: Megaphone,
    title: "It's In Me Advocacy",
    blurb: "Youth education, purpose discovery, leadership and empowerment storytelling.",
  },
  {
    icon: Tv,
    title: "NESA TV",
    blurb: "Education interviews, award coverage, policy discussions and school transformation stories.",
  },
  {
    icon: HeartHandshake,
    title: "EduAid-Africa Campaigns",
    blurb: "Scholarships, donations, school support, CSR funding and special needs inclusion.",
  },
  {
    icon: School,
    title: "Rebuild My School Africa",
    blurb: "School nomination, renovation storytelling, public voting and infrastructure awareness.",
  },
  {
    icon: Compass,
    title: "Career Guidance & Counseling",
    blurb: "Student mentorship, institutional career support and life-path guidance.",
  },
  {
    icon: Landmark,
    title: "Policy & Stakeholder Engagement",
    blurb: "Education partnerships with governments, NGOs, CSR partners and diaspora institutions.",
  },
];

export const AdvocacyServices = () => {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-20 text-white md:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B5D3B]/40 via-transparent to-scef-gold/10" />
      <div className="container relative mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold">
            Voice & Visibility
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight md:text-[2.5rem]">
            SCEF Education Advocacy Services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Six advocacy pillars amplifying African education through media,
            mentorship, campaigns and policy engagement.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, blurb }) => (
            <div
              key={title}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-scef-gold/40 hover:bg-white/[0.07]"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-scef-gold/15 text-scef-gold ring-1 ring-scef-gold/30">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-lg font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{blurb}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
