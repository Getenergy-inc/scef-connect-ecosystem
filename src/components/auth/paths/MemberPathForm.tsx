import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "../forms/MultiSelect";
import { SERVICE_OPTIONS, MEMBERSHIP_TIERS, AGE_BANDS } from "@/lib/onboardingTaxonomy";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

interface Props {
  userId: string;
  onComplete: () => void;
}

export const MemberPathForm = ({ userId, onComplete }: Props) => {
  const [tier, setTier] = useState<string>("general");
  const [interests, setInterests] = useState<string[]>([]);
  const [ageBand, setAgeBand] = useState<string>("");
  const [occupation, setOccupation] = useState("");
  const [organization, setOrganization] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Update profile with member-specific data
      await supabase
        .from("profiles")
        .update({
          age_band: ageBand || null,
          occupation: occupation || null,
          organization: organization || null,
        })
        .eq("user_id", userId);

      // Save service preferences
      if (interests.length > 0) {
        const { data: services } = await supabase
          .from("services")
          .select("id, slug")
          .in("slug", interests);

        if (services && services.length > 0) {
          await supabase.from("user_service_preferences").upsert(
            services.map((s) => ({ user_id: userId, service_id: s.id })),
            { onConflict: "user_id,service_id" }
          );
        }
      }

      // Create membership record
      const { data: typeData } = await supabase
        .from("membership_types")
        .select("id")
        .eq("slug", tier)
        .maybeSingle();

      if (typeData) {
        await supabase.from("memberships").insert({
          user_id: userId,
          membership_type_id: typeData.id,
          membership_status: "active",
          payment_status: tier === "general" || tier === "youth" ? "completed" : "pending",
        });
      }

      onComplete();
    } catch (error) {
      logger.error("Member path save error:", error);
      toast.error("Could not save your preferences. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="tier">Membership Tier</Label>
        <Select value={tier} onValueChange={setTier}>
          <SelectTrigger id="tier"><SelectValue /></SelectTrigger>
          <SelectContent>
            {MEMBERSHIP_TIERS.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label} <span className="text-muted-foreground ml-2">— {t.price}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">Paid tiers can be activated later from your wallet.</p>
      </div>

      <div className="space-y-2">
        <Label>Preferred Programs & Services <span className="text-muted-foreground font-normal">(pick any)</span></Label>
        <MultiSelect options={SERVICE_OPTIONS} selected={interests} onChange={setInterests} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="age">Age Band</Label>
          <Select value={ageBand} onValueChange={setAgeBand}>
            <SelectTrigger id="age"><SelectValue placeholder="Select range" /></SelectTrigger>
            <SelectContent>
              {AGE_BANDS.map((a) => <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="occupation">Occupation <span className="text-muted-foreground font-normal">(optional)</span></Label>
          <Input id="occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)} placeholder="Educator, student, etc." />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="org">Organization / Affiliation <span className="text-muted-foreground font-normal">(optional)</span></Label>
        <Input id="org" value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="Your school, employer, or NGO" />
      </div>

      <Button size="lg" className="w-full" onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Continue"}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};
