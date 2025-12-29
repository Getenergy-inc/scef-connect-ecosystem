import { useEffect, useState } from "react";
import { GraduationCap, School, Users, Eye, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: GraduationCap,
    value: 15000,
    suffix: "+",
    label: "Scholarships Funded",
    color: "text-gold",
  },
  {
    icon: School,
    value: 250,
    suffix: "+",
    label: "Schools Supported",
    color: "text-terracotta",
  },
  {
    icon: Users,
    value: 45,
    suffix: "",
    label: "Active Chapters",
    color: "text-forest",
  },
  {
    icon: Eye,
    value: 2,
    suffix: "M+",
    label: "Media Views",
    color: "text-gold",
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
  return (
    <section className="relative py-20 bg-card">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-terracotta to-forest" />
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            Our Impact
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Making a <span className="text-gradient-gold">Difference</span> Across Africa
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Through the collective efforts of our members, donors, and partners, we're creating lasting change in education.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative bg-background rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Decoration */}
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/5 group-hover:scale-150 transition-transform duration-500" />
              
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-7 h-7" />
              </div>
              
              {/* Value */}
              <div className={`font-display text-4xl lg:text-5xl font-bold mb-2 ${stat.color}`}>
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              
              {/* Label */}
              <p className="text-muted-foreground font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
