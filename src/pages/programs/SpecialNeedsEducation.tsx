import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Accessibility, Heart, Users, BookOpen, Award, Target,
  ArrowRight, CheckCircle, GraduationCap, Lightbulb,
  Globe, TrendingUp, Star, Quote, UserCheck, Eye, Ear,
  ChevronDown, HandHeart, School, Brain, Hand
} from "lucide-react";
import { ProgramVideoSection } from "@/components/programs/ProgramVideoSection";

const supportAreas = [
  {
    icon: Eye,
    title: "Visual Impairments",
    desc: "Braille resources, audio learning materials, screen readers, and mobility training for visually impaired students.",
    beneficiaries: "2,500+ students",
  },
  {
    icon: Ear,
    title: "Hearing Impairments",
    desc: "Sign language instruction, hearing aids, captioned content, and deaf education specialists.",
    beneficiaries: "1,800+ students",
  },
  {
    icon: Brain,
    title: "Learning Disabilities",
    desc: "Specialized teaching methods, individualized education plans, and assistive technologies for dyslexia, ADHD, and more.",
    beneficiaries: "4,200+ students",
  },
  {
    icon: Accessibility,
    title: "Physical Disabilities",
    desc: "Accessible infrastructure, mobility aids, adaptive equipment, and physical therapy support.",
    beneficiaries: "3,100+ students",
  },
  {
    icon: Heart,
    title: "Developmental Disabilities",
    desc: "Autism spectrum support, early intervention programs, behavioral therapy, and life skills training.",
    beneficiaries: "2,800+ students",
  },
  {
    icon: Hand,
    title: "Multiple Disabilities",
    desc: "Comprehensive multi-disciplinary support for students with complex needs requiring integrated care.",
    beneficiaries: "900+ students",
  },
];

const impactStats = [
  { value: "15,300+", label: "Students Supported", icon: Users },
  { value: "850+", label: "Schools Equipped", icon: School },
  { value: "22", label: "African Countries", icon: Globe },
  { value: "92%", label: "Integration Success", icon: TrendingUp },
];

const initiatives = [
  {
    title: "Inclusive School Program",
    desc: "Partnering with mainstream schools to create inclusive environments through teacher training, facility upgrades, and curriculum adaptation.",
    icon: School,
  },
  {
    title: "Assistive Technology Fund",
    desc: "Providing hearing aids, wheelchairs, screen readers, communication devices, and other assistive technologies to students in need.",
    icon: Lightbulb,
  },
  {
    title: "Special Educator Training",
    desc: "Building local capacity by training teachers in special education methodologies, sign language, and inclusive teaching practices.",
    icon: GraduationCap,
  },
  {
    title: "Parent & Community Outreach",
    desc: "Reducing stigma and building support networks through community awareness programs and parent training initiatives.",
    icon: Users,
  },
];

const testimonials = [
  {
    name: "David Mensah",
    country: "Ghana",
    condition: "Visual Impairment",
    story: "With braille materials and a supportive school environment, I completed my education and now work as a radio journalist.",
  },
  {
    name: "Blessing Okafor",
    country: "Nigeria",
    condition: "Autism Spectrum",
    story: "The early intervention program helped my son communicate. He's now thriving in school and has made wonderful friends.",
  },
  {
    name: "Fatou Camara",
    country: "Senegal",
    condition: "Physical Disability",
    story: "The wheelchair and accessible classroom changed everything. I graduated top of my class and am now studying medicine.",
  },
];

const principles = [
  "Every child has the right to education regardless of ability",
  "Inclusion benefits all students, not just those with disabilities",
  "Local communities must be empowered to support inclusive education",
  "Assistive technology should be accessible and affordable",
  "Teacher training is key to successful inclusion",
];

const SpecialNeedsEducation = () => {
  return (
    <>
      <Helmet>
        <title>Special Needs Education – Santos Creations Educational Foundation</title>
        <meta 
          name="description" 
          content="Ensuring inclusive education for students with disabilities across Africa. Providing assistive technology, teacher training, and accessible learning environments." 
        />
        <meta property="og:title" content="Special Needs Education – SCEF" />
        <meta property="og:description" content="Inclusive education programs for students with disabilities across Africa." />
        <meta name="keywords" content="special needs education Africa, inclusive education, disability support, assistive technology, SCEF" />
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
                  <Accessibility className="w-5 h-5" />
                  <span>Inclusive Education for All</span>
                </div>
                
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                  Special Needs <span className="text-scef-gold">Education</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
                  Every child deserves quality education. We're breaking barriers and creating inclusive learning environments for students with disabilities across Africa.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
                  <Button 
                    size="xl" 
                    className="bg-scef-gold text-scef-blue-dark hover:bg-scef-gold-hover font-bold border-2 border-black shadow-lg"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Support Inclusive Education
                  </Button>
                  <Button 
                    size="xl" 
                    className="bg-transparent border-2 border-scef-gold text-scef-gold hover:bg-scef-gold/10 font-bold" 
                    asChild
                  >
                    <Link to="/contact">
                      <Users className="w-5 h-5 mr-2" />
                      Partner With Us
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
                  <Accessibility className="w-8 h-8 text-scef-gold" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-dark mb-6">
                  Our <span className="text-scef-gold">Vision</span>
                </h2>
                <p className="text-lg text-scef-grey leading-relaxed mb-8">
                  In Africa, millions of children with disabilities are excluded from education due to stigma, lack of resources, and inaccessible 
                  infrastructure. We envision an Africa where every child, regardless of ability, has access to quality, inclusive education 
                  that enables them to reach their full potential.
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  {principles.map((principle, index) => (
                    <div key={index} className="flex items-start gap-3 text-left p-4 bg-gray-50 rounded-xl border-2 border-black">
                      <CheckCircle className="w-5 h-5 text-scef-gold flex-shrink-0 mt-0.5" />
                      <span className="text-scef-blue-dark text-sm font-medium">{principle}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Support Areas */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-blue border-2 border-black text-scef-gold text-sm font-semibold mb-4">
                  <Target className="w-4 h-4" />
                  Areas of Support
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-dark mb-4">
                  Who We <span className="text-scef-gold">Serve</span>
                </h2>
                <p className="text-scef-grey max-w-2xl mx-auto">
                  Tailored support programs for students with different types of disabilities.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {supportAreas.map((area) => (
                  <div 
                    key={area.title}
                    className="p-6 rounded-2xl bg-white border-2 border-black hover:border-scef-gold hover:shadow-lg transition-all group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-scef-blue border-2 border-black flex items-center justify-center mb-4 group-hover:bg-scef-gold transition-colors">
                      <area.icon className="w-7 h-7 text-scef-gold group-hover:text-scef-blue-dark transition-colors" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-scef-blue-dark mb-2">{area.title}</h3>
                    <p className="text-scef-grey text-sm mb-4">{area.desc}</p>
                    <p className="text-scef-gold font-bold text-sm">{area.beneficiaries}</p>
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
                  Our <span className="text-scef-gold">Initiatives</span>
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

          {/* Testimonials */}
          <section className="py-20 bg-scef-blue">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-gold/20 border-2 border-black text-scef-gold text-sm font-semibold mb-4">
                  <Star className="w-4 h-4" />
                  Success Stories
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                  Lives <span className="text-scef-gold">Transformed</span>
                </h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.name}
                    className="p-6 rounded-2xl bg-white border-2 border-black"
                  >
                    <Quote className="w-8 h-8 text-scef-gold mb-4" />
                    <p className="text-scef-grey text-sm mb-4">"{testimonial.story}"</p>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="font-display font-bold text-scef-blue-dark">{testimonial.name}</p>
                      <p className="text-scef-grey text-sm">{testimonial.country}</p>
                      <p className="text-scef-gold text-xs font-semibold mt-1">{testimonial.condition}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Video Section */}
          <ProgramVideoSection
            programName="Special Needs Education"
            videoUrl="https://www.youtube.com/embed/Hdu_qlFLfrQ"
            videoType="youtube"
            description="Learn about our inclusive education programs supporting learners with special needs across Africa."
          />

          {/* CTA */}
          <section className="py-24 bg-white">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-3xl mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-scef-gold border-2 border-black mb-6">
                  <Accessibility className="w-8 h-8 text-scef-blue-dark" />
                </div>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-scef-blue-dark mb-4">
                  Help Us Build an <span className="text-scef-gold">Inclusive Africa</span>
                </h2>
                <p className="text-scef-grey text-lg max-w-xl mx-auto mb-8">
                  Your support provides assistive technology, trains teachers, and creates accessible learning environments.
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

export default SpecialNeedsEducation;