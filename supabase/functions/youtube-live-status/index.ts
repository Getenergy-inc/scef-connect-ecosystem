import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { channelId } = await req.json();
    const YOUTUBE_API_KEY = Deno.env.get('YOUTUBE_API_KEY');

    // If no API key, return a simulated status based on time
    // This allows the UI to work without requiring the API key immediately
    if (!YOUTUBE_API_KEY) {
      console.log("No YouTube API key configured, using simulated status");
      
      // Simulate occasional live status for demo purposes
      // In production, you would remove this and require the API key
      const now = new Date();
      const hour = now.getUTCHours();
      
      // Simulate being live during certain hours (e.g., 12-14 UTC for demo)
      const simulatedLive = hour >= 12 && hour < 14;
      
      return new Response(
        JSON.stringify({
          isLive: simulatedLive,
          viewerCount: simulatedLive ? Math.floor(Math.random() * 500) + 50 : 0,
          streamTitle: simulatedLive ? "NESA Africa TV Live Broadcast" : null,
          simulated: true,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Search for live broadcasts from the channel
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${YOUTUBE_API_KEY}`;
    
    console.log(`Checking live status for channel: ${channelId}`);
    
    const response = await fetch(searchUrl);
    const data = await response.json();

    if (data.error) {
      console.error("YouTube API error:", data.error);
      return new Response(
        JSON.stringify({ isLive: false, error: data.error.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const isLive = data.items && data.items.length > 0;
    let viewerCount = 0;
    let streamTitle = null;

    if (isLive && data.items[0]) {
      streamTitle = data.items[0].snippet.title;
      
      // Get video statistics for viewer count
      const videoId = data.items[0].id.videoId;
      const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`;
      
      const statsResponse = await fetch(statsUrl);
      const statsData = await statsResponse.json();
      
      if (statsData.items && statsData.items[0]?.liveStreamingDetails) {
        viewerCount = parseInt(statsData.items[0].liveStreamingDetails.concurrentViewers || "0");
      }
    }

    console.log(`Live status: ${isLive}, viewers: ${viewerCount}`);

    return new Response(
      JSON.stringify({
        isLive,
        viewerCount,
        streamTitle,
        simulated: false,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error checking live status:", errorMessage);
    return new Response(
      JSON.stringify({ isLive: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
