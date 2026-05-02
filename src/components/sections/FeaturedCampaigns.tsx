import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Heart, Vote, ArrowRight } from "lucide-react";
import suppliesImg from "@/assets/rmsa/school-supplies-distribution.jpg";
import signLanguageImg from "@/assets/rmsa/sign-language-girls.jpg";
import wheelchairImg from "@/assets/rmsa/wheelchair-classroom.jpg";
import brailleWritingImg from "@/assets/rmsa/braille-writing.jpg";
import vocationalImg from "@/assets/rmsa/vocational-training.jpg";
import earlyLearningImg from "@/assets/rmsa/early-learning-art.jpg";

const campaigns = [
  {
    image: suppliesImg,
    name: "Hope Primary School",
    country: "Nigeria",
    category: "General",
    progress: 0,
  },
  {
    image: signLanguageImg,
    name: "Sunrise Deaf Academy",
    country: "Kenya",
    category: "Special Needs",
    progress: 0,
  },
  {
    image: wheelchairImg,
    name: "Ubuntu Inclusive School",
    country: "Rwanda",
    category: "Inclusive",
    progress: 0,
  },
  {
    image: brailleWritingImg,
    name: "Light of Hope Braille Center",
    country: "Ghana",
    category: "Special Needs",
    progress: 0,
  },
  {
    image: vocationalImg,
    name: "Wakisa Skills Academy",
    country: "Uganda",
    category: "Vocational",
    progress: 0,
  },
  {
    image: earlyLearningImg,
    name: "Little Scholars Early Learning",
    country: "Côte d'Ivoire",
    category: "Early Years",
    progress: 0,
  },
];

export const FeaturedCampaigns = () => {
  return (
    <section className="bg-[hsl(45_25%_97%)] py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0B5D3B]">
              Featured campaigns
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-scef-blue-darker md:text-4xl">
              Schools waiting to be transformed
            </h2>
          </div>
          <Button asChild variant="outline" className="border-[#0B5D3B] text-[#0B5D3B] hover:bg-[#0B5D3B] hover:text-white">
            <Link to="/programs/rebuild-my-school-africa">
              View all campaigns <ArrowRight className="ms-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((c) => (
            <article
              key={c.name}
              className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent" />
                <span
                  className={`absolute left-3 top-3 inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                    c.category === "Special Needs" || c.category === "Vocational" || c.category === "Early Years"
                      ? "bg-scef-gold text-[#0A0A0A]"
                      : "bg-[#0B5D3B] text-white"
                  }`}
                >
                  {c.category}
                </span>
                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs text-white/90">
                  <MapPin className="h-3 w-3" /> {c.country}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-scef-blue-darker">
                  {c.name}
                </h3>

                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>Funding progress</span>
                    <span className="font-medium">Reporting in progress</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#0B5D3B] to-scef-gold transition-all"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between pt-1 text-[11px] text-muted-foreground">
                    <span>AGC votes</span>
                    <span className="font-medium">Reporting in progress</span>
                  </div>
                </div>

                <div className="mt-5 flex gap-2">
                  <Button asChild size="sm" className="flex-1 bg-[#0B5D3B] text-white hover:bg-[#0E7549]">
                    <Link to="/donate">
                      <Heart className="me-1.5 h-3.5 w-3.5" /> Donate
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="flex-1 border-scef-gold text-scef-gold-dark hover:bg-scef-gold/10">
                    <Link to="/vote">
                      <Vote className="me-1.5 h-3.5 w-3.5" /> Vote
                    </Link>
                  </Button>
                </div>
                <Link
                  to="/programs/rebuild-my-school-africa"
                  className="mt-3 inline-flex w-full items-center justify-center text-xs font-medium text-muted-foreground hover:text-[#0B5D3B]"
                >
                  View details <ArrowRight className="ms-1 h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
