/**
 * Waiting list configuration.
 * Update WAITLIST_CAPACITY to change the available seats for the Seychelles 2027 event.
 */
export const WAITLIST_CAPACITY = 500;

export const WAITLIST_SOURCE = "seychelles-2027-waiting-list";

/** Countries shown in the form (Indian Ocean region prioritised first). */
export const WAITLIST_COUNTRIES: string[] = [
  // Indian Ocean Islands (focus region)
  "Seychelles",
  "Comoros",
  "Madagascar",
  "Mauritius",
  // Rest of Africa
  "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cameroon", "Central African Republic", "Chad",
  "Democratic Republic of the Congo", "Republic of the Congo",
  "Côte d'Ivoire", "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea",
  "Eswatini", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea",
  "Guinea-Bissau", "Kenya", "Lesotho", "Liberia", "Libya", "Malawi",
  "Mali", "Mauritania", "Morocco", "Mozambique", "Namibia", "Niger",
  "Nigeria", "Rwanda", "São Tomé and Príncipe", "Senegal", "Sierra Leone",
  "Somalia", "South Africa", "South Sudan", "Sudan", "Tanzania", "Togo",
  "Tunisia", "Uganda", "Zambia", "Zimbabwe",
  // Common diaspora / international partners
  "France", "United Kingdom", "United States", "Canada", "Germany",
  "Portugal", "Spain", "Brazil", "India", "China", "United Arab Emirates",
  "Other",
];

export const WAITLIST_ROLE_KEYS = [
  "educator", "administrator", "ngo", "government", "student",
  "researcher", "partner", "volunteer", "media", "other",
] as const;

export type WaitlistRoleKey = (typeof WAITLIST_ROLE_KEYS)[number];
