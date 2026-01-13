import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ELibrarySearch } from "@/components/elibrary/ELibrarySearch";
import { ProgramVideoSection } from "@/components/programs/ProgramVideoSection";
import { 
  BookOpen, 
  Download, 
  Globe, 
  Search, 
  Users, 
  Smartphone,
  Library,
  FileText,
  Video,
  Headphones,
  GraduationCap,
  ArrowRight,
  Star,
  BookMarked,
  Laptop,
  ExternalLink,
  Upload,
  FolderOpen
} from "lucide-react";

// eLibrary Nigeria Brand Colors matching elibrarynigeria.com.ng
const elibraryColors = {
  primary: "#5cb85c", // Green primary
  primaryDark: "#449d44",
  secondary: "#337ab7", // Blue secondary
  secondaryDark: "#286090",
  white: "#FFFFFF",
  light: "#F8F9FA",
  text: "#333333",
  textMuted: "#6c757d",
};

const ELibraryNigeria = () => {
  const resources = [
    {
      icon: BookOpen,
      title: "Local Content E-Books",
      description: "Nigerian authored books across all subjects and educational levels",
      count: "50,000+"
    },
    {
      icon: FileText,
      title: "International Content",
      description: "Global academic journals and research publications",
      count: "25,000+"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Educational video content for visual learners",
      count: "10,000+"
    },
    {
      icon: Headphones,
      title: "Audio Books",
      description: "Listen and learn with our audio book collection",
      count: "5,000+"
    }
  ];

  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description: "Search anything Nigeria - find exactly what you need in seconds"
    },
    {
      icon: Smartphone,
      title: "Mobile Access",
      description: "Read and learn on any device - phone, tablet, or computer"
    },
    {
      icon: Download,
      title: "Offline Reading",
      description: "Download resources for offline access in low-connectivity areas"
    },
    {
      icon: Globe,
      title: "Multi-Language",
      description: "Resources available in English, Hausa, Yoruba, Igbo, and more"
    },
    {
      icon: Users,
      title: "Study Groups",
      description: "Collaborate with peers through virtual study rooms"
    },
    {
      icon: GraduationCap,
      title: "Exam Prep",
      description: "Dedicated resources for WAEC, JAMB, NECO, and university exams"
    }
  ];

  const categories = [
    "Primary Education",
    "Secondary Education",
    "University Resources",
    "Professional Development",
    "Vocational Training",
    "Teacher Resources",
    "Nigerian Literature",
    "African History"
  ];

  const navLinks = [
    { label: "Setup your e-Library", href: "https://www.elibrarynigeria.com.ng", icon: Library },
    { label: "Browse Categories", href: "https://www.elibrarynigeria.com.ng", icon: FolderOpen },
    { label: "Become Uploader", href: "https://www.elibrarynigeria.com.ng", icon: Upload },
    { label: "Resources", href: "https://www.elibrarynigeria.com.ng", icon: BookOpen },
  ];

  const testimonials = [
    {
      name: "Amaka Okonkwo",
      role: "University Student, Lagos",
      quote: "The eLibrary has been my lifeline for research. I can access journals that would cost hundreds of dollars for free.",
      rating: 5
    },
    {
      name: "Musa Ibrahim",
      role: "Secondary School Teacher, Kano",
      quote: "I use eLibrary resources to enhance my lesson plans. My students' performance has improved significantly.",
      rating: 5
    },
    {
      name: "Blessing Eze",
      role: "JAMB Candidate, Enugu",
      quote: "The exam prep materials helped me score 320 in JAMB. The practice tests are incredibly helpful.",
      rating: 5
    }
  ];

  const stats = [
    { value: "100,000+", label: "Active Users" },
    { value: "90,000+", label: "Digital Resources" },
    { value: "36", label: "States Covered" },
    { value: "Free", label: "Access for Students" }
  ];

  return (
    <>
      <Helmet>
        <title>eLibrary Nigeria – Santos Creations Educational Foundation</title>
        <meta name="description" content="Access free digital educational resources through eLibrary Nigeria. Promoting Nigeria local content e-libraries - streamline your search for local and international content." />
        <meta property="og:title" content="eLibrary Nigeria – SCEF" />
        <meta property="og:description" content="Promoting Nigeria local content e-libraries. Search local and international content e-libraries." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://santoscreations.org/programs/elibrary-nigeria" />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-white">
        {/* Hero Section - Clean white design matching elibrarynigeria.com.ng */}
        <section className="relative py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Quick Nav Links */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-opacity-80"
                    style={{ color: elibraryColors.textMuted }}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </a>
                ))}
              </div>
              
              <h1 className="font-['Abhaya_Libre'] text-4xl md:text-6xl font-bold mb-4" style={{ color: elibraryColors.text }}>
                Welcome to E-Library Nigeria
              </h1>
              
              <p className="text-lg md:text-xl mb-8 italic" style={{ color: elibraryColors.textMuted }}>
                promoting Nigeria local content e-libraries
              </p>
              
              {/* Search Box */}
              <div className="max-w-2xl mx-auto mb-10">
                <div 
                  className="flex items-center rounded-full border-2 overflow-hidden shadow-sm"
                  style={{ borderColor: '#E5E7EB' }}
                >
                  <input 
                    type="text"
                    placeholder="Search anything Nigeria"
                    className="flex-1 px-6 py-4 text-lg outline-none"
                    style={{ color: elibraryColors.text }}
                  />
                  <button 
                    className="px-6 py-4 transition-opacity hover:opacity-80"
                    style={{ backgroundColor: elibraryColors.textMuted }}
                  >
                    <Search className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Streamline Search */}
              <p className="text-sm mb-4" style={{ color: elibraryColors.textMuted }}>
                Streamline your search
              </p>
              
              {/* Category Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
                <a 
                  href="https://www.elibrarynigeria.com.ng" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button 
                    size="lg" 
                    className="text-lg px-8 py-6 font-medium text-white"
                    style={{ backgroundColor: elibraryColors.primary }}
                  >
                    local content e-libraries
                  </Button>
                </a>
                <a 
                  href="https://www.elibrarynigeria.com.ng" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button 
                    size="lg" 
                    className="text-lg px-8 py-6 font-medium text-white"
                    style={{ backgroundColor: elibraryColors.primary }}
                  >
                    international content e-libraries
                  </Button>
                </a>
              </div>

              {/* Visit Site CTA */}
              <a 
                href="https://www.elibrarynigeria.com.ng" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold transition-colors hover:opacity-80"
                style={{ color: elibraryColors.secondary }}
              >
                <Globe className="w-5 h-5" />
                Visit elibrarynigeria.com.ng
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* New Books Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="font-['Abhaya_Libre'] text-2xl md:text-3xl font-bold text-center mb-8" style={{ color: elibraryColors.text }}>
              New books by categories
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <a
                  key={category}
                  href="https://www.elibrarynigeria.com.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full border-2 font-medium text-sm transition-all hover:shadow-md"
                  style={{ 
                    borderColor: elibraryColors.primary,
                    color: elibraryColors.primary
                  }}
                >
                  {category}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Uploaded Books Banner */}
        <section 
          className="py-8"
          style={{ backgroundColor: elibraryColors.light }}
        >
          <div className="container mx-auto px-4">
            <h2 className="font-['Abhaya_Libre'] text-xl md:text-2xl font-bold" style={{ color: elibraryColors.text }}>
              Recent Uploaded Books
            </h2>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white border-y" style={{ borderColor: '#E5E7EB' }}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div 
                    className="font-['Abhaya_Libre'] text-3xl md:text-4xl font-bold"
                    style={{ color: elibraryColors.primary }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ color: elibraryColors.textMuted }} className="font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16 md:py-24" style={{ backgroundColor: elibraryColors.light }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 
                className="font-['Abhaya_Libre'] text-3xl md:text-4xl font-bold mb-4"
                style={{ color: elibraryColors.text }}
              >
                Vast Digital <span style={{ color: elibraryColors.primary }}>Resources</span>
              </h2>
              <p style={{ color: elibraryColors.textMuted }} className="text-lg max-w-2xl mx-auto">
                Access an extensive collection of educational materials curated for Nigerian curriculum and beyond.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.map((resource, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-lg border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ borderColor: '#E5E7EB' }}
                >
                  <div 
                    className="w-16 h-16 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: elibraryColors.primary }}
                  >
                    <resource.icon className="w-8 h-8 text-white" />
                  </div>
                  <div 
                    className="text-2xl font-bold mb-2"
                    style={{ color: elibraryColors.secondary }}
                  >
                    {resource.count}
                  </div>
                  <h3 
                    className="font-['Abhaya_Libre'] text-xl font-bold mb-2"
                    style={{ color: elibraryColors.text }}
                  >
                    {resource.title}
                  </h3>
                  <p style={{ color: elibraryColors.textMuted }}>{resource.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 
                  className="font-['Abhaya_Libre'] text-3xl md:text-4xl font-bold mb-6"
                  style={{ color: elibraryColors.text }}
                >
                  Powerful Features for{" "}
                  <span style={{ color: elibraryColors.primary }}>Modern Learning</span>
                </h2>
                <p style={{ color: elibraryColors.textMuted }} className="text-lg mb-8">
                  eLibrary Nigeria is designed with the unique needs of Nigerian learners in mind, 
                  offering features that work even in challenging connectivity environments.
                </p>

                <div className="grid sm:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex gap-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: elibraryColors.primary }}
                      >
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1" style={{ color: elibraryColors.text }}>
                          {feature.title}
                        </h4>
                        <p className="text-sm" style={{ color: elibraryColors.textMuted }}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div 
                  className="aspect-square rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: elibraryColors.secondary }}
                >
                  <div className="text-center p-8">
                    <Laptop className="w-24 h-24 text-white mx-auto mb-6" />
                    <h3 className="font-['Abhaya_Libre'] text-2xl font-bold text-white mb-4">
                      Access Anywhere
                    </h3>
                    <p className="text-white/80">
                      Learn on any device, anytime, anywhere across Nigeria
                    </p>
                  </div>
                </div>
                <div 
                  className="absolute -bottom-4 -right-4 w-24 h-24 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: elibraryColors.primary }}
                >
                  <BookMarked className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24" style={{ backgroundColor: elibraryColors.light }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 
                className="font-['Abhaya_Libre'] text-3xl md:text-4xl font-bold mb-4"
                style={{ color: elibraryColors.text }}
              >
                What Users <span style={{ color: elibraryColors.primary }}>Say</span>
              </h2>
              <p style={{ color: elibraryColors.textMuted }} className="text-lg max-w-2xl mx-auto">
                Hear from students and educators across Nigeria who use eLibrary daily.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-white p-8 rounded-xl border-2 shadow-lg"
                  style={{ borderColor: '#E5E7EB' }}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-5 h-5"
                        style={{ fill: elibraryColors.primary, color: elibraryColors.primary }}
                      />
                    ))}
                  </div>
                  <p className="mb-6 italic" style={{ color: elibraryColors.textMuted }}>
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <div className="font-semibold" style={{ color: elibraryColors.text }}>
                      {testimonial.name}
                    </div>
                    <div className="text-sm" style={{ color: elibraryColors.textMuted }}>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Access Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 
                className="font-['Abhaya_Libre'] text-3xl md:text-4xl font-bold mb-4"
                style={{ color: elibraryColors.text }}
              >
                How to <span style={{ color: elibraryColors.primary }}>Get Started</span>
              </h2>
              <p style={{ color: elibraryColors.textMuted }} className="text-lg max-w-2xl mx-auto">
                Start accessing free educational resources in three simple steps.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { step: "1", title: "Create Account", description: "Sign up free with your email or phone number" },
                  { step: "2", title: "Verify Status", description: "Upload your student ID or school enrollment proof" },
                  { step: "3", title: "Start Learning", description: "Access unlimited resources across all categories" }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: elibraryColors.primary }}
                    >
                      <span className="text-2xl font-bold text-white">{item.step}</span>
                    </div>
                    <h3 
                      className="font-['Abhaya_Libre'] text-xl font-bold mb-2"
                      style={{ color: elibraryColors.text }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ color: elibraryColors.textMuted }}>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <ProgramVideoSection
          programName="eLibrary Nigeria"
          videoUrl="https://www.youtube.com/embed/MrErQY7qWRs"
          videoType="youtube"
          description="Discover how eLibrary Nigeria is providing free digital learning resources to students and educators."
        />

        {/* CTA Section */}
        <section 
          className="py-16 md:py-24"
          style={{ backgroundColor: elibraryColors.secondary }}
        >
          <div className="container mx-auto px-4 text-center">
            <Library className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="font-['Abhaya_Libre'] text-3xl md:text-4xl font-bold text-white mb-6">
              Start Your Learning Journey Today
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join over 100,000 Nigerian students and educators accessing free educational resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://www.elibrarynigeria.com.ng" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 font-semibold"
                  style={{ backgroundColor: elibraryColors.primary, color: 'white' }}
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Visit eLibrary Nigeria
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 font-semibold bg-transparent text-white border-2 border-white hover:bg-white/10"
              >
                Browse Catalog
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ELibraryNigeria;
