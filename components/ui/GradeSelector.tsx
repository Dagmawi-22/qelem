import { AppPrimaryColor } from "@/constants/Colors";
import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";

const gradeOptions = [
  { label: "Grade 12", value: "12" },
  { label: "Grade 11", value: "11" },
  { label: "Grade 10", value: "10" },
  { label: "Grade 9", value: "9" },
];

type GradeChipSelectorProps = {
  defaultSelected?: string;
  onSelect?: (value: string) => void;
};

const GradeChipSelector: React.FC<GradeChipSelectorProps> = ({
  defaultSelected,
  onSelect,
}) => {
  const [selectedValue, setSelectedValue] = useState(
    defaultSelected || gradeOptions[0]?.value
  );

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    if (onSelect) {
      onSelect(value);
    }
  };

  return (
    <View>
      <Text style={styles.label}>Select School Grade</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {gradeOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            onPress={() => handleSelect(option.value)}
            style={[
              styles.chip,
              selectedValue === option.value
                ? styles.selectedChip
                : styles.unselectedChip,
            ]}
          >
            <Text
              style={[
                styles.chipText,
                selectedValue === option.value
                  ? styles.selectedText
                  : styles.unselectedText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 600,
    color: "#1f2937",
    marginVertical: 10,
    marginBottom: 4,
    paddingHorizontal: 15,
  },
  scrollView: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  chip: {
    width: 80,
    height: 34,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  selectedChip: {
    backgroundColor: AppPrimaryColor,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  unselectedChip: {
    backgroundColor: "#e5e7eb",
  },
  chipText: {
    fontSize: 14,
    fontWeight: "500",
  },
  selectedText: {
    color: "#ffffff",
  },
  unselectedText: {
    color: "#374151",
  },
});

export default GradeChipSelector;
