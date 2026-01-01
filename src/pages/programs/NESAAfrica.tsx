import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Award, Trophy, Star, Users, Calendar, 
  ArrowRight, CheckCircle, Vote, Medal, Sparkles 
} from "lucide-react";

const awardCategories = [
  { name: "Outstanding Student Award", desc: "Recognizing academic excellence and leadership" },
  { name: "Teacher of Excellence", desc: "Honoring educators making exceptional impact" },
  { name: "School of the Year", desc: "Celebrating institutional achievement" },
  { name: "Innovation in Education", desc: "Rewarding creative teaching approaches" },
  { name: "Community Impact Award", desc: "For schools driving local change" },
  { name: "STEM Excellence Award", desc: "Promoting science and technology education" },
];

const timeline = [
  { phase: "Nominations Open", date: "January - March", desc: "Submit nominations for all categories" },
  { phase: "Research & Verification", date: "April - June", desc: "Nominee Research Corps evaluation" },
  { phase: "Public Voting", date: "July - August", desc: "SCEF members vote for finalists" },
  { phase: "Awards Ceremony", date: "September", desc: "Grand celebration and recognition" },
];

const NESAAfrica = () => {
  return (
    <>
      <Helmet>
        <title>NESA-Africa | New Education Standard Award Africa - SCEF</title>
        <meta 
          name="description" 
          content="NESA-Africa celebrates excellence in African education through annual awards recognizing outstanding students, teachers, and schools across the continent." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-24 bg-earth overflow-hidden">
            <div className="absolute inset-0 bg-african-pattern opacity-10" />
            <div className="absolute top-20 right-10 w-64 h-64 bg-gold/20 rounded-full blur-3xl" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 text-gold text-sm font-medium mb-6">
                  <Award className="w-4 h-4" />
                  Recognition & Excellence
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                  New Education Standard Award <span className="text-gradient-gold">Africa</span>
                </h1>
                <p className="text-xl text-cream/80 leading-relaxed mb-8 max-w-2xl mx-auto">
                  Celebrating academic excellence, innovative teaching, and educational leadership across Africa since 2010.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-gold text-earth hover:bg-gold-light">
                    <Star className="w-4 h-4 mr-2" />
                    Nominate Now
                  </Button>
                  <Button size="lg" variant="outline" className="border-cream/30 text-cream hover:bg-cream/10">
                    View Past Winners
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-12 bg-card border-b border-border">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {[
                  { value: "15+", label: "Years Running" },
                  { value: "25+", label: "Countries" },
                  { value: "5,000+", label: "Nominees" },
                  { value: "500+", label: "Awardees" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-display text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                    <p className="text-muted-foreground text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                    Recognizing <span className="text-gradient-gold">Excellence</span> Across Africa
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    NESA-Africa is the continent&apos;s premier education recognition program, celebrating the individuals and institutions driving educational transformation across Africa.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Through rigorous evaluation by our Nominee Research Corps and democratic voting by SCEF members, we ensure that recognition goes to those truly making a difference in African education.
                  </p>
                  <div className="space-y-4">
                    {[
                      "Pan-African scope covering 25+ countries",
                      "Democratic voting by SCEF members",
                      "Rigorous research-backed evaluation",
                      "Scholarships and grants for winners",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-forest" />
                        <span className="text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-gold/10 rounded-2xl p-6 border border-gold/20">
                      <Trophy className="w-10 h-10 text-gold mb-4" />
                      <h3 className="font-display font-bold text-foreground mb-2">Annual Awards</h3>
                      <p className="text-muted-foreground text-sm">Grand ceremony celebrating awardees</p>
                    </div>
                    <div className="bg-terracotta/10 rounded-2xl p-6 border border-terracotta/20">
                      <Users className="w-10 h-10 text-terracotta mb-4" />
                      <h3 className="font-display font-bold text-foreground mb-2">Research Corps</h3>
                      <p className="text-muted-foreground text-sm">Dedicated team evaluating nominees</p>
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="bg-forest/10 rounded-2xl p-6 border border-forest/20">
                      <Vote className="w-10 h-10 text-forest mb-4" />
                      <h3 className="font-display font-bold text-foreground mb-2">Member Voting</h3>
                      <p className="text-muted-foreground text-sm">Democratic selection by SCEF members</p>
                    </div>
                    <div className="bg-primary/10 rounded-2xl p-6 border border-primary/20">
                      <Medal className="w-10 h-10 text-primary mb-4" />
                      <h3 className="font-display font-bold text-foreground mb-2">Scholarships</h3>
                      <p className="text-muted-foreground text-sm">Financial support for student winners</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Award Categories */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Award <span className="text-gradient-gold">Categories</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Six prestigious categories recognizing excellence at every level of education.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {awardCategories.map((category, index) => (
                  <div 
                    key={category.name}
                    className="group p-6 rounded-2xl bg-background border border-border hover:border-gold/50 transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="font-display font-bold text-foreground mb-2">{category.name}</h3>
                    <p className="text-muted-foreground text-sm">{category.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Awards <span className="text-gradient-gold">Timeline</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Follow the journey from nomination to celebration.
                </p>
              </div>
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-4 gap-6">
                  {timeline.map((item, index) => (
                    <div key={item.phase} className="relative">
                      {index < timeline.length - 1 && (
                        <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-border" />
                      )}
                      <div className="bg-card rounded-2xl p-6 border border-border h-full">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                          <Calendar className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-sm text-primary font-medium mb-2">{item.date}</p>
                        <h3 className="font-display font-bold text-foreground mb-2">{item.phase}</h3>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-earth">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
                Nominate a Champion of <span className="text-gold">Education</span>
              </h2>
              <p className="text-cream/70 max-w-xl mx-auto mb-8">
                Know someone making an exceptional impact in African education? Submit your nomination today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gold text-earth hover:bg-gold-light">
                  <Award className="w-4 h-4 mr-2" />
                  Submit Nomination
                </Button>
                <Button size="lg" variant="outline" className="border-cream/30 text-cream hover:bg-cream/10" asChild>
                  <Link to="/membership">Become a Voting Member</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default NESAAfrica;
