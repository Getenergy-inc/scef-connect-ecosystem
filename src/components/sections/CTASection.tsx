import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Users, ArrowRight, Handshake } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-24 bg-scef-blue relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-african-pattern opacity-5" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-scef-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Build Africa's Education Future <span className="text-scef-gold">With Us</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Join thousands of members and partners working to transform education across Africa.
          </p>
        </div>

        {/* CTA Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Join Card */}
          <div className="group bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-scef-gold/50 transition-all duration-300 hover:bg-white/15">
            <div className="w-14 h-14 rounded-2xl bg-scef-gold/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7 text-scef-gold" />
            </div>
            
            <h3 className="font-display text-2xl font-bold text-white mb-3">
              Join SCEF
            </h3>
            <p className="text-white/70 mb-6 leading-relaxed">
              Become a member of Africa's premier education governance institution.
            </p>
            
            <Button size="lg" className="w-full bg-scef-gold text-scef-blue hover:bg-scef-gold/90" asChild>
              <Link to="/membership">
                Join Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Partner Card */}
          <div className="group bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-scef-gold/50 transition-all duration-300 hover:bg-white/15">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Handshake className="w-7 h-7 text-white" />
            </div>
            
            <h3 className="font-display text-2xl font-bold text-white mb-3">
              Partner With Us
            </h3>
            <p className="text-white/70 mb-6 leading-relaxed">
              Collaborate with SCEF to scale education impact across the continent.
            </p>
            
            <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-white/10" asChild>
              <Link to="/partners">
                Explore Partnerships
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Donate Card */}
          <div className="group bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-scef-gold/50 transition-all duration-300 hover:bg-white/15">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Heart className="w-7 h-7 text-white" />
            </div>
            
            <h3 className="font-display text-2xl font-bold text-white mb-3">
              Donate
            </h3>
            <p className="text-white/70 mb-6 leading-relaxed">
              Support scholarships, school rebuilding, and education programs.
            </p>
            
            <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-white/10" asChild>
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
