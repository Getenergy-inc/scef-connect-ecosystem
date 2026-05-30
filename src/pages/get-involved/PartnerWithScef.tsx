import { Link } from "react-router-dom";
import { PageShell } from "@/components/layout/PageShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  GraduationCap, School, Hammer, BookOpen, Award, Users, Heart, Globe,
  Building2, Megaphone, Leaf, Stethoscope, HandHeart, Radio, Laptop,
  ArrowRight, MessageCircle, FileText, CreditCard,
} from "lucide-react";
import { SOPHIA_PAYMENT_WHATSAPP } from "@/config/officialAccounts";

const SOPHIA_PARTNER_WHATSAPP =
  "https://wa.me/2348109765897?text=Hello%20Sophia%2C%20I%20want%20to%20partner%20with%20SCEF";

const partnershipAreas = [
  { icon: GraduationCap, title: "Scholarships & Education Access" },
  { icon: School, title: "Send a Child to School" },
  { icon: Hammer, title: "Rebuild My School Africa" },
  { icon: BookOpen, title: "EduAid-Africa Programs" },
  { icon: Award, title: "NESA-Africa Sponsorship & Recognition" },
  { icon: Users, title: "Teacher Training & Development" },
  { icon: Heart, title: "Girls & Women Education Support" },
  { icon: BookOpen, title: "eLibrary Africa / Nigeria" },
  { icon: Laptop, title: "Digital Learning & EdTech" },
  { icon: Globe, title: "Local Chapter Support" },
  { icon: Building2, title: "CSR Education Fund Management" },
  { icon: Stethoscope, title: "Health Education Advocacy" },
  { icon: Leaf, title: "ESG & Sustainability Programs" },
  { icon: HandHeart, title: "Volunteer & Internship Support" },
  { icon: Radio, title: "Media & Advocacy Partnerships" },
];

const steps = [
  { n: "1", title: "Express Interest", body: "Submit your partnership interest through the website or contact our team." },
  { n: "2", title: "Select Partnership Area", body: "Choose the program, campaign, service, or impact area you want to support." },
  { n: "3", title: "Partnership Review", body: "SCEF reviews the proposed partnership to ensure alignment with our mission, values, and education impact goals." },
  { n: "4", title: "Documentation", body: "We may provide a partnership profile, proposal, sponsorship letter, CSR document, MoU, or collaboration agreement." },
  { n: "5", title: "Implementation & Reporting", body: "We implement together and provide updates, receipts, documentation, visibility, and impact reports." },
];

const PartnerWithScef = () => {
  return (
    <PageShell
      title="Partner with SCEF"
      description="Collaborate with Santos Creations Educational Foundation to advance education, scholarships, school transformation, digital learning, teacher training, advocacy, sustainability, and community impact across Africa and the diaspora."
      eyebrow="Get Involved"
      heading="Partner with SCEF"
      intro="Collaborate with Santos Creations Educational Foundation to advance education, scholarships, school transformation, digital learning, teacher training, advocacy, sustainability, and community impact across Africa and the diaspora."
    >
      {/* Intro */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
          <p>
            Santos Creations Educational Foundation welcomes strategic partnerships with organizations and
            individuals committed to improving education and social impact across Africa.
          </p>
          <p>
            We work with partners across scholarships, school support, Rebuild My School Africa, EduAid-Africa,
            NESA-Africa, teacher training, girls' education, digital learning, local chapter development,
            CSR education funds, advocacy campaigns, and sustainability programs.
          </p>
          <p>
            Partnerships may include sponsorship, CSR support, grant collaboration, education project funding,
            media partnership, technical support, volunteering, institutional collaboration, or community-based
            implementation.
          </p>
        </div>
      </section>

      {/* Procedure */}
      <section className="py-12 md:py-16 bg-muted/40 border-y border-scef-blue/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-scef-blue-darker mb-8">
            How to Partner with SCEF
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((s) => (
              <Card key={s.n}>
                <CardHeader>
                  <div className="w-10 h-10 rounded-full bg-scef-gold/15 text-scef-gold flex items-center justify-center font-bold">
                    {s.n}
                  </div>
                  <CardTitle className="text-lg mt-2">{s.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership areas */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-scef-blue-darker mb-8">
            Partnership Areas
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {partnershipAreas.map(({ icon: Icon, title }) => (
              <div
                key={title}
                className="flex items-start gap-3 rounded-xl border border-border bg-white p-4 hover:border-scef-gold/60 hover:shadow-sm transition"
              >
                <div className="w-10 h-10 shrink-0 rounded-lg bg-scef-blue/10 text-scef-blue-darker flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-sm font-semibold text-foreground leading-snug pt-1.5">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation / payment guidance */}
      <section className="py-12 md:py-16 bg-scef-pattern border-y border-scef-blue/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-scef-blue-darker mb-4">
            Donations and Partnership Payments
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            All donations, sponsorships, membership payments, scholarship support, CSR contributions, and
            partnership payments should be made only through our official verified payment channels.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Payment options currently include <strong>Providus Bank Direct Transfer</strong> and{" "}
            <strong>GFA Wallet</strong>.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/support-us/official-accounts">
                <CreditCard className="w-4 h-4 mr-2" /> View Official Accounts
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/donate">Donate Now</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/partner-with-us">
                <FileText className="w-4 h-4 mr-2" /> Request Partnership Information
              </Link>
            </Button>
            <Button asChild variant="outline">
              <a href={SOPHIA_PARTNER_WHATSAPP} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" /> Chat with Sophia
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16 md:py-20 bg-scef-blue-darker text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Partner with SCEF?
          </h2>
          <p className="text-white/80 leading-relaxed mb-8">
            Whether you are a donor, corporate organization, NGO, school, foundation, government agency,
            diaspora group, or development partner, we welcome collaboration that creates measurable
            education impact.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-scef-gold text-scef-blue-darker hover:bg-scef-gold/90">
              <Link to="/partner-with-us">
                Partner with SCEF <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Link to="/partner-with-us">Request Partnership Profile</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Link to="/support-us/official-accounts">View Official Donation Channels</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <a href={SOPHIA_PARTNER_WHATSAPP} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" /> Chat with Sophia
              </a>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default PartnerWithScef;
