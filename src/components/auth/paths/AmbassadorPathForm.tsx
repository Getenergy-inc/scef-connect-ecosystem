import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "../forms/MultiSelect";
import { AMBASSADOR_TIERS, ADVOCACY_FOCUS, SERVICE_OPTIONS, HOURS_PER_MONTH } from "@/lib/onboardingTaxonomy";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

interface Props {
  userId: string;
  onComplete: () => void;
}

export const AmbassadorPathForm = ({ userId, onComplete }: Props) => {
  const [tier, setTier] = useState("standard");
  const [focus, setFocus] = useState<string[]>([]);
  const [programs, setPrograms] = useState<string[]>([]);
  const [hours, setHours] = useState<string>("10");
  const [linkedin, setLinkedin] = useState("");
  const [website, setWebsite] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await supabase.from("ambassador_profiles").upsert({
        user_id: userId,
        tier_interest: tier,
        advocacy_focus: focus,
        preferred_programs: programs,
        hours_per_month: parseInt(hours, 10),
        public_profile_links: { linkedin: linkedin || null, website: website || null },
        experience_summary: experience || null,
        status: "pending",
      }, { onConflict: "user_id" });

      await supabase.from("applications").insert({
        user_id: userId,
        application_type: "ambassador",
        status: "submitted",
        payload: { tier, focus, programs, hours },
      });

      onComplete();
    } catch (error) {
      logger.error("Ambassador path save error:", error);
      toast.error("Could not save ambassador application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="tier">Ambassador Tier Interest</Label>
          <Select value={tier} onValueChange={setTier}>
            <SelectTrigger id="tier"><SelectValue /></SelectTrigger>
            <SelectContent>
              {AMBASSADOR_TIERS.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="hours">Hours Per Month</Label>
          <Select value={hours} onValueChange={setHours}>
            <SelectTrigger id="hours"><SelectValue /></SelectTrigger>
            <SelectContent>
              {HOURS_PER_MONTH.map((h) => <SelectItem key={h.value} value={String(h.value)}>{h.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Advocacy Focus Areas</Label>
        <MultiSelect options={ADVOCACY_FOCUS} selected={focus} onChange={setFocus} />
      </div>

      <div className="space-y-2">
        <Label>Programs You'd Like to Represent</Label>
        <MultiSelect options={SERVICE_OPTIONS} selected={programs} onChange={setPrograms} max={5} />
        <p className="text-xs text-muted-foreground">Pick up to 5 programs.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="linkedin">LinkedIn URL <span className="text-muted-foreground font-normal">(optional)</span></Label>
          <Input id="linkedin" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="linkedin.com/in/..." />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="website">Personal Website <span className="text-muted-foreground font-normal">(optional)</span></Label>
          <Input id="website" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://..." />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="experience">Prior Leadership / Outreach Experience</Label>
        <Textarea id="experience" rows={3} value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Briefly describe relevant work." />
      </div>

      <Button size="lg" className="w-full" onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit Application"}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};
