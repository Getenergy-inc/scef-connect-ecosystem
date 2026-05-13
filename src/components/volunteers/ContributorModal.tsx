import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContributorAvatar } from "./ContributorAvatar";
import { ArchiveTile } from "./ArchiveTile";
import { archiveGallery } from "@/config/volunteersArchive";
import type { Contributor } from "@/config/contributorsDirectory";
import { Handshake, MapPin } from "lucide-react";

interface ContributorModalProps {
  contributor: Contributor | null;
  onClose: () => void;
}

export const ContributorModal = ({ contributor, onClose }: ContributorModalProps) => {
  const open = !!contributor;
  const eventPhotos = contributor
    ? archiveGallery.filter((g) => contributor.eventPhotoIds?.includes(g.id))
    : [];

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {contributor && (
          <>
            <DialogHeader>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <ContributorAvatar src={contributor.photo} alt={contributor.name} size="w-32 h-32" />
                <div className="text-center sm:text-left">
                  <DialogTitle className="font-display text-2xl text-scef-blue-darker">
                    {contributor.name}
                  </DialogTitle>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.15em] text-scef-gold">
                    {contributor.role}
                  </p>
                  <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    {contributor.chapter ? `${contributor.chapter}, ${contributor.country}` : contributor.country}
                    <span className="mx-1">·</span>
                    Since {contributor.yearJoined}
                  </p>
                  <DialogDescription className="mt-3 text-sm leading-relaxed">
                    {contributor.story ?? contributor.summary}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="mt-2 space-y-5">
              {contributor.badges.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold mb-2">
                    Recognition
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {contributor.badges.map((b) => (
                      <span
                        key={b}
                        className="inline-flex items-center rounded-full border border-scef-gold/40 bg-scef-gold/10 px-2.5 py-1 text-[11px] font-semibold text-scef-blue-darker"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {contributor.programs.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold mb-2">
                    Programmes
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {contributor.programs.map((p) => (
                      <Badge key={p} variant="secondary" className="text-[11px]">
                        {p}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {eventPhotos.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold mb-2">
                    Event photos
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {eventPhotos.map((p) => (
                      <ArchiveTile
                        key={p.id}
                        alt={p.caption}
                        caption={p.caption}
                        year={p.year}
                        category={p.category}
                        aspect="aspect-square"
                      />
                    ))}
                  </div>
                </div>
              )}

              {contributor.links && contributor.links.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold mb-2">
                    Profile links
                  </p>
                  <ul className="text-sm space-y-1">
                    {contributor.links.map((l) => (
                      <li key={l.href}>
                        <a className="text-scef-blue-darker underline hover:text-scef-gold" href={l.href} target="_blank" rel="noreferrer">
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-3 border-t border-border flex flex-wrap gap-2">
                <Button asChild className="bg-scef-gold hover:bg-scef-gold-hover text-scef-blue-darker font-semibold">
                  <Link to="/get-involved/volunteer">
                    <Handshake className="w-4 h-4 mr-2" /> Join the Movement
                  </Link>
                </Button>
                <Button asChild variant="outline" className="font-semibold">
                  <Link to="/get-involved/ambassador">Become an Ambassador</Link>
                </Button>
              </div>

              <p className="text-[10px] text-muted-foreground italic">
                Real passport photographs and verified contributor records are being integrated from
                SCEF, NESA-Africa, EduAid-Africa archives and partner records.
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContributorModal;
