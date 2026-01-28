import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | SCEF</title>
        <meta name="description" content="Santos Creations Educational Foundation terms of service and conditions of use." />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="font-display text-4xl font-bold text-foreground mb-8">
                Terms of Service
              </h1>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground mb-6">
                  Last updated: January 2025
                </p>
                
                <section className="mb-8">
                  <h2 className="font-display text-2xl font-semibold mb-4">Acceptance of Terms</h2>
                  <p className="text-muted-foreground mb-4">
                    By accessing and using the Santos Creations Educational Foundation website, 
                    you accept and agree to be bound by these Terms of Service.
                  </p>
                </section>
                
                <section className="mb-8">
                  <h2 className="font-display text-2xl font-semibold mb-4">Use of Services</h2>
                  <p className="text-muted-foreground mb-4">
                    You agree to use our services only for lawful purposes and in accordance 
                    with these Terms. You agree not to use our services in any way that could 
                    damage, disable, or impair our operations.
                  </p>
                </section>
                
                <section className="mb-8">
                  <h2 className="font-display text-2xl font-semibold mb-4">Donations</h2>
                  <p className="text-muted-foreground mb-4">
                    All donations made through our platform are voluntary and non-refundable 
                    unless otherwise stated. We provide receipts for all donations for tax purposes.
                  </p>
                </section>
                
                <section className="mb-8">
                  <h2 className="font-display text-2xl font-semibold mb-4">Intellectual Property</h2>
                  <p className="text-muted-foreground mb-4">
                    All content on this website, including text, graphics, logos, and images, 
                    is the property of SCEF and is protected by copyright and other intellectual 
                    property laws.
                  </p>
                </section>
                
                <section className="mb-8">
                  <h2 className="font-display text-2xl font-semibold mb-4">Contact</h2>
                  <p className="text-muted-foreground">
                    For questions about these Terms, contact us at{" "}
                    <a href="mailto:legal@santoscreations.org" className="text-primary hover:underline">
                      legal@santoscreations.org
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

export default Terms;
