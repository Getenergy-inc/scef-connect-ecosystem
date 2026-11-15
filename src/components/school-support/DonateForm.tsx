import { FormEvent, useEffect, useId, useMemo, useState } from "react";
import { z } from "zod";
import {
  BANK_NARRATION_NOTICE, CATEGORIES, CURRENCIES, Currency, DEFAULT_PRESET_INDEX, DONATION_PRESETS, PAYMENT_NOTICE,
  REGIONS, REGION_TARGET_USD, bankFor, regionByKey,
} from "@/config/schoolSupport";
import { makeReference } from "@/lib/supportFundReference";
import { createPledge, reportTransfer } from "@/services/supportFundService";
import { useSupportIntent } from "./SupportIntentContext";
import { ChipToggle, CopyButton, Notice, PillButton, fieldClass, fmtMoney, labelClass } from "./ui";

const FREQUENCIES = [["one-time", "One-time"], ["monthly", "Monthly"], ["annual", "Annual"]] as const;
type Freq = (typeof FREQUENCIES)[number][0];

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(200),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(40),
  country: z.string().trim().max(100),
  amount: z.number({ invalid_type_error: "Please enter an amount" }).positive("Please enter an amount").max(99_999_999),
  acknowledged: z.literal(true, { errorMap: () => ({ message: "Please confirm the acknowledgement" }) }),
});

export const DonateForm = () => {
  const uid = useId();
  const { donateRegion, donateNonce } = useSupportIntent();
  const [frequency, setFrequency] = useState<Freq>("one-time");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [preset, setPreset] = useState<number | "other">(DONATION_PRESETS.USD[DEFAULT_PRESET_INDEX]);
  const [other, setOther] = useState("");
  const [region, setRegion] = useState<string>("any");
  const [category, setCategory] = useState("");
  const [f, setF] = useState({ name: "", donating_as: "Individual", email: "", phone: "", country: "", preferred_contact: "Email", hp: "" });
  const [anonymous, setAnonymous] = useState(false);
  const [ack, setAck] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  useEffect(() => { if (donateNonce) setRegion(donateRegion); }, [donateNonce, donateRegion]);

  const amount = preset === "other" ? Number(other) : preset;
  const reg = regionByKey(region);
  const pct = currency === "USD" && reg && amount > 0 ? (amount / REGION_TARGET_USD) * 100 : null;
  const freqLabel = FREQUENCIES.find(([v]) => v === frequency)![1];

  const changeCurrency = (cur: Currency) => { setCurrency(cur); setPreset(DONATION_PRESETS[cur][DEFAULT_PRESET_INDEX]); };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (f.hp) return; // bot trap
    const parsed = schema.safeParse({ ...f, amount: Number.isFinite(amount) ? amount : NaN, acknowledged: ack });
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({}); setBusy(true);
    const ref = makeReference("DN");
    try {
      await createPledge({
        reference: ref, pledge_type: "donate", frequency, currency, amount, region, category: category || null,
        name: f.name.trim(), donating_as: f.donating_as, email: f.email.trim(), phone: f.phone || null, country: f.country || null,
        preferred_contact: f.preferred_contact, anonymous_public: anonymous, acknowledged: true,
      });
      setReference(ref);
    } catch (err) {
      setErrors({ form: (err as Error).message });
    } finally { setBusy(false); }
  };

  if (reference) return <DonateThankYou reference={reference} currency={currency} amount={amount} frequency={freqLabel} regionName={reg?.name ?? "Where most needed"}
    onAgain={() => { setReference(null); setAck(false); }} />;

  return (
    <form onSubmit={submit} noValidate aria-label="Donate to the Support Fund" className="rounded-[24px] border border-eduaid-line bg-eduaid-paper p-5 md:p-7 space-y-6">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-eduaid-brown">Africa Special Needs Education Support Fund · A Rebuild My School Africa service · 2027</p>

      <fieldset>
        <legend className={labelClass}>Frequency</legend>
        <div className="flex flex-wrap gap-2">{FREQUENCIES.map(([v, l]) => <ChipToggle key={v} pressed={frequency === v} onClick={() => setFrequency(v)}>{l}</ChipToggle>)}</div>
      </fieldset>

      <fieldset>
        <legend className={labelClass}>Currency</legend>
        <div className="flex flex-wrap gap-2">{CURRENCIES.map((cur) => <ChipToggle key={cur} pressed={currency === cur} onClick={() => changeCurrency(cur)}>{cur}</ChipToggle>)}</div>
      </fieldset>

      <fieldset>
        <legend className={labelClass}>Amount</legend>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {DONATION_PRESETS[currency].map((v) => <ChipToggle key={v} pressed={preset === v} onClick={() => setPreset(v)}>{v.toLocaleString("en-GB")}</ChipToggle>)}
          <ChipToggle pressed={preset === "other"} onClick={() => setPreset("other")}>Other amount</ChipToggle>
        </div>
        {preset === "other" && (
          <div className="mt-3">
            <label htmlFor={`${uid}-amount`} className={labelClass}>Other amount ({currency})</label>
            <input id={`${uid}-amount`} name="amount" type="number" inputMode="decimal" min={1} value={other} onChange={(e) => setOther(e.target.value)} className={fieldClass} />
          </div>
        )}
        {errors.amount && <p role="alert" className="mt-1 text-sm text-destructive">{errors.amount}</p>}
      </fieldset>

      <fieldset>
        <legend className={labelClass}>Region</legend>
        <div className="flex flex-wrap gap-2">
          <ChipToggle pressed={region === "any"} onClick={() => setRegion("any")}>Where most needed</ChipToggle>
          {REGIONS.map((r) => <ChipToggle key={r.key} color={r.color} pressed={region === r.key} onClick={() => setRegion(r.key)}>{r.name}</ChipToggle>)}
        </div>
      </fieldset>

      <div>
        <label htmlFor={`${uid}-cat`} className={labelClass}>Category (optional)</label>
        <select id={`${uid}-cat`} name="category" value={category} onChange={(e) => setCategory(e.target.value)} className={fieldClass}>
          <option value="">Any category</option>
          {CATEGORIES.map((c) => <option key={c.title} value={c.title}>{c.title}</option>)}
        </select>
      </div>

      <fieldset className="grid sm:grid-cols-2 gap-4">
        <legend className={`${labelClass} sm:col-span-2`}>Your details</legend>
        <div>
          <label htmlFor={`${uid}-name`} className={labelClass}>Name *</label>
          <input id={`${uid}-name`} name="name" autoComplete="name" required maxLength={200} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className={fieldClass} aria-invalid={!!errors.name} />
          {errors.name && <p role="alert" className="mt-1 text-sm text-destructive">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={`${uid}-as`} className={labelClass}>Donating as</label>
          <select id={`${uid}-as`} name="donating_as" value={f.donating_as} onChange={(e) => setF({ ...f, donating_as: e.target.value })} className={fieldClass}>
            {["Individual", "Family", "Company", "Foundation", "Group or association"].map((x) => <option key={x}>{x}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className={labelClass}>Email *</label>
          <input id={`${uid}-email`} name="email" type="email" autoComplete="email" required maxLength={255} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className={fieldClass} aria-invalid={!!errors.email} />
          {errors.email && <p role="alert" className="mt-1 text-sm text-destructive">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor={`${uid}-phone`} className={labelClass}>Phone / WhatsApp</label>
          <input id={`${uid}-phone`} name="phone" type="tel" autoComplete="tel" maxLength={40} value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} className={fieldClass} />
        </div>
        <div>
          <label htmlFor={`${uid}-country`} className={labelClass}>Country</label>
          <input id={`${uid}-country`} name="country" autoComplete="country-name" maxLength={100} value={f.country} onChange={(e) => setF({ ...f, country: e.target.value })} className={fieldClass} />
        </div>
        <div>
          <label htmlFor={`${uid}-contact`} className={labelClass}>Preferred contact</label>
          <select id={`${uid}-contact`} name="preferred_contact" value={f.preferred_contact} onChange={(e) => setF({ ...f, preferred_contact: e.target.value })} className={fieldClass}>
            {["Email", "Phone", "WhatsApp"].map((x) => <option key={x}>{x}</option>)}
          </select>
        </div>
      </fieldset>
      <div aria-hidden className="hidden">
        <label htmlFor={`${uid}-hp`}>Leave blank</label>
        <input id={`${uid}-hp`} name="company_url" tabIndex={-1} autoComplete="off" value={f.hp} onChange={(e) => setF({ ...f, hp: e.target.value })} />
      </div>

      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" name="anonymous_public" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="mt-1 h-4 w-4 accent-eduaid-green" />
        Keep my name off public lists
      </label>

      <div className="rounded-2xl bg-eduaid-sand p-4 text-sm" aria-live="polite">
        <p className="font-semibold text-eduaid-dark">Summary</p>
        <p>{amount > 0 ? fmtMoney(amount, currency) : `${currency} —`} · {freqLabel} · {reg?.name ?? "Where most needed"}{category ? ` · ${category}` : ""}</p>
        {pct !== null && <p className="mt-1 text-eduaid-muted">That's {pct < 0.01 ? "<0.01" : pct.toFixed(2)}% of the {reg!.name} US$150,000 target.</p>}
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" name="acknowledged" required checked={ack} onChange={(e) => setAck(e.target.checked)} className="mt-1 h-4 w-4 accent-eduaid-green" aria-invalid={!!errors.acknowledged} />
          <span>I understand that this is a pledge to pay by bank transfer. {PAYMENT_NOTICE} *</span>
        </label>
        {errors.acknowledged && <p role="alert" className="mt-1 text-sm text-destructive">{errors.acknowledged}</p>}
      </div>

      <Notice>{PAYMENT_NOTICE} We never ask for card details, PINs, passwords, bank logins or one-time codes.</Notice>
      {errors.form && <p role="alert" className="text-sm text-destructive">{errors.form}</p>}
      <PillButton type="submit" disabled={busy}>{busy ? "Saving…" : "Continue to bank transfer details"}</PillButton>
    </form>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-eduaid-line py-2 last:border-0">
    <span className="text-sm text-eduaid-muted">{label}</span>
    <span className="flex items-center gap-2 font-semibold text-eduaid-ink break-all">{value}<CopyButton value={value} label={label} /></span>
  </div>
);

export const BankTransferPanel = ({ currency, amount, reference }: { currency: Currency; amount?: number; reference: string }) => {
  const b = bankFor(currency);
  return (
    <div className="rounded-2xl border border-eduaid-line p-4">
      <Row label="Account name" value={b.accountName} />
      <Row label="Bank" value={b.bank} />
      <Row label={`${b.currency} account number`} value={b.number} />
      {amount ? <Row label="Amount" value={fmtMoney(amount, currency)} /> : null}
      <Row label="Narration / reference" value={reference} />
      <p className="mt-3 text-sm text-eduaid-muted">{BANK_NARRATION_NOTICE}</p>
    </div>
  );
};

const DonateThankYou = ({ reference, currency, amount, frequency, regionName, onAgain }: {
  reference: string; currency: Currency; amount: number; frequency: string; regionName: string; onAgain: () => void;
}) => {
  const uid = useId();
  const [t, setT] = useState({ date_paid: "", amount_sent: String(amount), sender: "", txn: "" });
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const [err, setErr] = useState("");
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const report = async (e: FormEvent) => {
    e.preventDefault();
    const amt = Number(t.amount_sent);
    if (!t.date_paid || !(amt > 0) || !t.sender.trim()) { setErr("Please fill in the date, amount and name on the sending account."); return; }
    setErr(""); setState("busy");
    try {
      await reportTransfer({ reference, date_paid: t.date_paid, amount_sent: amt, currency, sender_account_name: t.sender.trim().slice(0, 200), bank_transaction_id: t.txn.trim().slice(0, 100) || null });
      setState("done");
    } catch (x) { setErr((x as Error).message); setState("idle"); }
  };

  return (
    <div className="rounded-[24px] border border-eduaid-line bg-eduaid-paper p-5 md:p-7 space-y-6" role="status" aria-live="polite">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-eduaid-brown">Thank you · pledge recorded</p>
        <h3 className="mt-2 text-2xl text-eduaid-dark">Your reference is {reference}</h3>
        <p className="mt-1 text-sm text-eduaid-muted">{fmtMoney(amount, currency)} · {frequency} · {regionName}</p>
      </div>
      <div>
        <h4 className="ea-heading text-lg text-eduaid-dark mb-2">Step 1 · Pay by bank transfer</h4>
        <BankTransferPanel currency={currency} amount={amount} reference={reference} />
      </div>
      <div>
        <h4 className="ea-heading text-lg text-eduaid-dark mb-2">Step 2 · Confirm your transfer</h4>
        {state === "done" ? (
          <p className="rounded-2xl bg-eduaid-sand p-4 font-semibold text-eduaid-dark">Transfer reported · awaiting reconciliation</p>
        ) : (
          <form onSubmit={report} noValidate className="grid sm:grid-cols-2 gap-4" aria-label="Confirm your transfer">
            <div>
              <label htmlFor={`${uid}-date`} className={labelClass}>Date paid *</label>
              <input id={`${uid}-date`} name="date_paid" type="date" max={today} value={t.date_paid} onChange={(e) => setT({ ...t, date_paid: e.target.value })} className={fieldClass} />
            </div>
            <div>
              <label htmlFor={`${uid}-amt`} className={labelClass}>Amount sent ({currency}) *</label>
              <input id={`${uid}-amt`} name="amount_sent" type="number" min={1} value={t.amount_sent} onChange={(e) => setT({ ...t, amount_sent: e.target.value })} className={fieldClass} />
            </div>
            <div>
              <label htmlFor={`${uid}-sender`} className={labelClass}>Name on the sending account *</label>
              <input id={`${uid}-sender`} name="sender_account_name" maxLength={200} value={t.sender} onChange={(e) => setT({ ...t, sender: e.target.value })} className={fieldClass} />
            </div>
            <div>
              <label htmlFor={`${uid}-txn`} className={labelClass}>Bank transaction ID (optional)</label>
              <input id={`${uid}-txn`} name="bank_transaction_id" maxLength={100} value={t.txn} onChange={(e) => setT({ ...t, txn: e.target.value })} className={fieldClass} />
            </div>
            {err && <p role="alert" className="sm:col-span-2 text-sm text-destructive">{err}</p>}
            <div className="sm:col-span-2"><PillButton type="submit" disabled={state === "busy"}>{state === "busy" ? "Saving…" : "Report my transfer"}</PillButton></div>
          </form>
        )}
      </div>
      <div className="rounded-2xl bg-eduaid-sand p-4 text-sm">
        <p className="font-semibold text-eduaid-dark">What happens next</p>
        <p className="mt-1">Our finance team matches your transfer to your reference on the bank statement. Once it is reconciled, we send an official receipt to your email. {PAYMENT_NOTICE}</p>
      </div>
      <PillButton variant="outline" onClick={onAgain}>Make another donation</PillButton>
    </div>
  );
};
