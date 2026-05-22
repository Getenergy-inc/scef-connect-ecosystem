# Programme Pages Revamp Plan

This is a large, multi-page refactor. To keep quality high and avoid breaking existing routes/content, I'll execute it in phases. You can approve the whole plan, or tell me to start with a specific phase.

## Scope summary

Bring every programme page up to the structural standard set by `EduAidAfricaTeacherCorps.tsx` (Hero → About → Purpose/Mission → Objectives → Service Tracks → Who Benefits → How It Works → Fees/Grants → Safeguarding → Partnerships → Impact → Final CTA), without redesigning the site, changing the navbar shell, colours, typography, or brand.

## Phase 1 — Audit & shared scaffolding

1. Audit `src/pages/programs/*` and list current structure of each page against the Teacher Corps template.
2. Create a small set of reusable section components under `src/components/programs/template/`:
   - `ProgramHero` (eyebrow, title, tagline, intro, primary + secondary CTA)
   - `ProgramAbout`
   - `ProgramPurpose` (vision/mission card)
   - `ProgramObjectives` (3–5 cards)
   - `ProgramServiceTracks` (icon + title + body + bullets)
   - `ProgramAudience` (Who can join / who benefits)
   - `ProgramHowItWorks` (numbered steps)
   - `ProgramFees` (table + disclaimer)
   - `ProgramSafeguarding`
   - `ProgramPartnerships`
   - `ProgramImpact` (indicators)
   - `ProgramFinalCTA`
   These wrap existing tokens (`scef-blue-darker`, `scef-gold`, `bg-scef-pattern`) and `PageShell`, so no design system changes.
3. Refactor `EduAidAfricaTeacherCorps.tsx` to consume these components (no visual change) so it remains the canonical reference.

## Phase 2 — Refactor existing programme pages

For each page below, preserve original copy, route, and images; restructure into the template; add missing sections; keep tone institutional.

- `programs/MyCareerMyLife.tsx` — add Purpose, Objectives, Service Tracks (Career guidance, Life skills, Mentorship, Girls' career support, TVET, Digital career clubs, School clubs, Career talks, SEN/vulnerable support), Audience, How it works, Safeguarding, Partnerships, Impact, Final CTA (Become a Career Mentor).
- `programs/TrainingDevelopment.tsx` → repositioned as **Online Teaching Training Programme** with: Purpose, Who needs it, Free training after volunteer form note, Modules, Assessment, Certification, link to Teacher Corps journey, Apply CTA.
- `programs/EduAidAfrica.tsx` — verify against template, fill gaps.
- `programs/NESAAfrica.tsx`, `programs/RebuildMySchoolAfrica.tsx`, `programs/ELibraryNigeria.tsx`, `programs/SendAChildToSchool.tsx`, `programs/WomenGirlsEmpowerment.tsx`, `programs/EducationOnlineAfrica.tsx`, `programs/SpecialNeedsEducation.tsx` (create if missing), `programs/GreenHorizon.tsx` — same treatment.

## Phase 3 — New programme pages

Create new pages following the template:

- `programs/SpecialNeedsSchoolsIntervention.tsx` → `/programs/special-needs-schools-intervention` (one SEN school per African region in 2027, teacher/handler training, assistive learning, safeguarding, partner CTA).
- `programs/EduTourismMissions.tsx` → `/programs/edu-tourism-missions` (education travel, school exchange, cultural learning, Indian Ocean Islands / Seychelles 2027 link, teacher grants).
- `programs/RegionalWaitingListGrants2027.tsx` → `/programs/2027-regional-waiting-list-grants` (8 regions: West, Central, East, Southern, Sahel, Horn, Islands, Diaspora; waiting-list form via existing `WaitingListForm` component; grant categories).

Register routes in `src/App.tsx`.

## Phase 4 — Cards & navigation consistency

1. `MainNavbar.tsx` Programs dropdown: add the three new entries (Online Teaching Training, Special Needs Schools Intervention, Edu-Tourism Missions, 2027 Regional Waiting List & Grants). Preserve existing items. Keep styling untouched.
2. `ProgramCardsRow.tsx` (Explore Our Programs): audit for duplicate images. Today `EduAid-Africa` and `My Career, My Life` both lean on classroom/mentorship photos that overlap with Teacher Corps. Generate unique, programme-specific images only where there is an actual duplicate, and swap them in. Add cards for the three new programmes if you want them on the landing row (otherwise they live only on `/programs` and in the dropdown — confirm preference).
3. `pages/Programs.tsx` index — ensure all programmes are listed with unique images, taglines, and correct routes.

## Phase 5 — Image deduplication

Generate only what's needed (each is a cost):
- `special-needs-classroom.jpg` — inclusive classroom with assistive learning.
- `edu-tourism-missions.jpg` — students on an educational exchange / cultural learning trip.
- `online-teaching-training.jpg` — teacher at laptop delivering an online lesson.
- `regional-grants-map.jpg` — stylised Africa map with regional highlights.
- Replacement for any confirmed duplicate on existing cards.

## Technical notes

- All new sections use existing semantic tokens; no new colours, fonts, or radii.
- All copy stays in English in components; i18n keys can be wired later if you want (out of scope unless you ask).
- No backend, schema, or auth changes.
- Routes kept stable; only additions for new pages.

## Suggested execution order

Given the size, I recommend shipping in this order so you can review between phases:

1. Phase 1 (scaffolding + Teacher Corps refactor to use it).
2. Phase 4.1 (dropdown additions) + Phase 3 (three new pages as MVP).
3. Phase 2 (refactor existing pages, one batch at a time — start with My Career My Life + Online Teaching Training since you called them out).
4. Phase 5 image dedup + Phase 4.2/4.3 card polish.

## Questions before I start

1. Should the three new programmes also appear as cards on the landing `Explore Our Programs` row, or only in the Programs dropdown + `/programs` index?
2. For Phase 2, do you want me to do **all** existing programme pages in one go, or start with **My Career My Life** and **Online Teaching Training** and pause for review?
3. Any fee amounts to use for Special Needs Intervention, Edu-Tourism, and Regional Grants pages, or should I show "Fees announced soon" placeholders?
