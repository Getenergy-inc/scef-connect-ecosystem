import { Link } from "react-router-dom";
import {
  GraduationCap,
  Crown,
  Cpu,
  ShieldCheck,
  Compass,
  Leaf,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const PILLARS = [
  {
    icon: GraduationCap,
    title: "Girls Education Access",
    body: "Supporting school access, scholarships, learning materials, and inclusive educational opportunities for girls.",
  },
  {
    icon: Crown,
    title: "Women Leadership Development",
    body: "Building leadership pathways for women educators, professionals, youth leaders, mentors, and local chapter executives.",
  },
  {
    icon: Cpu,
    title: "STEM & Digital Inclusion",
    body: "Encouraging girls and women to participate in technology, innovation, digital learning, and future career opportunities.",
  },
  {
    icon: ShieldCheck,
    title: "Safeguarding & Wellbeing",
    body: "Promoting safe learning spaces, menstrual health awareness, mental wellbeing, and gender inclusion advocacy.",
  },
  {
    icon: Compass,
    title: "Mentorship & Career Guidance",
    body: "Connecting girls and young women with mentors, employability pathways, entrepreneurship, and leadership opportunities.",
  },
  {
    icon: Leaf,
    title: "Community Advocacy & ESG",
    body: "Empowering women and girls to lead sustainability, climate action, ESG awareness, and community development initiatives.",
  },
];

const CTAS = [
  { label: "Support Girls Education", to: "/wallet/donate?fund=girls-education" },
  { label: "Sponsor Women Empowerment", to: "/wallet/donate?fund=women-empowerment" },
  { label: "Become a Mentor", to: "/get-involved/volunteer?role=mentor" },
  { label: "Partner With SCEF", to: "/partner-with-us" },
  { label: "Join Advocacy Campaign", to: "/get-involved/volunteer?cause=advocacy" },
];

export const WomenGirlsEmpowerment = () => {
  return (
    <section
      aria-labelledby="women-girls-empowerment-heading"
      className="py-20 md:py-24 bg-gradient-to-b from-background via-scef-blue/[0.03] to-background"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-scef-gold/15 text-scef-gold-dark text-xs font-semibold uppercase tracking-wider ring-1 ring-scef-gold/30 mb-4">
            Pan-African Pillar
          </span>
          <h2
            id="women-girls-empowerment-heading"
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-scef-blue-darker mb-4"
          >
            Women &amp; Girls Empowerment{" "}
            <span className="text-scef-gold">Across Africa</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Creating safer, smarter, healthier, and more empowered futures for
            African girls and women through education, leadership, mentorship,
            digital inclusion, wellbeing, ESG advocacy, and economic
            opportunity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12">
          {PILLARS.map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="group relative rounded-2xl bg-card border border-border p-6 hover:border-scef-gold/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-scef-gold/10 text-scef-gold-dark flex items-center justify-center mb-4 group-hover:bg-scef-gold group-hover:text-white transition-colors">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-scef-blue-darker mb-2">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {body}
              </p>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {CTAS.map((cta, i) => (
            <Button
              key={cta.label}
              asChild
              variant={i === 0 ? "default" : "outline"}
              className={
                i === 0
                  ? "bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-darker font-semibold"
                  : "border-scef-blue/30 hover:border-scef-gold hover:text-scef-gold-dark"
              }
            >
              <Link to={cta.to}>
                {cta.label}
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/women-girls-empowerment"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-scef-blue hover:text-scef-gold-dark transition-colors"
          >
            Explore the full Women &amp; Girls Empowerment programme
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WomenGirlsEmpowerment;
