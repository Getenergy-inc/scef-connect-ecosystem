import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { RoomList } from "@/components/messages/RoomList";
import { ChatRoom } from "@/components/messages/ChatRoom";
import { MeetingModal } from "@/components/messages/MeetingModal";
import { useChatRooms, type ChatRoom as ChatRoomType } from "@/hooks/useChatRooms";
import { useChatMessages } from "@/hooks/useChatMessages";
import { useLocale } from "@/contexts/LocaleContext";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const MessagesRoom = () => {
  const { t } = useLocale();
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

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

  const { rooms, loading: roomsLoading } = useChatRooms(userId);
  const { 
    messages, 
    loading: messagesLoading, 
    sendMessage, 
    editMessage, 
    deleteMessage, 
    pinMessage,
    addReaction 
  } = useChatMessages(roomId || null);

  const currentRoom = rooms.find(r => r.id === roomId);

  const handleSendMessage = async (content: string, parentId?: string) => {
    if (!userId) return;
    await sendMessage(content, userId, parentId);
  };

  const handleReaction = async (messageId: string, emoji: string) => {
    if (!userId) return;
    await addReaction(messageId, userId, emoji);
  };

  const handleStartJitsi = async (jitsiRoomName: string) => {
    if (!roomId || !userId) return;
    
    // Create a meeting record
    await supabase.from("meetings").insert({
      room_id: roomId,
      title: `${currentRoom?.name} Meeting`,
      meeting_type: "instant",
      jitsi_room_name: jitsiRoomName,
      created_by: userId,
    });
  };

  const handleSaveExternalLink = async (link: string) => {
    if (!roomId) return;
    
    await supabase
      .from("chat_rooms")
      .update({ external_meeting_link: link })
      .eq("id", roomId);
  };

  if (loading || roomsLoading) {
    return (
      <DashboardLayout role="member" title={t("messages.title") || "Messages"}>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-pulse text-primary">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <Helmet>
        <title>{currentRoom?.name || t("messages.title") || "Messages"} - SCEF</title>
      </Helmet>
      
      <DashboardLayout role="member" title={t("messages.title") || "Messages"}>
        <div className="flex h-[calc(100vh-180px)] bg-card border rounded-lg overflow-hidden">
          {/* Sidebar - Room List */}
          <div className={cn(
            "w-80 border-r flex-shrink-0 transition-all",
            "hidden md:block",
            !showSidebar && "md:hidden"
          )}>
            <RoomList 
              rooms={rooms} 
              activeRoomId={roomId}
              onSelectRoom={(id) => navigate(`/messages/${id}`)}
            />
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {currentRoom ? (
              <ChatRoom
                room={currentRoom}
                messages={messages}
                currentUserId={userId || ""}
                onSendMessage={handleSendMessage}
                onEditMessage={editMessage}
                onDeleteMessage={deleteMessage}
                onPinMessage={pinMessage}
                onReaction={handleReaction}
                onStartMeeting={() => setShowMeetingModal(true)}
                onBack={() => navigate("/messages")}
                loading={messagesLoading}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <p className="text-lg font-medium">
                    {t("messages.selectRoom") || "Select a room to start messaging"}
                  </p>
                  <p className="text-sm mt-1">
                    {t("messages.selectRoomDesc") || "Choose a room from the sidebar to view messages"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Meeting Modal */}
        {currentRoom && (
          <MeetingModal
            open={showMeetingModal}
            onOpenChange={setShowMeetingModal}
            roomName={currentRoom.name}
            externalMeetingLink={currentRoom.external_meeting_link}
            onStartJitsi={handleStartJitsi}
            onSaveExternalLink={handleSaveExternalLink}
            isAdmin={true} // TODO: Check actual admin status
          />
        )}
      </DashboardLayout>
    </>
  );
};

export default MessagesRoom;
