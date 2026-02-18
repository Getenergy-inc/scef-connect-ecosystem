import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Briefcase, MapPin, Clock, Mail, Calendar, ArrowRight, Building2 } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { emailDirectory } from "@/config/emailDirectory";
import { Link } from "react-router-dom";
import { format } from "date-fns";

interface Vacancy {
  id: string;
  title: string;
  department: string;
  location: string | null;
  employment_type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary_range: string | null;
  application_email: string | null;
  application_deadline: string | null;
  is_featured: boolean;
  created_at: string;
}

const Vacancies = () => {
  const { t } = useLocale();

  const { data: vacancies, isLoading } = useQuery({
    queryKey: ["vacancies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vacancies")
        .select("*")
        .eq("is_active", true)
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Vacancy[];
    },
  });

  const employmentTypeLabels: Record<string, string> = {
    "full-time": "Full-Time",
    "part-time": "Part-Time",
    "contract": "Contract",
    "internship": "Internship",
    "volunteer": "Volunteer",
  };

  return (
    <>
      <Helmet>
        <title>Join Our Team - Career Opportunities | SCEF</title>
        <meta 
          name="description" 
          content="Explore career opportunities at Santos Creations Educational Foundation. Join our team and make a difference in African education." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-20">
          {/* Hero */}
          <section className="bg-gradient-to-br from-scef-blue-darker to-scef-blue-dark text-white py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm mb-6">
                  <Briefcase className="w-4 h-4" />
                  Careers at SCEF
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                  Join Our <span className="text-scef-gold">Team</span>
                </h1>
                <p className="text-lg text-white/80 mb-6">
                  Be part of a mission-driven organization transforming education across Africa. 
                  We're looking for passionate individuals to join our team.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" asChild>
                    <a href={`mailto:${emailDirectory.hr}`}>
                      <Mail className="w-4 h-4" />
                      Contact HR
                    </a>
                  </Button>
                  <Button variant="heroOutline" asChild>
                    <a href={`mailto:${emailDirectory.internship}`}>
                      Internship Inquiries
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Vacancies List */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              {isLoading ? (
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <CardHeader>
                        <div className="h-6 bg-muted rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-1/2 mt-2" />
                      </CardHeader>
                      <CardContent>
                        <div className="h-20 bg-muted rounded" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : vacancies && vacancies.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                  {vacancies.map((vacancy) => (
                    <Card key={vacancy.id} className={`relative overflow-hidden group hover:shadow-lg transition-shadow ${vacancy.is_featured ? 'border-scef-gold' : ''}`}>
                      {vacancy.is_featured && (
                        <div className="absolute top-0 right-0 bg-scef-gold text-scef-blue-dark text-xs font-bold px-3 py-1 rounded-bl">
                          Featured
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <CardTitle className="text-xl group-hover:text-primary transition-colors">
                              {vacancy.title}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <Building2 className="w-4 h-4" />
                              {vacancy.department}
                            </CardDescription>
                          </div>
                          <Badge variant="outline">
                            {employmentTypeLabels[vacancy.employment_type] || vacancy.employment_type}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground line-clamp-3">
                          {vacancy.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          {vacancy.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {vacancy.location}
                            </span>
                          )}
                          {vacancy.application_deadline && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Deadline: {format(new Date(vacancy.application_deadline), "MMM d, yyyy")}
                            </span>
                          )}
                        </div>

                        {vacancy.salary_range && (
                          <p className="text-sm font-medium text-foreground">
                            Salary: {vacancy.salary_range}
                          </p>
                        )}

                        <Button className="w-full" asChild>
                          <a href={`mailto:${vacancy.application_email || emailDirectory.hr}?subject=Application for ${vacancy.title}`}>
                            Apply Now
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="max-w-2xl mx-auto text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                    <Briefcase className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    No Open Positions
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    We don't have any open positions at the moment, but we're always looking for talented individuals. 
                    Send your CV to our HR team for future opportunities.
                  </p>
                  <Button asChild>
                    <a href={`mailto:${emailDirectory.hr}?subject=General Application`}>
                      <Mail className="w-4 h-4" />
                      Submit Your CV
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* Why Join SCEF */}
          <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                  Why Join <span className="text-primary">SCEF</span>?
                </h2>
                <p className="text-muted-foreground mb-12">
                  Be part of an organization that's making a real difference in education across Africa.
                </p>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🌍</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Pan-African Impact</h3>
                    <p className="text-sm text-muted-foreground">
                      Work on initiatives that reach 54+ countries across Africa and the diaspora.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-terracotta/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📚</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Growth Opportunities</h3>
                    <p className="text-sm text-muted-foreground">
                      Professional development, training, and career advancement paths.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🤝</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Collaborative Culture</h3>
                    <p className="text-sm text-muted-foreground">
                      Join a diverse, passionate team committed to education transformation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Other Ways to Get Involved
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Not ready for a full position? Consider volunteering or becoming an ambassador.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" asChild>
                  <Link to="/get-involved">Volunteer</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/membership">Become a Member</Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href={`mailto:${emailDirectory.internship}`}>Internship Program</a>
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

export default Vacancies;
