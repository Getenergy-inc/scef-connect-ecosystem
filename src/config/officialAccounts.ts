export type Currency = "NGN" | "USD" | "GBP" | "EUR";

export type AccountGroupId = "scef" | "eduaid" | "nesa" | "gfa";

export interface BankAccount {
  currency: Currency;
  currencyLabel: string;
  accountType?: string;
  accountNumber: string;
  purpose: string;
  /** Optional per-account bank override. Falls back to group.bank when omitted. */
  bank?: string;
}

export interface AccountGroup {
  id: AccountGroupId;
  name: string;
  shortName: string;
  bank: string;
  tagline: string;
  recommendedUse: string[];
  ctas: { label: string; to: string }[];
  accounts: BankAccount[];
}

export const officialAccounts: AccountGroup[] = [
  {
    id: "scef",
    name: "Santos Creations Educational Foundation",
    shortName: "SCEF Foundation",
    bank: "Providus Bank",
    tagline:
      "General foundation donations, membership, advocacy, local chapters, ESG, health education, teacher wellbeing, volunteers and institutional partnerships.",
    recommendedUse: [
      "Membership fees",
      "Ambassador registration",
      "Advocacy campaigns",
      "Local chapter support",
      "ESG & sustainability programs",
      "Health education advocacy",
      "Volunteer & internship support",
      "Teacher wellbeing initiatives",
      "General foundation donations",
      "Institutional partnerships",
    ],
    ctas: [
      { label: "Pay Membership Fee", to: "/membership" },
      { label: "Support SCEF", to: "/wallet/donate?fund=scef" },
      { label: "Sponsor Advocacy Campaign", to: "/wallet/donate?fund=advocacy" },
      { label: "Support Local Chapters", to: "/chapters" },
    ],
    accounts: [
      { currency: "NGN", currencyLabel: "NGN / Naira", accountType: "Current", accountNumber: "1309631669", purpose: "Main Foundation Account" },
      { currency: "USD", currencyLabel: "USD / US Dollar", accountType: "Current", accountNumber: "1309632525", purpose: "International Donations & Partnerships" },
      { currency: "GBP", currencyLabel: "GBP / Pound Sterling", accountType: "Current", accountNumber: "1309632491", purpose: "UK & Global Support" },
      { currency: "EUR", currencyLabel: "EUR / Euro", accountType: "Current", accountNumber: "1309632501", purpose: "European Donations & Partnerships" },
    ],
  },
  {
    id: "eduaid",
    name: "EduAid Africa Ltd",
    shortName: "EduAid-Africa",
    bank: "Providus Bank",
    tagline:
      "Scholarships, Send a Child to School, Rebuild My School Africa, teacher training, girls education, eLibrary Africa, My Career My Life, and education support programs.",
    recommendedUse: [
      "Scholarships",
      "Send a Child to School",
      "Teacher training",
      "School rebuilding",
      "Digital learning",
      "eLibrary Africa",
      "Girls & women education",
      "TVET & vocational support",
      "My Career, My Life",
      "EduAid webinars & training",
      "EduTourism Missions",
    ],
    ctas: [
      { label: "Support EduAid-Africa", to: "/wallet/donate?fund=eduaid" },
      { label: "Send a Child to School", to: "/wallet/donate?fund=scholarships" },
      { label: "Adopt a School", to: "/wallet/donate?fund=rmsa" },
      { label: "Sponsor Teacher Training", to: "/wallet/donate?fund=training" },
    ],
    accounts: [
      { currency: "NGN", currencyLabel: "NGN / Naira", accountNumber: "1305744507", purpose: "Scholarships & Education Support" },
      { currency: "USD", currencyLabel: "USD / US Dollar", accountNumber: "1307264500", purpose: "International Education Support" },
      { currency: "EUR", currencyLabel: "EUR / Euro", accountNumber: "1307264531", purpose: "European Education Funding" },
      { currency: "GBP", currencyLabel: "GBP / Pound Sterling", accountNumber: "1307264548", purpose: "UK Education Support" },
    ],
  },
  {
    id: "nesa",
    name: "New Education Standards Award",
    shortName: "NESA-Africa",
    bank: "Providus Bank",
    tagline:
      "NESA-Africa sponsorship, Blue Garnet Awards Gala, award nominations, NESA TV, gala tickets, media, CSR awards, and education recognition campaigns.",
    recommendedUse: [
      "NESA-Africa sponsorship",
      "Award gala tickets",
      "Nomination support",
      "Exhibition booths",
      "Media partnerships",
      "NESA TV",
      "Blue Garnet Awards Gala",
      "Education recognition campaigns",
      "CSR for Education sponsorships",
    ],
    ctas: [
      { label: "Sponsor NESA-Africa", to: "/wallet/donate?fund=nesa-africa" },
      { label: "Buy Gala Ticket", to: "/wallet/donate?fund=gala-tickets" },
      { label: "Support NESA TV", to: "/wallet/donate?fund=nesa-tv" },
      { label: "Partner With NESA-Africa", to: "/partner-with-us" },
    ],
    accounts: [
      { currency: "NGN", currencyLabel: "NGN / Naira", accountNumber: "1305476015", purpose: "NESA Operations & Gala" },
      { currency: "USD", currencyLabel: "USD / US Dollar", accountNumber: "1305486988", purpose: "International Sponsorship" },
      { currency: "GBP", currencyLabel: "GBP / Pound Sterling", accountNumber: "1305532926", purpose: "UK Sponsorship & Partnerships" },
      { currency: "EUR", currencyLabel: "EUR / Euro", accountNumber: "1305532933", purpose: "European Sponsorship & Support" },
    ],
  },
  {
    id: "gfa",
    name: "GFA WZIP Technology Limited",
    shortName: "GFA Wallet / Technology",
    bank: "Providus Bank",
    tagline:
      "Digital infrastructure, wallet systems, voting systems, website platforms, EdTech, API, hosting, and technology support.",
    recommendedUse: [
      "GFA Wallet systems",
      "Digital learning infrastructure",
      "Website & platform development",
      "Voting systems",
      "API & hosting infrastructure",
      "EdTech innovation",
      "Technology support for SCEF ecosystem",
    ],
    ctas: [
      { label: "Support Digital Innovation", to: "/wallet/donate?fund=gfa" },
      { label: "Fund GFA Wallet", to: "/wallet/donate?fund=gfa-wallet" },
      { label: "Support Platform Development", to: "/wallet/donate?fund=platform" },
    ],
    accounts: [
      { currency: "NGN", currencyLabel: "NGN / Naira", accountNumber: "1308235448", purpose: "Technology & Digital Infrastructure" },
    ],
  },
];

export const accountGroupById = (id: AccountGroupId) =>
  officialAccounts.find((g) => g.id === id)!;

export interface PaymentPurpose {
  label: string;
  groups: AccountGroupId[];
}

export const paymentPurposes: PaymentPurpose[] = [
  { label: "SCEF Donation", groups: ["scef"] },
  { label: "Membership", groups: ["scef"] },
  { label: "Ambassador Registration", groups: ["scef"] },
  { label: "Local Chapter Support", groups: ["scef"] },
  { label: "Advocacy Campaign", groups: ["scef"] },
  { label: "EduAid-Africa Scholarship", groups: ["eduaid"] },
  { label: "Send a Child to School", groups: ["eduaid"] },
  { label: "Rebuild My School Africa", groups: ["eduaid"] },
  { label: "Training / Webinar", groups: ["eduaid"] },
  { label: "NESA-Africa Sponsorship", groups: ["nesa"] },
  { label: "Gala Ticket", groups: ["nesa"] },
  { label: "NESA TV Support", groups: ["nesa"] },
  { label: "CSR Partnership", groups: ["nesa", "scef"] },
];

export const SOPHIA_PAYMENT_WHATSAPP =
  "https://wa.me/2348109765897?text=Hello%20Sophia%2C%20I%20need%20help%20with%20payment%20on%20santoscreations.org";
