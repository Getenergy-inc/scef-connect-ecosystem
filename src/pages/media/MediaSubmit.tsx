import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, Loader2, CheckCircle2, ListChecks } from "lucide-react";

const categoryOptions = [
  { value: "school-outreach", label: "School Outreach" },
  { value: "classroom", label: "Teacher Training / Classroom" },
  { value: "volunteers", label: "Volunteer Activity" },
  { value: "girls-education", label: "Girls & STEM" },
  { value: "awards", label: "NESA Awards" },
  { value: "advocacy", label: "Advocacy / Walk" },
  { value: "rebuild", label: "Rebuild My School" },
  { value: "landscape", label: "Landscape / Community" },
  { value: "other", label: "Other" },
];

const programOptions = [
  "EduAid-Africa",
  "NESA-Africa",
  "Education Online Africa",
  "eLibrary Africa",
  "My Career, My Life",
  "Rebuild My School Africa",
  "Send a Child to School",
  "Local Chapter Activity",
  "It's In Me Radio",
  "NESA TV",
  "General SCEF",
];

const schema = z.object({
  contributor_name: z.string().trim().min(1, "Required").max(200),
  contributor_email: z.string().trim().email("Invalid email").max(255),
  organization: z.string().trim().max(200).optional(),
  category: z.string().min(1, "Choose a category"),
  program: z.string().optional(),
  year: z.string().regex(/^\d{4}$/, "4-digit year").optional().or(z.literal("")),
  location: z.string().trim().max(200).optional(),
  caption: z.string().trim().min(3, "Add a short caption").max(300),
  story: z.string().trim().max(5000).optional(),
  consent_publish: z.literal(true, {
    errorMap: () => ({ message: "Publication consent is required" }),
  }),
  consent_accuracy: z.literal(true, {
    errorMap: () => ({ message: "Accuracy attestation is required" }),
  }),
});

const MediaSubmit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) setUserEmail(data.user.email);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const fd = new FormData(e.currentTarget);
    const raw = {
      contributor_name: String(fd.get("contributor_name") || ""),
      contributor_email: String(fd.get("contributor_email") || ""),
      organization: String(fd.get("organization") || ""),
      category: String(fd.get("category") || ""),
      program: String(fd.get("program") || ""),
      year: String(fd.get("year") || ""),
      location: String(fd.get("location") || ""),
      caption: String(fd.get("caption") || ""),
      story: String(fd.get("story") || ""),
      consent_publish: fd.get("consent_publish") === "on",
      consent_accuracy: fd.get("consent_accuracy") === "on",
    };

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      toast({
        title: "Please check the form",
        description: parsed.error.errors[0]?.message ?? "Validation failed",
        variant: "destructive",
      });
      return;
    }
    if (!file) {
      toast({
        title: "Photo required",
        description: "Please select a photo to upload (JPG/PNG, max 10 MB).",
        variant: "destructive",
      });
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Photos must be 10 MB or smaller.",
        variant: "destructive",
      });
      return;
    }
    if (!/^image\/(jpe?g|png|webp)$/i.test(file.type)) {
      toast({
        title: "Unsupported format",
        description: "Use JPG, PNG or WebP.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      // Upload photo
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
      const path = `submissions/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("media-uploads")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (upErr) throw upErr;

      const { data: pub } = supabase.storage
        .from("media-uploads")
        .getPublicUrl(path);

      // Insert submission
      const { data: userData } = await supabase.auth.getUser();
      const { error: insErr } = await supabase
        .from("media_submissions")
        .insert({
          user_id: userData.user?.id ?? null,
          contributor_name: parsed.data.contributor_name,
          contributor_email: parsed.data.contributor_email,
          organization: parsed.data.organization || null,
          category: parsed.data.category,
          program: parsed.data.program || null,
          year: parsed.data.year || null,
          location: parsed.data.location || null,
          caption: parsed.data.caption,
          story: parsed.data.story || null,
          photo_url: pub.publicUrl,
          photo_alt: parsed.data.caption,
          consent_publish: true,
          consent_accuracy: true,
          status: "pending",
        });
      if (insErr) throw insErr;

      setDone(pub.publicUrl);
      toast({
        title: "Submission received",
        description: "Thank you — our editors will review your contribution.",
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Submission failed";
      toast({ title: "Could not submit", description: msg, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <PageShell
        title="Submission received"
        description="Thank you for contributing to the SCEF Media Archive."
        eyebrow="Media · Submission received"
        heading="Thank you for your contribution"
        intro="Our editorial team will review your submission. Approved entries will appear in the SCEF Media Archive with credit."
      >
        <section className="container mx-auto px-4 py-12 max-w-2xl">
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-scef-gold mb-3" />
            <p className="text-sm text-muted-foreground">
              Your photo and details have been received. Track the review status from
              the link below.
            </p>
            <img
              src={done}
              alt="Submitted preview"
              className="mt-6 mx-auto rounded-lg max-h-64 object-cover"
            />
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link to="/media/my-submissions">
                  <ListChecks className="w-4 h-4 mr-2" />
                  My Submissions
                </Link>
              </Button>
              <Button asChild variant="outline" onClick={() => navigate(0)}>
                <Link to="/media/submit">Submit another</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/media/archive">Back to archive</Link>
              </Button>
            </div>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell
      title="Submit Media"
      description="Contribute photos and stories from SCEF programs — school outreach, NESA-Africa, EduAid, advocacy, training, awards and local chapters."
      eyebrow="Media Archive · Contribute"
      heading="Submit Media to the SCEF Archive"
      intro="Help us grow a real, Pan-African visual record of education transformation. Submissions are reviewed by our editorial team before publishing."
    >
      <section className="container mx-auto px-4 py-10 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Contributor */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="contributor_name">Your full name *</Label>
              <Input id="contributor_name" name="contributor_name" required maxLength={200} />
            </div>
            <div>
              <Label htmlFor="contributor_email">Email *</Label>
              <Input
                id="contributor_email"
                name="contributor_email"
                type="email"
                required
                maxLength={255}
                defaultValue={userEmail}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="organization">Organization / chapter (optional)</Label>
            <Input id="organization" name="organization" maxLength={200} />
          </div>

          {/* Categorization */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select name="category" required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="program">SCEF program</Label>
              <Select name="program">
                <SelectTrigger id="program">
                  <SelectValue placeholder="Optional — link to a program" />
                </SelectTrigger>
                <SelectContent>
                  {programOptions.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="year">Year</Label>
              <Input id="year" name="year" placeholder="e.g. 2024" maxLength={4} inputMode="numeric" />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" placeholder="City, country" maxLength={200} />
            </div>
          </div>

          {/* Story */}
          <div>
            <Label htmlFor="caption">Short caption *</Label>
            <Input id="caption" name="caption" required maxLength={300} placeholder="One sentence describing the photo" />
          </div>
          <div>
            <Label htmlFor="story">Full story (optional)</Label>
            <Textarea id="story" name="story" rows={5} maxLength={5000} />
          </div>

          {/* File */}
          <div>
            <Label htmlFor="photo">Photo * (JPG/PNG/WebP, max 10 MB)</Label>
            <div className="mt-1 flex items-center gap-3">
              <Input
                id="photo"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                required
              />
              <Upload className="w-4 h-4 text-muted-foreground" />
            </div>
            {file && (
              <p className="mt-1 text-xs text-muted-foreground">
                {file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            )}
          </div>

          {/* Consent */}
          <div className="space-y-3 rounded-xl border border-border bg-card/40 p-4">
            <label className="flex gap-3 items-start cursor-pointer">
              <Checkbox name="consent_publish" required />
              <span className="text-sm text-foreground">
                I confirm I own this photo (or have permission from those pictured) and
                grant SCEF permission to publish it in the Media Archive with credit.
              </span>
            </label>
            <label className="flex gap-3 items-start cursor-pointer">
              <Checkbox name="consent_accuracy" required />
              <span className="text-sm text-foreground">
                I attest that the caption, program, year and location details I have
                provided are accurate to the best of my knowledge.
              </span>
            </label>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <Button type="submit" disabled={submitting} className="bg-scef-blue-darker hover:bg-scef-blue-dark text-white font-semibold">
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting…
                </>
              ) : (
                "Submit for review"
              )}
            </Button>
            <Button asChild variant="outline">
              <Link to="/media/my-submissions">
                <ListChecks className="w-4 h-4 mr-2" />
                Track my submissions
              </Link>
            </Button>
          </div>
        </form>
      </section>
    </PageShell>
  );
};

export default MediaSubmit;
