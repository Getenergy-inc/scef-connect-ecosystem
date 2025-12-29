import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Heart, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { 
    name: "Programs", 
    href: "/programs",
    children: [
      { name: "NESA-Africa", href: "/programs/nesa-africa" },
      { name: "EduAid-Africa", href: "/programs/eduaid-africa" },
      { name: "Rebuild My School Africa", href: "/programs/rebuild-my-school-africa" },
      { name: "Women & Girls Education", href: "/programs/women-girls-education" },
      { name: "Special Needs Education", href: "/programs/special-needs-education" },
    ]
  },
  { name: "Local Chapters", href: "/local-chapters" },
  { name: "Media", href: "/media" },
  { name: "Contact", href: "/contact" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/95 backdrop-blur-lg shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <nav className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <BookOpen className="w-6 h-6 text-earth" />
          </div>
          <div className="flex flex-col">
            <span className={cn(
              "font-display font-bold text-xl leading-tight transition-colors",
              scrolled ? "text-foreground" : "text-cream"
            )}>
              SCEF
            </span>
            <span className={cn(
              "text-[10px] uppercase tracking-wider transition-colors",
              scrolled ? "text-muted-foreground" : "text-cream/70"
            )}>
              Santos Creations
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navigation.map((item) => (
            <div 
              key={item.name}
              className="relative"
              onMouseEnter={() => item.children && setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1",
                  scrolled
                    ? "text-foreground hover:text-primary hover:bg-primary/10"
                    : "text-cream/90 hover:text-cream hover:bg-cream/10"
                )}
              >
                {item.name}
                {item.children && <ChevronDown className="w-4 h-4" />}
              </Link>
              
              {/* Dropdown */}
              {item.children && activeDropdown === item.name && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-card rounded-xl shadow-lg border border-border overflow-hidden animate-scale-in">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      to={child.href}
                      className="block px-4 py-3 text-sm text-card-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant={scrolled ? "outline" : "heroOutline"} size="sm" asChild>
            <Link to="/donate">
              <Heart className="w-4 h-4" />
              Donate
            </Link>
          </Button>
          <Button variant={scrolled ? "default" : "hero"} size="sm" asChild>
            <Link to="/membership">
              <Users className="w-4 h-4" />
              Join SCEF
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className={cn("w-6 h-6", scrolled ? "text-foreground" : "text-cream")} />
          ) : (
            <Menu className={cn("w-6 h-6", scrolled ? "text-foreground" : "text-cream")} />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.href}
                  className="block px-4 py-3 rounded-lg text-foreground hover:bg-primary/10 hover:text-primary transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="ml-4 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <Button variant="outline" asChild>
                <Link to="/donate" onClick={() => setMobileMenuOpen(false)}>
                  <Heart className="w-4 h-4" />
                  Donate
                </Link>
              </Button>
              <Button variant="default" asChild>
                <Link to="/membership" onClick={() => setMobileMenuOpen(false)}>
                  <Users className="w-4 h-4" />
                  Become a Member
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
