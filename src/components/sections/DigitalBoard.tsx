import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Volume2, FileText, Image, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLocale } from "@/contexts/LocaleContext";
import { resolveThumbnail, getDefaultThumbnail } from "@/config/digitalBoardThumbnails";

interface BoardItem {
  id: string;
  type: string;
  title: string;
  description: string;
  cta: { text: string; href: string };
  thumbnail: string;
}

const getFallbackItems = (t: (key: string) => string): BoardItem[] => [
  {
    id: "1",
    type: "video",
    title: t("home.board.fallback.nesa.title"),
    description: t("home.board.fallback.nesa.description"),
    cta: { text: t("home.board.fallback.nesa.cta"), href: "/programs/nesa-africa" },
    thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
  },
  {
    id: "2",
    type: "flyer",
    title: t("home.board.fallback.eduaid.title"),
    description: t("home.board.fallback.eduaid.description"),
    cta: { text: t("home.board.fallback.eduaid.cta"), href: "/programs/eduaid-africa" },
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
  },
];

const typeIcons = {
  video: Play,
  audio: Volume2,
  announcement: FileText,
  flyer: Image,
};

export const DigitalBoard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const queryClient = useQueryClient();
  const { t, isRTL } = useLocale();

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

  useEffect(() => {
    const channel = supabase
      .channel('digital-board-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'digital_board_items' }, () => {
        queryClient.invalidateQueries({ queryKey: ["digital-board-items"] });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [queryClient]);

  const boardItems: BoardItem[] = dbItems?.length
    ? dbItems.map((item) => ({
        id: item.id,
        type: item.content_type || "announcement",
        title: item.title,
        description: item.content_text || "",
        cta: { text: item.cta_text || t("home.board.viewAll"), href: item.cta_link || "/updates" },
        thumbnail: resolveThumbnail(
          (item as any).thumbnail_url,
          item.content_url || getDefaultThumbnail(item.content_type || "announcement")
        ),
      }))
    : getFallbackItems(t);

  useEffect(() => {
    if (boardItems.length === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % boardItems.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [boardItems.length]);

  useEffect(() => {
    if (activeIndex >= boardItems.length) setActiveIndex(0);
  }, [activeIndex, boardItems.length]);

  if (boardItems.length === 0) return null;

  const activeItem = boardItems[activeIndex] || boardItems[0];
  const TypeIcon = typeIcons[activeItem.type as keyof typeof typeIcons] || FileText;

  return (
    <section className="py-12 bg-scef-blue-darker" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            {t("home.board.title")}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-video md:aspect-auto md:min-h-[300px]">
              <img
                src={activeItem.thumbnail}
                alt={activeItem.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-scef-gold text-scef-blue-dark text-xs font-semibold flex items-center gap-1.5">
                <TypeIcon className="w-3 h-3" />
                {activeItem.type}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-3">
                {activeItem.title}
              </h3>
              <p className="text-white/70 mb-6 leading-relaxed">
                {activeItem.description}
              </p>
              <Button className="bg-scef-gold hover:bg-scef-gold/90 text-scef-blue-dark self-start" asChild>
                <a href={activeItem.cta.href}>
                  {activeItem.cta.text}
                  <ArrowRight className="w-4 h-4 ms-2" />
                </a>
              </Button>
            </div>
          </div>

          {/* Dots */}
          {boardItems.length > 1 && (
            <div className="flex justify-center gap-2 pb-4">
              <button
                onClick={() => setActiveIndex((prev) => (prev - 1 + boardItems.length) % boardItems.length)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              {boardItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === activeIndex ? "w-6 bg-scef-gold" : "w-2 bg-white/30"}`}
                  aria-label={`Item ${i + 1}`}
                />
              ))}
              <button
                onClick={() => setActiveIndex((prev) => (prev + 1) % boardItems.length)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
