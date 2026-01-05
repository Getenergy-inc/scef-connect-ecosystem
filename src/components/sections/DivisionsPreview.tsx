import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { Shield, Laptop, TrendingUp, Tv, Globe, Building2 } from "lucide-react";

const divisions = [
  {
    code: 'BGEO',
    title: 'Board Governance & Executive Office',
    mandate: 'Institutional leadership, fiduciary oversight, and governance coordination.',
    icon: Building2,
    href: '/divisions/bgeo',
  },
  {
    code: 'SOBCD',
    title: 'Strategic Operations & Business Compliance',
    mandate: 'Legal, risk, audit management, and institutional integrity.',
    icon: Shield,
    href: '/divisions/sobcd',
  },
  {
    code: 'TDSD',
    title: 'Technology & Digital Services',
    mandate: 'Digital infrastructure, EOA, databases, and innovation.',
    icon: Laptop,
    href: '/divisions/tdsd',
  },
  {
    code: 'OMBDD',
    title: 'Online Media Business Development',
    mandate: 'Revenue, sponsorships, partnerships, and digital growth.',
    icon: TrendingUp,
    href: '/divisions/ombdd',
  },
  {
    code: 'Santos Media',
    title: 'Santos Media Division',
    mandate: 'NESA TV, radio, content production, and editorial independence.',
    icon: Tv,
    href: '/divisions/santos-media',
  },
  {
    code: 'LCS',
    title: 'Local Chapter Services',
    mandate: 'Decentralized impact through compliant country chapters.',
    icon: Globe,
    href: '/divisions/lcs',
  },
];

export const DivisionsPreview = () => {
  const { t } = useLocale();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('divisions.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Six operational divisions ensuring efficient, accountable delivery of our mission.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {divisions.map((division) => (
            <Link
              key={division.code}
              to={division.href}
              className="group bg-card rounded-2xl p-6 border-2 border-black hover:shadow-lg transition-all hover:border-scef-gold"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-scef-blue/10 flex items-center justify-center group-hover:bg-scef-blue transition-colors border-2 border-black">
                  <division.icon className="w-5 h-5 text-scef-blue group-hover:text-white" />
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-scef-gold text-scef-blue border border-black">
                  {division.code}
                </span>
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-scef-blue transition-colors">
                {division.title}
              </h3>
              <p className="text-sm text-muted-foreground">{division.mandate}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
