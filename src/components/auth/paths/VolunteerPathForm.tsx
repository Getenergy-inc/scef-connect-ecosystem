import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "../forms/MultiSelect";
import { SERVICE_OPTIONS, HOURS_PER_MONTH, AFRICAN_REGIONS } from "@/lib/onboardingTaxonomy";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

interface Props {
  userId: string;
  onComplete: () => void;
}

export const VolunteerPathForm = ({ userId, onComplete }: Props) => {
  const [hours, setHours] = useState("10");
  const [skills, setSkills] = useState("");
  const [programs, setPrograms] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await supabase.from("applications").insert({
        user_id: userId,
        application_type: "volunteer",
        status: "submitted",
        payload: {
          hours_per_month: parseInt(hours, 10),
          skills,
          programs,
          regions,
        },
      });

      if (programs.length > 0) {
        const { data: services } = await supabase
          .from("services")
          .select("id, slug")
          .in("slug", programs);

        if (services && services.length > 0) {
          await supabase.from("user_service_preferences").upsert(
            services.map((s) => ({ user_id: userId, service_id: s.id })),
            { onConflict: "user_id,service_id" }
          );
        }
      }

      onComplete();
    } catch (error) {
      logger.error("Volunteer path save error:", error);
      toast.error("Could not save volunteer application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="hours">Availability</Label>
        <Select value={hours} onValueChange={setHours}>
          <SelectTrigger id="hours"><SelectValue /></SelectTrigger>
          <SelectContent>
            {HOURS_PER_MONTH.map((h) => <SelectItem key={h.value} value={String(h.value)}>{h.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Programs You'd Like to Support</Label>
        <MultiSelect options={SERVICE_OPTIONS} selected={programs} onChange={setPrograms} />
      </div>

      <div className="space-y-2">
        <Label>Preferred Regions</Label>
        <MultiSelect options={AFRICAN_REGIONS} selected={regions} onChange={setRegions} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="skills">Skills & Interests</Label>
        <Textarea id="skills" rows={3} value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="e.g. Translation, design, event coordination, teaching..." />
      </div>

      <Button size="lg" className="w-full" onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit Application"}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};
