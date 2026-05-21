import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users, Target, Eye, Award, HandCoins, Globe, MapPin, Megaphone,
  GraduationCap, Heart, BookOpen, School, Sparkles, ArrowRight,
  Building2, Shield, Plane,
} from "lucide-react";

import heroImg from "@/assets/hero-classroom.jpg";
import chaptersImg from "@/assets/hero-chapters.jpg";
import schoolgirlImg from "@/assets/hero-schoolgirl.jpg";
import nesaImg from "@/assets/nesa-africa-recognition.png";
import eduaidImg from "@/assets/eduaid-africa-logo.jpg";
import diasporaImg from "@/assets/history/history-2002-2025-global.jpg";

const identityItems = [
  { icon: Users, label: "A membership-based NGO" },
  { icon: Globe, label: "A Pan-African education advocacy platform" },
  { icon: MapPin, label: "A local chapter-driven movement" },
  { icon: Plane, label: "A diaspora and Friends of Africa engagement network" },
  { icon: Award, label: "A recognition-to-impact ecosystem" },
  { icon: School, label: "A community project and education-support organization" },
];

const whatWeDo = [
  { icon: Megaphone, label: "Education advocacy and awareness" },
  { icon: Users, label: "Membership and local chapter development" },
  { icon: GraduationCap, label: "Scholarships and learner support" },
  { icon: School, label: "School support and adoption" },
  { icon: BookOpen, label: "Teacher training and capacity development" },
  { icon: Sparkles, label: "Digital learning and eLibrary access" },
  { icon: Target, label: "Career guidance through My Career, My Life" },
  { icon: Heart, label: "Girls and women education empowerment" },
  { icon: HandCoins, label: "Volunteer and ambassador programs" },
  { icon: Plane, label: "Diaspora Africa engagement" },
  { icon: Globe, label: "Friends of Africa partnerships" },
  { icon: Award, label: "Monthly webinars, campaigns, and training programs" },
];

const governanceLinks = [
  { label: "Board of Trustees (BOT)", href: "/governance#bot" },
  { label: "Board of Advisors (BOA)", href: "/governance#boa" },
  { label: "Board of Directors (BOD)", href: "/governance#bod" },
  { label: "Local Chapter Presidents (LCPs)", href: "/governance#lcps" },
  { label: "Management Team", href: "/governance#management" },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About SCEF — Membership-Based Pan-African Education NGO</title>
        <meta
          name="description"
          content="Santos Creations Educational Foundation (SCEF) is a membership-based Pan-African NGO advocating for the achievement of Education for All in Africa."
        />
        <link rel="canonical" href="/about" />
      </Helmet>
      <Header />

      <main className="min-h-screen bg-background">
        {/* 1. HERO */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0">
            <img src={heroImg} alt="African learners in classroom" className="h-full w-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-scef-blue-darker/90 via-scef-blue-darker/80 to-scef-blue-darker/40" />
          </div>
          <div className="relative container mx-auto max-w-6xl px-6 py-20 md:py-28 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-scef-gold">
              About SCEF
            </p>
            <h1 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight max-w-4xl">
              About Santos Creations Educational Foundation
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl">
              SCEF is a membership-based Pan-African NGO with the vision of advocating
              for the achievement of Education for All in Africa.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-white/80 max-w-3xl">
              SCEF connects members, volunteers, ambassadors, local chapters, diaspora
              supporters, donors, sponsors, institutions, and community partners to
              advance education access, recognition, school transformation, teacher
              development, digital learning, and sustainable education impact across Africa.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-scef-gold hover:bg-scef-gold/90 text-scef-blue-darker font-semibold">
                <Link to="/membership">Become a Member <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/40 text-white hover:bg-white/20 hover:text-white">
                <Link to="/get-involved">Get Involved</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* 2. WHO WE ARE */}
        <section className="container mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Who We Are</p>
              <h2 className="mt-3 font-display text-2xl md:text-[32px] font-bold tracking-tight text-scef-blue-darker">
                A Pan-African education advocacy and impact organization built on membership and partnership
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-foreground/80">
                <p>
                  SCEF is a Pan-African education advocacy and impact organization built on
                  membership, community action, and partnership.
                </p>
                <p>
                  We bring together individuals and institutions who believe that every
                  African child, learner, teacher, school, and community deserves access to
                  quality education and meaningful opportunities.
                </p>
                <p>
                  Through our members, local chapters, ambassadors, volunteers, and partners,
                  SCEF supports education advocacy, scholarships, school support, teacher
                  development, digital learning, girls and women education, career guidance,
                  and community-led education projects.
                </p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-border shadow-sm">
              <img src={schoolgirlImg} alt="African schoolgirl learning" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </section>

        {/* 3 & 4. VISION + MISSION */}
        <section className="bg-muted/30 border-y">
          <div className="container mx-auto max-w-6xl px-6 py-16 md:py-20 grid md:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardContent className="p-7 md:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-scef-gold/15 text-scef-blue-darker">
                    <Eye className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-xl font-bold text-scef-blue-darker">Our Vision</h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-foreground/80">
                  To advocate for the achievement of Education for All in Africa by building
                  a strong Pan-African membership network that mobilizes people, partnerships,
                  and projects for education impact.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-7 md:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-scef-blue-darker/10 text-scef-blue-darker">
                    <Target className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-xl font-bold text-scef-blue-darker">Our Mission</h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-foreground/80">
                  To connect members, volunteers, ambassadors, local chapters, diaspora
                  supporters, donors, sponsors, and institutional partners to support
                  education access, recognition, school transformation, teacher development,
                  digital learning, and community-led education projects across Africa.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 5. OUR IDENTITY */}
        <section className="container mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Our Identity</p>
            <h2 className="mt-3 font-display text-2xl md:text-[32px] font-bold tracking-tight text-scef-blue-darker">
              SCEF is many things at once — all anchored in membership
            </h2>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {identityItems.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-start gap-3 rounded-xl border border-border bg-white p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-scef-blue-darker/5 text-scef-blue-darker ring-1 ring-scef-blue-darker/10">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="text-[14.5px] font-medium text-foreground">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. RECOGNITION-TO-IMPACT MODEL */}
        <section className="bg-scef-blue-darker text-white">
          <div className="container mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-scef-gold">
                Our Recognition-to-Impact Model
              </p>
              <h2 className="mt-3 font-display text-2xl md:text-[32px] font-bold tracking-tight">
                Recognition creates visibility. Visibility unlocks impact.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-white/85">
                SCEF believes that recognition can create visibility, and visibility can
                unlock real support for education.
              </p>
            </div>

            <div className="mt-10 grid md:grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden border border-white/15 bg-white/[0.04]">
                <img src={nesaImg} alt="NESA-Africa recognition" className="h-44 w-full object-cover" loading="lazy" />
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-scef-gold">NESA-Africa — Recognition</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/85">
                    Celebrates educators, schools, leaders, and organizations contributing
                    to education excellence across Africa.
                  </p>
                  <Link to="/programs/nesa-africa" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-scef-gold hover:underline">
                    Explore NESA-Africa <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-white/15 bg-white/[0.04]">
                <img src={eduaidImg} alt="EduAid-Africa impact" className="h-44 w-full object-cover" loading="lazy" />
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-scef-gold">EduAid-Africa — Impact</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/85">
                    Turns visibility into scholarships, school support, teacher training,
                    digital learning, girls education, school adoption, and community-based
                    education projects.
                  </p>
                  <Link to="/programs/eduaid-africa" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-scef-gold hover:underline">
                    Explore EduAid-Africa <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            <p className="mt-8 text-center text-[15px] font-medium text-white/90">
              NESA-Africa creates recognition. EduAid-Africa creates impact. Together, they
              power SCEF's recognition-to-impact model.
            </p>
          </div>
        </section>

        {/* 7. WHAT WE DO */}
        <section className="container mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">What We Do</p>
            <h2 className="mt-3 font-display text-2xl md:text-[32px] font-bold tracking-tight text-scef-blue-darker">
              How SCEF advances Education for All in Africa
            </h2>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whatWeDo.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-start gap-3 rounded-xl border border-border bg-white p-5 hover:shadow-sm transition-shadow">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-scef-gold/15 text-scef-blue-darker">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <p className="text-[14px] font-medium text-foreground">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. MEMBERSHIP AT THE HEART */}
        <section className="bg-muted/30 border-y">
          <div className="container mx-auto max-w-6xl px-6 py-16 md:py-20 grid md:grid-cols-5 gap-10 items-center">
            <div className="md:col-span-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Membership at the Heart of SCEF</p>
              <h2 className="mt-3 font-display text-2xl md:text-[32px] font-bold tracking-tight text-scef-blue-darker">
                SCEF is powered by people
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-foreground/80">
                Our members are education advocates, teachers, professionals, students,
                parents, entrepreneurs, diaspora supporters, volunteers, and community
                leaders who want to contribute to education progress in Africa.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-foreground/80">
                Members can participate through local chapters, national activities,
                regional campaigns, webinars, school projects, mentorship, sponsorship
                mobilization, and volunteer service.
              </p>
              <div className="mt-6">
                <Button asChild size="lg" className="bg-scef-blue-darker hover:bg-scef-blue-darker/90">
                  <Link to="/membership">Become a Member <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
            <div className="md:col-span-2 rounded-xl overflow-hidden border border-border shadow-sm">
              <img src={chaptersImg} alt="SCEF chapters and members" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </section>

        {/* 9. LOCAL CHAPTERS & AMBASSADORS */}
        <section className="container mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Local Chapters and Ambassadors</p>
            <h2 className="mt-3 font-display text-2xl md:text-[32px] font-bold tracking-tight text-scef-blue-darker">
              Bringing the mission closer to communities
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground/80">
              SCEF local chapters bring our mission closer to communities. People can join
              SCEF in their country, city, school, region, or community as members,
              ambassadors, volunteers, project leaders, mentors, or partners.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground/80">
              Ambassadors help represent SCEF locally, mobilize members, support campaigns,
              connect schools and partners, and promote the vision of Education for All in Africa.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="bg-scef-blue-darker hover:bg-scef-blue-darker/90">
                <Link to="/chapters/signup">Join a Local Chapter</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/ambassador">Apply as an Ambassador</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* 10. DIASPORA & FRIENDS OF AFRICA */}
        <section className="bg-muted/30 border-y">
          <div className="container mx-auto max-w-6xl px-6 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
            <div className="rounded-xl overflow-hidden border border-border shadow-sm order-2 md:order-1">
              <img src={diasporaImg} alt="Diaspora and global education supporters" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="order-1 md:order-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Diaspora Africa & Friends of Africa</p>
              <h2 className="mt-3 font-display text-2xl md:text-[32px] font-bold tracking-tight text-scef-blue-darker">
                Structured pathways for global supporters of African education
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-foreground/80">
                SCEF creates structured pathways for African diaspora supporters and global
                friends of African education to contribute to education development across
                Africa — through donations, mentorship, EduTourism, sponsorship, technical
                support, school adoption, project funding, advocacy, and partnerships.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="bg-scef-blue-darker hover:bg-scef-blue-darker/90">
                  <Link to="/diaspora-africa">Join Diaspora Africa</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/friends-of-africa">Become a Friends of Africa Partner</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* GOVERNANCE LINKS */}
        <section className="container mx-auto max-w-6xl px-6 py-14">
          <div className="rounded-xl border border-border bg-white p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-scef-blue-darker/5 text-scef-blue-darker ring-1 ring-scef-blue-darker/10">
                  <Shield className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Governance</p>
                  <h3 className="font-display text-lg font-bold text-scef-blue-darker">
                    SCEF Governance Structure
                  </h3>
                </div>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/governance">View full governance <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
              </Button>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {governanceLinks.map((g) => (
                <Link
                  key={g.href}
                  to={g.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/30 px-3.5 py-1.5 text-[12.5px] font-medium text-foreground hover:bg-scef-blue-darker hover:text-white transition"
                >
                  <Building2 className="h-3.5 w-3.5" /> {g.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 11. FINAL CTA */}
        <section className="bg-gradient-to-br from-scef-blue-darker to-scef-blue-darker/90 text-white">
          <div className="container mx-auto max-w-5xl px-6 py-16 md:py-20 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-scef-gold">
              Join the Movement
            </p>
            <h2 className="mt-3 font-display text-2xl md:text-[34px] font-bold tracking-tight">
              Join the Movement for Education for All in Africa
            </h2>
            <p className="mt-4 text-[15px] md:text-base leading-relaxed text-white/85 max-w-3xl mx-auto">
              SCEF is more than an organization. It is a Pan-African membership movement
              connecting people, partnerships, and projects to advance education across
              Africa. Whether you want to become a member, volunteer, intern, ambassador,
              donor, sponsor, local chapter leader, diaspora supporter, or Friends of Africa
              partner, there is a place for you in SCEF.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-scef-gold hover:bg-scef-gold/90 text-scef-blue-darker font-semibold">
                <Link to="/membership">Become a Member</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/40 text-white hover:bg-white/20 hover:text-white">
                <Link to="/volunteer">Volunteer With SCEF</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/40 text-white hover:bg-white/20 hover:text-white">
                <Link to="/wallet/donate">Donate Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/40 text-white hover:bg-white/20 hover:text-white">
                <Link to="/sponsorship">Sponsor a Program</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default About;
