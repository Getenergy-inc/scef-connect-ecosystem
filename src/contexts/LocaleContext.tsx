import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import en from '@/locales/en.json';
import fr from '@/locales/fr.json';
import ar from '@/locales/ar.json';
import sw from '@/locales/sw.json';
import pt from '@/locales/pt.json';
import es from '@/locales/es.json';
import de from '@/locales/de.json';
import ru from '@/locales/ru.json';
import zh from '@/locales/zh.json';

export type Locale = 'en' | 'fr' | 'ar' | 'sw' | 'pt' | 'es' | 'de' | 'ru' | 'zh';

// Using Record with any to allow for slight translation mismatches during development
const translations: Record<Locale, Record<string, any>> = { en, fr, ar, sw, pt, es, de, ru, zh };

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('scef-locale');
      return (saved as Locale) || 'en';
    }
    return 'en';
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('scef-locale', newLocale);
  };

  const isRTL = locale === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
  }, [locale, isRTL]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale];
    for (const k of keys) {
      // Handle both object keys and array indices
      if (Array.isArray(value) && !isNaN(Number(k))) {
        value = value[Number(k)];
      } else {
        value = value?.[k];
      }
    }
    return typeof value === 'string' ? value : key;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, isRTL }}>
      {children}
    </LocaleContext.Provider>
  );
};

// Default context for when LocaleProvider hasn't mounted yet (prevents HMR issues)
const defaultContext: LocaleContextType = {
  locale: 'en',
  setLocale: () => {},
  t: (key: string) => key,
  isRTL: false,
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  // Return default context during initial render / HMR to prevent crashes
  return context ?? defaultContext;
};
