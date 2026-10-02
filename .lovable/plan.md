# SCEF Institutional Operating Platform — Audit, Gap Analysis and Phased Build

## A. Current system audit
- **Pages:** about 240 pages, including 29 admin screens (users, chapters, donations, finance/bank accounts/disbursements, CSR funding funnel, impact evidence, waitlists, scholarships, vacancies, endorsements, CRS partners, digital board, Sophia FAQs, reports) and a small set of dashboard pages.
- **Sign-in and roles:** email and Google sign-in. Roles are stored in a separate table. There are 15 roles (member through super admin, staff, division lead, board roles, chapter presidents). Admin checks happen on the server.
- **Database:** 87 tables, all with row-level security turned on. Existing tables that already match parts of this brief:
  - Programmes: programs, services
  - Funding: csr_projects, csr_milestones, csr_project_reports, csr_inquiries, donations, donation_receipts, disbursement_requests, wallets/transactions, bank_accounts
  - Partners: crs_partners, endorsements, endorser_profiles, sponsor_profiles, partnership_inquiries
  - Impact: impact_metrics, claims_evidence_register
  - Certificates: certificate_verifications, scholarship exams
  - People: governance_profiles, staff_*, chapters, volunteers/ambassadors
  - Other: events, webinar_registrations, elibrary_resources, media_items, audit_logs
- **Storage:** 12 file buckets. Private buckets: chapter-documents, receipts, scholarship-docs, school-documents, vacancy-applications.
- **Server functions:** payment webhooks, Sophia chat and tracking, vacancy email, scholarship exam, partnership inquiry, public chapters, voiceover, YouTube live status, staff AI assistant.

## B. Gap analysis (summary)
| Area | Status |
|---|---|
| Programmes (s5–6) | EXTEND `programs` (code, status, pillar, lead, visibility, SEO) |
| Project bank, work packages, activities, milestones, budgets, budget lines, risks (s7–15) | NEW — reuse `csr_projects`/`csr_milestones` as funded-project links (MERGE later) |
| Funders, opportunities, verification, eligibility, matching, applications, requirements, approvals, versions, deadlines (s16–27, 80–83, 91) | NEW |
| Partnership CRM, partner contacts/engagements/agreements, logo control (s28–31) | NEW `partners`; MIGRATE `crs_partners` and `endorsements` into it as classified records |
| Beneficiaries and safeguarding (s32–33, 102) | NEW, with restricted access |
| Impact engine (s34–43) | EXTEND `impact_metrics`; NEW `impact_records`, `impact_evidence`, logframe, theory of change |
| Policy outcomes, research, publications, E-Journal (s44–45, 51–53) | NEW |
| Training, certificates, employment (s46–50) | NEW courses/cohorts/enrolments/attendance/assessments; EXTEND `certificate_verifications` into a certificates register with a mandatory certification type |
| Events and It's In Me (s54–55) | EXTEND `events`, `media_items` (separate registered, attended, viewed and estimated counts) |
| Opportunities hub (s56–57) | NEW |
| Donations and expenses (s58–59) | EXTEND `donations`; NEW `expenses` linked to project, activity and budget line |
| Documents, data room, policy register, expiry (s60–64, 97) | NEW, with a private bucket and version history |
| Granular roles and permissions, separation of duties (s65–67) | EXTEND roles enum; NEW permissions and role-permission tables |
| Audit log (s68) | EXTEND `audit_logs` with automatic logging on sensitive tables |
| Command centre, dashboards, alerts, search, export, reports (s69–79, 84, 92–93) | NEW admin area reading the tables above |
| Content approval and claim checker (s85–87) | NEW workflow plus a phrase checker |
| AI admin assistant (s88–89) | EXTEND staff AI assistant (read-only, outputs labelled "AI draft — human review required") |

## C. Database migration plan
- **Keep:** auth, user_roles, profiles, governance, chapters, chat, wallets, scholarships, waitlists.
- **Extend:** programs, impact_metrics, events, media_items, donations, certificate_verifications, audit_logs, app_role.
- **Merge or migrate (copy only; originals stay):** crs_partners and endorsements go into partners; csr_projects links to projects.
- **Create:** about 45 new tables, as listed in section B.
- **Archive:** none. Old tables get a "deprecated" note once nothing uses them. No tables are dropped and no data is deleted.

## D. Security review
- **Public inserts:** these tables accept public form submissions: ambassador_applications, certificate_verifications, chapter_signups, csr_inquiries, sophia_visitor_analytics. Each needs length checks and a check that the submitter is real.
- **programs:** public read is fully open. This is acceptable for now, but it will be limited to rows marked public once new fields are added.
- **Public file buckets:** profile-photos, contributor-photos and hall-of-fame may hold photos of children. Child-safety review required.
- **certificates bucket:** public. Move to verification-code access only.
- **Admin role check:** the admin page shell trusts hq_admin, but the server-side `is_admin` check does not. This needs to be aligned.
- **Leaked-password protection:** still to be turned on manually.
- **New sensitive data:** all new sensitive tables (beneficiaries, safeguarding, finance, data room, partner contacts) will be readable only by named roles. No anonymous access.

## E. Implementation phases (each one tested before the next)
1. **Foundation:** granular roles and permissions, automatic audit logging, data classification types, document register, private buckets.
2. **Project Bank:** programmes extension, projects, work packages, activities, milestones, budgets, risks, readiness checklist, admin screens.
3. **Funding Command Centre:** funders, opportunities, verification, eligibility, matching, application workspace, approval gate, deadline engine, version history, decision centre.
4. **Partnership Command Centre:** partners migration and logo control so public partner sections read only formal, verified, permitted rows.
5. **Impact and M&E:** impact records and evidence, logframe, theory of change visual, policy outcomes, public counters fed only by verified records.
6. **Training, certificates and employment, opportunities hub,** public certificate verification.
7. **Research, publications, E-Journal, events and media reach.**
8. **Data room, policy register, expiry alerts, safeguarding workflow.**
9. **Executive command centre:** dashboards, alerts, global search, exports, reports, content approval, claim checker, AI assistant.
10. **Acceptance test:** confirm every question in section 112 can be answered from records.

## F. Dependencies (management or third party)
- Legal documents: CAC certificate IT-41501, tax/TIN, audited accounts, approved policies.
- Partner agreements and logo permissions; board consent letters; child-photo consents.
- Programme and project lists with real statuses, budgets and leads.
- Funding opportunities: entered and verified by staff. No automatic web scraping without separate approval.
- Email: the existing vacancy-confirmation email setup is reused; other email types need approval.
- Payment providers (Paystack/Flutterwave): existing; account ownership to be confirmed (EduAid Africa Ltd).
- Two-step login (MFA): needs a decision on which roles must use it.

## G. Data requiring verification
- **Impact and beneficiary figures:** all public figures are already withheld ("Verification in progress"). The 17 existing claim records (SCEF-CL-001–017) plus Phase 2 items will be linked to impact records.
- **Partner claims:** FAWE, CSACEFA, GetEnergy, PKIS, every row in crs_partners and endorsements.
- **Accreditation:** AEPC/EOA certifications, the ACDL/AWPC 24-month cycle, any "certified" wording.
- **Funding:** CSR funding funnel figures, EduAid Africa Ltd receiving account, scholarship cost-per-child.
- **Geographic:** region and chapter statuses (default Forming); the Borno State reference for Green Horizon.
- **Targets:** EduAid 2032 targets and Vision 2035, to be stored as TARGET.

## Rules applied throughout
- Additive migrations only.
- Grants and row-level security in the same step as each new table.
- No invented records.
- The AI assistant never publishes, approves, verifies or submits anything.
