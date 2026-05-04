import { Link } from "react-router-dom";
import { Sparkles, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MerchItem {
  name: string;
  price: string;
  agc: string;
  limited?: boolean;
}

const merchandise: MerchItem[] = [
  { name: "Impact Wristband", price: "$5", agc: "+25 AGC bonus" },
  { name: "Sticker Pack (5 pcs)", price: "$7", agc: "+35 AGC bonus" },
  { name: "NESA Lapel Pin / Badge", price: "$10", agc: "+50 AGC bonus" },
  { name: "Branded Cap", price: "$15", agc: "+75 AGC bonus" },
  { name: "Eco Tote Bag", price: "$20", agc: "+100 AGC bonus" },
  { name: "Branded T-Shirt", price: "$25", agc: "+125 AGC bonus" },
  { name: "Polo Shirt", price: "$35", agc: "+175 AGC bonus" },
  { name: "Ceremonial Desk Flag", price: "$40", agc: "+200 AGC bonus", limited: true },
  { name: "Branded Hoodie", price: "$55", agc: "+275 AGC bonus" },
  { name: "Bomber Jacket", price: "$120", agc: "+600 AGC bonus", limited: true },
];

export const ScefBrandedMerchandise = () => {
  return (
    <section className="py-20 bg-scef-blue-darker">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-scef-gold mb-4">
            SCEF Branded Merchandise · Advocacy Store
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Wear the Mission. <span className="text-gradient-gold italic">Fund the Movement.</span>
          </h2>
          <p className="text-white/70 text-base md:text-lg">
            Official SCEF branded merchandise for all advocacy services. Every purchase rewards you with
            Afri Gold Coin (AGC) bonuses and directly funds education programs across Africa.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-10">
          {merchandise.map((item) => (
            <div
              key={item.name}
              className="group bg-white rounded-xl overflow-hidden border border-white/10 hover:border-scef-gold/60 transition-all hover:-translate-y-1"
            >
              {/* Image placeholder */}
              <div className="relative aspect-square bg-gradient-to-br from-scef-blue-darker/5 to-scef-gold/10 flex items-center justify-center">
                {item.limited && (
                  <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-scef-gold text-scef-blue-darker text-[10px] font-bold">
                    <Sparkles className="w-2.5 h-2.5" /> Limited
                  </span>
                )}
                <div className="text-center px-3">
                  <div className="w-14 h-14 mx-auto rounded-full bg-scef-blue-darker flex items-center justify-center mb-2">
                    <span className="font-display text-scef-gold font-bold text-xs">NESA</span>
                  </div>
                  <p className="text-[10px] text-scef-blue-darker/60 font-semibold uppercase tracking-wider">
                    SCEF Branded
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="p-3 md:p-4">
                <h3 className="font-display text-sm md:text-base font-semibold text-scef-blue-darker mb-2 line-clamp-1">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-scef-blue-darker text-lg">{item.price}</span>
                  <button className="px-3 py-1 bg-scef-gold hover:bg-scef-gold-hover text-scef-blue-darker text-xs font-semibold rounded-md transition-colors">
                    Add
                  </button>
                </div>
                <p className="text-[11px] text-scef-gold-dark font-medium">{item.agc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-scef-gold hover:bg-scef-gold-hover text-scef-blue-darker">
              <Link to="/store">
                <ShoppingBag className="w-4 h-4 mr-2" /> Visit SCEF Store
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
              <Link to="/wallet">
                Earn with AGC <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          <p className="text-white/50 text-xs mt-4 italic">
            Proceeds support SCEF advocacy, NESA-Africa, EduAid-Africa, and Rebuild My School Africa.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ScefBrandedMerchandise;
