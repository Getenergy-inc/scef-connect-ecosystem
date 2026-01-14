import { useEffect, useState } from "react";
import { GraduationCap, School, Users, Eye, TrendingUp } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const getStats = (t: (key: string) => string) => [
  {
    icon: GraduationCap,
    value: 15000,
    suffix: "+",
    label: t("home.impact.metrics.scholarships"),
  },
  {
    icon: School,
    value: 250,
    suffix: "+",
    label: t("home.impact.metrics.schools"),
  },
  {
    icon: Users,
    value: 45,
    suffix: "",
    label: t("home.impact.metrics.chapters"),
  },
  {
    icon: Eye,
    value: 2,
    suffix: "M+",
    label: t("home.impact.metrics.partners"),
  },
];

const CountUp = ({ end, suffix, duration = 2000 }: { end: number; suffix: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;
      
      if (progress < 1) {
        setCount(Math.floor(end * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration]);
  
  return <>{count.toLocaleString()}{suffix}</>;
};

export const ImpactStats = () => {
  const { t, isRTL } = useLocale();
  const stats = getStats(t);

  return (
    <section className="relative py-20 bg-scef-blue" dir={isRTL ? "rtl" : "ltr"}>
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-scef-gold" />
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-scef-gold text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            {t("home.impact.title")}
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t("home.impact.cta")}
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            {t("home.hero.summary")}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-scef-gold/50 transition-all duration-300 hover:bg-white/15 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Decoration */}
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-scef-gold/10 group-hover:scale-150 transition-transform duration-500" />
              
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-scef-gold/20 flex items-center justify-center mb-4 text-scef-gold group-hover:scale-110 transition-transform">
                <stat.icon className="w-7 h-7" />
              </div>
              
              {/* Value */}
              <div className="font-display text-4xl lg:text-5xl font-bold mb-2 text-scef-gold">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              
              {/* Label */}
              <p className="text-white/80 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
