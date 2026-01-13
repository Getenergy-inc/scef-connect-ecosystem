import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Globe, Laptop, BookOpen, Award, Target, Wifi,
  ArrowRight, CheckCircle, GraduationCap, Lightbulb,
  TrendingUp, Star, Quote, Users, Smartphone, Play,
  ChevronDown, HandHeart, Monitor, Database, Code, Cloud
} from "lucide-react";
import { ProgramVideoSection } from "@/components/programs/ProgramVideoSection";

const platforms = [
  {
    icon: Monitor,
    title: "SCEF Learning Hub",
    desc: "Comprehensive online learning platform with interactive courses, video lessons, and self-paced modules for all education levels.",
    users: "50,000+ learners",
    features: ["Video courses", "Quizzes", "Certificates"],
  },
  {
    icon: Smartphone,
    title: "EduMobile App",
    desc: "Mobile-first learning application optimized for low-bandwidth environments, enabling learning on basic smartphones.",
    users: "75,000+ downloads",
    features: ["Offline mode", "SMS lessons", "Data-light"],
  },
  {
    icon: Database,
    title: "eLibrary Africa",
    desc: "Digital library with textbooks, research papers, educational resources, and open educational materials.",
    users: "100,000+ resources",
    features: ["Free textbooks", "Research access", "Multi-language"],
  },
  {
    icon: Play,
    title: "Virtual Classroom",
    desc: "Live streaming platform for real-time classes, webinars, and interactive sessions with educators across Africa.",
    users: "5,000+ classes/month",
    features: ["Live classes", "Recording", "Q&A sessions"],
  },
  {
    icon: Code,
    title: "Tech Skills Academy",
    desc: "Specialized programs teaching coding, digital literacy, and technology skills for the future workforce.",
    users: "12,000+ enrolled",
    features: ["Coding courses", "Projects", "Job placement"],
  },
  {
    icon: Cloud,
    title: "Teacher Digital Hub",
    desc: "Resources and training platform for educators to develop digital teaching skills and access lesson materials.",
    users: "8,000+ teachers",
    features: ["Lesson plans", "Training", "Community"],
  },
];

const impactStats = [
  { value: "250,000+", label: "Active Learners", icon: Users },
  { value: "35", label: "African Countries", icon: Globe },
  { value: "15,000+", label: "Courses Available", icon: BookOpen },
  { value: "85%", label: "Completion Rate", icon: TrendingUp },
];

const features = [
  {
    title: "Offline Learning",
    desc: "Download content for learning without internet connectivity—essential for rural areas with limited access.",
    icon: Wifi,
  },
  {
    title: "Multi-Language Support",
    desc: "Content available in English, French, Portuguese, Swahili, Arabic, and 20+ African languages.",
    icon: Globe,
  },
  {
    title: "Low-Bandwidth Optimized",
    desc: "Platforms designed to work on 2G networks and basic smartphones, ensuring accessibility for all.",
    icon: Smartphone,
  },
  {
    title: "Accredited Certificates",
    desc: "Earn recognized certificates and credentials that are accepted by employers and institutions.",
    icon: Award,
  },
];

const successStories = [
  {
    name: "Emmanuel Kwame",
    country: "Ghana",
    program: "Tech Skills Academy",
    story: "Learned coding through the mobile app while working on my family's farm. Now I'm a junior developer at a tech startup.",
  },
  {
    name: "Mariam Hassan",
    country: "Tanzania",
    program: "Virtual Classroom",
    story: "As a teacher in a remote village, the digital hub transformed how I teach. My students' performance has improved significantly.",
  },
  {
    name: "Jean-Baptiste Niyonzima",
    country: "Rwanda",
    program: "eLibrary Africa",
    story: "Access to free textbooks and research papers helped me complete my university thesis without buying expensive books.",
  },
];

const partnerships = [
  "Google for Education",
  "Microsoft Philanthropies",
  "Khan Academy",
  "Coursera",
  "African Development Bank",
  "UNESCO",
];

const DigitalLearning = () => {
  return (
    <>
      <Helmet>
        <title>Digital Learning – Santos Creations Educational Foundation</title>
        <meta 
          name="description" 
          content="Bridging the digital divide in African education. Access free online courses, e-learning platforms, and digital resources designed for low-bandwidth environments." 
        />
        <meta property="og:title" content="Digital Learning – SCEF" />
        <meta property="og:description" content="E-learning platforms and digital education resources for Africa's students and educators." />
        <meta name="keywords" content="digital learning Africa, e-learning, online education, SCEF digital, African EdTech, mobile learning" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="relative pt-32 pb-28 bg-scef-blue overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-scef-gold rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-scef-gold rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
            </div>
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'linear-gradient(hsl(var(--scef-gold)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--scef-gold)) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }} />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-5xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-scef-gold/20 border-2 border-black text-scef-gold text-sm font-semibold mb-8 animate-fade-up">
                  <Laptop className="w-5 h-5" />
                  <span>Digital Education for Africa</span>
                </div>
                
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                  Digital <span className="text-scef-gold">Learning</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
                  Bridging the digital divide. Providing accessible, low-bandwidth e-learning platforms, digital resources, and tech skills training across Africa.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
                  <Button 
                    size="xl" 
                    className="bg-scef-gold text-scef-blue-dark hover:bg-scef-gold-hover font-bold border-2 border-black shadow-lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Learning Free
                  </Button>
                  <Button 
                    size="xl" 
                    className="bg-transparent border-2 border-scef-gold text-scef-gold hover:bg-scef-gold/10 font-bold" 
                    asChild
                  >
                    <Link to="/contact">
                      <Users className="w-5 h-5 mr-2" />
                      Become a Partner
                    </Link>
                  </Button>
                </div>
                
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-fade-up" style={{ animationDelay: '0.4s' }}>
                  {impactStats.map((stat) => (
                    <div 
                      key={stat.label} 
                      className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-black"
                    >
                      <stat.icon className="w-6 h-6 text-scef-gold mx-auto mb-2" />
                      <p className="font-display text-2xl md:text-3xl font-bold text-scef-gold">{stat.value}</p>
                      <p className="text-white/80 text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 animate-bounce">
                  <ChevronDown className="w-8 h-8 text-scef-gold/60 mx-auto" />
                </div>
              </div>
            </div>
          </section>

          {/* Mission */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-scef-blue border-2 border-black mb-6">
                  <Globe className="w-8 h-8 text-scef-gold" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-dark mb-6">
                  Education Without <span className="text-scef-gold">Borders</span>
                </h2>
                <p className="text-lg text-scef-grey leading-relaxed">
                  The digital revolution is transforming education globally, but millions of African students risk being left behind. 
                  Our Digital Learning initiative bridges this gap by providing free, accessible e-learning platforms optimized for 
                  low-bandwidth environments, mobile devices, and offline use—ensuring quality education reaches every corner of Africa.
                </p>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {features.map((feature) => (
                  <div 
                    key={feature.title}
                    className="p-6 rounded-2xl bg-white border-2 border-black text-center"
                  >
                    <div className="w-12 h-12 rounded-xl bg-scef-gold border-2 border-black flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-6 h-6 text-scef-blue-dark" />
                    </div>
                    <h3 className="font-display font-bold text-scef-blue-dark mb-2">{feature.title}</h3>
                    <p className="text-scef-grey text-sm">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Platforms */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-blue border-2 border-black text-scef-gold text-sm font-semibold mb-4">
                  <Laptop className="w-4 h-4" />
                  Our Platforms
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-dark mb-4">
                  Learning <span className="text-scef-gold">Ecosystem</span>
                </h2>
                <p className="text-scef-grey max-w-2xl mx-auto">
                  A comprehensive suite of digital learning tools designed for Africa's unique needs.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {platforms.map((platform) => (
                  <div 
                    key={platform.title}
                    className="p-6 rounded-2xl bg-white border-2 border-black hover:border-scef-gold hover:shadow-lg transition-all group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-scef-blue border-2 border-black flex items-center justify-center mb-4 group-hover:bg-scef-gold transition-colors">
                      <platform.icon className="w-7 h-7 text-scef-gold group-hover:text-scef-blue-dark transition-colors" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-scef-blue-dark mb-2">{platform.title}</h3>
                    <p className="text-scef-grey text-sm mb-3">{platform.desc}</p>
                    <p className="text-scef-gold font-bold text-sm mb-4">{platform.users}</p>
                    <div className="flex flex-wrap gap-2">
                      {platform.features.map((feature) => (
                        <span 
                          key={feature} 
                          className="px-3 py-1 bg-gray-100 rounded-full text-xs text-scef-grey font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Success Stories */}
          <section className="py-20 bg-scef-blue">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-gold/20 border-2 border-black text-scef-gold text-sm font-semibold mb-4">
                  <Star className="w-4 h-4" />
                  Success Stories
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                  Learner <span className="text-scef-gold">Spotlight</span>
                </h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {successStories.map((story) => (
                  <div 
                    key={story.name}
                    className="p-6 rounded-2xl bg-white border-2 border-black"
                  >
                    <Quote className="w-8 h-8 text-scef-gold mb-4" />
                    <p className="text-scef-grey text-sm mb-4">"{story.story}"</p>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="font-display font-bold text-scef-blue-dark">{story.name}</p>
                      <p className="text-scef-grey text-sm">{story.country}</p>
                      <p className="text-scef-gold text-xs font-semibold mt-1">{story.program}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Partners */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <p className="text-scef-grey font-medium mb-6">Technology Partners</p>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                  {partnerships.map((partner) => (
                    <div 
                      key={partner}
                      className="px-6 py-3 bg-white rounded-lg border-2 border-black text-scef-blue-dark font-semibold text-sm"
                    >
                      {partner}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Video Section */}
          <ProgramVideoSection
            programName="Education Online Africa"
            videoUrl="/videos/program-video-2.mp4"
            videoType="local"
            description="Explore how EOA is bridging the digital learning gap across Africa with accessible online education."
          />

          {/* CTA */}
          <section className="py-24 bg-white">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-3xl mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-scef-gold border-2 border-black mb-6">
                  <Laptop className="w-8 h-8 text-scef-blue-dark" />
                </div>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-scef-blue-dark mb-4">
                  Start Your Learning <span className="text-scef-gold">Journey</span>
                </h2>
                <p className="text-scef-grey text-lg max-w-xl mx-auto mb-8">
                  Join hundreds of thousands of learners across Africa accessing free, quality education online.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="xl" 
                    className="bg-scef-blue text-white hover:bg-scef-blue-light font-bold border-2 border-black shadow-lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Access Free Courses
                  </Button>
                  <Button 
                    size="xl" 
                    className="bg-scef-gold text-scef-blue-dark hover:bg-scef-gold-hover font-bold border-2 border-black" 
                    asChild
                  >
                    <Link to="/donate">
                      <HandHeart className="w-5 h-5 mr-2" />
                      Support Digital Education
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default DigitalLearning;