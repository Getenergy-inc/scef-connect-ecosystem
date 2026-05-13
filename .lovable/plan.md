# SCEF Bounce-Rate Reduction Refactor — Phased Plan

Goal: every visitor understands SCEF and reaches a clear action within 5–10 seconds. Shipped in 5 phases so each one is reviewable. No fake metrics, no AI faces, no exaggerated claims.

---

## Phase 1 — Homepage above-the-fold + content order (highest impact)

Rework `src/pages/Home.tsx` into the exact 11-block flow:

1. Hero — headline "Empowering Education. Advancing Health. Sustaining Africa's Future." + subhead + 3 primary CTAs (Become a Member / Donate Now / Sponsor NESA-Africa) + 3 secondary CTAs (Explore Programs / Join a Local Chapter / View Monthly Calendar). Real archive photo with documentary placeholder fallback (no AI faces).
2. Who we are — 3 short lines.
3. Featured Programs grid — 7 cards (EduAid-Africa, NESA-Africa, EOA, eLibrary, My Career My Life, RMSA, Send a Child to School). Each: short copy + Learn More + Support This Program.
4. Monthly Advocacy & Training Calendar dropdown — 12 months Jul 2026 → Jun 2027, each linking to its own page (see Phase 4).
5. Support Options grid — 12 action cards (Phase 2).
6. Real Photos / Volunteers strip — pulls from existing `volunteersArchive` + Contributor Directory teaser.
7. Local Chapters teaser.
8. Partners & Sponsors logo wall.
9. Media: NESA TV / It's In Me Radio teasers.
10. Trust signals strip (governance, registration, bank accounts link, impact reports).
11. Final CTA band.

## Phase 2 — Support Options section

New component `src/components/home/SupportOptionsGrid.tsx` with the 12 cards (Sponsor NESA-Africa, Support My Career My Life, RMSA, Send a Child to School, eLibrary, Seminars & Webinars, Sponsor Advocacy Campaign, Join Advocacy Walk, Merchandise, Gala Ticket, Edu-Tourism, Bid to Host). Each card shows purpose, designated payment account label, single CTA → routes to `/wallet/donate` with `?designation=` param so the GFA Wallet flow pre-selects the right fund. No new payment logic.

## Phase 3 — Navigation + mobile sticky bar

- Simplify `Header.tsx` to the 10 top-level items (Home, About SCEF, Programs, Advocacy & Training, Membership, Local Chapters, Partner, Support, Media, Contact) with mega-menus for Programs / Advocacy & Training / Media. Right-side: Join Now, Donate, Sponsor NESA-Africa.
- Extend existing `StickyMobileJoin.tsx` to a 4-button bar: Join, Donate, Contact, Calendar.
- Add WhatsApp floating button (configurable number).
- Add visitor-path selector "I am a…" with 10 paths (Student, Teacher, School Owner, Donor, Sponsor, Volunteer, Ambassador, CSR Partner, Chapter Leader, Media Partner) → each routes to an existing tailored page (no new landing pages this phase, just smart routing + anchor params).

## Phase 4 — Monthly calendar pages

For each of the 12 months (Jul 2026 – Jun 2027) add a route under `/advocacy/monthly/:slug` driven by a config file `src/config/monthlyAdvocacyCalendar.ts`. One shared template page reads the slug. Each entry: title, theme blurb, agenda placeholder ("Reporting in progress" if not finalised), register CTA → existing webinar registration form, related program link, sponsor CTA. No 12 separate page files.

## Phase 5 — Trust, performance, exit prevention

- Trust strip component reused on every key page (governance link, registration info, bank-account disclosure link, impact reports link, partner logos).
- Page-CTA contract: add a small `<PageFooterCTA primary secondary trust related support />` component and drop it into the major program pages (NESA, EduAid, RMSA, EOA, eLibrary, My Career, Send a Child).
- Performance pass: convert hero + program card images to `loading="lazy"` + explicit width/height, preload only the LCP hero image in `index.html`, defer non-critical scripts, ensure no framer-motion on homepage (already a Core rule).
- "Not sure where to start?" guide card on Home + 404 + Contact.
- Newsletter signup + Download Brochure CTA in footer area.
- Analytics: add a tiny `src/lib/analytics.ts` event helper (no provider wired yet — emits `dataLayer.push` so GA4 / GTM can be added later by pasting one script tag in `index.html`). Instrument the primary CTAs, calendar dropdown, support cards, donation clicks.

---

## Out of scope (call out honestly)
- No guaranteed bounce-rate %. We design for it; we don't promise it.
- No new real photos created — placeholder-first system already in place; real photos drop into `src/assets/photos/...` and `contributorsDirectory.ts` / `volunteersArchive.ts` when supplied.
- No GA4 / Search Console / heatmap account setup — we wire the hooks; you paste the IDs.
- No payment provider changes — existing GFA Wallet routes are reused via `?designation=` params.

## Technical notes
- All new colors via tokens (`scef-blue-darker`, `scef-gold`, `bg-scef-pattern`).
- All copy via `LocaleContext` keys (EN seeded; other 8 languages fall back).
- New files (Phase 1–2): `src/components/home/HomeHero.tsx`, `WhoWeAre.tsx`, `FeaturedPrograms.tsx`, `MonthlyCalendarDropdown.tsx`, `SupportOptionsGrid.tsx`, `TrustSignalsStrip.tsx`, `VisitorPathSelector.tsx`, `FinalCTA.tsx`.
- New config: `src/config/monthlyAdvocacyCalendar.ts`, `src/config/supportOptions.ts`, `src/config/featuredPrograms.ts`.
- Edits: `src/pages/Home.tsx`, `src/components/layout/Header.tsx`, `src/components/layout/StickyMobileJoin.tsx`, `src/App.tsx` (one new route), `index.html` (LCP preload).

---

## Suggested order
Ship Phase 1 + 2 together (visible homepage transformation), review, then Phase 3, then 4, then 5. Reply with **"Start Phase 1+2"** to begin, or tell me to reorder / drop phases.
