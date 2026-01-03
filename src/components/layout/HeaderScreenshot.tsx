import { TopUtilityNav } from "./TopUtilityNav";
import { MainNavbar } from "./MainNavbar";

export const HeaderScreenshot = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <TopUtilityNav />
      <MainNavbar />
    </header>
  );
};
