import { useEffect, useState } from "react";
import { MapPin, CalendarDays, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/contexts/LocaleContext";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { WaitingListForm } from "@/components/waitlist/WaitingListForm";
import { CapacityTracker } from "@/components/waitlist/CapacityTracker";
import { ConfirmationMessage } from "@/components/waitlist/ConfirmationMessage";
import { getWaitlistCount } from "@/services/waitlistService";
import { WAITLIST_CAPACITY } from "@/config/waitlistConfig";
import seychellesBg from "@/assets/seychelles-2027-conference.jpg";

const regions = ["Comoros", "Madagascar", "Mauritius", "Seychelles"];
const pillarKeys = ["learn", "serve", "tour", "partner", "transform"] as const;

export const Seychelles2027WaitingList = () => {
  const { t } = useLocale();
  const [count, setCount] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const refreshCount = async () => {
    const c = await getWaitlistCount();
    setCount(c);
  };

  useEffect(() => {
    refreshCount();
  }, []);

  const isFull = (count ?? 0) >= WAITLIST_CAPACITY;

  return (
    <section
      id="seychelles-2027"
      className="relative py-16 md:py-24 bg-scef-blue-darker overflow-hidden"
      aria-labelledby="seychelles-2027-heading"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={seychellesBg}
          alt="Seychelles coastline — EduAid Africa Indian Ocean Islands Edu-Tourism Conference 2027"
          loading="lazy"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-scef-blue-darker via-scef-blue-darker/90 to-scef-blue-darker/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-scef-blue-darker/90 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT: Content */}
          <div className="lg:col-span-7 text-white">
            <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-scef-gold/15 border border-scef-gold/40 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-scef-gold" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold">
                  {t("waitingList.badge")}
                </span>
              </div>
              <div className="rounded-md bg-white/5 border border-white/15 backdrop-blur-sm">
                <LanguageSwitcher />
              </div>
            </div>

            <h2
              id="seychelles-2027-heading"
              className="font-display text-3xl md:text-5xl font-bold leading-tight mb-4"
            >
              {t("waitingList.title")}
            </h2>

            <p className="text-base md:text-lg text-white/85 leading-relaxed mb-4 max-w-2xl">
              {t("waitingList.subtitle")}
            </p>
            <p className="text-sm text-white/75 leading-relaxed mb-6 max-w-2xl">
              {t("waitingList.description")}
            </p>

            {/* Meta strip */}
            <div className="grid sm:grid-cols-2 gap-3 mb-6 max-w-2xl">
              <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-lg p-3 backdrop-blur-sm">
                <CalendarDays className="w-4 h-4 text-scef-gold mt-0.5 shrink-0" />
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-scef-gold">
                    {t("waitingList.dates")}
                  </div>
                  <div className="text-sm font-medium">{t("waitingList.datesValue")}</div>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-lg p-3 backdrop-blur-sm">
                <MapPin className="w-4 h-4 text-scef-gold mt-0.5 shrink-0" />
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-scef-gold">
                    {t("waitingList.hostHub")}
                  </div>
                  <div className="text-sm font-medium">{t("waitingList.hostHubValue")}</div>
                </div>
              </div>
            </div>

            {/* Theme */}
            <div className="mb-5 max-w-2xl">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-1.5">
                {t("waitingList.theme")}
              </div>
              <p className="text-sm md:text-base text-white/90">
                {t("waitingList.themeValue")}
              </p>
            </div>

            {/* Regional focus */}
            <div className="mb-6">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-2">
                {t("waitingList.regionalFocus")}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {regions.map((r) => (
                  <Badge
                    key={r}
                    variant="outline"
                    className="border-white/30 text-white bg-white/5 backdrop-blur-sm text-xs"
                  >
                    {r}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Pillars */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 border-t border-white/15">
              {pillarKeys.map((k, i) => (
                <div key={k} className="flex items-center gap-2">
                  <span className="font-display text-sm md:text-base font-semibold text-scef-gold">
                    {t(`waitingList.pillars.${k}`)}.
                  </span>
                  {i < pillarKeys.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-white/40 hidden sm:block" />
                  )}
                </div>
              ))}
              <span className="text-xs text-white/70 italic w-full sm:w-auto sm:ml-2">
                {t("waitingList.tagline")}
              </span>
            </div>
          </div>

          {/* RIGHT: Form / Confirmation */}
          <div className="lg:col-span-5">
            <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-7 shadow-2xl">
              <div className="absolute -top-3 -right-3 bg-scef-gold text-scef-blue-darker text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                2027
              </div>

              {submitted ? (
                <ConfirmationMessage onReset={() => { setSubmitted(false); refreshCount(); }} />
              ) : (
                <>
                  <div className="mb-4">
                    {count === null ? (
                      <div className="flex items-center gap-2 text-xs text-white/60">
                        <Loader2 className="w-3 h-3 animate-spin" /> …
                      </div>
                    ) : (
                      <CapacityTracker submissionsCount={count} />
                    )}
                  </div>

                  <WaitingListForm
                    disabled={isFull}
                    onSuccess={() => { setSubmitted(true); refreshCount(); }}
                  />

                  {isFull && (
                    <p className="mt-3 text-xs text-scef-gold text-center">
                      {t("waitingList.waitlistFull")}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Seychelles2027WaitingList;
