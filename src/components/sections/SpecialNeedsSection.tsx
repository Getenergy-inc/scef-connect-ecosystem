import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, Ear, Brain, Wrench, Users, ShieldCheck, ArrowRight } from "lucide-react";
import brailleImg from "@/assets/rmsa/braille-learning.jpg";
import signLanguageImg from "@/assets/rmsa/sign-language-girls.jpg";
import earlyLearningImg from "@/assets/rmsa/early-learning-art.jpg";
import vocationalImg from "@/assets/rmsa/vocational-training.jpg";
import wheelchairImg from "@/assets/rmsa/wheelchair-classroom.jpg";

const categories = [
  {
    icon: Eye,
    title: "Schools for the Blind",
    desc: "Braille classrooms, tactile learning resources, and assistive tech for visually-impaired learners.",
    accent: "from-[#0B5D3B] to-[#0E7549]",
    image: brailleImg,
    alt: "Teacher guiding a visually-impaired student through braille reading",
  },
  {
    icon: Ear,
    title: "Schools for the Deaf",
    desc: "Sign-language instruction, hearing aids and inclusive curriculum design.",
    accent: "from-[#0E7549] to-[#0B5D3B]",
    image: signLanguageImg,
    alt: "Two students using sign language in a classroom",
  },
  {
    icon: Brain,
    title: "Autism & Early Learning",
    desc: "Sensory-friendly spaces, individualized learning plans and trained therapists.",
    accent: "from-[#0B5D3B] to-[#083D27]",
    image: earlyLearningImg,
    alt: "Teacher supporting young learners during a creative art session",
  },
  {
    icon: Wrench,
    title: "Vocational Training",
    desc: "Skills-based learning pathways for learners with disabilities transitioning to work.",
    accent: "from-[#083D27] to-[#0B5D3B]",
    image: vocationalImg,
    alt: "Young women in workshop coveralls learning vocational skills together",
  },
  {
    icon: Users,
    title: "Inclusive Schools",
    desc: "Mainstream schools adapting facilities and pedagogy for full inclusion.",
    accent: "from-[#0E7549] to-[#083D27]",
    image: wheelchairImg,
    alt: "Student in a wheelchair learning alongside classmates in an inclusive classroom",
  },
];

export const SpecialNeedsSection = () => {
  return (
    <section className="bg-[#0A0A0A] py-20 text-white md:py-24">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold">
            Special Needs Schools Initiative
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            Inclusion is non-negotiable
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            Through Rebuild My School Africa, we prioritize learning
            environments for the most under-served — children with
            disabilities and special learning needs across the continent.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ icon: Icon, title, desc, accent, image, alt }) => (
            <article
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-scef-gold/50 hover:bg-white/[0.06]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={image}
                  alt={alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`}
                />
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-scef-gold/40 bg-[#0A0A0A]/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-scef-gold backdrop-blur-sm">
                  <ShieldCheck className="h-3 w-3" /> Verified
                </span>
                <div
                  className={`absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-white shadow-lg`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-white">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {desc}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="h-12 bg-scef-gold px-7 font-semibold text-[#0A0A0A] hover:bg-scef-gold-hover"
          >
            <Link to="/programs/special-needs-education">
              Nominate &amp; Support a Special Needs School
              <ArrowRight className="ms-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
