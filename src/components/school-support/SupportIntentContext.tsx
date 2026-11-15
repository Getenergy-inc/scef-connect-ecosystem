import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";
import type { RegionKey } from "@/config/schoolSupport";

export type TabKey = "nominate" | "vote" | "donate" | "sponsor" | "attend";
export type SponsorMode = "sponsor" | "partner";
type RegionChoice = RegionKey | "any";

interface Intent {
  donateRegion: RegionChoice; donateNonce: number;
  sponsorMode: SponsorMode; sponsorRegion: RegionChoice | null; sponsorNonce: number;
  tab: TabKey; tabNonce: number;
  goDonate: (region?: RegionChoice) => void;
  goSponsor: (mode?: SponsorMode, region?: RegionChoice) => void;
  goTab: (tab: TabKey) => void;
}
const Ctx = createContext<Intent | null>(null);

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  el.focus?.({ preventScroll: true });
};

export const SupportIntentProvider = ({ children, initialTab = "nominate", initialMode = "sponsor" }: { children: ReactNode; initialTab?: TabKey; initialMode?: SponsorMode }) => {
  const [s, set] = useState({
    donateRegion: "any" as RegionChoice, donateNonce: 0,
    sponsorMode: initialMode, sponsorRegion: null as RegionChoice | null, sponsorNonce: 0,
    tab: initialTab, tabNonce: 0,
  });
  const goDonate = useCallback((region: RegionChoice = "any") => {
    set((p) => ({ ...p, donateRegion: region, donateNonce: p.donateNonce + 1 }));
    requestAnimationFrame(() => scrollTo("donate"));
  }, []);
  const goSponsor = useCallback((mode: SponsorMode = "sponsor", region?: RegionChoice) => {
    set((p) => ({ ...p, sponsorMode: mode, sponsorRegion: region ?? p.sponsorRegion, sponsorNonce: p.sponsorNonce + 1 }));
    requestAnimationFrame(() => scrollTo("sponsor-form"));
  }, []);
  const goTab = useCallback((tab: TabKey) => {
    set((p) => ({ ...p, tab, tabNonce: p.tabNonce + 1 }));
    requestAnimationFrame(() => scrollTo("take-part"));
  }, []);
  const value = useMemo(() => ({ ...s, goDonate, goSponsor, goTab }), [s, goDonate, goSponsor, goTab]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

const fallback: Intent = {
  donateRegion: "any", donateNonce: 0, sponsorMode: "sponsor", sponsorRegion: null, sponsorNonce: 0, tab: "nominate", tabNonce: 0,
  goDonate: () => {}, goSponsor: () => {}, goTab: () => {},
};
export const useSupportIntent = () => useContext(Ctx) ?? fallback;
