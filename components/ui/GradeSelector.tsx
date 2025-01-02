import React, { useState } from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";

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
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="py-2"
    >
      {gradeOptions.map((option) => (
        <TouchableOpacity
          key={option.value}
          onPress={() => handleSelect(option.value)}
          className={`px-4 py-2 mx-2 rounded-full ${
            selectedValue === option.value ? "bg-blue-500" : "bg-gray-200"
          }`}
        >
          <Text
            className={`text-sm ${
              selectedValue === option.value ? "text-white" : "text-gray-700"
            }`}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default GradeChipSelector;
