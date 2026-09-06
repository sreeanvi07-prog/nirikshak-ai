import type { SupportedLanguageCode } from "./languages";

export const EN_TRANSLATIONS = {
  "common.language": "Language",
  "common.select_language": "Select language",
} as const;

export type TranslationKey = keyof typeof EN_TRANSLATIONS;
export type TranslationCatalog = Partial<Record<TranslationKey, string>>;

export const TRANSLATIONS: Record<
  SupportedLanguageCode,
  TranslationCatalog
> = {
  en: EN_TRANSLATIONS,
  hi: {
    "common.language": "भाषा",
    "common.select_language": "भाषा चुनें",
  },
  ta: {
    "common.language": "மொழி",
    "common.select_language": "மொழியைத் தேர்ந்தெடுக்கவும்",
  },
  ur: {
    "common.language": "زبان",
    "common.select_language": "زبان منتخب کریں",
  },
};

export function getTranslation(
  language: SupportedLanguageCode,
  key: TranslationKey,
  fallback: string,
): string {
  return TRANSLATIONS[language][key] ?? EN_TRANSLATIONS[key] ?? fallback;
}
