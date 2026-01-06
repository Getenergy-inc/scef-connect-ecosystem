import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Plus, Crown } from "lucide-react";

export const ChaptersConversion = () => {
  const { t } = useLocale();

  const actions = [
    { key: 'browse', icon: MapPin, href: '/local-chapters', label: t('home.chaptersBlock.ctaBrowse') },
    { key: 'join', icon: Users, href: '/local-chapters/join', label: t('home.chaptersBlock.ctaJoin') },
    { key: 'create', icon: Plus, href: '/local-chapters/create', label: t('home.chaptersBlock.ctaCreate') },
    { key: 'leader', icon: Crown, href: '/local-chapters/leadership', label: t('home.chaptersBlock.ctaLeader') },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-900 to-emerald-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            {t('home.chaptersBlock.title')}
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            {t('home.chaptersBlock.body')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {actions.map((action) => (
            <Button
              key={action.key}
              variant="outline"
              size="lg"
              asChild
              className="h-auto py-6 flex-col gap-2 border-white/30 text-white hover:bg-white hover:text-emerald-900 font-semibold"
            >
              <Link to={action.href}>
                <action.icon className="w-6 h-6" />
                <span className="text-sm">{action.label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};
