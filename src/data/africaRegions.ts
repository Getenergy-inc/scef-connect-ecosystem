// SCEF / NESA-Africa unified ten-region system
// Used by both the NESA-Africa landing map and SCEF Local Chapter Services.

export type RegionStatus = "active" | "proposed" | "planned" | "to-be-activated";

export interface AfricaRegion {
  slug: string;
  name: string;
  shortName: string;
  summary: string;
  legacyPathway: string;
  countriesCovered: string;
  chapterStatus: RegionStatus;
  nominationStatus: RegionStatus;
  votingStatus: RegionStatus;
  walletStatus: RegionStatus;
  interventionStatus: RegionStatus;
  eduTourismStatus: RegionStatus;
  // Coordinates (percent of viewBox) for the Africa silhouette overlay.
  mapX: number;
  mapY: number;
  // Off-continent (Diaspora / Friends of Africa) render in side rail.
  offContinent?: boolean;
}

export const SCEF_BRAND = {
  navy: "#0B1F3A",
  navyDeep: "#071B3A",
  gold: "#D4AF37",
  goldDeep: "#C89B2C",
  green: "#0F8A5F",
  greenAlt: "#1E8F5A",
  white: "#FFFFFF",
  lightBg: "#F7F9FC",
} as const;

export const AFRICA_REGIONS: AfricaRegion[] = [
  {
    slug: "north-africa",
    name: "North Africa",
    shortName: "North",
    summary:
      "Supporting education advocacy, chapter development, edu-tourism, school support, and regional partnerships across North African communities.",
    legacyPathway:
      "EduAid-Africa conferences → Special Needs School nominations → regional voting → GFA Wzip wallet → Rebuild My School Africa interventions.",
    countriesCovered: "Egypt, Libya, Tunisia, Algeria, Morocco, Western Sahara",
    chapterStatus: "proposed",
    nominationStatus: "to-be-activated",
    votingStatus: "planned",
    walletStatus: "to-be-activated",
    interventionStatus: "planned",
    eduTourismStatus: "planned",
    mapX: 50,
    mapY: 14,
  },
  {
    slug: "west-africa",
    name: "West Africa",
    shortName: "West",
    summary:
      "Supporting education recognition, special needs school nomination, local chapter activation, EduAid-Africa fundraising, and Rebuild My School Africa interventions across West African communities.",
    legacyPathway:
      "NESA-Africa recognition → EduAid-Africa conference → regional school voting → GFA Wzip wallet → Rebuild My School Africa intervention.",
    countriesCovered:
      "Nigeria, Ghana, Senegal, Côte d'Ivoire, Liberia, Sierra Leone, Guinea, Gambia, Togo, Benin, Cape Verde, Guinea-Bissau",
    chapterStatus: "active",
    nominationStatus: "active",
    votingStatus: "planned",
    walletStatus: "proposed",
    interventionStatus: "planned",
    eduTourismStatus: "planned",
    mapX: 28,
    mapY: 38,
  },
  {
    slug: "central-africa",
    name: "Central Africa",
    shortName: "Central",
    summary:
      "Strengthening chapters, school nominations, and Rebuild My School Africa pathways across the Central African belt.",
    legacyPathway:
      "EduAid-Africa conference → Special Needs nominations → regional voting → GFA Wzip wallet → Rebuild My School Africa intervention.",
    countriesCovered:
      "Cameroon, Chad, Central African Republic, DRC, Republic of Congo, Equatorial Guinea, Gabon, São Tomé and Príncipe",
    chapterStatus: "proposed",
    nominationStatus: "to-be-activated",
    votingStatus: "planned",
    walletStatus: "to-be-activated",
    interventionStatus: "planned",
    eduTourismStatus: "planned",
    mapX: 52,
    mapY: 52,
  },
  {
    slug: "east-africa",
    name: "East Africa",
    shortName: "East",
    summary:
      "Mobilising EduAid-Africa, NESA-Africa and Rebuild My School Africa work across East African chapters and partners.",
    legacyPathway:
      "NESA-Africa recognition → EduAid-Africa conference → regional voting → GFA Wzip wallet → Rebuild My School Africa intervention.",
    countriesCovered:
      "Kenya, Uganda, Tanzania, Rwanda, Burundi, South Sudan",
    chapterStatus: "proposed",
    nominationStatus: "to-be-activated",
    votingStatus: "planned",
    walletStatus: "to-be-activated",
    interventionStatus: "planned",
    eduTourismStatus: "planned",
    mapX: 70,
    mapY: 52,
  },
  {
    slug: "southern-africa",
    name: "Southern Africa",
    shortName: "Southern",
    summary:
      "Anchoring chapter growth, school nominations and regional impact partnerships across Southern African states.",
    legacyPathway:
      "EduAid-Africa conference → Special Needs nominations → regional voting → GFA Wzip wallet → Rebuild My School Africa intervention.",
    countriesCovered:
      "South Africa, Botswana, Zimbabwe, Zambia, Namibia, Mozambique, Malawi, Lesotho, Eswatini, Angola",
    chapterStatus: "proposed",
    nominationStatus: "to-be-activated",
    votingStatus: "planned",
    walletStatus: "to-be-activated",
    interventionStatus: "planned",
    eduTourismStatus: "planned",
    mapX: 58,
    mapY: 78,
  },
  {
    slug: "sahel-region",
    name: "Sahel Region",
    shortName: "Sahel",
    summary:
      "Reaching crisis-affected and underserved learners across the Sahel through chapter partnerships and education interventions.",
    legacyPathway:
      "Special Needs nominations → regional voting → GFA Wzip wallet → Rebuild My School Africa intervention.",
    countriesCovered:
      "Mali, Burkina Faso, Niger, Mauritania, northern Nigeria, northern Cameroon, Chad",
    chapterStatus: "proposed",
    nominationStatus: "planned",
    votingStatus: "planned",
    walletStatus: "to-be-activated",
    interventionStatus: "planned",
    eduTourismStatus: "planned",
    mapX: 40,
    mapY: 30,
  },
  {
    slug: "horn-of-africa",
    name: "Horn of Africa",
    shortName: "Horn",
    summary:
      "Building chapter pathways and Rebuild My School Africa nominations across the Horn of Africa.",
    legacyPathway:
      "Special Needs nominations → regional voting → GFA Wzip wallet → Rebuild My School Africa intervention.",
    countriesCovered: "Ethiopia, Eritrea, Djibouti, Somalia",
    chapterStatus: "proposed",
    nominationStatus: "planned",
    votingStatus: "planned",
    walletStatus: "to-be-activated",
    interventionStatus: "planned",
    eduTourismStatus: "planned",
    mapX: 78,
    mapY: 40,
  },
  {
    slug: "indian-ocean",
    name: "Indian Ocean",
    shortName: "Indian Ocean",
    summary:
      "Activating island-nation chapter partnerships, edu-tourism, and Rebuild My School Africa pathways across the Indian Ocean states.",
    legacyPathway:
      "Special Needs nominations → regional voting → GFA Wzip wallet → Rebuild My School Africa intervention.",
    countriesCovered:
      "Madagascar, Mauritius, Seychelles, Comoros, Réunion",
    chapterStatus: "proposed",
    nominationStatus: "planned",
    votingStatus: "planned",
    walletStatus: "to-be-activated",
    interventionStatus: "planned",
    eduTourismStatus: "planned",
    mapX: 86,
    mapY: 75,
  },
  {
    slug: "diaspora-global-africa",
    name: "Diaspora / Global Africa",
    shortName: "Diaspora",
    summary:
      "Mobilising Africans abroad to nominate schools, support regional wallets, sponsor interventions, and join diaspora-led chapters.",
    legacyPathway:
      "Diaspora chapters → Special Needs nominations → regional voting → GFA Wzip wallet → Rebuild My School Africa intervention.",
    countriesCovered:
      "African diaspora communities across the Americas, Europe, the Middle East, Asia and Oceania",
    chapterStatus: "active",
    nominationStatus: "planned",
    votingStatus: "planned",
    walletStatus: "to-be-activated",
    interventionStatus: "planned",
    eduTourismStatus: "planned",
    mapX: 8,
    mapY: 18,
    offContinent: true,
  },
  {
    slug: "friends-of-africa",
    name: "Friends of Africa",
    shortName: "Friends",
    summary:
      "Allies, partners and supporters worldwide who back EduAid-Africa, NESA-Africa, Rebuild My School Africa and Local Chapter Services.",
    legacyPathway:
      "Sponsorships → school nominations → regional voting → GFA Wzip wallet → Rebuild My School Africa intervention.",
    countriesCovered:
      "Global partners, foundations, CSR sponsors and individual supporters",
    chapterStatus: "proposed",
    nominationStatus: "planned",
    votingStatus: "planned",
    walletStatus: "to-be-activated",
    interventionStatus: "planned",
    eduTourismStatus: "planned",
    mapX: 8,
    mapY: 82,
    offContinent: true,
  },
];

export const getRegionBySlug = (slug: string) =>
  AFRICA_REGIONS.find((r) => r.slug === slug);

export const STATUS_LABEL: Record<RegionStatus, string> = {
  active: "Active",
  proposed: "Proposed",
  planned: "Planned",
  "to-be-activated": "To be activated",
};
