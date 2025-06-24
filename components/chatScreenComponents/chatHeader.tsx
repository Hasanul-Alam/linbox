import { Contact } from "@/app/types/types";
import { formatTime } from "@/utils/helpers";
import {
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ChatHeaderProps {
  name: string;
  whatsappNumber: string;
  pinned: boolean;
  labels: Contact["labels"];
  remainingTime: number;
  onBackPress: () => void;
  onTranslationPress: () => void;
  onOptionsPress: (position: { x: number; y: number }) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  name,
  whatsappNumber,
  pinned,
  labels,
  remainingTime,
  onBackPress,
  onTranslationPress,
  onOptionsPress,
}) => {
  //   const formatTime = (seconds: number) => {
  //     const h = Math.floor(seconds / 3600)
  //       .toString()
  //       .padStart(2, "0");
  //     const m = Math.floor((seconds % 3600) / 60)
  //       .toString()
  //       .padStart(2, "0");
  //     const s = (seconds % 60).toString().padStart(2, "0");
  //     return `${h}:${m}:${s}`;
  //   };
  return (
    <View className="w-[95%] mx-auto mb-2">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={onBackPress}>
            <Ionicons name="chevron-back-outline" size={24} />
          </TouchableOpacity>
          <View className="relative">
            <View className="bg-green-500 w-9 h-9 rounded-full items-center justify-center">
              <Text className="text-white text-lg">{name.charAt(0)}</Text>
            </View>
            {pinned && (
              <View className="absolute -bottom-1 -left-1 p-[2px] rounded-full bg-[#fff] border border-gray-200">
                <SimpleLineIcons name="pin" size={12} color="#4b5563" />
              </View>
            )}
          </View>
          <View>
            <View className="flex-row gap-2 items-center">
              <Text className="text-xl font-semibold">
                {name.length > 12 ? `${name.slice(0, 12)}...` : name}
              </Text>
              {labels?.data?.length > 0 && (
                <MaterialCommunityIcons
                  name="label"
                  size={18}
                  color={labels.data[0].color}
                />
              )}
            </View>
            <Text className="text-sm">{whatsappNumber}</Text>
          </View>
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="text-sm">{formatTime(remainingTime)}</Text>
          <TouchableOpacity onPress={onTranslationPress}>
            <Ionicons name="language-outline" size={18} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={(e) => {
              e.currentTarget.measure((x, y, width, height, pageX, pageY) => {
                onOptionsPress({ x: pageX, y: pageY });
              });
            }}
          >
            <Ionicons name="ellipsis-vertical" size={17} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatHeader;
