import { useState } from "react";
import { z } from "zod";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale } from "@/contexts/LocaleContext";
import {
  WAITLIST_COUNTRIES,
  WAITLIST_ROLE_KEYS,
} from "@/config/waitlistConfig";
import { submitWaitlistEntry } from "@/services/waitlistService";

interface Props {
  disabled?: boolean;
  onSuccess: () => void;
}

export const WaitingListForm = ({ disabled = false, onSuccess }: Props) => {
  const { t, locale } = useLocale();

  const [values, setValues] = useState({
    fullName: "",
    country: "",
    organization: "",
    role: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const schema = z.object({
    fullName: z.string().trim().min(2, t("waitingList.validation.fullNameRequired")).max(120),
    country: z.string().trim().min(1, t("waitingList.validation.countryRequired")).max(80),
    organization: z.string().trim().min(2, t("waitingList.validation.organizationRequired")).max(160),
    role: z.string().trim().min(1, t("waitingList.validation.roleRequired")).max(60),
  });

  const setField = (key: keyof typeof values, val: string) => {
    setValues((v) => ({ ...v, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || disabled) return;
    setSubmitError(null);

    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as string;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    const result = await submitWaitlistEntry({
      fullName: parsed.data.fullName,
      country: parsed.data.country,
      organization: parsed.data.organization,
      role: parsed.data.role,
      language: locale,
    });
    setSubmitting(false);

    if (result.ok) {
      setValues({ fullName: "", country: "", organization: "", role: "" });
      onSuccess();
      return;
    }
    if (result.reason === "duplicate") {
      setSubmitError(t("waitingList.duplicateMessage"));
    } else {
      setSubmitError(t("waitingList.errorMessage"));
    }
  };

  const fieldCls =
    "bg-white/10 border-white/25 text-white placeholder:text-white/40 focus-visible:ring-scef-gold";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Full name */}
      <div>
        <Label htmlFor="wl-fullName" className="text-white/90 text-xs uppercase tracking-wider">
          {t("waitingList.fullName")} *
        </Label>
        <Input
          id="wl-fullName"
          value={values.fullName}
          onChange={(e) => setField("fullName", e.target.value)}
          placeholder={t("waitingList.fullNamePlaceholder")}
          className={`${fieldCls} mt-1`}
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? "wl-fullName-err" : undefined}
          disabled={disabled || submitting}
        />
        {errors.fullName && (
          <p id="wl-fullName-err" className="text-xs text-red-300 mt-1">{errors.fullName}</p>
        )}
      </div>

      {/* Country */}
      <div>
        <Label htmlFor="wl-country" className="text-white/90 text-xs uppercase tracking-wider">
          {t("waitingList.country")} *
        </Label>
        <Select
          value={values.country}
          onValueChange={(v) => setField("country", v)}
          disabled={disabled || submitting}
        >
          <SelectTrigger
            id="wl-country"
            className={`${fieldCls} mt-1`}
            aria-invalid={!!errors.country}
          >
            <SelectValue placeholder={t("waitingList.countryPlaceholder")} />
          </SelectTrigger>
          <SelectContent className="max-h-72">
            {WAITLIST_COUNTRIES.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.country && (
          <p className="text-xs text-red-300 mt-1">{errors.country}</p>
        )}
      </div>

      {/* Organisation */}
      <div>
        <Label htmlFor="wl-org" className="text-white/90 text-xs uppercase tracking-wider">
          {t("waitingList.organization")} *
        </Label>
        <Input
          id="wl-org"
          value={values.organization}
          onChange={(e) => setField("organization", e.target.value)}
          placeholder={t("waitingList.organizationPlaceholder")}
          className={`${fieldCls} mt-1`}
          aria-invalid={!!errors.organization}
          disabled={disabled || submitting}
        />
        {errors.organization && (
          <p className="text-xs text-red-300 mt-1">{errors.organization}</p>
        )}
      </div>

      {/* Role */}
      <div>
        <Label htmlFor="wl-role" className="text-white/90 text-xs uppercase tracking-wider">
          {t("waitingList.role")} *
        </Label>
        <Select
          value={values.role}
          onValueChange={(v) => setField("role", v)}
          disabled={disabled || submitting}
        >
          <SelectTrigger
            id="wl-role"
            className={`${fieldCls} mt-1`}
            aria-invalid={!!errors.role}
          >
            <SelectValue placeholder={t("waitingList.rolePlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            {WAITLIST_ROLE_KEYS.map((k) => (
              <SelectItem key={k} value={t(`waitingList.roles.${k}`)}>
                {t(`waitingList.roles.${k}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.role && <p className="text-xs text-red-300 mt-1">{errors.role}</p>}
      </div>

      {submitError && (
        <div className="text-sm text-red-200 bg-red-500/15 border border-red-400/30 rounded-md px-3 py-2">
          {submitError}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={submitting || disabled}
        className="w-full bg-scef-gold hover:bg-scef-gold/90 text-scef-blue-darker font-semibold"
      >
        {submitting ? (
          <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> {t("waitingList.submitting")}</>
        ) : (
          <><Send className="w-4 h-4 mr-2" /> {t("waitingList.submit")}</>
        )}
      </Button>
    </form>
  );
};
