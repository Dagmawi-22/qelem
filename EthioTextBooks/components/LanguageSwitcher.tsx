import React from "react";
import { TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

const flags = [
  { text: "🇺🇸", lang: "en", name: "English" },
  { text: "🇸🇦", lang: "ar", name: "Arabic" },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <ThemedView className="flex-row mt-4">
      {flags.map(({ text, lang, name }) => (
        <TouchableOpacity
          key={name}
          onPress={() => changeLanguage(lang)}
          className={`p-2.5 mx-1 rounded ${
            i18n.language === lang
              ? "bg-blue-200 dark:bg-blue-800"
              : "bg-transparent"
          }`}
        >
          <ThemedText className="text-2xl">{text}</ThemedText>
        </TouchableOpacity>
      ))}
    </ThemedView>
  );
}
