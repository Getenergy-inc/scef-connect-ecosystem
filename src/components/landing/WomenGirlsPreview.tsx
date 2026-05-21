import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import img from "@/assets/digital-board/women-girls-education-flyer.jpg";

export const WomenGirlsPreview = () => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl shadow-xl">
            <img
              src={img}
              alt="Girls and young women learning together in an African classroom"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-scef-gold">
              Pan-African Pillar
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-4xl">
              Empowering Women and Girls Through Education
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              SCEF supports girls and women through education access,
              leadership development, STEM and digital inclusion, safeguarding,
              mentorship, wellbeing, ESG advocacy, and economic opportunity.
            </p>
            <Button asChild size="lg" className="mt-6 bg-scef-gold text-scef-blue-darker hover:bg-scef-gold-hover">
              <Link to="/women-girls-empowerment">
                Explore Women &amp; Girls Empowerment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WomenGirlsPreview;
