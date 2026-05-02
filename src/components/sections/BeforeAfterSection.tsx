import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import beforeAfterImg from "@/assets/rmsa/school-before-after.jpg";
import partnerImg from "@/assets/rmsa/community-partner.jpg";

/**
 * Visual proof of RMSA's impact — real "before & after" school transformation
 * paired with a community partnership moment.
 */
export const BeforeAfterSection = () => {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0B5D3B]">
            <Sparkles className="h-3.5 w-3.5" /> Real transformations
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-scef-blue-darker md:text-4xl">
            From forgotten walls to thriving classrooms
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Every rebuild is documented and verified — so members, voters and
            partners can see exactly how their support reshapes a school.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm lg:col-span-3">
            <div className="relative aspect-square sm:aspect-[4/5] md:aspect-[1/1]">
              <img
                src={beforeAfterImg}
                alt="Before and after photos of a rebuilt rural African school"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="border-t border-border p-5">
              <h3 className="font-display text-lg font-semibold text-scef-blue-darker">
                A community school, fully rebuilt
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Walls restored, roof replaced, learning shelters added — funded
                through verified RMSA donor pledges and AGC voter support.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
              <div className="relative aspect-[4/3]">
                <img
                  src={partnerImg}
                  alt="Volunteer partner with a young learner during a school supply distribution"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="border-t border-border p-5">
                <h3 className="font-display text-lg font-semibold text-scef-blue-darker">
                  Partners on the ground
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Local chapters, ambassadors and partner organisations carry
                  out every rebuild and supply distribution.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#0B5D3B]/15 bg-gradient-to-br from-[#0B5D3B]/5 to-scef-gold/5 p-6">
              <h3 className="font-display text-lg font-semibold text-scef-blue-darker">
                Want to see your school next?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Nominate a school today — community-verified and member-funded.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild size="sm" className="bg-[#0B5D3B] text-white hover:bg-[#0E7549]">
                  <Link to="/programs/rebuild-my-school-africa">
                    Nominate a School <ArrowRight className="ms-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="border-scef-gold text-scef-gold-dark hover:bg-scef-gold/10">
                  <Link to="/partner-with-us">Partner with us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
