import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, GraduationCap, MapPin, Users } from "lucide-react";

export const CertificationsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-medium mb-6">
                <Award className="w-4 h-4" />
                Certifications
              </div>
              
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Africa Education & Productivity{" "}
                <span className="text-gradient-gold">Certification (AEPC)</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Hybrid, industry-aligned certifications delivered via affiliate training partners and licensed examination centres across Africa—powered by SCEF and delivered through Education Online Africa.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button variant="default" size="lg" asChild>
                  <Link to="/certifications">
                    <GraduationCap className="w-4 h-4" />
                    View Certifications
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/partners/training">
                    <Users className="w-4 h-4" />
                    Become a Training Partner
                  </Link>
                </Button>
                <Button variant="ghost" size="lg" asChild>
                  <Link to="/certifications/centres">
                    <MapPin className="w-4 h-4" />
                    Find Exam Centres
                  </Link>
                </Button>
              </div>
            </div>

            {/* Visual Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-terracotta/20 rounded-3xl blur-2xl" />
              
              <div className="relative bg-gradient-to-br from-earth to-earth/90 rounded-3xl p-8 lg:p-10 overflow-hidden">
                <div className="absolute inset-0 bg-african-pattern opacity-10" />
                
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gold/20 flex items-center justify-center mb-6">
                    <Award className="w-10 h-10 text-gold" />
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold text-cream mb-4">
                    AEPC Certification
                  </h3>
                  
                  <ul className="space-y-4 text-cream/80">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-gold" />
                      Industry-aligned curriculum
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-gold" />
                      Hybrid delivery model
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-gold" />
                      Affiliate training partners
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-gold" />
                      Licensed exam centres
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-gold" />
                      GFA Wallet payments
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
