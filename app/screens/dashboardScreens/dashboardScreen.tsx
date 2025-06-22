import Chart from "@/components/dashboardComponents/chart";
import ProgressBar from "@/components/reusableComponents/progressBar/progressBar";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import React from "react";
import { FlatList, ListRenderItem, Text, View } from "react-native";

// Card data with more descriptive counts
const cardTitles = [
  { id: "1", title: "Users", counts: 24 },
  { id: "2", title: "Sequence", counts: 8 },
  { id: "3", title: "Templates", counts: 15 },
  { id: "4", title: "Contacts", counts: 342 },
  { id: "5", title: "Workspaces", counts: 3 },
  { id: "6", title: "Campaigns", counts: 5 },
];

// Icon components mapped by index
const icons: React.ReactNode[] = [
  <Feather key="icon-1" name="users" size={20} color="white" />,
  <Octicons key="icon-2" name="comment-discussion" size={20} color="white" />,
  <MaterialCommunityIcons
    key="icon-3"
    name="square-rounded-outline"
    size={20}
    color="white"
  />,
  <Ionicons key="icon-4" name="people-outline" size={22} color="white" />,
  <Ionicons key="icon-5" name="cube-outline" size={22} color="white" />,
  <MaterialCommunityIcons
    key="icon-6"
    name="email-send-outline"
    size={20}
    color="white"
  />,
];

// Gradient colors for icon containers
const iconBackgroundColors = [
  "#8b5cf6", // purple
  "#14b8a6", // teal
  "#009fff", // blue
  "#f97316", // orange
  "#ec4899", // pink
  "#0ea5e9", // sky blue
];

// Render each dashboard card
const renderCard: ListRenderItem<(typeof cardTitles)[0]> = ({
  item,
  index,
}) => (
  <View
    className="h-[80px] rounded-xl mb-4 p-1 border border-gray-200"
    style={{
      width: "48%",
      marginRight: index % 2 === 0 ? "4%" : 0,
      backgroundColor: "white",
      // shadowColor: "#000",
      // shadowOffset: {
      //   width: 0,
      //   height: 2,
      // },
      // shadowOpacity: 0.1,
      // shadowRadius: 4,
      // elevation: 3,
      // borderWidth: 1,
      // borderColor: "#f3f4f6", // subtle border
    }}
  >
    <View className="flex-row justify-between w-[85%] mx-auto my-3">
      {/* Title and count */}
      <View className="flex-1">
        <Text className="text-sm text-gray-500 font-medium">{item.title}</Text>
        <Text className="text-2xl text-gray-800 font-bold mt-1">
          {item.counts}
        </Text>
      </View>

      {/* Icon container with gradient background */}
      <View
        className="size-[40px] rounded-full flex justify-center items-center"
        style={{
          backgroundColor:
            iconBackgroundColors[index % iconBackgroundColors.length],
        }}
      >
        {icons[index % icons.length]}
      </View>
    </View>
  </View>
);

const DashboardScreen = () => (
  <View className="w-[90%] mx-auto pb-10 pt-2">
    {/* Header Card */}
    <View
      className={`w-full h-[120px] rounded-2xl mx-auto bg-white mt-6 border border-gray-200`}
      // style={{
      //   shadowColor: "#8b5cf6",
      //   shadowOffset: { width: 0, height: 4 },
      //   shadowOpacity: 0.3,
      //   shadowRadius: 6,
      //   elevation: 8,
      // }}
    >
      <View className="flex flex-row justify-between w-[90%] mx-auto mt-3">
        <View>
          <Text className="text-black text-2xl font-semibold">Workspace 1</Text>
          <Text className="text-black text-lg font-semibold">Internal</Text>
        </View>
        <View className="bg-[#6A30FF] size-[40px] rounded-full flex justify-center items-center">
          <Ionicons name="cube-outline" size={20} color="white" />
        </View>
      </View>
      <View className="w-[90%] mx-auto my-2">
        <ProgressBar color="bg-[#00BF63]" progress={56} />
        <View className="flex-row justify-between mt-5">
          <Text className="text-black text-sm">Total 60% used</Text>
          <Text className="text-black text-sm">6/10</Text>
        </View>
      </View>
    </View>

    {/* Cards section */}
    <View className="mt-6">
      <Text className="text-xl font-bold text-gray-800 mb-3">Overview</Text>
      <FlatList
        scrollEnabled={false}
        data={cardTitles}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
      />
    </View>

    {/* Chart section */}
    <View className="mt-6 mb-20">
      <Text className="text-xl font-bold text-gray-800 mb-3">Quick Status</Text>
      <View className="bg-white p-4 rounded-xl border border-gray-200">
        <Chart />
      </View>
    </View>
  </View>
);

export default DashboardScreen;
