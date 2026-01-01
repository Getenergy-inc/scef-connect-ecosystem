import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Heart, LogIn, Wallet, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { 
    name: "About SCEF", 
    href: "/about",
    children: [
      { name: "Who We Are", href: "/about" },
      { name: "Vision & Mission", href: "/about#vision" },
      { name: "Governance", href: "/governance" },
      { name: "Our Divisions", href: "/divisions" },
    ]
  },
  { 
    name: "Programs & Platforms", 
    href: "/programs",
    children: [
      { name: "EduAid-Africa", href: "/programs/eduaid-africa" },
      { name: "Rebuild My School Africa", href: "/programs/rebuild-my-school-africa" },
      { name: "Women & Girls Education", href: "/programs/women-girls-education" },
      { name: "Special Needs Education", href: "/programs/special-needs-education" },
      { name: "Education Online Africa", href: "/programs/education-online-africa" },
      { name: "eLibrary Nigeria", href: "/programs/elibrary-nigeria" },
      { name: "NESA-Africa", href: "/programs/nesa-africa" },
    ]
  },
  { 
    name: "Divisions", 
    href: "/divisions",
    children: [
      { name: "SOBCD", href: "/divisions/sobcd" },
      { name: "TDSD", href: "/divisions/tdsd" },
      { name: "OMBDD", href: "/divisions/ombdd" },
      { name: "Santos Media", href: "/divisions/santos-media" },
      { name: "Local Chapter Services", href: "/divisions/lcs" },
    ]
  },
  { name: "Certifications", href: "/certifications" },
  { 
    name: "Chapters", 
    href: "/chapters",
    children: [
      { name: "Find a Chapter", href: "/chapters" },
      { name: "Join a Chapter", href: "/chapters/join" },
      { name: "Create Online Chapter", href: "/chapters/create" },
    ]
  },
  { 
    name: "Media", 
    href: "/media",
    children: [
      { name: "NESA Africa TV", href: "/media/nesa-tv" },
      { name: "It's In Me Radio", href: "/media/radio" },
      { name: "EduAid Webinars", href: "/media/webinars" },
    ]
  },
  { name: "Partners", href: "/partners" },
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
          ? "bg-scef-blue shadow-lg py-2"
          : "bg-scef-blue/95 backdrop-blur-sm py-4"
      )}
    >
      <nav className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-full bg-scef-gold flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <BookOpen className="w-6 h-6 text-scef-blue-dark" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl leading-tight text-scef-gold">
              SCEF
            </span>
            <span className="text-[9px] uppercase tracking-wider text-white/70 leading-tight">
              Santos Creations Educational Foundation
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center gap-1">
          {navigation.map((item) => (
            <div 
              key={item.name}
              className="relative"
              onMouseEnter={() => item.children && setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={item.href}
                className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1 text-white hover:text-scef-gold hover:bg-white/10"
              >
                {item.name}
                {item.children && <ChevronDown className="w-3 h-3" />}
              </Link>
              
              {/* Dropdown */}
              {item.children && activeDropdown === item.name && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-scef-grey-light overflow-hidden animate-scale-in z-50">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      to={child.href}
                      className="block px-4 py-3 text-sm text-scef-grey-dark hover:bg-scef-blue/5 hover:text-scef-blue transition-colors"
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
        <div className="hidden xl:flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:text-scef-gold hover:bg-white/10"
            asChild
          >
            <Link to="/wallet">
              <Wallet className="w-4 h-4" />
              Wallet
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-white/30 text-white hover:bg-white hover:text-scef-blue-dark"
            asChild
          >
            <Link to="/donate">
              <Heart className="w-4 h-4" />
              Donate
            </Link>
          </Button>
          <Button 
            size="sm" 
            className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-dark font-semibold"
            asChild
          >
            <Link to="/auth">
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="xl:hidden p-2 rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 right-0 bg-scef-blue-dark border-b border-white/10 shadow-lg animate-fade-in max-h-[80vh] overflow-y-auto">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.href}
                  className="block px-4 py-3 rounded-lg text-white hover:bg-white/10 hover:text-scef-gold transition-colors font-medium"
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
                        className="block px-4 py-2 text-sm text-white/70 hover:text-scef-gold transition-colors"
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
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white hover:text-scef-blue-dark"
                asChild
              >
                <Link to="/wallet" onClick={() => setMobileMenuOpen(false)}>
                  <Wallet className="w-4 h-4" />
                  Wallet / Donate
                </Link>
              </Button>
              <Button 
                className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-dark font-semibold"
                asChild
              >
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                  <LogIn className="w-4 h-4" />
                  Login / Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};