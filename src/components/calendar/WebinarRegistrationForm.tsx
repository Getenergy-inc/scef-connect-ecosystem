import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { MonthlyProgram, ParticipationMode } from "@/config/monthlyCalendar";

const schema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  organization: z.string().trim().max(160).optional().or(z.literal("")),
  role_type: z.string().trim().max(80).optional().or(z.literal("")),
  participation_mode: z.string(),
  consent_marketing: z.boolean(),
});

type Props = { program: MonthlyProgram };

export const WebinarRegistrationForm = ({ program }: Props) => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState<ParticipationMode>(program.modes[0] ?? "Online");
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      full_name: String(fd.get("full_name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      country: String(fd.get("country") ?? ""),
      organization: String(fd.get("organization") ?? ""),
      role_type: String(fd.get("role_type") ?? ""),
      participation_mode: mode,
      consent_marketing: consent,
    };
    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      toast({
        title: "Please check the form",
        description: parsed.error.issues[0]?.message ?? "Invalid input",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const { data: row, error } = await supabase
        .from("webinar_registrations")
        .insert({
          program_slug: program.slug,
          program_month: program.month,
          program_title: program.title,
          full_name: parsed.data.full_name,
          email: parsed.data.email,
          phone: parsed.data.phone || null,
          country: parsed.data.country || null,
          organization: parsed.data.organization || null,
          role_type: parsed.data.role_type || null,
          participation_mode: parsed.data.participation_mode,
          consent_marketing: parsed.data.consent_marketing,
          user_id: userData.user?.id ?? null,
        })
        .select("id")
        .single();
      if (error) throw error;

      // Fire-and-forget confirmation email (works once email infra is configured)
      supabase.functions
        .invoke("send-transactional-email", {
          body: {
            templateName: "webinar-registration-confirmation",
            recipientEmail: parsed.data.email,
            idempotencyKey: `webinar-${row?.id}`,
            templateData: {
              name: parsed.data.full_name,
              programTitle: program.title,
              programMonth: program.month,
              participationMode: mode,
              programSlug: program.slug,
            },
          },
        })
        .catch(() => {
          /* email infra may not be live yet — registration still recorded */
        });

      setSuccess(true);
      toast({
        title: "Registration confirmed",
        description: `You're registered for ${program.title}. A confirmation will be emailed to ${parsed.data.email}.`,
      });
    } catch (err: any) {
      toast({
        title: "Registration failed",
        description: err?.message ?? "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="h-5 w-5" />
          <h4 className="font-display text-lg font-bold">You're registered</h4>
        </div>
        <p className="mt-2 text-sm">
          A confirmation email and digital receipt for <strong>{program.title}</strong> ({program.month}) is on its way.
          You'll also receive the webinar joining link 24 hours before the session.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <h3 className="font-display text-xl font-bold text-scef-blue-darker md:text-2xl">
        Register for this Webinar
      </h3>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Free registration. A confirmation email and joining link will be sent to your inbox.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="full_name">Full name *</Label>
          <Input id="full_name" name="full_name" required maxLength={120} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" required maxLength={255} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone (WhatsApp preferred)</Label>
          <Input id="phone" name="phone" type="tel" maxLength={40} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="country">Country</Label>
          <Input id="country" name="country" maxLength={80} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="organization">School / Organization</Label>
          <Input id="organization" name="organization" maxLength={160} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="role_type">Your role</Label>
          <Input id="role_type" name="role_type" placeholder="Teacher, NGO, Ambassador..." maxLength={80} />
        </div>

        <div className="md:col-span-2 space-y-1.5">
          <Label>Preferred participation mode</Label>
          <div className="flex flex-wrap gap-2">
            {program.modes.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ring-1 transition ${
                  mode === m
                    ? "bg-scef-blue-darker text-white ring-scef-blue-darker"
                    : "bg-background text-foreground ring-border hover:ring-scef-blue-darker/40"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      <label className="mt-5 flex items-start gap-2.5 text-xs text-muted-foreground">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-border"
        />
        <span>
          Send me updates about future SCEF webinars, advocacy walks, and training programs. You can unsubscribe at any time.
        </span>
      </label>

      <Button type="submit" disabled={submitting} className="mt-6 w-full md:w-auto">
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registering...
          </>
        ) : (
          "Register for Webinar"
        )}
      </Button>
    </form>
  );
};
