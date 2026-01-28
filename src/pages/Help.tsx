import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, Phone, MessageCircle, FileText, Users, Heart } from "lucide-react";
import { ROUTES } from "@/routes";

const faqs = [
  {
    question: "How can I become a member of SCEF?",
    answer: "You can join SCEF by visiting our Membership page and selecting the tier that best fits your needs. We offer General (free), Youth (free), Standard ($50/year), Organizational ($200/year), and Lifetime ($1,000 one-time) memberships."
  },
  {
    question: "How do I donate to SCEF?",
    answer: "You can make a donation through our secure donation page. We accept various payment methods including credit cards and bank transfers. All donations are tax-deductible."
  },
  {
    question: "How can I start a local chapter in my area?",
    answer: "To start a local chapter, visit our Local Chapters page and click on 'Start a Chapter'. You'll need to fill out an application form and meet certain requirements. Our team will guide you through the process."
  },
  {
    question: "What programs does SCEF run?",
    answer: "SCEF runs several programs including NESA-Africa (education awards), EduAid-Africa (scholarships), Rebuild My School Africa (infrastructure), Women & Girls Education, Special Needs Education, Education Online Africa, and eLibrary Nigeria."
  },
  {
    question: "How can I become an Ambassador?",
    answer: "Ambassadors are dedicated members who commit time to advancing our mission. You need to be a Standard or Lifetime member first, then apply for the Ambassador program. There are three tiers with different commitment levels."
  },
  {
    question: "How do I verify a NESA certificate?",
    answer: "Certificate verification can be done through our Certifications page. You'll need the certificate number and the awardee's name to verify authenticity."
  }
];

const Help = () => {
  return (
    <>
      <Helmet>
        <title>Help & FAQ | SCEF</title>
        <meta name="description" content="Get help and find answers to frequently asked questions about Santos Creations Educational Foundation." />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero */}
          <section className="bg-scef-blue py-16">
            <div className="container mx-auto px-4 text-center">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Help & Support
              </h1>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Find answers to common questions or get in touch with our team.
              </p>
            </div>
          </section>
          
          {/* Quick Links */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Users className="w-10 h-10 text-primary mx-auto mb-2" />
                    <CardTitle>Membership</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Learn about our membership tiers and benefits.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={ROUTES.MEMBERSHIP}>View Plans</Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Heart className="w-10 h-10 text-primary mx-auto mb-2" />
                    <CardTitle>Donations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Support our mission and make a difference.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={ROUTES.DONATE}>Donate Now</Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <FileText className="w-10 h-10 text-primary mx-auto mb-2" />
                    <CardTitle>Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Explore our educational initiatives.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={ROUTES.PROGRAMS}>View Programs</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl font-bold text-center mb-8">
                  Frequently Asked Questions
                </h2>
                
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>
          
          {/* Contact Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl font-bold mb-4">
                Still Need Help?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Our support team is here to assist you. Reach out through any of these channels.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <a href="mailto:support@santoscreations.org">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Support
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to={ROUTES.CONTACT}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Form
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:+2348056677770">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Us
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Help;
