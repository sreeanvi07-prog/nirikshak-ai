"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import {
  SUPPORTED_LANGUAGES,
  type LanguageOption,
  type SupportedLanguageCode,
} from "./languages";
import { getTranslation, type TranslationKey } from "./translations";

const STORAGE_KEY = "nirikshak_lang";
const DEFAULT_LANGUAGE: SupportedLanguageCode = "en";
const DEFAULT_LANGUAGE_OPTION: LanguageOption = SUPPORTED_LANGUAGES[0];

export interface LanguageContextValue {
  language: SupportedLanguageCode;
  setLanguage: (language: SupportedLanguageCode) => void;
  currentLanguage: LanguageOption;
  t: (key: TranslationKey, fallback: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isSupportedLanguage(
  value: string | null,
): value is SupportedLanguageCode {
  return SUPPORTED_LANGUAGES.some((language) => language.code === value);
}

function applyDocumentLanguage(language: SupportedLanguageCode) {
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ur" ? "rtl" : "ltr";
}

function getInitialLanguage(): SupportedLanguageCode {
  if (typeof document === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  return (
    getStoredLanguage() ??
    (isSupportedLanguage(document.documentElement.lang)
      ? document.documentElement.lang
      : DEFAULT_LANGUAGE)
  );
}

function getStoredLanguage(): SupportedLanguageCode | null {
  try {
    const storedLanguage = localStorage.getItem(STORAGE_KEY);
    return isSupportedLanguage(storedLanguage) ? storedLanguage : null;
  } catch {
    return null;
  }
}

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguageState] =
    useState<SupportedLanguageCode>(getInitialLanguage);

  useEffect(() => {
    applyDocumentLanguage(language);
  }, [language]);

  const setLanguage = useCallback((nextLanguage: SupportedLanguageCode) => {
    setLanguageState(nextLanguage);
    applyDocumentLanguage(nextLanguage);

    try {
      localStorage.setItem(STORAGE_KEY, nextLanguage);
    } catch {
      // Persisting a preference is best-effort.
    }
  }, []);

  const currentLanguage =
    SUPPORTED_LANGUAGES.find((option) => option.code === language) ??
    DEFAULT_LANGUAGE_OPTION;

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      currentLanguage,
      t: (key, fallback) => getTranslation(language, key, fallback),
    }),
    [currentLanguage, language, setLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider.");
  }

  return context;
}
