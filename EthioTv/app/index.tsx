import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function Index() {
  const text = "title";

  return (
    <ThemedView className="items-center justify-center flex-1">
      <ThemedText type="title" className="mb-4">
        {text}
      </ThemedText>
      <ThemedText type="subtitle" className="mb-2">
        home subtitle
      </ThemedText>
    </ThemedView>
  );
}
