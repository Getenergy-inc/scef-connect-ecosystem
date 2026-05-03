import { Link } from "react-router-dom";
import { GraduationCap, Home, Package, Vote, Accessibility, Wrench, Handshake, Compass } from "lucide-react";

const ways = [
  { icon: GraduationCap, title: "Donate to Scholarships", to: "/donate" },
  { icon: Home, title: "Adopt a School", to: "/partner-with-us" },
  { icon: Package, title: "Donate In-Kind", to: "/donate" },
  { icon: Vote, title: "Vote for a Recipient School", to: "/vote" },
  { icon: Accessibility, title: "Adopt a Special Needs School", to: "/programs/special-needs-education" },
  { icon: Wrench, title: "Support Vocational Education", to: "/programs/eduaid-africa" },
  { icon: Handshake, title: "Partner With Us", to: "/partner-with-us" },
  { icon: Compass, title: "Sponsor Career Guidance", to: "/csr-fund-management" },
];

export const WaysToSupport = () => {
  return (
    <section className="bg-card py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
            Get Involved
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.5rem]">
            Ways to Support Education in Africa
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Choose the action that fits you — every contribution funds verified
            schools, learners and educators through the GFA Wallet.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4">
          {ways.map(({ icon: Icon, title, to }) => (
            <Link
              key={title}
              to={to}
              className="group flex flex-col items-center rounded-xl border border-border bg-background p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-scef-gold/40 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-scef-gold/15 text-scef-gold-dark ring-1 ring-scef-gold/30 transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-sm font-bold leading-tight text-scef-blue-darker md:text-[15px]">
                {title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
