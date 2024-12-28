import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import Pdf from "react-native-pdf";

interface Section {
  title: string;
  subPdfs: { title: string; path: string }[];
}

const sections: Section[] = [
  {
    title: "Section 1",
    subPdfs: [
      { title: "Document 1.1", path: require("../assets/pdfs/ict.pdf") },
      { title: "Document 1.2", path: require("../assets/pdfs/ict.pdf") },
    ],
  },
  {
    title: "Section 2",
    subPdfs: [
      { title: "Document 2.1", path: require("../assets/pdfs/ict.pdf") },
      { title: "Document 2.2", path: require("../assets/pdfs/ict.pdf") },
    ],
  },
];

function MenuScreen({
  onSelectPdf,
}: {
  onSelectPdf: (pdf: { title: string; path: string }) => void;
}) {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Text className="text-xl font-bold text-gray-800 px-4 py-4">
        PDF Reader
      </Text>
      <ScrollView>
        {sections.map((section, idx) => (
          <View key={idx}>
            <TouchableOpacity
              className="flex-row items-center justify-between px-4 py-3"
              onPress={() =>
                setExpandedSection(expandedSection === idx ? null : idx)
              }
            >
              <Text className="text-lg text-gray-700">{section.title}</Text>
              <MaterialIcons
                name={expandedSection === idx ? "expand-less" : "expand-more"}
                size={24}
                color="#4B5563"
              />
            </TouchableOpacity>
            {expandedSection === idx && (
              <View className="bg-gray-100">
                {section.subPdfs.map((pdf, pdfIdx) => (
                  <TouchableOpacity
                    key={pdfIdx}
                    className="px-8 py-2"
                    onPress={() => onSelectPdf(pdf)}
                  >
                    <Text className="text-gray-600">{pdf.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function PDFScreen({
  pdfPath,
  onBack,
}: {
  pdfPath: string;
  onBack: () => void;
}) {
  const [pdfUri, setPdfUri] = useState<string | null>(null);

  useEffect(() => {
    async function loadPDF() {
      try {
        const asset = await Asset.fromModule(pdfPath).downloadAsync();
        setPdfUri(asset.localUri);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    }
    loadPDF();
  }, [pdfPath]);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center bg-gray-50 px-4 py-2">
        <TouchableOpacity onPress={onBack} className="flex-row items-center">
          <Ionicons name="arrow-back" size={24} color="#4B5563" />
          <Text className="ml-2 text-gray-600">Back to Menu</Text>
        </TouchableOpacity>
      </View>
      {pdfUri && <Pdf source={{ uri: pdfUri }} style={{ flex: 1 }} />}
    </SafeAreaView>
  );
}

export default function App() {
  const [selectedPdf, setSelectedPdf] = useState<{
    title: string;
    path: string;
  } | null>(null);

  return (
    <View className="flex-1">
      {selectedPdf ? (
        <PDFScreen
          pdfPath={selectedPdf.path}
          onBack={() => setSelectedPdf(null)}
        />
      ) : (
        <MenuScreen onSelectPdf={setSelectedPdf} />
      )}
    </View>
  );
}
