import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface LiveStreamStatus {
  isLive: boolean;
  loading: boolean;
  error: string | null;
  viewerCount?: number;
  streamTitle?: string;
}

export const useLiveStreamStatus = (channelId: string = "Nesa.africaTV") => {
  const [status, setStatus] = useState<LiveStreamStatus>({
    isLive: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const checkLiveStatus = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("youtube-live-status", {
          body: { channelId },
        });

        if (error) {
          console.warn("Could not check live status:", error.message);
          setStatus({ isLive: false, loading: false, error: error.message });
          return;
        }

        setStatus({
          isLive: data?.isLive || false,
          loading: false,
          error: null,
          viewerCount: data?.viewerCount,
          streamTitle: data?.streamTitle,
        });
      } catch (err) {
        console.warn("Live status check failed:", err);
        setStatus({ isLive: false, loading: false, error: "Failed to check" });
      }
    };

    checkLiveStatus();

    // Check every 2 minutes
    const interval = setInterval(checkLiveStatus, 120000);
    return () => clearInterval(interval);
  }, [channelId]);

  return status;
};
