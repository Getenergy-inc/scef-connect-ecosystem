import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { officialAccounts } from "@/config/officialAccounts";

const schema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(5).max(40),
  paymentMethod: z.string().min(1),
  purpose: z.string().min(1),
  program: z.string().min(1),
  amount: z.string().min(1).max(20),
  currency: z.string().min(1),
  account: z.string().min(1),
  paidOn: z.string().min(1),
  bankOrWallet: z.string().min(1),
  notes: z.string().max(800).optional(),
});

const paymentMethods = ["Providus Bank Direct Transfer", "GFA Wallet"];

const purposes = [
  "SCEF Donation",
  "Membership",
  "Ambassador Registration",
  "Local Chapter Support",
  "Advocacy Campaign",
  "EduAid-Africa Scholarship",
  "Send a Child to School",
  "Rebuild My School Africa",
  "Training / Webinar",
  "NESA-Africa Sponsorship",
  "Gala Ticket",
  "NESA TV Support",
  "CSR Partnership",
  "Other",
];

export default function PaymentConfirmationForm() {
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const fd = new FormData(form);
        const data = Object.fromEntries(fd.entries());
        const result = schema.safeParse(data);
        if (!result.success) {
          toast.error(result.error.issues[0]?.message || "Please complete all required fields");
          return;
        }
        if (file && file.size > 5 * 1024 * 1024) {
          toast.error("Receipt must be smaller than 5MB");
          return;
        }
        setSubmitting(true);
        // Local-only acknowledgement; backend wiring can be added later.
        setTimeout(() => {
          toast.success("Thank you. Your payment confirmation has been received.");
          form.reset();
          setFile(null);
          setSubmitting(false);
        }, 600);
      }}
      className="grid sm:grid-cols-2 gap-4"
    >
      <Field name="fullName" label="Full Name" />
      <Field name="email" label="Email" type="email" />
      <Field name="phone" label="Phone" />
      <Select name="purpose" label="Payment Purpose" options={purposes} />
      <Select
        name="program"
        label="Program"
        options={officialAccounts.map((g) => g.shortName)}
      />
      <Field name="amount" label="Amount Paid" />
      <Select name="currency" label="Currency" options={["NGN", "USD", "GBP", "EUR"]} />
      <Field name="account" label="Account Paid Into (last 4 digits)" />
      <Field name="paidOn" label="Date of Payment" type="date" />
      <div className="sm:col-span-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Upload Payment Receipt (optional, max 5MB)
        </label>
        <label className="mt-1 flex items-center gap-2 cursor-pointer rounded-lg border-2 border-dashed border-border bg-background px-4 py-3 text-sm hover:border-scef-gold/50">
          <Upload className="h-4 w-4 text-scef-gold-dark" />
          <span className="text-muted-foreground">
            {file ? file.name : "Choose file (PDF, JPG, PNG)"}
          </span>
          <input
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </label>
      </div>
      <div className="sm:col-span-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Additional Notes
        </label>
        <textarea
          name="notes"
          rows={3}
          maxLength={800}
          className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-scef-gold"
        />
      </div>
      <div className="sm:col-span-2 flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-lg bg-scef-blue-darker px-6 py-3 text-sm font-semibold text-white hover:bg-scef-blue disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "I Have Paid — Submit Confirmation"}
        </button>
        <a
          href="https://wa.me/2348109765897"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg border-2 border-scef-blue-darker px-6 py-3 text-sm font-semibold text-scef-blue-darker hover:bg-scef-blue-darker hover:text-white"
        >
          WhatsApp Support
        </a>
        <a
          href="mailto:support@santoscreations.org"
          className="inline-flex items-center justify-center rounded-lg border-2 border-border px-6 py-3 text-sm font-semibold text-scef-blue-darker hover:bg-muted"
        >
          Email Support
        </a>
      </div>
    </form>
  );
}

function Field({ name, label, type = "text" }: { name: string; label: string; type?: string }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required
        className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-scef-gold"
      />
    </div>
  );
}

function Select({ name, label, options }: { name: string; label: string; options: string[] }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <select
        name={name}
        required
        defaultValue=""
        className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-scef-gold"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
