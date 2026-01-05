import { useLocale, localeList, Locale } from "@/contexts/LocaleContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LanguageSwitcherProps {
  variant?: 'header' | 'footer' | 'inline';
  className?: string;
}

export const LanguageSwitcher = ({ variant = 'header', className }: LanguageSwitcherProps) => {
  const { locale, setLocale } = useLocale();

  if (variant === 'inline') {
    return (
      <div className={cn("flex items-center gap-1 text-sm", className)}>
        {localeList.map((lang, index) => (
          <span key={lang.code} className="flex items-center">
            <button
              onClick={() => setLocale(lang.code)}
              className={cn(
                "px-2 py-1 rounded transition-colors",
                locale === lang.code 
                  ? "text-scef-gold font-semibold" 
                  : "text-white/70 hover:text-scef-gold"
              )}
            >
              {lang.name}
            </button>
            {index < localeList.length - 1 && (
              <span className="text-white/30">|</span>
            )}
          </span>
        ))}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "flex items-center gap-1.5",
            variant === 'header' 
              ? "text-white hover:text-scef-gold hover:bg-white/10" 
              : "text-white/70 hover:text-scef-gold",
            className
          )}
        >
          <Globe className="w-4 h-4" />
          <span className="font-medium">{locale.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        {localeList.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLocale(lang.code)}
            className={cn(
              "cursor-pointer",
              locale === lang.code && "bg-scef-gold/10 text-scef-blue font-semibold"
            )}
          >
            <span className="w-8 font-medium">{lang.name}</span>
            <span className="text-muted-foreground text-xs ml-auto">
              {lang.code === 'en' && 'English'}
              {lang.code === 'fr' && 'Français'}
              {lang.code === 'ar' && 'العربية'}
              {lang.code === 'sw' && 'Kiswahili'}
              {lang.code === 'pt' && 'Português'}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
