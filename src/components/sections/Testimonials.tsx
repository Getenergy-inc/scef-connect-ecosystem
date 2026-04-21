import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "SCEF's EduAid scholarship changed the trajectory of my life. I'm now the first university graduate in my family.",
    name: "Amara Okonkwo",
    role: "EduAid Beneficiary, Nigeria",
  },
  {
    quote: "Partnering with SCEF gave our school the infrastructure and recognition we needed to transform our community.",
    name: "Dr. Joseph Mwangi",
    role: "School Principal, Kenya",
  },
  {
    quote: "The NESA-Africa standards system is exactly what our continent needs — measurable, transparent, and inclusive.",
    name: "Fatou Diallo",
    role: "Education Policy Advisor, Senegal",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Voices of Impact
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stories from beneficiaries, partners, and leaders shaping African education.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <Quote className="w-8 h-8 text-scef-gold mb-4" />
              <p className="text-foreground/80 italic leading-relaxed mb-6">
                "{t.quote}"
              </p>
              <div>
                <div className="font-display font-bold text-foreground">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
