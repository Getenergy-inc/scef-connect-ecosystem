import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Vote, Plus, Filter, Search, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DecisionCard } from "@/components/decisions/DecisionCard";
import { CreateDecisionModal } from "@/components/decisions/CreateDecisionModal";
import { useDecisions } from "@/hooks/useDecisions";
import { useLocale } from "@/contexts/LocaleContext";
import { supabase } from "@/integrations/supabase/client";

const Decisions = () => {
  const { t } = useLocale();
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth/sign-in");
        return;
      }
      setUserId(session.user.id);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth/sign-in");
      } else {
        setUserId(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const { decisions, loading: decisionsLoading, castVote, closeDecision, cancelDecision, createDecision } = useDecisions();

  const filteredDecisions = decisions.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openDecisions = filteredDecisions.filter(d => d.status === "open");
  const closedDecisions = filteredDecisions.filter(d => d.status === "closed");
  const cancelledDecisions = filteredDecisions.filter(d => d.status === "cancelled");

  const handleCreateDecision = async (decision: Parameters<typeof createDecision>[0]) => {
    if (!userId) return;
    await createDecision({ ...decision, created_by: userId, room_id: decisions[0]?.room_id || "" });
  };

  if (loading || decisionsLoading) {
    return (
      <DashboardLayout role="member" title={t("decisions.title") || "Decisions"}>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-pulse text-primary">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t("decisions.title") || "Decisions & Voting"} - SCEF</title>
      </Helmet>
      
      <DashboardLayout role="member" title={t("decisions.title") || "Decisions"}>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Vote className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">{t("decisions.title") || "Decisions & Voting"}</h1>
                <p className="text-sm text-muted-foreground">
                  {t("decisions.subtitle") || "View and participate in team decisions"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate("/messages")}>
                <MessageSquare className="h-4 w-4 mr-2" />
                {t("messages.title") || "Messages"}
              </Button>
              <Button onClick={() => setShowCreateModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                {t("decisions.create") || "New Decision"}
              </Button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("decisions.search") || "Search decisions..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {["all", "open", "closed"].map((status) => (
                <Badge
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  className="cursor-pointer capitalize"
                  onClick={() => setStatusFilter(status)}
                >
                  {status === "all" ? t("common.all") || "All" : status}
                </Badge>
              ))}
            </div>
          </div>

          {/* Decisions Tabs */}
          <Tabs defaultValue="open" className="space-y-4">
            <TabsList>
              <TabsTrigger value="open" className="flex items-center gap-2">
                {t("decisions.open") || "Open"}
                {openDecisions.length > 0 && (
                  <Badge variant="secondary" className="h-5 px-1.5">
                    {openDecisions.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="closed">
                {t("decisions.closed") || "Closed"}
              </TabsTrigger>
              <TabsTrigger value="all">
                {t("common.all") || "All"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="open" className="space-y-4">
              {openDecisions.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Vote className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>{t("decisions.noOpen") || "No open decisions"}</p>
                </div>
              ) : (
                openDecisions.map((decision) => (
                  <DecisionCard
                    key={decision.id}
                    decision={decision}
                    currentUserId={userId || ""}
                    onVote={(decisionId, option) => castVote(decisionId, userId || "", option)}
                    onClose={(decisionId) => closeDecision(decisionId, userId || "")}
                    onCancel={(decisionId) => cancelDecision(decisionId, userId || "")}
                    isAdmin={true}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="closed" className="space-y-4">
              {closedDecisions.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>{t("decisions.noClosed") || "No closed decisions"}</p>
                </div>
              ) : (
                closedDecisions.map((decision) => (
                  <DecisionCard
                    key={decision.id}
                    decision={decision}
                    currentUserId={userId || ""}
                    onVote={(decisionId, option) => castVote(decisionId, userId || "", option)}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="all" className="space-y-4">
              {filteredDecisions.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>{t("decisions.noDecisions") || "No decisions found"}</p>
                </div>
              ) : (
                filteredDecisions.map((decision) => (
                  <DecisionCard
                    key={decision.id}
                    decision={decision}
                    currentUserId={userId || ""}
                    onVote={(decisionId, option) => castVote(decisionId, userId || "", option)}
                    onClose={decision.status === "open" ? (decisionId) => closeDecision(decisionId, userId || "") : undefined}
                    onCancel={decision.status === "open" ? (decisionId) => cancelDecision(decisionId, userId || "") : undefined}
                    isAdmin={true}
                  />
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Create Decision Modal */}
        <CreateDecisionModal
          open={showCreateModal}
          onOpenChange={setShowCreateModal}
          onSubmit={handleCreateDecision}
        />
      </DashboardLayout>
    </>
  );
};

export default Decisions;
