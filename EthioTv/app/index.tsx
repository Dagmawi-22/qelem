import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import TVProgramGrid from "./components/TvPrograms";
import { ScrollView } from "react-native";

export default function Index() {
  const text = "title";

  return (
    <ScrollView className="">
      <TVProgramGrid />
      <TVProgramGrid />
      <TVProgramGrid />
    </ScrollView>
  );
}
