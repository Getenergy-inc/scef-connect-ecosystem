import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import en from '@/locales/en.json';
import fr from '@/locales/fr.json';
import ar from '@/locales/ar.json';
import sw from '@/locales/sw.json';
import pt from '@/locales/pt.json';

export type Locale = 'en' | 'fr' | 'ar' | 'sw' | 'pt';

const translations: Record<Locale, typeof en> = { en, fr, ar, sw, pt };

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
      value = value?.[k];
    }
    return typeof value === 'string' ? value : key;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, isRTL }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used within LocaleProvider');
  return context;
};
