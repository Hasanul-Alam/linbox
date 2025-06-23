import CustomizedActionSheet from "@/components/reusableComponents/customizedActionSheet/customizedActionSheet";
import {
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatScreen = () => {
  const router = useRouter();
  const [remainingTime, setRemainingTime] = useState(86399);
  const [showOptions, setShowOptions] = useState(false);
  const timerBar = useRef(new Animated.Value(100)).current;
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [anchorPosition, setAnchorPosition] = useState({ x: 0, y: 10 });
  const scrollViewRef = useRef<ScrollView>(null);
  const params = useLocalSearchParams();
  const { name, whatsappNumber } = params;

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Animated.timing(timerBar, {
      toValue: (remainingTime / 86399) * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [remainingTime]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleOptionSelect = (index: number) => {
    if (index === 0) alert("View Profile");
    else if (index === 1) alert("Mute");
    else if (index === 2) alert("Block");
  };

  const currentContact = {
    id: "1",
    name: typeof name === "string" ? name : "",
    whatsappNumber: typeof whatsappNumber === "string" ? whatsappNumber : "",
    pinned: true,
    labels: {
      data: [{ color: "red" }],
    },
  };

  const messages = [
    {
      id: 1,
      type: "text",
      text: "Hey there! How are you doing?",
      fromContact: true,
      time: "10:30 AM",
    },
    {
      id: 2,
      type: "text",
      text: "I'm good, thanks! How about you?",
      fromContact: false,
      time: "10:32 AM",
    },
    {
      id: 245,
      type: "text",
      text: "I'm good, thanks! How about you?",
      fromContact: false,
      time: "10:32 AM",
    },
    {
      id: 278,
      type: "text",
      text: "I'm good, thanks! How about you?",
      fromContact: false,
      time: "10:32 AM",
    },
    {
      id: 289,
      type: "text",
      text: "I'm good, thanks! How about you?",
      fromContact: false,
      time: "10:32 AM",
    },
    {
      id: 3,
      type: "image",
      imageUrl: "https://via.placeholder.com/200",
      text: "Check out this view!",
      fromContact: true,
      time: "10:33 AM",
    },
    {
      id: 4,
      type: "document",
      fileName: "Meeting_Schedule.pdf",
      fileSize: "245 KB",
      text: "Here's the schedule.",
      fromContact: false,
      time: "10:34 AM",
    },
    {
      id: 5,
      type: "text",
      text: "Perfect! Thanks.",
      fromContact: false,
      time: "10:35 AM",
    },
  ];

  return (
    <View className="flex-1 bg-white pt-2">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <SafeAreaView className="flex-1">
          {/* Header */}
          <View className="w-[95%] mx-auto mb-2">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="chevron-back-outline" size={24} />
                </TouchableOpacity>
                <View className="relative">
                  <View className="bg-green-500 w-9 h-9 rounded-full items-center justify-center">
                    <Text className="text-white text-lg">
                      {currentContact.name.charAt(0)}
                    </Text>
                  </View>
                  {currentContact.pinned && (
                    <View className="absolute -bottom-1 -left-1 p-1 rounded-full bg-[#ed8b8b]">
                      <SimpleLineIcons name="pin" size={12} color="black" />
                    </View>
                  )}
                </View>
                <View>
                  <View className="flex-row gap-2 items-center">
                    <Text className="text-xl font-semibold">
                      {currentContact.name.length > 12
                        ? currentContact.name.slice(0, 12) + "..."
                        : currentContact.name}
                    </Text>
                    {currentContact.labels?.data?.length > 0 && (
                      <MaterialCommunityIcons
                        name="label"
                        size={18}
                        color={currentContact.labels.data[0].color}
                      />
                    )}
                  </View>
                  <Text className="text-sm">
                    {currentContact.whatsappNumber}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center gap-2">
                <Text className="text-sm">{formatTime(remainingTime)}</Text>
                <TouchableOpacity>
                  <Ionicons name="language-outline" size={18} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={(e) => {
                    e.currentTarget.measure(
                      (x, y, width, height, pageX, pageY) => {
                        setAnchorPosition({ x: pageX, y: pageY });
                        setShowOptions(true);
                      }
                    );
                  }}
                >
                  <Ionicons name="ellipsis-vertical" size={17} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Timer Bar */}
          <View className="mt-1 w-full h-1 bg-gray-200">
            <Animated.View
              className="h-full bg-green-500"
              style={{
                width: timerBar.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"],
                }),
              }}
            />
          </View>

          {/* Messages */}
          <ScrollView
            ref={scrollViewRef}
            className="flex-1 px-3"
            contentContainerStyle={{ paddingBottom: 10 }}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }
            keyboardDismissMode="interactive"
          >
            {messages.map((msg) => {
              const containerStyle = msg.fromContact
                ? "bg-gray-100 self-start rounded-bl-sm"
                : "bg-[#DCF8C6] self-end rounded-br-sm";

              return (
                <View
                  key={msg.id}
                  className={`max-w-[80%] p-3 rounded-xl my-2 ${containerStyle}`}
                >
                  {/* Text */}
                  {msg.type === "text" && (
                    <Text className="text-base">{msg.text}</Text>
                  )}

                  {/* Image */}
                  {msg.type === "image" && (
                    <>
                      <TouchableOpacity
                        onPress={() => setPreviewImage(msg.imageUrl ?? null)}
                        activeOpacity={0.9}
                      >
                        <Image
                          source={{ uri: msg.imageUrl }}
                          className="w-48 h-48 rounded-md mb-2"
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                      {msg.text && (
                        <Text className="text-base mt-1">{msg.text}</Text>
                      )}
                    </>
                  )}

                  {/* Document */}
                  {msg.type === "document" && (
                    <>
                      <View className="flex-row items-center justify-between bg-white border border-gray-300 rounded-md p-2">
                        <View className="flex-row items-center gap-2">
                          <Feather name="file-text" size={20} color="#555" />
                          <View>
                            <Text className="text-sm font-medium">
                              {msg.fileName}
                            </Text>
                            <Text className="text-xs text-gray-500">
                              {msg.fileSize}
                            </Text>
                          </View>
                        </View>
                        <TouchableOpacity
                          onPress={() => alert("Download started")}
                        >
                          <Feather name="download" size={20} color="#333" />
                        </TouchableOpacity>
                      </View>
                      {msg.text && (
                        <Text className="text-base mt-1">{msg.text}</Text>
                      )}
                    </>
                  )}

                  {/* Timestamp */}
                  <Text className="text-xs text-gray-600 self-end mt-1">
                    {msg.time}
                  </Text>
                </View>
              );
            })}
          </ScrollView>

          {/* Input */}
          <View className="border-t border-gray-200 px-4 py-2 bg-white">
            <View className="flex-row items-center">
              <TouchableOpacity className="p-2">
                <Entypo name="emoji-happy" size={19} color="#484848" />
              </TouchableOpacity>
              <TouchableOpacity className="p-2">
                <Entypo name="plus" size={22} color="#484848" />
              </TouchableOpacity>
              <TextInput
                className="flex-1 mx-2 py-2 px-4 bg-gray-100 rounded-lg max-h-[80px] overflow-auto"
                placeholder="Type a message..."
                placeholderTextColor="#888"
                onFocus={() => {
                  setTimeout(() => {
                    scrollViewRef.current?.scrollToEnd({ animated: true });
                  }, 100);
                }}
                multiline={true}
              />
              <TouchableOpacity className="p-2">
                <Feather name="send" size={20} color="#484848" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>

      {/* Action Sheet */}
      {showOptions && (
        <CustomizedActionSheet
          visible={showOptions}
          onClose={() => setShowOptions(false)}
          onOptionSelect={handleOptionSelect}
          anchorPosition={anchorPosition}
        />
      )}

      {/* Image Preview Modal */}
      <Modal visible={!!previewImage} transparent animationType="fade">
        <TouchableOpacity
          className="flex-1 bg-black items-center justify-center"
          onPress={() => setPreviewImage(null)}
          activeOpacity={1}
        >
          <Image
            source={{ uri: previewImage! }}
            style={{ width: "90%", height: "80%", borderRadius: 12 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ChatScreen;
