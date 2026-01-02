import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building, Shield, TrendingUp, FileText } from "lucide-react";

export const WhoWeAreSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-blue/10 text-scef-blue text-sm font-medium mb-6 border-2 border-black">
              <Building className="w-4 h-4" />
              Who We Are
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              An Institutional <span className="text-scef-gold">Platform</span>, Not a Project
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              SCEF is a membership-driven institution registered in 2010, operating across Africa and its diaspora. We govern structured education programs, digital platforms, media outlets, funding mechanisms, and chapter networks to ensure scalable, accountable education access.
            </p>

            <div className="bg-muted/50 rounded-xl p-6 mb-8 border-2 border-black">
              <div className="flex items-start gap-3 mb-4">
                <FileText className="w-5 h-5 text-scef-blue shrink-0 mt-0.5" />
                <h3 className="font-display text-lg font-bold text-foreground">Our Mandate</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                SCEF establishes governance frameworks for education delivery, enforces compliance standards, and facilitates partnerships to advance institutional education systems continent-wide.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-scef-gold/10 flex items-center justify-center shrink-0 border-2 border-black">
                  <Shield className="w-5 h-5 text-scef-gold" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Accountable Framework</h4>
                  <p className="text-sm text-muted-foreground">Fiduciary oversight & institutional governance</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-scef-blue/10 flex items-center justify-center shrink-0 border-2 border-black">
                  <TrendingUp className="w-5 h-5 text-scef-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Built for Scale</h4>
                  <p className="text-sm text-muted-foreground">Continental reach with local execution</p>
                </div>
              </div>
            </div>
            
            <Button size="lg" className="bg-scef-blue hover:bg-scef-blue/90 text-white border-2 border-black" asChild>
              <Link to="/about">
                About SCEF
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="absolute -top-8 -right-8 w-72 h-72 bg-scef-gold/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-scef-blue/10 rounded-full blur-3xl" />
            
            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-card rounded-2xl p-6 border-2 border-black">
                  <div className="text-4xl font-display font-bold text-scef-blue mb-2">1997</div>
                  <p className="text-sm text-muted-foreground">Year Founded</p>
                </div>
                <div className="bg-scef-blue rounded-2xl p-6 border-2 border-black">
                  <div className="text-4xl font-display font-bold text-scef-gold mb-2">54+</div>
                  <p className="text-sm text-white/80">African Countries</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-card rounded-2xl p-6 border-2 border-black">
                  <div className="text-4xl font-display font-bold text-scef-gold mb-2">2010</div>
                  <p className="text-sm text-muted-foreground">Registered</p>
                </div>
                <div className="bg-scef-blue rounded-2xl p-6 border-2 border-black">
                  <div className="text-4xl font-display font-bold text-white mb-2">100+</div>
                  <p className="text-sm text-white/80">Local Chapters</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
