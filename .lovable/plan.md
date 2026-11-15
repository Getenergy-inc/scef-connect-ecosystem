# Support a Special-Needs School Across Africa — build plan

## What you will get
A new EduAid-Africa branded page at `/programmes/support-a-special-needs-school`, inside the normal SCEF header and footer, with all 20 sections from your brief in order: hero with the five actions, the Donate and Sponsor/Partner forms, the clickable Africa map, eight categories, eight region cards, EduTourism 2027, the 10 steps, tabs, the empty public accountability dashboard, timetable and vote rules, FAQ and the Connect section with the four official bank accounts.

Voting stays off. Payments are bank transfer only. Every figure shows "—" until approved figures exist.

## Changes outside the page
- **Existing page replaced:** last turn's page at `/support-a-special-needs-school` (and `/programs/special-needs-education/support-fund-2027`) becomes a redirect to the new route. The old page file is kept, not deleted.
- **Programmes card:** one new card on `/programs` linking to the page. Programmes layout is otherwise unchanged.
- **Special Needs Education page:** one link to the new page.
- **Two new database tables:** `support_fund_pledges` and `support_fund_transfer_reports` (site = 'scef'). Anyone can submit; only admins can read or update; no public reads. They are separate from existing donation tables. No existing table is changed.
- **New packages:** `d3-geo`, `topojson-client`, `world-atlas` (map), and `vitest` (tests).
- **Fonts:** Fraunces and Plus Jakarta Sans load for this page only and apply only inside the page wrapper.
- Header, footer, auth, dashboards, chapters and the current donation system are not touched.

## Points to confirm
1. **Canonical URL:** your brief says canonical = `https://eduaid.africa/support-a-special-needs-school`. That tells search engines to credit eduaid.africa instead of this page. I will do this as instructed unless you say otherwise.
2. **Logo:** `src/assets/eduaid-africa-logo.jpg` already exists. I will use it unchanged until you send the new file.
3. **BASE constant:** the "Nominate" and "Volunteer" buttons point to `BASE/participate?...` on the other project. That page does not exist in this project. The embedded Google Form in the tabs still covers those actions here.
4. **Bank accounts:** shown exactly as section 12, from config only. Earlier register flag "EduAid Africa Ltd as recipient" stays open for management confirmation.
5. **Translations:** the page is English-only for now. Other languages fall back to English.

## Files
New:
- `src/config/schoolSupport.ts`: the single source of truth (BASE, flags VOTING_OPEN / COUNTRY_MAP_APPROVED / SUPPORTER_DASHBOARD_ENABLED = false, CTAs, regions, 54 countries + Western Sahara, categories, video slots, accounts, bank accounts, PUBLIC_STATS all null, presets)
- `src/services/supportFundService.ts`: the one data layer (createPledge, reportTransfer, getPublicStats → null for now); later it can point to the EduAid-Africa API
- `src/lib/supportFundReference.ts`: EA-DN / EA-SP / EA-PT-YYMMDD-XXXX
- `src/pages/programmes/SupportSpecialNeedsSchool.tsx`: page shell, SEO (react-helmet-async if present, otherwise a document head effect), JSON-LD NGO + DonateAction
- `src/components/school-support/`: UtilityBar (A/A+/A++ and high contrast, page-scoped), Hero, AboutSection, FiveWays, DonateForm (6A + thank-you with copy buttons and the transfer report), SponsorPartnerForm (6B), AfricaMap (6C, lazy-loaded, SVG with `<title>`, island dots, legend focus, country select, country panel), CategoryGrid, RegionCards, EduTourism, HowItWorks, SupportDetails, TakePartTabs (arrow keys, `?participation=`), VerifiedSchools + AccountabilityDashboard, TimetableVote, SponsorshipOverview, Faq, FinalCta, Connect, ClickToLoadVideo (youtube-nocookie), GoogleFormEmbed (lazy)
- `src/components/school-support/SupportIntentContext.tsx`: shared region/mode preselect + scroll for every Donate/Sponsor link, map and region card
- `supabase/migrations/<new>.sql`: the two tables, GRANT (insert to anon/authenticated, all to service_role), RLS, admin policies through the existing `has_role`, length checks; no card, PIN, password, OTP or bank-login columns
- `src/test/schoolSupport.test.ts` + `vitest.config.ts` + a `test` script: 8 regions, 54 countries, 8 categories, 8 desks, 4 bank accounts; VOTING_OPEN false; both forms block submit without the acknowledgement; no field named card/cvv/pin/password/otp

Edited:
- `src/App.tsx`: new route + redirects
- `src/index.css`: `.eduaid-scope` tokens (your colours as HSL variables), 3px tan focus ring, high-contrast and text-size classes, reduced motion
- `tailwind.config.ts`: `eduaid.*` colour and font names mapped to those variables
- `src/pages/Programs*.tsx` (programmes card), Special Needs Education page (one link)

## Technical notes
- Forms use react-hook-form + zod with length limits, a honeypot field and the "does not confirm payment" notice.
- Donor details are only stored in the private table; "Keep my name off public lists" is stored as a flag.
- The map loads `countries-50m` from the `world-atlas` package only when the section comes into view. It uses `geoMercator().fitExtent` over lon −25.5…57.8, lat −35.2…37.6 with clipExtent, and Somaliland is drawn as Somalia. While COUNTRY_MAP_APPROVED is false, the draft banner shows.
- Category image slots and video slots stay empty. Empty video slots are hidden, and categories show a gradient tile with the icon.
- Verification: screenshots at 360/768/1280 of the hero, the map with a country selected, the Donate thank-you, Sponsor in partner mode, the tabs and the empty dashboard. A test submission is made into the new tables.

## Not included
- Supporter dashboard (flag only, links to eduaid.africa/account later)
- Live public-stats feed (waits for your URL)
- Category images (wait for your 8 images)
- Social account links (hidden slots)
