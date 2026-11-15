import { Mail, ExternalLink } from "lucide-react";
import {
  ACCOUNTS, BANK_ACCOUNTS, BANK_NARRATION_NOTICE, CAMPAIGN_LINE, CAMPAIGN_VIDEOS, NESA_EMAIL, NO_PERSONAL_ACCOUNT, REGIONS, SOCIAL_SLOTS, VOTING_LABEL, VOTING_OPEN,
} from "@/config/schoolSupport";
import {
  DEPENDS_ON, FAQS, INTEGRITY_FIREWALL, INTERVENTIONS, MAY_RECEIVE, NEXT_ELIGIBLE_NOTE, SPONSOR_TYPES, STEPS, TIMETABLE, TRACKING_STAGES, VOTE_PRECONDITIONS, VOTE_SAFEGUARDS,
} from "@/config/schoolSupportContent";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSupportIntent } from "./SupportIntentContext";
import { ActionTiles } from "./TopSections";
import { ClickToLoadVideo } from "./media";
import { Card, Chip, Notice, PillButton, Section } from "./ui";

export const HowItWorks = () => (
  <Section id="how-it-works" eyebrow="How the programme works" title="Ten steps from nomination to reporting">
    <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
      {STEPS.map(([t, d], i) => (
        <li key={t} className="rounded-[20px] border border-eduaid-line bg-eduaid-paper p-4">
          <span className="ea-heading text-3xl text-eduaid-tan">{String(i + 1).padStart(2, "0")}</span>
          <p className="mt-1 font-semibold text-eduaid-dark">{t}</p>
          <p className="text-sm text-eduaid-muted">{d}</p>
        </li>
      ))}
    </ol>
  </Section>
);

export const SupportDetails = () => (
  <Section eyebrow="Support" title="What a selected school may receive" intro="Subject to due diligence, available funds and written approval. No fixed grant is promised.">
    <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">{MAY_RECEIVE.map((x) => <li key={x}><Card className="h-full p-4 text-sm font-medium">{x}</Card></li>)}</ul>
    <h3 className="mt-10 text-xl text-eduaid-dark">Intervention classifications</h3>
    <ul className="mt-3 flex flex-wrap gap-2">{INTERVENTIONS.map((x) => <li key={x}><Chip>{x}</Chip></li>)}</ul>
    <h3 className="mt-10 text-xl text-eduaid-dark">Final support depends on</h3>
    <ul className="mt-3 flex flex-wrap gap-2">{DEPENDS_ON.map((x) => <li key={x}><Chip className="bg-eduaid-sand">{x}</Chip></li>)}</ul>
    <p className="mt-6 text-sm text-eduaid-muted">{NEXT_ELIGIBLE_NOTE}</p>
  </Section>
);

export const TimetableAndVote = () => (
  <>
    <Section id="timetable" eyebrow="2027 timetable" title="Key dates">
      <div className="overflow-x-auto rounded-[20px] border border-eduaid-line bg-eduaid-paper">
        <table className="w-full min-w-[560px] text-sm">
          <caption className="sr-only">2027 programme timetable</caption>
          <thead className="bg-eduaid-sand text-left"><tr><th scope="col" className="p-3">Period</th><th scope="col" className="p-3">Activity</th></tr></thead>
          <tbody>{TIMETABLE.map(([p, a]) => <tr key={p} className="border-t border-eduaid-line"><th scope="row" className="whitespace-nowrap p-3 text-left font-semibold">{p}</th><td className="p-3 text-eduaid-muted">{a}</td></tr>)}</tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-eduaid-muted">The timetable is subject to governance approval, funding availability, school verification, safeguarding requirements and operational readiness.</p>
    </Section>
    <Section id="vote" eyebrow="Vote" title={VOTING_LABEL}>
      <p className="mb-6 inline-flex rounded-full border-2 border-dashed border-eduaid-line px-4 py-2 text-sm font-semibold text-eduaid-muted" aria-live="polite">
        Voting status: {VOTING_OPEN ? "open" : "not open"}
      </p>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl text-eduaid-dark">Voting opens only when all of these are met</h3>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm">{VOTE_PRECONDITIONS.map((x) => <li key={x}>{x}</li>)}</ol>
        </Card>
        <Card>
          <h3 className="text-xl text-eduaid-dark">Safeguards</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">{VOTE_SAFEGUARDS.map((x) => <li key={x}>{x}</li>)}</ul>
        </Card>
      </div>
      <div className="mt-6"><Notice><strong>Votes are never sold.</strong> Voting is free. Donations and sponsorship cannot buy votes or change vote totals. This regional vote is not voting for NESA-Africa awards.</Notice></div>
    </Section>
  </>
);

export const SponsorshipOverview = () => {
  const { goSponsor, goDonate } = useSupportIntent();
  return (
    <Section id="sponsorship" eyebrow="Sponsorship & partnership" title="Who can sponsor or partner">
      <ul className="flex flex-wrap gap-2">{SPONSOR_TYPES.map((x) => <li key={x}><Chip>{x}</Chip></li>)}</ul>
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <Card><h3 className="text-xl text-eduaid-dark">Sponsor a region</h3><p className="mt-2 text-sm text-eduaid-muted">Fund a region's US$150,000 target in full or in part, or a specific verified project.</p><PillButton className="mt-4" onClick={() => goSponsor("sponsor")}>Sponsor a Regional School</PillButton></Card>
        <Card><h3 className="text-xl text-eduaid-dark">Partner with the programme</h3><p className="mt-2 text-sm text-eduaid-muted">Contribute expertise, equipment, services, media or assurance.</p><PillButton className="mt-4" onClick={() => goSponsor("partner")}>Become a Programme Partner</PillButton></Card>
        <Card><h3 className="text-xl text-eduaid-dark">Give to the Fund</h3><p className="mt-2 text-sm text-eduaid-muted">Donate by bank transfer to the ring-fenced Support Fund.</p><PillButton className="mt-4" onClick={() => goDonate()}>Donate to the Support Fund</PillButton></Card>
      </div>
      <h3 className="mt-10 text-xl text-eduaid-dark">How your donation is tracked</h3>
      <ol className="mt-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {TRACKING_STAGES.map((s, i) => <li key={s} className="rounded-2xl border border-eduaid-line bg-eduaid-paper p-4 text-sm"><span className="font-bold text-eduaid-brown">{i + 1}.</span> {s}</li>)}
      </ol>
      {CAMPAIGN_VIDEOS.donationTracking && <div className="mt-6 max-w-3xl"><ClickToLoadVideo id={CAMPAIGN_VIDEOS.donationTracking} title="How your donation is tracked" illustrative /></div>}
      <div className="mt-6"><Notice><strong>Integrity firewall.</strong> {INTEGRITY_FIREWALL} No organisation is listed as a sponsor or partner until a written agreement or verified contribution is in place.</Notice></div>
    </Section>
  );
};

export const Faq = () => (
  <Section id="faq" eyebrow="FAQ" title="Frequently asked questions">
    <Accordion type="single" collapsible className="max-w-3xl rounded-[20px] border border-eduaid-line bg-eduaid-paper px-5">
      {FAQS.map(([q, a], i) => (
        <AccordionItem key={q} value={`q${i}`} className="border-eduaid-line">
          <AccordionTrigger className="text-left font-semibold text-eduaid-dark">{q}</AccordionTrigger>
          <AccordionContent className="text-eduaid-muted">{a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </Section>
);

export const FinalCta = () => (
  <section className="bg-gradient-to-br from-eduaid-deep to-eduaid-dark py-16 text-eduaid-cream">
    <div className="container mx-auto px-4">
      <h2 className="max-w-3xl text-3xl md:text-5xl text-eduaid-cream">{CAMPAIGN_LINE}</h2>
      <div className="mt-8"><ActionTiles /></div>
      <p className="mt-3 text-xs text-eduaid-sand">* {VOTING_LABEL}.</p>
    </div>
  </section>
);

export const Connect = () => (
  <Section id="connect" eyebrow="Connect with EduAid-Africa" title="Official accounts and regional desks">
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {ACCOUNTS.map((a) => (
        <li key={a.href}>
          <a href={a.href} target="_blank" rel="noopener noreferrer" className="flex h-full items-center justify-between gap-3 rounded-[20px] border border-eduaid-line bg-eduaid-paper p-4 hover:bg-eduaid-sand">
            <span><span className="block font-semibold text-eduaid-dark">{a.label}</span><span className="block break-all text-xs text-eduaid-muted">{a.href.replace(/^https?:\/\//, "")}</span></span>
            <ExternalLink className="h-4 w-4 shrink-0 text-eduaid-muted" aria-hidden />
          </a>
        </li>
      ))}
      {Object.entries(SOCIAL_SLOTS).filter(([, v]) => v).map(([k, v]) => (
        <li key={k}><a href={v!} target="_blank" rel="noopener noreferrer" className="flex rounded-[20px] border border-eduaid-line bg-eduaid-paper p-4 font-semibold capitalize">{k}</a></li>
      ))}
    </ul>
    <p className="mt-3 text-sm">NESA-Africa: <a className="font-semibold underline" href={`mailto:${NESA_EMAIL}`}>{NESA_EMAIL}</a></p>
    <div className="mt-8 rounded-[24px] bg-eduaid-deep p-6 text-eduaid-cream">
      <h3 className="text-2xl text-eduaid-cream">Regional desks</h3>
      <ul className="mt-4 grid sm:grid-cols-2 gap-3">
        {REGIONS.map((r) => (
          <li key={r.key} className="flex items-start gap-3 rounded-2xl bg-eduaid-dark p-3">
            <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: r.color }} aria-hidden />
            <span><span className="block font-semibold">{r.name}</span>
              <a href={`mailto:${r.desk}`} className="inline-flex items-center gap-1 break-all text-sm text-eduaid-tan underline"><Mail className="h-3.5 w-3.5 shrink-0" aria-hidden />{r.desk}</a></span>
          </li>
        ))}
      </ul>
    </div>
    <div className="mt-8">
      <h3 className="text-2xl text-eduaid-dark">Official bank accounts</h3>
      <p className="mt-1 text-sm text-eduaid-muted">EduAid Africa Ltd · Providus Bank</p>
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {BANK_ACCOUNTS.map((b) => (
          <Card key={b.currency} className="p-4">
            <p className="text-xs font-bold text-eduaid-brown">{b.currency}</p>
            <p className="ea-heading mt-1 text-xl tracking-wide text-eduaid-dark">{b.number}</p>
            <p className="text-sm text-eduaid-muted">{b.purpose}</p>
          </Card>
        ))}
      </div>
      <div className="mt-4 space-y-2"><Notice>{BANK_NARRATION_NOTICE}</Notice><Notice><strong>{NO_PERSONAL_ACCOUNT}</strong></Notice></div>
    </div>
  </Section>
);
