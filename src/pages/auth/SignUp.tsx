import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, Lock, User, BookOpen, ArrowRight, MapPin, Users, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mapAuthErrorToUserMessage } from "@/lib/errorMapper";
import { logger } from "@/lib/logger";

// Country list (simplified)
const countries = [
  "Nigeria", "Ghana", "Kenya", "South Africa", "Egypt", "Morocco", "Tanzania",
  "Uganda", "Ethiopia", "Rwanda", "Senegal", "Cameroon", "Ivory Coast", "Angola",
  "Mozambique", "Zimbabwe", "Zambia", "Botswana", "Namibia", "Malawi",
  // Non-African
  "United States", "United Kingdom", "Canada", "France", "Germany", "Netherlands",
  "Belgium", "Italy", "Spain", "Portugal", "Australia", "India", "China", "Japan",
  "Brazil", "Mexico", "UAE", "Saudi Arabia", "Qatar", "Other"
];

type RelationshipType = "resident" | "diaspora" | "friend";

const SignUp = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [relationship, setRelationship] = useState<RelationshipType | "">("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // Available chapters
  const [chapters, setChapters] = useState<any[]>([]);

  useEffect(() => {
    // Check if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate(redirectTo);
      }
    });
  }, [navigate, redirectTo]);

  useEffect(() => {
    // Fetch chapters when country changes
    if (country) {
      fetchChapters();
    }
  }, [country]);

  const fetchChapters = async () => {
    const { data } = await supabase
      .from("chapters")
      .select("id, name, country, chapter_type, status")
      .eq("status", "active")
      .order("name");
    
    if (data) {
      // Filter by country if African, or show all online chapters
      const filtered = data.filter(c => 
        c.country.toLowerCase() === country.toLowerCase() ||
        c.chapter_type === "online"
      );
      setChapters(filtered.length > 0 ? filtered : data);
    }
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!country || !relationship) {
      toast.error("Please select your country and relationship");
      return;
    }
    setStep(3);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}${redirectTo}`,
          data: {
            first_name: firstName,
            last_name: lastName,
            phone,
            country,
            relationship_to_country: relationship,
            chapter_id: selectedChapter || null,
          },
        },
      });

      if (error) throw error;

      // Update profile with chapter and relationship
      if (data.user) {
        await supabase
          .from("profiles")
          .update({
            country,
            relationship_to_country: relationship,
            chapter_id: selectedChapter || null,
            phone,
          })
          .eq("user_id", data.user.id);

        // If chapter selected, add to chapter_members and create welcome thread
        if (selectedChapter && selectedChapter !== "online-global") {
          await supabase.from("chapter_members").insert({
            chapter_id: selectedChapter,
            user_id: data.user.id,
          });

          // Create welcome inbox thread
          const { data: thread } = await supabase
            .from("chapter_inbox_threads")
            .insert({
              chapter_id: selectedChapter,
              user_id: data.user.id,
              subject: "Welcome to your SCEF Chapter!",
            })
            .select()
            .single();

          if (thread) {
            // Add welcome message
            await supabase.from("chapter_inbox_messages").insert({
              thread_id: thread.id,
              sender_type: "system",
              content: `Welcome to SCEF, ${firstName}! 🎉\n\nYou've been successfully registered under your local chapter. This is your dedicated channel for chapter correspondence, announcements, and support.\n\nHere's what you can do next:\n• Complete your profile\n• Fund your GFA Wallet\n• Explore our programs\n• Connect with other members\n\nIf you have any questions, simply reply to this thread and our chapter team will assist you.\n\n— Your SCEF Chapter Team`,
            });
          }
        }
      }

      toast.success("Account created successfully! Welcome to SCEF.");
      navigate("/dashboard/welcome");
    } catch (error: unknown) {
      logger.error("Sign up error:", error);
      toast.error(mapAuthErrorToUserMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const relationshipOptions = [
    { 
      value: "resident", 
      label: "Resident", 
      description: "I currently live in this country",
      icon: MapPin
    },
    { 
      value: "diaspora", 
      label: "Diaspora", 
      description: "I am from this country but live abroad",
      icon: Globe
    },
    { 
      value: "friend", 
      label: "Friend", 
      description: "I support African education from outside",
      icon: Users
    },
  ];

  return (
    <>
      <Helmet>
        <title>Sign Up | SCEF - Santos Creations Educational Foundation</title>
        <meta name="description" content="Join SCEF to support education across Africa. Create an account and become part of our global community." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-scef-blue-darker via-scef-blue-dark to-scef-blue-darker">
        <Header />
        
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto">
              {/* Logo & Title */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-scef-gold to-scef-gold-light flex items-center justify-center shadow-gold mb-4">
                  <BookOpen className="w-10 h-10 text-scef-blue-darker" />
                </div>
                <h1 className="font-display text-3xl font-bold text-white mb-2">
                  Join SCEF
                </h1>
                <p className="text-white/70">
                  Create your account and join our global community
                </p>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                      step >= s 
                        ? "bg-scef-gold text-scef-blue-dark" 
                        : "bg-white/20 text-white/60"
                    }`}>
                      {s}
                    </div>
                    {s < 3 && (
                      <div className={`w-12 h-1 mx-1 rounded transition-colors ${
                        step > s ? "bg-scef-gold" : "bg-white/20"
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>
                    {step === 1 && "Account Details"}
                    {step === 2 && "Your Location"}
                    {step === 3 && "Choose Your Chapter"}
                  </CardTitle>
                  <CardDescription>
                    {step === 1 && "Enter your email and create a password"}
                    {step === 2 && "Tell us where you're from"}
                    {step === 3 && "Select a local chapter to join"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Step 1: Account Details */}
                  {step === 1 && (
                    <form onSubmit={handleStep1Submit} className="space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="firstName"
                              type="text"
                              placeholder="John"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="lastName"
                              type="text"
                              placeholder="Doe"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 234 567 8900"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10"
                            required
                            minLength={6}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <Button type="submit" className="w-full" size="lg">
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  )}

                  {/* Step 2: Location & Relationship */}
                  {step === 2 && (
                    <form onSubmit={handleStep2Submit} className="space-y-6">
                      <div className="space-y-2">
                        <Label>Country</Label>
                        <Select value={country} onValueChange={setCountry}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((c) => (
                              <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label>Your Relationship to {country || "this country"}</Label>
                        <div className="grid gap-3">
                          {relationshipOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setRelationship(option.value as RelationshipType)}
                              className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                                relationship === option.value
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                relationship === option.value 
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}>
                                <option.icon className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="font-semibold">{option.label}</p>
                                <p className="text-sm text-muted-foreground">{option.description}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setStep(1)}
                          className="flex-1"
                        >
                          Back
                        </Button>
                        <Button type="submit" className="flex-1">
                          Continue
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </form>
                  )}

                  {/* Step 3: Chapter Selection */}
                  {step === 3 && (
                    <form onSubmit={handleFinalSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label>Select Your Local Chapter</Label>
                        <Select value={selectedChapter} onValueChange={setSelectedChapter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a chapter" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Skip for now</SelectItem>
                            {chapters.map((c) => (
                              <SelectItem key={c.id} value={c.id}>
                                {c.name} ({c.country}) - {c.chapter_type}
                              </SelectItem>
                            ))}
                            <SelectItem value="online-global">
                              Online Global Chapter
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          You can change this later or join multiple chapters
                        </p>
                      </div>

                      <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                        <h4 className="font-semibold text-sm">What you get:</h4>
                        <ul className="text-sm space-y-2 text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            Personal Dashboard & Profile
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            GFA Wallet for donations & payments
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            Chapter correspondence & updates
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            Access to all SCEF programs
                          </li>
                        </ul>
                      </div>

                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="terms"
                          checked={acceptTerms}
                          onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                        />
                        <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                          I agree to the <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and{" "}
                          <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                        </label>
                      </div>

                      <div className="flex gap-3">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setStep(2)}
                          className="flex-1"
                        >
                          Back
                        </Button>
                        <Button 
                          type="submit" 
                          className="flex-1"
                          disabled={loading || !acceptTerms}
                        >
                          {loading ? "Creating Account..." : "Create Account"}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </form>
                  )}

                  <div className="mt-6 text-center">
                    <button
                      type="button"
                      onClick={() => navigate("/auth")}
                      className="text-sm text-primary hover:underline"
                    >
                      Already have an account? Sign in
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SignUp;