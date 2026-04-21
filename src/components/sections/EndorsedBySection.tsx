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

/**
 * Trusted & Endorsed By — premium logo grid (no text blocks).
 */
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
    <section className="bg-background py-16 md:py-20" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-6 md:px-8">
        <div className="mb-10 text-center md:mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[hsl(145_63%_35%)]">
            {t("home.endorsedBy.eyebrow") || "Trust & Recognition"}
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-scef-blue-darker md:text-[2rem]">
            {t("home.endorsedBy.title") || "Trusted & Endorsed By Leading Organizations"}
          </h2>
        </div>

        <div className="grid grid-cols-3 items-center gap-x-6 gap-y-8 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {endorsements.map((e, idx) => (
            <a
              key={e.id}
              href={e.website_url || "#"}
              target={e.website_url ? "_blank" : undefined}
              rel={e.website_url ? "noopener noreferrer" : undefined}
              className="group flex flex-col items-center gap-2 animate-fade-in"
              style={{ animationDelay: `${idx * 50}ms` }}
              title={e.name}
            >
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-border bg-card p-2 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-scef-gold/40 group-hover:shadow-md md:h-20 md:w-20">
                <img
                  src={e.logo_url}
                  alt={e.name}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              </div>
              <span className="text-center text-[11px] font-medium leading-tight text-muted-foreground transition-colors group-hover:text-scef-blue-darker">
                {e.acronym || e.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
