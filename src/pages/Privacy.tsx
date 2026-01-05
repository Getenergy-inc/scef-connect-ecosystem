import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLocale } from "@/contexts/LocaleContext";

const Privacy = () => {
  const { t } = useLocale();

  return (
    <>
      <Helmet>
        <title>Privacy Policy | SCEF</title>
        <meta name="description" content="Privacy Policy for Santos Creations Educational Foundation" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-8">
          <section className="py-20 bg-scef-blue">
            <div className="container mx-auto px-4">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Privacy Policy
              </h1>
              <p className="text-white/80 text-lg">Last updated: January 2026</p>
            </div>
          </section>

          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="prose prose-lg max-w-none">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                <p className="text-muted-foreground mb-6">
                  Santos Creations Educational Foundation ("SCEF", "we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>

                <h2 className="font-display text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
                <p className="text-muted-foreground mb-6">
                  We collect information you provide directly to us, such as when you create an account, make a donation, register for programs, or contact us. This may include your name, email address, phone number, and payment information.
                </p>

                <h2 className="font-display text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground mb-6">
                  We use the information we collect to provide, maintain, and improve our services, process donations and transactions, communicate with you about our programs and initiatives, and comply with legal obligations.
                </p>

                <h2 className="font-display text-2xl font-bold text-foreground mb-4">4. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have questions about this Privacy Policy, please contact us at info@santoscreations.org
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

export default Privacy;
