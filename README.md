# SCEF - Santos Creations Educational Foundation

A comprehensive web platform for the Santos Creations Educational Foundation (SCEF), featuring education programs, recognition awards, and community engagement across Africa.

## 🌍 Project Overview

SCEF operates a continuous, ever-growing standards system for education in Africa. This platform serves as the unified web ecosystem for:

- **Main HQ Website** (santoscreations.org)
- **Program Microsites** (NESA-Africa, EduAid-Africa, Rebuild My School Africa, etc.)
- **Local Chapter Microsites**
- **Role-based Dashboards**
- **GFA Wallet Integration**

## 🏆 NESA-Africa (New Education Standards Awards Africa)

NESA-Africa is the flagship continental education standards, recognition, and accountability platform.

### Key Features

- **Tiered Award Structure**: Platinum → Icon → Gold → Blue Garnet
- **Region-First Logic**: North, West, East, Central, Southern Africa
- **Phase-Aware System**: Dynamic CTAs based on current season phase
- **Vision 2035**: 10-year strategic roadmap with collapsible sections

### NESA File Structure

```
src/
├── pages/
│   └── programs/
│       └── NESAAfrica.tsx          # Main NESA landing page
├── components/
│   └── nesa/
│       ├── Vision2035Section.tsx   # Collapsible Vision 2035 document
│       └── StageBanner.tsx         # Phase-aware countdown banner
└── config/
    └── nesaSeasonConfig.ts         # Central season configuration
```

### Award Categories

| Tier | Type | Count | Voting |
|------|------|-------|--------|
| Platinum | Non-competitive | 17 categories | Baseline certification |
| Icon | Honorary | 9 icons (3 subcategories) | Selection-based |
| Gold | Competitive | 135 subcategories | 100% public vote |
| Blue Garnet | Competitive | 135 subcategories | 40% public / 60% jury |

### Season Timeline (2025-2027)

- **Oct 2025**: EduAid Webinars begin
- **Feb 2026**: Platinum Recognition Show
- **Mar 2026**: Icon Recognition Show
- **Apr-May 2026**: Gold Public Voting Window
- **May 2026**: Gold Winners Show
- **Jun 2026**: Blue Garnet Gala
- **Jun 2026-2027**: Rebuild My School Africa Legacy Phase

## 🛠 Technology Stack

- **Framework**: React 18 + Vite
- **Styling**: TailwindCSS + shadcn/ui
- **Language**: TypeScript
- **State**: React Query + Context
- **Backend**: Lovable Cloud (Supabase)
- **Animation**: Framer Motion

## 📁 Project Structure

```
src/
├── components/
│   ├── nesa/           # NESA-specific components
│   ├── eduaid/         # EduAid-Africa components
│   ├── sections/       # Shared page sections
│   ├── layout/         # Header, Footer, Navigation
│   ├── ui/             # shadcn/ui components
│   └── dashboard/      # Role-based dashboards
├── pages/
│   ├── programs/       # Program microsites
│   ├── awards/         # Award tier pages
│   ├── get-involved/   # Membership, Ambassador
│   └── admin/          # Admin panels
├── config/
│   ├── nesaSeasonConfig.ts
│   ├── programsPageContent.ts
│   └── siteContent.ts
├── contexts/           # React contexts
├── hooks/              # Custom hooks
└── locales/            # i18n translations (9 languages)
```

## 🌐 Multilingual Support

Supports 9 languages with RTL for Arabic:
- English, French, Arabic, Portuguese, Swahili
- Spanish, German, Russian, Chinese

## 🚀 Getting Started

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📖 Key Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/programs/nesa-africa` | NESA-Africa landing page |
| `/programs/eduaid-africa` | EduAid-Africa program |
| `/nominate` | Nomination portal |
| `/vote` | Voting portal |
| `/calendar` | NESA event calendar |
| `/chapters` | Local chapters directory |

## 🔐 Authentication & Roles

Role-based access system supporting:
- Member, Ambassador, Volunteer, Donor
- Chapter Admin, HQ Admin, Super Admin
- Board members (BOT, BOA, BOD)
- Division leads, LCP

## 📜 License

© Santos Creations Educational Foundation. All rights reserved.

---

**Live Preview**: [santoscreationsorg.lovable.app](https://santoscreationsorg.lovable.app)
