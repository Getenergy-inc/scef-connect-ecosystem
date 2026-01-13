import { useState } from "react";
import { Play, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProgramVideoSectionProps {
  programName: string;
  videoUrl?: string;
  videoType?: "youtube" | "local";
  description?: string;
  thumbnailUrl?: string;
}

export const ProgramVideoSection = ({
  programName,
  videoUrl,
  videoType = "youtube",
  description,
  thumbnailUrl
}: ProgramVideoSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Convert YouTube watch URL to embed URL
  const getEmbedUrl = (url: string): string => {
    if (url.includes("/embed/")) return url;
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|live\/))([\w-]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Watch: <span className="text-primary">{programName}</span>
            </h2>
            {description && (
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>

          {/* Video Player */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted border border-border shadow-lg">
            {videoUrl ? (
              isPlaying ? (
                <>
                  {videoType === "youtube" ? (
                    <iframe
                      src={`${getEmbedUrl(videoUrl)}?autoplay=1`}
                      title={programName}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  ) : (
                    <video
                      src={videoUrl}
                      controls
                      autoPlay
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <div
                  className="absolute inset-0 cursor-pointer group"
                  onClick={() => setIsPlaying(true)}
                >
                  {thumbnailUrl ? (
                    <img
                      src={thumbnailUrl}
                      alt={programName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <div className="text-center">
                        <Play className="w-16 h-16 text-primary/40 mx-auto mb-2" />
                        <p className="text-muted-foreground">Click to play</p>
                      </div>
                    </div>
                  )}
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                    <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-primary ml-1" />
                    </div>
                  </div>
                </div>
              )
            ) : (
              // Placeholder when no video URL
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                <div className="w-20 h-20 rounded-full bg-muted-foreground/10 flex items-center justify-center mb-4">
                  <Play className="w-10 h-10 text-muted-foreground/40" />
                </div>
                <p className="text-muted-foreground font-medium mb-1">Video Coming Soon</p>
                <p className="text-sm text-muted-foreground/70">
                  We're preparing content for {programName}
                </p>
              </div>
            )}
          </div>

          {/* View More Button */}
          <div className="text-center mt-6">
            <Button variant="outline" asChild>
              <Link to="/media">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Media Hub
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
