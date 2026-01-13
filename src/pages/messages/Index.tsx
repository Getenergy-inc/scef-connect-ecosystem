import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MessageSquare, Plus, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { RoomList } from "@/components/messages/RoomList";
import { useChatRooms } from "@/hooks/useChatRooms";
import { useLocale } from "@/contexts/LocaleContext";
import { supabase } from "@/integrations/supabase/client";

const MessagesIndex = () => {
  const { t } = useLocale();
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
        <title>{t("messages.title") || "Messages"} - SCEF</title>
      </Helmet>
      
      <DashboardLayout role="member" title={t("messages.title") || "Messages"}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">{t("messages.title") || "Messages"}</h1>
                <p className="text-sm text-muted-foreground">
                  {t("messages.subtitle") || "Connect with your teams and chapters"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate("/decisions")}>
                <Vote className="h-4 w-4 mr-2" />
                {t("messages.decisions") || "Decisions"}
              </Button>
            </div>
          </div>

          {/* Room List */}
          <div className="bg-card border rounded-lg h-[calc(100vh-280px)] overflow-hidden">
            <RoomList 
              rooms={rooms} 
              onSelectRoom={(roomId) => navigate(`/messages/${roomId}`)}
            />
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default MessagesIndex;
