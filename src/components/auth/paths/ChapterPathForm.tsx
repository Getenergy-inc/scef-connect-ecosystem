import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CHAPTER_INTENT } from "@/lib/onboardingTaxonomy";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

interface Props {
  userId: string;
  onComplete: () => void;
}

interface ChapterRow {
  id: string;
  name: string;
  country: string;
  city: string | null;
}

export const ChapterPathForm = ({ userId, onComplete }: Props) => {
  const [intent, setIntent] = useState<string>("join-existing");
  const [chapters, setChapters] = useState<ChapterRow[]>([]);
  const [chapterId, setChapterId] = useState<string>("");
  const [proposedCity, setProposedCity] = useState("");
  const [proposedCountry, setProposedCountry] = useState("");
  const [leadership, setLeadership] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase
      .from("chapters")
      .select("id, name, country, city")
      .eq("status", "active")
      .order("name")
      .then(({ data }) => setChapters(data ?? []));
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (intent === "join-existing" && chapterId) {
        await supabase.from("profiles").update({ chapter_id: chapterId }).eq("user_id", userId);
        await supabase.from("chapter_members").insert({ user_id: userId, chapter_id: chapterId });
      }

      await supabase.from("applications").insert({
        user_id: userId,
        application_type: "chapter",
        related_entity_id: intent === "join-existing" ? chapterId || null : null,
        status: "submitted",
        payload: {
          intent,
          proposed_city: proposedCity || null,
          proposed_country: proposedCountry || null,
          leadership_interest: leadership || null,
          community_experience: experience || null,
        },
      });

      onComplete();
    } catch (error) {
      logger.error("Chapter path save error:", error);
      toast.error("Could not save chapter preferences.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="intent">How would you like to engage with chapters?</Label>
        <Select value={intent} onValueChange={setIntent}>
          <SelectTrigger id="intent"><SelectValue /></SelectTrigger>
          <SelectContent>
            {CHAPTER_INTENT.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {intent === "join-existing" && (
        <div className="space-y-1.5">
          <Label htmlFor="chapter">Select a Chapter</Label>
          <Select value={chapterId} onValueChange={setChapterId}>
            <SelectTrigger id="chapter"><SelectValue placeholder="Choose chapter..." /></SelectTrigger>
            <SelectContent>
              {chapters.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name} ({c.country}{c.city ? `, ${c.city}` : ""})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {intent === "start-new" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="city">Proposed City</Label>
            <Input id="city" value={proposedCity} onChange={(e) => setProposedCity(e.target.value)} placeholder="Lagos" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="country">Country</Label>
            <Input id="country" value={proposedCountry} onChange={(e) => setProposedCountry(e.target.value)} placeholder="Nigeria" />
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="leadership">Leadership Interest <span className="text-muted-foreground font-normal">(optional)</span></Label>
        <Input id="leadership" value={leadership} onChange={(e) => setLeadership(e.target.value)} placeholder="e.g. Co-coordinator, programs lead" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="experience">Community / Volunteer Experience</Label>
        <Textarea id="experience" rows={3} value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Briefly describe relevant experience." />
      </div>

      <Button size="lg" className="w-full" onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Continue"}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};
