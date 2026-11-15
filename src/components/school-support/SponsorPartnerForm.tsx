import { FormEvent, useEffect, useId, useState } from "react";
import { z } from "zod";
import {
  CURRENCIES, Currency, PARTNER_CONTRIBUTIONS, PAYMENT_NOTICE, REGIONS, SPONSOR_PRESETS_USD, SPONSOR_PROJECTS, SPONSOR_SCOPES,
  SUPPORT_CONDITION, regionByKey,
} from "@/config/schoolSupport";
import { makeReference } from "@/lib/supportFundReference";
import { createPledge } from "@/services/supportFundService";
import { SponsorMode, useSupportIntent } from "./SupportIntentContext";
import { BankTransferPanel } from "./DonateForm";
import { ChipToggle, Notice, PillButton, fieldClass, fmtMoney, labelClass } from "./ui";

const schema = z.object({
  organisation: z.string().trim().min(1, "Please enter the organisation").max(200),
  contact: z.string().trim().min(1, "Please enter a contact person").max(200),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().max(3000),
  acknowledged: z.literal(true, { errorMap: () => ({ message: "Please confirm the acknowledgement" }) }),
});

const toggle = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

export const SponsorPartnerForm = () => {
  const uid = useId();
  const intent = useSupportIntent();
  const [mode, setMode] = useState<SponsorMode>(intent.sponsorMode);
  const [scope, setScope] = useState("whole-region");
  const [projects, setProjects] = useState<string[]>([]);
  const [region, setRegion] = useState<string>(intent.sponsorRegion ?? "any");
  const [regionsOfInterest, setRegionsOfInterest] = useState<string[]>([]);
  const [contributions, setContributions] = useState<string[]>([]);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [value, setValue] = useState<number | "other">(150000);
  const [otherValue, setOtherValue] = useState("");
  const [inKind, setInKind] = useState("");
  const [recognition, setRecognition] = useState("");
  const [noRecognition, setNoRecognition] = useState(false);
  const [f, setF] = useState({ organisation: "", organisation_type: "Company", contact: "", role: "", email: "", phone: "", country: "", site: "", message: "", hp: "" });
  const [ack, setAck] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ ref: string; monetary: boolean; amount?: number } | null>(null);

  useEffect(() => {
    if (!intent.sponsorNonce) return;
    setMode(intent.sponsorMode);
    if (intent.sponsorRegion) {
      setRegion(intent.sponsorRegion);
      if (intent.sponsorRegion !== "any") setRegionsOfInterest((l) => (l.includes(intent.sponsorRegion!) ? l : [...l, intent.sponsorRegion!]));
    }
  }, [intent.sponsorNonce, intent.sponsorMode, intent.sponsorRegion]);

  const isSponsor = mode === "sponsor";
  const amount = value === "other" ? Number(otherValue) : value;
  const monetary = isSponsor && scope !== "in-kind";
  const submitLabel = isSponsor ? "Sponsor a Regional School" : "Become a Programme Partner";

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (f.hp) return;
    const parsed = schema.safeParse({ ...f, acknowledged: ack });
    const errs: Record<string, string> = parsed.success ? {} : Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message]));
    if (monetary && !(amount > 0)) errs.amount = "Please choose or enter a value";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setBusy(true);
    const ref = makeReference(isSponsor ? "SP" : "PT");
    try {
      await createPledge({
        reference: ref, pledge_type: mode, currency: monetary ? currency : null, amount: monetary ? amount : null,
        region: isSponsor ? region : null, sponsor_scope: isSponsor ? scope : null, projects: isSponsor ? projects : [],
        contributions: isSponsor ? [] : contributions, regions_of_interest: isSponsor ? [] : regionsOfInterest,
        in_kind_description: isSponsor && scope === "in-kind" ? inKind.slice(0, 2000) : null,
        recognition_name: isSponsor && !noRecognition ? recognition.slice(0, 200) || null : null, no_recognition: isSponsor && noRecognition,
        name: f.contact.trim(), organisation: f.organisation.trim(), organisation_type: f.organisation_type, role: f.role || null,
        email: f.email.trim(), phone: f.phone || null, country: f.country || null, website: f.site || null, message: f.message || null,
        acknowledged: true,
      });
      setDone({ ref, monetary, amount: monetary ? amount : undefined });
    } catch (x) { setErrors({ form: (x as Error).message }); } finally { setBusy(false); }
  };

  if (done) {
    return (
      <div role="status" aria-live="polite" className="rounded-[24px] border border-eduaid-line bg-eduaid-paper p-5 md:p-7 space-y-5">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-eduaid-brown">Thank you · expression of interest recorded</p>
        <h3 className="text-2xl text-eduaid-dark">Your reference is {done.ref}</h3>
        <p className="text-sm text-eduaid-muted">Our partnerships team will contact you to agree the scope in writing. Any support is {SUPPORT_CONDITION}. You are listed as a sponsor or partner only after a written agreement or verified contribution.</p>
        {done.monetary && (
          <div>
            <h4 className="ea-heading text-lg text-eduaid-dark mb-2">When your agreement is confirmed, pay by bank transfer</h4>
            <BankTransferPanel currency={currency} amount={done.amount} reference={done.ref} />
          </div>
        )}
        <Notice>{PAYMENT_NOTICE}</Notice>
        <PillButton variant="outline" onClick={() => { setDone(null); setAck(false); }}>Submit another form</PillButton>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate aria-label={submitLabel} className="rounded-[24px] border border-eduaid-line bg-eduaid-paper p-5 md:p-7 space-y-6">
      <div role="radiogroup" aria-label="Form mode" className="inline-flex flex-wrap rounded-full border border-eduaid-line p-1 bg-eduaid-sand">
        {(["sponsor", "partner"] as const).map((m) => (
          <button key={m} type="button" role="radio" aria-checked={mode === m} onClick={() => setMode(m)}
            className={`rounded-full px-4 py-2 text-sm font-semibold min-h-[40px] ${mode === m ? "bg-eduaid-green text-eduaid-paper" : "text-eduaid-ink"}`}>
            {m === "sponsor" ? "Sponsor a Regional School" : "Become a Programme Partner"}
          </button>
        ))}
      </div>

      {isSponsor ? (
        <>
          <fieldset>
            <legend className={labelClass}>What would you like to sponsor?</legend>
            <div className="grid sm:grid-cols-2 gap-2">
              {SPONSOR_SCOPES.map((s) => (
                <label key={s.value} className="flex items-center gap-2 rounded-xl border border-eduaid-line px-3 py-2 text-sm">
                  <input type="radio" name="sponsor_scope" value={s.value} checked={scope === s.value} onChange={() => setScope(s.value)} className="accent-eduaid-green" />{s.label}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className={labelClass}>Projects (optional)</legend>
            <div className="grid sm:grid-cols-2 gap-2">
              {SPONSOR_PROJECTS.map((p) => (
                <label key={p} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="projects" value={p} checked={projects.includes(p)} onChange={() => setProjects(toggle(projects, p))} className="accent-eduaid-green" />{p}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className={labelClass}>Region</legend>
            <div className="flex flex-wrap gap-2">
              <ChipToggle pressed={region === "any"} onClick={() => setRegion("any")}>Where most needed</ChipToggle>
              {REGIONS.map((r) => <ChipToggle key={r.key} color={r.color} pressed={region === r.key} onClick={() => setRegion(r.key)}>{r.name}</ChipToggle>)}
            </div>
          </fieldset>
          {scope !== "in-kind" ? (
            <fieldset>
              <legend className={labelClass}>Value</legend>
              <div className="flex flex-wrap gap-2 mb-3">{CURRENCIES.map((cur) => <ChipToggle key={cur} pressed={currency === cur} onClick={() => { setCurrency(cur); setValue(cur === "USD" ? 150000 : "other"); }}>{cur}</ChipToggle>)}</div>
              {currency === "USD" && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SPONSOR_PRESETS_USD.map((v) => <ChipToggle key={v} pressed={value === v} onClick={() => setValue(v)}>{v === 150000 ? "150,000 · full region" : v.toLocaleString("en-GB")}</ChipToggle>)}
                  <ChipToggle pressed={value === "other"} onClick={() => setValue("other")}>Other value</ChipToggle>
                </div>
              )}
              {value === "other" && (
                <div className="mt-3">
                  <label htmlFor={`${uid}-val`} className={labelClass}>Value ({currency})</label>
                  <input id={`${uid}-val`} name="amount" type="number" min={1} value={otherValue} onChange={(e) => setOtherValue(e.target.value)} className={fieldClass} />
                </div>
              )}
              {errors.amount && <p role="alert" className="mt-1 text-sm text-destructive">{errors.amount}</p>}
              {amount > 0 && <p className="mt-2 text-sm text-eduaid-muted">{fmtMoney(amount, currency)} · {regionByKey(region)?.name ?? "Where most needed"}. This is a target value, not secured funding.</p>}
            </fieldset>
          ) : (
            <div>
              <label htmlFor={`${uid}-inkind`} className={labelClass}>Describe the in-kind support</label>
              <textarea id={`${uid}-inkind`} name="in_kind_description" rows={3} maxLength={2000} value={inKind} onChange={(e) => setInKind(e.target.value)} className={fieldClass} />
            </div>
          )}
          <div className="grid sm:grid-cols-2 gap-4 items-end">
            <div>
              <label htmlFor={`${uid}-recog`} className={labelClass}>Name for recognition</label>
              <input id={`${uid}-recog`} name="recognition_name" maxLength={200} disabled={noRecognition} value={recognition} onChange={(e) => setRecognition(e.target.value)} className={fieldClass} />
            </div>
            <label className="flex items-center gap-2 text-sm pb-2">
              <input type="checkbox" name="no_recognition" checked={noRecognition} onChange={(e) => setNoRecognition(e.target.checked)} className="accent-eduaid-green" />I prefer not to be recognised
            </label>
          </div>
        </>
      ) : (
        <>
          <fieldset>
            <legend className={labelClass}>How would you like to contribute?</legend>
            <div className="grid sm:grid-cols-2 gap-2">
              {PARTNER_CONTRIBUTIONS.map((p) => (
                <label key={p} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="contributions" value={p} checked={contributions.includes(p)} onChange={() => setContributions(toggle(contributions, p))} className="accent-eduaid-green" />{p}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className={labelClass}>Regions of interest</legend>
            <div className="flex flex-wrap gap-2">
              {REGIONS.map((r) => <ChipToggle key={r.key} color={r.color} pressed={regionsOfInterest.includes(r.key)} onClick={() => setRegionsOfInterest(toggle(regionsOfInterest, r.key))}>{r.name}</ChipToggle>)}
            </div>
          </fieldset>
        </>
      )}

      <fieldset className="grid sm:grid-cols-2 gap-4">
        <legend className={`${labelClass} sm:col-span-2`}>Organisation and contact</legend>
        {([
          ["organisation", "Organisation *", "organization"], ["contact", "Contact person *", "name"], ["role", "Role", "organization-title"],
          ["email", "Email *", "email"], ["phone", "Phone", "tel"], ["country", "Country", "country-name"], ["site", "Website", "url"],
        ] as const).map(([k, l, ac]) => (
          <div key={k}>
            <label htmlFor={`${uid}-${k}`} className={labelClass}>{l}</label>
            <input id={`${uid}-${k}`} name={k === "site" ? "website" : k} autoComplete={ac} type={k === "email" ? "email" : k === "phone" ? "tel" : "text"}
              maxLength={k === "email" ? 255 : k === "phone" ? 40 : 200} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} className={fieldClass} aria-invalid={!!errors[k]} />
            {errors[k] && <p role="alert" className="mt-1 text-sm text-destructive">{errors[k]}</p>}
          </div>
        ))}
        <div>
          <label htmlFor={`${uid}-type`} className={labelClass}>Organisation type</label>
          <select id={`${uid}-type`} name="organisation_type" value={f.organisation_type} onChange={(e) => setF({ ...f, organisation_type: e.target.value })} className={fieldClass}>
            {["Company", "Foundation", "Development organisation", "Professional association", "Educational institution", "Media organisation", "Diaspora organisation", "Faith-based or community organisation", "Individual", "Other"].map((x) => <option key={x}>{x}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-msg`} className={labelClass}>Message</label>
          <textarea id={`${uid}-msg`} name="message" rows={4} maxLength={3000} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} className={fieldClass} />
        </div>
      </fieldset>
      <div aria-hidden className="hidden">
        <label htmlFor={`${uid}-hp`}>Leave blank</label>
        <input id={`${uid}-hp`} name="company_url" tabIndex={-1} autoComplete="off" value={f.hp} onChange={(e) => setF({ ...f, hp: e.target.value })} />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" name="acknowledged" required checked={ack} onChange={(e) => setAck(e.target.checked)} className="mt-1 h-4 w-4 accent-eduaid-green" aria-invalid={!!errors.acknowledged} />
          <span>I understand that sponsorship and partnership do not influence verification, voting or NESA-Africa judging, that any support is {SUPPORT_CONDITION}, and that {PAYMENT_NOTICE.charAt(0).toLowerCase() + PAYMENT_NOTICE.slice(1)} *</span>
        </label>
        {errors.acknowledged && <p role="alert" className="mt-1 text-sm text-destructive">{errors.acknowledged}</p>}
      </div>
      <Notice>{PAYMENT_NOTICE}</Notice>
      {errors.form && <p role="alert" className="text-sm text-destructive">{errors.form}</p>}
      <PillButton type="submit" disabled={busy}>{busy ? "Saving…" : submitLabel}</PillButton>
    </form>
  );
};
