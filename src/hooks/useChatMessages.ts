import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ChatMessage {
  id: string;
  room_id: string;
  sender_id: string;
  parent_id: string | null;
  content: string;
  message_type: string;
  file_url: string | null;
  file_name: string | null;
  file_type: string | null;
  file_size: number | null;
  is_pinned: boolean;
  is_edited: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  sender?: {
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  };
  reactions?: MessageReaction[];
  replies?: ChatMessage[];
}

export interface MessageReaction {
  id: string;
  message_id: string;
  user_id: string;
  emoji: string;
  created_at: string;
}

export const useChatMessages = (roomId: string | null) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const fetchMessages = useCallback(async (offset = 0, limit = 50) => {
    if (!roomId) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("room_id", roomId)
        .is("parent_id", null)
        .eq("is_deleted", false)
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      // Fetch sender profiles separately
      const senderIds = [...new Set((data || []).map(m => m.sender_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, first_name, last_name, avatar_url")
        .in("user_id", senderIds);

      const profileMap = (profiles || []).reduce((acc, p) => {
        acc[p.user_id] = p;
        return acc;
      }, {} as Record<string, typeof profiles[0]>);

      const messagesWithSenders = (data || []).map(m => ({
        ...m,
        sender: profileMap[m.sender_id] || null,
      })) as ChatMessage[];

      const newMessages = messagesWithSenders.reverse();
      
      if (offset === 0) {
        setMessages(newMessages);
      } else {
        setMessages(prev => [...newMessages, ...prev]);
      }
      
      setHasMore((data || []).length === limit);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  }, [roomId]);

  useEffect(() => {
    if (!roomId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel(`room-${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `room_id=eq.${roomId}`,
        },
        async (payload) => {
          // Fetch the full message with sender info
          const { data: msg } = await supabase
            .from("chat_messages")
            .select("*")
            .eq("id", payload.new.id)
            .single();

          if (msg) {
            const { data: profile } = await supabase
              .from("profiles")
              .select("user_id, first_name, last_name, avatar_url")
              .eq("user_id", msg.sender_id)
              .single();

            const messageWithSender = { ...msg, sender: profile } as ChatMessage;
            setMessages(prev => [...prev, messageWithSender]);
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "chat_messages",
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          setMessages(prev =>
            prev.map(msg =>
              msg.id === payload.new.id ? { ...msg, ...payload.new } : msg
            )
          );
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "chat_messages",
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          setMessages(prev =>
            prev.filter(msg => msg.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, fetchMessages]);

  const sendMessage = async (content: string, senderId: string, parentId?: string) => {
    if (!roomId) return;

    const { data, error } = await supabase
      .from("chat_messages")
      .insert({
        room_id: roomId,
        sender_id: senderId,
        content,
        parent_id: parentId || null,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const editMessage = async (messageId: string, newContent: string) => {
    const { error } = await supabase
      .from("chat_messages")
      .update({ content: newContent, is_edited: true })
      .eq("id", messageId);

    if (error) throw error;
  };

  const deleteMessage = async (messageId: string) => {
    const { error } = await supabase
      .from("chat_messages")
      .update({ is_deleted: true })
      .eq("id", messageId);

    if (error) throw error;
  };

  const pinMessage = async (messageId: string, pinned: boolean) => {
    const { error } = await supabase
      .from("chat_messages")
      .update({ is_pinned: pinned })
      .eq("id", messageId);

    if (error) throw error;
  };

  const addReaction = async (messageId: string, userId: string, emoji: string) => {
    const { error } = await supabase
      .from("message_reactions")
      .insert({ message_id: messageId, user_id: userId, emoji });

    if (error && error.code !== "23505") throw error; // Ignore duplicate
  };

  const removeReaction = async (messageId: string, userId: string, emoji: string) => {
    const { error } = await supabase
      .from("message_reactions")
      .delete()
      .eq("message_id", messageId)
      .eq("user_id", userId)
      .eq("emoji", emoji);

    if (error) throw error;
  };

  return {
    messages,
    loading,
    hasMore,
    fetchMessages,
    sendMessage,
    editMessage,
    deleteMessage,
    pinMessage,
    addReaction,
    removeReaction,
  };
};
