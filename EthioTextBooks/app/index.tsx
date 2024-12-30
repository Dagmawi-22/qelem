import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  StatusBar,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
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
  const allPdfs = sections.flatMap((section) =>
    section.subPdfs.map((pdf) => ({
      ...pdf,
      sectionTitle: section.title,
    }))
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />
      <Text className="text-xl font-bold text-gray-800 px-4 py-4">
        PDF Reader
      </Text>
      <FlatList
        data={allPdfs}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", padding: 4 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex-1 bg-white/40 m-2 p-4 shadow-lg rounded-lg"
            onPress={() => onSelectPdf(item)}
          >
            <Text className="text-lg font-bold text-gray-700">
              {item.title}
            </Text>
            <Text className="text-sm text-gray-500">
              {item.sectionTitle}
            </Text>
          </TouchableOpacity>
        )}
      />
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadPDF() {
      try {
        const asset = await Asset.fromModule(pdfPath).downloadAsync();
        setPdfUri(asset.localUri);
      } catch (error) {
        console.error("Error loading PDF:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPDF();
  }, [pdfPath]);

  return (
    <SafeAreaView className="flex-1 bg-[#1a1a1a]/30">
      <StatusBar barStyle="dark-content" />
      <View className="flex-row items-center bg-gray-50 px-4 py-2">
        <TouchableOpacity onPress={onBack} className="flex-row items-center">
          <Ionicons name="arrow-back" size={24} color="#4B5563" />
          <Text className="ml-2 text-gray-600">Back to Menu</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#4B5563" />
          <Text className="mt-2 text-gray-600">Getting pdf ready...</Text>
        </View>
      ) : (
        pdfUri && <Pdf source={{ uri: pdfUri }} style={{ flex: 1 }} />
      )}
    </SafeAreaView>
  );
}

export default function App() {
  const [selectedPdf, setSelectedPdf] = useState<{
    title: string;
    path: string;
  } | null>(null);

  return (
    <View className="flex-1 bg-[#1a1a1a]/30">
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
