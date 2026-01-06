import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Heart, LogIn, Wallet, BookOpen, ExternalLink, Library, Award, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale } from "@/contexts/LocaleContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

// External platform links with icons
const externalPlatforms = [
  { name: "eLibrary Nigeria", href: "https://www.elibrarynigeria.com.ng", external: true, icon: Library },
  { name: "NESA.africa", href: "https://nesa.africa", external: true, icon: Award },
  { name: "EduAid.africa", href: "https://eduaid.africa", external: true, icon: GraduationCap },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { t, isRTL } = useLocale();

  const navigation = [
    { name: t("nav.top.about"), href: "/about", key: "about",
      children: [
        { name: t("nav.dropdown.about.overview"), href: "/about" },
        { name: t("nav.dropdown.about.history"), href: "/about#history" },
        { name: t("nav.dropdown.about.vision"), href: "/about#vision" },
        { name: t("nav.dropdown.about.governance"), href: "/governance" },
        { name: t("nav.dropdown.about.divisions"), href: "/divisions" },
      ]
    },
    { name: t("nav.top.work"), href: "/programs", key: "work",
      children: [
        { name: t("nav.dropdown.work.hub"), href: "/programs" },
        { name: t("nav.dropdown.work.nesa"), href: "/programs/nesa-africa" },
        { name: t("nav.dropdown.work.eduaid"), href: "/programs/eduaid-africa" },
        { name: t("nav.dropdown.work.rmsa"), href: "/programs/rebuild-my-school-africa" },
        { name: t("nav.dropdown.work.elibrary"), href: "/programs/elibrary-nigeria" },
        { name: t("nav.dropdown.work.womenGirls"), href: "/programs/women-girls-education" },
        { name: t("nav.dropdown.work.specialNeeds"), href: "/programs/special-needs-education" },
        { name: t("nav.dropdown.work.eoa"), href: "/programs/digital-learning" },
        { divider: true },
        { name: "Visit NESA.africa", href: "https://nesa.africa", external: true },
        { name: "Visit EduAid.africa", href: "https://eduaid.africa", external: true },
        { name: "Visit eLibraryNigeria.com.ng", href: "https://www.elibrarynigeria.com.ng", external: true },
      ]
    },
    { name: t("nav.top.chapters"), href: "/chapters", key: "chapters",
      children: [
        { name: t("nav.dropdown.chapters.browse"), href: "/chapters" },
        { name: t("nav.dropdown.chapters.join"), href: "/local-chapters" },
      ]
    },
    { name: t("nav.top.media"), href: "/media", key: "media",
      children: [
        { name: t("nav.dropdown.media.hub"), href: "/media" },
        { name: "Santos Media Division", href: "/divisions/santos-media" },
      ]
    },
    { name: t("nav.top.getInvolved"), href: "/get-involved", key: "getInvolved",
      children: [
        { name: t("nav.dropdown.getInvolved.member"), href: "/membership" },
        { name: t("nav.dropdown.getInvolved.ambassador"), href: "/get-involved" },
        { name: t("nav.dropdown.getInvolved.volunteer"), href: "/get-involved#volunteer" },
        { name: t("nav.dropdown.getInvolved.csr"), href: "/partners" },
        { name: t("nav.dropdown.getInvolved.donate"), href: "/donate" },
      ]
    },
  ];

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
      dir={isRTL ? "rtl" : "ltr"}
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
              key={item.key}
              className="relative"
              onMouseEnter={() => item.children && setActiveDropdown(item.key)}
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
              {item.children && activeDropdown === item.key && (
                <div className={cn(
                  "absolute top-full mt-1 w-64 bg-white rounded-xl shadow-xl border border-scef-grey-light overflow-hidden animate-scale-in z-50",
                  isRTL ? "right-0" : "left-0"
                )}>
                  {item.children.map((child: any, idx: number) => (
                    child.divider ? (
                      <div key={idx} className="border-t border-gray-200 my-1" />
                    ) : child.external ? (
                      <a
                        key={child.name}
                        href={child.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-scef-gold/10 transition-colors"
                        style={{ color: '#0000CD' }}
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
          <LanguageSwitcher />
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:text-scef-gold hover:bg-white/10"
            asChild
          >
            <Link to="/wallet">
              <Wallet className="w-4 h-4" />
              {t("nav.top.donate")}
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
              {t("nav.top.donate")}
            </Link>
          </Button>
          <Button 
            size="sm" 
            className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-dark font-semibold"
            asChild
          >
            <Link to="/auth">
              <LogIn className="w-4 h-4" />
              {t("nav.top.signin")}
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="xl:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <button
            className="p-2 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 right-0 bg-scef-blue-dark border-b border-white/10 shadow-lg animate-fade-in max-h-[80vh] overflow-y-auto">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <div key={item.key}>
                <Link
                  to={item.href}
                  className="block px-4 py-3 rounded-lg text-white hover:bg-white/10 hover:text-scef-gold transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className={cn("space-y-1", isRTL ? "mr-4" : "ml-4")}>
                    {item.children.map((child: any, idx: number) => (
                      child.divider ? (
                        <div key={idx} className="border-t border-white/10 my-2" />
                      ) : child.external ? (
                        <a
                          key={child.name}
                          href={child.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-scef-gold hover:text-scef-gold/80 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <ExternalLink className="w-3 h-3" />
                          {child.name}
                        </a>
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

            {/* External Platforms Section */}
            <div className="pt-4 border-t border-white/10">
              <p className="px-4 py-2 text-xs uppercase tracking-wider text-white/50 font-semibold">Our Platforms</p>
              <div className="space-y-1">
                {externalPlatforms.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 hover:text-scef-gold transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <platform.icon className="w-5 h-5 text-scef-gold" />
                    <span className="font-medium">{platform.name}</span>
                    <ExternalLink className={cn("w-3 h-3 text-white/50", isRTL ? "mr-auto" : "ml-auto")} />
                  </a>
                ))}
              </div>
            </div>

            {/* Donation Buttons */}
            <div className="pt-4 border-t border-white/10">
              <p className="px-4 py-2 text-xs uppercase tracking-wider text-white/50 font-semibold">Support Our Mission</p>
              <div className="flex flex-col gap-2 px-4">
                <a
                  href="https://paystack.com/pay/scef-donation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all duration-300 bg-scef-blue text-scef-gold hover:bg-scef-blue-dark border-2 border-scef-gold/30"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Heart className="w-4 h-4" />
                  Donate with Paystack
                </a>
                <a
                  href="https://flutterwave.com/pay/scef"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all duration-300 bg-scef-gold text-scef-blue hover:bg-scef-gold-dark border-2 border-scef-blue/30"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Heart className="w-4 h-4" />
                  Donate with Flutterwave
                </a>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-2">
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white hover:text-scef-blue-dark"
                asChild
              >
                <Link to="/wallet" onClick={() => setMobileMenuOpen(false)}>
                  <Wallet className="w-4 h-4" />
                  {t("nav.top.donate")}
                </Link>
              </Button>
              <Button 
                className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-dark font-semibold"
                asChild
              >
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                  <LogIn className="w-4 h-4" />
                  {t("nav.top.signin")} / {t("nav.top.dashboard")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
