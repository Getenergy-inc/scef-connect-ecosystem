# SCEF Phase 2 — Full Content Review and Red-Flag Removal

## Goal
Complete a donor-due-diligence audit without redesigning the website. Preserve SCEF’s visual identity and programme architecture while correcting unsupported claims, centralising statuses and regional structure, strengthening evidence controls, and keeping all audit material admin-only.

## Delivery approach
This is a site-wide change across more than 100 routes, nine languages, database content, storage, automated emails, and the Sophia assistant. Work will follow the requested risk order, with each tranche validated before the next. Safe corrections will be applied directly; matters requiring documentary proof will be withheld or marked for management action rather than guessed.

## 1. Authoritative regional structure and immediate contradictions
- Replace the competing region datasets with one canonical 10-region source containing number, exact existing name/slug, type, description, status, and display order.
- Define Regions 1–8 as geographic African regions; Region 9 as **Africans in the Diaspora**; Region 10 as **Friends of Africa**. Global networks will have no country lists, capitals, or map polygons.
- Update maps, chapter pages, region pages, filters, membership forms, Edu-tourism content, metadata, translations, and Sophia knowledge to match the source.
- Show only Regions 1–8 on the geographic map and list Regions 9–10 separately.
- Replace conflicting “5+”, “8 approved”, “54 countries”, and reach-implying language with the approved organisational wording. Region and chapter activity remain separately labelled Active, Forming, or Planned.
- Publish the management-confirmed `scef_regions_count = 10` metric, explicitly noting that it describes organisational structure—not programme reach.
- Register and resolve the former regional contradiction starting at claim reference `SCEF-CL-018`.

## 2. Highest-risk public content
- Audit every donation, wallet, bank-account, scholarship-cost, and payment flow. Identify the legal recipient, purpose, refund/contact position, and operational status. Remove tax-benefit or return language unless documented. Flag personal recipients as CRITICAL.
- Audit every child image, testimonial, named story, portrait, and event image. Replace unsupported identity claims with “Representative image” or “Illustrative”; record consent requirements. Identifiable children without referenced guardian consent become SAFEGUARDING—CRITICAL and will be removed, replaced, or made non-identifiable.
- Audit partner, endorsement, sponsor, donor, collaborator, and engagement claims. Keep only documented classifications; otherwise use “Organisations SCEF has engaged with” or “Under discussion.” Remove unauthorised institutional logos and endorsement-implying SDG artwork.

## 3. Governance and legal identity
- Review all governance records and public renderers. Add personal-capacity wording where an external employer could imply institutional endorsement.
- Replace vacancy names shown as “TBD” with “Position open,” include open seats for Regions 9 and 10, add a neutral role description for Emmanuel Faleti, and correct duplicate management ordering.
- Register consent-to-list and employer-name permissions as management actions for every named governance member.
- Standardise the legal name as **Santos Creations Educational Foundation (SCEF), Nigeria** across pages, metadata, schema, donations, footer, and emails.
- Remove inconsistent or undocumented registration/tax/charity details; use “Registration details available on request” where approved details are absent.
- Describe programme brands as SCEF programmes, not separate legal entities. Correct Organization schema and `areaServed` so it describes the structure without claiming continent-wide operations.

## 4. Evidence storage and enforced workflow
- Create a private evidence bucket with admin-only access.
- Add an evidence-files table so each metric can hold multiple PDF, image, DOCX, and XLSX files; store paths and uploader metadata, never public URLs.
- Replace the text evidence field with real multi-file upload, file listing, and controlled download in the admin panel.
- Enforce sequential transitions in the database: DRAFT → EVIDENCE_UPLOADED → UNDER_REVIEW → VERIFIED → APPROVED_FOR_PUBLICATION → PUBLISHED; permit WITHDRAWN from any stage.
- Require a file or source URL before EVIDENCE_UPLOADED. Require verified evidence before later publication stages.
- Automatically stamp verifier user ID, verifier name, and verification date at VERIFIED. Show a same-person creator/verifier warning.
- Add an immutable stage-change audit table recording actor, timestamp, old stage, and new stage. Keep all evidence and logs admin-only with grants and RLS.

## 5. Impact page and central status systems
- Refactor `/impact` to use published `impact_metrics` only, with verified achievements and strategic targets in distinct sections matching `/transparency`.
- Remove hard-coded impact counters and obsolete counter logic so unsupported numbers cannot return.
- Create one central programme/platform status source. Every programme card and detail page will show Active, Pilot, In Development, Planned, Upcoming, Paused, or Completed.
- Default unconfirmed digital platforms/programmes to In Development and create management actions for confirmation. Green Horizon remains pilot/waitlist unless evidence confirms otherwise.
- Centralise region and chapter status. Unconfirmed regions/chapters default to Forming, not Active.

## 6. Complete route, content, locale, and automation audit
Review every route and reusable surface listed in the application, including mobile-only UI, nine locale files, SEO/Open Graph/JSON-LD, public text files, database-driven CMS records, downloads, email templates, and Sophia prompts/knowledge.

Corrections cover:
- unsupported superlatives, achievements, accreditations, awards, geographic reach, founding/service-duration contradictions, and programme-status claims;
- expired events, deadlines and countdowns; undated or unsourced news/media claims;
- placeholders, sample content, dead links/buttons, wrong domains, inconsistent contact details, and unverified social accounts;
- privacy, terms, cookies, safeguarding and data-protection pages. Where adopted text is unavailable, pages will show “Document pending publication,” not invented legal policy;
- consent checkboxes and privacy links on personal-data forms; age and guardian-consent handling for potentially under-18 forms;
- Sophia instructions to use the canonical regions, never state unverified figures/relationships, say “Verification in progress,” and direct due-diligence queries to the transparency contact;
- vacancy, membership, donation and other automated messages for the same identity and evidence rules.

## 7. Internal register, live audit summary, and management actions
- Add every finding to `claims_evidence_register` with page, exact text, A/B category, risk, action, approved wording, and resolution state. Claim references continue sequentially from `SCEF-CL-018`.
- Extend the register schema only where required for category/action/resolution fields.
- Replace the static admin audit narrative with live totals grouped by category, risk, status, and action.
- Add an admin-only management-action table and panel tab with item, category, requested decision/document, owner, due date, priority, status, and related claim.
- Seed required actions for region/chapter statuses, registration details, partnership agreements, board consents, child-photo consents, programme statuses, audited accounts, policies, and other evidence uncovered by the audit.
- Do not expose the register, summary, files, workflow log, or action list publicly.

## 8. Validation and completion report
- Search source, translations, metadata, schema, assistant content, and database-managed copy for every banned/withdrawn phrase and conflicting regional count.
- Test representative public and admin flows at desktop (1280px), tablet, and mobile sizes, including region navigation, map/global-network separation, metric publishing controls, file upload, management actions, and forms.
- Verify admin authorization and private-file access boundaries.
- Report pages/routes reviewed, changes by A1–A4 and B1–B12, resolved/open findings, all remaining CRITICAL items, and exact management inputs required.

## Technical notes
- Database schema changes use additive migrations with grants and RLS in the same migration.
- Existing records are updated through data queries, not schema migrations.
- Existing SCEF tokens/components and page structures remain authoritative; this is a content, governance, and control-system correction—not a redesign.
- Existing documentary history is retained with dates and context where valid. No figures, agreements, consent, legal identifiers, people, or outcomes will be invented.
