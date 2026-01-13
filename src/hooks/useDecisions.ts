import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

export interface Decision {
  id: string;
  room_id: string;
  title: string;
  description: string | null;
  options: string[];
  voting_opens_at: string;
  voting_closes_at: string;
  quorum_count: number | null;
  is_anonymous: boolean;
  status: string;
  result_summary: Record<string, number> | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  votes?: Vote[];
  room?: {
    name: string;
  };
}

export interface Vote {
  id: string;
  decision_id: string;
  user_id: string;
  vote_option: string;
  created_at: string;
  voter?: {
    first_name: string | null;
    last_name: string | null;
  };
}

export interface DecisionAuditLog {
  id: string;
  decision_id: string;
  action: string;
  actor_id: string | null;
  details: Record<string, unknown> | null;
  created_at: string;
}

export const useDecisions = (roomId?: string | null) => {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDecisions = useCallback(async () => {
    try {
      setLoading(true);
      let query = supabase
        .from("decisions")
        .select(`
          *,
          room:chat_rooms(name),
          votes(*)
        `)
        .order("created_at", { ascending: false });

      if (roomId) {
        query = query.eq("room_id", roomId);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Parse options from Json to string[]
      const parsedDecisions = (data || []).map(d => ({
        ...d,
        options: Array.isArray(d.options) ? d.options as string[] : ["Yes", "No", "Abstain"],
        result_summary: d.result_summary as Record<string, number> | null,
      }));

      setDecisions(parsedDecisions);
    } catch (err) {
      console.error("Error fetching decisions:", err);
    } finally {
      setLoading(false);
    }
  }, [roomId]);

  useEffect(() => {
    fetchDecisions();

    // Subscribe to decision changes
    const channel = supabase
      .channel("decisions-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "decisions",
        },
        () => {
          fetchDecisions();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "votes",
        },
        () => {
          fetchDecisions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchDecisions]);

  const createDecision = async (
    decision: Omit<Decision, "id" | "created_at" | "updated_at" | "status" | "result_summary" | "votes" | "room">
  ) => {
    const { data, error } = await supabase
      .from("decisions")
      .insert({
        ...decision,
        options: decision.options as unknown as Json,
        status: "open",
      })
      .select()
      .single();

    if (error) throw error;

    // Log audit
    await supabase.from("decision_audit_logs").insert({
      decision_id: data.id,
      action: "created",
      actor_id: decision.created_by,
      details: { title: decision.title } as unknown as Json,
    });

    return data;
  };

  const castVote = async (decisionId: string, userId: string, voteOption: string) => {
    const { data, error } = await supabase
      .from("votes")
      .insert({
        decision_id: decisionId,
        user_id: userId,
        vote_option: voteOption,
      })
      .select()
      .single();

    if (error) throw error;

    // Log audit
    await supabase.from("decision_audit_logs").insert({
      decision_id: decisionId,
      action: "voted",
      actor_id: userId,
      details: { vote_option: voteOption } as unknown as Json,
    });

    return data;
  };

  const closeDecision = async (decisionId: string, userId: string) => {
    // Calculate results
    const { data: votes } = await supabase
      .from("votes")
      .select("vote_option")
      .eq("decision_id", decisionId);

    const resultSummary = (votes || []).reduce((acc, vote) => {
      acc[vote.vote_option] = (acc[vote.vote_option] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const { error } = await supabase
      .from("decisions")
      .update({
        status: "closed",
        result_summary: resultSummary as unknown as Json,
      })
      .eq("id", decisionId);

    if (error) throw error;

    // Log audit
    await supabase.from("decision_audit_logs").insert({
      decision_id: decisionId,
      action: "closed",
      actor_id: userId,
      details: { result_summary: resultSummary } as unknown as Json,
    });
  };

  const cancelDecision = async (decisionId: string, userId: string, reason?: string) => {
    const { error } = await supabase
      .from("decisions")
      .update({ status: "cancelled" })
      .eq("id", decisionId);

    if (error) throw error;

    // Log audit
    await supabase.from("decision_audit_logs").insert({
      decision_id: decisionId,
      action: "cancelled",
      actor_id: userId,
      details: { reason } as unknown as Json,
    });
  };

  return {
    decisions,
    loading,
    fetchDecisions,
    createDecision,
    castVote,
    closeDecision,
    cancelDecision,
  };
};

export const useDecisionAuditLogs = (decisionId: string | null) => {
  const [logs, setLogs] = useState<DecisionAuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!decisionId) {
      setLogs([]);
      setLoading(false);
      return;
    }

    const fetchLogs = async () => {
      try {
        const { data, error } = await supabase
          .from("decision_audit_logs")
          .select("*")
          .eq("decision_id", decisionId)
          .order("created_at", { ascending: false });

        if (error) throw error;
        
        const typedLogs = (data || []).map(log => ({
          ...log,
          details: log.details as Record<string, unknown> | null,
        }));
        
        setLogs(typedLogs);
      } catch (err) {
        console.error("Error fetching audit logs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [decisionId]);

  return { logs, loading };
};
