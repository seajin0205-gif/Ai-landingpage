"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { copy, type Copy, type Locale } from "@/lib/copy";

const LocaleContext = createContext<Locale>("ko");

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}

export function useCopy(): Copy {
  return copy[useContext(LocaleContext)];
}
