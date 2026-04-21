import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "../forms/MultiSelect";
import {
  INSTITUTION_TYPES, FUNDING_RANGES, SERVICE_OPTIONS,
  AFRICAN_REGIONS, PARTNERSHIP_TYPES,
} from "@/lib/onboardingTaxonomy";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

interface Props {
  userId: string;
  onComplete: () => void;
}

export const SponsorPathForm = ({ userId, onComplete }: Props) => {
  const [orgName, setOrgName] = useState("");
  const [orgType, setOrgType] = useState("");
  const [industry, setIndustry] = useState("");
  const [budget, setBudget] = useState("");
  const [partnershipType, setPartnershipType] = useState("");
  const [focus, setFocus] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [reporting, setReporting] = useState("quarterly");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!orgName.trim()) {
      toast.error("Organization name is required.");
      return;
    }
    setLoading(true);
    try {
      await supabase.from("sponsor_profiles").upsert({
        user_id: userId,
        organization_name: orgName,
        organization_type: orgType || null,
        industry: industry || null,
        budget_range: budget || null,
        focus_area: focus.join(",") || null,
        preferred_regions: regions,
        partnership_type: partnershipType || null,
        reporting_expectations: reporting,
        status: "pending",
      }, { onConflict: "user_id" });

      await supabase.from("applications").insert({
        user_id: userId,
        application_type: "sponsor",
        status: "submitted",
        payload: { orgName, orgType, industry, budget, focus, regions, partnershipType, reporting },
      });

      onComplete();
    } catch (error) {
      logger.error("Sponsor path save error:", error);
      toast.error("Could not save sponsor profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="org">Organization Name *</Label>
        <Input id="org" value={orgName} onChange={(e) => setOrgName(e.target.value)} placeholder="Acme Foundation" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="type">Organization Type</Label>
          <Select value={orgType} onValueChange={setOrgType}>
            <SelectTrigger id="type"><SelectValue placeholder="Select..." /></SelectTrigger>
            <SelectContent>
              {INSTITUTION_TYPES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="industry">Industry</Label>
          <Input id="industry" value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="Tech, Energy, Banking..." />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="budget">Budget Range</Label>
          <Select value={budget} onValueChange={setBudget}>
            <SelectTrigger id="budget"><SelectValue placeholder="Select..." /></SelectTrigger>
            <SelectContent>
              {FUNDING_RANGES.map((r) => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="ptype">Partnership Type</Label>
          <Select value={partnershipType} onValueChange={setPartnershipType}>
            <SelectTrigger id="ptype"><SelectValue placeholder="Select..." /></SelectTrigger>
            <SelectContent>
              {PARTNERSHIP_TYPES.map((p) => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Focus Areas</Label>
        <MultiSelect options={SERVICE_OPTIONS} selected={focus} onChange={setFocus} />
      </div>

      <div className="space-y-2">
        <Label>Preferred Regions</Label>
        <MultiSelect options={AFRICAN_REGIONS} selected={regions} onChange={setRegions} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="reporting">Reporting Expectations</Label>
        <Select value={reporting} onValueChange={setReporting}>
          <SelectTrigger id="reporting"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="bi-annual">Bi-annual</SelectItem>
            <SelectItem value="annual">Annual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button size="lg" className="w-full" onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit Partnership Inquiry"}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};
