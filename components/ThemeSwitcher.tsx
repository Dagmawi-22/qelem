import React from "react";
import { TouchableOpacity } from "react-native";
import { useColorScheme } from "nativewind";
import { Ionicons } from "@expo/vector-icons";

export function ThemeSwitcher() {
  const { colorScheme, setColorScheme } = useColorScheme();

  const toggleTheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <TouchableOpacity
      className="px-4 py-2 rounded-full bg-tint"
      onPress={toggleTheme}
    >
      {colorScheme === "light" ? (
        <Ionicons name="moon" size={24} color="black" />
      ) : (
        <Ionicons name="sunny" size={24} color="yellow" />
      )}
    </TouchableOpacity>
  );
}
