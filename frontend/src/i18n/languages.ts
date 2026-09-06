export const SUPPORTED_LANGUAGE_CODES = ["en", "hi", "ta", "ur"] as const;

export type SupportedLanguageCode =
  (typeof SUPPORTED_LANGUAGE_CODES)[number];

export interface LanguageOption {
  code: SupportedLanguageCode;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "ur", name: "Urdu", nativeName: "اردو" },
] as const satisfies readonly LanguageOption[];
