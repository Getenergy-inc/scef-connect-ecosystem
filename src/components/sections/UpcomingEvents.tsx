import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const events = [
  {
    date: "2026-05-22",
    title: "NESA-Africa 2026 Blue Garnet Gala",
    location: "Lagos, Nigeria",
    type: "Gala",
    href: "/programs/nesa-africa",
  },
  {
    date: "2026-06-10",
    title: "EduAid Scholarship Application Deadline",
    location: "Online — Pan-African",
    type: "Deadline",
    href: "/programs/eduaid-africa",
  },
  {
    date: "2026-07-15",
    title: "Local Chapter Presidents Summit",
    location: "Nairobi, Kenya",
    type: "Summit",
    href: "/chapters",
  },
  {
    date: "2026-09-08",
    title: "African Education Standards Forum",
    location: "Addis Ababa, Ethiopia",
    type: "Forum",
    href: "/about",
  },
];

export const UpcomingEvents = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Upcoming Events
          </h2>
          <p className="text-muted-foreground">Join us across the continent and online.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-3">
          {events.map((event, i) => {
            const d = new Date(event.date);
            return (
              <Link
                key={i}
                to={event.href}
                className="group flex items-center gap-4 md:gap-6 bg-card border border-border rounded-xl p-4 md:p-5 hover:shadow-md hover:border-scef-gold/40 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="shrink-0 w-16 md:w-20 text-center bg-scef-blue-dark text-white rounded-lg py-2">
                  <div className="text-xs font-semibold uppercase text-scef-gold">
                    {d.toLocaleDateString("en-US", { month: "short" })}
                  </div>
                  <div className="font-display text-2xl md:text-3xl font-bold leading-none">
                    {d.getDate()}
                  </div>
                  <div className="text-[10px] text-white/60">{d.getFullYear()}</div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-scef-gold/15 text-scef-blue-dark">
                      {event.type}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors truncate">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <MapPin className="w-3 h-3" />
                    {event.location}
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 text-muted-foreground shrink-0 hidden sm:block transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link to="/calendar">
              <Calendar className="w-4 h-4 me-2" /> View Full Calendar
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
