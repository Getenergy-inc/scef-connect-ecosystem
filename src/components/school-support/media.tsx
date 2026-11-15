import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import { ILLUSTRATIVE_VIDEO_CAPTION } from "@/config/schoolSupport";

/** Click-to-load YouTube (privacy-enhanced). Nothing is fetched from YouTube until the visitor presses play. */
export const ClickToLoadVideo = ({ id, title, illustrative }: { id: string | null | undefined; title: string; illustrative?: boolean }) => {
  const [on, setOn] = useState(false);
  if (!id) return null;
  return (
    <figure>
      <div className="relative aspect-video overflow-hidden rounded-[20px] bg-eduaid-deep">
        {on ? (
          <iframe className="absolute inset-0 h-full w-full" src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title}
            loading="lazy" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen />
        ) : (
          <button type="button" onClick={() => setOn(true)} className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-eduaid-cream">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-eduaid-tan text-eduaid-ink"><Play className="h-7 w-7" aria-hidden /></span>
            <span className="px-4 text-center font-semibold">Play video: {title}</span>
            <span className="text-xs text-eduaid-sand">Loads from YouTube when pressed</span>
          </button>
        )}
      </div>
      <figcaption className="mt-2 text-sm text-eduaid-muted">{illustrative ? ILLUSTRATIVE_VIDEO_CAPTION : title}</figcaption>
    </figure>
  );
};

export const GoogleFormEmbed = ({ src, openHref, title }: { src: string; openHref: string; title: string }) => (
  <div className="rounded-[24px] border border-eduaid-line bg-eduaid-paper p-3">
    <iframe src={src} title={title} loading="lazy" className="h-[640px] w-full rounded-2xl">Loading…</iframe>
    <a href={openHref} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-eduaid-dark underline">
      Open in new tab <ExternalLink className="h-3.5 w-3.5" aria-hidden />
    </a>
  </div>
);
