import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  MessageSquare, Send, Plus, Inbox, Bell, 
  Users, Calendar, Clock, CheckCircle, AlertCircle
} from "lucide-react";

interface Thread {
  id: string;
  subject: string;
  last_message_at: string;
  is_read: boolean;
  chapter_id: string;
}

interface Message {
  id: string;
  content: string;
  sender_type: string;
  created_at: string;
}

const ChapterInbox = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [isNewThreadOpen, setIsNewThreadOpen] = useState(false);
  const [newThreadSubject, setNewThreadSubject] = useState("");
  const [newThreadMessage, setNewThreadMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/auth?redirect=/chapter/inbox");
      } else {
        setUser(session.user);
        fetchProfile(session.user.id);
      }
    });
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data } = await supabase
        .from("profiles")
        .select("*, chapters(id, name, country)")
        .eq("user_id", userId)
        .maybeSingle();
      
      setProfile(data);
      if (data?.chapter_id) {
        fetchThreads(userId);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchThreads = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("chapter_inbox_threads")
        .select("*")
        .eq("user_id", userId)
        .order("last_message_at", { ascending: false });

      if (error) throw error;
      setThreads(data || []);
    } catch (error) {
      console.error("Error fetching threads:", error);
    }
  };

  const fetchMessages = async (threadId: string) => {
    try {
      const { data, error } = await supabase
        .from("chapter_inbox_messages")
        .select("*")
        .eq("thread_id", threadId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setMessages(data || []);

      // Mark thread as read
      await supabase
        .from("chapter_inbox_threads")
        .update({ is_read: true })
        .eq("id", threadId);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSelectThread = (thread: Thread) => {
    setSelectedThread(thread);
    fetchMessages(thread.id);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedThread) return;

    setSending(true);
    try {
      const { error } = await supabase.from("chapter_inbox_messages").insert({
        thread_id: selectedThread.id,
        sender_type: "user",
        sender_id: user.id,
        content: newMessage,
      });

      if (error) throw error;

      // Update thread last_message_at
      await supabase
        .from("chapter_inbox_threads")
        .update({ last_message_at: new Date().toISOString() })
        .eq("id", selectedThread.id);

      setNewMessage("");
      fetchMessages(selectedThread.id);
      fetchThreads(user.id);
      toast.success("Message sent");
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const handleCreateThread = async () => {
    if (!newThreadSubject.trim() || !newThreadMessage.trim() || !profile?.chapter_id) return;

    setSending(true);
    try {
      // Create thread
      const { data: thread, error: threadError } = await supabase
        .from("chapter_inbox_threads")
        .insert({
          chapter_id: profile.chapter_id,
          user_id: user.id,
          subject: newThreadSubject,
        })
        .select()
        .single();

      if (threadError) throw threadError;

      // Create first message
      const { error: messageError } = await supabase
        .from("chapter_inbox_messages")
        .insert({
          thread_id: thread.id,
          sender_type: "user",
          sender_id: user.id,
          content: newThreadMessage,
        });

      if (messageError) throw messageError;

      setNewThreadSubject("");
      setNewThreadMessage("");
      setIsNewThreadOpen(false);
      fetchThreads(user.id);
      toast.success("Message sent to your chapter");
    } catch (error) {
      toast.error("Failed to create thread");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  const unreadCount = threads.filter(t => !t.is_read).length;

  return (
    <>
      <Helmet>
        <title>Chapter Inbox | SCEF Dashboard</title>
        <meta name="description" content="Communicate with your local SCEF chapter" />
      </Helmet>

      <DashboardLayout role="member" title="Chapter Inbox">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Chapter Inbox</h1>
              <p className="text-muted-foreground">
                {profile?.chapters ? (
                  <>Communicate with {profile.chapters.name}</>
                ) : (
                  "Join a chapter to access your inbox"
                )}
              </p>
            </div>
            {profile?.chapter_id && (
              <Dialog open={isNewThreadOpen} onOpenChange={setIsNewThreadOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Message
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Send Message to Chapter</DialogTitle>
                    <DialogDescription>
                      Your message will be sent to the chapter administrators
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject</label>
                      <Input
                        placeholder="e.g., Question about membership"
                        value={newThreadSubject}
                        onChange={(e) => setNewThreadSubject(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message</label>
                      <Textarea
                        placeholder="Type your message..."
                        value={newThreadMessage}
                        onChange={(e) => setNewThreadMessage(e.target.value)}
                        rows={5}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsNewThreadOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleCreateThread}
                      disabled={sending || !newThreadSubject.trim() || !newThreadMessage.trim()}
                    >
                      {sending ? "Sending..." : "Send Message"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {!profile?.chapter_id ? (
            /* No Chapter Assigned */
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Users className="w-16 h-16 text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Chapter Assigned</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  Join a local chapter to access your inbox and connect with your community.
                </p>
                <Button asChild>
                  <a href="/chapters/join-online">Join a Chapter</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            /* Inbox Interface */
            <Tabs defaultValue="messages" className="space-y-4">
              <TabsList>
                <TabsTrigger value="messages" className="gap-2">
                  <Inbox className="w-4 h-4" />
                  Messages
                  {unreadCount > 0 && (
                    <Badge variant="destructive" className="text-xs px-1.5 py-0">
                      {unreadCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="announcements" className="gap-2">
                  <Bell className="w-4 h-4" />
                  Announcements
                </TabsTrigger>
                <TabsTrigger value="events" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  Events
                </TabsTrigger>
              </TabsList>

              <TabsContent value="messages" className="space-y-4">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Thread List */}
                  <Card className="lg:col-span-1">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium">Conversations</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      {threads.length === 0 ? (
                        <div className="p-6 text-center text-muted-foreground">
                          <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-30" />
                          <p className="text-sm">No conversations yet</p>
                        </div>
                      ) : (
                        <div className="divide-y divide-border">
                          {threads.map((thread) => (
                            <button
                              key={thread.id}
                              onClick={() => handleSelectThread(thread)}
                              className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                                selectedThread?.id === thread.id ? "bg-muted" : ""
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                  thread.is_read ? "bg-transparent" : "bg-primary"
                                }`} />
                                <div className="flex-1 min-w-0">
                                  <p className={`text-sm truncate ${
                                    thread.is_read ? "font-normal" : "font-semibold"
                                  }`}>
                                    {thread.subject}
                                  </p>
                                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                    <Clock className="w-3 h-3" />
                                    {new Date(thread.last_message_at).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Message View */}
                  <Card className="lg:col-span-2">
                    {selectedThread ? (
                      <>
                        <CardHeader className="border-b">
                          <CardTitle className="text-base">{selectedThread.subject}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                          {/* Messages */}
                          <div className="h-80 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg) => (
                              <div
                                key={msg.id}
                                className={`flex ${msg.sender_type === "user" ? "justify-end" : "justify-start"}`}
                              >
                                <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                  msg.sender_type === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : msg.sender_type === "system"
                                    ? "bg-muted text-muted-foreground text-center italic"
                                    : "bg-muted text-foreground"
                                }`}>
                                  <p className="text-sm">{msg.content}</p>
                                  <p className="text-xs opacity-70 mt-1">
                                    {new Date(msg.created_at).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          {/* Reply Input */}
                          <div className="p-4 border-t">
                            <div className="flex gap-2">
                              <Input
                                placeholder="Type your reply..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                              />
                              <Button onClick={handleSendMessage} disabled={sending || !newMessage.trim()}>
                                <Send className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </>
                    ) : (
                      <CardContent className="flex flex-col items-center justify-center h-96 text-muted-foreground">
                        <MessageSquare className="w-12 h-12 mb-3 opacity-30" />
                        <p>Select a conversation to view messages</p>
                      </CardContent>
                    )}
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="announcements">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                    <Bell className="w-12 h-12 mb-3 opacity-30" />
                    <p className="font-medium mb-1">No Announcements</p>
                    <p className="text-sm">Chapter announcements will appear here</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="events">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                    <Calendar className="w-12 h-12 mb-3 opacity-30" />
                    <p className="font-medium mb-1">No Upcoming Events</p>
                    <p className="text-sm">Chapter events will appear here</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default ChapterInbox;