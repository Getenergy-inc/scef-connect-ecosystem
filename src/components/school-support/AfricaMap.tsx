import { useEffect, useId, useMemo, useRef, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import type { Feature, Geometry } from "geojson";
import {
  COUNTRIES, COUNTRY_MAP_APPROVED, CTAS, DISPUTED, DRAFT_MAP_NOTICE, REGIONS, REGION_NOTE, RegionKey, SOMALILAND_AS, countriesIn, regionByKey,
} from "@/config/schoolSupport";
import { useSupportIntent } from "./SupportIntentContext";
import { PillButton, PillLink } from "./ui";

const W = 600, H = 640;
const ISLAND_COORDS: Record<string, [number, number]> = {
  "132": [-23.6, 15.1], "678": [6.6, 0.3], "174": [43.3, -11.7], "480": [57.55, -20.25], "690": [55.45, -4.6],
};
type Shape = { id: string; d: string };

const useInView = (ref: React.RefObject<Element>) => {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (seen || !ref.current) return;
    if (typeof IntersectionObserver === "undefined") { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { rootMargin: "300px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, seen]);
  return seen;
};

export const AfricaMap = () => {
  const uid = useId();
  const wrap = useRef<HTMLDivElement>(null);
  const visible = useInView(wrap);
  const [shapes, setShapes] = useState<Shape[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [focus, setFocus] = useState<RegionKey | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const { goDonate, goSponsor, goTab } = useSupportIntent();

  const projection = useMemo(() => geoMercator()
    .fitExtent([[8, 8], [W - 8, H - 8]], { type: "MultiPoint", coordinates: [[-25.5, -35.2], [57.8, 37.6]] } as never)
    .clipExtent([[0, 0], [W, H]]), []);

  useEffect(() => {
    if (!visible || shapes) return;
    let alive = true;
    Promise.all([import("world-atlas/countries-50m.json"), import("topojson-client")])
      .then(([atlas, topo]) => {
        const data = (atlas as { default?: unknown }).default ?? atlas;
        const fc = topo.feature(data as never, (data as { objects: { countries: never } }).objects.countries) as unknown as { features: Feature<Geometry, { name: string }>[] };
        const wanted = new Set([...COUNTRIES.map((c) => c.id), DISPUTED.id]);
        const path = geoPath(projection);
        const out: Shape[] = [];
        for (const f of fc.features) {
          const id = f.properties?.name === "Somaliland" ? SOMALILAND_AS : String(f.id ?? "");
          if (!wanted.has(id)) continue;
          const d = path(f);
          if (d) out.push({ id, d });
        }
        if (alive) setShapes(out);
      })
      .catch(() => alive && setFailed(true));
    return () => { alive = false; };
  }, [visible, shapes, projection]);

  const country = COUNTRIES.find((c) => c.id === selected);
  const region = regionByKey(country?.region);
  const fillFor = (id: string) => {
    if (id === DISPUTED.id) return DISPUTED.color;
    const c = COUNTRIES.find((x) => x.id === id);
    const r = regionByKey(c?.region);
    if (!r) return DISPUTED.color;
    return focus && focus !== r.key ? "#D9D4C6" : r.color;
  };
  const nameFor = (id: string) =>
    id === DISPUTED.id ? `${DISPUTED.name} — ${DISPUTED.note}` : (() => { const c = COUNTRIES.find((x) => x.id === id); return c ? `${c.name} — ${regionByKey(c.region)!.name}` : id; })();

  const choose = (id: string) => { if (id !== DISPUTED.id) { setSelected(id); setFocus(null); } };

  return (
    <div ref={wrap} className="grid lg:grid-cols-[1.3fr_1fr] gap-6">
      <div>
        {!COUNTRY_MAP_APPROVED && <p className="mb-3 inline-flex rounded-full bg-eduaid-sand px-3 py-1 text-xs font-semibold text-eduaid-brown">{DRAFT_MAP_NOTICE}</p>}
        <div className="rounded-[24px] border border-eduaid-line bg-eduaid-paper p-3">
          {shapes ? (
            <svg viewBox={`0 0 ${W} ${H}`} role="group" aria-label="Map of Africa by programme region. Use the country list to choose a country." className="w-full h-auto">
              {shapes.map((s) => (
                <path key={s.id + s.d.length} d={s.d} fill={fillFor(s.id)} stroke="#FFFFFF" strokeWidth={0.8}
                  className={s.id === DISPUTED.id ? "" : "cursor-pointer hover:opacity-80"}
                  strokeOpacity={selected === s.id ? 1 : 0.9}
                  onClick={() => choose(s.id)}>
                  <title>{nameFor(s.id)}</title>
                </path>
              ))}
              {Object.entries(ISLAND_COORDS).map(([id, ll]) => {
                const p = projection(ll);
                if (!p) return null;
                return (
                  <circle key={id} cx={p[0]} cy={p[1]} r={7} fill={fillFor(id)} stroke="#FFFFFF" strokeWidth={2} className="cursor-pointer" onClick={() => choose(id)}>
                    <title>{nameFor(id)}</title>
                  </circle>
                );
              })}
            </svg>
          ) : (
            <div className="flex aspect-[15/16] items-center justify-center rounded-2xl bg-eduaid-sand text-sm text-eduaid-muted" role="status">
              {failed ? "The map could not load. Please use the country list." : "Loading map…"}
            </div>
          )}
        </div>
        <p className="mt-3 text-xs text-eduaid-muted">{REGION_NOTE} Western Sahara is shown in grey as a disputed territory, not assigned.</p>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Focus a region">
          {REGIONS.map((r) => (
            <button key={r.key} type="button" aria-pressed={focus === r.key} onClick={() => { setFocus(focus === r.key ? null : r.key); setSelected(null); }}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold min-h-[36px] ${focus === r.key ? "border-eduaid-ink bg-eduaid-sand" : "border-eduaid-line bg-eduaid-paper"}`}>
              <span aria-hidden className="h-3 w-3 rounded-full" style={{ backgroundColor: r.color }} />{r.name} · {countriesIn(r.key).length}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor={`${uid}-country`} className="block text-sm font-semibold mb-1">Choose a country</label>
          <select id={`${uid}-country`} name="map_country" value={selected ?? ""} onChange={(e) => choose(e.target.value)}
            className="w-full rounded-xl border border-eduaid-line bg-eduaid-paper px-3 py-2.5 text-sm">
            <option value="">Select one of 54 countries</option>
            {[...COUNTRIES].sort((a, b) => a.name.localeCompare(b.name)).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="rounded-[24px] border border-eduaid-line bg-eduaid-paper p-5" aria-live="polite">
          {country && region ? (
            <>
              <h3 className="text-2xl text-eduaid-dark">{country.name}</h3>
              <p className="mt-2"><span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-eduaid-paper" style={{ backgroundColor: region.color }}>Region {String(region.number).padStart(2, "0")} · {region.name}</span></p>
              <p className="mt-3 text-sm text-eduaid-muted">Regional target: US$150,000 for one verified priority school (a target, not secured funding).</p>
              <p className="mt-2 text-sm">Regional desk: <a className="font-semibold text-eduaid-dark underline break-all" href={`mailto:${region.desk}`}>{region.desk}</a></p>
              <div className="mt-4 flex flex-wrap gap-2">
                <PillLink href={CTAS.nominate.href} variant="primary">Nominate</PillLink>
                <PillButton variant="outline" aria-disabled onClick={() => goTab("vote")}>Vote · opens Sept 2027</PillButton>
                <PillButton variant="outline" onClick={() => goDonate(region.key)}>Donate</PillButton>
                <PillButton variant="outline" onClick={() => goSponsor("sponsor", region.key)}>Sponsor</PillButton>
                <PillButton variant="outline" onClick={() => goTab("attend")}>Attend</PillButton>
              </div>
            </>
          ) : (
            <p className="text-sm text-eduaid-muted">Select a country on the map or from the list to see its region, regional desk and ways to take part.</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default AfricaMap;
