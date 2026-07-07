import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import no from "./locales/no.json";
import es from "./locales/es.json";
import de from "./locales/de.json";
import fr from "./locales/fr.json";
import ar from "./locales/ar.json";

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "EN", name: "English", dir: "ltr" as const },
  { code: "no", label: "NO", name: "Norsk", dir: "ltr" as const },
  { code: "es", label: "ES", name: "Español", dir: "ltr" as const },
  { code: "de", label: "DE", name: "Deutsch", dir: "ltr" as const },
  { code: "fr", label: "FR", name: "Français", dir: "ltr" as const },
  { code: "ar", label: "AR", name: "العربية", dir: "rtl" as const },
] as const;

export const RTL_LANGUAGES = SUPPORTED_LANGUAGES.filter((l) => l.dir === "rtl").map((l) => l.code);

function applyDir(lang: string) {
  const isRtl = RTL_LANGUAGES.includes(lang as (typeof RTL_LANGUAGES)[number]);
  if (typeof document !== "undefined") {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      no: { translation: no },
      es: { translation: es },
      de: { translation: de },
      fr: { translation: fr },
      ar: { translation: ar },
    },
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGUAGES.map((l) => l.code),
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "visor-lang",
    },
  })
  .then(() => applyDir(i18n.resolvedLanguage ?? "en"));

i18n.on("languageChanged", (lng) => applyDir(lng));

export default i18n;
