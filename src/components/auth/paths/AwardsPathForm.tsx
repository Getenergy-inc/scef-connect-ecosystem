import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "../forms/MultiSelect";
import { AWARDS_ROLES, SERVICE_OPTIONS } from "@/lib/onboardingTaxonomy";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

interface Props {
  userId: string;
  onComplete: () => void;
}

export const AwardsPathForm = ({ userId, onComplete }: Props) => {
  const [role, setRole] = useState("applicant");
  const [interests, setInterests] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await supabase.from("applications").insert({
        user_id: userId,
        application_type: `nesa_${role}`,
        status: "submitted",
        payload: { role, interests, notes },
      });

      onComplete();
    } catch (error) {
      logger.error("Awards path save error:", error);
      toast.error("Could not save awards application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="role">Your Role in NESA-Africa</Label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger id="role"><SelectValue /></SelectTrigger>
          <SelectContent>
            {AWARDS_ROLES.map((r) => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Categories / Programs of Interest</Label>
        <MultiSelect options={SERVICE_OPTIONS} selected={interests} onChange={setInterests} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="notes">Notes <span className="text-muted-foreground font-normal">(optional)</span></Label>
        <Textarea id="notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any context: organisation, qualifications, sponsorship interest..." />
      </div>

      <Button size="lg" className="w-full" onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};
