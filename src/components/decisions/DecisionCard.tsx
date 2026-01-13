import { useState } from "react";
import { format, isPast, isFuture } from "date-fns";
import { 
  Vote, Clock, CheckCircle2, XCircle, Users, Eye, 
  ChevronDown, ChevronUp, FileText, BarChart3 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import type { Decision } from "@/hooks/useDecisions";
import { useLocale } from "@/contexts/LocaleContext";

interface DecisionCardProps {
  decision: Decision;
  currentUserId: string;
  onVote: (decisionId: string, option: string) => Promise<void>;
  onClose?: (decisionId: string) => Promise<void>;
  onCancel?: (decisionId: string) => Promise<void>;
  onViewAuditLog?: (decisionId: string) => void;
  isAdmin?: boolean;
}

export const DecisionCard = ({
  decision,
  currentUserId,
  onVote,
  onClose,
  onCancel,
  onViewAuditLog,
  isAdmin,
}: DecisionCardProps) => {
  const { t } = useLocale();
  const [voting, setVoting] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const userVote = decision.votes?.find(v => v.user_id === currentUserId);
  const totalVotes = decision.votes?.length || 0;
  const votesOpened = !isFuture(new Date(decision.voting_opens_at));
  const votesClosed = isPast(new Date(decision.voting_closes_at)) || decision.status === "closed";
  const canVote = votesOpened && !votesClosed && !userVote && decision.status === "open";
  const quorumMet = decision.quorum_count ? totalVotes >= decision.quorum_count : true;

  const getStatusBadge = () => {
    switch (decision.status) {
      case "draft":
        return <Badge variant="secondary">{t("decisions.draft") || "Draft"}</Badge>;
      case "open":
        if (votesClosed) {
          return <Badge variant="outline" className="border-amber-500 text-amber-600">
            {t("decisions.pendingClose") || "Pending Close"}
          </Badge>;
        }
        return <Badge className="bg-green-500">{t("decisions.open") || "Open"}</Badge>;
      case "closed":
        return <Badge variant="outline">{t("decisions.closed") || "Closed"}</Badge>;
      case "cancelled":
        return <Badge variant="destructive">{t("decisions.cancelled") || "Cancelled"}</Badge>;
      default:
        return null;
    }
  };

  const handleVote = async (option: string) => {
    if (!canVote) return;
    
    try {
      setVoting(true);
      await onVote(decision.id, option);
    } catch (err) {
      console.error("Failed to vote:", err);
    } finally {
      setVoting(false);
    }
  };

  const getVoteCount = (option: string) => {
    if (decision.result_summary) {
      return decision.result_summary[option] || 0;
    }
    return decision.votes?.filter(v => v.vote_option === option).length || 0;
  };

  const getVotePercentage = (option: string) => {
    if (totalVotes === 0) return 0;
    return Math.round((getVoteCount(option) / totalVotes) * 100);
  };

  return (
    <Card className={cn(
      "transition-all",
      decision.status === "open" && "border-green-200 dark:border-green-800"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {getStatusBadge()}
              {decision.is_anonymous && (
                <Badge variant="outline" className="text-xs">
                  <Eye className="h-3 w-3 mr-1" />
                  {t("decisions.anonymous") || "Anonymous"}
                </Badge>
              )}
              {decision.quorum_count && (
                <Badge variant="outline" className={cn(
                  "text-xs",
                  quorumMet ? "border-green-500" : "border-amber-500"
                )}>
                  <Users className="h-3 w-3 mr-1" />
                  {totalVotes}/{decision.quorum_count}
                </Badge>
              )}
            </div>
            <h3 className="font-semibold">{decision.title}</h3>
            {decision.description && (
              <p className="text-sm text-muted-foreground mt-1">{decision.description}</p>
            )}
          </div>
          <Vote className="h-5 w-5 text-muted-foreground shrink-0" />
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {votesOpened 
              ? `${t("decisions.closesAt") || "Closes"}: ${format(new Date(decision.voting_closes_at), "PPp")}`
              : `${t("decisions.opensAt") || "Opens"}: ${format(new Date(decision.voting_opens_at), "PPp")}`
            }
          </span>
          <span className="flex items-center gap-1">
            <BarChart3 className="h-3 w-3" />
            {totalVotes} {t("decisions.votes") || "votes"}
          </span>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Voting Options */}
        <div className="space-y-2">
          {decision.options.map((option) => {
            const voteCount = getVoteCount(option);
            const percentage = getVotePercentage(option);
            const isUserVote = userVote?.vote_option === option;

            return (
              <div key={option} className="relative">
                {canVote ? (
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start h-auto py-3 px-4",
                      "hover:bg-primary/5 hover:border-primary"
                    )}
                    onClick={() => handleVote(option)}
                    disabled={voting}
                  >
                    <span className="font-medium">{option}</span>
                  </Button>
                ) : (
                  <div className={cn(
                    "relative rounded-lg border p-3",
                    isUserVote && "border-primary bg-primary/5"
                  )}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={cn(
                        "font-medium",
                        isUserVote && "text-primary"
                      )}>
                        {option}
                        {isUserVote && (
                          <CheckCircle2 className="h-4 w-4 inline ml-2 text-primary" />
                        )}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {voteCount} ({percentage}%)
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* User's vote confirmation */}
        {userVote && (
          <p className="text-sm text-muted-foreground mt-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            {t("decisions.youVoted") || "You voted"}: <strong>{userVote.vote_option}</strong>
          </p>
        )}

        {/* Admin Actions */}
        {isAdmin && decision.status === "open" && (
          <div className="flex gap-2 mt-4 pt-4 border-t">
            {onClose && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onClose(decision.id)}
              >
                <CheckCircle2 className="h-4 w-4 mr-1" />
                {t("decisions.closeVoting") || "Close Voting"}
              </Button>
            )}
            {onCancel && (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-destructive"
                onClick={() => onCancel(decision.id)}
              >
                <XCircle className="h-4 w-4 mr-1" />
                {t("decisions.cancel") || "Cancel"}
              </Button>
            )}
          </div>
        )}

        {/* Audit Log Toggle */}
        {onViewAuditLog && (
          <Collapsible open={showDetails} onOpenChange={setShowDetails}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full mt-3">
                <FileText className="h-4 w-4 mr-2" />
                {t("decisions.auditLog") || "Audit Log"}
                {showDetails ? (
                  <ChevronUp className="h-4 w-4 ml-auto" />
                ) : (
                  <ChevronDown className="h-4 w-4 ml-auto" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Button 
                variant="link" 
                size="sm" 
                onClick={() => onViewAuditLog(decision.id)}
              >
                {t("decisions.viewFullLog") || "View full audit log"}
              </Button>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
};
