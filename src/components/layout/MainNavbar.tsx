import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import scefLogo from "@/assets/scef-logo.png";

type NavChild = { name: string; href: string; description?: string };
type NavItem = { name: string; href: string; children?: NavChild[] };

const NAV: NavItem[] = [
  {
    name: "About",
    href: "/about",
    children: [
      { name: "Who We Are", href: "/about", description: "Mission, identity & approach" },
      { name: "Vision 2037", href: "/about/vision-2037", description: "Our continental agenda" },
      { name: "History", href: "/about/history", description: "Our journey since 1997" },
      { name: "Governance", href: "/governance", description: "CVO, leadership & structure" },
      { name: "Board of Trustees", href: "/governance#bot" },
      { name: "Board of Advisors", href: "/governance#boa" },
      { name: "Board of Directors", href: "/governance#bod" },
      { name: "Local Chapter Presidents", href: "/governance#lcps" },
      { name: "Management Team", href: "/governance#management" },
    ],
  },
  {
    name: "Programs",
    href: "/programs",
    children: [
      { name: "All Programs", href: "/programs", description: "Browse the full hub" },
      { name: "NESA-Africa", href: "/programs/nesa-africa", description: "Continental awards engine" },
      { name: "EduAid-Africa", href: "/programs/eduaid-africa", description: "Scholarships & CSR" },
      { name: "Education Online Africa", href: "/programs/digital-learning", description: "Digital learning" },
      { name: "eLibrary Nigeria", href: "/programs/elibrary-nigeria", description: "Knowledge hub" },
      { name: "Rebuild My School Africa", href: "/programs/rebuild-my-school-africa", description: "Infrastructure renewal" },
      { name: "Women & Girls Empowerment", href: "/women-girls-empowerment", description: "Leadership & STEM" },
      { name: "Special Needs Education", href: "/programs/special-needs-education", description: "Inclusive advocacy" },
    ],
  },
  { name: "Impact", href: "/impact" },
  {
    name: "Timelines",
    href: "/calendar",
    children: [
      { name: "Events Calendar", href: "/calendar", description: "Webinars, walks & gala" },
      { name: "NESA-Africa Master Timeline", href: "/programs/nesa-africa/master-timeline", description: "2026 awards cycle" },
      { name: "EduAid-Africa Master Timeline", href: "/eduaid-africa/master-timeline", description: "Scholarship cycle" },
      { name: "Monthly Advocacy", href: "/advocacy/monthly", description: "Pan-African campaigns" },
    ],
  },
  {
    name: "Get Involved",
    href: "/get-involved",
    children: [
      { name: "Membership", href: "/membership", description: "Tiers & benefits" },
      { name: "Ambassador Program", href: "/get-involved/ambassador", description: "Lead the movement" },
      { name: "Volunteer", href: "/get-involved/volunteer", description: "Use your skills" },
      { name: "Chapters", href: "/local-chapters", description: "Join or start one" },
      { name: "Partner With Us", href: "/partner-with-us", description: "CSR & strategic" },
      { name: "Donate", href: "/donate", description: "Support the mission" },
    ],
  },
  {
    name: "Media",
    href: "/media",
    children: [
      { name: "NESA TV", href: "/media/nesa-tv", description: "Stories shaping education" },
      { name: "It's In Me Radio", href: "/media/its-in-me-radio", description: "Voices of African youth" },
      { name: "News & Press", href: "/updates", description: "Announcements & blog" },
      { name: "Gallery", href: "/media/gallery", description: "Photos & highlights" },
    ],
  },
  { name: "Contact", href: "/contact" },
];

export const MainNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <nav
      className={cn(
        "bg-white border-b border-border transition-shadow duration-200",
        scrolled ? "shadow-sm" : ""
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-6 h-12">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            aria-label="SCEF — Home"
          >
            <img
              src={scefLogo}
              alt="SCEF"
              className="h-6 w-auto object-contain"
              loading="eager"
              decoding="async"
            />
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="font-display font-semibold text-[12px] text-scef-blue-darker tracking-tight">
                SCEF
              </span>
              <span className="text-[9.5px] text-muted-foreground -mt-0.5 tracking-tight">
                Santos Creations Educational Foundation
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center h-full">
            <ul className="flex items-center h-full">
              {NAV.map((item) => {
                const hasMenu = !!item.children?.length;
                const active = isActive(item.href);
                return (
                  <li
                    key={item.name}
                    className="relative h-full flex items-center"
                    onMouseEnter={() => hasMenu && setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      to={item.href}
                      className={cn(
                        "relative h-full px-3 inline-flex items-center gap-1 text-[12.5px] font-medium tracking-tight transition-colors",
                        active
                          ? "text-primary"
                          : "text-scef-blue-darker/80 hover:text-primary"
                      )}
                    >
                      {item.name}
                      {hasMenu && <ChevronDown className="w-3 h-3 opacity-60" />}
                      {active && (
                        <span className="absolute left-3 right-3 bottom-0 h-[2px] bg-primary" />
                      )}
                    </Link>

                    {hasMenu && activeDropdown === item.name && (
                      <div className="absolute top-full left-0 w-64 bg-white rounded-md shadow-lg border border-border overflow-hidden animate-fade-in z-50">
                        <ul className="py-1.5">
                          {item.children!.map((child) => (
                            <li key={child.name + child.href}>
                              <Link
                                to={child.href}
                                className="block px-3.5 py-2 hover:bg-muted/60 transition-colors"
                              >
                                <span className="block text-[12.5px] font-medium text-foreground leading-tight">
                                  {child.name}
                                </span>
                                {child.description && (
                                  <span className="block text-[11px] text-muted-foreground mt-0.5">
                                    {child.description}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right cluster */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <LanguageSwitcher />
            <Button asChild size="sm" className="h-8 px-3.5 text-[12px] rounded-md">
              <Link to="/auth/sign-up">Become a Member</Link>
            </Button>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-1">
            <LanguageSwitcher />
            <button
              className="p-2 text-scef-blue-darker"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-border animate-fade-in max-h-[85vh] overflow-y-auto">
          <div className="container mx-auto px-4 py-3 space-y-0.5">
            {NAV.map((item) => {
              const hasMenu = !!item.children?.length;
              const isOpen = mobileExpanded === item.name;
              return (
                <div key={item.name} className="border-b border-border last:border-0">
                  <div className="flex items-center justify-between">
                    <Link
                      to={item.href}
                      className="flex-1 px-2 py-3 text-[14px] font-medium text-scef-blue-darker hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {hasMenu && (
                      <button
                        onClick={() => setMobileExpanded(isOpen ? null : item.name)}
                        className="p-3 text-muted-foreground"
                        aria-label={`Toggle ${item.name}`}
                      >
                        <ChevronDown
                          className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")}
                        />
                      </button>
                    )}
                  </div>
                  {isOpen && hasMenu && (
                    <ul className="pb-3 pl-3 space-y-0.5">
                      {item.children!.map((child) => (
                        <li key={child.name + child.href}>
                          <Link
                            to={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-3 py-2 text-[13px] text-scef-blue-darker/80 hover:text-primary hover:bg-muted rounded-md"
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
            <div className="pt-3">
              <Button size="sm" className="w-full" asChild>
                <Link to="/auth/sign-up" onClick={() => setMobileMenuOpen(false)}>
                  Become a Member
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
