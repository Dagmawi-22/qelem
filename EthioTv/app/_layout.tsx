import { Stack } from "expo-router";
import "../global.css";
import { ThemeProvider, useTheme } from "@/hooks/useTheme";
import "@/i18n";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { useColorScheme } from "nativewind";
function RootLayoutContent() {
  const { theme } = useTheme();
  const {} = useColorScheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme === "dark" ? "rgb(21 23 24)" : "white",
        },
        headerTintColor:
          theme === "dark" ? "rgb(236 237 238)" : "rgb(17 24 28)",
        headerRight: () => <ThemeSwitcher />,
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
