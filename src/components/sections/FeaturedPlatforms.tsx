import { ExternalLink, BookOpen, Award, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const platforms = [
  {
    name: "eLibrary Nigeria",
    href: "https://www.elibrarynigeria.com.ng",
    description: "Nigeria's largest free digital library with over 90,000 e-books, research papers, and educational resources for students and educators.",
    icon: BookOpen,
    color: "#0000CD",
    localPage: "/programs/elibrary-nigeria"
  },
  {
    name: "NESA.africa",
    href: "https://nesa.africa",
    description: "The Nigerian Educational Scholarships & Awards platform celebrating excellence in African education through recognition and funding.",
    icon: Award,
    color: "#0000CD",
    localPage: "/programs/nesa-africa"
  },
  {
    name: "EduAid.africa",
    href: "https://eduaid.africa",
    description: "Emergency educational aid and support for underserved communities across Africa, providing resources, mentorship, and infrastructure.",
    icon: Heart,
    color: "#0000CD",
    localPage: "/programs/eduaid-africa"
  },
];

export const FeaturedPlatforms = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 border-y-2 border-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span 
            className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 border-2 border-black"
            style={{ backgroundColor: '#FFD700', color: '#0000CD' }}
          >
            Our Digital Platforms
          </span>
          <h2 className="font-['Abhaya_Libre'] text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0000CD' }}>
            Visit Our <span style={{ color: '#FFD700' }}>Partner Platforms</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access our specialized platforms designed to transform education across Africa.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {platforms.map((platform) => (
            <div 
              key={platform.name}
              className="bg-white rounded-xl p-6 border-2 border-black shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div 
                className="w-14 h-14 rounded-lg flex items-center justify-center mb-4 border-2 border-black"
                style={{ backgroundColor: '#0000CD' }}
              >
                <platform.icon className="w-7 h-7" style={{ color: '#FFD700' }} />
              </div>
              
              <h3 className="font-['Abhaya_Libre'] text-xl font-bold mb-2" style={{ color: '#0000CD' }}>
                {platform.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-6 flex-grow">
                {platform.description}
              </p>
              
              <div className="flex flex-col gap-2">
                <a
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold border-2 border-black transition-all duration-300 hover:shadow-md"
                  style={{ backgroundColor: '#FFD700', color: '#0000CD' }}
                >
                  Visit {platform.name.split('.')[0]}
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href={platform.localPage}
                  className="text-center text-sm hover:underline transition-colors"
                  style={{ color: '#0000CD' }}
                >
                  Learn more about this program →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};