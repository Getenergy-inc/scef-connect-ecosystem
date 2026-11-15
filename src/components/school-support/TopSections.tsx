import { Accessibility, Brain, Ear, Eye, Layers, MessageCircle, Puzzle, Sprout, ShieldCheck, Scale, Search, Users } from "lucide-react";
import eduaidLogo from "@/assets/eduaid-africa-logo.jpg";
import {
  CAMPAIGN_VIDEOS, CATEGORIES, CATEGORY_RULE, CAT_VIDEOS, CTAS, CategoryIcon, NOMINATION_RULE, NOT_AWARD_TIER, OWNERSHIP_LINE,
  SERVICE_BAND, SUPPORT_CONDITION, UTILITY_LINE, VOTING_LABEL, YOUTUBE,
} from "@/config/schoolSupport";
import { useSupportIntent } from "./SupportIntentContext";
import { ClickToLoadVideo } from "./media";
import { Card, Chip, PillLink, Section } from "./ui";

export type TextSize = "base" | "lg" | "xl";

export const ServiceBand = () => (
  <div className="bg-eduaid-dark text-eduaid-cream">
    <div className="container mx-auto flex flex-col sm:flex-row items-center gap-3 px-4 py-3">
      <img src={eduaidLogo} alt="EduAid-Africa" className="h-10 w-auto rounded bg-eduaid-paper p-1" loading="eager" />
      <p className="text-sm text-center sm:text-left">{SERVICE_BAND}</p>
    </div>
  </div>
);

export const UtilityBar = ({ size, setSize, contrast, setContrast }: { size: TextSize; setSize: (s: TextSize) => void; contrast: boolean; setContrast: (v: boolean) => void }) => (
  <div className="border-b border-eduaid-line bg-eduaid-sand">
    <div className="container mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2 px-4 py-2">
      <p className="text-xs text-eduaid-ink">{UTILITY_LINE}</p>
      <div className="flex items-center gap-2" role="group" aria-label="Page display options">
        {([["base", "A", "Standard text size"], ["lg", "A+", "Larger text"], ["xl", "A++", "Largest text"]] as const).map(([k, l, aria]) => (
          <button key={k} type="button" aria-pressed={size === k} aria-label={aria} onClick={() => setSize(k)}
            className={`min-h-[32px] min-w-[36px] rounded-full border px-2 text-xs font-bold ${size === k ? "border-eduaid-green bg-eduaid-green text-eduaid-paper" : "border-eduaid-line bg-eduaid-paper"}`}>{l}</button>
        ))}
        <button type="button" aria-pressed={contrast} onClick={() => setContrast(!contrast)}
          className={`min-h-[32px] rounded-full border px-3 text-xs font-bold ${contrast ? "border-eduaid-ink bg-eduaid-ink text-eduaid-paper" : "border-eduaid-line bg-eduaid-paper"}`}>High contrast</button>
      </div>
    </div>
  </div>
);

export const ActionTiles = ({ dark = true }: { dark?: boolean }) => {
  const { goDonate, goSponsor, goTab } = useSupportIntent();
  const base = "group flex min-h-[96px] flex-col justify-between rounded-[20px] p-4 text-left transition-colors";
  const normal = dark ? "border border-eduaid-tan/40 bg-eduaid-dark text-eduaid-cream hover:bg-eduaid-green" : "border border-eduaid-line bg-eduaid-paper text-eduaid-ink hover:bg-eduaid-sand";
  const Num = ({ n }: { n: number }) => <span className="text-xs font-bold opacity-80">{n}</span>;
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      <a href={CTAS.nominate.href} className={`${base} bg-eduaid-tan text-eduaid-ink hover:bg-eduaid-sand`}><Num n={1} /><span className="ea-heading text-lg">Nominate</span><span className="text-xs">Opens April 2027</span></a>
      <a href="#vote" className={`${base} border-2 border-dashed ${dark ? "border-eduaid-tan/70 text-eduaid-cream" : "border-eduaid-line text-eduaid-ink"}`} aria-describedby="vote-footnote"><Num n={2} /><span className="ea-heading text-lg">Vote</span><span className="text-xs">opens Sept 2027*</span></a>
      <button type="button" onClick={() => goDonate()} className={`${base} ${normal}`}><Num n={3} /><span className="ea-heading text-lg">Donate</span><span className="text-xs">Pledges open now</span></button>
      <button type="button" onClick={() => goSponsor("sponsor")} className={`${base} ${normal}`}><Num n={4} /><span className="ea-heading text-lg">Sponsor</span><span className="text-xs">US$150,000 per region</span></button>
      <button type="button" onClick={() => goTab("attend")} className={`${base} ${normal} col-span-2 md:col-span-1`}><Num n={5} /><span className="ea-heading text-lg">Attend</span><span className="text-xs">October–December 2027</span></button>
    </div>
  );
};

export const Hero = () => {
  const { goSponsor } = useSupportIntent();
  return (
    <section className="bg-gradient-to-br from-eduaid-deep via-eduaid-dark to-eduaid-green text-eduaid-cream">
      <div className="container mx-auto grid lg:grid-cols-[1.6fr_1fr] gap-10 px-4 py-14 md:py-20">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-eduaid-tan">Nominate · Vote · Donate · Sponsor · Attend</p>
          <h1 className="mt-4 text-4xl md:text-6xl leading-[1.05] text-eduaid-cream">Support a Special-Needs School <span className="text-eduaid-tan">Across Africa</span></h1>
          <p className="mt-5 max-w-2xl text-lg text-eduaid-sand">In 2027 we will find, verify and support one priority special-needs or inclusive school in each of Africa's eight programme regions. Nominate a school, give, sponsor a region or join the regional ceremonies.</p>
          <div className="mt-8"><ActionTiles /></div>
          <p id="vote-footnote" className="mt-3 text-xs text-eduaid-sand">* {VOTING_LABEL}. Voting is free and is never linked to money.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <PillLink href={CTAS.verified.href} variant="ghostDark">{CTAS.verified.label}</PillLink>
            <button type="button" onClick={() => goSponsor("partner")} className="inline-flex min-h-[44px] items-center rounded-full border border-eduaid-tan/60 px-5 py-2.5 text-sm font-semibold text-eduaid-cream hover:bg-eduaid-dark">{CTAS.partner.label}</button>
            <PillLink href={CTAS.volunteer.href} variant="ghostDark">{CTAS.volunteer.label}</PillLink>
          </div>
          <p className="mt-6 max-w-2xl text-sm text-eduaid-sand">{OWNERSHIP_LINE}</p>
        </div>
        <aside aria-labelledby="glance-title" className="self-start rounded-[24px] border border-eduaid-tan/40 bg-eduaid-deep/60 p-6">
          <h2 id="glance-title" className="text-2xl text-eduaid-cream">2027 at a glance</h2>
          <dl className="mt-5 grid grid-cols-2 gap-4">
            {[["8", "regions"], ["8", "categories"], ["US$150k", "per region"], ["US$1.2M", "total"]].map(([v, l]) => (
              <div key={l} className="rounded-2xl bg-eduaid-dark p-4"><dt className="text-xs text-eduaid-sand">{l}</dt><dd className="ea-heading text-2xl text-eduaid-tan">{v}</dd></div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-eduaid-sand">Funding figures are targets, not secured funding.</p>
        </aside>
      </div>
    </section>
  );
};

export const NoticeStrip = () => (
  <div className="border-y border-eduaid-line bg-eduaid-sand">
    <p className="container mx-auto px-4 py-4 text-sm font-medium text-eduaid-ink">{NOMINATION_RULE}</p>
  </div>
);

export const About = () => (
  <Section id="about" eyebrow="About the programme" title="One verified priority school in every region"
    intro={<>
      <p>Support a Special-Needs School Across Africa is a service of Rebuild My School Africa (RMSA), the EduAid-Africa programme that rebuilds and equips schools across the continent. It finds, verifies and supports specialist and inclusive schools that serve learners with disabilities and additional support needs, in every region of Africa.</p>
      <p className="mt-3">Rebuild My School Africa is delivered by EduAid-Africa, the funding and partnerships arm of SCEF. The programme is presented jointly with NESA-Africa, and supported by Friends of EduAid-Africa and the Africa Education Enablers Network.</p>
      <p className="mt-3">The 2027 aim is one verified priority school per region, with a target of US$150,000 per region. These are targets, not secured funding, and any support is {SUPPORT_CONDITION}.</p>
    </>}>
    <p className="mb-6 rounded-2xl border border-eduaid-line bg-eduaid-paper p-4 text-sm"><strong>Not a NESA-Africa award tier.</strong> {NOT_AWARD_TIER}</p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        ["Why it matters", "Many specialist and inclusive schools lack accessible buildings, assistive equipment and trained staff. Targeted, verified support can widen access to learning."],
        ["What we do", "We identify and verify schools, classify their needs, and coordinate approved interventions with sponsors, partners and volunteers."],
        ["Who it serves", "Specialist schools, inclusive mainstream schools, early-intervention centres, resource centres and vocational or transition programmes."],
        ["How you can help", "Nominate a school, donate to the Support Fund, sponsor a region, offer your skills, or join the regional ceremonies."],
      ].map(([t, d]) => <Card key={t}><h3 className="text-xl text-eduaid-dark">{t}</h3><p className="mt-2 text-sm text-eduaid-muted">{d}</p></Card>)}
    </div>
    <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 rounded-[24px] bg-eduaid-deep p-5 text-eduaid-cream">
      {[[Search, "Evidence before support"], [ShieldCheck, "Safeguarding first"], [Scale, "Votes are never sold"], [Users, "Open accountability"]].map(([I, l]) => {
        const Icon = I as typeof Search;
        return <li key={l as string} className="flex items-center gap-3 font-semibold"><Icon className="h-5 w-5 text-eduaid-tan" aria-hidden />{l as string}</li>;
      })}
    </ul>
  </Section>
);

export const FiveWays = () => {
  const { goDonate, goSponsor, goTab } = useSupportIntent();
  const ways = [
    { n: 1, t: "Nominate", time: "Opens April 2027", d: "Put forward a special-needs or inclusive school for verification.", action: <PillLink href={CTAS.nominate.href}>{CTAS.nominate.label}</PillLink> },
    { n: 2, t: "Vote", time: "Opens September 2027*", d: "Free, verified regional voting for approved schools only. Never linked to money.", action: <a href="#vote" className="inline-flex min-h-[44px] items-center rounded-full border-2 border-dashed border-eduaid-line px-4 text-sm font-semibold text-eduaid-muted">{VOTING_LABEL}</a> },
    { n: 3, t: "Donate", time: "Pledges open now", d: "Give to the ring-fenced Support Fund by bank transfer, for a region or where most needed.", action: <button type="button" onClick={() => goDonate()} className="inline-flex min-h-[44px] items-center rounded-full bg-eduaid-green px-5 text-sm font-semibold text-eduaid-paper">{CTAS.donate.label}</button> },
    { n: 4, t: "Sponsor", time: "US$150,000 per region", d: "Sponsor a whole region, a share, a verified school or a specific project.", action: <button type="button" onClick={() => goSponsor("sponsor")} className="inline-flex min-h-[44px] items-center rounded-full bg-eduaid-green px-5 text-sm font-semibold text-eduaid-paper">{CTAS.sponsor.label}</button> },
    { n: 5, t: "Attend", time: "October–December 2027", d: "Join EduTourism 2027 and the Regional Grant Awarding and Commissioning Ceremonies.", action: <button type="button" onClick={() => goTab("attend")} className="inline-flex min-h-[44px] items-center rounded-full border border-eduaid-green px-5 text-sm font-semibold text-eduaid-dark">Register interest</button> },
  ];
  return (
    <Section eyebrow="Five ways to take part" title="Nominate · Vote · Donate · Sponsor · Attend">
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {ways.map((w) => (
          <Card key={w.t} className="flex flex-col">
            <p className="text-xs font-bold text-eduaid-brown">{w.n} · {w.time}</p>
            <h3 className="mt-2 text-2xl text-eduaid-dark">{w.t}</h3>
            <p className="mt-2 flex-1 text-sm text-eduaid-muted">{w.d}</p>
            <div className="mt-4">{w.action}</div>
          </Card>
        ))}
      </div>
      <p className="mt-3 text-xs text-eduaid-muted">* {VOTING_LABEL}.</p>
      {CAMPAIGN_VIDEOS.fiveWays && <div className="mt-8 max-w-3xl"><ClickToLoadVideo id={CAMPAIGN_VIDEOS.fiveWays} title="Five ways to take part" illustrative /></div>}
    </Section>
  );
};

export const Watch = () => (
  <Section eyebrow="Watch" title="Special needs education and EduAid-Africa">
    <div className="grid md:grid-cols-2 gap-6">
      <ClickToLoadVideo id={YOUTUBE.specialNeeds} title="Special Needs Education" />
      <ClickToLoadVideo id={YOUTUBE.eduaid} title="EduAid-Africa" />
    </div>
  </Section>
);

const ICONS: Record<CategoryIcon, typeof Eye> = { eye: Eye, ear: Ear, accessibility: Accessibility, puzzle: Puzzle, "message-circle": MessageCircle, brain: Brain, layers: Layers, sprout: Sprout };

export const Categories = () => (
  <Section id="categories" eyebrow="Eight categories" title="Which schools can be nominated">
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {CATEGORIES.map((c, i) => {
        const Icon = ICONS[c.icon];
        return (
          <article key={c.title} className="overflow-hidden rounded-[20px] border border-eduaid-line bg-eduaid-paper">
            <figure className="relative aspect-[4/3]">
              {c.image ? (
                <img src={c.image.src} alt={c.image.alt} loading="lazy" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center" style={{ background: `linear-gradient(135deg, ${c.color}, #123A16)` }}>
                  <Icon className="h-14 w-14 text-eduaid-cream" aria-hidden />
                </div>
              )}
              <figcaption className="absolute left-3 top-3 rounded-full bg-eduaid-paper/90 px-2 py-0.5 text-[11px] font-semibold text-eduaid-ink">
                Illustrative image{c.image?.credit ? ` · ${c.image.credit}` : ""}
              </figcaption>
            </figure>
            <div className="p-5">
              <p className="text-xs font-bold text-eduaid-brown">Category {i + 1}</p>
              <h3 className="mt-1 text-lg leading-snug text-eduaid-dark">{c.title}</h3>
              <p className="mt-2 text-sm text-eduaid-muted">{c.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">{c.tags.map((t) => <Chip key={t}>{t}</Chip>)}</div>
              {CAT_VIDEOS[i] && <div className="mt-4"><ClickToLoadVideo id={CAT_VIDEOS[i]} title={c.title} illustrative /></div>}
            </div>
          </article>
        );
      })}
    </div>
    <p className="mt-6 rounded-2xl border-l-4 border-eduaid-tan bg-eduaid-sand p-4 text-sm">{CATEGORY_RULE}</p>
  </Section>
);
