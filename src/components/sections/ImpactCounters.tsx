import { useLocale } from "@/contexts/LocaleContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const stats = [
  { key: 'scholarships', value: '12,500+' },
  { key: 'schools', value: '450+' },
  { key: 'womenGirls', value: '85,000+' },
  { key: 'specialNeeds', value: '15,000+' },
  { key: 'chapters', value: '180+' },
  { key: 'partners', value: '350+' },
];

export const ImpactCounters = () => {
  const { t } = useLocale();

  return (
    <section className="py-16 bg-scef-blue text-white">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-8 text-white">
          {t('home.impact.title')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">
          {stats.map((stat) => (
            <div key={stat.key} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-scef-gold mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-white/80">{t(`home.impact.metrics.${stat.key}`)}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-scef-gold text-scef-gold hover:bg-scef-gold hover:text-scef-blue font-semibold"
          >
            <Link to="/updates">
              {t('home.impact.cta')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
