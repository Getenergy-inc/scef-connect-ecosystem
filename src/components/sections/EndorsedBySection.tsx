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
    <section className="bg-muted/30 py-14 md:py-20" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-scef-gold">
            {t("home.endorsedBy.eyebrow") || "Collaboration"}
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight text-scef-blue-darker md:text-[2rem]">
            {t("home.endorsedBy.title") || "Trusted Education Collaborators"}
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-scef-gold/60" />
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">
            {t("home.endorsedBy.subtitle") ||
              "SCEF works with verified education-focused collaborators and networks to support learning access, advocacy, and education impact."}
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-4">
          {endorsements.map((e, idx) => (
            <a
              key={e.id}
              href={e.website_url || "#"}
              target={e.website_url ? "_blank" : undefined}
              rel={e.website_url ? "noopener noreferrer" : undefined}
              className="group flex flex-col items-center justify-center rounded-xl border border-border/60 bg-card px-4 py-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-scef-gold/50 hover:shadow-md animate-fade-in"
              style={{ animationDelay: `${idx * 40}ms` }}
              title={e.name}
              aria-label={e.name}
            >
              <div className="flex h-14 w-full items-center justify-center md:h-16">
                <img
                  src={e.logo_url}
                  alt={e.name}
                  className="max-h-full max-w-[80%] object-contain opacity-75 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  loading="lazy"
                />
              </div>
              <span className="mt-3 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-scef-blue-darker">
                {e.acronym || e.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
