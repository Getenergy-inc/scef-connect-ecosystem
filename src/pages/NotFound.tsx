import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";
import { logger } from "@/lib/logger";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    logger.warn("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page Not Found | SCEF</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              {/* 404 Display */}
              <div className="relative mb-8">
                <h1 className="font-display text-[150px] md:text-[200px] font-bold text-muted/20 leading-none select-none">
                  404
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <Search className="w-12 h-12 text-primary" />
                  </div>
                </div>
              </div>
              
              {/* Message */}
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Page Not Found
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                The page you're looking for doesn't exist or has been moved. Let's get you back on track.
              </p>
              
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/">
                    <Home className="w-4 h-4 mr-2" />
                    Go to Homepage
                  </Link>
                </Button>
                <Button size="lg" variant="outline" onClick={() => window.history.back()}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
              </div>
              
              {/* Quick Links */}
              <div className="mt-12 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">Popular pages you might be looking for:</p>
                <div className="flex flex-wrap justify-center gap-4">
                  {[
                    { name: "About SCEF", href: "/about" },
                    { name: "Programs", href: "/programs" },
                    { name: "Local Chapters", href: "/chapters" },
                    { name: "Contact Us", href: "/contact" },
                  ].map((link) => (
                    <Link 
                      key={link.name}
                      to={link.href}
                      className="px-4 py-2 rounded-full bg-muted text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default NotFound;
