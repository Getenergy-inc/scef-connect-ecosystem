import { Link } from "react-router-dom";
import { siteContent } from "@/config/siteContent";

export const ProgramsGrid = () => {
  const { programs } = siteContent.homepage;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-10">
          Our Programs
        </h2>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {programs.map((program) => (
            <Link
              key={program.id}
              to={program.href}
              className="group block"
            >
              {/* Card */}
              <div className="bg-card rounded-xl overflow-hidden border-2 border-black hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Title */}
                <div className="p-4">
                  <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {program.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
