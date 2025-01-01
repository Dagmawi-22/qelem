import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Href, usePathname, useRouter } from "expo-router";
import { AppPrimaryColor } from "@/constants/Colors";

type Tab = {
  id: string;
  isIndex?: boolean 
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

const BottomNav = () => {
  const router = useRouter();

  const tabs: Tab[] = [
    { id: "books", label: "Books", icon: "book", isIndex: true },
    { id: "bookmarks", label: "Bookmarks", icon: "bookmark" },
    { id: "notes", label: "Notes", icon: "note" },
  ];

  const handleTabPress = (tab: Tab) => {
    const path = `/${tab.id}` as Href;
    router.push(path);
  };

  const pathname = usePathname();

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
            color={
              pathname === `/${tab.id}`
                ? AppPrimaryColor
                : tab?.isIndex && pathname === "/"
                ? AppPrimaryColor
                : "gray"
            }
          />
          <Text
            style={[
              styles.tabText,
              {
                color:
                  pathname === `/${tab.id}`
                    ? AppPrimaryColor
                    : tab?.isIndex && pathname === "/"
                    ? AppPrimaryColor
                    : "gray",
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
