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
import { FontAwesome } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import Pdf from "react-native-pdf";
import { PDF_SECTIONS } from "@/constants/Pdfs";
import IrregularHeader from "./components/Header";

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
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <IrregularHeader />
      <View className="rounded-3xl overflow-hidden mt-24">
        <FlatList
          data={allPdfs}
          contentContainerStyle={{
            paddingVertical: 20,
          }}
          className="rounded-3xl bg-[#ffffff1a]"
          keyExtractor={(item, index) => `${item.title}-${index}`}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", padding: 4 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex-1 bg-white m-2 rounded-lg overflow-hidden"
              onPress={() => onSelectPdf(item)}
            >
              <View className="h-32 min-w-fit overflow-hidden rounded-lg">
                <Image
                  source={require("../assets/images/icon.png")}
                  className="w-full h-full rounded-lg"
                  resizeMode="cover"
                />
              </View>
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
      </View>
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
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View className="flex-row justify-end items-end bg-white p-5">
        <TouchableOpacity
          onPress={onBack}
          className="flex-row items-end justify-end px-4 py-3 bg-black/40 rounded-lg active:bg-black-200 transition-all duration-200"
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
        pdfUri && <Pdf source={{ uri: pdfUri }} />
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
