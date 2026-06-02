# Unified SCEF Local Chapter Services — Delivery Plan

This is a large, multi-surface initiative (22 sections, 4 new DB tables, 30+ routes, signup automation across nesa.africa + SCEF + all program platforms, admin dashboards, Sophia logic, NESA-Africa map refactor). It cannot be safely shipped in a single change. I'll deliver it in phases so each layer is reviewable, testable, and donor-ready.

## Guiding rules (locked-in across all phases)
- One SCEF, one Local Chapter system, one member profile, one region taxonomy.
- 10 regions only: North Africa, West Africa, Central Africa, East Africa, Southern Africa, Sahel, Horn of Africa, Indian Ocean, Diaspora / Global Africa, Friends of Africa.
- No project-specific chapters or memberships. Cross-region countries use `secondary_region_tags`, never duplicate rows.
- Free Online Membership auto-assignment on every signup (SCEF + all program sites).
- Chapters are licensed, not franchised: no independent fundraising, contracts, or wallets.
- SCEF brand tokens only (navy `scef-blue-darker`, gold `scef-gold`, green impact accent, white). No hardcoded hex in components.
- All copy translatable via LocaleContext (9 languages). No hardcoded strings in new UI.
- Unverified metrics use "Reporting in progress" placeholders.

## Phase 1 — Data foundation & taxonomy (this phase, code-only, no DB yet)
Frontend-only refactor of `/local-chapters` so the page already reflects the unified 10-region, country-card model while the DB layer is being designed.

1. Create `src/data/scefRegions.ts` — canonical taxonomy:
   - 10 regions with id, name, slug, description, primary countries, secondary-tag countries (Sahel, Horn, Indian Ocean overlaps), linked programs, regional wallet status placeholder, impact pathway summary.
   - Country master list with: name, ISO code, primary region, secondary region tags, default chapter status (`To Be Activated` until verified).
2. Refactor `src/pages/LocalChapters.tsx`:
   - New Hero: "Explore Africa's Regions / One Continent, Ten Regions" + 6 CTAs (Join, Start Online, Explore Regions, Nominate School, Support Region, Chat with Sophia w/ WhatsApp deep-link).
   - Positioning section (Section 2 copy — licensed grassroots, not franchises).
   - Search + filters bar (region, country dynamic, chapter type, program, status) — reuse current filter pattern, extend program list to full SCEF program set.
   - Ten region sections (accordion on mobile, full sections desktop), each with: country chips, chapter count, country chapter cards grid, region CTAs, linked program tags, wallet status, compliance note.
   - Country chapter card component (`src/components/chapters/CountryChapterCard.tsx`) with all fields from Section 6 (counts show "Reporting in progress" until DB lands).
   - Unified Project Synchronization section (Section 8) + 2026–2027 NESA-Africa Legacy Pathway section (Section 9) + Regional Wallet & Funding section (Section 10) + Chapter Development Pathway (Section 11, 3 stages).
3. SEO: Helmet meta title/description per Section 20.
4. Accessibility: aria-labels on region accordions and cards, alt text, keyboard nav.

## Phase 2 — Region & country routes
- `src/pages/regions/RegionDetail.tsx` already exists — extend to cover all 10 region slugs from taxonomy.
- Add `/local-chapters/:regionSlug` route → reuses region detail with chapter focus.
- Add `/local-chapters/:countrySlug` country chapter pages with the field set from Section 15.
- Update `src/routes.ts` and `App.tsx` routing.

## Phase 3 — Database & signup automation (requires migration approval)
New tables (with GRANTs + RLS in same migration):
- `scef_local_chapters`
- `scef_chapter_program_links`
- `scef_members` (or extend `profiles`)
- `scef_member_program_links`
- Update `handle_new_user` trigger to: detect country, match primary region, create/update SCEF member, assign Free Online Membership, attach to country online chapter (create placeholder `To Be Activated` if missing), record signup source. Youth (13–17) flow with guardian consent.
- Update all program signup edge functions / forms to call the same path.

## Phase 4 — Admin dashboard
Extend `src/pages/admin/AdminChapters.tsx` and add member admin views per Section 17 (totals by region/country/status/type/source, upgrade eligibility, duplicate detection, exports).

## Phase 5 — NESA-Africa map refactor + Sophia
- Refactor `src/components/regions/AfricaRegionalMap.tsx` to the 10-region clickable model with SCEF brand palette and region cards (Section 16).
- Sophia knowledge update for chapter/membership Q&A (Section 18).

## Phase 6 — QA, compliance, localization
- Add new strings to all 9 locale files.
- Run accessibility + SEO audit.
- Verify no project-specific chapters, no duplicate countries, no hardcoded colors, no horizontal overflow at 360–414px.

## Technical notes
- All copy goes through `LocaleContext` `t()`; new keys added under `localChapters.*`.
- Card metrics that are not yet wired to DB render "Reporting in progress" — never fake numbers.
- Mobile (< 640px): region sections become `<Collapsible>` accordions; CTAs full-width; bottom padding `pb-24` to clear Sophia FAB.
- WhatsApp Sophia link reused from existing `SophiaWhatsAppWidget` config.

## What I'd like to confirm before starting Phase 1
1. Approve phased delivery (Phase 1 ships this turn, Phases 2–6 in follow-up turns)?
2. For Phase 3 DB work — extend existing `profiles` + `chapters` tables, or create the new `scef_*` tables in parallel and migrate later? (Recommend extend existing to avoid duplication, since `chapters` and `profiles` already exist with overlapping fields.)
3. Should the country chapter cards show real counts from the existing `chapters` table where available, with "Reporting in progress" only as fallback?
