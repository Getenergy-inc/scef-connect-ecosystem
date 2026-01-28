import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Accessibility = () => {
  return (
    <>
      <Helmet>
        <title>Accessibility | SCEF</title>
        <meta name="description" content="Santos Creations Educational Foundation accessibility statement and commitment to inclusive design." />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="font-display text-4xl font-bold text-foreground mb-8">
                Accessibility Statement
              </h1>
              
              <div className="prose prose-lg max-w-none">
                <section className="mb-8">
                  <h2 className="font-display text-2xl font-semibold mb-4">Our Commitment</h2>
                  <p className="text-muted-foreground mb-4">
                    Santos Creations Educational Foundation is committed to ensuring digital 
                    accessibility for people with disabilities. We are continually improving 
                    the user experience for everyone and applying the relevant accessibility standards.
                  </p>
                </section>
                
                <section className="mb-8">
                  <h2 className="font-display text-2xl font-semibold mb-4">Standards</h2>
                  <p className="text-muted-foreground mb-4">
                    We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 
                    at Level AA. These guidelines explain how to make web content more accessible 
                    for people with disabilities.
                  </p>
                </section>
                
                <section className="mb-8">
                  <h2 className="font-display text-2xl font-semibold mb-4">Features</h2>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Semantic HTML structure for screen readers</li>
                    <li>Keyboard navigation support</li>
                    <li>Alt text for images</li>
                    <li>Sufficient color contrast</li>
                    <li>Resizable text</li>
                    <li>Multiple language support including RTL languages</li>
                  </ul>
                </section>
                
                <section className="mb-8">
                  <h2 className="font-display text-2xl font-semibold mb-4">Feedback</h2>
                  <p className="text-muted-foreground">
                    We welcome your feedback on the accessibility of our website. Please contact us at{" "}
                    <a href="mailto:accessibility@santoscreations.org" className="text-primary hover:underline">
                      accessibility@santoscreations.org
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

export default Accessibility;
