# SCEF World-Class Refactor — Phased Plan

Your brief covers 10+ pages, 500-FAQ system, monthly calendar engine, interactive Africa map, payments, volunteer gallery, About/Programs/Impact rewrites, and SEO hardening. Most of this **already exists** in your codebase (NESA & EduAid timelines, Sophia widget, GFA Wallet, governance, chapters, Providus accounts, volunteer storytelling). Rebuilding everything in one pass would regress working features and burn credits.

I'll execute in 6 phases. **Each phase ships independently and waits for your approval before the next.**

---

## Phase 0 — Audit (this turn, no code)

I scan every page in your brief vs. what exists today and produce a gap-list:
- What already meets the brief (keep)
- What needs polish (small edits)
- What's missing (new build)

Deliverable: a single markdown punch-list in chat. ~10 min, no file changes.

## Phase 1 — Home page restructure

Align `/` to the 15-section order in your brief, reusing existing components:
1. Hero (add the 5 CTAs incl. "Chat with Sophia" trigger)
2. Quick About
3. NESA timeline card → `/programs/nesa-africa`
4. EduAid timeline card → `/programs/eduaid-africa`
5. Our Journey (Volunteer storytelling — already built)
6. **NEW**: Monthly Advocacy Calendar dropdown (12 months)
7. Impact summary card
8. Programs summary card
9. Support options grid (already built)
10. Local chapters teaser → existing map
11. Verified partners strip
12. Training & webinars preview
13. Payment & donation band (GFA Wallet primary)
14. Volunteers & Contributors masonry (already built)
15. Final CTA band

## Phase 2 — Support / Payments page

Rebuild `/support-us`:
- GFA Wallet primary CTA
- Verified Providus accounts table (SCEF / EduAid / NESA / GFA WZIP — all currencies)
- Sponsorship cards (NESA, MCML, RMSA, Send-a-Child, Gala, Merch, Edu-Tourism, eLibrary)
- Trust badges

## Phase 3 — Sophia + 500-FAQ knowledge base

- Searchable accordion, category filters
- WhatsApp escalation per FAQ
- Sophia quick actions wired to wa.me deep links
- Seed with ~50 FAQs across 7 categories; scaffold for the rest

## Phase 4 — Programs / Impact / About polish

- `/programs`: detailed cards for all 7 programs with consistent CTA pattern
- `/impact`: 10 impact pillars from brief
- `/about`: SDG + Agenda 2063 alignment, governance, journey

## Phase 5 — Advocacy & Training

- `/advocacy-training` with 12-month calendar pages
- Webinar registration form wired to existing `WebinarRegistrationForm`

## Phase 6 — SEO, performance, AI-readiness

- `llms.txt`, sitemap regeneration, per-route Helmet audit
- Core Web Vitals pass (image sizes, lazy loading)
- JSON-LD: Organization + per-program

---

## Recommendation

**Approve Phase 0 (audit) now.** It costs almost nothing and tells us exactly which of Phases 1–6 are real work vs. already done. Then we pick the next phase together based on what the audit finds.

Reply "go phase 0" and I'll produce the gap-list. Or pick any phase to jump straight in.
