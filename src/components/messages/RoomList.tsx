import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Building, Shield, Briefcase, Cpu, Users, Video, MapPin, 
  Network, Award, Heart, Building2, Accessibility, Monitor, 
  BookOpen, BadgeCheck, Crown, Lightbulb, Globe, Search,
  MessageSquare, ChevronRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { ChatRoom } from "@/hooks/useChatRooms";
import { useLocale } from "@/contexts/LocaleContext";

interface RoomListProps {
  rooms: ChatRoom[];
  activeRoomId?: string;
  onSelectRoom?: (roomId: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  building: Building,
  shield: Shield,
  briefcase: Briefcase,
  cpu: Cpu,
  users: Users,
  video: Video,
  "map-pin": MapPin,
  network: Network,
  award: Award,
  heart: Heart,
  "building-2": Building2,
  accessibility: Accessibility,
  monitor: Monitor,
  "book-open": BookOpen,
  "badge-check": BadgeCheck,
  crown: Crown,
  lightbulb: Lightbulb,
  globe: Globe,
};

const roomTypeLabels: Record<string, string> = {
  staff_management: "Staff & Management",
  division: "Divisions",
  inter_division: "Inter-Division",
  program: "Programs",
  governance: "Governance",
  lcp_council: "Leadership",
  chapter: "Chapters",
};

const roomTypeColors: Record<string, string> = {
  staff_management: "bg-primary/10 text-primary",
  division: "bg-blue-500/10 text-blue-600",
  inter_division: "bg-purple-500/10 text-purple-600",
  program: "bg-green-500/10 text-green-600",
  governance: "bg-amber-500/10 text-amber-600",
  lcp_council: "bg-indigo-500/10 text-indigo-600",
  chapter: "bg-teal-500/10 text-teal-600",
};

export const RoomList = ({ rooms, activeRoomId, onSelectRoom }: RoomListProps) => {
  const { t } = useLocale();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group rooms by type
  const groupedRooms = filteredRooms.reduce((acc, room) => {
    const type = room.room_type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(room);
    return acc;
  }, {} as Record<string, ChatRoom[]>);

  const renderIcon = (iconName: string | null) => {
    const Icon = iconName ? iconMap[iconName] : MessageSquare;
    return Icon ? <Icon className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("messages.searchRooms") || "Search rooms..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-4">
          {Object.entries(groupedRooms).map(([type, typeRooms]) => (
            <div key={type}>
              <div className="px-2 py-1.5">
                <Badge variant="secondary" className={cn("text-xs", roomTypeColors[type])}>
                  {roomTypeLabels[type] || type}
                </Badge>
              </div>
              <div className="space-y-0.5">
                {typeRooms.map((room) => (
                  <Link
                    key={room.id}
                    to={`/messages/${room.id}`}
                    onClick={() => onSelectRoom?.(room.id)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                      "hover:bg-accent/50",
                      activeRoomId === room.id && "bg-accent"
                    )}
                  >
                    <div className={cn(
                      "flex items-center justify-center h-10 w-10 rounded-lg",
                      roomTypeColors[room.room_type]
                    )}>
                      {renderIcon(room.icon)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{room.name}</p>
                      {room.last_message && (
                        <p className="text-xs text-muted-foreground truncate">
                          {room.last_message.sender_name}: {room.last_message.content}
                        </p>
                      )}
                    </div>
                    {room.unread_count && room.unread_count > 0 && (
                      <Badge variant="default" className="h-5 min-w-5 flex items-center justify-center">
                        {room.unread_count}
                      </Badge>
                    )}
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {filteredRooms.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>{t("messages.noRoomsFound") || "No rooms found"}</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
