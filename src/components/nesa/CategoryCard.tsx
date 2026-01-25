import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CategoryTierBadges } from "./CategoryTierBadge";
import { 
  Globe, 
  Building2, 
  Landmark, 
  Award,
  ChevronRight,
  Layers
} from "lucide-react";
import type { NESACategory } from "@/config/nesaCategoriesConfig";
import { formatScope } from "@/config/nesaCategoriesConfig";

interface CategoryCardProps {
  category: NESACategory;
  showSubcategoryPreview?: boolean;
}

const scopeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  NIGERIA: Building2,
  AFRICA_REGIONAL: Globe,
  INTERNATIONAL: Landmark,
  ICON: Award,
};

export function CategoryCard({ category, showSubcategoryPreview = true }: CategoryCardProps) {
  const ScopeIcon = scopeIcons[category.scope] || Globe;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:border-scef-gold/50 h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded">
              #{category.categoryNumber}
            </span>
            <CategoryTierBadges tiers={category.tiers} />
          </div>
          <Badge variant="outline" className="text-xs shrink-0">
            <ScopeIcon className="w-3 h-3 mr-1" />
            {formatScope(category.scope)}
          </Badge>
        </div>
        <CardTitle className="text-lg leading-tight mt-3 group-hover:text-scef-gold transition-colors">
          {category.name}
        </CardTitle>
        <CardDescription className="text-sm line-clamp-2">
          {category.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col justify-between pt-0">
        <div className="space-y-3">
          {/* Subcategory count */}
          <div className="flex items-center gap-2 text-sm">
            <Layers className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{category.totalSubcategoryCount} Subcategories</span>
            {category.isRegional && (
              <Badge variant="secondary" className="text-xs">
                5 Regions
              </Badge>
            )}
          </div>

          {/* Subcategory preview */}
          {showSubcategoryPreview && category.baseSubcategories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {category.baseSubcategories.slice(0, 3).map(sub => (
                <Badge key={sub.id} variant="outline" className="text-xs bg-muted/50">
                  {sub.name}
                </Badge>
              ))}
              {category.baseSubcategories.length > 3 && (
                <Badge variant="outline" className="text-xs bg-muted/50">
                  +{category.baseSubcategories.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Action button */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="mt-4 w-full justify-between group-hover:bg-scef-gold/10 group-hover:text-scef-gold"
          asChild
        >
          <Link to={`/categories/${category.slug}`}>
            View Details
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
