import { SafeAreaView, StatusBar, Text, View } from "react-native";

const Notes = () => {
  return (
    <SafeAreaView className="flex-1 p-5">
        <StatusBar barStyle="dark-content" />
      <Text className="text-3xl text-red-900"></Text>
    </SafeAreaView>
  );
};

export default Notes;
