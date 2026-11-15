import { lazy, Suspense } from "react";
import { CAMPAIGN_VIDEOS, COUNTRY_MAP_APPROVED, CTAS, DRAFT_MAP_NOTICE, PUBLIC_STATS, REGIONS, REGION_TARGET_USD, REGION_VIDEOS, countriesIn } from "@/config/schoolSupport";
import { useSupportIntent } from "./SupportIntentContext";
import { ClickToLoadVideo } from "./media";
import { PillButton, PillLink, Section } from "./ui";

const AfricaMap = lazy(() => import("./AfricaMap"));

export const Regions = () => {
  const { goDonate, goSponsor, goTab } = useSupportIntent();
  return (
    <Section id="regions" eyebrow="Eight regions" title="One school per region, in any category"
      intro="Each region has a US$150,000 target for one verified priority school. These are targets, not secured funding.">
      <Suspense fallback={<div className="aspect-[15/16] max-w-xl rounded-[24px] bg-eduaid-sand" role="status">Loading map…</div>}>
        <AfricaMap />
      </Suspense>
      <div className="mt-10 grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {REGIONS.map((r) => {
          const stats = PUBLIC_STATS.regional[r.key];
          const pct = stats.reconciledUsd ? Math.min(100, (stats.reconciledUsd / REGION_TARGET_USD) * 100) : 0;
          const list = countriesIn(r.key);
          return (
            <article key={r.key} className="flex flex-col overflow-hidden rounded-[20px] border border-eduaid-line bg-eduaid-paper">
              <div className="h-2" style={{ backgroundColor: r.color }} aria-hidden />
              <div className="flex flex-1 flex-col p-5">
                <p className="text-[11px] font-bold tracking-[0.14em] text-eduaid-brown">EDUAID-AFRICA · REGION {String(r.number).padStart(2, "0")}</p>
                <h3 className="mt-1 text-2xl text-eduaid-dark">{r.name}</h3>
                <p className="mt-2 text-sm"><strong>Target:</strong> US$150,000</p>
                <div className="mt-2">
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-eduaid-sand" role="progressbar" aria-label={`${r.name} reconciled funds`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: r.color }} />
                  </div>
                  <p className="mt-1 text-xs text-eduaid-muted">Reconciled funds: {stats.reconciledUsd === null ? "—" : `US$${stats.reconciledUsd.toLocaleString("en-GB")}`}</p>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-eduaid-ink">
                  <li>Selected school: to be announced after verification</li>
                  <li>EduTourism 2027: regional visit Oct–Nov 2027</li>
                  <li>Grant awarding &amp; commissioning ceremony · host city TBA</li>
                  <li>Status: nominations open April 2027</li>
                </ul>
                <details className="mt-3 text-sm">
                  <summary className="cursor-pointer font-semibold text-eduaid-dark">Countries ({list.length}){COUNTRY_MAP_APPROVED ? "" : " · draft"}</summary>
                  <p className="mt-2 text-eduaid-muted">{list.map((c) => c.name).join(", ")}</p>
                  {!COUNTRY_MAP_APPROVED && <p className="mt-1 text-xs text-eduaid-brown">{DRAFT_MAP_NOTICE}</p>}
                </details>
                <p className="mt-3 text-sm">Desk: <a className="break-all font-semibold text-eduaid-dark underline" href={`mailto:${r.desk}`}>{r.desk}</a></p>
                {REGION_VIDEOS[r.key] && <div className="mt-3"><ClickToLoadVideo id={REGION_VIDEOS[r.key]} title={`${r.name} overview`} illustrative /></div>}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <PillButton className="px-3 text-xs" onClick={() => goDonate(r.key)}>Donate to this region</PillButton>
                  <PillButton variant="outline" className="px-3 text-xs" onClick={() => goSponsor("sponsor", r.key)}>Sponsor</PillButton>
                  <PillLink variant="outline" className="px-3 text-xs" href={CTAS.nominate.href}>Nominate</PillLink>
                  <PillButton variant="outline" className="px-3 text-xs" onClick={() => goTab("attend")}>Attend</PillButton>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
};

export const EduTourism = () => (
  <Section id="edutourism" dark eyebrow="October – December 2027" title="EduTourism 2027 & Regional Grant Awarding and Commissioning Ceremonies"
    intro="Supporters, sponsors, partners and volunteers may join approved regional visits and the ceremonies that commission each region's supported school.">
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="rounded-[20px] border border-eduaid-tan/30 bg-eduaid-dark p-6">
        <h3 className="text-xl text-eduaid-cream">What participants can join</h3>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-eduaid-sand">
          <li>Approved regional school visits (EduTourism 2027, October–November)</li>
          <li>Regional Grant Awarding and Commissioning Ceremonies</li>
          <li>Volunteer and professional skills sessions, where approved</li>
          <li>The continental outcome presentation in December 2027</li>
        </ul>
        <p className="mt-3 text-xs text-eduaid-sand">Visits follow safeguarding rules. Children are not photographed or named without recorded guardian consent.</p>
      </div>
      <div className="rounded-[20px] border border-eduaid-tan bg-eduaid-deep p-6">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-eduaid-tan">October – December 2027</p>
        <ul className="mt-3 space-y-2 text-eduaid-cream">
          <li>A regional ceremony in each of the eight regions</li>
          <li>A continental outcome presentation in December 2027</li>
          <li>Impact reporting from 2028</li>
        </ul>
      </div>
    </div>
    <div className="mt-8 overflow-x-auto rounded-[20px] border border-eduaid-tan/30">
      <table className="w-full min-w-[640px] text-sm">
        <caption className="sr-only">EduTourism 2027 and ceremony schedule by region</caption>
        <thead className="bg-eduaid-dark text-left text-eduaid-tan">
          <tr>{["Region", "EduTourism window", "Ceremony", "Host school"].map((h) => <th key={h} scope="col" className="p-3">{h}</th>)}</tr>
        </thead>
        <tbody>
          {REGIONS.map((r) => (
            <tr key={r.key} className="border-t border-eduaid-tan/20">
              <th scope="row" className="p-3 text-left font-semibold"><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: r.color }} aria-hidden />{r.name}</th>
              <td className="p-3 text-eduaid-sand">October–November 2027</td>
              <td className="p-3 text-eduaid-sand">Date &amp; host city to be announced</td>
              <td className="p-3 text-eduaid-sand">Pending verification</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {CAMPAIGN_VIDEOS.eduTourism && <div className="mt-8 max-w-3xl"><ClickToLoadVideo id={CAMPAIGN_VIDEOS.eduTourism} title="EduTourism 2027" illustrative /></div>}
  </Section>
);
