import { Link } from "react-router-dom";
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

  return (
    <nav
      className={cn(
        "transition-all duration-300",
        scrolled
          ? "bg-scef-blue shadow-lg backdrop-blur-md"
          : "bg-scef-blue/70 backdrop-blur-md"
      )}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-6">
          {/* Brand Lockup */}
          <Link
            to="/"
            className="flex items-center gap-3 group shrink-0"
            aria-label={`${siteContent.brand.name} — Home`}
          >
            <span className="inline-flex items-center justify-center rounded-md bg-white/95 px-2.5 py-1.5 shadow-sm ring-1 ring-white/30 transition-transform group-hover:scale-[1.02]">
              <img
                src={scefLogo}
                alt={siteContent.brand.name}
                className="h-9 md:h-11 w-auto object-contain"
                loading="eager"
                decoding="async"
              />
            </span>
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="font-display font-semibold text-[13px] md:text-sm text-white">
                {siteContent.brand.name}
              </span>
              <span className="text-[10px] md:text-xs text-white/70">
                {siteContent.brand.tagline}
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-end">
            {navItems.map((item) => {
              const hasMenu = !!item.children?.length || !!item.megaMenu;
              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => hasMenu && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className="px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1 text-white hover:text-scef-gold"
                  >
                    {item.name}
                    {hasMenu && <ChevronDown className="w-3.5 h-3.5 opacity-70" />}
                  </Link>

                  {/* Mega Menu */}
                  {item.megaMenu && item.groups && activeDropdown === item.name && (
                    <div className="absolute top-full right-0 mt-2 w-[720px] bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-border overflow-hidden animate-fade-in z-50">
                      <div className="grid grid-cols-3 gap-0">
                        {item.groups.map((group) => (
                          <div key={group.title} className="p-5 border-r border-border last:border-r-0">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-scef-blue/60 mb-3">
                              {group.title}
                            </p>
                            <ul className="space-y-1">
                              {group.items.map((sub) => {
                                const Icon = sub.icon ? ICONS[sub.icon] : null;
                                return (
                                  <li key={sub.name}>
                                    <Link
                                      to={sub.href}
                                      className="group/item flex items-start gap-3 px-2 py-2 rounded-lg hover:bg-scef-blue/5 transition-colors"
                                    >
                                      {Icon && (
                                        <span className="mt-0.5 shrink-0 w-8 h-8 rounded-md bg-scef-gold/10 text-scef-gold flex items-center justify-center group-hover/item:bg-scef-gold group-hover/item:text-white transition-colors">
                                          <Icon className="w-4 h-4" />
                                        </span>
                                      )}
                                      <span className="min-w-0">
                                        <span className="block text-sm font-semibold text-foreground leading-tight">
                                          {sub.name}
                                        </span>
                                        {sub.description && (
                                          <span className="block text-xs text-muted-foreground leading-snug mt-0.5">
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
                    <div className="absolute top-full right-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-border overflow-hidden animate-fade-in z-50">
                      <ul className="py-2">
                        {item.children.map((child, idx) =>
                          child.divider ? (
                            <li key={idx} className="my-1 border-t border-border" />
                          ) : child.external ? (
                            <li key={child.name}>
                              <a
                                href={child.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start justify-between gap-3 px-4 py-2.5 text-sm hover:bg-scef-blue/5 transition-colors"
                              >
                                <span>
                                  <span className="block font-semibold text-foreground">{child.name}</span>
                                  {child.description && (
                                    <span className="block text-xs text-muted-foreground mt-0.5">
                                      {child.description}
                                    </span>
                                  )}
                                </span>
                                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground mt-1 shrink-0" />
                              </a>
                            </li>
                          ) : (
                            <li key={child.name}>
                              <Link
                                to={child.href}
                                className="block px-4 py-2.5 hover:bg-scef-blue/5 transition-colors"
                              >
                                <span className="block text-sm font-semibold text-foreground">
                                  {child.name}
                                </span>
                                {child.description && (
                                  <span className="block text-xs text-muted-foreground mt-0.5">
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

            {/* Donate CTA */}
            <Button
              asChild
              className="ml-2 bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-dark font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <Link to="/donate">
                <Heart className="w-4 h-4 mr-1.5" />
                Donate
              </Link>
            </Button>

            {/* Search Icon */}
            <button
              className="p-2 text-white/80 hover:text-scef-gold transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-dark font-semibold"
                asChild
              >
                <Link to="/donate" onClick={() => setMobileMenuOpen(false)}>
                  <Heart className="w-4 h-4 mr-1.5" />
                  Donate
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white hover:text-scef-blue-dark"
                asChild
              >
              <Link to="/join" onClick={() => setMobileMenuOpen(false)}>
                  Join SCEF
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
