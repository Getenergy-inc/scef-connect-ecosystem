import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Map } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteMapGroups, totalPageCount } from "@/config/sitemapConfig";

const Sitemap = () => {
  return (
    <>
      <Helmet>
        <title>Sitemap — All Pages | SCEF</title>
        <meta
          name="description"
          content={`Browse all ${totalPageCount}+ pages of the Santos Creations Educational Foundation website — programs, awards, chapters, media, governance and more.`}
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          {/* Hero */}
          <section className="relative pt-28 pb-12 md:pt-32 md:pb-16 bg-scef-blue text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-scef-gold text-sm font-medium mb-5 border border-white/20">
                  <Map className="w-4 h-4" />
                  Website Sitemap
                </div>
                <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">
                  Every page on SCEF, in one place
                </h1>
                <p className="text-base md:text-lg text-white/80 leading-relaxed">
                  A complete index of {totalPageCount}+ pages across {siteMapGroups.length} sections —
                  about, programs, awards, chapters, media, governance, get-involved, and member tools.
                </p>
              </div>
            </div>
          </section>

          {/* Groups */}
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {siteMapGroups.map((group) => {
                  const Icon = group.icon;
                  return (
                    <div
                      key={group.title}
                      className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-scef-blue/10 text-scef-blue flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h2 className="font-display text-lg font-bold text-foreground">
                            {group.title}
                          </h2>
                          <p className="text-xs text-muted-foreground">
                            {group.links.length} pages
                          </p>
                        </div>
                      </div>

                      <ul className="space-y-1.5">
                        {group.links.map((link) => (
                          <li key={link.href}>
                            {link.external ? (
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 text-sm text-foreground/80 hover:text-scef-blue transition-colors py-1"
                              >
                                <span className="flex-1">{link.name}</span>
                                <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                              </a>
                            ) : (
                              <Link
                                to={link.href}
                                className="group flex items-center gap-2 text-sm text-foreground/80 hover:text-scef-blue transition-colors py-1"
                              >
                                <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:ml-0 group-hover:opacity-100 transition-all" />
                                <span className="flex-1">{link.name}</span>
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Sitemap;
