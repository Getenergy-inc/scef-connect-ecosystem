import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  BookOpen, 
  FileText, 
  Video, 
  Headphones,
  Download,
  Eye,
  Filter,
  X
} from "lucide-react";

type ResourceType = "ebook" | "journal" | "video" | "audio";

interface Resource {
  id: string;
  title: string;
  author: string;
  category: string;
  type: ResourceType;
  year: number;
  description: string;
  downloads: number;
}

const sampleResources: Resource[] = [
  {
    id: "1",
    title: "Introduction to Nigerian History",
    author: "Prof. Adebayo Adekunle",
    category: "African History",
    type: "ebook",
    year: 2023,
    description: "A comprehensive guide to Nigerian history from pre-colonial times to the present day.",
    downloads: 12500
  },
  {
    id: "2",
    title: "Mathematics for JAMB Success",
    author: "Dr. Chukwu Emmanuel",
    category: "Secondary Education",
    type: "ebook",
    year: 2024,
    description: "Complete JAMB mathematics preparation guide with solved examples and practice questions.",
    downloads: 45000
  },
  {
    id: "3",
    title: "Igbo Language and Culture",
    author: "Chief Nnamdi Azikiwe Jr.",
    category: "Nigerian Literature",
    type: "ebook",
    year: 2022,
    description: "Learn the rich traditions and language of the Igbo people of Nigeria.",
    downloads: 8900
  },
  {
    id: "4",
    title: "Modern Physics for Universities",
    author: "Dr. Fatima Hassan",
    category: "University Resources",
    type: "journal",
    year: 2024,
    description: "Advanced physics concepts for undergraduate and graduate students.",
    downloads: 15600
  },
  {
    id: "5",
    title: "English Literature: African Perspectives",
    author: "Prof. Wole Soyinka Foundation",
    category: "Nigerian Literature",
    type: "ebook",
    year: 2023,
    description: "Exploring African literary traditions and their influence on world literature.",
    downloads: 22000
  },
  {
    id: "6",
    title: "WAEC Chemistry Masterclass",
    author: "Excellence Education Team",
    category: "Secondary Education",
    type: "video",
    year: 2024,
    description: "Video tutorials covering all WAEC chemistry topics with practical demonstrations.",
    downloads: 38000
  },
  {
    id: "7",
    title: "Yoruba Folktales Collection",
    author: "Mama Iyalode Cultural Center",
    category: "Nigerian Literature",
    type: "audio",
    year: 2023,
    description: "Audio recordings of traditional Yoruba folktales for language learning.",
    downloads: 6700
  },
  {
    id: "8",
    title: "Basic Computer Skills for Teachers",
    author: "SCEF Digital Team",
    category: "Teacher Resources",
    type: "video",
    year: 2024,
    description: "Essential ICT skills training for primary and secondary school teachers.",
    downloads: 29000
  },
  {
    id: "9",
    title: "Agricultural Science Practicals",
    author: "Federal Ministry of Agriculture",
    category: "Vocational Training",
    type: "ebook",
    year: 2023,
    description: "Hands-on agricultural science guide for vocational students.",
    downloads: 11200
  },
  {
    id: "10",
    title: "Primary School Mathematics Workbook",
    author: "Mrs. Aisha Bello",
    category: "Primary Education",
    type: "ebook",
    year: 2024,
    description: "Fun and engaging mathematics exercises for primary school pupils.",
    downloads: 52000
  },
  {
    id: "11",
    title: "Nigerian Constitution Explained",
    author: "Law Faculty, University of Lagos",
    category: "University Resources",
    type: "journal",
    year: 2023,
    description: "An accessible breakdown of the Nigerian constitution for students and citizens.",
    downloads: 18500
  },
  {
    id: "12",
    title: "Hausa Language for Beginners",
    author: "Bayero University Kano",
    category: "Nigerian Literature",
    type: "audio",
    year: 2024,
    description: "Audio lessons for learning Hausa language from scratch.",
    downloads: 9800
  }
];

const categories = [
  "All Categories",
  "Primary Education",
  "Secondary Education", 
  "University Resources",
  "Professional Development",
  "Vocational Training",
  "Teacher Resources",
  "Nigerian Literature",
  "African History"
];

const resourceTypes = [
  { value: "all", label: "All Types", icon: Filter },
  { value: "ebook", label: "E-Books", icon: BookOpen },
  { value: "journal", label: "Journals", icon: FileText },
  { value: "video", label: "Videos", icon: Video },
  { value: "audio", label: "Audio", icon: Headphones }
];

const getTypeIcon = (type: ResourceType) => {
  switch (type) {
    case "ebook": return BookOpen;
    case "journal": return FileText;
    case "video": return Video;
    case "audio": return Headphones;
  }
};

export const ELibrarySearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedType, setSelectedType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredResources = useMemo(() => {
    return sampleResources.filter(resource => {
      const matchesSearch = searchQuery === "" || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "All Categories" || 
        resource.category === selectedCategory;
      
      const matchesType = selectedType === "all" || 
        resource.type === selectedType;
      
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [searchQuery, selectedCategory, selectedType]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSelectedType("all");
  };

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "All Categories" || selectedType !== "all";

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-['Abhaya_Libre'] text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0000CD' }}>
            Search <span className="text-[#FFD700]">Anything Nigeria</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Streamline your search for local and international content e-libraries.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search anything Nigeria..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-14 pr-32 text-lg border-2 border-black rounded-full focus:border-[#FFD700] focus:ring-[#FFD700]"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <Button
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-6 border-2 border-black font-semibold"
              style={{ backgroundColor: '#0000CD', color: 'white' }}
            >
              Search
            </Button>
          </div>
        </div>

        {/* Filter Toggle */}
        <div className="max-w-4xl mx-auto mb-6 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="border-2 border-[#0000CD] text-[#0000CD] hover:bg-[#0000CD] hover:text-white"
          >
            <Filter className="w-4 h-4 mr-2" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="ml-2 text-gray-500 hover:text-red-500"
            >
              <X className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="max-w-4xl mx-auto mb-8 p-6 bg-gray-50 rounded-xl border-2 border-black">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#0000CD' }}>
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-12 px-4 border-2 border-black rounded-lg focus:border-[#FFD700] focus:outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#0000CD' }}>
                  Resource Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {resourceTypes.map(type => (
                    <button
                      key={type.value}
                      onClick={() => setSelectedType(type.value)}
                      className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
                        selectedType === type.value
                          ? 'border-[#FFD700] bg-[#FFD700] text-black'
                          : 'border-gray-300 bg-white text-gray-600 hover:border-[#0000CD]'
                      }`}
                    >
                      <type.icon className="w-4 h-4 inline-block mr-1" />
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="max-w-4xl mx-auto mb-6">
          <p className="text-gray-600">
            Found <span className="font-bold" style={{ color: '#0000CD' }}>{filteredResources.length}</span> resources
            {hasActiveFilters && " matching your criteria"}
          </p>
        </div>

        {/* Results Grid */}
        <div className="max-w-4xl mx-auto">
          {filteredResources.length > 0 ? (
            <div className="space-y-4">
              {filteredResources.map(resource => {
                const TypeIcon = getTypeIcon(resource.type);
                return (
                  <div
                    key={resource.id}
                    className="bg-white p-6 rounded-xl border-2 border-black hover:border-[#FFD700] hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-black"
                        style={{ backgroundColor: '#0000CD' }}
                      >
                        <TypeIcon className="w-7 h-7 text-[#FFD700]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-['Abhaya_Libre'] text-xl font-bold mb-1" style={{ color: '#0000CD' }}>
                              {resource.title}
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">
                              by {resource.author} • {resource.year}
                            </p>
                          </div>
                          <span 
                            className="px-3 py-1 rounded-full text-xs font-semibold border-2 border-black flex-shrink-0"
                            style={{ backgroundColor: '#FFD700' }}
                          >
                            {resource.category}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {resource.description}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            {resource.downloads.toLocaleString()} downloads
                          </span>
                          <div className="flex gap-2 ml-auto">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-[#0000CD] text-[#0000CD] hover:bg-[#0000CD] hover:text-white"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Preview
                            </Button>
                            <Button
                              size="sm"
                              className="border-2 border-black"
                              style={{ backgroundColor: '#FFD700', color: '#000' }}
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">No resources found</h3>
              <p className="text-gray-400 mb-4">Try adjusting your search or filters</p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* External Link */}
        <div className="max-w-4xl mx-auto mt-8 text-center">
          <p className="text-sm text-gray-500">
            Looking for more resources? Visit the official{" "}
            <a 
              href="https://www.elibrarynigeria.com.ng" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#0000CD] hover:text-[#FFD700] font-semibold underline"
            >
              eLibrary Nigeria
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
