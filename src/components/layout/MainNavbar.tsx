import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavChild = { name: string; href: string; description?: string };
type NavItem = { name: string; href: string; children?: NavChild[] };

const NAV: NavItem[] = [
  {
    name: "About SCEF",
    href: "/about",
    children: [
      { name: "Who We Are", href: "/about", description: "Mission, identity & approach" },
      { name: "Vision 2037", href: "/about/vision-2037", description: "Our continental agenda" },
      { name: "History", href: "/about/history", description: "Our journey since 1997" },
      { name: "Governance", href: "/governance", description: "Leadership & structure" },
    ],
  },
  {
    name: "CSR Funds Management",
    href: "/csr-education-funds-management",
    children: [
      { name: "CSR Education Funds Management", href: "/csr-education-funds-management", description: "How SCEF manages CSR education funds" },
      { name: "Request Partnership Proposal", href: "/partner-with-us", description: "Start a CSR partnership conversation" },
      { name: "Sponsor a Program", href: "/sponsorship", description: "Brand-aligned program sponsorship" },
      { name: "Adopt a School", href: "/programs/rebuild-my-school-africa", description: "Fund school transformation" },
      { name: "Fund Scholarships", href: "/sponsorship?program=scholarships", description: "Support learners across Africa" },
      { name: "Impact Reports", href: "/impact", description: "Outcomes and evidence" },
    ],
  },
  {
    name: "Programs",
    href: "/programs",
    children: [
      { name: "All Programs", href: "/programs", description: "Browse the full hub" },
      { name: "EduAid-Africa", href: "/programs/eduaid-africa", description: "Scholarships & CSR" },
      { name: "NESA-Africa", href: "/programs/nesa-africa", description: "Continental awards engine" },
      { name: "Rebuild My School Africa", href: "/programs/rebuild-my-school-africa", description: "Infrastructure renewal" },
      { name: "eLibrary Africa", href: "/programs/elibrary-nigeria", description: "Knowledge hub" },
      { name: "Women & Girls Empowerment", href: "/women-girls-empowerment" },
      { name: "Special Needs Education", href: "/programs/special-needs-education" },
      { name: "Green Horizon Initiative", href: "/programs/green-horizon-initiative", description: "Livelihood & permaculture" },
    ],
  },
  {
    name: "Impact",
    href: "/impact",
    children: [
      { name: "Impact Overview", href: "/impact", description: "Outcomes & evidence" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Reports", href: "/reports" },
      { name: "Media", href: "/media" },
    ],
  },
  {
    name: "Local Chapters",
    href: "/local-chapters",
    children: [
      { name: "Browse Chapters", href: "/local-chapters", description: "Find your country chapter" },
      { name: "Join a Chapter", href: "/chapters/join-online", description: "Online membership" },
      { name: "Start a Chapter", href: "/chapters/start-chapter", description: "Bring SCEF to your city" },
    ],
  },
  {
    name: "Get Involved",
    href: "/get-involved",
    children: [
      { name: "Become a Member", href: "/membership", description: "Tiers & benefits" },
      { name: "Volunteer", href: "/volunteer", description: "Campaigns, schools & media" },
      { name: "Internship", href: "/internship", description: "Hands-on placements" },
      { name: "Donate", href: "/donate", description: "Fund education impact" },
      { name: "Sponsor a Program", href: "/sponsorship", description: "Brand-aligned sponsorship" },
      { name: "Adopt a School", href: "/programs/rebuild-my-school-africa", description: "School transformation" },
      { name: "Join a Project", href: "/projects", description: "Active delivery roles" },
      { name: "Start / Join Local Chapter", href: "/local-chapters", description: "Community-led chapters" },
      { name: "Diaspora Africa", href: "/diaspora-africa", description: "Diaspora network" },
      { name: "Friends of Africa", href: "/friends-of-africa", description: "Global partnerships" },
    ],
  },
  {
    name: "Contact",
    href: "/contact",
    children: [
      { name: "Contact Us", href: "/contact" },
      { name: "Help Center", href: "/help" },
      { name: "Verify Certificate", href: "/resources/verification" },
    ],
  },
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
        <div className="flex items-center justify-between gap-6 h-14">
          {/* Brand — clean text mark */}
          <Link
            to="/"
            className="flex flex-col leading-tight shrink-0"
            aria-label="Santos Creations Educational Foundation — Home"
          >
            <span className="font-display font-bold text-[15px] text-scef-blue-darker tracking-tight">
              Santos Creations
            </span>
            <span className="text-[10.5px] text-muted-foreground -mt-0.5 tracking-wide uppercase">
              Educational Foundation
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center h-full flex-1 justify-center">
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
                    onFocus={() => hasMenu && setActiveDropdown(item.name)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                        setActiveDropdown(null);
                      }
                    }}
                  >
                    <Link
                      to={item.href}
                      className={cn(
                        "relative h-full px-3.5 inline-flex items-center gap-1 text-[13px] font-medium tracking-tight transition-colors",
                        active
                          ? "text-primary"
                          : "text-scef-blue-darker/85 hover:text-primary"
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

          {/* Right CTA */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Button asChild size="sm" variant="outline" className="h-8 px-3 text-[12px] rounded-md border-scef-blue-darker/20 text-scef-blue-darker hover:bg-scef-blue-darker hover:text-white">
              <Link to="/donate">Donate</Link>
            </Button>
            <Button asChild size="sm" className="h-8 px-3 text-[12px] rounded-md">
              <Link to="/auth/sign-up">Become a Member</Link>
            </Button>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-1">
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
            <div className="pt-3 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1" asChild>
                <Link to="/donate" onClick={() => setMobileMenuOpen(false)}>
                  Donate
                </Link>
              </Button>
              <Button size="sm" className="flex-1" asChild>
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
