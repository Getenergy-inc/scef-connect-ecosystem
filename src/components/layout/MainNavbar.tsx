import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Search, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteContent } from "@/config/siteContent";

export const MainNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "bg-scef-blue transition-all duration-300",
        scrolled && "fixed top-0 left-0 right-0 z-50 shadow-lg"
      )}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Brand Lockup */}
          <Link to="/" className="flex flex-col group">
            <span className="font-display font-bold text-xl md:text-2xl text-white leading-tight group-hover:text-scef-gold transition-colors">
              {siteContent.brand.name}
            </span>
            <span className="text-xs md:text-sm text-white/70 leading-tight">
              {siteContent.brand.tagline}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {siteContent.navLinks.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1 text-white hover:text-scef-gold"
                >
                  {item.name}
                  {item.children && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>

                {/* Dropdown */}
                {item.children && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-border overflow-hidden animate-fade-in z-50">
                    {item.children.map((child: any, idx: number) =>
                      child.divider ? (
                        <div key={idx} className="border-t border-border my-1" />
                      ) : child.external ? (
                        <a
                          key={child.name}
                          href={child.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                        >
                          {child.name}
                          <ExternalLink className="w-3 h-3 text-muted-foreground" />
                        </a>
                      ) : (
                        <Link
                          key={child.name}
                          to={child.href}
                          className="block px-4 py-3 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                        >
                          {child.name}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Search Icon */}
            <button
              className="p-2 text-white hover:text-scef-gold transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-scef-blue-dark border-t border-white/10 animate-fade-in max-h-[80vh] overflow-y-auto">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {siteContent.navLinks.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.href}
                  className="block px-4 py-3 rounded-lg text-white hover:bg-white/10 hover:text-scef-gold transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="ml-4 space-y-1 mt-1">
                    {item.children.map((child: any, idx: number) =>
                      child.divider ? (
                        <div key={idx} className="border-t border-white/10 my-2" />
                      ) : (
                        <Link
                          key={child.name}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-white/70 hover:text-scef-gold transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile CTAs */}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <Button
                className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-dark font-semibold border-2 border-black"
                asChild
              >
                <Link to="/membership" onClick={() => setMobileMenuOpen(false)}>
                  Join as a Member
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white hover:text-scef-blue-dark"
                asChild
              >
                <Link to="/get-involved" onClick={() => setMobileMenuOpen(false)}>
                  Become Ambassador
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
