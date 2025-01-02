import {
  TouchableOpacity,
  Text,
  View,
  Image,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  StatusBar,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Pdf from "react-native-pdf";
import { PDF_SECTIONS } from "@/constants/Pdfs";
import AppHeader from "./components/Header";
import { PDFScreenProps, PdfSource } from "@/constants/interfaces";
import GradeChipSelector from "@/components/ui/GradeSelector";

function MenuScreen({
  onSelectPdf,
}: {
  onSelectPdf: (pdf: { title: string; path: string }) => void;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allPdfs, setAllPdfs] = useState<
    { title: string; path: string; sectionTitle: string }[]
  >([]);
  const [selectedGrade, setSelectedGrade] = useState<string>("12");

  const fetchPdfs = () => {
    setIsLoading(true);
    setTimeout(() => {
      const pdfs = PDF_SECTIONS.flatMap((section) =>
        section.subPdfs.map((pdf) => ({
          ...pdf,
          sectionTitle: section.title,
        }))
      );
      setAllPdfs(pdfs);
      setIsLoading(false);
    }, 3000);
  };

  useEffect(() => {
    fetchPdfs();
  }, [selectedGrade]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <AppHeader />
      <GradeChipSelector
        defaultSelected={selectedGrade}
        onSelect={setSelectedGrade}
      />
      <View className="flex-1">
        {isLoading ? (
          <FlatList
            data={[1, 2, 3, 4, 5, 6]}
            numColumns={2}
            contentContainerStyle={{ paddingVertical: 5 }}
            columnWrapperStyle={{ justifyContent: "space-between", padding: 4 }}
            renderItem={() => (
              <View className="flex-1 bg-gray-100 m-2 rounded-lg overflow-hidden">
                <View className="h-32 min-w-fit bg-gray-200 rounded-lg opacity-50 animate-pulse" />
                <View className="p-3">
                  <View className="h-4 bg-gray-200 rounded w-3/4 opacity-50 animate-pulse" />
                  <View className="h-3 bg-gray-200 rounded w-1/2 mt-2 opacity-50 animate-pulse" />
                </View>
              </View>
            )}
          />
        ) : (
          <FlatList
            data={allPdfs}
            contentContainerStyle={{ paddingVertical: 5 }}
            className="rounded-3xl bg-[#ffffff1a]"
            keyExtractor={(item, index) => `${item.title}-${index}`}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between", padding: 4 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="flex-1 bg-white m-2 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:border-gray-300"
                onPress={() => onSelectPdf(item)}
              >
                <View className="h-32 min-w-fit overflow-hidden rounded-lg">
                  <Image
                    source={require("../assets/covers/12/ict.png")}
                    className="w-full h-full rounded-lg object-cover"
                    resizeMode="cover"
                  />
                </View>
                <View className="p-3">
                  <Text className="text-lg font-bold text-gray-800 truncate">
                    {item.title}
                  </Text>
                  <Text className="text-sm text-gray-500 mt-1 truncate">
                    {item.sectionTitle}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

function PDFScreen({ pdfPath, onBack }: PDFScreenProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const source: PdfSource = {
    uri: pdfPath,
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
  }, [pdfPath]);

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-black justify-center items-center">
        <Text className="text-white">{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white/10">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View className="flex-row justify-end items-end bg-white p-5 py-10">
        <TouchableOpacity
          onPress={onBack}
          className="flex-row items-end justify-end px-4 py-3 bg-black/10 rounded-lg"
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
          source={source}
          style={styles.pdf}
          onLoadComplete={(numberOfPages: number) => {
            setLoading(false);
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onError={(error: any) => {
            setError("Failed to load PDF: " + error.message);
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
          pdfPath={selectedPdf?.path}
          onBack={() => setSelectedPdf(null)}
        />
      ) : (
        <MenuScreen onSelectPdf={(pdf) => setSelectedPdf(pdf)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
