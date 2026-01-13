import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ChatRoom {
  id: string;
  name: string;
  description: string | null;
  room_type: "staff_management" | "division" | "inter_division" | "program" | "governance" | "lcp_council" | "chapter";
  division_slug: string | null;
  program_slug: string | null;
  governance_type: string | null;
  chapter_id: string | null;
  icon: string | null;
  is_active: boolean;
  external_meeting_link: string | null;
  created_at: string;
  updated_at: string;
  unread_count?: number;
  last_message?: {
    content: string;
    sender_name: string;
    created_at: string;
  };
}

export interface RoomMember {
  id: string;
  room_id: string;
  user_id: string;
  role: string;
  can_vote: boolean;
  joined_at: string;
  profile?: {
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  };
}

export const useChatRooms = (userId: string | null) => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setRooms([]);
      setLoading(false);
      return;
    }

    const fetchRooms = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from("chat_rooms")
          .select("*")
          .eq("is_active", true)
          .order("room_type")
          .order("name");

        if (fetchError) throw fetchError;

        // Type assertion since room_type comes from DB as string but we know it's valid
        const typedRooms = (data || []) as unknown as ChatRoom[];
        setRooms(typedRooms);
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [userId]);

  return { rooms, loading, error };
};

export const useRoomMembers = (roomId: string | null) => {
  const [members, setMembers] = useState<RoomMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) {
      setMembers([]);
      setLoading(false);
      return;
    }

    const fetchMembers = async () => {
      try {
        const { data, error } = await supabase
          .from("room_members")
          .select("*")
          .eq("room_id", roomId);

        if (error) throw error;

        // Fetch profiles separately
        const userIds = (data || []).map(m => m.user_id);
        const { data: profiles } = await supabase
          .from("profiles")
          .select("user_id, first_name, last_name, avatar_url")
          .in("user_id", userIds);

        const profileMap = (profiles || []).reduce((acc, p) => {
          acc[p.user_id] = p;
          return acc;
        }, {} as Record<string, typeof profiles[0]>);

        const membersWithProfiles = (data || []).map(m => ({
          ...m,
          profile: profileMap[m.user_id],
        })) as RoomMember[];

        setMembers(membersWithProfiles);
      } catch (err) {
        console.error("Error fetching room members:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [roomId]);

  return { members, loading };
};

export const joinRoom = async (roomId: string, userId: string) => {
  const { data, error } = await supabase
    .from("room_members")
    .insert({ room_id: roomId, user_id: userId })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const leaveRoom = async (roomId: string, userId: string) => {
  const { error } = await supabase
    .from("room_members")
    .delete()
    .eq("room_id", roomId)
    .eq("user_id", userId);

  if (error) throw error;
};
