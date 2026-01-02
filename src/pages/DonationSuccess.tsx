import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Heart, Home, ArrowRight, Share2, Mail } from "lucide-react";

const DonationSuccess = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference") || searchParams.get("trxref");
  const amount = searchParams.get("amount");

  return (
    <>
      <Helmet>
        <title>Thank You for Your Donation | SCEF</title>
        <meta name="description" content="Thank you for your generous donation to Santos Creations Educational Foundation. Your support is transforming education across Africa." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-20">
          {/* Success Hero */}
          <section className="py-20 bg-gradient-to-br from-scef-blue to-scef-blue-dark">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                {/* Success Icon */}
                <div className="w-24 h-24 mx-auto rounded-full bg-green-500 flex items-center justify-center mb-8 animate-scale-in shadow-lg shadow-green-500/30">
                  <CheckCircle className="w-14 h-14 text-white" />
                </div>
                
                <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                  Thank You for Your <span className="text-scef-gold">Generosity!</span>
                </h1>
                
                <p className="text-xl text-white/80 mb-8">
                  Your donation has been received successfully. You are making a real difference in the lives of students across Africa.
                </p>

                {/* Transaction Details */}
                {(reference || amount) && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
                    <h2 className="text-white font-semibold mb-4">Transaction Details</h2>
                    <div className="space-y-2 text-white/80">
                      {reference && (
                        <p>
                          <span className="text-white/60">Reference:</span>{" "}
                          <span className="font-mono text-scef-gold">{reference}</span>
                        </p>
                      )}
                      {amount && (
                        <p>
                          <span className="text-white/60">Amount:</span>{" "}
                          <span className="font-semibold text-scef-gold">${amount}</span>
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    size="lg" 
                    className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-dark font-semibold border-2 border-black"
                    asChild
                  >
                    <Link to="/">
                      <Home className="w-5 h-5 mr-2" />
                      Return Home
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                    asChild
                  >
                    <Link to="/donate">
                      <Heart className="w-5 h-5 mr-2" />
                      Donate Again
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Impact Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                    Your Impact <span className="text-scef-gold">Matters</span>
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Here's how your donation helps transform education across Africa.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      value: "$25",
                      impact: "Provides textbooks for one student for a full academic year",
                    },
                    {
                      value: "$100",
                      impact: "Funds a scholarship for one student's school fees for a term",
                    },
                    {
                      value: "$500",
                      impact: "Helps rebuild a classroom and provides learning materials",
                    },
                  ].map((item) => (
                    <div
                      key={item.value}
                      className="bg-card rounded-xl p-6 border-2 border-border text-center hover:border-scef-blue/30 transition-all"
                    >
                      <p className="font-display text-3xl font-bold text-scef-blue mb-2">
                        {item.value}
                      </p>
                      <p className="text-muted-foreground text-sm">{item.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Share Section */}
          <section className="py-16 bg-scef-blue/5 border-y-2 border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Spread the Word
                </h2>
                <p className="text-muted-foreground mb-8">
                  Help us reach more donors by sharing your support on social media.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <a
                    href={`https://twitter.com/intent/tweet?text=I just donated to @SCEFoundation to support education across Africa! Join me in making a difference: https://santoscreations.org/donate`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#1DA1F2] text-white font-semibold hover:opacity-90 transition-opacity border-2 border-black"
                  >
                    <Share2 className="w-4 h-4" />
                    Share on Twitter
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://santoscreations.org/donate&quote=I just donated to Santos Creations Educational Foundation to support education across Africa!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#4267B2] text-white font-semibold hover:opacity-90 transition-opacity border-2 border-black"
                  >
                    <Share2 className="w-4 h-4" />
                    Share on Facebook
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Receipt Notice */}
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto bg-scef-gold/10 rounded-xl p-6 border-2 border-scef-gold/30 text-center">
                <Mail className="w-8 h-8 text-scef-gold mx-auto mb-4" />
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  Receipt & Tax Documentation
                </h3>
                <p className="text-muted-foreground text-sm">
                  A donation receipt has been sent to your email address. Please keep it for your records. 
                  All donations are tax-deductible where applicable.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Want to Do More?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Beyond donations, there are many ways to support our mission of transforming education across Africa.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button asChild className="bg-scef-blue hover:bg-scef-blue-dark text-white border-2 border-black">
                  <Link to="/membership">
                    Become a Member
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-2 border-black">
                  <Link to="/get-involved">
                    Volunteer With Us
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-2 border-black">
                  <Link to="/partners">
                    Partner With SCEF
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
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

export default DonationSuccess;
