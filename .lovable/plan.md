# CSR Education Funds Management Rebrand

Reposition SCEF as a **membership-based Pan-African NGO and CSR Education Funds Management organization** without removing any existing programs.

## What gets built

### 1. New page — `/csr-education-funds-management`
A full institutional page with the 8 sections you specified:

1. **What We Do** — fund management intro copy.
2. **Who We Serve** — 9 audience chips (companies, corporate foundations, donors, diaspora, Friends of Africa, schools, local governments, NGOs, SCEF members & chapters).
3. **How CSR Education Funds Are Used** — 10 use-of-funds cards mapped to existing programs.
4. **Our Fund Management Process** — 6-step horizontal timeline (inquiry → selection → design → implementation → monitoring → impact report).
5. **Recognition-to-Impact Model** — NESA-Africa visibility ↔ EduAid-Africa delivery.
6. **Transparency and Accountability** — exact copy you provided, no audit/UN/AU claims.
7. **CSR Partnership Options** — 10 sponsor cards (Scholarships, Adopt a School, Teacher Training, Vocational Skills, Girls Education, Digital Learning, Green Horizon, My Career My Life, Local Chapter Projects, NESA-Africa Recognition).
8. **CTA Section** — "Turn Your CSR Budget Into Measurable Education Impact" with three CTAs to `/csr-partnership`, `/sponsorship`, `/adopt-a-school`.

Route registered in `App.tsx`. Real photos only, `scef-blue-darker` + `scef-gold` tokens.

### 2. Homepage hero rewrite (`LandingHero`)
- Headline: **"Managing CSR Education Funds for Real Impact Across Africa"**
- Subheadline: the membership-based Pan-African NGO copy.
- Primary CTA: "Partner With SCEF" → `/csr-partnership`
- Secondary CTA: "Support Education Funds" → `/donate`
- Quick-links row under hero: Sponsor a Program · Adopt a School · Fund Scholarships · Join as a Member · Start a Local Chapter

### 3. New homepage section — "CSR Education Funds Management"
Inserted after `WhoWeAre`. Short copy + 4 cards (Fund Scholarships, Adopt a School, Sponsor Capacity Training, Support Community Projects) + main CTA → `/csr-education-funds-management`.

### 4. Main navigation update
Replace primary nav with:
About SCEF · CSR Funds Management · Programs · Impact · Local Chapters · Get Involved · Contact

**Get Involved** dropdown items: Become a Member · Volunteer · Internship · Donate · Sponsor a Program · Adopt a School · Join a Project · Start / Join Local Chapter · Diaspora Africa · Friends of Africa.

The existing governance navbar (BOT · BOA · BOD · LCPs · Management Team) stays unchanged.

### 5. Footer — new "CSR & Funding" column
Links: CSR Education Funds Management · Sponsor a Program · Adopt a School · Fund Scholarships · Request Partnership Proposal · Impact Reports.

### 6. Program repositioning intros
Add a 1–2 sentence CSR-fund framing paragraph at the top of each existing program page (no content removal, no card deletion):
EduAid-Africa, NESA-Africa, Rebuild My School Africa, Send a Child to School, My Career My Life, eLibrary Africa, Women & Girls Empowerment, Green Horizon Initiative.

## What I will NOT do

- Will not delete or hide any existing program, section, route, or component.
- Will not invent partner logos, audited figures, or UN / AU / UNESCO / UNICEF / GPE endorsements.
- Will not add `/csr-partnership`, `/donate`, `/sponsorship`, `/adopt-a-school` as new pages — I'll reuse whichever routes already exist and only register lightweight redirects/aliases for the ones that don't, so no CTA dead-ends. (Anything missing I'll list back to you.)
- Will not change the 9-language LocaleContext keys — new strings will be inline English only this round (translation pass can follow).

## Technical notes

- New file: `src/pages/CsrEducationFundsManagement.tsx`
- New file: `src/components/sections/CsrFundsManagementSection.tsx` (homepage block)
- Edited: `src/components/sections/LandingHero.tsx`, `src/components/layout/Footer.tsx`, the primary header nav component, `src/App.tsx`, plus the 8 program page intros.
- Tokens: `bg-scef-blue-darker`, `text-scef-gold`, `bg-scef-pattern` — no hardcoded hex.
- All metrics on the new page use neutral language ("Reporting in progress" placeholders where numbers would normally appear).

## Open question before I start

Two of the destination routes you named don't clearly exist yet: **`/csr-partnership`** and **`/adopt-a-school`**. Three options:

- (A) Point CTAs to the existing `/partner-with-us` and `/programs/rebuild-my-school-africa` pages (fastest, no dead links, no scope creep).
- (B) Create thin landing pages at the new URLs that reuse existing content.
- (C) Create full new pages for each (separate larger task).

I'll default to **(A)** unless you say otherwise — reply with B or C if you want new routes built in this same pass.
