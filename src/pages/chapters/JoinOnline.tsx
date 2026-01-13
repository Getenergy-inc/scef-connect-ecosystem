import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { useState } from "react";
import {
  Globe, Users, Heart, MapPin, CheckCircle2, ArrowRight,
  Building2, Plane, Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";

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

const participationTypeKeys = ["resident", "diaspora", "friend"] as const;
const participationIcons = {
  resident: Building2,
  diaspora: Plane,
  friend: Heart,
};

const JoinOnline = () => {
  const { t, isRTL } = useLocale();
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

  const infoItems = t("joinOnline.info.items") as unknown as string[] || [];

  return (
    <>
      <Helmet>
        <title>{t("joinOnline.hero.title")} | SCEF</title>
        <meta name="description" content={t("joinOnline.hero.subtitle")} />
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
                  {t("joinOnline.hero.badge")}
                </div>
                
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  {t("joinOnline.hero.title")}
                </h1>
                
                <p className="text-lg text-white/80 leading-relaxed mb-4">
                  {t("joinOnline.hero.subtitle")}
                </p>
                
                <p className="text-sm text-white/60">
                  {t("joinOnline.hero.note")}
                </p>
              </div>
            </div>
          </section>

          {/* Progress Steps */}
          <section className="bg-muted/50 border-b border-border py-6">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center gap-4 md:gap-8">
                {[
                  { num: 1, labelKey: "joinOnline.steps.selectCountry" },
                  { num: 2, labelKey: "joinOnline.steps.chooseRole" },
                  { num: 3, labelKey: "joinOnline.steps.yourLocation", conditional: participationType === "diaspora" },
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
                      <span className="hidden md:block text-sm font-medium">{t(s.labelKey)}</span>
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
                        {t("joinOnline.step1.title")}
                      </h2>
                      <p className="text-muted-foreground">
                        {t("joinOnline.step1.subtitle")}
                      </p>
                    </div>

                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        placeholder={t("joinOnline.step1.searchPlaceholder")}
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
                        {t("joinOnline.step1.noResults")} "{countrySearch}"
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
                        {t("joinOnline.step2.title")}
                      </h2>
                      <p className="text-muted-foreground">
                        {t("joinOnline.step2.subtitle").replace("{country}", selectedCountry)}
                      </p>
                    </div>

                    <RadioGroup
                      value={participationType}
                      onValueChange={setParticipationType}
                      className="space-y-4"
                    >
                      {participationTypeKeys.map((typeKey) => {
                        const Icon = participationIcons[typeKey];
                        const benefits = t(`joinOnline.types.${typeKey}.benefits`) as unknown as string[] || [];
                        return (
                          <label
                            key={typeKey}
                            htmlFor={typeKey}
                            className={cn(
                              "block p-6 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-md",
                              participationType === typeKey
                                ? "border-scef-gold bg-scef-gold/5 shadow-md"
                                : "border-border bg-card hover:border-scef-blue/50"
                            )}
                          >
                            <div className="flex items-start gap-4">
                              <RadioGroupItem value={typeKey} id={typeKey} className="mt-1" />
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center",
                                    participationType === typeKey ? "bg-scef-gold/20" : "bg-muted"
                                  )}>
                                    <Icon className={cn(
                                      "w-5 h-5",
                                      participationType === typeKey ? "text-scef-gold" : "text-muted-foreground"
                                    )} />
                                  </div>
                                  <div>
                                    <h3 className="font-display font-bold text-foreground">
                                      {t(`joinOnline.types.${typeKey}.title`)}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                      {t(`joinOnline.types.${typeKey}.description`)}
                                    </p>
                                  </div>
                                </div>
                                
                                {participationType === typeKey && (
                                  <div className="mt-4 pt-4 border-t border-border">
                                    <p className="text-xs font-semibold text-scef-blue uppercase tracking-wide mb-2">
                                      {t("joinOnline.step2.benefits")}
                                    </p>
                                    <ul className="grid md:grid-cols-2 gap-2">
                                      {Array.isArray(benefits) && benefits.map((benefit, i) => (
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
                      {t("joinOnline.step2.changeCountry")}
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
                          {t("joinOnline.types.diaspora.title")}
                        </span>
                      </div>
                      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                        {t("joinOnline.step3.title")}
                      </h2>
                      <p className="text-muted-foreground">
                        {t("joinOnline.step3.subtitle")}
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
                        <h3 className="font-semibold text-foreground mb-3">{t("joinOnline.step3.otherLocation")}</h3>
                        <Input
                          placeholder={t("joinOnline.step3.enterCountry")}
                          value={diasporaLocation}
                          onChange={(e) => setDiasporaLocation(e.target.value)}
                          className="border-2 border-black"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t("joinOnline.step3.back")}
                    </button>
                  </div>
                )}

                {/* Continue Button */}
                <div className="mt-8 pt-8 border-t border-border">
                  <Button
                    size="lg"
                    className="w-full bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold"
                    onClick={handleContinue}
                    disabled={!canContinue()}
                  >
                    {step < 3 || (step === 2 && participationType !== "diaspora") 
                      ? t("joinOnline.cta.continue")
                      : t("joinOnline.cta.proceedMembership")
                    }
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Info Box */}
              <Card className="max-w-2xl mx-auto mt-12 border-2 border-black">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-scef-gold/20 flex items-center justify-center flex-shrink-0 border border-black">
                      <Users className="w-5 h-5 text-scef-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{t("joinOnline.info.title")}</h3>
                      <ul className="space-y-1">
                        {Array.isArray(infoItems) && infoItems.map((item, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-scef-gold shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default JoinOnline;
