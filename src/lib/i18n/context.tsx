"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import es from "./es";
import en from "./en";
import type { Dictionary } from "./types";

type Lang = "es" | "en";

interface I18nContextType {
  lang: Lang;
  t: Dictionary;
  toggleLang: () => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

const dicts: Record<Lang, Dictionary> = { es, en };

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored === "es" || stored === "en") setLang(stored);
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === "es" ? "en" : "es";
      localStorage.setItem("lang", next);
      return next;
    });
  }, []);

  return (
    <I18nContext.Provider value={{ lang, t: dicts[lang], toggleLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
