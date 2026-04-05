import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLocale } from "@/contexts/LocaleContext";

interface Endorsement {
  id: string;
  name: string;
  acronym: string | null;
  logo_url: string;
  website_url: string | null;
}

export const EndorsedBySection = () => {
  const { t, isRTL } = useLocale();

  const { data: endorsements = [], isLoading } = useQuery({
    queryKey: ["endorsements"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("endorsements")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as Endorsement[];
    },
  });

  if (isLoading || endorsements.length === 0) return null;

  return (
    <section className="py-12 border-t border-border/50" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <h2 className="font-display text-xl md:text-2xl font-bold text-foreground text-center mb-8">
          {t("home.endorsedBy.title") || "Endorsed By"}
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-8">
          {endorsements.map((e) => (
            <a
              key={e.id}
              href={e.website_url || "#"}
              target={e.website_url ? "_blank" : undefined}
              rel={e.website_url ? "noopener noreferrer" : undefined}
              className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
              title={e.name}
            >
              <div className="w-20 h-20 rounded-full overflow-hidden bg-white shadow border border-border">
                <img src={e.logo_url} alt={e.name} className="w-full h-full object-contain p-1" loading="lazy" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">{e.acronym || e.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
