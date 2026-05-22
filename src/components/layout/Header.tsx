import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";

/**
 * Unified site header.
 *
 * Previously this file contained a standalone navigation implementation that
 * diverged from the landing-page navbar. To guarantee that every page in the
 * site renders the exact same TopUtilityNav + MainNavbar combination shown on
 * the landing page, this component now re-exports the shared HeaderScreenshot.
 *
 * Do not reintroduce a separate header design here — edit MainNavbar /
 * TopUtilityNav instead so the change propagates everywhere.
 */
export const Header = () => <HeaderScreenshot />;

export default Header;
