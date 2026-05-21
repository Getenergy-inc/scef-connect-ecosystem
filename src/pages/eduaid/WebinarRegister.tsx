import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { ArrowLeft, Calendar, CheckCircle2, Loader2, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import webinarWomenGirls from "@/assets/eduaid-webinar-women-girls.jpg";
import webinarInequality from "@/assets/eduaid-webinar-inequality-gap.jpg";
import webinarFinancing from "@/assets/eduaid-webinar-financing-education.jpg";

export const WEBINARS = [
  {
    slug: "women-girls-education",
    image: webinarWomenGirls,
    topic: "Women and Girls in Education — Removing Barriers",
    date: "28 October 2025",
    speakers: "Dr. Martha R.L. Muhwezi · Amarachi Crystal Omereife · Onayi Amina Lawal",
    tag: "Gender Equity",
  },
  {
    slug: "education-inequality-gap",
    image: webinarInequality,
    topic: "Bridging the Education Inequality Gap in Nigeria",
    date: "14 October 2025",
    speakers: "Adeyinka Akinyede-Ashaolu · Bosede Ogidan",
    tag: "Access & Equity",
  },
  {
    slug: "financing-education",
    image: webinarFinancing,
    topic: "Financing Education: Public & Private Roles",
    date: "25 November 2025",
    speakers: "Gabriel Olufunmi · Tumi Tiyamiyu · Comfort Shaibu",
    tag: "Education Finance",
  },
] as const;

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(150),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  country: z.string().trim().max(100).optional().or(z.literal("")),
  organization: z.string().trim().max(150).optional().or(z.literal("")),
  role_type: z.string().trim().max(80).optional().or(z.literal("")),
  participation_mode: z.enum(["live", "recording"]).default("live"),
  motivation: z.string().trim().max(1000).optional().or(z.literal("")),
  consent_marketing: z.boolean().default(false),
});

export default function WebinarRegister() {
  const [params] = useSearchParams();
  const initialSlug = params.get("webinar") || WEBINARS[0].slug;
  const [slug, setSlug] = useState(initialSlug);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const selected = useMemo(
    () => WEBINARS.find((w) => w.slug === slug) ?? WEBINARS[0],
    [slug]
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      full_name: fd.get("full_name"),
      email: fd.get("email"),
      phone: fd.get("phone") ?? "",
      country: fd.get("country") ?? "",
      organization: fd.get("organization") ?? "",
      role_type: fd.get("role_type") ?? "",
      participation_mode: (fd.get("participation_mode") as string) || "live",
      motivation: fd.get("motivation") ?? "",
      consent_marketing: fd.get("consent_marketing") === "on",
    });
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
      const id = crypto.randomUUID();
      const payload = {
        id,
        program_slug: selected.slug,
        program_title: selected.topic,
        program_month: selected.date,
        ...parsed.data,
        phone: parsed.data.phone || null,
        country: parsed.data.country || null,
        organization: parsed.data.organization || null,
        role_type: parsed.data.role_type || null,
        motivation: parsed.data.motivation || null,
      };

      const { error } = await supabase
        .from("webinar_registrations")
        .insert(payload);
      if (error) throw error;

      // Fire-and-forget confirmation email (works once email infra is configured)
      supabase.functions
        .invoke("send-transactional-email", {
          body: {
            templateName: "eduaid-webinar-confirmation",
            recipientEmail: parsed.data.email,
            idempotencyKey: `webinar-confirm-${id}`,
            templateData: {
              name: parsed.data.full_name,
              webinarTopic: selected.topic,
              webinarDate: selected.date,
              speakers: selected.speakers,
              participationMode: parsed.data.participation_mode,
            },
          },
        })
        .catch(() => {
          /* Email infra may not be set up yet — registration is still saved */
        });

      setDone(true);
      toast({
        title: "Registration confirmed",
        description: "Check your inbox for your confirmation email.",
      });
    } catch (err: any) {
      toast({
        title: "Something went wrong",
        description: err?.message ?? "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register — EduAid-Africa Webinar | SCEF</title>
        <meta
          name="description"
          content="Reserve your seat for the next EduAid-Africa monthly webinar. Free registration with confirmation email and reminder."
        />
        <link rel="canonical" href="/eduaid-africa/webinar-register" />
      </Helmet>

      <main className="min-h-screen bg-[#0A1628] py-12 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <Link
            to="/programs/eduaid-africa"
            className="mb-8 inline-flex items-center gap-2 text-sm text-slate-300 hover:text-scef-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to EduAid-Africa
          </Link>

          <div className="mb-10 max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#1F892B]/50 bg-[#1F892B]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4ADE80]">
              EduAid-Africa Webinar Series
            </div>
            <h1 className="font-display text-3xl font-bold leading-tight text-white md:text-5xl">
              Register for the next webinar
            </h1>
            <p className="mt-4 text-base text-slate-300 md:text-lg">
              Reserve your seat. We’ll email a confirmation with the joining
              link and a reminder before the session begins.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
            {/* Form */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
              {done ? (
                <div className="flex flex-col items-center py-12 text-center text-white">
                  <CheckCircle2 className="mb-4 h-14 w-14 text-[#4ADE80]" />
                  <h2 className="font-display text-2xl font-bold">
                    You’re registered
                  </h2>
                  <p className="mt-3 max-w-md text-slate-300">
                    A confirmation email is on its way to your inbox. We’ll send
                    a reminder shortly before <strong>{selected.topic}</strong>{" "}
                    begins.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link
                      to="/programs/eduaid-africa"
                      className="rounded-xl bg-[#1F892B] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1F892B]/90"
                    >
                      Back to EduAid-Africa
                    </Link>
                    <button
                      onClick={() => setDone(false)}
                      className="rounded-xl border border-scef-gold/60 px-5 py-2.5 text-sm font-semibold text-scef-gold hover:bg-scef-gold/10"
                    >
                      Register another person
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5 text-white">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Choose webinar
                    </label>
                    <select
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="w-full rounded-lg border border-white/15 bg-[#0A1628] px-3 py-2.5 text-sm text-white focus:border-scef-gold focus:outline-none"
                    >
                      {WEBINARS.map((w) => (
                        <option key={w.slug} value={w.slug}>
                          {w.topic} — {w.date}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full name *" name="full_name" required />
                    <Field
                      label="Email *"
                      name="email"
                      type="email"
                      required
                    />
                    <Field label="Phone (optional)" name="phone" />
                    <Field label="Country" name="country" />
                    <Field label="Organization" name="organization" />
                    <Field
                      label="Role (e.g. Educator, Funder, Student)"
                      name="role_type"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                      How will you attend?
                    </label>
                    <div className="flex flex-wrap gap-3 text-sm">
                      {[
                        { v: "live", l: "Join the live session" },
                        { v: "recording", l: "Send me the recording" },
                      ].map((o) => (
                        <label
                          key={o.v}
                          className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/15 bg-[#0A1628] px-3 py-2 hover:border-scef-gold/60"
                        >
                          <input
                            type="radio"
                            name="participation_mode"
                            value={o.v}
                            defaultChecked={o.v === "live"}
                            className="accent-scef-gold"
                          />
                          {o.l}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                      What do you hope to learn? (optional)
                    </label>
                    <textarea
                      name="motivation"
                      rows={3}
                      maxLength={1000}
                      className="w-full rounded-lg border border-white/15 bg-[#0A1628] px-3 py-2.5 text-sm text-white focus:border-scef-gold focus:outline-none"
                    />
                  </div>

                  <label className="flex items-start gap-2 text-xs text-slate-300">
                    <input
                      type="checkbox"
                      name="consent_marketing"
                      className="mt-0.5 accent-scef-gold"
                    />
                    Keep me updated about future EduAid-Africa webinars and SCEF
                    programs.
                  </label>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1F892B] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1F892B]/30 transition-all hover:bg-[#1F892B]/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {submitting && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                    {submitting ? "Reserving your seat…" : "Confirm registration"}
                  </button>
                </form>
              )}
            </div>

            {/* Selected webinar preview */}
            <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={selected.image}
                  alt={selected.topic}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-scef-gold/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0A1628]">
                  {selected.tag}
                </div>
                <h3 className="text-lg font-bold text-white">
                  {selected.topic}
                </h3>
                <div className="flex items-start gap-2">
                  <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-scef-gold" />
                  <span>{selected.date}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="mt-0.5 h-4 w-4 shrink-0 text-scef-gold" />
                  <span className="leading-relaxed">{selected.speakers}</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        maxLength={255}
        className="w-full rounded-lg border border-white/15 bg-[#0A1628] px-3 py-2.5 text-sm text-white focus:border-scef-gold focus:outline-none"
      />
    </div>
  );
}
