import { SelectedMedia } from "@/app/types/types";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface MediaPreviewProps {
  media: SelectedMedia | null;
  onRemove: () => void;
}

const MediaPreview: React.FC<MediaPreviewProps> = ({ media, onRemove }) => {
  if (!media) return null;

  return (
    <View className="relative mb-2 bg-gray-100 rounded-lg p-2">
      {media.type === "image" && (
        <Image
          source={{ uri: media.uri }}
          className="w-20 h-20 rounded-md"
          resizeMode="cover"
        />
      )}

      {media.type === "video" && (
        <View className="flex-row items-center">
          {media.preview ? (
            <Image
              source={{ uri: media.preview }}
              className="w-20 h-20 rounded-md mr-2"
            />
          ) : (
            <Ionicons name="videocam" size={40} color="#888" />
          )}
          <Text className="text-sm">
            {media.duration ? `${Math.round(media.duration)}s` : "Video"}
          </Text>
        </View>
      )}

      {media.type === "document" && (
        <View className="flex-row items-center">
          <MaterialIcons name="insert-drive-file" size={40} color="#888" />
          <View className="ml-2">
            <Text className="text-sm font-medium" numberOfLines={1}>
              {media.name}
            </Text>
            <Text className="text-xs text-gray-500">
              {media.size ? `${(media.size / 1024).toFixed(1)} KB` : "Document"}
            </Text>
          </View>
        </View>
      )}

      <TouchableOpacity
        className="absolute top-2 right-2 bg-gray-600 rounded-full p-1"
        onPress={onRemove}
      >
        <MaterialIcons name="close" size={12} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default MediaPreview;
