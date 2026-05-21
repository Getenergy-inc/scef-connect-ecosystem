
# UN-Inspired Institutional Redesign

Goal: shift the SCEF site from its current dense/editorial feel to a clean, formal, public-sector aesthetic (white + deep navy + light grey, structured grids, calm typography), without any UN marks or implied affiliation, and without touching backend or business logic.

## 1. Design tokens (foundational)

Edit `src/index.css` and `tailwind.config.ts`:

- Body font: `Inter` (already a safe default). Headings: `Inter` tight tracking — drop any display/serif heading font on institutional pages. Keep existing `font-display` token but remap to Inter with `font-weight: 700` and `letter-spacing: -0.01em`.
- Add semantic tokens:
  - `--surface` (white), `--surface-muted` (light grey `hsl(210 20% 98%)`), `--surface-section` (`hsl(210 30% 96%)`)
  - `--ink` (deep navy `hsl(215 45% 15%)`), `--ink-muted` (`hsl(215 20% 35%)`)
  - `--accent-blue` (institutional `hsl(212 70% 38%)`), `--accent-blue-hover` (`hsl(212 70% 30%)`)
  - Rule line `--rule` (`hsl(215 20% 88%)`)
- Tighter type scale: h1 `clamp(2rem,3.5vw,2.75rem)`, h2 `1.75rem`, h3 `1.25rem`, body `1rem/1.65`.
- Button sizes shrink: default height 40px, sm 34px, lg 44px. Radius 6px (not pill).

## 2. Navbar (`src/components/layout/HeaderScreenshot.tsx` or `MainNavbar.tsx`)

- Slim white nav, 56px tall desktop / 52px mobile (currently 76–84px spacer — reduce).
- Thin 1px bottom border in `--rule`.
- Real SCEF logo (existing asset) at 28px height + small wordmark.
- Primary links (smaller, 14px, medium): About, Programs, Impact, Timelines, Get Involved, Media, Contact. Move governance/leadership into About dropdown.
- Hover: 2px blue underline, no color shift.
- CTA: single compact "Become a Member" button, sm size, primary blue.
- Mobile: hamburger → right-side drawer, white background, large tap targets, sectioned links.
- Update the spacer in `Home.tsx` from `h-[76px] md:h-[84px]` to `h-14`.

## 3. Hero (`src/components/sections/LandingHero.tsx`)

Rewrite as a two-column UN-style hero:
- Left (7/12): small kicker "Santos Creations Educational Foundation", H1 "Connecting Education Recognition to Real Impact Across Africa", supporting paragraph as specified, two CTAs ("Explore Our Work" primary, "Support Education Impact" outline secondary), small trust line below.
- Right (5/12): single real documentary photo in a clean 4/5 frame with subtle navy caption bar.
- Background: white with a soft `--surface-muted` band at the bottom for visual anchoring. No gradients, no orbs, no animations beyond a subtle fade-in.

## 4. Buttons (`src/components/ui/button.tsx`)

- Update variants:
  - `default` → solid `--accent-blue`, white text, 6px radius, 40px height, 14px font.
  - `outline` → 1px `--accent-blue` border, blue text, transparent bg.
  - `ghost` / `link` → text with arrow `→`.
- Remove oversized hero CTA variants if any.

## 5. Cards / sections

- Standardize section padding: `py-16 md:py-20` desktop, `py-10` mobile, `max-w-6xl` container.
- Card primitive: white bg, 1px `--rule` border, 8px radius, p-6, subtle shadow `0 1px 2px rgba(15,23,42,.04)`, no gradients.
- Equal-height grids via `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.
- Replace `EditorialDivider` magazine kickers in `Home.tsx` with a simpler `SectionHeader` (eyebrow, h2, optional lede, thin rule). Keep section ORDER the same.

## 6. Footer (`src/components/layout/Footer.tsx`)

Restructure into 5 columns on desktop / 2 on tablet / 1 on mobile:
1. SCEF brand + short mission (3 lines max)
2. Explore: About, Programs, Impact, Timelines, Media, Contact
3. Programs: EduAid-Africa, NESA-Africa, eLibrary Africa, Rebuild My School Africa, Send a Child to School
4. Get Involved: Become a Member, Sponsor a Program, Adopt a School, Volunteer, Partner With SCEF
5. Contact: email, phone, WhatsApp, social icons (small, single-row)

Style: deep navy (`--ink`) bg, white headings (13px uppercase tracking), `hsl(215 15% 75%)` link text, 12px small print, copyright "© 2026 Santos Creations Educational Foundation. All rights reserved."

## 7. AI-looking images cleanup

Sweep `src/components/sections/**` for `<img>` and background images. For each:
- If the asset is in `src/assets/` and looks AI-generated (cartoon learners, glossy fake classrooms, stylized figures) → replace with a neutral institutional photo block: clean documentary-style stock placeholder (`bg-[--surface-muted]` with a small caption "Photo coming soon — SCEF Field Library"), or hide if decorative.
- Keep real photos and partner logos.
- Add/verify `alt` on every `<img>`. Wrap with `aspect-[4/5]` or `aspect-video` and `object-cover` so nothing stretches.

Specifically audit: `LandingHero`, `HeroSection`, `CinematicHero`, `WhoWeAreSection`, `PremiumStorySections`, `VolunteerStorytelling`, `WomenGirlsEmpowerment`, `HallOfFameSection`, `StoriesOfTransformation`, `BeforeAfterSection`.

## 8. Accessibility & responsive

- Color contrast: ink on white ≥ 7:1, blue CTA on white ≥ 4.5:1.
- All interactive elements get `focus-visible:ring-2 ring-accent-blue/60`.
- Min tap target 44×44 on mobile for nav/footer/CTA.
- `<main>` already wraps content in `Home.tsx` — leave as-is.

## What I will NOT change

- Section ordering / business content on `Home.tsx` (only the divider component).
- Endorsements section (already corrected).
- Backend, RLS, edge functions, supabase config.
- Inner program pages — this pass focuses on global chrome + landing. Inner pages inherit the new tokens automatically.

## Technical notes

- Files touched (approx 10): `src/index.css`, `tailwind.config.ts`, `src/components/layout/HeaderScreenshot.tsx` (or `MainNavbar.tsx` — confirm during impl), `src/components/layout/Footer.tsx`, `src/components/layout/StickyMobileJoin.tsx` (tighten), `src/components/sections/LandingHero.tsx`, `src/components/ui/button.tsx`, `src/components/ui/card.tsx`, `src/pages/Home.tsx` (replace `EditorialDivider` with `SectionHeader`, shrink spacer), and an image audit pass across 6–10 section files.
- No new dependencies.
- Keep all existing translation keys (`LocaleContext`) — only swap classNames and structure.
