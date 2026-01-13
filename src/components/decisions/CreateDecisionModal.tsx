import { useState } from "react";
import { format, addDays } from "date-fns";
import { Plus, Trash2, Vote, Calendar, Users, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useLocale } from "@/contexts/LocaleContext";
import { toast } from "sonner";

interface CreateDecisionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (decision: {
    title: string;
    description: string | null;
    options: string[];
    voting_opens_at: string;
    voting_closes_at: string;
    quorum_count: number | null;
    is_anonymous: boolean;
  }) => Promise<void>;
}

export const CreateDecisionModal = ({
  open,
  onOpenChange,
  onSubmit,
}: CreateDecisionModalProps) => {
  const { t } = useLocale();
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState(["Yes", "No", "Abstain"]);
  const [newOption, setNewOption] = useState("");
  const [votingOpensAt, setVotingOpensAt] = useState(
    format(new Date(), "yyyy-MM-dd'T'HH:mm")
  );
  const [votingClosesAt, setVotingClosesAt] = useState(
    format(addDays(new Date(), 7), "yyyy-MM-dd'T'HH:mm")
  );
  const [quorumEnabled, setQuorumEnabled] = useState(false);
  const [quorumCount, setQuorumCount] = useState(10);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleAddOption = () => {
    if (newOption.trim() && !options.includes(newOption.trim())) {
      setOptions([...options, newOption.trim()]);
      setNewOption("");
    }
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error(t("decisions.titleRequired") || "Title is required");
      return;
    }

    if (options.length < 2) {
      toast.error(t("decisions.minOptions") || "At least 2 options are required");
      return;
    }

    if (new Date(votingClosesAt) <= new Date(votingOpensAt)) {
      toast.error(t("decisions.invalidDates") || "Close date must be after open date");
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit({
        title: title.trim(),
        description: description.trim() || null,
        options,
        voting_opens_at: new Date(votingOpensAt).toISOString(),
        voting_closes_at: new Date(votingClosesAt).toISOString(),
        quorum_count: quorumEnabled ? quorumCount : null,
        is_anonymous: isAnonymous,
      });
      
      // Reset form
      setTitle("");
      setDescription("");
      setOptions(["Yes", "No", "Abstain"]);
      setQuorumEnabled(false);
      setIsAnonymous(false);
      onOpenChange(false);
      toast.success(t("decisions.created") || "Decision created successfully");
    } catch (err) {
      console.error("Failed to create decision:", err);
      toast.error(t("decisions.createFailed") || "Failed to create decision");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Vote className="h-5 w-5" />
            {t("decisions.create") || "Create Decision / Motion"}
          </DialogTitle>
          <DialogDescription>
            {t("decisions.createDesc") || "Set up a new vote or motion for the team."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">{t("decisions.title") || "Title"} *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("decisions.titlePlaceholder") || "e.g., Approve Q1 Budget"}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">{t("decisions.description") || "Description"}</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("decisions.descPlaceholder") || "Provide context for this decision..."}
              rows={3}
            />
          </div>

          {/* Options */}
          <div className="space-y-2">
            <Label>{t("decisions.options") || "Voting Options"}</Label>
            <div className="space-y-2">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input value={option} readOnly className="flex-1" />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveOption(index)}
                    disabled={options.length <= 2}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <Input
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  placeholder={t("decisions.addOption") || "Add custom option..."}
                  onKeyDown={(e) => e.key === "Enter" && handleAddOption()}
                  className="flex-1"
                />
                <Button variant="outline" size="icon" onClick={handleAddOption}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Voting Window */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {t("decisions.opensAt") || "Opens At"}
              </Label>
              <Input
                type="datetime-local"
                value={votingOpensAt}
                onChange={(e) => setVotingOpensAt(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {t("decisions.closesAt") || "Closes At"}
              </Label>
              <Input
                type="datetime-local"
                value={votingClosesAt}
                onChange={(e) => setVotingClosesAt(e.target.value)}
              />
            </div>
          </div>

          {/* Quorum */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {t("decisions.quorum") || "Require Quorum"}
              </Label>
              <Switch checked={quorumEnabled} onCheckedChange={setQuorumEnabled} />
            </div>
            {quorumEnabled && (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={2}
                  value={quorumCount}
                  onChange={(e) => setQuorumCount(parseInt(e.target.value) || 2)}
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground">
                  {t("decisions.minimumVotes") || "minimum votes required"}
                </span>
              </div>
            )}
          </div>

          {/* Anonymous */}
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              {t("decisions.anonymous") || "Anonymous Voting"}
            </Label>
            <Switch checked={isAnonymous} onCheckedChange={setIsAnonymous} />
          </div>
          {isAnonymous && (
            <p className="text-xs text-muted-foreground">
              {t("decisions.anonymousNote") || "Votes will be recorded but voter identities will be hidden from other members."}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("common.cancel") || "Cancel"}
          </Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting 
              ? (t("common.creating") || "Creating...") 
              : (t("decisions.createMotion") || "Create Motion")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
