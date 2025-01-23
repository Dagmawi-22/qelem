import {
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import * as FileSystem from "expo-file-system";
import { PDF_SECTIONS } from "@/constants/Pdfs";
import AppHeader from "./components/Header";
import GradeChipSelector from "@/components/ui/GradeSelector";
import CachedImage from "./components/CachedImage";

function MenuScreen({
  onSelectPdf,
}: {
  onSelectPdf: (pdf: { title: string; path: string; imgUrl?: string }) => void;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allPdfs, setAllPdfs] = useState<
    { title: string; path: string; sectionTitle: string; imgUrl?: string }[]
  >([]);
  const [selectedGrade, setSelectedGrade] = useState<string>("12");

  // Function to fetch PDFs
  const fetchPdfs = async () => {
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
                className="flex-1 bg-white m-2 rounded-lg overflow-hidden duration-300 border border-gray-200 hover:border-gray-300"
                onPress={() => onSelectPdf(item)}
              >
                <View className="h-32 min-w-fit overflow-hidden rounded-lg">
                  {item.imgUrl ? (
                    <CachedImage
                      source={{ uri: item.imgUrl }}
                      className="w-full h-full rounded-lg object-cover"
                      resizeMode="cover"
                    />
                  ) : (
                    <View className="w-full h-full bg-gray-200 rounded-lg flex justify-center items-center">
                      <Text className="text-gray-500">No Image</Text>
                    </View>
                  )}
                </View>
                <View className="p-3">
                  <Text className="text-lg font-bold text-gray-800 truncate">
                    {item.title}
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

export default function App() {
  const [selectedPdf, setSelectedPdf] = useState<{
    title: string;
    path: string;
    imgUrl?: string;
  } | null>(null);

  const getDirectPdfUrl = (url: string) => {
    if (url.includes("drive.google.com")) {
      // Extract the file ID from the Google Drive URL
      const fileId = url.match(/\/file\/d\/([^\/]+)\//)?.[1];
      if (fileId) {
        // Return the direct download URL for the PDF
        return `https://drive.google.com/uc?export=download&id=${fileId}`;
      }
    }
    // If it's not a Google Drive URL, return the original URL
    return url;
  };

  // Function to generate a Google Docs Viewer URL for the PDF
  const getPdfViewerUrl = (pdfUrl: string) => {
    const directUrl = getDirectPdfUrl(pdfUrl);
    return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
      directUrl
    )}`;
  };

  return (
    <View className="flex-1 bg-white/20">
      {selectedPdf ? (
        <SafeAreaView className="flex-1 bg-white">
          <StatusBar barStyle="dark-content" backgroundColor="white" />
          <View className="flex-row justify-end items-end bg-white p-2 py-5">
            <TouchableOpacity
              onPress={() => setSelectedPdf(null)}
              className="flex-row items-end justify-end px-4 py-3 bg-black/10 rounded-lg"
            >
              <FontAwesome name="close" size={24} color="gray" />
            </TouchableOpacity>
          </View>
          <WebView
            source={{ uri: getPdfViewerUrl(selectedPdf.path) }}
            style={styles.webview}
            startInLoadingState={true}
            renderLoading={() => (
              <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#4B5563" />
                <Text className="mt-2 text-gray-600">Loading PDF...</Text>
              </View>
            )}
          />
        </SafeAreaView>
      ) : (
        <MenuScreen onSelectPdf={(pdf) => setSelectedPdf(pdf)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  webview: {
    flex: 1,
  },
});
