// ========================================
// NESA-Africa 2025 Season Configuration
// Central config for all dates, phases, CTAs, and award structure
// ========================================

export type NesaPhase = 
  | 'pre_launch'
  | 'webinar_series'
  | 'platinum_show'
  | 'icon_show'
  | 'icon_nominations'
  | 'gold_voting'
  | 'gold_show'
  | 'blue_garnet_voting'
  | 'blue_garnet_gala'
  | 'rebuild_phase'
  | 'post_season';

export interface PhaseConfig {
  id: NesaPhase;
  name: string;
  shortName: string;
  startDate: Date;
  endDate: Date;
  description: string;
  ctaText: string;
  ctaHref: string;
  ctaEnabled: boolean;
  showCountdown: boolean;
  color: string;
}

export interface AwardCategory {
  id: string;
  name: string;
  description: string;
  type: 'platinum' | 'icon' | 'gold' | 'blue_garnet';
  isRegional: boolean;
  regions?: string[];
  subcategories: string[];
  totalSubcategoryCount: number;
}

export interface IconSubcategory {
  id: string;
  name: string;
  description: string;
  iconsPerSubcategory: number;
}

// Africa Regions for regional awards
export const AFRICA_REGIONS = ['North', 'West', 'East', 'Central', 'Southern'] as const;
export type AfricaRegion = typeof AFRICA_REGIONS[number];

// Nigeria Zones for state awards
export const NIGERIA_ZONES = ['NC', 'NE', 'NW', 'SE', 'SS', 'SW'] as const;
export type NigeriaZone = typeof NIGERIA_ZONES[number];

// ========================================
// PHASE TIMELINE (Oct 14, 2025 - June 27, 2026)
// ========================================
export const nesaPhases: PhaseConfig[] = [
  {
    id: 'webinar_series',
    name: 'EduAid-Africa Webinar Series',
    shortName: 'Webinar Series',
    startDate: new Date('2025-10-14T00:00:00Z'),
    endDate: new Date('2026-06-27T23:59:59Z'),
    description: 'Monthly educational webinars building towards NESA recognition',
    ctaText: 'Register for Webinars',
    ctaHref: '/media/eduaid-webinars',
    ctaEnabled: true,
    showCountdown: false,
    color: 'hsl(210, 100%, 35%)', // Blue
  },
  {
    id: 'platinum_show',
    name: 'Platinum Online Recognition Show',
    shortName: 'Platinum Show',
    startDate: new Date('2026-02-28T18:00:00Z'),
    endDate: new Date('2026-02-28T21:00:00Z'),
    description: '3-hour live broadcast recognizing Platinum Certificate recipients',
    ctaText: 'Watch Live',
    ctaHref: '/media/nesa-awards-tv/platinum',
    ctaEnabled: true,
    showCountdown: true,
    color: 'hsl(0, 0%, 75%)', // Platinum/Silver
  },
  {
    id: 'icon_show',
    name: 'Icon Online Recognition Show',
    shortName: 'Icon Show',
    startDate: new Date('2026-03-28T18:00:00Z'),
    endDate: new Date('2026-03-28T21:00:00Z'),
    description: '3-hour live broadcast for Africa Education Icon nominees',
    ctaText: 'Watch Live',
    ctaHref: '/media/nesa-awards-tv/africa-icon',
    ctaEnabled: true,
    showCountdown: true,
    color: 'hsl(220, 80%, 40%)', // Royal Blue
  },
  {
    id: 'icon_nominations',
    name: 'Icon Nominations Period',
    shortName: 'Icon Nominations',
    startDate: new Date('2025-10-14T00:00:00Z'),
    endDate: new Date('2026-04-30T23:59:59Z'),
    description: 'Submit nominations for Africa Education Icon awards',
    ctaText: 'Nominate Now',
    ctaHref: '/nominate?category=icon',
    ctaEnabled: true,
    showCountdown: true,
    color: 'hsl(45, 92%, 42%)', // Gold
  },
  {
    id: 'gold_voting',
    name: 'Gold Public Voting',
    shortName: 'Gold Voting',
    startDate: new Date('2026-04-10T00:00:00Z'),
    endDate: new Date('2026-05-16T23:59:59Z'),
    description: 'Public voting for Gold Certificate awards (no judges)',
    ctaText: 'Vote Now',
    ctaHref: '/vote?stage=gold',
    ctaEnabled: true,
    showCountdown: true,
    color: 'hsl(45, 92%, 42%)', // Gold
  },
  {
    id: 'gold_show',
    name: 'Gold Winners Online TV Show',
    shortName: 'Gold Show',
    startDate: new Date('2026-05-17T18:00:00Z'),
    endDate: new Date('2026-05-17T21:00:00Z'),
    description: '3-hour live broadcast announcing Gold Certificate winners',
    ctaText: 'Watch Live',
    ctaHref: '/media/nesa-awards-tv/gold-certificate',
    ctaEnabled: true,
    showCountdown: true,
    color: 'hsl(45, 92%, 42%)', // Gold
  },
  {
    id: 'blue_garnet_voting',
    name: 'Blue Garnet Voting & Jury',
    shortName: 'Blue Garnet Voting',
    startDate: new Date('2026-05-18T00:00:00Z'),
    endDate: new Date('2026-06-17T23:59:59Z'),
    description: 'Public voting (40%) + Jury selection (60%) for Blue Garnet Awards',
    ctaText: 'Vote Now',
    ctaHref: '/vote?stage=blue-garnet',
    ctaEnabled: true,
    showCountdown: true,
    color: 'hsl(220, 70%, 35%)', // Blue Garnet
  },
  {
    id: 'blue_garnet_gala',
    name: 'Blue Garnet Awards Gala',
    shortName: 'Blue Garnet Gala',
    startDate: new Date('2026-06-27T18:00:00Z'),
    endDate: new Date('2026-06-27T23:59:59Z'),
    description: 'Grand ceremony in Lagos + Live Broadcast worldwide',
    ctaText: 'Get Tickets',
    ctaHref: '/tickets/blue-garnet-gala',
    ctaEnabled: true,
    showCountdown: true,
    color: 'hsl(220, 70%, 35%)', // Blue Garnet
  },
  {
    id: 'rebuild_phase',
    name: 'Rebuild My School Africa',
    shortName: 'RMSA Phase',
    startDate: new Date('2026-06-27T00:00:00Z'),
    endDate: new Date('2027-06-30T23:59:59Z'),
    description: '1 Special Needs school facility per African region (5 total)',
    ctaText: 'Support RMSA',
    ctaHref: '/programs/rebuild-my-school-africa',
    ctaEnabled: true,
    showCountdown: false,
    color: 'hsl(142, 71%, 35%)', // Green
  },
];

// ========================================
// ICON SUBCATEGORIES (3 types, 9 total Icons)
// ========================================
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

// ========================================
// CATEGORY CONFIGURATION
// ========================================
// NOTE: All category definitions have been moved to src/config/nesaCategoriesConfig.ts
// Import from there: getCompetitiveCategories, getCategoriesByTier, TOTAL_COMPETITIVE_SUBCATEGORIES, etc.

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Get the current phase based on today's date
 */
export function getCurrentPhase(): PhaseConfig | null {
  const now = new Date();
  
  // Find active phases (can have multiple active at once)
  const activePhases = nesaPhases.filter(
    phase => now >= phase.startDate && now <= phase.endDate
  );
  
  // Prioritize certain phases over others
  const priorityOrder: NesaPhase[] = [
    'blue_garnet_gala',
    'blue_garnet_voting',
    'gold_show',
    'gold_voting',
    'icon_show',
    'platinum_show',
    'icon_nominations',
    'webinar_series',
    'rebuild_phase',
  ];
  
  for (const phaseId of priorityOrder) {
    const found = activePhases.find(p => p.id === phaseId);
    if (found) return found;
  }
  
  return null;
}

/**
 * Get the next upcoming phase
 */
export function getNextPhase(): PhaseConfig | null {
  const now = new Date();
  const upcoming = nesaPhases
    .filter(phase => phase.startDate > now)
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  
  return upcoming[0] || null;
}

/**
 * Get all phases that should show countdown
 */
export function getCountdownPhases(): PhaseConfig[] {
  const now = new Date();
  return nesaPhases.filter(
    phase => phase.showCountdown && phase.startDate > now
  ).sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
}

/**
 * Format date for display
 */
export function formatPhaseDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Get time remaining until a date
 */
export function getTimeRemaining(targetDate: Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
} {
  const now = new Date().getTime();
  const target = targetDate.getTime();
  const total = target - now;
  
  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }
  
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  
  return { days, hours, minutes, seconds, total };
}

/**
 * Determine which CTA to show based on current phase
 */
export function getPrimaryCTA(): { text: string; href: string; variant: 'nominate' | 'vote' | 'watch' | 'tickets' | 'donate' } {
  const currentPhase = getCurrentPhase();
  
  if (!currentPhase) {
    return { text: 'Donate', href: '/donate', variant: 'donate' };
  }
  
  switch (currentPhase.id) {
    case 'gold_voting':
    case 'blue_garnet_voting':
      return { text: 'Vote Now', href: currentPhase.ctaHref, variant: 'vote' };
    case 'platinum_show':
    case 'icon_show':
    case 'gold_show':
      return { text: 'Watch Live', href: currentPhase.ctaHref, variant: 'watch' };
    case 'blue_garnet_gala':
      return { text: 'Get Tickets', href: currentPhase.ctaHref, variant: 'tickets' };
    case 'icon_nominations':
    case 'webinar_series':
      return { text: 'Nominate', href: '/nominate', variant: 'nominate' };
    default:
      return { text: 'Donate', href: '/donate', variant: 'donate' };
  }
}

/**
 * Check if voting is currently open
 */
export function isVotingOpen(): { gold: boolean; blueGarnet: boolean } {
  const now = new Date();
  const goldPhase = nesaPhases.find(p => p.id === 'gold_voting');
  const blueGarnetPhase = nesaPhases.find(p => p.id === 'blue_garnet_voting');
  
  return {
    gold: goldPhase ? now >= goldPhase.startDate && now <= goldPhase.endDate : false,
    blueGarnet: blueGarnetPhase ? now >= blueGarnetPhase.startDate && now <= blueGarnetPhase.endDate : false,
  };
}
