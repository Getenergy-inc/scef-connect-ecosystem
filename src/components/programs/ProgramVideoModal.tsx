import { X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ProgramVideoModalProps {
  videoUrl: string;
  videoType: "local" | "youtube";
  programName: string;
  thumbnailUrl?: string;
}

export const ProgramVideoModal = ({ 
  videoUrl, 
  videoType, 
  programName,
  thumbnailUrl 
}: ProgramVideoModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => setIsOpen(true)}
        className="gap-2"
      >
        <Play className="w-4 h-4" />
        Watch Video
      </Button>

      {/* Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Video Title */}
            <h3 className="text-white font-semibold text-lg mb-4">
              {programName}
            </h3>

            {/* Video Container */}
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              {videoType === "youtube" ? (
                <iframe
                  src={`${videoUrl}?autoplay=1`}
                  title={programName}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Thumbnail variant with play button overlay
export const ProgramVideoThumbnail = ({ 
  videoUrl, 
  videoType, 
  programName,
  thumbnailUrl 
}: ProgramVideoModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Thumbnail with Play Button */}
      <div 
        className="relative aspect-video bg-muted rounded-xl overflow-hidden cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
        {thumbnailUrl ? (
          <img 
            src={thumbnailUrl} 
            alt={programName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <Play className="w-12 h-12 text-primary/40" />
          </div>
        )}
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 text-primary ml-1" />
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <h3 className="text-white font-semibold text-lg mb-4">
              {programName}
            </h3>

            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              {videoType === "youtube" ? (
                <iframe
                  src={`${videoUrl}?autoplay=1`}
                  title={programName}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
