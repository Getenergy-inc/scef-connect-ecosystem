import { Link } from "react-router-dom";
import { MapPin, Users, ArrowRight, Globe, Plus, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredChapters = [
  {
    name: "Lagos Chapter",
    location: "Lagos, Nigeria",
    members: 1250,
    type: "Physical",
    image: "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?w=400",
  },
  {
    name: "Nairobi Chapter",
    location: "Nairobi, Kenya",
    members: 890,
    type: "Hybrid",
    image: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=400",
  },
  {
    name: "Accra Chapter",
    location: "Accra, Ghana",
    members: 650,
    type: "Physical",
    image: "https://images.unsplash.com/photo-1596005554384-d293674c91d7?w=400",
  },
  {
    name: "Online Global",
    location: "Worldwide",
    members: 3200,
    type: "Online",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
  },
];

const typeColors = {
  Physical: "bg-scef-blue text-white",
  Hybrid: "bg-scef-gold text-scef-blue",
  Online: "bg-white text-scef-blue border border-scef-blue",
};

export const ChaptersSection = () => {
  return (
    <section className="py-24 bg-scef-blue">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-scef-gold text-sm font-medium mb-6 border border-white/20">
            <Globe className="w-4 h-4" />
            Local Chapter Pathway
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Local Execution, <span className="text-scef-gold">Continental Governance</span>
          </h2>
          
          <p className="text-lg text-white/80 leading-relaxed mb-6">
            Local chapters form the operational backbone. Governments and institutions can establish chapters for country-level governance.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-left max-w-3xl mx-auto">
            <div className="flex items-start gap-3 mb-4">
              <Building2 className="w-5 h-5 text-scef-gold shrink-0 mt-0.5" />
              <h3 className="font-display text-lg font-bold text-white">Chapter Establishment Process</h3>
            </div>
            <p className="text-white/70 leading-relaxed text-sm">
              Apply via portal → Undergo compliance review by SOBCD → Receive onboarding from LCS → Integrate with BoD for regional oversight. 
              Upgrades enable physical infrastructure with performance metrics tracked quarterly.
            </p>
          </div>
        </div>

        {/* Chapters Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredChapters.map((chapter, index) => (
            <Link
              key={chapter.name}
              to="/local-chapters"
              className="group relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-white/20 hover:border-scef-gold/50 transition-all duration-500 hover:bg-white/15"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={chapter.image}
                  alt={chapter.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-scef-blue/80 to-transparent" />
                
                {/* Type Badge */}
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${typeColors[chapter.type as keyof typeof typeColors]}`}>
                  {chapter.type}
                </span>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-scef-gold transition-colors">
                  {chapter.name}
                </h3>
                <div className="flex items-center gap-2 text-white/70 text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  {chapter.location}
                </div>
                <div className="flex items-center gap-2 text-scef-gold text-sm font-medium">
                  <Users className="w-4 h-4" />
                  {chapter.members.toLocaleString()} members
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-scef-gold text-scef-blue hover:bg-scef-gold/90 border-2 border-black" asChild>
            <Link to="/chapters/join">
              <Users className="w-4 h-4" />
              Join a Chapter
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10" asChild>
            <Link to="/chapters/create">
              <Plus className="w-4 h-4" />
              Create an Online Chapter
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
