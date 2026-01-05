import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Accessibility = () => {
  return (
    <>
      <Helmet>
        <title>Accessibility Statement | SCEF</title>
        <meta name="description" content="Accessibility Statement for Santos Creations Educational Foundation" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-8">
          <section className="py-20 bg-scef-blue">
            <div className="container mx-auto px-4">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Accessibility Statement
              </h1>
              <p className="text-white/80 text-lg">Our commitment to accessibility</p>
            </div>
          </section>

          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="prose prose-lg max-w-none">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Commitment</h2>
                <p className="text-muted-foreground mb-6">
                  Santos Creations Educational Foundation is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
                </p>

                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Conformance Status</h2>
                <p className="text-muted-foreground mb-6">
                  We strive to meet WCAG 2.1 Level AA standards across our website. Our website is designed to be compatible with assistive technologies such as screen readers.
                </p>

                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Accessibility Features</h2>
                <ul className="text-muted-foreground mb-6 list-disc pl-6 space-y-2">
                  <li>Clear navigation structure</li>
                  <li>Alternative text for images</li>
                  <li>High contrast color schemes</li>
                  <li>Keyboard navigation support</li>
                  <li>Resizable text</li>
                </ul>

                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Feedback</h2>
                <p className="text-muted-foreground">
                  We welcome your feedback on the accessibility of our website. Please contact us at info@santoscreations.org if you encounter accessibility barriers.
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

export default Accessibility;
