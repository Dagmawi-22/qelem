import { View } from "react-native";
import { Video } from "expo-av";
import { useRoute } from "@react-navigation/native";

export default function Stream() {
  const route = useRoute();
  const { videoSrc } = (route as any).params;

  return (
    <View style={{ height: "50%", width: "100%" }}>
      {" "}
      <Video
        source={{ uri: videoSrc }}
        style={{ width: "100%", height: "100%" }}
        useNativeControls
        // resizeMode="cover"
      />{" "}
    </View>
  );
}
