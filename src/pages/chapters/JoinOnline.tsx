import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { useState } from "react";
import {
  Globe, Users, Heart, MapPin, CheckCircle2, ArrowRight,
  Building2, Plane, UserPlus, ChevronDown, Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// African countries list
const africanCountries = [
  "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", 
  "Cabo Verde", "Cameroon", "Central African Republic", "Chad", "Comoros",
  "Congo (Brazzaville)", "Congo (DRC)", "Côte d'Ivoire", "Djibouti", 
  "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia",
  "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Kenya",
  "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi", "Mali",
  "Mauritania", "Mauritius", "Morocco", "Mozambique", "Namibia", "Niger",
  "Nigeria", "Rwanda", "São Tomé and Príncipe", "Senegal", "Seychelles",
  "Sierra Leone", "Somalia", "South Africa", "South Sudan", "Sudan",
  "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe"
];

// Diaspora regions
const diasporaRegions = [
  { region: "North America", countries: ["United States", "Canada"] },
  { region: "Europe", countries: ["United Kingdom", "France", "Germany", "Italy", "Spain", "Netherlands", "Belgium", "Portugal", "Ireland"] },
  { region: "Asia & Middle East", countries: ["UAE", "Saudi Arabia", "Qatar", "China", "India", "Japan"] },
  { region: "Oceania", countries: ["Australia", "New Zealand"] },
  { region: "South America", countries: ["Brazil", "Argentina"] },
];

const participationTypes = [
  {
    id: "resident",
    title: "Resident",
    description: "I currently live in this African country",
    icon: Building2,
    benefits: [
      "Full voting rights in chapter elections",
      "Eligible for local leadership roles",
      "Access to in-person events and programs",
      "Direct participation in community initiatives"
    ]
  },
  {
    id: "diaspora",
    title: "Diaspora",
    description: "I am originally from this country but live abroad",
    icon: Plane,
    benefits: [
      "Connect with your home country chapter",
      "Support projects from abroad",
      "Bridge resources and opportunities",
      "Attend virtual chapter meetings"
    ]
  },
  {
    id: "friend",
    title: "Friend of the Country",
    description: "I have affinity or interest in supporting this country",
    icon: Heart,
    benefits: [
      "Support education in a country you care about",
      "Participate in fundraising initiatives",
      "Attend virtual events and webinars",
      "Receive updates on chapter activities"
    ]
  }
];

const JoinOnline = () => {
  const { isRTL } = useLocale();
  const navigate = useNavigate();
  
  const [selectedCountry, setSelectedCountry] = useState("");
  const [participationType, setParticipationType] = useState("");
  const [diasporaLocation, setDiasporaLocation] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [step, setStep] = useState(1);

  const filteredCountries = africanCountries.filter(country =>
    country.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handleContinue = () => {
    if (step === 1 && selectedCountry) {
      setStep(2);
    } else if (step === 2 && participationType) {
      if (participationType === "diaspora") {
        setStep(3);
      } else {
        // Proceed to membership
        navigate(`/membership?chapter=${encodeURIComponent(selectedCountry)}&type=${participationType}`);
      }
    } else if (step === 3 && diasporaLocation) {
      navigate(`/membership?chapter=${encodeURIComponent(selectedCountry)}&type=${participationType}&location=${encodeURIComponent(diasporaLocation)}`);
    }
  };

  const canContinue = () => {
    if (step === 1) return !!selectedCountry;
    if (step === 2) return !!participationType;
    if (step === 3) return !!diasporaLocation;
    return false;
  };

  return (
    <>
      <Helmet>
        <title>Join an Online Chapter | SCEF</title>
        <meta 
          name="description" 
          content="Join a SCEF online local chapter for your country of choice. Connect as a resident, diaspora member, or friend of the country to support education across Africa." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <Header />
        
        <main>
          {/* Hero */}
          <section className="bg-scef-blue py-16 lg:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-gold/20 text-scef-gold text-sm font-semibold mb-6 border border-scef-gold/30">
                  <Globe className="w-4 h-4" />
                  Online Chapter Network
                </div>
                
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  Join an Online Local Chapter
                </h1>
                
                <p className="text-lg text-white/80 leading-relaxed mb-4">
                  Connect with your country's education community — whether you're a resident, in the diaspora, or a friend of the country.
                </p>
                
                <p className="text-sm text-white/60">
                  Online chapters are the entry point to the SCEF network. As chapters grow, they can evolve into hybrid or physical chapters.
                </p>
              </div>
            </div>
          </section>

          {/* Progress Steps */}
          <section className="bg-muted/50 border-b border-border py-6">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center gap-4 md:gap-8">
                {[
                  { num: 1, label: "Select Country" },
                  { num: 2, label: "Choose Your Role" },
                  { num: 3, label: "Your Location", conditional: participationType === "diaspora" },
                ].filter(s => !s.conditional || (s.conditional && participationType === "diaspora")).map((s, i) => (
                  <div key={s.num} className="flex items-center gap-2 md:gap-4">
                    {i > 0 && <div className="w-8 md:w-16 h-0.5 bg-border" />}
                    <div className={cn(
                      "flex items-center gap-2",
                      step >= s.num ? "text-scef-blue" : "text-muted-foreground"
                    )}>
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                        step >= s.num ? "bg-scef-blue text-white" : "bg-muted text-muted-foreground"
                      )}>
                        {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
                      </div>
                      <span className="hidden md:block text-sm font-medium">{s.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                
                {/* Step 1: Country Selection */}
                {step === 1 && (
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                        Select Your Country
                      </h2>
                      <p className="text-muted-foreground">
                        Choose the African country whose chapter you want to join. Each country has its own online chapter community.
                      </p>
                    </div>

                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        placeholder="Search for a country..."
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        className="pl-10 h-12"
                      />
                    </div>

                    {/* Country Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto p-1">
                      {filteredCountries.map((country) => (
                        <button
                          key={country}
                          onClick={() => setSelectedCountry(country)}
                          className={cn(
                            "p-4 rounded-xl border-2 text-left transition-all hover:shadow-md",
                            selectedCountry === country
                              ? "border-scef-gold bg-scef-gold/10 shadow-md"
                              : "border-border bg-card hover:border-scef-blue/50"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <MapPin className={cn(
                              "w-5 h-5 shrink-0",
                              selectedCountry === country ? "text-scef-gold" : "text-muted-foreground"
                            )} />
                            <span className={cn(
                              "font-medium text-sm",
                              selectedCountry === country ? "text-scef-blue" : "text-foreground"
                            )}>
                              {country}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>

                    {filteredCountries.length === 0 && (
                      <p className="text-center text-muted-foreground py-8">
                        No countries found matching "{countrySearch}"
                      </p>
                    )}
                  </div>
                )}

                {/* Step 2: Participation Type */}
                {step === 2 && (
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-scef-gold/10 text-scef-gold text-sm font-medium mb-4">
                        <MapPin className="w-4 h-4" />
                        {selectedCountry}
                      </div>
                      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                        How Will You Participate?
                      </h2>
                      <p className="text-muted-foreground">
                        Choose your relationship with {selectedCountry}. This determines your role and benefits in the chapter.
                      </p>
                    </div>

                    <RadioGroup
                      value={participationType}
                      onValueChange={setParticipationType}
                      className="space-y-4"
                    >
                      {participationTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <label
                            key={type.id}
                            htmlFor={type.id}
                            className={cn(
                              "block p-6 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-md",
                              participationType === type.id
                                ? "border-scef-gold bg-scef-gold/5 shadow-md"
                                : "border-border bg-card hover:border-scef-blue/50"
                            )}
                          >
                            <div className="flex items-start gap-4">
                              <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center",
                                    participationType === type.id ? "bg-scef-gold/20" : "bg-muted"
                                  )}>
                                    <Icon className={cn(
                                      "w-5 h-5",
                                      participationType === type.id ? "text-scef-gold" : "text-muted-foreground"
                                    )} />
                                  </div>
                                  <div>
                                    <h3 className="font-display font-bold text-foreground">{type.title}</h3>
                                    <p className="text-sm text-muted-foreground">{type.description}</p>
                                  </div>
                                </div>
                                
                                {participationType === type.id && (
                                  <div className="mt-4 pt-4 border-t border-border">
                                    <p className="text-xs font-semibold text-scef-blue uppercase tracking-wide mb-2">Benefits</p>
                                    <ul className="grid md:grid-cols-2 gap-2">
                                      {type.benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                          <CheckCircle2 className="w-4 h-4 text-scef-gold shrink-0 mt-0.5" />
                                          {benefit}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          </label>
                        );
                      })}
                    </RadioGroup>

                    <button
                      onClick={() => setStep(1)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      ← Change country
                    </button>
                  </div>
                )}

                {/* Step 3: Diaspora Location */}
                {step === 3 && (
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="px-3 py-1.5 rounded-full bg-scef-gold/10 text-scef-gold text-sm font-medium">
                          {selectedCountry}
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <span className="px-3 py-1.5 rounded-full bg-scef-blue/10 text-scef-blue text-sm font-medium">
                          Diaspora
                        </span>
                      </div>
                      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                        Where Do You Live?
                      </h2>
                      <p className="text-muted-foreground">
                        Let us know your current location so we can connect you with other diaspora members in your area.
                      </p>
                    </div>

                    <div className="space-y-6">
                      {diasporaRegions.map((region) => (
                        <div key={region.region}>
                          <h3 className="font-semibold text-foreground mb-3">{region.region}</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {region.countries.map((country) => (
                              <button
                                key={country}
                                onClick={() => setDiasporaLocation(country)}
                                className={cn(
                                  "p-3 rounded-xl border-2 text-sm font-medium transition-all hover:shadow-md",
                                  diasporaLocation === country
                                    ? "border-scef-gold bg-scef-gold/10 text-scef-blue"
                                    : "border-border bg-card hover:border-scef-blue/50 text-foreground"
                                )}
                              >
                                {country}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Other Location</h3>
                        <Input
                          placeholder="Enter your country..."
                          value={diasporaLocation}
                          onChange={(e) => setDiasporaLocation(e.target.value)}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      ← Change participation type
                    </button>
                  </div>
                )}

                {/* Continue Button */}
                <div className="mt-10 pt-6 border-t border-border">
                  <Button
                    size="lg"
                    className="w-full bg-scef-gold text-scef-blue hover:bg-scef-gold-light font-bold"
                    disabled={!canContinue()}
                    onClick={handleContinue}
                  >
                    {step === 3 || (step === 2 && participationType !== "diaspora") 
                      ? "Continue to Membership" 
                      : "Continue"}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  
                  {selectedCountry && step >= 2 && (
                    <p className="text-center text-sm text-muted-foreground mt-4">
                      You're joining the <strong>{selectedCountry}</strong> online chapter
                      {participationType && (
                        <> as a <strong>{participationTypes.find(t => t.id === participationType)?.title}</strong></>
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Info Section */}
          <section className="py-16 bg-muted/30 border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
                  How Online Chapters Work
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <div className="w-12 h-12 rounded-xl bg-scef-blue/10 flex items-center justify-center mb-4">
                      <Globe className="w-6 h-6 text-scef-blue" />
                    </div>
                    <h3 className="font-display font-bold text-foreground mb-2">Online First</h3>
                    <p className="text-sm text-muted-foreground">
                      Start with virtual meetings, forums, and collaborative projects. Connect with members globally.
                    </p>
                  </div>
                  
                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <div className="w-12 h-12 rounded-xl bg-scef-gold/10 flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-scef-gold" />
                    </div>
                    <h3 className="font-display font-bold text-foreground mb-2">Grow Together</h3>
                    <p className="text-sm text-muted-foreground">
                      As membership grows, chapters can evolve into hybrid or physical chapters with local presence.
                    </p>
                  </div>
                  
                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <div className="w-12 h-12 rounded-xl bg-scef-blue/10 flex items-center justify-center mb-4">
                      <Building2 className="w-6 h-6 text-scef-blue" />
                    </div>
                    <h3 className="font-display font-bold text-foreground mb-2">Governance Structure</h3>
                    <p className="text-sm text-muted-foreground">
                      Each chapter has a Board of Advisors (3-7 members) and an elected Local Chapter President (LCP).
                    </p>
                  </div>
                </div>

                <div className="mt-10 text-center">
                  <p className="text-muted-foreground mb-4">
                    Already a member? Access your chapter dashboard.
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/dashboard">
                      Go to Dashboard
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default JoinOnline;
