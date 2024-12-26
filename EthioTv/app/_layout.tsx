import { Stack } from "expo-router";
import "../global.css";
import { ThemeProvider, useTheme } from "@/hooks/useTheme";
import "@/i18n";

function RootLayoutContent() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme === "light" ? "white" : "rgb(21 23 24)",
        },
        headerTintColor:
          theme === "light" ? "rgb(17 24 28)" : "rgb(236 237 238)",
      }}
    />
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}
