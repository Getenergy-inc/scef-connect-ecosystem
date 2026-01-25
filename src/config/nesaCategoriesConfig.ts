// ========================================
// NESA-Africa Official Categories Configuration
// Authoritative source for all 17 award categories
// Season: 2025 (hosted 2026)
// ========================================

// ========================================
// TYPE DEFINITIONS
// ========================================

export type CategoryScope = 'NIGERIA' | 'AFRICA_REGIONAL' | 'INTERNATIONAL' | 'ICON';

export type TierApplicability = {
  platinum: boolean;
  gold: boolean;
  blueGarnet: boolean;
  icon: boolean;
};

export interface Subcategory {
  id: string;
  name: string;
  description?: string;
  region?: AfricaRegion; // Only for regional categories after expansion
  zone?: NigeriaZone; // For zone-based scoring (Category 14)
}

export interface NESACategory {
  id: string;
  categoryNumber: number;
  name: string;
  slug: string;
  scope: CategoryScope;
  description: string;
  tiers: TierApplicability;
  isRegional: boolean;
  baseSubcategories: Subcategory[];
  totalSubcategoryCount: number;
  selectionNotes?: string;
}

// ========================================
// AFRICA REGIONS (5 regions for multiplication)
// ========================================
export const AFRICA_REGIONS = [
  'North Africa',
  'West Africa', 
  'East Africa',
  'Central Africa',
  'Southern Africa',
] as const;
export type AfricaRegion = typeof AFRICA_REGIONS[number];

// ========================================
// NIGERIA GEOPOLITICAL ZONES (6 zones)
// ========================================
export const NIGERIA_ZONES = [
  'North Central',
  'North East',
  'North West',
  'South East',
  'South South',
  'South West',
] as const;
export type NigeriaZone = typeof NIGERIA_ZONES[number];

// Short codes for zones
export const NIGERIA_ZONE_CODES: Record<NigeriaZone, string> = {
  'North Central': 'NC',
  'North East': 'NE',
  'North West': 'NW',
  'South East': 'SE',
  'South South': 'SS',
  'South West': 'SW',
};

// ========================================
// TIER PRESETS
// ========================================
const GOLD_TO_BLUE_GARNET: TierApplicability = {
  platinum: false,
  gold: true,
  blueGarnet: true,
  icon: false,
};

const PLATINUM_TO_GOLD: TierApplicability = {
  platinum: true,
  gold: true,
  blueGarnet: false,
  icon: false,
};

const ICON_ONLY: TierApplicability = {
  platinum: false,
  gold: false,
  blueGarnet: false,
  icon: true,
};

// ========================================
// THE 17 OFFICIAL NESA-AFRICA CATEGORIES
// ========================================

export const NESA_CATEGORIES: NESACategory[] = [
  // ----------------------------------------
  // CATEGORY 1: Best CSR in Education (Africa Regional)
  // ----------------------------------------
  {
    id: 'csr-education-africa',
    categoryNumber: 1,
    name: 'Best CSR in Education (Africa Regional)',
    slug: 'best-csr-education-africa',
    scope: 'AFRICA_REGIONAL',
    description: 'Recognizing corporate social responsibility excellence in education across African regions.',
    tiers: GOLD_TO_BLUE_GARNET,
    isRegional: true,
    baseSubcategories: [
      { id: 'banking-finance', name: 'Banking & Finance CSR' },
      { id: 'telecommunications', name: 'Telecommunications CSR' },
      { id: 'technology-ict', name: 'Technology & ICT CSR' },
      { id: 'oil-gas', name: 'Oil & Gas CSR' },
      { id: 'food-beverages', name: 'Food & Beverages CSR' },
      { id: 'aviation', name: 'Aviation CSR' },
    ],
    totalSubcategoryCount: 30, // 6 × 5 regions
  },

  // ----------------------------------------
  // CATEGORY 2: Best CSR in Education (Nigeria)
  // ----------------------------------------
  {
    id: 'csr-education-nigeria',
    categoryNumber: 2,
    name: 'Best CSR in Education (Nigeria)',
    slug: 'best-csr-education-nigeria',
    scope: 'NIGERIA',
    description: 'Recognizing Nigerian corporations leading in educational corporate social responsibility.',
    tiers: GOLD_TO_BLUE_GARNET,
    isRegional: false,
    baseSubcategories: [
      { id: 'banking-finance', name: 'Banking & Finance' },
      { id: 'telecommunications', name: 'Telecommunications' },
      { id: 'oil-gas', name: 'Oil & Gas' },
      { id: 'food-beverages', name: 'Food & Beverages' },
      { id: 'manufacturing', name: 'Manufacturing' },
      { id: 'aviation', name: 'Aviation' },
      { id: 'technology-it', name: 'Technology & IT' },
      { id: 'real-estate-construction', name: 'Real Estate & Construction' },
      { id: 'retail-ecommerce', name: 'Retail & E-Commerce' },
      { id: 'pharmaceuticals', name: 'Pharmaceuticals' },
      { id: 'insurance', name: 'Insurance' },
      { id: 'conglomerates', name: 'Conglomerates' },
      { id: 'media-entertainment', name: 'Media & Entertainment' },
      { id: 'agriculture-agribusiness', name: 'Agriculture & Agribusiness' },
      { id: 'healthcare-hospitals', name: 'Health Care & Hospitals' },
      { id: 'professional-services', name: 'Professional Services' },
      { id: 'fintech', name: 'FinTech' },
      { id: 'microfinance-banks', name: 'Microfinance Banks' },
      { id: 'emerging-telecommunications', name: 'Emerging Telecommunications' },
      { id: 'technology-software', name: 'Technology & Software' },
      { id: 'real-estate-development', name: 'Real Estate Development' },
      { id: 'commercial-retail', name: 'Commercial Retail' },
      { id: 'hotels-hospitality', name: 'Hotels & Hospitality' },
    ],
    totalSubcategoryCount: 23,
  },

  // ----------------------------------------
  // CATEGORY 3: Best EduTech Organisation (Africa Regional)
  // ----------------------------------------
  {
    id: 'edutech-africa',
    categoryNumber: 3,
    name: 'Best EduTech Organisation (Africa Regional)',
    slug: 'best-edutech-organisation-africa',
    scope: 'AFRICA_REGIONAL',
    description: 'Celebrating innovation in educational technology across African regions.',
    tiers: GOLD_TO_BLUE_GARNET,
    isRegional: true,
    baseSubcategories: [
      { id: 'edutech-startup', name: 'EduTech Startup' },
      { id: 'edutech-established', name: 'EduTech Established Company' },
      { id: 'edutech-social-impact', name: 'EduTech Social Impact Initiative' },
    ],
    totalSubcategoryCount: 15, // 3 × 5 regions
  },

  // ----------------------------------------
  // CATEGORY 4: Best Media Organisation in Educational Advocacy (Nigeria)
  // ----------------------------------------
  {
    id: 'media-education-nigeria',
    categoryNumber: 4,
    name: 'Best Media Organisation in Educational Advocacy (Nigeria)',
    slug: 'best-media-organisation-nigeria',
    scope: 'NIGERIA',
    description: 'Honoring Nigerian media organizations championing educational advocacy.',
    tiers: GOLD_TO_BLUE_GARNET,
    isRegional: false,
    baseSubcategories: [
      { id: 'print-media', name: 'Print Media Educational Advocacy' },
      { id: 'radio', name: 'Radio Educational Programme Excellence' },
      { id: 'television', name: 'Television Educational Content' },
      { id: 'digital-media', name: 'Digital Media Educational Advocacy' },
    ],
    totalSubcategoryCount: 4,
  },

  // ----------------------------------------
  // CATEGORY 5: Best NGO Contribution to Education (Nigeria)
  // ----------------------------------------
  {
    id: 'ngo-education-nigeria',
    categoryNumber: 5,
    name: 'Best NGO Contribution to Education (Nigeria)',
    slug: 'best-ngo-contribution-nigeria',
    scope: 'NIGERIA',
    description: 'Recognizing Nigerian NGOs making significant contributions to education.',
    tiers: GOLD_TO_BLUE_GARNET,
    isRegional: false,
    baseSubcategories: [
      { id: 'infrastructure', name: 'Educational Infrastructure Development' },
      { id: 'materials', name: 'Donation of Educational Materials' },
      { id: 'aid-scholarships', name: 'Education Aid & Scholarship Support' },
      { id: 'youth-empowerment', name: 'Youth Empowerment through Education' },
      { id: 'women-girls', name: "Women & Girls' Education Empowerment" },
    ],
    totalSubcategoryCount: 5,
  },

  // ----------------------------------------
  // CATEGORY 6: Best NGO Contribution to Education for All (Africa Regional)
  // ----------------------------------------
  {
    id: 'ngo-education-africa',
    categoryNumber: 6,
    name: 'Best NGO Contribution to Education for All (Africa Regional)',
    slug: 'best-ngo-contribution-africa',
    scope: 'AFRICA_REGIONAL',
    description: 'Celebrating NGOs advancing education for all across African regions.',
    tiers: GOLD_TO_BLUE_GARNET,
    isRegional: true,
    baseSubcategories: [
      { id: 'infrastructure', name: 'Educational Infrastructure' },
      { id: 'aid-scholarships', name: 'Education Aid & Scholarships' },
      { id: 'materials-resources', name: 'Educational Materials & Resources' },
      { id: 'youth-skills', name: 'Youth Skills & Learning Programmes' },
      { id: 'women-girls', name: "Women & Girls' Education Advocacy" },
    ],
    totalSubcategoryCount: 25, // 5 × 5 regions
  },

  // ----------------------------------------
  // CATEGORY 7: Best STEM Education Programme (Africa Regional)
  // ----------------------------------------
  {
    id: 'stem-education-africa',
    categoryNumber: 7,
    name: 'Best STEM Education Programme (Africa Regional)',
    slug: 'best-stem-education-africa',
    scope: 'AFRICA_REGIONAL',
    description: 'Honoring excellence in STEM education programmes across African regions.',
    tiers: GOLD_TO_BLUE_GARNET,
    isRegional: true,
    baseSubcategories: [
      { id: 'inclusive-stem', name: 'Inclusive STEM Programme' },
      { id: 'digital-stem', name: 'Digital STEM Innovation' },
      { id: 'community-stem', name: 'Community-Based STEM Outreach' },
      { id: 'girls-stem', name: 'Girls in STEM Advancement' },
    ],
    totalSubcategoryCount: 20, // 4 × 5 regions
  },

  // ----------------------------------------
  // CATEGORY 8: Creative Arts Industry Contribution to Education (Nigeria)
  // ----------------------------------------
  {
    id: 'creative-arts-nigeria',
    categoryNumber: 8,
    name: 'Creative Arts Industry Contribution to Education (Nigeria)',
    slug: 'creative-arts-contribution-nigeria',
    scope: 'NIGERIA',
    description: 'Recognizing Nigerian creative arts industry contributions to education.',
    tiers: GOLD_TO_BLUE_GARNET,
    isRegional: false,
    baseSubcategories: [
      { id: 'nollywood', name: 'Nollywood Educational Content' },
      { id: 'music', name: 'Music Industry Contribution' },
      { id: 'literature', name: 'Literature & Artistic Works' },
      { id: 'visual-arts', name: 'Visual Arts Educational Impact' },
      { id: 'performing-arts', name: 'Performing Arts & Education' },
      { id: 'film-media', name: 'Film & Media for Education' },
      { id: 'creative-advocacy', name: 'Creative Advocacy Campaigns' },
    ],
    totalSubcategoryCount: 7,
  },

  // ----------------------------------------
  // CATEGORY 9: Best Education-Friendly State (Nigeria)
  // ----------------------------------------
  {
    id: 'education-friendly-state',
    categoryNumber: 9,
    name: 'Best Education-Friendly State (Nigeria)',
    slug: 'best-education-friendly-state',
    scope: 'NIGERIA',
    description: 'Recognizing Nigerian states leading in educational development and policy.',
    tiers: GOLD_TO_BLUE_GARNET,
    isRegional: false,
    baseSubcategories: NIGERIA_ZONES.map(zone => ({
      id: NIGERIA_ZONE_CODES[zone].toLowerCase(),
      name: zone,
      zone: zone,
    })),
    totalSubcategoryCount: 6,
  },

  // ----------------------------------------
  // CATEGORY 10: Best Library in Nigerian Tertiary Institutions
  // ----------------------------------------
  {
    id: 'library-tertiary-nigeria',
    categoryNumber: 10,
    name: 'Best Library in Nigerian Tertiary Institutions',
    slug: 'best-library-tertiary-nigeria',
    scope: 'NIGERIA',
    description: 'Celebrating excellence in academic library services across Nigerian tertiary institutions.',
    tiers: PLATINUM_TO_GOLD,
    isRegional: false,
    baseSubcategories: [
      { id: 'federal-universities', name: 'Federal Universities' },
      { id: 'state-universities', name: 'State Universities' },
      { id: 'private-universities', name: 'Private Universities' },
      { id: 'federal-polytechnics', name: 'Federal Polytechnics' },
      { id: 'state-polytechnics', name: 'State Polytechnics' },
      { id: 'colleges-education', name: 'Colleges of Education' },
      { id: 'private-colleges', name: 'Private Colleges & Specialised Institutions' },
      { id: 'nursing-colleges', name: 'Colleges of Nursing & Allied Health' },
    ],
    totalSubcategoryCount: 8,
  },

  // ----------------------------------------
  // CATEGORY 11: Best Research & Development Contribution to Education (Nigeria)
  // ----------------------------------------
  {
    id: 'research-development-nigeria',
    categoryNumber: 11,
    name: 'Best Research & Development Contribution to Education (Nigeria)',
    slug: 'best-research-development-nigeria',
    scope: 'NIGERIA',
    description: 'Honoring research institutions advancing education through innovation.',
    tiers: PLATINUM_TO_GOLD,
    isRegional: false,
    baseSubcategories: [
      { id: 'agricultural-food', name: 'Agricultural & Food Research' },
      { id: 'health-medical', name: 'Health & Medical Research' },
      { id: 'environmental-climate', name: 'Environmental & Climate Research' },
    ],
    totalSubcategoryCount: 3,
  },

  // ----------------------------------------
  // CATEGORY 12: Christian Education Impact (Africa Regional)
  // ----------------------------------------
  {
    id: 'christian-education-africa',
    categoryNumber: 12,
    name: 'Christian Education Impact (Africa Regional)',
    slug: 'christian-education-impact-africa',
    scope: 'AFRICA_REGIONAL',
    description: 'Recognizing Christian faith-based contributions to education across Africa.',
    tiers: PLATINUM_TO_GOLD,
    isRegional: false, // Not multiplied by regions per spec
    baseSubcategories: [
      { id: 'faith-schools', name: 'Faith-Based Schools & Institutions' },
      { id: 'christian-ngos', name: 'Christian Education NGOs' },
      { id: 'christian-foundations', name: 'Christian Foundations & Philanthropy' },
    ],
    totalSubcategoryCount: 3,
  },

  // ----------------------------------------
  // CATEGORY 13: Islamic Education Impact (Africa Regional)
  // ----------------------------------------
  {
    id: 'islamic-education-africa',
    categoryNumber: 13,
    name: 'Islamic Education Impact (Africa Regional)',
    slug: 'islamic-education-impact-africa',
    scope: 'AFRICA_REGIONAL',
    description: 'Honoring Islamic faith-based contributions to education across Africa.',
    tiers: PLATINUM_TO_GOLD,
    isRegional: false, // Not multiplied by regions per spec
    baseSubcategories: [
      { id: 'quranic-islamiyya', name: "Qur'anic & Islamiyya Schools" },
      { id: 'integrated-islamic', name: 'Integrated Islamic-Formal Education' },
      { id: 'islamic-ngos', name: 'Islamic Education NGOs & Foundations' },
    ],
    totalSubcategoryCount: 3,
  },

  // ----------------------------------------
  // CATEGORY 14: Political Leaders' Educational Support (Nigeria)
  // ----------------------------------------
  {
    id: 'political-leaders-nigeria',
    categoryNumber: 14,
    name: "Political Leaders' Educational Support (Nigeria)",
    slug: 'political-leaders-education-nigeria',
    scope: 'NIGERIA',
    description: 'Recognizing political leaders championing education across Nigeria.',
    tiers: PLATINUM_TO_GOLD,
    isRegional: false,
    baseSubcategories: [
      { id: 'governors', name: "Governors' Educational Impact" },
      { id: 'national-assembly', name: 'National Assembly Education Support' },
      { id: 'ministers-commissioners', name: 'Ministers / Commissioners / Advisers' },
    ],
    totalSubcategoryCount: 3,
    selectionNotes: 'Assessed across 6 geopolitical zones; output is 3 winners. Zone is an attribute for scoring/records.',
  },

  // ----------------------------------------
  // CATEGORY 15: International & Bilateral Contributors to Education
  // ----------------------------------------
  {
    id: 'international-contributors',
    categoryNumber: 15,
    name: 'International & Bilateral Contributors to Education',
    slug: 'international-bilateral-contributors',
    scope: 'INTERNATIONAL',
    description: 'Honoring international organizations and foreign missions supporting African education.',
    tiers: PLATINUM_TO_GOLD,
    isRegional: false,
    baseSubcategories: [
      { id: 'embassies', name: 'Embassies & High Commissions' },
      { id: 'bilateral-agencies', name: 'Bilateral Aid Agencies' },
      { id: 'multilateral-ngos', name: 'Multilateral & International NGOs' },
      { id: 'grant-foundations', name: 'Global Education Grant Foundations' },
    ],
    totalSubcategoryCount: 4,
  },

  // ----------------------------------------
  // CATEGORY 16: Diaspora Association Educational Impact
  // ----------------------------------------
  {
    id: 'diaspora-education',
    categoryNumber: 16,
    name: 'Diaspora Association Educational Impact',
    slug: 'diaspora-association-education',
    scope: 'INTERNATIONAL',
    description: 'Celebrating diaspora communities contributing to African education.',
    tiers: PLATINUM_TO_GOLD,
    isRegional: false,
    baseSubcategories: [
      { id: 'europe-based', name: 'Europe-based Associations' },
      { id: 'americas-based', name: 'Americas-based Associations' },
      { id: 'middle-east-asia', name: 'Middle East / Asia-Pacific Associations' },
    ],
    totalSubcategoryCount: 3,
  },

  // ----------------------------------------
  // CATEGORY 17: Africa Education Icon Award (2005–2025)
  // ----------------------------------------
  {
    id: 'africa-education-icon',
    categoryNumber: 17,
    name: 'Africa Education Icon Award (2005–2025)',
    slug: 'africa-education-icon-award',
    scope: 'ICON',
    description: 'Lifetime achievement award for individuals with transformational impact on African education.',
    tiers: ICON_ONLY,
    isRegional: false,
    baseSubcategories: [
      { id: 'philanthropy-icon', name: 'Africa Education Philanthropy Icon of the Decade' },
      { id: 'literary-icon', name: 'Literary & New Curriculum Advocate Icon of the Decade' },
      { id: 'technical-icon', name: 'Africa Technical Educator Icon of the Decade' },
    ],
    totalSubcategoryCount: 9, // 3 subcategories × 3 icons each
    selectionNotes: '3 icons per subcategory (Africa/Diaspora/Friends of Africa), total 9 icons. Jury selection only, no public voting.',
  },
];

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Get all categories
 */
export function getAllCategories(): NESACategory[] {
  return NESA_CATEGORIES;
}

/**
 * Get categories by scope
 */
export function getCategoriesByScope(scope: CategoryScope): NESACategory[] {
  return NESA_CATEGORIES.filter(cat => cat.scope === scope);
}

/**
 * Get Africa Regional categories (for "Africa First" view)
 */
export function getAfricaRegionalCategories(): NESACategory[] {
  return NESA_CATEGORIES.filter(cat => 
    cat.scope === 'AFRICA_REGIONAL' || cat.scope === 'INTERNATIONAL' || cat.scope === 'ICON'
  );
}

/**
 * Get Nigeria-specific categories
 */
export function getNigeriaCategories(): NESACategory[] {
  return NESA_CATEGORIES.filter(cat => cat.scope === 'NIGERIA');
}

/**
 * Get category by slug
 */
export function getCategoryBySlug(slug: string): NESACategory | undefined {
  return NESA_CATEGORIES.find(cat => cat.slug === slug);
}

/**
 * Get category by ID
 */
export function getCategoryById(id: string): NESACategory | undefined {
  return NESA_CATEGORIES.find(cat => cat.id === id);
}

/**
 * Get categories by tier
 */
export function getCategoriesByTier(tier: keyof TierApplicability): NESACategory[] {
  return NESA_CATEGORIES.filter(cat => cat.tiers[tier]);
}

/**
 * Get competitive categories (Gold → Blue Garnet track)
 */
export function getCompetitiveCategories(): NESACategory[] {
  return NESA_CATEGORIES.filter(cat => cat.tiers.gold && cat.tiers.blueGarnet);
}

/**
 * Expand regional subcategories with region attribute
 * For regional categories, this multiplies base subcategories by 5 regions
 */
export function getExpandedSubcategories(category: NESACategory): Subcategory[] {
  if (!category.isRegional) {
    return category.baseSubcategories;
  }

  const expanded: Subcategory[] = [];
  for (const region of AFRICA_REGIONS) {
    for (const sub of category.baseSubcategories) {
      expanded.push({
        id: `${sub.id}-${region.toLowerCase().replace(/\s+/g, '-')}`,
        name: `${sub.name} (${region})`,
        description: sub.description,
        region: region,
      });
    }
  }
  return expanded;
}

/**
 * Get total subcategory count across all categories
 */
export function getTotalSubcategoryCount(): number {
  return NESA_CATEGORIES.reduce((sum, cat) => sum + cat.totalSubcategoryCount, 0);
}

/**
 * Get total competitive (Gold/Blue Garnet) subcategory count
 */
export function getTotalCompetitiveSubcategoryCount(): number {
  return NESA_CATEGORIES
    .filter(cat => cat.tiers.gold && cat.tiers.blueGarnet)
    .reduce((sum, cat) => sum + cat.totalSubcategoryCount, 0);
}

/**
 * Get tier badge info for display
 */
export function getTierBadges(tiers: TierApplicability): { label: string; variant: string }[] {
  const badges: { label: string; variant: string }[] = [];
  
  if (tiers.platinum) badges.push({ label: 'Platinum', variant: 'platinum' });
  if (tiers.gold) badges.push({ label: 'Gold', variant: 'gold' });
  if (tiers.blueGarnet) badges.push({ label: 'Blue Garnet', variant: 'blueGarnet' });
  if (tiers.icon) badges.push({ label: 'Icon', variant: 'icon' });
  
  return badges;
}

/**
 * Format category scope for display
 */
export function formatScope(scope: CategoryScope): string {
  switch (scope) {
    case 'NIGERIA': return 'Nigeria';
    case 'AFRICA_REGIONAL': return 'Africa Regional';
    case 'INTERNATIONAL': return 'International';
    case 'ICON': return 'Icon Award';
    default: return scope;
  }
}

// ========================================
// COMPUTED TOTALS (for display purposes)
// ========================================
export const TOTAL_CATEGORIES = NESA_CATEGORIES.length; // 17
export const TOTAL_COMPETITIVE_SUBCATEGORIES = getTotalCompetitiveSubcategoryCount(); // Should be 115
export const TOTAL_ALL_SUBCATEGORIES = getTotalSubcategoryCount();

// ========================================
// ICON SUBCATEGORIES (3 types, 9 total Icons)
// ========================================
export interface IconSubcategory {
  id: string;
  name: string;
  description: string;
  iconsPerSubcategory: number;
}

export const iconSubcategories: IconSubcategory[] = [
  {
    id: 'philanthropy',
    name: 'Africa Education Philanthropy Icon of the Decade',
    description: 'Sustained education philanthropy (2005–2025 impact window)',
    iconsPerSubcategory: 3,
  },
  {
    id: 'literary',
    name: 'Literary and New Curriculum Advocate Africa Education Icon of the Decade',
    description: 'Champions of literary excellence and curriculum innovation (2014–2024)',
    iconsPerSubcategory: 3,
  },
  {
    id: 'technical',
    name: 'Africa Technical Educator Icon of the Decade',
    description: 'Excellence in technical and vocational education (2014–2024)',
    iconsPerSubcategory: 3,
  },
];

export const TOTAL_ICON_SUBCATEGORIES = iconSubcategories.length;
export const TOTAL_ICONS = iconSubcategories.reduce((sum, sub) => sum + sub.iconsPerSubcategory, 0); // 9

// ========================================
// SEASON CONFIGURATION
// ========================================
export const NESA_SEASON = {
  seasonId: '2025',
  hostYear: 2026,
  seasonName: 'NESA-Africa 2025',
  impactWindow: {
    icon: { start: 2005, end: 2025 },
    general: { start: 2024, end: 2025 },
  },
};
