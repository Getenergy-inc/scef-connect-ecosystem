import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Menu, X, ChevronDown, Search, ExternalLink, Heart,
  GraduationCap, School, Accessibility, Laptop, Library, Award,
  LayoutGrid, Tv, Clapperboard, Radio, Mic, Plane, Crown, Star, Medal, Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteContent } from "@/config/siteContent";
import { LanguageSwitcher } from "./LanguageSwitcher";
import scefLogo from "@/assets/scef-logo.png";

const ICONS: Record<string, LucideIcon> = {
  GraduationCap, School, Heart, Accessibility, Laptop, Library, Award,
  LayoutGrid, Tv, Clapperboard, Radio, Mic, Plane, Crown, Star, Medal, Sparkles,
};

type NavChild = { name: string; href: string; description?: string; external?: boolean; divider?: boolean };
type NavGroupItem = { name: string; href: string; description?: string; icon?: string };
type NavGroup = { title: string; items: NavGroupItem[] };
type NavItem = {
  name: string;
  href: string;
  children?: NavChild[];
  megaMenu?: boolean;
  groups?: NavGroup[];
};

export const MainNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = siteContent.navLinks as unknown as NavItem[];

  const { pathname } = useLocation();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <nav
      className={cn(
        "transition-shadow duration-200 border-b border-border bg-white",
        scrolled ? "shadow-sm" : ""
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 h-14">
          {/* Brand Lockup */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group shrink-0"
            aria-label={`${siteContent.brand.name} — Home`}
          >
            <img
              src={scefLogo}
              alt={siteContent.brand.name}
              className="h-7 w-auto object-contain"
              loading="eager"
              decoding="async"
            />
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="font-display font-bold text-[13px] text-scef-blue-darker tracking-tight">
                SCEF
              </span>
              <span className="text-[10px] text-muted-foreground -mt-0.5">
                Santos Creations Educational Foundation
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-end">
            {navItems.map((item) => {
              const hasMenu = !!item.children?.length || !!item.megaMenu;
              const active = isActive(item.href);
              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => hasMenu && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      "relative px-3 py-2 text-[13px] font-medium transition-colors flex items-center gap-1",
                      active
                        ? "text-primary"
                        : "text-scef-blue-darker/85 hover:text-primary"
                    )}
                  >
                    {item.name}
                    {hasMenu && <ChevronDown className="w-3 h-3 opacity-60" />}
                    {active && (
                      <span className="absolute -bottom-px left-3 right-3 h-[2px] bg-primary" />
                    )}
                  </Link>


                  {/* Mega Menu */}
                  {item.megaMenu && item.groups && activeDropdown === item.name && (
                    <div className="absolute top-full right-0 mt-1 w-[680px] bg-white rounded-lg shadow-xl border border-border overflow-hidden animate-fade-in z-50">
                      <div className="grid grid-cols-3 gap-0">
                        {item.groups.map((group) => (
                          <div key={group.title} className="p-4 border-r border-border last:border-r-0">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-scef-blue/60 mb-2.5">
                              {group.title}
                            </p>
                            <ul className="space-y-0.5">
                              {group.items.map((sub) => {
                                const Icon = sub.icon ? ICONS[sub.icon] : null;
                                return (
                                  <li key={sub.name}>
                                    <Link
                                      to={sub.href}
                                      className="group/item flex items-start gap-2.5 px-2 py-1.5 rounded-md hover:bg-scef-blue/5 transition-colors"
                                    >
                                      {Icon && (
                                        <span className="mt-0.5 shrink-0 w-7 h-7 rounded bg-scef-gold/10 text-scef-gold flex items-center justify-center group-hover/item:bg-scef-gold group-hover/item:text-white transition-colors">
                                          <Icon className="w-3.5 h-3.5" />
                                        </span>
                                      )}
                                      <span className="min-w-0">
                                        <span className="block text-[13px] font-semibold text-foreground leading-tight">
                                          {sub.name}
                                        </span>
                                        {sub.description && (
                                          <span className="block text-[11px] text-muted-foreground leading-snug mt-0.5">
                                            {sub.description}
                                          </span>
                                        )}
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Simple Dropdown */}
                  {!item.megaMenu && item.children && activeDropdown === item.name && (
                    <div className="absolute top-full right-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-border overflow-hidden animate-fade-in z-50">
                      <ul className="py-1.5">
                        {item.children.map((child, idx) =>
                          child.divider ? (
                            <li key={idx} className="my-1 border-t border-border" />
                          ) : child.external ? (
                            <li key={child.name}>
                              <a
                                href={child.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start justify-between gap-3 px-3.5 py-2 text-sm hover:bg-scef-blue/5 transition-colors"
                              >
                                <span>
                                  <span className="block text-[13px] font-semibold text-foreground">{child.name}</span>
                                  {child.description && (
                                    <span className="block text-[11px] text-muted-foreground mt-0.5">
                                      {child.description}
                                    </span>
                                  )}
                                </span>
                                <ExternalLink className="w-3 h-3 text-muted-foreground mt-1 shrink-0" />
                              </a>
                            </li>
                          ) : (
                            <li key={child.name}>
                              <Link
                                to={child.href}
                                className="block px-3.5 py-2 hover:bg-scef-blue/5 transition-colors"
                              >
                                <span className="block text-[13px] font-semibold text-foreground">
                                  {child.name}
                                </span>
                                {child.description && (
                                  <span className="block text-[11px] text-muted-foreground mt-0.5">
                                    {child.description}
                                  </span>
                                )}
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Right-side primary CTA */}
            <div className="ml-3 flex items-center gap-2">
              <Button asChild size="sm">
                <Link to="/auth/sign-up">Become a Member</Link>
              </Button>
            </div>

            {/* Search Icon */}
            <button
              className="ml-1 p-1.5 text-scef-blue-darker/60 hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-border animate-fade-in max-h-[85vh] overflow-y-auto">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) => {
              const hasMenu = !!item.children?.length || !!item.megaMenu;
              const isOpen = mobileExpanded === item.name;
              return (
                <div key={item.name} className="border-b border-border last:border-0">
                  <div className="flex items-center justify-between">
                    <Link
                      to={item.href}
                      className="flex-1 px-3 py-3 text-scef-blue-darker hover:text-primary transition-colors font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {hasMenu && (
                      <button
                        onClick={() => setMobileExpanded(isOpen ? null : item.name)}
                        className="p-3 text-muted-foreground hover:text-primary"
                        aria-label={`Toggle ${item.name}`}
                      >
                        <ChevronDown
                          className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")}
                        />
                      </button>
                    )}
                  </div>

                  {isOpen && item.megaMenu && item.groups && (
                    <div className="pb-3 pl-3 space-y-3">
                      {item.groups.map((group) => (
                        <div key={group.title}>
                          <p className="px-3 pt-1 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary/80">
                            {group.title}
                          </p>
                          <ul className="space-y-0.5">
                            {group.items.map((sub) => (
                              <li key={sub.name}>
                                <Link
                                  to={sub.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block px-3 py-2 text-sm text-scef-blue-darker/80 hover:text-primary hover:bg-muted rounded-md transition-colors"
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {isOpen && !item.megaMenu && item.children && (
                    <ul className="pb-3 pl-3 space-y-0.5">
                      {item.children.map((child, idx) =>
                        child.divider ? (
                          <li key={idx} className="my-1 border-t border-border" />
                        ) : (
                          <li key={child.name}>
                            <Link
                              to={child.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block px-3 py-2 text-sm text-scef-blue-darker/80 hover:text-primary hover:bg-muted rounded-md transition-colors"
                            >
                              {child.name}
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              );
            })}

            {/* Mobile CTA */}
            <div className="pt-4">
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


          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-1">
            <LanguageSwitcher />
            <button
              className="p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-scef-blue-dark border-t border-white/10 animate-fade-in max-h-[85vh] overflow-y-auto">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) => {
              const hasMenu = !!item.children?.length || !!item.megaMenu;
              const isOpen = mobileExpanded === item.name;
              return (
                <div key={item.name} className="border-b border-white/5 last:border-0">
                  <div className="flex items-center justify-between">
                    <Link
                      to={item.href}
                      className="flex-1 px-3 py-3 text-white hover:text-scef-gold transition-colors font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {hasMenu && (
                      <button
                        onClick={() => setMobileExpanded(isOpen ? null : item.name)}
                        className="p-3 text-white/70 hover:text-scef-gold"
                        aria-label={`Toggle ${item.name}`}
                      >
                        <ChevronDown
                          className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")}
                        />
                      </button>
                    )}
                  </div>

                  {isOpen && item.megaMenu && item.groups && (
                    <div className="pb-3 pl-3 space-y-3">
                      {item.groups.map((group) => (
                        <div key={group.title}>
                          <p className="px-3 pt-1 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-scef-gold/80">
                            {group.title}
                          </p>
                          <ul className="space-y-0.5">
                            {group.items.map((sub) => (
                              <li key={sub.name}>
                                <Link
                                  to={sub.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block px-3 py-2 text-sm text-white/80 hover:text-scef-gold hover:bg-white/5 rounded-md transition-colors"
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {isOpen && !item.megaMenu && item.children && (
                    <ul className="pb-3 pl-3 space-y-0.5">
                      {item.children.map((child, idx) =>
                        child.divider ? (
                          <li key={idx} className="my-1 border-t border-white/10" />
                        ) : (
                          <li key={child.name}>
                            <Link
                              to={child.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block px-3 py-2 text-sm text-white/80 hover:text-scef-gold hover:bg-white/5 rounded-md transition-colors"
                            >
                              {child.name}
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              );
            })}

            {/* Mobile CTAs */}
            <div className="pt-4 flex flex-col gap-2">
              <Button
                size="sm"
                className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-dark"
                asChild
              >
                <Link to="/donate" onClick={() => setMobileMenuOpen(false)}>
                  <Heart className="w-3.5 h-3.5 mr-1" />
                  Donate
                </Link>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-white/30 text-white bg-transparent hover:bg-white hover:text-scef-blue-dark"
                asChild
              >
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
