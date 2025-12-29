import { Link } from "react-router-dom";
import { MapPin, Users, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredChapters = [
  {
    name: "Lagos Chapter",
    location: "Lagos, Nigeria",
    members: 1250,
    type: "Physical",
    image: "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?w=400",
  },
  {
    name: "Nairobi Chapter",
    location: "Nairobi, Kenya",
    members: 890,
    type: "Hybrid",
    image: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=400",
  },
  {
    name: "Accra Chapter",
    location: "Accra, Ghana",
    members: 650,
    type: "Physical",
    image: "https://images.unsplash.com/photo-1596005554384-d293674c91d7?w=400",
  },
  {
    name: "Online Global",
    location: "Worldwide",
    members: 3200,
    type: "Online",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
  },
];

const typeColors = {
  Physical: "bg-forest text-cream",
  Hybrid: "bg-terracotta text-cream",
  Online: "bg-gold text-earth",
};

export const ChaptersSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest/10 text-forest text-sm font-medium mb-4">
              <Globe className="w-4 h-4" />
              Local Chapters
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Join a <span className="text-gradient-gold">Chapter</span> Near You
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl">
              Connect with like-minded individuals in your community or join our global online chapter to make an impact from anywhere.
            </p>
          </div>
          <Button variant="outline" size="lg" asChild>
            <Link to="/local-chapters">
              Browse All Chapters
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Chapters Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredChapters.map((chapter, index) => (
            <Link
              key={chapter.name}
              to="/local-chapters"
              className="group relative bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={chapter.image}
                  alt={chapter.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                
                {/* Type Badge */}
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${typeColors[chapter.type as keyof typeof typeColors]}`}>
                  {chapter.type}
                </span>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {chapter.name}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  {chapter.location}
                </div>
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                  <Users className="w-4 h-4" />
                  {chapter.members.toLocaleString()} members
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Create Chapter CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Don't see a chapter in your area?
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link to="/local-chapters/create">
              Start a New Chapter
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
