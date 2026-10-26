# SCEF Connect Ecosystem — Phase 1 Audit Report (no files changed)

Scope note: this audit used the code only. The database could not be reached this turn, so live rows, live security policies and storage settings are taken from migration files and are **unverified against production**. Phase 2 starts by re-checking them.

## 1. Route inventory (243 route entries in `src/App.tsx`)

There are no route-level guards in `App.tsx`. Access is checked inside each page (15 pages call `useUserRole`/`has_role`). So "admin" below means the page checks itself; the URL still loads for everyone.

| Group | Routes | Access | Purpose / data |
|---|---|---|---|
| Core | `/`, `/welcome`, `/welcome-classic`, `/about`, `/about/history(/:year)`, `/about/vision-2037`, `/contact`, `/help`, `/sitemap`, `/accessibility` | Public | Home, About, history timeline (`data/scefHistoryTimeline.ts`), locale files |
| Programmes | `/programs`, `/programs/nesa-africa` (+ timelines), `/programs/eduaid-africa` (+ teacher corps, webinar-register), `/programs/rebuild-my-school-africa`, `/programs/women-girls-education`, `/programs/special-needs-education`, `/programs/elibrary-nigeria`, `/programs/digital-learning`, `/programs/my-career-my-life`, `/programs/green-horizon-initiative`, `/programs/school-wash`, `/programs/send-a-child-to-school`, plus 8 more; short aliases `/nesa-africa`, `/eduaid-africa`, `/rebuild-my-school-africa`, `/elibrary-africa` | Public | Static config + locale text; waitlist tables |
| NESA awards | `/awards/*`, `/vote`, `/nominate`, `/categories(/:slug)`, `/hall-of-fame(/:slug)`, `/verify-certificate` | Public | `nesaSeasonConfig.ts`, `nesaCategoriesConfig.ts`, `hall_of_fame_profiles` |
| Media | `/media`, `/media/nesa-tv`, `/media/nesa-awards-tv/*` (incl. `blue-garnet-gala`), `/media/its-in-me-radio`, `/media/eduaid-webinars`, `/media/archive`, `/media/gallery`, `/media/submit`, `/media/my-submissions` | Public; submit = signed in | Media CMS tables, `media-uploads` bucket |
| Chapters / regions | `/local-chapters`, `/chapters(/:slug)`, `/local-chapters/region/:regionSlug`, `/local-chapters/country/:countrySlug`, `/regions/:slug`, `/diaspora-africa`, `/friends-of-africa`, `/regional-coverage` | Public | Central regions data file, `chapters` |
| Get involved | `/get-involved/*`, `/join`, `/membership`, `/volunteer`, `/ambassador*`, `/internship`, `/register` | Public; sign-up | Unified registration wizard, profiles |
| Money | `/donate`, `/wallet`, `/wallet/donate`, `/support-us/*` (incl. `gala-tickets`, `merchandise`, `bid-to-host`), `/payments`, `/csr-*`, `/adopt-a-school`, `/sponsorship` | Public | GFA Wallet, donations, official accounts config |
| Scholarship | `/scholarship/*` | Public apply; exam = signed in | `scholarship-exam` function, `scholarship-docs` bucket |
| Governance | `/governance`, `/divisions(/*)`, `/partners`, `/partner-with-us`, `/impact`, `/transparency`, `/reports`, `/resources/organizational-profile`, `/certifications`, `/vacancies`, `/our-divisions-vacancies`, `/privacy`, `/terms` | Public | `governance_profiles`, `impact_metrics`, vacancy tables |
| Members | `/dashboard/*`, `/messages(/:roomId)`, `/chapter/inbox`, `/decisions`, `/portal/*` (jury, nrc, ambassador, chapter-admin, sponsor), `/staff/*` | Signed in / role | Profiles, roles, chat, tasks |
| Admin | `/admin`, `/admin/*` (about 35: users, donations, receipts, finance, impact-evidence, command-centre, vacancies, endorsements, crs-partners, media-submissions, sophia-faqs, etc.) | Admin (page-level) | All admin tables |

Required routes missing from the project knowledge: **`/resources/verification`** (only `/verify-certificate` exists), **`/media/webinars`** (only `/media/eduaid-webinars`), **`/programs/education-online-africa`**.

## 2. Content gaps against project knowledge

- **Old structure**: `locales/*.json` (all 9 languages) still say "five regions … diaspora as sixth region" (about, mission, history closing). The About page has no "three pillars" or "permanent delivery platforms" framing. No "six services" wording found.
- **Tagline/mission**: site uses "Empowering Education. Advocating Education for All. Sustaining Africa's Future." (index.html og:description, locales). Must become "Education for All. Skills for the Future. Resilient Communities." The mission/vision/values in the project knowledge are not used verbatim anywhere.
- **Public voting (2026)**: `/vote` page, plus vote wording in about 40 files, including `NESAAfrica.tsx`, `StageBanner.tsx`, `Vision2035Section.tsx`, `categories/*`, `awards/GoldAward.tsx`, `awards/BlueGarnetAward.tsx`, `WaysToSupport`, `QuickActionsBar`, `ExploreEcosystem`, `FeaturedCampaigns`, `AnnouncementBoard`, `SCEFDigitalBoard`, `EcosystemAccordion`, `MemberDashboard`, `Wallet.tsx`. The `Decisions` voting is internal governance and should stay.
- **Lagos gala**: in all locales, `nesaSeasonConfig.ts`, `siteContent.ts`, `supportOptions.ts`, `photoLibrary.ts`, `digitalBoardThumbnails.ts`, `officialAccounts.ts`, `routes.ts`, `Calendar`, `Donate`, `SupportUs`, `Nominate`, `awards/IconAward`, `awards/BlueGarnetAward`, `NesaTimeline2026`, `NesaAwardsTv`, plus the routes `/media/nesa-awards-tv/blue-garnet-gala` and `/support-us/gala-tickets`. All of these must become "NESA-Africa 2026 Online Awards Programme, 13 December 2026".
- **"Friends of Africa"**: appears in 20 files and in `/friends-of-africa`. Keep "Friends of Africa" as the name of the participation pathway. Where the text means joining, use "join via Friends of EduAid-Africa". Each file needs checking one by one.
- **Partners / funders**: FAWE and CSACEFA appear in `Governance.tsx`, `en.json` and `StrategicPartnersSupporters.tsx`. They can show only as "permission pending" or stay hidden. Any other names or logos in `assets/partners`, `assets/endorsements` and the endorsements/CRS admin data must be hidden unless permission is recorded. PKIS and GETS are not disclosed anywhere as related-party funders.
- **Testimonials / statistics**: there are testimonial blocks in `components/sections/Testimonials.tsx`, `WomenGirlsEmpowerment.tsx`, `SpecialNeedsEducation.tsx` and `ELibraryNigeria.tsx`, but no consent records. Phase 1/2 already neutralised the main counters. Remaining figures still need a full re-scan of locales and config.
- **Divisions**: there are routes for all six divisions (BGEO, SOBCD, TDSD, OMBDD, Santos Media, LCS). The governance copy that says "5 divisions" needs to say 6.

## 3. Missing pages

| Needed | Status |
|---|---|
| Pillar pages: NESA-Africa, EduAid-Africa | Exist |
| Pillar page: Africa's Education Enablers | **Missing** |
| SCEF Academy | **Missing** (`/programs/training-development` is the nearest page) |
| NESA-Africa TV | Exists (`/media/nesa-tv`) |
| It's In Me Radio | Exists |
| Africa's Education Enablers Podcast | **Missing** |
| EduAid-Africa Webinar Series | Exists at `/media/eduaid-webinars`; needs a `/media/webinars` alias |
| EduAid-Africa e-Journal | **Missing** |
| Education Online Africa | **Missing** as a page (`/programs/digital-learning` is the nearest) |
| eLibrary Nigeria | Exists |
| My Career My Life | Exists |
| Sustainability (Green Skills, Green Horizon, Badagry, AI-READY AFRICA, all "Proposed") | **Missing** (Green Horizon only) |
| Governance & Accountability | Partly done: `/governance` and `/transparency` exist; a combined page is needed |
| Funders disclosure (PKIS / GETS related parties) | **Missing** |
| Privacy (NDPA 2023) | `/privacy` exists, but the NDPA 2023 reference needs confirming |
| Safeguarding | **Missing** |

## 4. Certificates

- **Verification**: `pages/VerifyCertificate.tsx` only looks up `hall_of_fame_profiles`. There is no certificates table, no prefix scheme and no generator anywhere in the migrations. There is a `certificates` storage bucket, created **public**. AEPC/EOA certificate references exist in memory but have no numbering in the database.
- **Needed**: a new `issued_certificates` table (number, type `NESA_PLT | NESA_COR | SCEF_ACD`, academy subtype Participation/Completion/Achievement, recipient, year, status issued/revoked, file path, issuer, issued date). It also needs a database sequence and function that generates `NESA-PLT-2026-000001` per prefix and year, admin-only write access, and a public verification function that returns limited fields only. Academy certificates must carry a non-accreditation disclaimer. Existing Hall of Fame lookups stay as a fallback.

## 5. Security findings (from code; live state unverified)

- **Admin role mismatch**: `hooks/useUserRole.ts` treats only `admin`/`super_admin` as admin. `hq_admin` is used in migrations, `Dashboard.tsx`, the scholarship exam admin pages, `EndorsementsAdminPage.tsx` and the `scholarship-exam` function. So an `hq_admin` passes some checks and fails others. Fix: one shared admin check in code and in the database (`is_admin()` covering all three).
- **Public buckets**: `certificates`, `profile-photos`, `contributor-photos`, `media-uploads`, `elibrary`, `monthly-program-assets` and `hall-of-fame` are all public. Child images may sit in `media-uploads`, `monthly-program-assets` or `hall-of-fame`. These need an inventory, and must not be deleted.
- **Leaked-password protection**: needs to be turned on (an auth setting change, which needs your approval).
- **Forms**: only 15 files use `maxLength` or bot protection. Contact, vacancies, nominations, waitlists, Hall of Fame submissions, contributors and CSR intake need length limits (client and database checks) plus a honeypot field and rate limits.
- A full security scan will be run at the start of Phase 2, once the database is reachable.

## 6. SEO

- `index.html` canonical, og:url, og:image and the sitemap line in `robots.txt` all point to **santoscreationsorg.lovable.app**. They should point to santoscreations.org once the domain is connected. og:image is `favicon.jpg`, which is not a proper share image.
- 148 files set per-page head tags (Helmet-style). Their titles and descriptions have not been checked one by one.
- `public/sitemap.xml` and `config/sitemapConfig.ts` exist. They need to be rebuilt from the final route list, leaving out admin, dashboard and portal pages.
- `robots.txt` allows everything. It should block `/admin`, `/dashboard`, `/portal`, `/staff`, `/messages` and `/auth`.
- The Organization JSON-LD exists. It needs updating with the legal name, IT-41501, SCUML number and address.

## 7. Design

- **Colours** (`src/index.css`): primary/scef-blue 209 59% 30%, blue-dark 221 53% 20%, blue-darker 221 53% 12%, gold 45 92% 42% (plus light, hover, active and dark shades), accent 48 100% 89%, greys. Tailwind tokens are in `tailwind.config.ts`.
- **Fonts**: Inter / Source Sans 3 everywhere, including the serif and display slots. The display font could become more institutional (for example a serif for headings); this is optional and needs your sign-off.
- **Logos**: `assets/scef-logo.png/.jpg`, `nesa-africa-logo.jpg`, `eduaid-africa-logo.jpg`, `gfa-wallet-logo.jpg`, `public/favicon.*`.
- **Reusable components**: shadcn `components/ui`, `components/layout` (header/footer), `components/sections/*`, `components/brand`, `components/governance`, `components/impact`, `components/regions`, `components/programs`.

## 8. Proposed Phases 2–6 (file by file, with risks)

**Phase 2 — Security and identity foundation**
- Migration: `is_admin()` covering admin, super_admin and hq_admin; align `useUserRole.ts` and the `scholarship-exam` function. *Risk: a role change could unlock or lock an admin page by mistake. Each admin page will be tested.*
- Make the `certificates` bucket private and use signed links. Inventory child images (report only, no deletion). *Risk: existing public certificate links stop working; we will add a verification-page fallback.*
- Form hardening: a shared validation helper, honeypot field and database length checks on public forms. *Risk: long existing entries are kept; checks apply to new rows only.*
- Leaked-password protection (needs approval).

**Phase 3 — Structure and content**
- New `config/scefStructure.ts`: pillars, platforms, initiatives with "Proposed" flags, participation pathways, CTAs, plus the new tagline, mission, vision and values. About page gets the pillar framing and keeps the Core Objectives cards.
- Locales (all 9): replace the five/sixth-region text, tagline, gala and voting wording. English is the fallback. *Risk: string keys must stay the same, or text disappears in other languages.*
- NESA: remove the `/vote` UI (redirect `/vote` to `/programs/nesa-africa`) and all voting buttons; switch every gala reference to the online programme; redirect `gala-tickets` and `blue-garnet-gala` instead of deleting them. *Risk: internal links and the dashboard voting widget; `Decisions` stays untouched.*
- Partners: show FAWE/CSACEFA as permission pending, hide the rest, add the PKIS/GETS disclosure.

**Phase 4 — New pages**
- `/programs/africas-education-enablers`, `/academy`, `/media/podcast`, `/media/e-journal`, `/programs/education-online-africa`, `/sustainability`, `/governance-accountability`, `/funders`, `/safeguarding`, plus the aliases `/resources/verification` and `/media/webinars`. Privacy page gets the NDPA 2023 text. Wording will be factual and say "Document pending publication" where no approved text exists. *Risk: low; these only add routes.*

**Phase 5 — Certificates**
- Migration: `issued_certificates` table, prefix sequence, generator function and public verify function. Admin issuance page at `/admin/certificates`. `VerifyCertificate.tsx` searches the new table first, then Hall of Fame. *Risk: existing Hall of Fame verification must keep working.*

**Phase 6 — SEO, accessibility, QA**
- Per-page title/description pass, rebuilt sitemap, `robots.txt` blocks, updated JSON-LD, canonical switched to santoscreations.org once that domain is connected. Accessibility pass for reduced motion, focus rings and Arabic right-to-left layout. Mobile, tablet and desktop checks. *Risk: switching the canonical before the domain is live would hurt indexing, so we gate it on the domain.*

## Needs your input before Phase 2
1. Approval to turn on leaked-password protection.
2. Whether santoscreations.org is (or will be) connected, so canonical links can move there.
3. Written permission records for FAWE and CSACEFA (until then they stay pending).
4. Approved policy text for Safeguarding and Privacy, if any exists.
