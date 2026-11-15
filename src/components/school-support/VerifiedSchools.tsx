import { PUBLIC_STATS, REGIONS, REGION_TARGET_USD, StatValue } from "@/config/schoolSupport";
import { Card, Section, dash } from "./ui";

const usd = (n: number) => `US$${n.toLocaleString("en-GB")}`;
const isEmpty = (o: unknown): boolean =>
  o === null || (typeof o === "object" && Object.values(o as object).every(isEmpty));

const Stat = ({ label, value, money }: { label: string; value: StatValue; money?: boolean }) => (
  <div className="rounded-2xl border border-eduaid-line bg-eduaid-paper p-4">
    <p className="text-xs text-eduaid-muted">{label}</p>
    <p className="ea-heading mt-1 text-2xl text-eduaid-dark">{dash(value, money ? usd : (n) => n.toLocaleString("en-GB"))}</p>
  </div>
);
const Flow = ({ title, rows }: { title: string; rows: [string, StatValue][] }) => (
  <Card>
    <h4 className="text-lg text-eduaid-dark">{title}</h4>
    <ol className="mt-3 space-y-2">{rows.map(([l, v], i) => (
      <li key={l} className="flex justify-between gap-3 border-b border-eduaid-line pb-2 text-sm last:border-0">
        <span>{i > 0 && <span aria-hidden className="mr-1 text-eduaid-muted">→</span>}{l}</span><span className="font-semibold">{dash(v)}</span>
      </li>
    ))}</ol>
  </Card>
);

export const VerifiedSchools = () => {
  const s = PUBLIC_STATS;
  const empty = isEmpty(s);
  return (
    <Section id="verified-schools" eyebrow="View Verified Schools" title="Verified schools and public accountability"
      intro="Only verified and approved school profiles appear here. Children's names, diagnoses, identity documents and personal contacts are never published. Unverified fields show '—'.">
      <div className="overflow-x-auto rounded-[20px] border border-eduaid-line bg-eduaid-paper">
        <table className="w-full min-w-[960px] text-sm">
          <caption className="sr-only">Verified and approved school profiles</caption>
          <thead className="bg-eduaid-sand text-left">
            <tr>{["School", "Country", "Region", "Learners", "Identified need", "Accessibility", "Intervention", "Funding target", "Progress", "Outcome"].map((h) => <th key={h} scope="col" className="p-3">{h}</th>)}</tr>
          </thead>
          <tbody><tr><td colSpan={10} className="p-6 text-center text-eduaid-muted">No verified and approved school profiles yet. Nominations open in April 2027.</td></tr></tbody>
        </table>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl text-eduaid-dark">Public accountability dashboard</h3>
        {empty && <p role="status" className="mt-3 inline-flex rounded-full bg-eduaid-sand px-4 py-2 text-sm font-semibold text-eduaid-brown">Awaiting the first approved figures</p>}
        <div className="mt-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          <Stat label="Schools nominated" value={s.schoolsNominated} />
          <Stat label="Approved for voting" value={s.approvedForVoting} />
          <Stat label="Funds pledged" value={s.fundsPledgedUsd} money />
          <Stat label="Funds reconciled" value={s.fundsReconciledUsd} money />
          <Stat label="Interventions completed" value={s.interventionsCompleted} />
          <Stat label="Last updated" value={s.lastUpdated} />
        </div>

        <Card className="mt-6">
          <h4 className="text-lg text-eduaid-dark">Regional funding · reconciled vs US$150,000 target</h4>
          <ul className="mt-4 space-y-3">
            {REGIONS.map((r) => {
              const { pledgedUsd, reconciledUsd } = s.regional[r.key];
              const pP = pledgedUsd ? Math.min(100, (pledgedUsd / REGION_TARGET_USD) * 100) : 0;
              const rP = reconciledUsd ? Math.min(100, (reconciledUsd / REGION_TARGET_USD) * 100) : 0;
              return (
                <li key={r.key} className="grid grid-cols-[minmax(0,9rem)_1fr_auto] items-center gap-3 text-sm">
                  <span className="truncate">{r.name}</span>
                  <div className="relative h-3 overflow-hidden rounded-full bg-eduaid-sand" role="img" aria-label={`${r.name}: reconciled ${dash(reconciledUsd, usd)}, pledged ${dash(pledgedUsd, usd)} of US$150,000`}>
                    <div className="absolute inset-y-0 left-0 rounded-full opacity-35" style={{ width: `${pP}%`, backgroundColor: r.color }} />
                    <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${rP}%`, backgroundColor: r.color }} />
                  </div>
                  <span className="w-20 text-right font-semibold">{dash(reconciledUsd, usd)}</span>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-xs text-eduaid-muted">Solid: reconciled on the bank statement. Faded: pledged.</p>
        </Card>

        <div className="mt-6 grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          <Flow title="School pipeline" rows={[["Nominated", s.pipeline.nominated], ["Verified", s.pipeline.verified], ["Approved", s.pipeline.approved], ["Selected", s.pipeline.selected]]} />
          <Flow title="Money trail (USD)" rows={[["Pledged", s.moneyTrail.pledged], ["Transfers reported", s.moneyTrail.transfersReported], ["Reconciled on bank statement", s.moneyTrail.reconciled], ["Receipts issued", s.moneyTrail.receiptsIssued]]} />
          <Flow title="Interventions" rows={[["Planned", s.interventions.planned], ["In progress", s.interventions.inProgress], ["Completed", s.interventions.completed]]} />
          <Flow title="Verified regional votes" rows={[["Verified votes", s.votes.verifiedVotes], ["Regions open", s.votes.regionsOpen]]} />
        </div>
      </div>
    </Section>
  );
};
