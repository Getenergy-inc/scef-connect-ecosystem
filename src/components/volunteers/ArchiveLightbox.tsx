import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArchiveTile } from "./ArchiveTile";
import { type ArchiveItem, categoryLabels } from "@/config/volunteersArchive";

interface Props {
  item: ArchiveItem | null;
  onClose: () => void;
}

export const ArchiveLightbox = ({ item, onClose }: Props) => {
  return (
    <Dialog open={!!item} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl bg-scef-blue-darker border-scef-gold/20 text-white">
        {item && (
          <>
            <DialogTitle className="font-display text-xl text-white">
              {item.caption}
            </DialogTitle>
            <DialogDescription className="text-white/70">
              {categoryLabels[item.category]} · {item.year}
            </DialogDescription>
            <div className="mt-2">
              <ArchiveTile
                src={item.src}
                alt={item.caption}
                caption={item.caption}
                year={item.year}
                category={item.category}
                aspect="aspect-[16/10]"
              />
            </div>
            {item.story && (
              <p className="mt-3 text-sm text-white/80 leading-relaxed">{item.story}</p>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ArchiveLightbox;
