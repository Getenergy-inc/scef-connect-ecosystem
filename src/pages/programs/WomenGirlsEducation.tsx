import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Heart, Users, BookOpen, Award, Target, Shield,
  ArrowRight, CheckCircle, GraduationCap, Lightbulb,
  Globe, TrendingUp, Star, Quote, UserCheck, Sparkles,
  ChevronDown, HandHeart, School
} from "lucide-react";
import { ProgramVideoSection } from "@/components/programs/ProgramVideoSection";

const programPillars = [
  {
    icon: GraduationCap,
    title: "Access to Education",
    desc: "Breaking barriers that prevent girls from attending school through scholarships, transportation, and community advocacy.",
    stats: "12,000+ girls enrolled",
  },
  {
    icon: Shield,
    title: "Safe Learning Spaces",
    desc: "Creating secure, girl-friendly school environments with proper facilities and trained support staff.",
    stats: "500+ schools supported",
  },
  {
    icon: Lightbulb,
    title: "STEM Empowerment",
    desc: "Encouraging girls to pursue science, technology, engineering, and mathematics through specialized programs.",
    stats: "3,000+ in STEM tracks",
  },
  {
    icon: Users,
    title: "Leadership Development",
    desc: "Building confidence and leadership skills through mentorship, public speaking, and community projects.",
    stats: "800+ leaders trained",
  },
  {
    icon: Heart,
    title: "Health & Wellbeing",
    desc: "Addressing health needs including menstrual hygiene management, nutrition, and mental health support.",
    stats: "25,000+ reached",
  },
  {
    icon: Award,
    title: "Career Pathways",
    desc: "Connecting educated women with employment opportunities, entrepreneurship training, and professional networks.",
    stats: "2,500+ employed",
  },
];

const impactStats = [
  { value: "45,000+", label: "Girls & Women Supported", icon: Users },
  { value: "28", label: "African Countries", icon: Globe },
  { value: "89%", label: "Completion Rate", icon: TrendingUp },
  { value: "$3.2M", label: "Invested Annually", icon: Target },
];

const successStories = [
  {
    name: "Grace Achieng",
    country: "Kenya",
    story: "From a rural village where girls rarely finish primary school, Grace is now a software engineer at a leading tech company.",
    achievement: "First female engineer from her village",
  },
  {
    name: "Amina Diallo",
    country: "Senegal",
    story: "Despite early marriage pressure, Amina completed her education and now runs a successful agribusiness employing 50 women.",
    achievement: "Community entrepreneur",
  },
  {
    name: "Thandiwe Moyo",
    country: "Zimbabwe",
    story: "Our STEM program ignited her passion for science. Thandiwe is now pursuing her PhD in renewable energy.",
    achievement: "PhD candidate in engineering",
  },
];

const initiatives = [
  {
    title: "Keep Girls in School",
    desc: "Comprehensive support including school fees, uniforms, supplies, and family engagement to prevent dropout.",
    icon: School,
  },
  {
    title: "Women in STEM Africa",
    desc: "Specialized programs, coding bootcamps, and mentorship connecting girls with female professionals in technical fields.",
    icon: Lightbulb,
  },
  {
    title: "Second Chance Education",
    desc: "Helping women who dropped out return to education through flexible learning programs and childcare support.",
    icon: Heart,
  },
  {
    title: "Girls Leadership Academy",
    desc: "Annual intensive program developing the next generation of female African leaders through training and networking.",
    icon: Award,
  },
];

const WomenGirlsEducation = () => {
  return (
    <>
      <Helmet>
        <title>Women & Girls Education – Santos Creations Educational Foundation</title>
        <meta 
          name="description" 
          content="Empowering women and girls across Africa through education, mentorship, and leadership development. Breaking barriers to create a more equitable future." 
        />
        <meta property="og:title" content="Women & Girls Education – SCEF" />
        <meta property="og:description" content="Empowering African women and girls through education, STEM programs, and leadership development." />
        <meta name="keywords" content="girls education Africa, women empowerment, STEM Africa, female education, SCEF women programs" />
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
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-5xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-scef-gold/20 border-2 border-black text-scef-gold text-sm font-semibold mb-8 animate-fade-up">
                  <Heart className="w-5 h-5" />
                  <span>Gender Equity in Education</span>
                </div>
                
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                  Women & Girls <span className="text-scef-gold">Education</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
                  Breaking barriers and building futures. Empowering women and girls across Africa through education, mentorship, and leadership development.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
                  <Button 
                    size="xl" 
                    className="bg-scef-gold text-scef-blue-dark hover:bg-scef-gold-hover font-bold border-2 border-black shadow-lg"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Support a Girl's Education
                  </Button>
                  <Button 
                    size="xl" 
                    className="bg-transparent border-2 border-scef-gold text-scef-gold hover:bg-scef-gold/10 font-bold" 
                    asChild
                  >
                    <Link to="/get-involved">
                      <Users className="w-5 h-5 mr-2" />
                      Become a Mentor
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
                  <Sparkles className="w-8 h-8 text-scef-gold" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-dark mb-6">
                  Our <span className="text-scef-gold">Mission</span>
                </h2>
                <p className="text-lg text-scef-grey leading-relaxed">
                  When you educate a girl, you educate a nation. We believe that investing in women and girls' education is the most powerful 
                  catalyst for sustainable development in Africa. Our comprehensive programs address barriers at every stage—from early childhood 
                  through higher education and into the workforce—ensuring no girl is left behind.
                </p>
              </div>
            </div>
          </section>

          {/* Program Pillars */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-blue border-2 border-black text-scef-gold text-sm font-semibold mb-4">
                  <Target className="w-4 h-4" />
                  Our Approach
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-dark mb-4">
                  Program <span className="text-scef-gold">Pillars</span>
                </h2>
                <p className="text-scef-grey max-w-2xl mx-auto">
                  A holistic approach addressing every barrier to girls' education.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {programPillars.map((pillar) => (
                  <div 
                    key={pillar.title}
                    className="p-6 rounded-2xl bg-white border-2 border-black hover:border-scef-gold hover:shadow-lg transition-all group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-scef-blue border-2 border-black flex items-center justify-center mb-4 group-hover:bg-scef-gold transition-colors">
                      <pillar.icon className="w-7 h-7 text-scef-gold group-hover:text-scef-blue-dark transition-colors" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-scef-blue-dark mb-2">{pillar.title}</h3>
                    <p className="text-scef-grey text-sm mb-4">{pillar.desc}</p>
                    <p className="text-scef-gold font-bold text-sm">{pillar.stats}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Key Initiatives */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-dark mb-4">
                  Key <span className="text-scef-gold">Initiatives</span>
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {initiatives.map((initiative) => (
                  <div 
                    key={initiative.title}
                    className="p-6 rounded-2xl bg-scef-blue border-2 border-black"
                  >
                    <div className="w-12 h-12 rounded-xl bg-scef-gold border-2 border-black flex items-center justify-center mb-4">
                      <initiative.icon className="w-6 h-6 text-scef-blue-dark" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-2">{initiative.title}</h3>
                    <p className="text-white/80 text-sm">{initiative.desc}</p>
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
                  Voices of <span className="text-scef-gold">Change</span>
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
                      <p className="text-scef-gold text-xs font-semibold mt-2">{story.achievement}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Video Section */}
          <ProgramVideoSection
            programName="Women & Girls Education"
            videoUrl="https://www.youtube.com/embed/DDREAU_bmRk"
            videoType="youtube"
            description="Discover how we're empowering women and girls through education across Africa."
          />

          {/* CTA */}
          <section className="py-24 bg-white">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-3xl mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-scef-gold border-2 border-black mb-6">
                  <Heart className="w-8 h-8 text-scef-blue-dark" />
                </div>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-scef-blue-dark mb-4">
                  Invest in Her <span className="text-scef-gold">Future</span>
                </h2>
                <p className="text-scef-grey text-lg max-w-xl mx-auto mb-8">
                  Your support can help a girl complete her education and become a leader in her community.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="xl" 
                    className="bg-scef-blue text-white hover:bg-scef-blue-light font-bold border-2 border-black shadow-lg"
                    asChild
                  >
                    <Link to="/donate">
                      <HandHeart className="w-5 h-5 mr-2" />
                      Donate Now
                    </Link>
                  </Button>
                  <Button 
                    size="xl" 
                    className="bg-scef-gold text-scef-blue-dark hover:bg-scef-gold-hover font-bold border-2 border-black" 
                    asChild
                  >
                    <Link to="/programs">
                      <ArrowRight className="w-5 h-5 mr-2" />
                      Explore Programs
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

export default WomenGirlsEducation;