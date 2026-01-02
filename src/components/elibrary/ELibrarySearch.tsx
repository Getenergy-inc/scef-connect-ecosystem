import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
  X,
  Loader2
} from "lucide-react";

type ResourceType = "ebook" | "journal" | "video" | "audio";

interface Resource {
  id: string;
  title: string;
  author: string;
  category: string;
  resource_type: ResourceType;
  description: string | null;
  download_count: number | null;
  cover_url: string | null;
  resource_url: string | null;
}

const categories = [
  "All Categories",
  "Literature",
  "History",
  "Language",
  "Agriculture",
  "Education",
  "Law",
  "Health",
  "Economics",
  "Culture",
  "Arts",
  "Science"
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

  const { data: resources = [], isLoading } = useQuery({
    queryKey: ['elibrary-resources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('elibrary_resources')
        .select('*')
        .eq('is_published', true)
        .order('title');
      
      if (error) throw error;
      return data as Resource[];
    }
  });

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = searchQuery === "" || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (resource.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      
      const matchesCategory = selectedCategory === "All Categories" || 
        resource.category === selectedCategory;
      
      const matchesType = selectedType === "all" || 
        resource.resource_type === selectedType;
      
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [resources, searchQuery, selectedCategory, selectedType]);

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
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading resources...
              </span>
            ) : (
              <>
                Found <span className="font-bold" style={{ color: '#0000CD' }}>{filteredResources.length}</span> resources
                {hasActiveFilters && " matching your criteria"}
              </>
            )}
          </p>
        </div>

        {/* Results Grid */}
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-[#0000CD] mx-auto mb-4" />
              <p className="text-gray-500">Loading resources...</p>
            </div>
          ) : filteredResources.length > 0 ? (
            <div className="space-y-4">
              {filteredResources.map(resource => {
                const TypeIcon = getTypeIcon(resource.resource_type);
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
                              by {resource.author}
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
                            {(resource.download_count ?? 0).toLocaleString()} downloads
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
