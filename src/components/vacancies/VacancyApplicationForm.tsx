import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Loader2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  validateDocumentFile,
  generateSecureFileName,
  FILE_SIZE_LIMITS,
} from "@/lib/fileValidation";

const DIVISIONS = ["SOBCD", "TDSD", "OMBDD", "Santos Media", "LCS"] as const;
const APPLICATION_TYPES = ["Volunteer", "Intern", "Staff", "Consultant"] as const;

const schema = z.object({
  full_name: z.string().trim().min(2, "Full name is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(5, "Phone / WhatsApp is required").max(40),
  country: z.string().trim().min(2, "Country is required").max(80),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  preferred_division: z.enum(DIVISIONS, { errorMap: () => ({ message: "Select a division" }) }),
  preferred_role: z.string().trim().min(2, "Preferred role is required").max(160),
  application_type: z.enum(APPLICATION_TYPES, {
    errorMap: () => ({ message: "Select an application type" }),
  }),
  weekly_availability: z.string().trim().min(2, "Weekly availability is required").max(120),
  relevant_experience: z.string().trim().min(10, "Tell us about your relevant experience").max(2000),
  tools: z.string().trim().max(500).optional().or(z.literal("")),
  portfolio_url: z
    .string()
    .trim()
    .max(500)
    .url("Enter a valid URL")
    .optional()
    .or(z.literal("")),
  short_intro: z.string().trim().min(10, "Write a short introduction").max(1000),
  motivation: z.string().trim().min(10, "Tell us why you want to support SCEF").max(1500),
  consent_code_of_conduct: z.literal(true, {
    errorMap: () => ({ message: "Required" }),
  }),
  consent_safeguarding: z.literal(true, {
    errorMap: () => ({ message: "Required" }),
  }),
  consent_data_privacy: z.literal(true, {
    errorMap: () => ({ message: "Required" }),
  }),
});

type Props = {
  defaultRole?: string;
  defaultDivision?: string;
  defaultType?: string;
};

export const VacancyApplicationForm = ({
  defaultRole = "",
  defaultDivision = "",
  defaultType = "",
}: Props) => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string>("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [division, setDivision] = useState<string>(defaultDivision);
  const [appType, setAppType] = useState<string>(defaultType);
  const [consentCoC, setConsentCoC] = useState(false);
  const [consentSG, setConsentSG] = useState(false);
  const [consentDP, setConsentDP] = useState(false);

  const generateReferenceNumber = (): string => {
    const year = new Date().getFullYear();
    const rand = crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();
    return `SCEF-VAC-${year}-${rand}`;
  };

  const uploadFile = async (file: File, folder: string): Promise<string> => {
    const path = generateSecureFileName(file.name, folder);
    const { error } = await supabase.storage
      .from("vacancy-applications")
      .upload(path, file, { contentType: file.type, upsert: false });
    if (error) throw new Error(`Upload failed: ${error.message}`);
    return path;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!cvFile) {
      toast({
        title: "CV is required",
        description: "Please attach your CV (PDF, DOC, or DOCX, max 50MB).",
        variant: "destructive",
      });
      return;
    }
    const cvCheck = validateDocumentFile(cvFile);
    if (!cvCheck.isValid) {
      toast({ title: "Invalid CV file", description: cvCheck.error, variant: "destructive" });
      return;
    }
    if (portfolioFile) {
      const pCheck = validateDocumentFile(portfolioFile);
      if (!pCheck.isValid) {
        toast({
          title: "Invalid portfolio file",
          description: pCheck.error,
          variant: "destructive",
        });
        return;
      }
    }

    const fd = new FormData(e.currentTarget);
    const payload = {
      full_name: String(fd.get("full_name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      country: String(fd.get("country") ?? ""),
      city: String(fd.get("city") ?? ""),
      preferred_division: division,
      preferred_role: String(fd.get("preferred_role") ?? ""),
      application_type: appType,
      weekly_availability: String(fd.get("weekly_availability") ?? ""),
      relevant_experience: String(fd.get("relevant_experience") ?? ""),
      tools: String(fd.get("tools") ?? ""),
      portfolio_url: String(fd.get("portfolio_url") ?? ""),
      short_intro: String(fd.get("short_intro") ?? ""),
      motivation: String(fd.get("motivation") ?? ""),
      consent_code_of_conduct: consentCoC,
      consent_safeguarding: consentSG,
      consent_data_privacy: consentDP,
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
      const cv_path = await uploadFile(cvFile, "cv");
      const portfolio_file_path = portfolioFile
        ? await uploadFile(portfolioFile, "portfolio")
        : null;

      const { error } = await supabase.from("vacancy_applications").insert({
        full_name: parsed.data.full_name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        country: parsed.data.country,
        city: parsed.data.city || null,
        preferred_division: parsed.data.preferred_division,
        preferred_role: parsed.data.preferred_role,
        application_type: parsed.data.application_type,
        weekly_availability: parsed.data.weekly_availability,
        relevant_experience: parsed.data.relevant_experience,
        tools: parsed.data.tools || null,
        portfolio_url: parsed.data.portfolio_url || null,
        short_intro: parsed.data.short_intro,
        motivation: parsed.data.motivation,
        cv_path,
        portfolio_file_path,
        consent_code_of_conduct: parsed.data.consent_code_of_conduct,
        consent_safeguarding: parsed.data.consent_safeguarding,
        consent_data_privacy: parsed.data.consent_data_privacy,
      });
      if (error) throw error;

      setSuccess(true);
      toast({
        title: "Application received",
        description: "Thank you. The SCEF team will review your application and reach out.",
      });
    } catch (err: any) {
      toast({
        title: "Submission failed",
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
          <h4 className="font-display text-lg font-bold">Application received</h4>
        </div>
        <p className="mt-2 text-sm">
          Your application has been securely submitted to the SCEF team. We review applications on
          a rolling basis and will contact you by email if you are shortlisted.
        </p>
      </div>
    );
  }

  const maxDocMB = Math.round(FILE_SIZE_LIMITS.document / (1024 * 1024));

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-5"
    >
      <div>
        <h3 className="font-display text-xl font-bold text-scef-blue-darker md:text-2xl">
          Apply to a SCEF Division or Vacancy
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Submit your application securely. Fields marked * are required.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="full_name">Full name *</Label>
          <Input id="full_name" name="full_name" required maxLength={120} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" required maxLength={255} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone / WhatsApp *</Label>
          <Input id="phone" name="phone" type="tel" required maxLength={40} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="country">Country *</Label>
          <Input id="country" name="country" required maxLength={80} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" maxLength={80} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="weekly_availability">Weekly availability *</Label>
          <Input
            id="weekly_availability"
            name="weekly_availability"
            required
            maxLength={120}
            placeholder="e.g. 6–10 hrs / week"
          />
        </div>

        <div className="space-y-1.5">
          <Label>Preferred division *</Label>
          <Select value={division} onValueChange={setDivision}>
            <SelectTrigger>
              <SelectValue placeholder="Select a division" />
            </SelectTrigger>
            <SelectContent>
              {DIVISIONS.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Application type *</Label>
          <Select value={appType} onValueChange={setAppType}>
            <SelectTrigger>
              <SelectValue placeholder="Volunteer / Intern / Staff / Consultant" />
            </SelectTrigger>
            <SelectContent>
              {APPLICATION_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="preferred_role">Preferred role *</Label>
          <Input
            id="preferred_role"
            name="preferred_role"
            required
            maxLength={160}
            defaultValue={defaultRole}
            placeholder="e.g. Frontend Developer"
          />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="tools">Tools you can use</Label>
          <Input
            id="tools"
            name="tools"
            maxLength={500}
            placeholder="e.g. Figma, React, Canva, Notion"
          />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="portfolio_url">Portfolio / LinkedIn / GitHub / website</Label>
          <Input
            id="portfolio_url"
            name="portfolio_url"
            type="url"
            maxLength={500}
            placeholder="https://..."
          />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="short_intro">Short introduction *</Label>
          <Textarea id="short_intro" name="short_intro" required maxLength={1000} rows={3} />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="relevant_experience">Relevant experience *</Label>
          <Textarea
            id="relevant_experience"
            name="relevant_experience"
            required
            maxLength={2000}
            rows={4}
          />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="motivation">Why you want to support SCEF *</Label>
          <Textarea id="motivation" name="motivation" required maxLength={1500} rows={4} />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="cv">CV upload * <span className="text-xs text-muted-foreground">(PDF, DOC, DOCX, max {maxDocMB}MB)</span></Label>
          <div className="flex items-center gap-2">
            <Input
              id="cv"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
              required
            />
            <Upload className="h-4 w-4 text-muted-foreground shrink-0" />
          </div>
          {cvFile && (
            <p className="text-xs text-muted-foreground">
              Selected: {cvFile.name} ({Math.round(cvFile.size / 1024)} KB)
            </p>
          )}
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="portfolio_file">Portfolio file (optional) <span className="text-xs text-muted-foreground">(PDF, DOC, DOCX, max {maxDocMB}MB)</span></Label>
          <Input
            id="portfolio_file"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(e) => setPortfolioFile(e.target.files?.[0] ?? null)}
          />
          {portfolioFile && (
            <p className="text-xs text-muted-foreground">
              Selected: {portfolioFile.name} ({Math.round(portfolioFile.size / 1024)} KB)
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2.5 border-t border-border pt-4">
        <label className="flex items-start gap-2.5 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={consentCoC}
            onChange={(e) => setConsentCoC(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-border"
            required
          />
          <span>I agree to the SCEF Code of Conduct. *</span>
        </label>
        <label className="flex items-start gap-2.5 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={consentSG}
            onChange={(e) => setConsentSG(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-border"
            required
          />
          <span>I acknowledge the Safeguarding and Child Protection policies. *</span>
        </label>
        <label className="flex items-start gap-2.5 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={consentDP}
            onChange={(e) => setConsentDP(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-border"
            required
          />
          <span>
            I consent to SCEF processing my data for recruitment purposes under the Data Protection
            Policy. *
          </span>
        </label>
      </div>

      <Button type="submit" disabled={submitting} className="w-full md:w-auto">
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
          </>
        ) : (
          "Submit Application"
        )}
      </Button>
    </form>
  );
};

export default VacancyApplicationForm;
