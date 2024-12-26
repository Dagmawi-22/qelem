import React, { createContext, useContext } from "react";
import { useColorScheme } from "nativewind";
import { Colors, ColorName } from "@/constants/Colors";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  getColor: (colorName: ColorName) => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const getColor = (colorName: ColorName) => {
    return Colors[colorScheme][colorName];
  };

  console.log("Current theme:", colorScheme);

  return (
    <ThemeContext.Provider
      value={{
        theme: colorScheme,
        toggleTheme: toggleColorScheme,
        getColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
