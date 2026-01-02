import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, GraduationCap, MapPin, Users, Wallet, BarChart3 } from "lucide-react";

export const CertificationsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-gold/20 text-scef-blue text-sm font-medium mb-6 border-2 border-black">
                <Award className="w-4 h-4" />
                Certifications & Productivity
              </div>
              
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Africa Education & Productivity{" "}
                <span className="text-scef-gold">Certification (AEPC)</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                SCEF issues certifications for education standards, ICT proficiency, and program completion. Our hybrid delivery model combines online learning with licensed physical examination centres across Africa.
              </p>

              <div className="bg-muted/50 rounded-xl p-6 mb-8 border-2 border-black">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Productivity Tools</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Wallet className="w-5 h-5 text-scef-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">Digital Wallets</h4>
                      <p className="text-xs text-muted-foreground">For transparent funding allocation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BarChart3 className="w-5 h-5 text-scef-blue shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">AI-Driven Analytics</h4>
                      <p className="text-xs text-muted-foreground">For outcome measurement</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold" asChild>
                  <Link to="/certifications">
                    <GraduationCap className="w-4 h-4" />
                    View Certifications
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-2 border-scef-blue text-scef-blue hover:bg-scef-blue hover:text-white" asChild>
                  <Link to="/partners/training">
                    <Users className="w-4 h-4" />
                    Become a Training Partner
                  </Link>
                </Button>
                <Button variant="ghost" size="lg" className="text-scef-blue hover:bg-scef-blue/10" asChild>
                  <Link to="/certifications/centres">
                    <MapPin className="w-4 h-4" />
                    Find Exam Centres
                  </Link>
                </Button>
              </div>
            </div>

            {/* Visual Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-scef-gold/20 to-scef-blue/20 rounded-3xl blur-2xl" />
              
              <div className="relative bg-scef-blue rounded-3xl p-8 lg:p-10 overflow-hidden border-2 border-black">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
                
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-scef-gold/20 flex items-center justify-center mb-6 border-2 border-black">
                    <Award className="w-10 h-10 text-scef-gold" />
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold text-white mb-4">
                    AEPC Certification
                  </h3>
                  
                  <ul className="space-y-4 text-white/80">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-scef-gold" />
                      Industry-aligned curriculum
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-scef-gold" />
                      Hybrid delivery model
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-scef-gold" />
                      Affiliate training partners
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-scef-gold" />
                      Licensed exam centres
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-scef-gold" />
                      GFA Wallet payments
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-scef-gold" />
                      Auditable transactions
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
