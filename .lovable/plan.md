# SCEF World-Class Refactor — Plan

This is a large, multi-phase refactor. To keep changes reviewable and avoid regressions, I'll ship it in clearly-scoped phases. Each phase is independently shippable. Reply with the phase number (or "all phases") to start.

## Phase A — Visual Foundation (Imagery + Tokens)
- Curate an authentic image library under `src/assets/photos/` (categories: classrooms, teachers, girls-education, volunteers, advocacy-walks, school-outreach, NESA events, EduAid, landscapes, innovation hubs, ESG, RMSA before/after, eLibrary, leadership).
- Source: generate documentary-style African photography via the image tool (premium quality where it matters), since I cannot scrape personal Facebook archives. The user can later swap in real archive photos by replacing files in-place.
- Add image manifest `src/config/photoLibrary.ts` mapping captions, alt text, year, category, credit.
- Tighten design tokens in `index.css` / `tailwind.config.ts` (no new colors — reuse `scef-blue-darker`, `scef-gold`; add cinematic gradient + parallax utility classes).

## Phase B — Global Navigation Standardization
- Update `siteContent.navLinks` to the exact 10-item top nav: Home, About SCEF, Programs, Advocacy & Training, Membership & Ambassadors, Local Chapters, Partner With Us, Support / Donate, News & Media, Contact.
- Keep right-side CTAs (Become a Member / Donate / Sponsor NESA-Africa) — already in place.
- Mobile menu: ensure quick CTAs persist in drawer (already in place — verify).

## Phase C — Homepage Cinematic Pass
- Hero: keep current copy + CTAs, swap `hero-schoolgirl.jpg` for new full-bleed cinematic banner; add subtle Ken-Burns animation.
- New section: **"Powered by Volunteers, Educators & Change Makers Across Africa"** (`VolunteerStorytelling.tsx`) — masonry of 6–8 documentary photos + 4 CTAs (Meet Contributors / Join Movement / Volunteer / Ambassador).
- New section: **Historical Timeline** strip (1997 → 2027) with milestone cards.
- Keep existing 10-block sequence, insert volunteer + timeline blocks between Impact and Programs.

## Phase D — Volunteers & Contributors Page
- New route `/volunteers` → `src/pages/Volunteers.tsx`.
- Subtitle, masonry grid, year filters (2007, 2013, 2015, 2020, 2024+), contributor story cards, hover animations, CTAs.
- Driven by `photoLibrary.ts` so user can extend without code changes.

## Phase E — About + History Enhancement
- Update `History.tsx` timeline with the exact milestones from the brief (1997, 2003, 2007, 2013–14, 2015, 2020, 2024–27).
- Add "Our Journey Through People & Impact" documentary block to `About.tsx`.

## Phase F — Programs Imagery Pass
- Replace placeholder/abstract imagery on each program page (EduAid, NESA, EOA, eLibrary, MyCareerMyLife, RMSA, SendAChild, Women & Girls, Special Needs) with category-matched authentic photos from the library. Add proper alt text.

## Phase G — Advocacy & Training + Monthly Calendar Visuals
- Each monthly page: add themed banner image, weekly schedule (Mon–Sun pattern from brief), sponsorship CTA. Registration form already wired in earlier phases.

## Phase H — Media Archive
- New route `/media/archive` → `SCEF Historical Media Archive` page with subsections (Historical Photos, Volunteer Stories, Event Gallery, Advocacy, Awards, Training, Outreach, EduAid, NESA, NESA TV, It's In Me Radio).

## Phase I — Trust, Donation, Partnership Polish
- Refine Donate, SupportUs, PartnerWithUs cards with real-context imagery + the exact CTA card list from the brief.

## Phase J — Performance, SEO, Accessibility
- Convert new images to WebP where possible, lazy-load, descriptive alt text, JSON-LD on key pages, lighthouse-friendly checks.

---

## Honest constraints (please read)
1. **I cannot scrape Facebook** (`facebook.com/vincent.a.santos.7`) — it's behind auth. For Phase A I will generate high-quality, documentary-style African photography via the image tool. You can later drop real archive photos into the same filenames to replace them 1:1 with no code changes.
2. The full scope is ~40+ files and ~30+ generated images. Doing it in one shot would be slow, expensive, and hard to review. Phased delivery is strongly recommended.
3. Existing components (LandingHero, FeaturedPrograms, monthly registration, etc.) are already aligned — this refactor adds the missing storytelling layer rather than rebuilding what works.

## Recommended next step
Reply **"Phase A"** (or "Phase A + B + C") to begin. If you want everything in one go, reply **"all phases"** and I'll execute sequentially in this turn (will take many tool calls and several minutes).