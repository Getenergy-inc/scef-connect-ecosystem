import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | SCEF</title>
        <meta name="description" content="Terms of Service for Santos Creations Educational Foundation" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-8">
          <section className="py-20 bg-scef-blue">
            <div className="container mx-auto px-4">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Terms of Service
              </h1>
              <p className="text-white/80 text-lg">Last updated: January 2026</p>
            </div>
          </section>

          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="prose prose-lg max-w-none">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground mb-6">
                  By accessing and using the SCEF website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>

                <h2 className="font-display text-2xl font-bold text-foreground mb-4">2. Use of Services</h2>
                <p className="text-muted-foreground mb-6">
                  Our services are provided for educational and informational purposes. You agree to use our services only for lawful purposes and in accordance with these Terms.
                </p>

                <h2 className="font-display text-2xl font-bold text-foreground mb-4">3. Account Responsibilities</h2>
                <p className="text-muted-foreground mb-6">
                  If you create an account, you are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </p>

                <h2 className="font-display text-2xl font-bold text-foreground mb-4">4. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have questions about these Terms, please contact us at info@santoscreations.org
                </p>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Terms;
