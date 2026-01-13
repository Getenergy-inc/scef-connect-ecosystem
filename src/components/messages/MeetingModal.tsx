import { useState } from "react";
import { Video, ExternalLink, Copy, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocale } from "@/contexts/LocaleContext";
import { toast } from "sonner";

interface MeetingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roomName: string;
  externalMeetingLink?: string | null;
  onStartJitsi: (roomName: string) => void;
  onSaveExternalLink?: (link: string) => void;
  isAdmin?: boolean;
}

export const MeetingModal = ({
  open,
  onOpenChange,
  roomName,
  externalMeetingLink,
  onStartJitsi,
  onSaveExternalLink,
  isAdmin,
}: MeetingModalProps) => {
  const { t } = useLocale();
  const [externalLink, setExternalLink] = useState(externalMeetingLink || "");
  const [copied, setCopied] = useState(false);

  const jitsiRoomName = `scef-${roomName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Date.now()}`;
  const jitsiUrl = `https://meet.jit.si/${jitsiRoomName}`;

  const handleStartJitsi = () => {
    onStartJitsi(jitsiRoomName);
    window.open(jitsiUrl, "_blank");
    onOpenChange(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(jitsiUrl);
    setCopied(true);
    toast.success(t("messages.linkCopied") || "Link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveExternalLink = () => {
    if (onSaveExternalLink && externalLink) {
      onSaveExternalLink(externalLink);
      toast.success(t("messages.externalLinkSaved") || "External link saved!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            {t("messages.startMeeting") || "Start a Meeting"}
          </DialogTitle>
          <DialogDescription>
            {t("messages.meetingDesc") || "Choose how you want to meet with your team."}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="instant" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="instant">
              {t("messages.instantCall") || "Instant Call"}
            </TabsTrigger>
            <TabsTrigger value="external">
              {t("messages.externalLink") || "External Link"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="instant" className="space-y-4 mt-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">
                {t("messages.jitsiMeet") || "Jitsi Meet (Free & Secure)"}
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                {t("messages.jitsiDesc") || "Start an instant video call with no login required. Share the link with participants."}
              </p>
              
              <div className="flex items-center gap-2">
                <Input value={jitsiUrl} readOnly className="text-xs" />
                <Button variant="outline" size="icon" onClick={handleCopyLink}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button onClick={handleStartJitsi} className="w-full">
              <Video className="h-4 w-4 mr-2" />
              {t("messages.startCall") || "Start Video Call"}
            </Button>
          </TabsContent>

          <TabsContent value="external" className="space-y-4 mt-4">
            {externalMeetingLink ? (
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">
                  {t("messages.scheduledMeeting") || "Scheduled Meeting"}
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  {t("messages.joinScheduled") || "Join the scheduled meeting using the link below."}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open(externalMeetingLink, "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t("messages.joinMeeting") || "Join Meeting"}
                </Button>
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                <p className="text-sm">
                  {t("messages.noExternalLink") || "No external meeting link has been set."}
                </p>
              </div>
            )}

            {isAdmin && (
              <div className="space-y-3 pt-4 border-t">
                <Label>
                  {t("messages.setExternalLink") || "Set External Meeting Link"}
                </Label>
                <p className="text-xs text-muted-foreground">
                  {t("messages.externalLinkDesc") || "Add a Zoom, Teams, or Google Meet link for scheduled meetings."}
                </p>
                <div className="flex gap-2">
                  <Input
                    value={externalLink}
                    onChange={(e) => setExternalLink(e.target.value)}
                    placeholder="https://zoom.us/j/..."
                  />
                  <Button onClick={handleSaveExternalLink} disabled={!externalLink}>
                    {t("common.save") || "Save"}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
