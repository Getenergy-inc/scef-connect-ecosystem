import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";

/**
 * Unified site header (authenticated alias).
 *
 * Pages historically imported `AuthenticatedHeader` for logged-in views, but
 * the landing-page navbar (TopUtilityNav + MainNavbar) already handles auth
 * state internally. To keep one single source of truth for the site header,
 * this component now renders the shared HeaderScreenshot.
 */
export const AuthenticatedHeader = () => <HeaderScreenshot />;

export default AuthenticatedHeader;
