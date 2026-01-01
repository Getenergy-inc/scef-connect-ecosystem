import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building, Shield, TrendingUp } from "lucide-react";

export const WhoWeAreSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Building className="w-4 h-4" />
              Who We Are
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              An Institutional <span className="text-gradient-gold">Platform</span>, Not a Project
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              SCEF is Africa's institutional platform for education governance, delivery, certification, funding, and recognition. Founded in 1997 and formally registered in 2010, SCEF replaces fragmented initiatives with a single, accountable framework that enables scale, trust, and continuity.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Accountable Framework</h4>
                  <p className="text-sm text-muted-foreground">Fiduciary oversight & institutional governance</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-terracotta/10 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-terracotta" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Built for Scale</h4>
                  <p className="text-sm text-muted-foreground">Continental reach with local execution</p>
                </div>
              </div>
            </div>
            
            <Button variant="default" size="lg" asChild>
              <Link to="/about">
                About SCEF
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="absolute -top-8 -right-8 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-terracotta/10 rounded-full blur-3xl" />
            
            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-background rounded-2xl p-6 border border-border">
                  <div className="text-4xl font-display font-bold text-primary mb-2">1997</div>
                  <p className="text-sm text-muted-foreground">Year Founded</p>
                </div>
                <div className="bg-earth rounded-2xl p-6">
                  <div className="text-4xl font-display font-bold text-gold mb-2">54+</div>
                  <p className="text-sm text-cream/80">African Countries</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-background rounded-2xl p-6 border border-border">
                  <div className="text-4xl font-display font-bold text-terracotta mb-2">50K+</div>
                  <p className="text-sm text-muted-foreground">Students Impacted</p>
                </div>
                <div className="bg-forest rounded-2xl p-6">
                  <div className="text-4xl font-display font-bold text-cream mb-2">100+</div>
                  <p className="text-sm text-cream/80">Local Chapters</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
