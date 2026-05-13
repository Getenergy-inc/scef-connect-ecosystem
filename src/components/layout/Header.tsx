import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  Menu, X, ChevronDown, Heart, LogIn, Wallet, ExternalLink, 
  Library, Award, GraduationCap, User, LayoutDashboard, LogOut,
  Bell, MessageSquare, Settings, Activity, Users, Scale,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useLocale } from "@/contexts/LocaleContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useAuthState } from "@/hooks/useAuthState";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import scefLogo from "@/assets/scef-logo.jpg";
import gfaWalletLogo from "@/assets/gfa-wallet-logo.jpg";

const externalPlatforms = [
  { name: "eLibrary Nigeria", href: "https://www.elibrarynigeria.com.ng", external: true, icon: Library },
  { name: "NESA.africa", href: "https://nesa.africa", external: true, icon: Award },
  { name: "EduAid.africa", href: "https://eduaid.africa", external: true, icon: GraduationCap },
];

export const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { t, isRTL } = useLocale();
  const { user, isAuthenticated, loading } = useAuthState();

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
    // NESA Awards - All tiers + categories + calendar
    { name: "Awards", href: "/awards/platinum", key: "awards",
      children: [
        { name: "Categories (17)", href: "/categories", icon: Layers },
        { divider: true },
        { name: "Platinum Certificate", href: "/awards/platinum" },
        { name: "Africa Education Icon", href: "/awards/icon" },
        { name: "Gold Certificate", href: "/awards/gold" },
        { name: "Blue Garnet Award", href: "/awards/blue-garnet" },
        { divider: true },
        { name: "NESA Calendar", href: "/calendar" },
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
        { divider: true },
        { name: t("nav.dropdown.media.nesaTv"), href: "/media/nesa-tv" },
        { name: t("nav.dropdown.media.nesaAwardsTv"), href: "/media/nesa-awards-tv" },
        { name: t("nav.dropdown.media.radio"), href: "/media/its-in-me-radio" },
        { divider: true },
        { name: t("nav.dropdown.media.platinumShow"), href: "/media/nesa-awards-tv/platinum" },
        { name: t("nav.dropdown.media.africaIcon"), href: "/media/nesa-awards-tv/africa-icon" },
        { name: t("nav.dropdown.media.goldCertificate"), href: "/media/nesa-awards-tv/gold-certificate" },
        { name: t("nav.dropdown.media.blueGarnetGala"), href: "/media/nesa-awards-tv/blue-garnet-gala" },
        { divider: true },
        { name: t("nav.dropdown.media.webinars"), href: "/media/eduaid-webinars" },
        { name: t("nav.dropdown.media.tourism"), href: "/media/education-tourism-show" },
      ]
    },
    { name: t("nav.top.getInvolved"), href: "/get-involved", key: "getInvolved",
      children: [
        { name: t("nav.dropdown.getInvolved.member"), href: "/membership" },
        { name: t("nav.dropdown.getInvolved.ambassador"), href: "/get-involved" },
        { name: t("nav.dropdown.getInvolved.volunteer"), href: "/get-involved#volunteer" },
        { name: t("nav.dropdown.getInvolved.csr"), href: "/partners" },
        { name: t("nav.dropdown.getInvolved.donate"), href: "/donate" },
        { name: "Support & Payment Options", href: "/support-us" },
      ]
    },
  ];

  // Role portals - shown only to authenticated users in Profile dropdown
  const rolePortals = [
    { name: "Jury Portal", href: "/portal/jury" },
    { name: "NRC Portal", href: "/portal/nrc" },
    { name: "Ambassador Portal", href: "/portal/ambassador" },
    { name: "Chapter Admin", href: "/portal/chapter-admin" },
    { name: "Sponsor Portal", href: "/portal/sponsor" },
    { name: "Admin Dashboard", href: "/admin" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  const getUserInitials = () => {
    if (!user?.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

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
        {/* Logo - Responsive sizing */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
          <img 
            src={scefLogo} 
            alt="Santos Creations Educational Foundation" 
            className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          />
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
                      <div key={idx} className="border-t border-border my-1" />
                    ) : child.external ? (
                      <a
                        key={child.name}
                        href={child.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-scef-gold/10 transition-colors"
                        
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

        {/* CTA Buttons - Auth Aware */}
        <div className="hidden xl:flex items-center gap-2">
          {/* NRC & Judge Application Buttons */}
          <Button 
            variant="outline" 
            size="sm" 
            className="border-scef-gold/50 text-scef-gold hover:bg-scef-gold hover:text-scef-blue-dark font-medium"
            asChild
          >
            <Link to="/get-involved/nrc">
              <Users className="w-4 h-4 mr-1" />
              Join NRC
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-white/30 text-white hover:bg-white hover:text-scef-blue-dark font-medium"
            asChild
          >
            <Link to="/get-involved/judge">
              <Scale className="w-4 h-4 mr-1" />
              Be a Judge
            </Link>
          </Button>
          
          <LanguageSwitcher />
          
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse" />
          ) : isAuthenticated ? (
            <>
              {/* Wallet Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:text-scef-gold hover:bg-white/10"
                asChild
              >
                <Link to="/wallet">
                  <img src={gfaWalletLogo} alt="GFA Wallet" className="w-5 h-5 rounded mr-1 object-contain" />
                  Wallet
                </Link>
              </Button>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-scef-gold hover:bg-white/10 relative"
                asChild
              >
                <Link to="/chapter/inbox">
                  <Bell className="w-4 h-4" />
                </Link>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-2 text-white hover:text-scef-gold hover:bg-white/10 px-2"
                  >
                    <Avatar className="w-8 h-8 border-2 border-scef-gold">
                      <AvatarImage src={undefined} />
                      <AvatarFallback className="bg-scef-gold text-scef-blue-dark font-semibold text-xs">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2 border-b border-border">
                    <p className="font-medium text-sm">{user?.email}</p>
                    <p className="text-xs text-muted-foreground">Member</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wallet" className="cursor-pointer">
                      <Wallet className="w-4 h-4 mr-2" />
                      My Wallet
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/profile" className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/activity" className="cursor-pointer">
                      <Activity className="w-4 h-4 mr-2" />
                      My Activity
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/chapter/inbox" className="cursor-pointer">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Chapter Inbox
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {/* Role Portals - Accessible only after login */}
                  <div className="px-2 py-1">
                    <p className="text-xs font-medium text-muted-foreground px-2">Role Portals</p>
                  </div>
                  {rolePortals.map((portal) => (
                    <DropdownMenuItem key={portal.name} asChild>
                      <Link to={portal.href} className="cursor-pointer">
                        <Award className="w-4 h-4 mr-2" />
                        {portal.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/settings" className="cursor-pointer">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className="text-red-600 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-white/30 text-white hover:bg-white hover:text-scef-blue-dark"
                asChild
              >
                <Link to="/donate">
                  <Heart className="w-4 h-4 mr-1" />
                  {t("nav.top.donate")}
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:text-scef-gold hover:bg-white/10"
                asChild
              >
                <Link to="/auth/sign-in">
                  Sign In
                </Link>
              </Button>
              <Button 
                size="sm" 
                className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-dark font-semibold"
                asChild
              >
                <Link to="/auth/sign-up">
                  <LogIn className="w-4 h-4 mr-1" />
                  Sign Up
                </Link>
              </Button>
            </>
          )}
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

      {/* Mobile Off-Canvas Menu */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent
          side={isRTL ? "left" : "right"}
          className="w-[88vw] sm:w-[400px] p-0 bg-scef-blue-dark border-l border-white/10 text-white overflow-y-auto"
        >
          <SheetHeader className="px-5 py-4 border-b border-white/10 text-left">
            <SheetTitle className="text-white flex items-center gap-2">
              <img src={scefLogo} alt="SCEF" className="h-8 w-auto rounded" />
              <span className="text-sm font-semibold">Menu</span>
            </SheetTitle>
          </SheetHeader>

          <div className="px-3 py-4 space-y-1">
            {isAuthenticated && (
              <div className="pb-4 mb-2 border-b border-white/10">
                <div className="flex items-center gap-3 px-2">
                  <Avatar className="w-10 h-10 border-2 border-scef-gold">
                    <AvatarFallback className="bg-scef-gold text-scef-blue-dark font-semibold">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-medium text-white truncate text-sm">{user?.email}</p>
                    <p className="text-xs text-white/60">Member</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 px-2">
                  <Button variant="secondary" size="sm" asChild className="flex-1">
                    <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <LayoutDashboard className="w-4 h-4 mr-1" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button variant="secondary" size="sm" asChild className="flex-1">
                    <Link to="/wallet" onClick={() => setMobileMenuOpen(false)}>
                      <Wallet className="w-4 h-4 mr-1" />
                      Wallet
                    </Link>
                  </Button>
                </div>
              </div>
            )}

            {navigation.map((item) => (
              item.children ? (
                <Collapsible key={item.key}>
                  <div className="flex items-center rounded-lg hover:bg-white/5">
                    <Link
                      to={item.href}
                      className="flex-1 px-3 py-3 text-white hover:text-scef-gold transition-colors font-medium text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    <CollapsibleTrigger
                      aria-label={`Toggle ${item.name} submenu`}
                      className="group p-3 text-white/70 hover:text-scef-gold transition-colors"
                    >
                      <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                    <div className={cn("py-1 space-y-0.5 border-white/10", isRTL ? "mr-3 border-r pr-3" : "ml-3 border-l pl-3")}>
                      {item.children.map((child: any, idx: number) => (
                        child.divider ? (
                          <div key={idx} className="border-t border-white/10 my-2" />
                        ) : child.external ? (
                          <a
                            key={child.name}
                            href={child.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-scef-gold hover:text-scef-gold/80 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <ExternalLink className="w-3 h-3" />
                            {child.name}
                          </a>
                        ) : (
                          <Link
                            key={child.name}
                            to={child.href}
                            className="block px-3 py-2 text-sm text-white/75 hover:text-scef-gold hover:bg-white/5 rounded-md transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        )
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link
                  key={item.key}
                  to={item.href}
                  className="block px-3 py-3 rounded-lg text-white hover:bg-white/5 hover:text-scef-gold transition-colors font-medium text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}

            <div className="pt-4 mt-2 border-t border-white/10">
              <p className="px-3 py-2 text-xs uppercase tracking-wider text-white/50 font-semibold">Get Involved with NESA</p>
              <div className="flex flex-col gap-2 px-2">
                <Button className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-dark font-semibold" asChild>
                  <Link to="/get-involved/nrc" onClick={() => setMobileMenuOpen(false)}>
                    <Users className="w-4 h-4 mr-2" />
                    Apply to Join NRC
                  </Link>
                </Button>
                <Button variant="outline" className="border-white/50 text-white hover:bg-white hover:text-scef-blue-dark font-medium" asChild>
                  <Link to="/get-involved/judge" onClick={() => setMobileMenuOpen(false)}>
                    <Scale className="w-4 h-4 mr-2" />
                    Become a Judge
                  </Link>
                </Button>
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-white/10">
              <p className="px-3 py-2 text-xs uppercase tracking-wider text-white/50 font-semibold">Our Platforms</p>
              <div className="space-y-1">
                {externalPlatforms.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-white hover:bg-white/5 hover:text-scef-gold transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <platform.icon className="w-5 h-5 text-scef-gold" />
                    <span className="font-medium text-sm">{platform.name}</span>
                    <ExternalLink className={cn("w-3 h-3 text-white/50", isRTL ? "mr-auto" : "ml-auto")} />
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-white/10 pb-6">
              {isAuthenticated ? (
                <div className="flex flex-col gap-2 px-2">
                  <Button
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white hover:text-scef-blue-dark"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/chapter/inbox");
                    }}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chapter Inbox
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 px-2">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white hover:text-scef-blue-dark" asChild>
                    <Link to="/donate" onClick={() => setMobileMenuOpen(false)}>
                      <Heart className="w-4 h-4 mr-1" />
                      {t("nav.top.donate")}
                    </Link>
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 border-white/30 text-white hover:bg-white hover:text-scef-blue-dark" asChild>
                      <Link to="/auth/sign-in" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                    </Button>
                    <Button className="flex-1 bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-dark font-semibold" asChild>
                      <Link to="/auth/sign-up" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};
