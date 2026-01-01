import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  GraduationCap, BookOpen, Heart, Users, 
  ArrowRight, CheckCircle, Target, Wallet, HandHeart,
  Globe, Award, TrendingUp, School, Library, 
  UserCheck, Lightbulb, MapPin, Phone, Mail,
  ExternalLink, Play, Star, Quote, ChevronDown
} from "lucide-react";

const scholarshipTypes = [
  { 
    name: "Merit Scholarships", 
    desc: "Recognizing outstanding academic performers with full tuition coverage",
    amount: "Up to $5,000/year",
    icon: Award,
    features: ["Full tuition", "Book allowance", "Mentorship"],
  },
  { 
    name: "Need-Based Grants", 
    desc: "Supporting students from economically disadvantaged backgrounds",
    amount: "Variable support",
    icon: Heart,
    features: ["Flexible funding", "Emergency support", "Family assistance"],
  },
  { 
    name: "Girls in Education", 
    desc: "Empowering female students to break barriers in education",
    amount: "Up to $3,000/year",
    icon: Users,
    features: ["STEM focus", "Leadership training", "Career guidance"],
  },
  { 
    name: "STEM Excellence", 
    desc: "Promoting science, technology, engineering and mathematics",
    amount: "Up to $4,000/year",
    icon: Target,
    features: ["Lab access", "Research grants", "Tech resources"],
  },
  { 
    name: "Community Champions", 
    desc: "For students making significant community impact",
    amount: "Up to $2,500/year",
    icon: Globe,
    features: ["Project funding", "Volunteer support", "Recognition"],
  },
  { 
    name: "Special Needs Support", 
    desc: "Inclusive education funding for students with disabilities",
    amount: "Customized support",
    icon: UserCheck,
    features: ["Accessible resources", "Personal aide", "Therapy support"],
  },
];

const impactStats = [
  { value: "15,000+", label: "Scholarships Awarded", icon: GraduationCap },
  { value: "$2.5M+", label: "Funding Distributed", icon: Wallet },
  { value: "32", label: "African Countries", icon: MapPin },
  { value: "94%", label: "Graduation Rate", icon: TrendingUp },
];

const howItWorks = [
  { 
    step: "01", 
    title: "Apply Online", 
    desc: "Complete our comprehensive application form with your academic records, financial information, and personal statement.",
    icon: BookOpen,
  },
  { 
    step: "02", 
    title: "Document Review", 
    desc: "Our scholarship committee carefully evaluates all applications based on merit, need, and community involvement.",
    icon: CheckCircle,
  },
  { 
    step: "03", 
    title: "Interview & Selection", 
    desc: "Shortlisted candidates participate in interviews to assess their potential and commitment to education.",
    icon: UserCheck,
  },
  { 
    step: "04", 
    title: "Award & Disbursement", 
    desc: "Selected students receive funding directly to their educational institutions for maximum transparency.",
    icon: Award,
  },
  { 
    step: "05", 
    title: "Ongoing Support", 
    desc: "Continue receiving mentorship, career guidance, and resources throughout your educational journey.",
    icon: Heart,
  },
];

const testimonials = [
  {
    name: "Amara Okonkwo",
    country: "Nigeria",
    role: "Medical Student",
    quote: "EduAid changed my life. I was about to drop out when I received the scholarship. Now I'm in my final year of medical school.",
    image: null,
  },
  {
    name: "Jean-Pierre Habimana",
    country: "Rwanda",
    role: "Engineering Graduate",
    quote: "The mentorship I received was invaluable. My mentor helped me secure an internship that led to my current job.",
    image: null,
  },
  {
    name: "Fatima El-Amin",
    country: "Sudan",
    role: "PhD Candidate",
    quote: "As a girl from a rural village, I never dreamed of higher education. EduAid made the impossible possible.",
    image: null,
  },
];

const partners = [
  "African Development Bank",
  "UNESCO Education",
  "World Bank Education",
  "African Union",
  "UNICEF Africa",
  "British Council",
];

const programGoals = [
  {
    title: "Universal Access",
    desc: "Ensure every talented African student can access quality education regardless of economic status.",
    icon: Globe,
  },
  {
    title: "Gender Equity",
    desc: "Close the education gap by supporting more girls and women in their educational pursuits.",
    icon: Users,
  },
  {
    title: "STEM Advancement",
    desc: "Prepare Africa's youth for the future economy through science and technology education.",
    icon: Lightbulb,
  },
  {
    title: "Community Development",
    desc: "Create a ripple effect by educating leaders who will transform their communities.",
    icon: TrendingUp,
  },
];

const EduAidAfrica = () => {
  return (
    <>
      <Helmet>
        <title>EduAid Africa – Santos Creations Educational Foundation</title>
        <meta 
          name="description" 
          content="EduAid-Africa provides scholarships and educational funding to students across Africa, breaking financial barriers to quality education. Apply now or donate to transform lives." 
        />
        <meta property="og:title" content="EduAid Africa – SCEF Scholarships & Educational Funding" />
        <meta property="og:description" content="Breaking financial barriers to education across Africa. Providing scholarships, grants, and learning resources to students who need it most." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="keywords" content="Africa scholarships, education funding, SCEF, EduAid, student grants, African education, merit scholarships, girls education Africa" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="relative pt-32 pb-28 bg-scef-blue overflow-hidden" aria-label="Hero">
            {/* Decorative Elements */}
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
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-scef-gold/20 border-2 border-black text-scef-gold text-sm font-semibold mb-8 animate-fade-up">
                  <GraduationCap className="w-5 h-5" />
                  <span>SCEF Flagship Program</span>
                </div>
                
                {/* Main Heading */}
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                  EduAid <span className="text-scef-gold">Africa</span>
                </h1>
                
                {/* Subheading */}
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
                  Breaking financial barriers to education. Providing scholarships, grants, and learning resources to students who need it most across the African continent.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
                  <Button 
                    size="xl" 
                    className="bg-scef-gold text-scef-blue-dark hover:bg-scef-gold-hover font-bold border-2 border-black shadow-lg hover:shadow-xl transition-all"
                  >
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Apply for Scholarship
                  </Button>
                  <Button 
                    size="xl" 
                    className="bg-transparent border-2 border-scef-gold text-scef-gold hover:bg-scef-gold/10 font-bold" 
                    asChild
                  >
                    <Link to="/donate">
                      <HandHeart className="w-5 h-5 mr-2" />
                      Fund a Student
                    </Link>
                  </Button>
                </div>
                
                {/* Quick Stats */}
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
                
                {/* Scroll Indicator */}
                <div className="mt-12 animate-bounce">
                  <ChevronDown className="w-8 h-8 text-scef-gold/60 mx-auto" />
                </div>
              </div>
            </div>
          </section>

          {/* Mission Statement */}
          <section className="py-20 bg-white" aria-label="Mission">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-scef-blue border-2 border-black mb-6">
                  <Lightbulb className="w-8 h-8 text-scef-gold" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-dark mb-6">
                  Our <span className="text-scef-gold">Mission</span>
                </h2>
                <p className="text-lg text-scef-grey leading-relaxed">
                  EduAid-Africa exists to ensure that no talented African student is denied access to quality education due to financial constraints. 
                  We believe education is the most powerful tool for breaking the cycle of poverty and building prosperous communities. 
                  Through strategic partnerships, transparent funding, and comprehensive support systems, we are transforming lives across the continent.
                </p>
              </div>
            </div>
          </section>

          {/* Program Goals */}
          <section className="py-20 bg-gray-50" aria-label="Goals">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-dark mb-4">
                  Program <span className="text-scef-gold">Goals</span>
                </h2>
                <p className="text-scef-grey max-w-2xl mx-auto">
                  Strategic objectives driving our mission to transform African education.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {programGoals.map((goal) => (
                  <div 
                    key={goal.title}
                    className="p-6 rounded-2xl bg-white border-2 border-black hover:shadow-lg transition-all group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-scef-blue border-2 border-black flex items-center justify-center mb-4 group-hover:bg-scef-gold transition-colors">
                      <goal.icon className="w-7 h-7 text-scef-gold group-hover:text-scef-blue-dark transition-colors" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-scef-blue-dark mb-2">{goal.title}</h3>
                    <p className="text-scef-grey text-sm">{goal.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About Section with Impact */}
          <section className="py-20 bg-white" aria-label="About">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-gold/20 border-2 border-black text-scef-blue-dark text-sm font-semibold mb-6">
                    <BookOpen className="w-4 h-4" />
                    Why EduAid Matters
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-dark mb-6">
                    Education Should Not Be a <span className="text-scef-gold">Privilege</span>
                  </h2>
                  <p className="text-scef-grey text-lg leading-relaxed mb-6">
                    Millions of talented African students are denied access to quality education due to financial constraints. 
                    EduAid-Africa exists to change that reality, one scholarship at a time.
                  </p>
                  <p className="text-scef-grey leading-relaxed mb-8">
                    Through scholarships, grants, learning materials, and mentorship, we ensure that no deserving student is left behind 
                    because of their economic circumstances. Our holistic approach supports students from primary school through university and beyond.
                  </p>
                  <div className="space-y-4">
                    {[
                      "Full and partial scholarships available year-round",
                      "Support from primary through university education",
                      "Comprehensive mentorship and career guidance",
                      "Learning materials, technology, and resources provided",
                      "Alumni network for lifelong professional support",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-scef-gold border-2 border-black flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-scef-blue-dark" />
                        </div>
                        <span className="text-scef-blue-dark font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Donation Impact Card */}
                <div className="relative">
                  <div className="bg-scef-blue rounded-3xl p-8 border-2 border-black shadow-lg">
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 mx-auto rounded-full bg-scef-gold border-2 border-black flex items-center justify-center mb-4">
                        <Heart className="w-10 h-10 text-scef-blue-dark" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-white mb-2">Your Impact</h3>
                      <p className="text-white/80">Every donation transforms a life</p>
                    </div>
                    <div className="space-y-4">
                      {[
                        { amount: "$50", impact: "Textbooks for 1 full academic year" },
                        { amount: "$150", impact: "School supplies & uniform package" },
                        { amount: "$500", impact: "Complete term fees & materials" },
                        { amount: "$1,000", impact: "Full year scholarship for one student" },
                        { amount: "$5,000", impact: "University tuition for one year" },
                      ].map((item) => (
                        <div 
                          key={item.amount} 
                          className="flex justify-between items-center p-4 bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
                        >
                          <span className="text-scef-gold font-bold text-lg">{item.amount}</span>
                          <span className="text-white/90 text-sm">{item.impact}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      className="w-full mt-6 bg-scef-gold text-scef-blue-dark hover:bg-scef-gold-hover font-bold border-2 border-black" 
                      size="lg"
                      asChild
                    >
                      <Link to="/donate">
                        <HandHeart className="w-5 h-5 mr-2" />
                        Donate Now
                      </Link>
                    </Button>
                  </div>
                  
                  {/* Decorative Badge */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-scef-gold border-2 border-black flex items-center justify-center shadow-lg">
                    <div className="text-center">
                      <p className="text-scef-blue-dark font-bold text-xs">100%</p>
                      <p className="text-scef-blue-dark text-[10px]">To Students</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Scholarship Types */}
          <section className="py-20 bg-gray-50" aria-label="Scholarships">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-blue border-2 border-black text-scef-gold text-sm font-semibold mb-4">
                  <Award className="w-4 h-4" />
                  Funding Opportunities
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-dark mb-4">
                  Scholarship <span className="text-scef-gold">Programs</span>
                </h2>
                <p className="text-scef-grey max-w-2xl mx-auto">
                  Multiple scholarship tracks designed to meet different needs, aspirations, and circumstances across the African continent.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {scholarshipTypes.map((scholarship) => (
                  <div 
                    key={scholarship.name}
                    className="p-6 rounded-2xl bg-white border-2 border-black hover:border-scef-gold hover:shadow-lg transition-all group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-scef-gold/20 border-2 border-black flex items-center justify-center mb-4 group-hover:bg-scef-gold transition-colors">
                      <scholarship.icon className="w-7 h-7 text-scef-blue group-hover:text-scef-blue-dark transition-colors" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-scef-blue-dark mb-2">{scholarship.name}</h3>
                    <p className="text-scef-grey text-sm mb-4">{scholarship.desc}</p>
                    <p className="text-scef-gold font-bold text-lg mb-4">{scholarship.amount}</p>
                    <div className="space-y-2 pt-4 border-t border-gray-200">
                      {scholarship.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-scef-grey">
                          <CheckCircle className="w-4 h-4 text-scef-gold" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-10">
                <Button 
                  size="lg" 
                  className="bg-scef-blue text-white hover:bg-scef-blue-light font-bold border-2 border-black"
                >
                  <GraduationCap className="w-5 h-5 mr-2" />
                  View All Scholarships
                </Button>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-20 bg-white" aria-label="Process">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-gold/20 border-2 border-black text-scef-blue-dark text-sm font-semibold mb-4">
                  <Target className="w-4 h-4" />
                  Application Process
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-dark mb-4">
                  How It <span className="text-scef-gold">Works</span>
                </h2>
                <p className="text-scef-grey max-w-2xl mx-auto">
                  A simple, transparent process from application to graduation support.
                </p>
              </div>
              
              <div className="max-w-5xl mx-auto">
                <div className="relative">
                  {/* Connection Line */}
                  <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-scef-gold/30" style={{ marginLeft: '10%', marginRight: '10%' }} />
                  
                  <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {howItWorks.map((item, index) => (
                      <div key={item.step} className="relative text-center group">
                        {/* Step Number */}
                        <div className="w-20 h-20 mx-auto rounded-full bg-scef-blue border-2 border-black flex items-center justify-center font-display text-2xl font-bold text-scef-gold mb-4 group-hover:bg-scef-gold group-hover:text-scef-blue-dark transition-all shadow-lg relative z-10">
                          {item.step}
                        </div>
                        
                        {/* Content */}
                        <div className="p-4 rounded-xl bg-gray-50 border-2 border-black">
                          <item.icon className="w-6 h-6 text-scef-gold mx-auto mb-2" />
                          <h3 className="font-display font-bold text-scef-blue-dark mb-2">{item.title}</h3>
                          <p className="text-scef-grey text-xs">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-20 bg-scef-blue" aria-label="Testimonials">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-gold/20 border-2 border-black text-scef-gold text-sm font-semibold mb-4">
                  <Star className="w-4 h-4" />
                  Success Stories
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                  Voices of <span className="text-scef-gold">Impact</span>
                </h2>
                <p className="text-white/80 max-w-2xl mx-auto">
                  Hear from students whose lives have been transformed by EduAid scholarships.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.name}
                    className="p-6 rounded-2xl bg-white border-2 border-black"
                  >
                    <Quote className="w-8 h-8 text-scef-gold mb-4" />
                    <p className="text-scef-grey italic mb-6">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-scef-gold/20 border-2 border-black flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-scef-blue" />
                      </div>
                      <div>
                        <p className="font-display font-bold text-scef-blue-dark">{testimonial.name}</p>
                        <p className="text-scef-grey text-sm">{testimonial.role} • {testimonial.country}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Partners Section */}
          <section className="py-16 bg-gray-50" aria-label="Partners">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <p className="text-scef-grey font-medium mb-6">Trusted by Leading Organizations</p>
                <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                  {partners.map((partner) => (
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

          {/* CTA Section */}
          <section className="py-24 bg-scef-blue relative overflow-hidden" aria-label="Call to Action">
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-scef-gold rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-scef-gold rounded-full blur-3xl" />
            </div>
            
            <div className="container mx-auto px-4 text-center relative z-10">
              <div className="max-w-3xl mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-scef-gold border-2 border-black mb-6">
                  <GraduationCap className="w-8 h-8 text-scef-blue-dark" />
                </div>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
                  Ready to Transform Your <span className="text-scef-gold">Future</span>?
                </h2>
                <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
                  Applications are open year-round. Take the first step toward achieving your educational dreams today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="xl" 
                    className="bg-scef-gold text-scef-blue-dark hover:bg-scef-gold-hover font-bold border-2 border-black shadow-lg"
                  >
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Apply for Scholarship
                  </Button>
                  <Button 
                    size="xl" 
                    className="bg-transparent border-2 border-scef-gold text-scef-gold hover:bg-scef-gold/10 font-bold" 
                    asChild
                  >
                    <Link to="/contact">
                      <Mail className="w-5 h-5 mr-2" />
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation Links */}
          <section className="py-8 bg-gray-100 border-t-2 border-black" aria-label="Navigation">
            <div className="container mx-auto px-4">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
                <Link 
                  to="/" 
                  className="flex items-center gap-2 text-scef-blue hover:text-scef-gold transition-colors font-medium"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Return to SCEF Homepage
                </Link>
                <span className="text-scef-grey hidden sm:inline">•</span>
                <a 
                  href="https://edu-aid-chi.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-scef-grey hover:text-scef-blue transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Original EduAid Site
                </a>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default EduAidAfrica;