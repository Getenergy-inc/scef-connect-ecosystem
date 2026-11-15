import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { CTAS, GOOGLE_FORM_EMBED, GOOGLE_FORM_URL, NOMINATION_RULE, VOTING_LABEL } from "@/config/schoolSupport";
import { TabKey, useSupportIntent } from "./SupportIntentContext";
import { DonateForm } from "./DonateForm";
import { SponsorPartnerForm } from "./SponsorPartnerForm";
import { GoogleFormEmbed } from "./media";
import { PillButton, PillLink, Section } from "./ui";

const TABS: { key: TabKey; label: string }[] = [
  { key: "nominate", label: "Nominate" }, { key: "vote", label: "Vote" }, { key: "donate", label: "Donate" },
  { key: "sponsor", label: "Sponsor" }, { key: "attend", label: "Attend" },
];

export const TakePartTabs = () => {
  const intent = useSupportIntent();
  const [active, setActive] = useState<TabKey>(intent.tab);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  useEffect(() => { setActive(intent.tab); }, [intent.tab, intent.tabNonce]);

  const onKey = (e: KeyboardEvent, i: number) => {
    let n = -1;
    if (e.key === "ArrowRight") n = (i + 1) % TABS.length;
    else if (e.key === "ArrowLeft") n = (i - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = TABS.length - 1;
    if (n < 0) return;
    e.preventDefault();
    setActive(TABS[n].key);
    refs.current[TABS[n].key]?.focus();
  };

  const tab = TABS.find((t) => t.key === active)!;
  const copy: Record<TabKey, { title: string; body: string; cta: JSX.Element }> = {
    nominate: { title: "Nominate a school", body: `${NOMINATION_RULE} Nominations open in April 2027.`, cta: <PillLink href={CTAS.nominate.href}>{CTAS.nominate.label}</PillLink> },
    vote: { title: "Vote for a school in your region", body: `${VOTING_LABEL}. Voting is free and never linked to money. Register your interest now and we will tell you when voting opens.`, cta: <a href="#vote" className="inline-flex min-h-[44px] items-center rounded-full border-2 border-dashed border-eduaid-line px-4 text-sm font-semibold text-eduaid-muted">{VOTING_LABEL}</a> },
    donate: { title: "Donate to the Support Fund", body: "Give by bank transfer to the ring-fenced Support Fund, for a region or where most needed.", cta: <PillButton onClick={() => intent.goDonate()}>{CTAS.donate.label}</PillButton> },
    sponsor: { title: "Sponsor or partner", body: "Sponsor a region, a verified school or a project, or partner with the programme.", cta: <PillButton onClick={() => intent.goSponsor("sponsor")}>{CTAS.sponsor.label}</PillButton> },
    attend: { title: "Attend EduTourism 2027 and the ceremonies", body: "Register interest in the October–November 2027 regional visits and the Regional Grant Awarding and Commissioning Ceremonies.", cta: <PillLink href="#edutourism" variant="outline">See EduTourism 2027</PillLink> },
  };
  const hint =
    active === "donate" ? "Prefer the form? Complete the donation form on the right. It is already set to 'Donate', so there is no participation type to choose."
      : active === "sponsor" ? "Prefer the form? Complete it on the right. Choose 'Sponsor a Regional School' or 'Become a Programme Partner' at the top of the form."
        : `Prefer the form? Complete it on the right. Choose '${tab.label}' as your participation type where the form asks.`;

  return (
    <Section id="take-part" eyebrow="Take part" title="Choose how you would like to take part">
      <div role="tablist" aria-label="Ways to take part" className="flex flex-wrap gap-2 border-b border-eduaid-line pb-3">
        {TABS.map((t, i) => (
          <button key={t.key} ref={(el) => (refs.current[t.key] = el)} role="tab" id={`tp-tab-${t.key}`} aria-controls={`tp-panel-${t.key}`}
            aria-selected={active === t.key} tabIndex={active === t.key ? 0 : -1} onClick={() => setActive(t.key)} onKeyDown={(e) => onKey(e, i)}
            className={`min-h-[44px] rounded-full px-5 text-sm font-semibold ${active === t.key ? "bg-eduaid-green text-eduaid-paper" : "bg-eduaid-paper text-eduaid-ink border border-eduaid-line"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`tp-panel-${active}`} aria-labelledby={`tp-tab-${active}`} tabIndex={0} className="mt-6 grid lg:grid-cols-[1fr_1.4fr] gap-6">
        <div>
          <h3 className="text-2xl text-eduaid-dark">{copy[active].title}</h3>
          <p className="mt-3 text-eduaid-muted">{copy[active].body}</p>
          <div className="mt-5">{copy[active].cta}</div>
          <p className="mt-4 text-sm text-eduaid-ink">{hint}</p>
        </div>
        <div>
          {active === "donate" ? <DonateForm /> : active === "sponsor" ? <SponsorPartnerForm />
            : <GoogleFormEmbed src={GOOGLE_FORM_EMBED} openHref={GOOGLE_FORM_URL} title={`Participation form — ${tab.label}`} />}
        </div>
      </div>
    </Section>
  );
};
