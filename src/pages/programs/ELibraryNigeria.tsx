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
  Laptop
} from "lucide-react";

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
      description: "AI-powered search to find exactly what you need in seconds"
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
        <meta name="description" content="Access free digital educational resources through eLibrary Nigeria. Over 90,000 e-books, research papers, and learning materials for Nigerian students and educators." />
        <meta property="og:title" content="eLibrary Nigeria – SCEF" />
        <meta property="og:description" content="Nigeria's largest free digital library for education. Access e-books, research papers, video tutorials, and exam preparation materials." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://santoscreations.org/programs/elibrary-nigeria" />
      </Helmet>

      <Header />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden" style={{ backgroundColor: '#0000CD' }}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-32 h-32 border border-[#FFD700] rounded-full" />
            <div className="absolute bottom-20 right-10 w-48 h-48 border border-[#FFD700] rounded-full" />
            <div className="absolute top-1/2 left-1/3 w-24 h-24 border border-[#FFD700] rotate-45" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-black bg-[#FFD700] text-black font-semibold mb-6">
                <Library className="w-5 h-5" />
                <span>SCEF Digital Education Initiative</span>
              </div>
              
              <h1 className="font-['Abhaya_Libre'] text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                eLibrary <span className="text-[#FFD700]">Nigeria</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
                Promoting Nigeria local content e-libraries. Streamline your search for local 
                and international content e-libraries, connecting students and educators 
                to a vast repository of Nigerian-authored resources.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://www.elibrarynigeria.com.ng" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button 
                    size="lg" 
                    className="text-lg px-8 py-6 border-2 border-black font-semibold"
                    style={{ backgroundColor: '#FFD700', color: '#000000' }}
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Visit eLibrary Nigeria
                    <Globe className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-6 border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black font-semibold"
                >
                  Browse Catalog
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white border-y-2 border-black">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-['Abhaya_Libre'] text-3xl md:text-4xl font-bold" style={{ color: '#0000CD' }}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Search Section */}
        <ELibrarySearch />

        {/* Resources Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-['Abhaya_Libre'] text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0000CD' }}>
                Vast Digital <span className="text-[#FFD700]">Resources</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Access an extensive collection of educational materials curated for Nigerian curriculum and beyond.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.map((resource, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-lg border-2 border-black shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div 
                    className="w-16 h-16 rounded-lg flex items-center justify-center mb-4 border-2 border-black"
                    style={{ backgroundColor: '#0000CD' }}
                  >
                    <resource.icon className="w-8 h-8 text-[#FFD700]" />
                  </div>
                  <div className="text-2xl font-bold text-[#FFD700] mb-2">{resource.count}</div>
                  <h3 className="font-['Abhaya_Libre'] text-xl font-bold mb-2" style={{ color: '#0000CD' }}>
                    {resource.title}
                  </h3>
                  <p className="text-gray-600">{resource.description}</p>
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
                <h2 className="font-['Abhaya_Libre'] text-3xl md:text-4xl font-bold mb-6" style={{ color: '#0000CD' }}>
                  Powerful Features for <span className="text-[#FFD700]">Modern Learning</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  eLibrary Nigeria is designed with the unique needs of Nigerian learners in mind, 
                  offering features that work even in challenging connectivity environments.
                </p>

                <div className="grid sm:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex gap-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-black"
                        style={{ backgroundColor: '#FFD700' }}
                      >
                        <feature.icon className="w-6 h-6" style={{ color: '#0000CD' }} />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1" style={{ color: '#0000CD' }}>{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div 
                  className="aspect-square rounded-2xl flex items-center justify-center border-2 border-black"
                  style={{ backgroundColor: '#0000CD' }}
                >
                  <div className="text-center p-8">
                    <Laptop className="w-24 h-24 text-[#FFD700] mx-auto mb-6" />
                    <h3 className="font-['Abhaya_Libre'] text-2xl font-bold text-white mb-4">
                      Access Anywhere
                    </h3>
                    <p className="text-white/80">
                      Learn on any device, anytime, anywhere across Nigeria
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#FFD700] rounded-lg border-2 border-black flex items-center justify-center">
                  <BookMarked className="w-12 h-12" style={{ color: '#0000CD' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 md:py-24" style={{ backgroundColor: '#0000CD' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-['Abhaya_Libre'] text-3xl md:text-4xl font-bold text-white mb-4">
                Browse by <span className="text-[#FFD700]">Category</span>
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Find resources tailored to your educational level and interests.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="px-6 py-3 bg-white/10 border-2 border-[#FFD700] text-white rounded-full hover:bg-[#FFD700] hover:text-black transition-all duration-300 font-medium"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-['Abhaya_Libre'] text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0000CD' }}>
                What Users <span className="text-[#FFD700]">Say</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Hear from students and educators across Nigeria who use eLibrary daily.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-white p-8 rounded-xl border-2 border-black shadow-lg"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold" style={{ color: '#0000CD' }}>{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
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
              <h2 className="font-['Abhaya_Libre'] text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0000CD' }}>
                How to <span className="text-[#FFD700]">Get Started</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Start accessing free educational resources in three simple steps.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { step: "1", title: "Create Account", description: "Sign up free with your email or phone number" },
                  { step: "2", title: "Verify Student Status", description: "Upload your student ID or school enrollment proof" },
                  { step: "3", title: "Start Learning", description: "Access unlimited resources across all categories" }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-black"
                      style={{ backgroundColor: '#FFD700' }}
                    >
                      <span className="text-2xl font-bold" style={{ color: '#0000CD' }}>{item.step}</span>
                    </div>
                    <h3 className="font-['Abhaya_Libre'] text-xl font-bold mb-2" style={{ color: '#0000CD' }}>
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
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
        <section className="py-16 md:py-24 border-t-2 border-black" style={{ backgroundColor: '#0000CD' }}>
          <div className="container mx-auto px-4 text-center">
            <Library className="w-16 h-16 text-[#FFD700] mx-auto mb-6" />
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
                  className="text-lg px-8 py-6 border-2 border-black font-semibold"
                  style={{ backgroundColor: '#FFD700', color: '#000000' }}
                >
                  Visit eLibrary Nigeria
                  <Globe className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Link to="/programs">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-6 border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black font-semibold"
                >
                  Explore All Programs
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Back Link */}
        <section className="py-8 bg-gray-100 border-t-2 border-black">
          <div className="container mx-auto px-4 text-center">
            <Link to="/" className="text-[#0000CD] hover:text-[#FFD700] font-medium inline-flex items-center gap-2">
              ← Back to Santos Creations Educational Foundation
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ELibraryNigeria;
