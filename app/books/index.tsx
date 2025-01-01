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
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Pdf from "react-native-pdf";
import { PDF_SECTIONS } from "@/constants/Pdfs";
import AppHeader from "../components/Header";

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
      <AppHeader />
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
                  source={require("../../assets/covers/12/ict.png")}
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
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View className="flex-row justify-end items-end bg-white p-5 py-10">
        <TouchableOpacity
          onPress={onBack}
          className="flex-row items-end justify-end px-4 py-3 bg-black/10 rounded-lg active:bg-black-200 transition-all duration-200"
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
        <Pdf
          source={{ uri: pdfPath }}
          onLoadComplete={() => setLoading(false)}
          onError={(error) => {
            console.error("Error loading PDF:", error);
            setLoading(false);
          }}
        />
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
