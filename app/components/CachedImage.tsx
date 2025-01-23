import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import * as FileSystem from "expo-file-system";
import { Image, ImageProps } from "expo-image";

interface CachedImageProps extends Omit<ImageProps, "source"> {
  source: { uri: string }; // Ensure source has a uri property
  className?: string; // Optional className for Tailwind
}

const CachedImage: React.FC<CachedImageProps> = ({
  source,
  className,
  ...props
}) => {
  const [imgUri, setImgUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const cacheImage = async () => {
      if (!source?.uri) return;

      try {
        // Generate a local file path for caching
        const cacheDir = FileSystem.cacheDirectory;
        const fileName = source.uri.split("/").pop();
        const localUri = `${cacheDir}${fileName}`;

        // Check if the image is already cached
        const fileInfo = await FileSystem.getInfoAsync(localUri);
        if (fileInfo.exists) {
          setImgUri(localUri);
          setIsLoading(false);
          return;
        }

        // If not cached, download and cache the image
        const { uri } = await FileSystem.downloadAsync(source.uri, localUri);
        setImgUri(uri);
      } catch (error) {
        console.error("Error caching image:", error);
        setImgUri(source.uri); // Fallback to remote URL if caching fails
      } finally {
        setIsLoading(false);
      }
    };

    cacheImage();
  }, [source]);

  if (isLoading) {
    return (
      <View className={`flex justify-center items-center ${className}`}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  }

  return (
    <Image
      source={{ uri: imgUri || "" }} // Ensure uri is not null
      className={className} // Pass className directly
      {...props}
    />
  );
};

export default CachedImage;
