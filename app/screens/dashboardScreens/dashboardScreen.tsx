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

// Card data
const cardTtiles = [
  { id: "2", title: "Sequence", counts: 0 },
  { id: "3", title: "Templates", counts: 0 },
  { id: "4", title: "Contacts", counts: 0 },
  { id: "5", title: "Workspaces", counts: 0 },
];

// Icon components mapped by index
const icons: React.ReactNode[] = [
  <Feather key="icon-1" name="users" size={18} color="white" />,
  <Octicons key="icon-2" name="comment-discussion" size={20} color="white" />,
  <MaterialCommunityIcons
    key="icon-3"
    name="square-rounded-outline"
    size={22}
    color="white"
  />,
  <Ionicons key="icon-4" name="cube-outline" size={23} color="white" />,
];

// Background colors for icon containers
const iconBackgroundColors = ["#8b5cf6", "#14b8a6", "#009fff", "#f97316"];

// Render each dashboard card
const renderCard: ListRenderItem<(typeof cardTtiles)[0]> = ({
  item,
  index,
}) => (
  <View
    className="h-[65px] shadow-lg rounded-2xl opacity-85 bg-black mb-3"
    style={{
      width: "48%",
      marginRight: index % 2 === 0 ? "4%" : 0,
    }}
  >
    <View className="flex-row justify-between w-[85%] mx-auto my-2">
      {/* Title and count */}
      <View>
        <Text className="text-lg text-white font-semibold">{item.title}</Text>
        <Text className="text-lg text-white font-semibold">
          {item.counts || 0}
        </Text>
      </View>

      {/* Icon container with background */}
      <View
        className="size-[30px] rounded-full flex justify-center items-center ms-2"
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
  <View className="w-[90%] mx-auto">
    <View
      className={`w-full h-[100px] mx-auto rounded-xl opacity-85 bg-black mt-5`}
    >
      <View className="flex flex-row justify-between w-[95%] mx-auto mt-3">
        <View>
          <Text className="text-white text-2xl mt-2 font-bold">Workspace</Text>
        </View>
        <View className="bg-[#6A30FF] size-[45px] mt-2 rounded-full flex justify-center items-center">
          <Ionicons name="cube-outline" size={27} color="white" />
        </View>
      </View>
      <View className="w-[90%] mx-auto mt-3">
        <ProgressBar color="bg-[#00BF63]" progress={56} />
      </View>
    </View>
    {/* Cards section */}
    <View className="mt-5">
      <FlatList
        data={cardTtiles}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
      />
    </View>

    {/* Chart */}
    <Chart />
  </View>
);

export default DashboardScreen;
