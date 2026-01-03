import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Volume2, FileText, Image, Calendar, ExternalLink } from "lucide-react";

// Sample updates data (will be from CMS/database)
const updates = [
  {
    id: 1,
    type: "video",
    title: "NESA-Africa 2025 Nominations Now Open",
    description: "Submit your nominations for the most prestigious education awards in Africa. Regional rotation hosting begins 2027.",
    cta: { text: "Submit Nomination", href: "/programs/nesa-africa" },
    thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
    date: "2025-01-03",
    status: "active",
  },
  {
    id: 2,
    type: "flyer",
    title: "EduAid Scholarship Application",
    description: "Applications for the 2025 scholarship cycle are now open. Don't miss this opportunity to advance your education!",
    cta: { text: "Apply Now", href: "/programs/eduaid-africa" },
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    date: "2025-01-02",
    status: "active",
  },
  {
    id: 3,
    type: "announcement",
    title: "AEPC Certification Program Launch",
    description: "Africa Education & Productivity Certification now available across 10 countries. Get certified today!",
    cta: { text: "Learn More", href: "/certifications" },
    thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
    date: "2025-01-01",
    status: "active",
  },
  {
    id: 4,
    type: "audio",
    title: "It's In Me Radio: Latest Episode",
    description: "Listen to inspiring stories from educators and students transforming their communities across Africa.",
    cta: { text: "Listen Now", href: "/media" },
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800",
    date: "2024-12-30",
    status: "active",
  },
  {
    id: 5,
    type: "video",
    title: "Local Chapter Training Webinar",
    description: "Watch our latest training session for Local Chapter Presidents on governance and compliance.",
    cta: { text: "Watch Now", href: "/governance" },
    thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800",
    date: "2024-12-28",
    status: "archived",
  },
];

const typeIcons = {
  video: Play,
  audio: Volume2,
  announcement: FileText,
  flyer: Image,
};

const typeColors = {
  video: "bg-scef-gold text-scef-blue-dark",
  audio: "bg-primary text-primary-foreground",
  announcement: "bg-primary text-primary-foreground",
  flyer: "bg-scef-gold text-scef-blue-dark",
};

const Updates = () => {
  return (
    <>
      <Helmet>
        <title>Updates | SCEF - Santos Creations Educational Foundation</title>
        <meta name="description" content="Latest updates, announcements, and news from SCEF - scholarships, programs, events, and more." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        
        {/* Spacer for fixed header */}
        <div className="h-[88px] md:h-[96px]" />

        <main className="py-12">
          <div className="container mx-auto px-4">
            {/* Back Link */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            {/* Page Header */}
            <div className="mb-12">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Education Updates
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Stay informed with the latest announcements, opportunities, and news from SCEF and our programs across Africa.
              </p>
            </div>

            {/* Updates Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {updates.map((update) => {
                const TypeIcon = typeIcons[update.type as keyof typeof typeIcons];
                const typeColor = typeColors[update.type as keyof typeof typeColors];

                return (
                  <div
                    key={update.id}
                    className="bg-card rounded-2xl overflow-hidden border-2 border-black hover:shadow-xl transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative aspect-video">
                      <img
                        src={update.thumbnail}
                        alt={update.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Type Badge */}
                      <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full ${typeColor} text-xs font-bold flex items-center gap-1.5 border border-black`}>
                        <TypeIcon className="w-3 h-3" />
                        {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
                      </div>

                      {/* Play button for video */}
                      {update.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-scef-gold flex items-center justify-center shadow-lg border-2 border-black">
                            <Play className="w-5 h-5 text-scef-blue-dark ml-0.5" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {/* Date */}
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(update.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>

                      <h2 className="font-display text-lg font-bold text-foreground mb-2">
                        {update.title}
                      </h2>
                      <p className="text-sm text-muted-foreground mb-4">
                        {update.description}
                      </p>

                      <Button
                        size="sm"
                        className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-dark font-semibold border border-black"
                        asChild
                      >
                        <Link to={update.cta.href}>
                          {update.cta.text}
                          <ExternalLink className="w-3 h-3 ml-1.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Updates;
