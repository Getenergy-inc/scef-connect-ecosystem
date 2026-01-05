import { Link } from "react-router-dom";
import { GraduationCap, Users, Heart, Award } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const paths = [
  {
    key: 'learn',
    icon: GraduationCap,
    href: '/programs/digital-learning',
    color: 'from-scef-blue to-scef-blue-light',
  },
  {
    key: 'chapter',
    icon: Users,
    href: '/local-chapters/join',
    color: 'from-emerald-600 to-emerald-500',
  },
  {
    key: 'donate',
    icon: Heart,
    href: '/partners',
    color: 'from-rose-600 to-rose-500',
  },
  {
    key: 'ambassador',
    icon: Award,
    href: '/membership',
    color: 'from-amber-600 to-amber-500',
  },
];

export const QuickPathSelector = () => {
  const { t } = useLocale();

  return (
    <section className="py-12 bg-muted/30 border-y-2 border-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {paths.map((path) => (
            <Link
              key={path.key}
              to={path.href}
              className="group relative overflow-hidden rounded-2xl bg-card p-6 border-2 border-black hover:shadow-lg transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <div className="relative z-10 flex flex-col items-center text-center gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center text-white shadow-lg`}>
                  <path.icon className="w-7 h-7" />
                </div>
                <h3 className="font-display font-semibold text-foreground group-hover:text-scef-blue transition-colors">
                  {t(`path.${path.key}`)}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
