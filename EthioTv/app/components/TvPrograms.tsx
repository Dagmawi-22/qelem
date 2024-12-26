import { Image, SafeAreaView, Text, View } from "react-native";

const tvPrograms = [
  {
    title: "Seifu On ebs",
    time: "8:00 PM",
    image:
      "https://e0.365dm.com/24/11/1600x900/skysports-premier-league-chelsea_6745797.jpg?20241111133655",
  },
  {
    title: "Program 2",
    time: "9:00 PM",
    image:
      "https://e0.365dm.com/24/11/1600x900/skysports-premier-league-chelsea_6745797.jpg?20241111133655",
  },
  {
    title: "Program 3",
    time: "10:00 PM",
    image:
      "https://e0.365dm.com/24/11/1600x900/skysports-premier-league-chelsea_6745797.jpg?20241111133655",
  },
  {
    title: "Program 4",
    time: "11:00 PM",
    image:
      "https://e0.365dm.com/24/11/1600x900/skysports-premier-league-chelsea_6745797.jpg?20241111133655",
  },
  {
    title: "Program 5",
    time: "12:00 AM",
    image:
      "https://e0.365dm.com/24/11/1600x900/skysports-premier-league-chelsea_6745797.jpg?20241111133655",
  },
  {
    title: "Program 6",
    time: "1:00 AM",
    image:
      "https://e0.365dm.com/24/11/1600x900/skysports-premier-league-chelsea_6745797.jpg?20241111133655",
  },
];

const TVProgramGrid = () => {
  return (
    <SafeAreaView className="p-4">
      <Text className="text-2xl font-bold mb-4">TV Programs</Text>
      <View className="flex flex-row flex-wrap justify-between">
        {" "}
        {tvPrograms.map((program, index) => (
          <View key={index} className="w-1/2 p-1">
            <View className="rounded-lg overflow-hidden shadow-lg">
              <Image
                source={{ uri: program.image }}
                alt={program.title}
                style={{ width: "100%", height: 100 }}
              />
              <View className="p-2 bg-[#f6f6f2]">
                {" "}
                <Text className="text-lg font-semibold">{program.title}</Text>
                <Text className="text-gray-600">{program.time}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default TVProgramGrid;
