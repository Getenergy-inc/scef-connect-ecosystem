import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, Tv, Radio, Video, Plane } from "lucide-react";

const mediaChannels = [
  {
    name: 'NESA Africa TV',
    icon: Tv,
    href: '/media#nesa-tv',
    description: 'Broadcasting excellence in African education',
  },
  {
    name: "It's In Me Radio",
    icon: Radio,
    href: '/media#radio',
    description: 'Inspiring voices across the continent',
  },
  {
    name: 'EduAid Webinars & Podcast',
    icon: Video,
    href: '/media#webinars',
    description: 'Expert discussions on education topics',
  },
  {
    name: 'Education Tourism Show',
    icon: Plane,
    href: '/media#tourism',
    description: 'Exploring educational opportunities worldwide',
  },
];

export const SantosMediaPreview = () => {
  const { t } = useLocale();

  return (
    <section className="py-20 bg-muted/30 border-y-2 border-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Santos Media
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our media division produces content that inspires, educates, and connects communities across Africa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {mediaChannels.map((channel) => (
            <Link
              key={channel.name}
              to={channel.href}
              className="group bg-card rounded-2xl p-6 border-2 border-black hover:shadow-lg transition-all hover:border-scef-gold"
            >
              <div className="w-12 h-12 rounded-xl bg-scef-blue/10 flex items-center justify-center mb-4 group-hover:bg-scef-blue group-hover:text-white transition-colors border-2 border-black">
                <channel.icon className="w-6 h-6 text-scef-blue group-hover:text-white" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-scef-blue transition-colors">
                {channel.name}
              </h3>
              <p className="text-sm text-muted-foreground">{channel.description}</p>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-scef-blue text-scef-blue hover:bg-scef-blue hover:text-white font-semibold border-2"
          >
            <Link to="/get-involved#volunteer">
              {t('nav.media.volunteer')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
