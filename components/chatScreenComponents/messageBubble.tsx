import { Message } from "@/app/types/types";
import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import StatusIcon from "./statusIcon";

interface MessageBubbleProps {
  msg: Message;
  isFromContact: boolean;
  onMediaPress: (uri: string | null) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  msg,
  isFromContact,
  onMediaPress,
}) => {
  const bubbleAlign = isFromContact ? "self-start" : "self-end";
  const bubbleBg = isFromContact ? "bg-gray-100" : "bg-[#a3e5b4]";

  return (
    <View className={`mb-5`}>
      <View className={`max-w-[80%] p-3 rounded-xl ${bubbleBg} ${bubbleAlign}`}>
        {msg.type === "text" && <Text className="text-base">{msg.text}</Text>}

        {msg.type === "image" && (
          <>
            <TouchableOpacity
              onPress={() => onMediaPress(msg.imageUrl || null)}
            >
              <Image
                source={{ uri: msg.imageUrl }}
                className="w-48 h-48 rounded-md mb-2"
                resizeMode="cover"
              />
            </TouchableOpacity>
            {msg.text && <Text className="text-base mt-1">{msg.text}</Text>}
          </>
        )}

        {msg.type === "video" && (
          <>
            <TouchableOpacity onPress={() => onMediaPress(msg.uri || null)}>
              <View className="w-48 h-48 bg-black rounded-md mb-2 items-center justify-center">
                <Ionicons name="play-circle" size={48} color="white" />
              </View>
            </TouchableOpacity>
            {msg.text && <Text className="text-base mt-1">{msg.text}</Text>}
          </>
        )}

        {msg.type === "document" && (
          <>
            <View className="flex-row items-center justify-between bg-white border border-gray-300 rounded-md p-2">
              <View className="flex-row items-center gap-2">
                <Feather name="file-text" size={20} color="#555" />
                <View>
                  <Text className="text-sm font-medium">{msg.fileName}</Text>
                  <Text className="text-xs text-gray-500">{msg.fileSize}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => alert("Download started")}>
                <Feather name="download" size={20} color="#333" />
              </TouchableOpacity>
            </View>
            {msg.text && <Text className="text-base mt-1">{msg.text}</Text>}
          </>
        )}
      </View>
      <View
        className={`flex-row items-center gap-1 mt-1 px-1 ${isFromContact ? "self-start" : "self-end"}`}
      >
        <Text className="text-xs text-gray-500">{msg.time}</Text>
        {!isFromContact && <StatusIcon status={msg.status} />}
      </View>
    </View>
  );
};

export default MessageBubble;
