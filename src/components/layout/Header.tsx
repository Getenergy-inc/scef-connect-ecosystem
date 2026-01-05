import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Heart, LogIn, UserPlus, Search, Wallet, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale } from "@/contexts/LocaleContext";
import { TopUtilityNav } from "./TopUtilityNav";

export const Header = () => {
  const { t, isRTL } = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navigation = [
    { 
      name: t('nav.about'), 
      href: '/about',
      children: [
        { name: t('nav.about.overview'), href: '/about' },
        { name: t('nav.about.history'), href: '/about#history' },
        { name: t('nav.about.vision'), href: '/about#vision' },
        { name: t('nav.about.sustainability'), href: '/about#sustainability' },
        { name: t('nav.about.governance'), href: '/governance' },
        { name: t('nav.about.divisions'), href: '/divisions' },
      ]
    },
    { 
      name: t('nav.programs'), 
      href: '/programs',
      children: [
        { name: t('nav.programs.nesa'), href: '/programs/nesa-africa' },
        { name: t('nav.programs.eduaid'), href: '/programs/eduaid-africa' },
        { name: t('nav.programs.rmsa'), href: '/programs/rebuild-my-school-africa' },
        { name: t('nav.programs.eoa'), href: '/programs/digital-learning' },
        { name: t('nav.programs.awpc'), href: '/programs/digital-learning#awpc' },
        { name: t('nav.programs.women'), href: '/programs/women-girls-education' },
        { name: t('nav.programs.special'), href: '/programs/special-needs-education' },
        { divider: true },
        { name: t('nav.programs.hub'), href: '/programs' },
      ]
    },
    { 
      name: t('nav.chapters'), 
      href: '/local-chapters',
      children: [
        { name: t('nav.chapters.browse'), href: '/local-chapters' },
        { name: t('nav.chapters.join'), href: '/local-chapters' },
        { name: t('nav.chapters.create'), href: '/local-chapters' },
        { name: t('nav.chapters.upgrade'), href: '/local-chapters' },
        { name: t('nav.chapters.leader'), href: '/local-chapters' },
      ]
    },
    { 
      name: t('nav.involved'), 
      href: '/get-involved',
      children: [
        { name: t('nav.involved.member'), href: '/membership' },
        { name: t('nav.involved.ambassador'), href: '/membership' },
        { name: t('nav.involved.volunteer'), href: '/get-involved' },
        { name: t('nav.involved.scholarship'), href: '/programs/eduaid-africa' },
        { name: t('nav.involved.partner'), href: '/partners' },
        { name: t('nav.involved.donate'), href: '/donate' },
      ]
    },
    { 
      name: t('nav.media'), 
      href: '/media',
      children: [
        { name: t('nav.media.hub'), href: '/media' },
        { name: t('nav.media.nesa-tv'), href: '/media' },
        { name: t('nav.media.radio'), href: '/media' },
        { name: t('nav.media.webinars'), href: '/media' },
        { name: t('nav.media.tourism'), href: '/media' },
        { divider: true },
        { name: t('nav.media.volunteer'), href: '/get-involved' },
      ]
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <TopUtilityNav />
      <header
        className={cn(
          "sticky top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-scef-blue shadow-lg py-2"
            : "bg-scef-blue py-3"
        )}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <nav className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="flex items-center gap-2">
              <img 
                src="/assets/scef-logo.jpg" 
                alt="SCEF Logo" 
                className="h-10 md:h-12 w-auto object-contain"
              />
              <img 
                src="/assets/nesa-africa-logo.jpg" 
                alt="NESA Africa Logo" 
                className="h-8 md:h-10 w-auto object-contain rounded-full hidden sm:block"
              />
              <img 
                src="/assets/eduaid-africa-logo.jpg" 
                alt="EduAid Africa Logo" 
                className="h-8 md:h-10 w-auto object-contain hidden md:block"
              />
            </div>
            <div className="flex flex-col ml-1">
              <span className="font-display font-bold text-lg md:text-xl leading-tight text-scef-gold">
                SCEF
              </span>
              <span className="text-[9px] uppercase tracking-wider text-white/70 leading-tight hidden lg:block">
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
                
                {item.children && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-scef-grey-light overflow-hidden z-50">
                    {item.children.map((child: any, idx: number) => (
                      child.divider ? (
                        <div key={idx} className="border-t border-gray-200 my-1" />
                      ) : child.external ? (
                        <a
                          key={child.name}
                          href={child.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-scef-gold/10 transition-colors text-scef-blue"
                        >
                          {child.name}
                          <ExternalLink className="w-3 h-3 text-scef-gold" />
                        </a>
                      ) : (
                        <Link
                          key={child.name}
                          to={child.href}
                          className="block px-4 py-3 text-sm text-scef-grey-dark hover:bg-scef-blue/5 hover:text-scef-blue transition-colors"
                        >
                          {child.name}
                        </Link>
                      )
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
              size="icon" 
              className="text-white hover:text-scef-gold hover:bg-white/10"
              asChild
            >
              <Link to="/search">
                <Search className="w-4 h-4" />
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:text-scef-gold hover:bg-white/10"
              asChild
            >
              <Link to="/auth">
                <LogIn className="w-4 h-4" />
                {t('nav.signin')}
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-white/30 text-white hover:bg-white hover:text-scef-blue-dark"
              asChild
            >
              <Link to="/auth">
                <UserPlus className="w-4 h-4" />
                {t('nav.signup')}
              </Link>
            </Button>
            <Button 
              size="sm" 
              className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-dark font-semibold"
              asChild
            >
              <Link to="/donate">
                <Heart className="w-4 h-4" />
                {t('nav.donate')}
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
                      {item.children.map((child: any, idx: number) => (
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
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                <Button 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white hover:text-scef-blue-dark w-full"
                  asChild
                >
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <LogIn className="w-4 h-4" />
                    {t('nav.signin')} / {t('nav.signup')}
                  </Link>
                </Button>
                <Button 
                  className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-dark font-semibold w-full"
                  asChild
                >
                  <Link to="/donate" onClick={() => setMobileMenuOpen(false)}>
                    <Heart className="w-4 h-4" />
                    {t('nav.donate')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
