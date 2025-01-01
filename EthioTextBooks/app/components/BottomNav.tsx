// components/BottomNav.tsx
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";

// Define the type for a tab
type Tab = {
  id: string;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

const BottomNav = () => {
  const router = useRouter();

  // Define the tabs
  const tabs: Tab[] = [
    { id: "books", label: "Books", icon: "book" },
    { id: "bookmarks", label: "Bookmarks", icon: "bookmark" },
    { id: "notes", label: "Notes", icon: "note" },
  ];

  // Handle tab press
  const handleTabPress = (tab: Tab) => {
    const path = `/${tab.id}` as Href;
    router.push(path);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={styles.tab}
          onPress={() => handleTabPress(tab)}
        >
          <MaterialIcons
            name={tab.icon}
            size={24}
            color={(router as any).pathname === `/${tab.id}` ? "black" : "gray"}
          />
          <Text
            style={[
              styles.tabText,
              {
                color:
                  (router as any).pathname === `/${tab.id}` ? "black" : "gray",
              },
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "white",
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default BottomNav;
