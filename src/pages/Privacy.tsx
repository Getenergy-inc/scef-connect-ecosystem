import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | SCEF</title>
        <meta name="description" content="Santos Creations Educational Foundation privacy policy and data protection practices." />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="font-display text-4xl font-bold text-foreground mb-8">
                Privacy Policy
              </h1>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground mb-6">
                  Last updated: January 2025
                </p>
                
                <section className="mb-8">
                  <h2 className="font-display text-2xl font-semibold mb-4">Information We Collect</h2>
                  <p className="text-muted-foreground mb-4">
                    We collect information you provide directly to us, such as when you create an account, 
                    make a donation, sign up for our newsletter, or contact us for support.
                  </p>
                </section>
                
                <section className="mb-8">
                  <h2 className="font-display text-2xl font-semibold mb-4">How We Use Your Information</h2>
                  <p className="text-muted-foreground mb-4">
                    We use the information we collect to provide, maintain, and improve our services, 
                    process donations, send you updates about our programs, and respond to your inquiries.
                  </p>
                </section>
                
                <section className="mb-8">
                  <h2 className="font-display text-2xl font-semibold mb-4">Data Protection</h2>
                  <p className="text-muted-foreground mb-4">
                    We implement appropriate security measures to protect your personal information 
                    against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </section>
                
                <section className="mb-8">
                  <h2 className="font-display text-2xl font-semibold mb-4">Contact Us</h2>
                  <p className="text-muted-foreground">
                    If you have questions about this Privacy Policy, please contact us at{" "}
                    <a href="mailto:info@santoscreations.org" className="text-primary hover:underline">
                      info@santoscreations.org
                    </a>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Privacy;
