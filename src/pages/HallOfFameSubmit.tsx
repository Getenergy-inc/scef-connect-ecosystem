import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";
import { toast } from "sonner";
import { z } from "zod";
import { HOF_CONTRIBUTION_TYPES, HOF_PROGRAMS, HOF_ROLES, uniqueSlug } from "@/lib/hallOfFame";

const schema = z.object({
  full_name: z.string().trim().min(2).max(200),
  submitted_email: z.string().trim().email().max(255).optional().or(z.literal("")),
  role: z.string().min(1),
  contribution_type: z.string().optional(),
  year_start: z.coerce.number().int().min(2007).max(new Date().getFullYear() + 1).optional(),
  year_end: z.coerce.number().int().min(2007).max(new Date().getFullYear() + 1).optional(),
  program_supported: z.string().optional(),
  country: z.string().max(100).optional(),
  region: z.string().max(100).optional(),
  contribution_summary: z.string().max(2000).optional(),
  testimony: z.string().max(5000).optional(),
});

export default function HallOfFameSubmit() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [media, setMedia] = useState<File[]>([]);
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    full_name: "", submitted_email: "", role: "Volunteer", contribution_type: "",
    year_start: "", year_end: "", program_supported: "", country: "", region: "",
    contribution_summary: "", testimony: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function uploadFile(file: File): Promise<string | null> {
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const { error } = await supabase.storage.from("hall-of-fame").upload(path, file, { cacheControl: "3600", upsert: false });
    if (error) { logger.error("upload error", error); return null; }
    const { data } = supabase.storage.from("hall-of-fame").getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) { toast.error("Please consent to public display before submitting."); return; }
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your inputs.");
      return;
    }
    setSubmitting(true);
    try {
      const { data: auth } = await supabase.auth.getUser();
      const photo_url = photo ? await uploadFile(photo) : null;

      const { data: created, error } = await supabase
        .from("hall_of_fame_profiles")
        .insert({
          user_id: auth.user?.id ?? null,
          slug: uniqueSlug(form.full_name),
          full_name: form.full_name.trim(),
          submitted_email: form.submitted_email || null,
          role: form.role,
          contribution_type: form.contribution_type || null,
          year_start: form.year_start ? Number(form.year_start) : null,
          year_end: form.year_end ? Number(form.year_end) : null,
          program_supported: form.program_supported || null,
          country: form.country || null,
          region: form.region || null,
          contribution_summary: form.contribution_summary || null,
          testimony: form.testimony || null,
          photo_url,
          consent_public_display: consent,
          status: "pending",
        })
        .select("id")
        .single();
      if (error) throw error;

      if (media.length > 0 && created) {
        const uploaded = await Promise.all(media.map((f) => uploadFile(f)));
        const rows = uploaded.filter(Boolean).map((url, i) => ({
          profile_id: created.id, media_url: url as string,
          media_type: media[i].type.startsWith("video") ? "video" : "image",
          display_order: i,
        }));
        if (rows.length) await supabase.from("hall_of_fame_media").insert(rows);
      }

      toast.success("Submitted! Our team will review and publish soon.");
      navigate("/contributors");
    } catch (err: any) {
      logger.error("HoF submit error", err);
      toast.error(err.message ?? "Could not submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Submit Your Testimony — SCEF Hall of Fame</title>
        <meta name="description" content="Share your SCEF story. Submit your contribution, testimony and photo for inclusion in the Hall of Fame & Appreciation Wall." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />

        <main className="py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-6 md:px-8">
            <Link to="/contributors" className="text-sm text-muted-foreground hover:text-scef-blue-darker">← Contributors</Link>
            <h1 className="mt-4 font-display text-3xl font-bold text-scef-blue-darker md:text-4xl">Submit Your Testimony</h1>
            <p className="mt-2 text-muted-foreground">
              Tell us how you've been part of SCEF since 2007. Submissions are reviewed before being published.
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6 rounded-2xl border border-border bg-card p-6 md:p-8">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-1.5 md:col-span-2">
                  <Label htmlFor="full_name">Full name *</Label>
                  <Input id="full_name" required value={form.full_name} onChange={(e) => set("full_name", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="submitted_email">Email <span className="text-muted-foreground font-normal">(optional)</span></Label>
                  <Input id="submitted_email" type="email" value={form.submitted_email} onChange={(e) => set("submitted_email", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="role">Role *</Label>
                  <Select value={form.role} onValueChange={(v) => set("role", v)}>
                    <SelectTrigger id="role"><SelectValue /></SelectTrigger>
                    <SelectContent>{HOF_ROLES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contribution_type">Contribution type</Label>
                  <Select value={form.contribution_type} onValueChange={(v) => set("contribution_type", v)}>
                    <SelectTrigger id="contribution_type"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>{HOF_CONTRIBUTION_TYPES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="program_supported">Program supported</Label>
                  <Select value={form.program_supported} onValueChange={(v) => set("program_supported", v)}>
                    <SelectTrigger id="program_supported"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>{HOF_PROGRAMS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="year_start">Year started</Label>
                  <Input id="year_start" type="number" min={2007} value={form.year_start} onChange={(e) => set("year_start", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="year_end">Year ended <span className="text-muted-foreground font-normal">(or current)</span></Label>
                  <Input id="year_end" type="number" min={2007} value={form.year_end} onChange={(e) => set("year_end", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" value={form.country} onChange={(e) => set("country", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="region">Region</Label>
                  <Input id="region" value={form.region} onChange={(e) => set("region", e.target.value)} />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label htmlFor="contribution_summary">Brief contribution summary</Label>
                  <Textarea id="contribution_summary" rows={3} maxLength={2000} value={form.contribution_summary} onChange={(e) => set("contribution_summary", e.target.value)} />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label htmlFor="testimony">Your testimony</Label>
                  <Textarea id="testimony" rows={5} maxLength={5000} value={form.testimony} onChange={(e) => set("testimony", e.target.value)} placeholder="Share your SCEF story…" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="photo">Profile photo</Label>
                  <Input id="photo" type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="media">Supporting media <span className="text-muted-foreground font-normal">(images/videos)</span></Label>
                  <Input id="media" type="file" multiple accept="image/*,video/*" onChange={(e) => setMedia(Array.from(e.target.files ?? []))} />
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-border bg-background p-4">
                <Checkbox id="consent" checked={consent} onCheckedChange={(v) => setConsent(!!v)} />
                <Label htmlFor="consent" className="text-sm font-normal leading-relaxed">
                  I consent to my submission being reviewed and, if approved, displayed publicly on the SCEF Hall of Fame
                  with my photo, role, and testimony.
                </Label>
              </div>

              <Button type="submit" size="lg" disabled={submitting} className="w-full bg-scef-gold text-scef-blue-darker hover:bg-scef-gold-hover">
                {submitting ? "Submitting…" : "Submit for Review"}
              </Button>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
