import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";

export default function Index() {
  const flags = [
    { text: "🇺🇸", lang: "en", name: "English" },
    { text: "🇸🇦", lang: "ar", name: "Arabic" },
  ];
  const { i18n, t } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const { theme } = useTheme();
  const text = t("home.title");

  return (
    <ThemedView className="items-center justify-center flex-1">
      <ThemedText type="title" className="mb-4">
        {text}
      </ThemedText>
      <ThemedText type="subtitle" className="mb-2">
        {t("home.subtitle")}
      </ThemedText>
      <ThemedText className="mb-4">{t("home.description")}</ThemedText>
      <ThemedText>{t("home.currentTheme", { theme })}</ThemedText>
      <ThemeSwitcher />
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
    </ThemedView>
  );
}
