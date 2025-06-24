import { Entypo, Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import MediaPreview from "./mediaPreview";

interface InputAreaProps {
  messageText: string;
  selectedMedia: any | null;
  onMessageChange: (text: string) => void;
  onSendPress: () => void;
  onEmojiPress: () => void;
  onAddPress: () => void;
  onMediaRemove: () => void;
}

const MAX_HEIGHT = 120;
const MIN_HEIGHT = 40;
const InputArea: React.FC<InputAreaProps> = ({
  messageText,
  selectedMedia,
  onMessageChange,
  onSendPress,
  onEmojiPress,
  onAddPress,
  onMediaRemove,
}) => {
  const [inputHeight, setInputHeight] = useState(MIN_HEIGHT);

  const handleContentSizeChange = (e: any) => {
    const height = e.nativeEvent.contentSize.height;
    setInputHeight(Math.min(height, MAX_HEIGHT));
  };

  // Dynamic border radius based on height
  const dynamicRadius =
    inputHeight > MIN_HEIGHT ? "rounded-lg" : "rounded-full";
  return (
    <View className="border-t border-gray-200 px-4 py-2 bg-white">
      <MediaPreview media={selectedMedia} onRemove={onMediaRemove} />
      <View className="flex-row items-center">
        <TouchableOpacity className="p-2" onPress={onAddPress}>
          <Entypo name="plus" size={22} color="#484848" />
        </TouchableOpacity>

        <TextInput
          className={`flex-1 mx-2 px-4 py-2 bg-gray-100 ${dynamicRadius}`}
          placeholder="Type a message..."
          placeholderTextColor="#888"
          value={messageText}
          onChangeText={onMessageChange}
          multiline
          scrollEnabled={true}
          onContentSizeChange={handleContentSizeChange}
          style={{
            height: inputHeight,
            textAlignVertical: "top", // ensures vertical top alignment
            maxHeight: MAX_HEIGHT,
          }}
        />

        <TouchableOpacity
          className="p-2"
          onPress={onSendPress}
          disabled={!messageText.trim() && !selectedMedia}
        >
          <Feather
            name="send"
            size={20}
            color={messageText.trim() || selectedMedia ? "#22c065" : "#484848"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputArea;
