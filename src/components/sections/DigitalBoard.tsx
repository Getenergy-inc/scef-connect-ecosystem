import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Volume2, FileText, Image, ChevronLeft, ChevronRight, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface BoardItem {
  id: string;
  type: string;
  title: string;
  description: string;
  cta: { text: string; href: string };
  thumbnail: string;
}

const fallbackItems: BoardItem[] = [
  {
    id: "1",
    type: "video",
    title: "NESA-Africa 2024 Nominations Now Open",
    description: "Submit your nominations for the most prestigious education awards in Africa.",
    cta: { text: "Submit Nomination", href: "/programs/nesa-africa" },
    thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
  },
  {
    id: "2",
    type: "flyer",
    title: "EduAid Scholarship Application",
    description: "Applications for the 2024 scholarship cycle are now open. Don't miss this opportunity!",
    cta: { text: "Apply Now", href: "/programs/eduaid-africa" },
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
  },
];

const typeIcons = {
  video: Play,
  audio: Volume2,
  announcement: FileText,
  flyer: Image,
};

const typeColors = {
  video: "bg-gold text-earth",
  audio: "bg-terracotta text-cream",
  announcement: "bg-forest text-cream",
  flyer: "bg-primary text-primary-foreground",
};

export const DigitalBoard = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: dbItems } = useQuery({
    queryKey: ["digital-board-items"],
    queryFn: async () => {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from("digital_board_items")
        .select("*")
        .eq("is_active", true)
        .or(`publish_at.is.null,publish_at.lte.${now}`)
        .or(`expire_at.is.null,expire_at.gte.${now}`)
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  // Map database items to component format
  const boardItems: BoardItem[] = dbItems?.length
    ? dbItems.map((item) => ({
        id: item.id,
        type: item.content_type || "announcement",
        title: item.title,
        description: item.content_text || "",
        cta: { text: item.cta_text || "Learn More", href: item.cta_link || "/updates" },
        thumbnail: item.content_url || "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
      }))
    : fallbackItems;

  useEffect(() => {
    if (boardItems.length === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % boardItems.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [boardItems.length]);

  // Reset index if it's out of bounds
  useEffect(() => {
    if (activeIndex >= boardItems.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, boardItems.length]);

  if (boardItems.length === 0) return null;

  const activeItem = boardItems[activeIndex] || boardItems[0];
  const TypeIcon = typeIcons[activeItem.type as keyof typeof typeIcons] || FileText;

  return (
    <section className="py-24 bg-earth relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-african-pattern opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/10 text-cream/90 text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            Live Updates
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-cream mb-4">
            Education Updates • Opportunities • <span className="text-gradient-gold">Events</span>
          </h2>
          <p className="text-cream/70 max-w-2xl mx-auto">
            Real-time announcements, videos, audio clips, flyers, and notices curated by SCEF HQ.
          </p>
        </div>

        {/* Board Content */}
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-cream/10 to-transparent backdrop-blur-sm border border-cream/10">
            {/* Main Display */}
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image Side */}
              <div className="relative aspect-video lg:aspect-auto lg:min-h-[400px]">
                <img
                  src={activeItem.thumbnail}
                  alt={activeItem.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-earth/80 to-transparent lg:bg-gradient-to-t" />
                
                {/* Type Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full ${typeColors[activeItem.type as keyof typeof typeColors] || "bg-primary text-primary-foreground"} text-xs font-semibold flex items-center gap-2`}>
                  <TypeIcon className="w-3 h-3" />
                  {activeItem.type.charAt(0).toUpperCase() + activeItem.type.slice(1)}
                </div>

                {/* Play Button for Video */}
                {activeItem.type === "video" && (
                  <button className="absolute inset-0 flex items-center justify-center group">
                    <div className="w-20 h-20 rounded-full bg-gold/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Play className="w-8 h-8 text-earth ml-1" />
                    </div>
                  </button>
                )}
              </div>

              {/* Content Side */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-cream mb-4">
                  {activeItem.title}
                </h3>
                <p className="text-cream/70 text-lg mb-8 leading-relaxed">
                  {activeItem.description}
                </p>
                <Button variant="hero" size="lg" className="self-start" asChild>
                  <a href={activeItem.cta.href}>
                    {activeItem.cta.text}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
              <button
                onClick={() => setActiveIndex((prev) => (prev - 1 + boardItems.length) % boardItems.length)}
                className="w-10 h-10 rounded-full bg-cream/10 hover:bg-cream/20 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-cream" />
              </button>
              
              <div className="flex gap-2">
                {boardItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "w-8 bg-gold"
                        : "w-2 bg-cream/30 hover:bg-cream/50"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveIndex((prev) => (prev + 1) % boardItems.length)}
                className="w-10 h-10 rounded-full bg-cream/10 hover:bg-cream/20 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-cream" />
              </button>
            </div>
          </div>

          {/* View All CTA */}
          <div className="mt-8 text-center">
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/updates">
                View All Updates
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
