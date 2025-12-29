import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Users, ArrowRight, Sparkles } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-terracotta/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Join Card */}
          <div className="group relative bg-gradient-to-br from-earth to-earth/90 rounded-3xl p-10 lg:p-12 overflow-hidden">
            <div className="absolute inset-0 bg-african-pattern opacity-10" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gold/20 flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-gold" />
              </div>
              
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-cream mb-4">
                Become a Member
              </h3>
              <p className="text-cream/70 mb-8 leading-relaxed">
                Join thousands of passionate individuals committed to transforming education across Africa. As a member, you'll get access to exclusive events, networking opportunities, and the chance to make a real impact.
              </p>
              
              <ul className="space-y-3 mb-8">
                {["Access exclusive programs", "Network with changemakers", "Participate in events", "Make lasting impact"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-cream/80">
                    <Sparkles className="w-4 h-4 text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              
              <Button variant="hero" size="lg" asChild>
                <Link to="/membership">
                  Join Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Donate Card */}
          <div className="group relative bg-gradient-to-br from-terracotta to-terracotta/90 rounded-3xl p-10 lg:p-12 overflow-hidden">
            <div className="absolute inset-0 bg-african-pattern opacity-10" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-cream/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-cream/20 flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-cream" />
              </div>
              
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-cream mb-4">
                Support Our Mission
              </h3>
              <p className="text-cream/80 mb-8 leading-relaxed">
                Your donation directly impacts students and communities across Africa. Every contribution helps fund scholarships, rebuild schools, and provide educational resources to those who need them most.
              </p>
              
              {/* Donation Tiers */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {["$25", "$50", "$100"].map((amount) => (
                  <button
                    key={amount}
                    className="py-3 rounded-xl bg-cream/10 border border-cream/20 text-cream font-semibold hover:bg-cream/20 transition-colors"
                  >
                    {amount}
                  </button>
                ))}
              </div>
              
              <Button 
                variant="default" 
                size="lg" 
                className="w-full bg-cream text-terracotta hover:bg-cream/90"
                asChild
              >
                <Link to="/donate">
                  Donate Today
                  <Heart className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
