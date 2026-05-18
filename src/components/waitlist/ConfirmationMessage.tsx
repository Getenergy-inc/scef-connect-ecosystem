import { CheckCircle2, Home, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/LocaleContext";

interface Props {
  onReset: () => void;
}

export const ConfirmationMessage = ({ onReset }: Props) => {
  const { t } = useLocale();
  return (
    <div
      className="bg-white/10 backdrop-blur-md border border-scef-gold/40 rounded-2xl p-6 md:p-8 shadow-2xl"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="shrink-0 w-10 h-10 rounded-full bg-scef-gold/20 flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6 text-scef-gold" />
        </div>
        <div>
          <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-1">
            {t("waitingList.successTitle")}
          </h3>
          <p className="text-sm text-white/85 leading-relaxed">
            {t("waitingList.successMessage")}
          </p>
        </div>
      </div>

      <div className="bg-white/5 border border-white/15 rounded-lg px-4 py-3 mb-5 flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-white/70">
          {t("waitingList.statusLabel")}
        </span>
        <span className="text-sm font-semibold text-scef-gold">
          ● {t("waitingList.statusValue")}
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button asChild variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-scef-gold">
          <a href="/">
            <Home className="w-4 h-4 mr-2" /> {t("waitingList.returnHome")}
          </a>
        </Button>
        <Button
          onClick={onReset}
          className="bg-scef-gold hover:bg-scef-gold/90 text-scef-blue-darker font-semibold"
        >
          <UserPlus className="w-4 h-4 mr-2" /> {t("waitingList.submitAnother")}
        </Button>
      </div>
    </div>
  );
};
