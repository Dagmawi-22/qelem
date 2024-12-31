import {
  TouchableOpacity,
  Text,
  View,
  Image,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  StatusBar,
} from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import Pdf from "react-native-pdf";
import { PDF_SECTIONS } from "@/constants/Pdfs";

function MenuScreen({
  onSelectPdf,
}: {
  onSelectPdf: (pdf: { title: string; path: string }) => void;
}) {
  const allPdfs = PDF_SECTIONS.flatMap((section) =>
    section.subPdfs.map((pdf) => ({
      ...pdf,
      sectionTitle: section.title,
    }))
  );

  return (
    <SafeAreaView className="flex-1 bg-[#c7ae6a]">
      <StatusBar barStyle="dark-content" backgroundColor="#c7ae6a" />
      <View className="flex flex-col gap-2 p-5">
        <Text className="text-xl font-bold text-center text-gray-800">
          PDF Reader
        </Text>
        <Text className="text-md font-normal text-center text-gray-600">
          PDF Reader
        </Text>
      </View>
      <FlatList
        data={allPdfs}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", padding: 4 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex-1 bg-white m-2 rounded-lg overflow-hidden shadow-sm shadow-black/20"
            onPress={() => onSelectPdf(item)}
          >
            {/* Image Container */}
            <View className="h-32 bg-gray-200">
              <Image
                source={require("../assets/images/icon.png")}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            {/* Text Container */}
            <View className="p-3">
              <Text className="text-lg font-bold text-gray-800">
                {item.title}
              </Text>
              <Text className="text-sm text-gray-500 mt-1">
                {item.sectionTitle}
              </Text>
            </View>
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
    <SafeAreaView className="flex-1 bg-[#c7ae6a]">
      <StatusBar barStyle="dark-content" backgroundColor="#c7ae6a" />
      <View className="flex-row justify-end items-end bg-[#c7ae6a] p-5">
        <TouchableOpacity
          onPress={onBack}
          className="flex-row items-end justify-end px-4 py-3 bg-white/40 rounded-lg active:bg-gray-200 transition-all duration-200"
        >
          <FontAwesome name="close" size={24} color="gray" />
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
