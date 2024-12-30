import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import translationEn from "./locales/en/translation.json";
import translationAr from "./locales/ar/translation.json";

const resources = {
  en: { translation: translationEn },
  ar: { translation: translationAr },
};

const LANGUAGE_DETECTOR = {
  type: "languageDetector",
  async: true,
  detect: async (callback: (lng: string | readonly string[]) => void) => {
    try {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage) {
        return callback(savedLanguage);
      }

      // Get the device language
      const deviceLanguage = Localization.locale.split("-")[0];

      // Check if the device language is supported, otherwise use fallback
      const supportedLanguage = Object.keys(resources).includes(deviceLanguage)
        ? deviceLanguage
        : "en";

      await AsyncStorage.setItem("language", supportedLanguage);
      callback(supportedLanguage);
    } catch (error) {
      console.error("Error detecting language:", error);
      callback("en");
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      await AsyncStorage.setItem("language", lng);
    } catch (error) {
      console.error("Error caching language:", error);
    }
  },
};

i18n
  .use({
    type: "languageDetector",
    async: true,
    detect: LANGUAGE_DETECTOR.detect,
    init: LANGUAGE_DETECTOR.init,
    cacheUserLanguage: LANGUAGE_DETECTOR.cacheUserLanguage,
  })
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v4",
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
