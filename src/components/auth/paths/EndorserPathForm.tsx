import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "../forms/MultiSelect";
import { INSTITUTION_TYPES, ENDORSEMENT_TYPES, SERVICE_OPTIONS } from "@/lib/onboardingTaxonomy";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

interface Props {
  userId: string;
  onComplete: () => void;
}

export const EndorserPathForm = ({ userId, onComplete }: Props) => {
  const [institution, setInstitution] = useState("");
  const [type, setType] = useState("");
  const [endorsementType, setEndorsementType] = useState("");
  const [scope, setScope] = useState("");
  const [representative, setRepresentative] = useState("");
  const [collaborations, setCollaborations] = useState<string[]>([]);
  const [publicDisplay, setPublicDisplay] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!institution.trim()) {
      toast.error("Institution name is required.");
      return;
    }
    setLoading(true);
    try {
      await supabase.from("endorser_profiles").upsert({
        user_id: userId,
        institution_name: institution,
        institution_type: type || null,
        endorsement_type: endorsementType || null,
        endorsement_scope: scope || null,
        representative_name: representative || null,
        collaboration_interests: collaborations,
        public_display_permission: publicDisplay,
        status: "pending",
      }, { onConflict: "user_id" });

      await supabase.from("applications").insert({
        user_id: userId,
        application_type: "endorser",
        status: "submitted",
        payload: { institution, type, endorsementType, scope, collaborations, publicDisplay },
      });

      onComplete();
    } catch (error) {
      logger.error("Endorser path save error:", error);
      toast.error("Could not save endorsement details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="inst">Institution Name *</Label>
        <Input id="inst" value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="e.g. African Union Commission" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="itype">Institution Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger id="itype"><SelectValue placeholder="Select..." /></SelectTrigger>
            <SelectContent>
              {INSTITUTION_TYPES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="etype">Nature of Endorsement</Label>
          <Select value={endorsementType} onValueChange={setEndorsementType}>
            <SelectTrigger id="etype"><SelectValue placeholder="Select..." /></SelectTrigger>
            <SelectContent>
              {ENDORSEMENT_TYPES.map((e) => <SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="scope">Endorsement Scope</Label>
        <Input id="scope" value={scope} onChange={(e) => setScope(e.target.value)} placeholder="e.g. Pan-African, regional, country-level" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="rep">Representative Name</Label>
        <Input id="rep" value={representative} onChange={(e) => setRepresentative(e.target.value)} placeholder="Authorized signatory" />
      </div>

      <div className="space-y-2">
        <Label>Collaboration Interests</Label>
        <MultiSelect options={SERVICE_OPTIONS} selected={collaborations} onChange={setCollaborations} />
      </div>

      <div className="flex items-center justify-between rounded-lg border border-border p-3">
        <div>
          <Label htmlFor="display" className="text-sm">Public Display Permission</Label>
          <p className="text-xs text-muted-foreground">Allow SCEF to list your institution publicly as an endorser.</p>
        </div>
        <Switch id="display" checked={publicDisplay} onCheckedChange={setPublicDisplay} />
      </div>

      <Button size="lg" className="w-full" onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit Endorsement"}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};
