# SCEF World-Class Website Refactor — Phased Plan

This is a large refactor (nav system, landing page, ~37 core pages, mega menus, CTAs). Shipping it as one change would be unsafe and wasteful — many pages already exist. I'll execute in **5 sequenced phases**, each independently shippable. You approve this plan, then I execute Phase 1 and check in before each next phase.

## Current State (verified from codebase)

Already built and reusable — will NOT be rebuilt:
- Pages: Home, About, Governance, Programs hub + 11 program pages (EduAid, NESA, RMSA, EOA/DigitalLearning, eLibrary, MyCareerMyLife, WomenGirls, SpecialNeeds, SchoolWash, TrainingDevelopment), Membership, GetInvolved, SupportUs, Donate, LocalChapters, Chapters, StartChapter, JoinOnline, PartnerWithUs, Partners, Media hub, NesaTv, ItsInMeRadio, EduAidWebinars, EducationTourism, Contact, Updates, Reports, CaseStudies, Vacancies, all 12 monthly calendar pages
- Nav: Header.tsx + MainNavbar.tsx with mega-menu support, Footer.tsx, QuickActionsBar
- Landing sections: LandingHero, SixCoreServices, MonthlyAdvocacyCalendar, JoinUsGetInvolved, LocalChaptersSnapshot, FinalCTABand, etc.
- Webinar registration form wired to monthly pages
- Routes constants in src/routes.ts

Gaps to fill:
- Nav IA does not match the requested 10-item top-level structure (currently: About / Programs / Chapters / Media / Get Involved / Login)
- No dedicated pages for: Vision 2037, History, Send a Child to School, Monthly Advocacy Services hub, Health Education Advocacy, ESG & Environmental Education, Teacher Wellbeing, Ambassadors (standalone), Volunteers (standalone — exists under get-involved), Internships, CSR Sponsorship (standalone), Official Bank Accounts, Merchandise, Award Gala Tickets, Bid to Host
- Header lacks the 3 right-side CTAs (Become a Member / Donate Now / Sponsor NESA-Africa)
- Landing hero copy + CTAs need to match new headline/subheadline
- "Advocacy & Training" and "Membership & Ambassadors" top-level sections don't exist as nav groupings

## Phase 1 — Navigation IA refactor (this turn if approved)

Rewrite `src/config/siteContent.ts` `navLinks` to the new 10-item structure with mega menus matching your spec exactly. Add right-side CTA buttons (Become a Member / Donate Now / Sponsor NESA-Africa) to `MainNavbar.tsx` desktop + mobile. Add new route constants for all new pages (as placeholders pointing to existing pages where overlap exists, e.g. Volunteers → existing `/get-involved/volunteer`). Update Footer columns to mirror new IA.

Result: new nav live, all existing pages reachable through new menus, missing pages route to a temporary "Coming soon" stub or nearest existing page.

## Phase 2 — Landing page realignment

Update `LandingHero` copy: headline "Empowering Education. Advancing Health. Sustaining Africa's Future.", new subheadline, primary CTAs (Become a Member / Donate Now / Sponsor NESA-Africa), secondary CTAs (Explore EduAid / Join a Local Chapter / View Monthly Calendar). Reorder `Home.tsx` sections to match the 10-block landing spec, add a compact "Official Donation & Payment Channels" block linking to /support-us (no account dump on home), refresh Impact strip to the 8 listed impact areas (qualitative, no numbers), refresh Featured Programs to the 7 listed cards each with Learn More + Support buttons.

## Phase 3 — Missing core pages (batch A: governance + programs)

Create: Vision 2037, History, Send a Child to School, Monthly Advocacy Services (hub), Monthly Webinar Calendar (hub linking to existing 12 monthly pages). Each page: SEO Helmet, hero, 2-3 content blocks, clear CTAs, footer.

## Phase 4 — Missing core pages (batch B: advocacy + people + partners)

Create: Health Education Advocacy, ESG & Environmental Education, Teacher Wellbeing & Mental Health, Ambassadors (standalone), Internships, CSR Sponsorship (standalone), Official Bank Accounts, Buy Merchandise, Award Gala Tickets, Bid to Host Next Event. Same template pattern as Phase 3.

## Phase 5 — Polish + QA

Verify every nav link resolves (no 404s), every program/support card has a CTA, SEO title + meta description on every new page, mobile hamburger parity, sticky header CTAs visible at all breakpoints. Run dependency scan, check console for runtime errors on home + 5 random new pages.

## Technical notes

- Stack stays as-is: React 18 + Vite + react-router-dom + Tailwind + shadcn (project knowledge mentions Next.js but the actual codebase is Vite — I'll keep Vite, not migrate)
- All colors via existing semantic tokens (scef-blue-darker, scef-gold) — no hardcoded colors
- All visible strings should ideally go through LocaleContext, but for speed I'll add English first and flag i18n keys for a follow-up pass (calling this out so it's not a surprise)
- New pages use a shared `<PageShell>` pattern (hero + sections + CTA band) to keep the 10+ new files small and consistent
- "Vision 2037" — your existing memory references "Vision 2035". I'll use **2037** as you specified here and note the discrepancy; confirm during Phase 3 if you want me to update the older 2035 references too
- No business logic / DB changes. Webinar registration + wallet stay untouched.

## What I need from you

1. Approve this phased approach, or tell me to compress/expand phases
2. Confirm **Vision 2037** (overrides existing 2035 memory) — yes/no
3. Confirm placeholder pages are OK in Phase 1 (vs. waiting until Phase 3/4 to expose new nav items)

On approval I'll start Phase 1 immediately.