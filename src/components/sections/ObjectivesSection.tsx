import { useLocale } from "@/contexts/LocaleContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const ObjectivesSection = () => {
  const { t } = useLocale();

  const objectives = [
    t('objectives.1'),
    t('objectives.2'),
    t('objectives.3'),
    t('objectives.4'),
    t('objectives.5'),
    t('objectives.6'),
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            {t('objectives.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {objectives.map((objective, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-card rounded-xl p-5 border-2 border-black hover:shadow-md transition-shadow"
              >
                <CheckCircle2 className="w-5 h-5 text-scef-gold shrink-0 mt-0.5" />
                <p className="text-muted-foreground">{objective}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              asChild
              className="bg-scef-gold text-scef-blue hover:bg-scef-gold-dark font-semibold border-2 border-black"
            >
              <Link to="/about">
                {t('objectives.learn')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
