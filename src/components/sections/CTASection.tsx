import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Users, ArrowRight, Handshake } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-24 bg-earth relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-african-pattern opacity-10" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-terracotta/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-cream mb-6">
            Build Africa's Education Future <span className="text-gradient-gold">With Us</span>
          </h2>
          <p className="text-lg text-cream/70 max-w-2xl mx-auto">
            Join thousands of members and partners working to transform education across Africa.
          </p>
        </div>

        {/* CTA Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Join Card */}
          <div className="group bg-gradient-to-br from-cream/10 to-transparent rounded-3xl p-8 border border-cream/10 backdrop-blur-sm hover:border-gold/30 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gold/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7 text-gold" />
            </div>
            
            <h3 className="font-display text-2xl font-bold text-cream mb-3">
              Join SCEF
            </h3>
            <p className="text-cream/70 mb-6 leading-relaxed">
              Become a member of Africa's premier education governance institution.
            </p>
            
            <Button variant="hero" size="lg" className="w-full" asChild>
              <Link to="/membership">
                Join Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Partner Card */}
          <div className="group bg-gradient-to-br from-cream/10 to-transparent rounded-3xl p-8 border border-cream/10 backdrop-blur-sm hover:border-terracotta/30 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-terracotta/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Handshake className="w-7 h-7 text-terracotta" />
            </div>
            
            <h3 className="font-display text-2xl font-bold text-cream mb-3">
              Partner With Us
            </h3>
            <p className="text-cream/70 mb-6 leading-relaxed">
              Collaborate with SCEF to scale education impact across the continent.
            </p>
            
            <Button variant="heroOutline" size="lg" className="w-full" asChild>
              <Link to="/partners">
                Explore Partnerships
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Donate Card */}
          <div className="group bg-gradient-to-br from-cream/10 to-transparent rounded-3xl p-8 border border-cream/10 backdrop-blur-sm hover:border-forest/30 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-forest/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Heart className="w-7 h-7 text-forest" />
            </div>
            
            <h3 className="font-display text-2xl font-bold text-cream mb-3">
              Donate
            </h3>
            <p className="text-cream/70 mb-6 leading-relaxed">
              Support scholarships, school rebuilding, and education programs.
            </p>
            
            <Button variant="heroOutline" size="lg" className="w-full" asChild>
              <Link to="/wallet/donate">
                Donate Now
                <Heart className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
