import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  Users, 
  Globe, 
  Video, 
  BookOpen, 
  Briefcase, 
  Heart, 
  Lightbulb, 
  Palette,
  GraduationCap,
  ArrowRight,
  Play,
  ExternalLink,
  Radio
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EventCountdown } from "@/components/ui/event-countdown";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Brand colors for EduAid
const eduaidColors = {
  primary: "#2E7D32", // Green
  primaryLight: "#4CAF50",
  primaryDark: "#1B5E20",
  gold: "#C4A052",
  dark: "#1A1A1A",
  darkAlt: "#252525",
  text: "#FFFFFF",
  textMuted: "#B0B0B0",
};

// Webinar themes aligned with NESA-Africa 2025 programme
const webinarThemes = [
  {
    id: "sdg4",
    theme: "Education for All & SDG 4",
    icon: Globe,
    description: "Understanding the global framework for quality education and Africa's progress toward sustainable development goals.",
    sessions: 4,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    id: "csr",
    theme: "CSR & Private Sector Education Impact",
    icon: Briefcase,
    description: "How corporations and businesses are driving educational outcomes through strategic investments and partnerships.",
    sessions: 4,
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    id: "ngo",
    theme: "NGOs & Community-Driven Education",
    icon: Heart,
    description: "Grassroots movements and civil society organizations transforming education at the community level.",
    sessions: 4,
    color: "bg-rose-500/10 text-rose-600",
  },
  {
    id: "stem",
    theme: "STEM & Innovation",
    icon: Lightbulb,
    description: "Advancing science, technology, engineering, and mathematics education across the continent.",
    sessions: 4,
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    id: "arts",
    theme: "Creative Arts & Education",
    icon: Palette,
    description: "The role of arts, culture, and creative industries in holistic educational development.",
    sessions: 3,
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    id: "inclusion",
    theme: "Inclusion, Disability & Special Needs",
    icon: Users,
    description: "Building accessible and inclusive educational systems for learners with disabilities and special needs.",
    sessions: 3,
    color: "bg-teal-500/10 text-teal-600",
  },
];

// Upcoming webinar sessions schedule
const upcomingSessions = [
  {
    id: 1,
    title: "Launch Session: Introduction to NESA-Africa Standards",
    theme: "Education for All & SDG 4",
    date: new Date("2025-10-14T14:00:00"),
    duration: "90 minutes",
    speakers: ["SCEF Leadership", "NESA Research Corps"],
    status: "upcoming",
    registrationOpen: true,
  },
  {
    id: 2,
    title: "CSR in Education: Building Sustainable Partnerships",
    theme: "CSR & Private Sector Education Impact",
    date: new Date("2025-10-28T14:00:00"),
    duration: "90 minutes",
    speakers: ["Industry Leaders Panel"],
    status: "upcoming",
    registrationOpen: true,
  },
  {
    id: 3,
    title: "Grassroots Impact: NGO Success Stories",
    theme: "NGOs & Community-Driven Education",
    date: new Date("2025-11-11T14:00:00"),
    duration: "90 minutes",
    speakers: ["NGO Directors", "Community Leaders"],
    status: "upcoming",
    registrationOpen: true,
  },
  {
    id: 4,
    title: "STEM for Africa: Innovation in the Classroom",
    theme: "STEM & Innovation",
    date: new Date("2025-11-25T14:00:00"),
    duration: "90 minutes",
    speakers: ["STEM Educators", "Tech Innovators"],
    status: "upcoming",
    registrationOpen: true,
  },
  {
    id: 5,
    title: "Understanding Platinum Certificate Standards",
    theme: "Education for All & SDG 4",
    date: new Date("2025-12-09T14:00:00"),
    duration: "90 minutes",
    speakers: ["NESA Verification Team"],
    status: "upcoming",
    registrationOpen: false,
  },
  {
    id: 6,
    title: "Inclusive Education: Policies and Practice",
    theme: "Inclusion, Disability & Special Needs",
    date: new Date("2025-12-23T14:00:00"),
    duration: "90 minutes",
    speakers: ["Special Needs Experts"],
    status: "upcoming",
    registrationOpen: false,
  },
];

// Series info
const seriesInfo = {
  startDate: "14 October 2025",
  endDate: "June 2026",
  frequency: "2–4 webinars monthly",
  format: "Live + On-Demand",
  platform: "EduAid-Africa",
};

const EduAidWebinars = () => {
  const launchDate = new Date("2025-10-14T14:00:00");

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>EduAid Webinar Series | SCEF</title>
        <meta 
          name="description" 
          content="Join the EduAid-Africa Webinar Series — the official public education framework for NESA-Africa 2025. Sessions on SDG 4, CSR, STEM, inclusion, and more." 
        />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section 
        className="relative py-20 md:py-28"
        style={{ background: `linear-gradient(135deg, ${eduaidColors.primaryDark} 0%, ${eduaidColors.dark} 100%)` }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(46, 125, 50, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(196, 160, 82, 0.2) 0%, transparent 50%)'
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ backgroundColor: `${eduaidColors.gold}20`, color: eduaidColors.gold }}
            >
              <Radio className="w-4 h-4" />
              Phase 1 — Public Education & Awareness
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              EduAid-Africa{" "}
              <span style={{ color: eduaidColors.gold }}>Webinar Series</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-4 max-w-2xl mx-auto">
              The official public education and engagement framework for NESA-Africa 2025
            </p>

            <p style={{ color: eduaidColors.gold }} className="text-lg font-medium mb-8">
              📅 {seriesInfo.startDate} – {seriesInfo.endDate}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button 
                size="lg" 
                className="gap-2"
                style={{ backgroundColor: eduaidColors.gold, color: eduaidColors.dark }}
              >
                <Play className="w-4 h-4" />
                Register for Launch Session
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2 border-white/30 text-white hover:bg-white/10"
              >
                <Calendar className="w-4 h-4" />
                View Full Schedule
              </Button>
            </div>

            {/* Series Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { label: "Core Themes", value: "6" },
                { label: "Webinars Monthly", value: "2–4" },
                { label: "Duration", value: "9 Months" },
                { label: "Format", value: "Live + Archive" },
              ].map((stat) => (
                <div 
                  key={stat.label}
                  className="p-4 rounded-xl"
                  style={{ backgroundColor: `${eduaidColors.dark}80`, border: `1px solid ${eduaidColors.gold}30` }}
                >
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm" style={{ color: eduaidColors.textMuted }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <EventCountdown
              targetDate={launchDate}
              eventName="Series Launch: 14 October 2025"
              eventType="show"
            />
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Purpose of the Webinar Series
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              The EduAid-Africa Webinar Series serves as the official public education framework for NESA-Africa — 
              not campaign promotion. It is designed to educate, inform, and prepare stakeholders for meaningful participation.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: BookOpen, text: "Educate stakeholders on education challenges & solutions" },
                { icon: GraduationCap, text: "Explain NESA-Africa standards, categories, and rules" },
                { icon: Users, text: "Prepare the public for nominations and voting" },
                { icon: Globe, text: "Build informed, meaningful participation" },
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm text-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Themes Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Core Webinar Themes
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each theme explores critical aspects of African education through expert-led sessions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {webinarThemes.map((theme) => (
              <Card key={theme.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${theme.color} flex items-center justify-center mb-3`}>
                    <theme.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">{theme.theme}</CardTitle>
                  <CardDescription>{theme.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{theme.sessions} Sessions</Badge>
                    <Button variant="ghost" size="sm" className="gap-1">
                      Learn More <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Sessions Schedule */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Upcoming Sessions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Register for upcoming webinars and join the conversation
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {upcomingSessions.map((session) => (
              <div 
                key={session.id}
                className="flex flex-col md:flex-row md:items-center gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-primary">
                      {session.date.getDate()}
                    </span>
                    <span className="text-xs text-primary uppercase">
                      {session.date.toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                  </div>
                </div>

                <div className="flex-grow">
                  <h3 className="font-semibold text-foreground mb-1">{session.title}</h3>
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {session.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} WAT
                    </span>
                    <span className="text-border">•</span>
                    <span>{session.duration}</span>
                    <span className="text-border">•</span>
                    <span className="text-primary">{session.theme}</span>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {session.registrationOpen ? (
                    <Button className="gap-2">
                      <Video className="w-4 h-4" />
                      Register
                    </Button>
                  ) : (
                    <Button variant="outline" disabled>
                      Coming Soon
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" className="gap-2">
              View Full 2025–2026 Schedule
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Registration CTA Section */}
      <section 
        className="py-20"
        style={{ background: `linear-gradient(135deg, ${eduaidColors.primaryDark} 0%, ${eduaidColors.dark} 100%)` }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
              Join the EduAid-Africa Webinar Series
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Be part of the most comprehensive public education initiative for African education standards. 
              Register for free and receive updates on all upcoming sessions.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="gap-2"
                style={{ backgroundColor: eduaidColors.gold, color: eduaidColors.dark }}
              >
                Register for All Sessions
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2 border-white/30 text-white hover:bg-white/10"
                asChild
              >
                <a href="https://eduaid.africa" target="_blank" rel="noopener noreferrer">
                  Visit EduAid-Africa
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>

            <p className="mt-8 text-sm text-white/60">
              All webinars are recorded and archived for on-demand access via the EduAid-Africa platform.
            </p>
          </div>
        </div>
      </section>

      {/* Connection to NESA-Africa */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Part of the NESA-Africa 2025 Programme
            </h2>
            <p className="text-muted-foreground mb-8">
              The webinar series is Phase 1 of the NESA-Africa 2025 awards cycle, preparing stakeholders 
              for nominations, voting, and meaningful participation.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" asChild>
                <Link to="/programs/nesa-africa" className="gap-2">
                  <GraduationCap className="w-4 h-4" />
                  View NESA-Africa Programme
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/programs/eduaid-africa" className="gap-2">
                  <Heart className="w-4 h-4" />
                  About EduAid-Africa
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EduAidWebinars;
