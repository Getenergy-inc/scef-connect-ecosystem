import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { 
  Send, Paperclip, Smile, MoreVertical, Pin, Edit2, Trash2, 
  Reply, Video, Phone, Users, Settings, ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/hooks/useChatMessages";
import type { ChatRoom as ChatRoomType } from "@/hooks/useChatRooms";
import { useLocale } from "@/contexts/LocaleContext";

interface ChatRoomProps {
  room: ChatRoomType;
  messages: ChatMessage[];
  currentUserId: string;
  onSendMessage: (content: string, parentId?: string) => Promise<void>;
  onEditMessage: (messageId: string, content: string) => Promise<void>;
  onDeleteMessage: (messageId: string) => Promise<void>;
  onPinMessage: (messageId: string, pinned: boolean) => Promise<void>;
  onReaction: (messageId: string, emoji: string) => Promise<void>;
  onStartMeeting: () => void;
  onBack?: () => void;
  loading?: boolean;
}

const QUICK_REACTIONS = ["👍", "❤️", "😊", "🎉", "👀", "🙏"];

export const ChatRoom = ({
  room,
  messages,
  currentUserId,
  onSendMessage,
  onEditMessage,
  onDeleteMessage,
  onPinMessage,
  onReaction,
  onStartMeeting,
  onBack,
  loading,
}: ChatRoomProps) => {
  const { t, isRTL } = useLocale();
  const [newMessage, setNewMessage] = useState("");
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim() || sending) return;

    try {
      setSending(true);
      await onSendMessage(newMessage.trim(), replyingTo?.id);
      setNewMessage("");
      setReplyingTo(null);
      inputRef.current?.focus();
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setSending(false);
    }
  };

  const handleEdit = async (messageId: string) => {
    if (!editContent.trim()) return;
    
    try {
      await onEditMessage(messageId, editContent.trim());
      setEditingMessageId(null);
      setEditContent("");
    } catch (err) {
      console.error("Failed to edit message:", err);
    }
  };

  const getInitials = (firstName?: string | null, lastName?: string | null) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase() || "?";
  };

  const getSenderName = (msg: ChatMessage) => {
    return `${msg.sender?.first_name || ""} ${msg.sender?.last_name || ""}`.trim() || "Unknown";
  };

  const pinnedMessages = messages.filter(m => m.is_pinned);

  return (
    <div className={cn("flex flex-col h-full", isRTL && "rtl")}>
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b bg-background">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold truncate">{room.name}</h2>
          <p className="text-xs text-muted-foreground truncate">{room.description}</p>
        </div>
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onStartMeeting}>
                <Video className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t("messages.startMeeting") || "Start Meeting"}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Users className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t("messages.members") || "Members"}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t("messages.settings") || "Settings"}</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Pinned Messages */}
      {pinnedMessages.length > 0 && (
        <div className="p-2 bg-amber-50 dark:bg-amber-950/20 border-b">
          <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
            <Pin className="h-3 w-3" />
            <span className="font-medium">
              {pinnedMessages.length} {t("messages.pinnedMessages") || "pinned message(s)"}
            </span>
          </div>
        </div>
      )}

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => {
            const isOwn = message.sender_id === currentUserId;
            const showAvatar = index === 0 || 
              messages[index - 1]?.sender_id !== message.sender_id ||
              new Date(message.created_at).getTime() - new Date(messages[index - 1]?.created_at).getTime() > 300000;

            return (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 group",
                  isOwn && "flex-row-reverse"
                )}
              >
                {showAvatar ? (
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src={message.sender?.avatar_url || undefined} />
                    <AvatarFallback className="text-xs">
                      {getInitials(message.sender?.first_name, message.sender?.last_name)}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="w-8 shrink-0" />
                )}

                <div className={cn("flex flex-col max-w-[70%]", isOwn && "items-end")}>
                  {showAvatar && (
                    <div className={cn("flex items-center gap-2 mb-1", isOwn && "flex-row-reverse")}>
                      <span className="text-sm font-medium">{getSenderName(message)}</span>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(message.created_at), "HH:mm")}
                      </span>
                      {message.is_edited && (
                        <span className="text-xs text-muted-foreground">(edited)</span>
                      )}
                    </div>
                  )}

                  {editingMessageId === message.id ? (
                    <div className="flex gap-2 w-full">
                      <Input
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleEdit(message.id)}
                        autoFocus
                      />
                      <Button size="sm" onClick={() => handleEdit(message.id)}>
                        {t("common.save") || "Save"}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditingMessageId(null)}>
                        {t("common.cancel") || "Cancel"}
                      </Button>
                    </div>
                  ) : (
                    <div className={cn(
                      "relative rounded-2xl px-4 py-2",
                      isOwn 
                        ? "bg-primary text-primary-foreground rounded-br-md" 
                        : "bg-muted rounded-bl-md",
                      message.is_pinned && "ring-2 ring-amber-400"
                    )}>
                      {message.file_url && (
                        <div className="mb-2">
                          <a 
                            href={message.file_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm underline"
                          >
                            <Paperclip className="h-3 w-3" />
                            {message.file_name || "Attachment"}
                          </a>
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>

                      {/* Message actions */}
                      <div className={cn(
                        "absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity",
                        "flex items-center gap-0.5 bg-background border rounded-lg shadow-sm p-0.5",
                        isOwn ? "-left-2 -translate-x-full" : "-right-2 translate-x-full"
                      )}>
                        {QUICK_REACTIONS.slice(0, 3).map((emoji) => (
                          <Button
                            key={emoji}
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => onReaction(message.id, emoji)}
                          >
                            {emoji}
                          </Button>
                        ))}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreVertical className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => setReplyingTo(message)}>
                              <Reply className="h-4 w-4 mr-2" />
                              {t("messages.reply") || "Reply"}
                            </DropdownMenuItem>
                            {isOwn && (
                              <DropdownMenuItem onClick={() => {
                                setEditingMessageId(message.id);
                                setEditContent(message.content);
                              }}>
                                <Edit2 className="h-4 w-4 mr-2" />
                                {t("messages.edit") || "Edit"}
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => onPinMessage(message.id, !message.is_pinned)}>
                              <Pin className="h-4 w-4 mr-2" />
                              {message.is_pinned 
                                ? (t("messages.unpin") || "Unpin") 
                                : (t("messages.pin") || "Pin")}
                            </DropdownMenuItem>
                            {isOwn && (
                              <DropdownMenuItem 
                                className="text-destructive"
                                onClick={() => onDeleteMessage(message.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                {t("messages.delete") || "Delete"}
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  )}

                  {/* Reactions */}
                  {message.reactions && message.reactions.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {Object.entries(
                        message.reactions.reduce((acc, r) => {
                          acc[r.emoji] = (acc[r.emoji] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>)
                      ).map(([emoji, count]) => (
                        <Badge
                          key={emoji}
                          variant="secondary"
                          className="text-xs cursor-pointer hover:bg-accent"
                          onClick={() => onReaction(message.id, emoji)}
                        >
                          {emoji} {count}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Reply Preview */}
      {replyingTo && (
        <div className="px-4 py-2 bg-muted/50 border-t flex items-center gap-2">
          <Reply className="h-4 w-4 text-muted-foreground" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">
              {t("messages.replyingTo") || "Replying to"} {getSenderName(replyingTo)}
            </p>
            <p className="text-sm truncate">{replyingTo.content}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setReplyingTo(null)}>
            ✕
          </Button>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t bg-background">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            ref={inputRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder={t("messages.typeMessage") || "Type a message..."}
            className="flex-1"
            disabled={loading || sending}
          />
          <Button variant="ghost" size="icon">
            <Smile className="h-5 w-5" />
          </Button>
          <Button 
            size="icon" 
            onClick={handleSend} 
            disabled={!newMessage.trim() || sending}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
