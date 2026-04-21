import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const news = [
  {
    date: "2026-02-15",
    category: "Announcement",
    title: "NESA-Africa 2026 Nominations Now Open",
    excerpt: "Submit nominations across 50+ categories spanning education, leadership, and innovation.",
    href: "/programs/nesa-africa",
  },
  {
    date: "2026-02-08",
    category: "Program",
    title: "EduAid Africa Expands to 5 New Countries",
    excerpt: "Scholarship program now reaches learners in Tanzania, Zambia, Cameroon, Mali, and Mozambique.",
    href: "/programs/eduaid-africa",
  },
  {
    date: "2026-01-28",
    category: "Partnership",
    title: "SCEF Signs MoU with African Union ECOSOCC",
    excerpt: "Strategic partnership to advance Pan-African education standards and youth engagement.",
    href: "/partner-with-us",
  },
];

export const LatestNews = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10 animate-fade-in">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Latest News
            </h2>
            <p className="text-muted-foreground">Announcements and updates from across the foundation.</p>
          </div>
          <Button variant="outline" size="sm" asChild className="hidden md:inline-flex">
            <Link to="/updates">View All <ArrowRight className="w-4 h-4 ms-1" /></Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {news.map((item, i) => (
            <Link
              key={i}
              to={item.href}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-scef-gold/40 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3 text-xs">
                  <span className="px-2 py-1 rounded-full bg-scef-gold/15 text-scef-blue-dark font-semibold">
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.excerpt}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Read more <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Button variant="outline" size="sm" asChild>
            <Link to="/updates">View All News <ArrowRight className="w-4 h-4 ms-1" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
