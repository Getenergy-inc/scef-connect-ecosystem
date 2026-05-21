# SCEF Coordinated Refactor — Implementation Plan

This plan executes the master prompt in one coordinated pass. Items already shipped in prior turns are marked **DONE** and only verified, not rebuilt.

---

## Phase 1 — Audit & verify what already exists

Read-only verification pass (no edits) on:

- `src/components/sections/LandingHero.tsx` — DONE last turn (overlay, 600px width, shorter copy, `/csr-partnership` + `/donate` CTAs).
- `src/components/sections/ApplicationsWaitlistsSection.tsx` — DONE (Capacity, Green Horizon, Vocational, Volunteer cards).
- `src/pages/apply/GreenHorizonApply.tsx`, `CapacityTrainingApply.tsx`, `VocationalScholarshipApply.tsx` — DONE.
- `src/pages/admin/AdminVocationalScholarshipWaitlist.tsx`, `AdminCapacityTrainingWaitlist.tsx` — DONE. Confirm a matching `AdminGreenHorizonWaitlist.tsx` exists; if missing, create.
- `src/pages/CsrEducationFundsManagement.tsx` — DONE.
- Routes in `src/App.tsx` for `/csr-partnership`, `/adopt-a-school`, `/apply/*` — DONE.
- `src/components/layout/MainNavbar.tsx`, `Footer.tsx`, `TopUtilityNav.tsx` — review for governance bar + footer columns.

Anything already correct is left alone.

---

## Phase 2 — Governance navbar (Section 2)

Edit `src/components/layout/TopUtilityNav.tsx` (or the governance bar component currently rendered above `MainNavbar`):

- Ensure 5 links present: Board of Trustees, Board of Advisors, Board of Directors, Local Chapter Presidents, Management Team.
- Slim dark navy bar, small text, subtle separators, clean hover.
- Mobile: collapse into a single "Governance" dropdown.

## Phase 3 — Main navbar (Section 2)

Edit `src/components/layout/MainNavbar.tsx`:

- Primary links: About SCEF · CSR Funds Management · Programs · Impact · Local Chapters · Get Involved · Contact.
- Get Involved dropdown: Become a Member, Volunteer, Internship, Donate, Sponsor a Program, Adopt a School, Join a Project, EduTourism, Start / Join Local Chapter, Diaspora Africa, Friends of Africa.
- Slimmer height, smaller text, compact dropdowns, hamburger drawer on mobile.
- Remove any placeholder logo; fall back to "SCEF — Santos Creations Educational Foundation" text mark if no real logo asset.
- Keep "Become a Member" as a small CTA button.

## Phase 4 — Trust/endorsement cleanup (Section 4)

Search the codebase for the unverified entities (UNESCO, UNICEF, AU, ADEA, GPE, ANCEFA, Education International Africa) and remove their mentions, logos, or any "Endorsed by" framing.

Touch points likely include:
- `src/pages/Partners.tsx`, `src/pages/PartnerWithUs.tsx`
- `src/components/admin/EndorsementsAdmin.tsx` source data
- Any homepage trust-bar section.

If CSACEFA / FAWE Kenya appear and are verified, group them under "Trusted Education Collaborators"; otherwise remove the entire section.

## Phase 5 — Homepage flow (Section 5)

Edit `src/pages/Home.tsx` to enforce ordering:

1. Hero · 2. Who We Are / CSR summary · 3. Get involved · 4. Explore Our Programs · 5. 2026–2027 Applications & Waitlists · 6. Recognition-to-Impact · 7. Impact Areas · 8. Local Chapter · 9. Women & Girls preview · 10. Monthly Calendar preview · 11. Final CTA · 12. Footer.

Re-order existing imports; do not delete sections.

## Phase 6 — Explore Our Programs cards (Section 8)

Locate the Programs grid component used on Home and normalize:

- Equal height, 16:9 image ratio, real or approved imagery only.
- Cards: EduAid-Africa, NESA-Africa, Rebuild My School Africa, eLibrary Africa, My Career My Life, Send a Child to School, Women & Girls Empowerment, **Green Horizon Initiative Project** (new entry), Media & Advocacy (only if asset exists).
- Small logo badges only; no oversized hero logos inside cards.

## Phase 7 — Green Horizon completeness (Section 9)

- Verify `/apply/green-horizon` page copy uses the safer impact wording; replace any "90% IDP reduction" sentence if present.
- Verify all form fields listed in Section 9 are present; add any missing fields (permaculture interest, support-needed multi-select, applicant-type expanded list).
- Confirm admin dashboard route exists; create `AdminGreenHorizonWaitlist.tsx` mirroring the Capacity/Vocational admin pattern if missing.

## Phase 8 — `/apply` hub (Section 10)

Create `src/pages/apply/ApplyHub.tsx` at route `/apply`:

- Title + subheadline from Section 10.
- 10 application cards listed (Capacity Training, Green Horizon, Vocational, My Career My Life, Local Chapter Membership, Ambassador, Volunteer, Internship, EduTourism, Sponsorship/Partnership Interest).
- Each card links to its existing apply/conversion page; "coming soon" stub for routes that don't yet exist (no broken links).

Register route in `src/App.tsx`.

## Phase 9 — Local Chapter pathway section (Section 13)

Add/update a homepage section "Join SCEF Through Your Local Chapter" with 3 cards (Member, Ambassador, Volunteer) linking to `/membership`, `/ambassadors`, `/volunteer`.

## Phase 10 — Waitlist admin workflow (Section 14)

Verify the existing `waitlist_submissions` table already has: `submission_status`, `admin_notes`, `reviewed_by`, `reviewed_at`, `created_at`, `updated_at`. Statuses must include: new, reviewed, shortlisted, accepted, rejected, waitlisted.

If `shortlisted` / `waitlisted` are not in the current `validate_waitlist_status` trigger (currently only allows new/reviewed/accepted/rejected per db-functions), run a migration to extend the allowed list.

Confirm RLS keeps admin notes private to admins only.

## Phase 11 — CTA button system (Section 15) & Footer (Section 16)

- Audit `Button` variants in `src/components/ui/button.tsx` and add a smaller default `size="sm"` use across hero/cards if oversized buttons remain.
- Rewrite `src/components/layout/Footer.tsx` to the 5-column layout exactly as specified, with the 2026 copyright line.

## Phase 12 — Image/logo cleanup (Section 17)

Spot-check program cards and hero for AI-looking or placeholder imagery. Replace with existing real photos under `src/assets/photos/`. No new image generation in this pass — flag any gap to the user instead of inserting AI imagery.

## Phase 13 — Page existence verification (Section 19)

For each route in Section 19, confirm it resolves in `src/App.tsx`. For any missing route, add a minimal `ComingSoon`-style placeholder page so nav links don't 404. Existing rich pages are not modified.

---

## What is intentionally NOT in this pass

- No redesign of NESA / EduAid microsites.
- No new image generation (per "no AI images" rule).
- No changes to dashboards, wallet, governance content, or NESA categories.
- No copy rewrites on pages outside the touch list above.

---

## Open question before I start

The scope here is very large (~12 files edited, ~3 new pages, 1 migration, governance + main nav + footer rewrites, trust-claim audit across multiple files). To keep this shippable in a single coordinated update without regressions, I propose to execute **Phases 1–7 + 10 + 11 (footer) + 13** in this turn — i.e. everything that directly affects the landing page experience, Green Horizon completeness, navigation, footer, trust cleanup, and waitlist admin integrity.

Phases 8 (`/apply` hub), 9 (local chapter section), and 12 (image audit) would follow in a second turn so each turn stays reviewable.

**Reply "go" to execute as proposed, or tell me to change the split (e.g. "all in one turn" / "only landing + nav this turn").**
