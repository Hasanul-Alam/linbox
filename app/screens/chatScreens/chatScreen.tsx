import ChatHeader from "@/components/chatScreenComponents/chatHeader";
import InputArea from "@/components/chatScreenComponents/inputArea";
import MessageBubble from "@/components/chatScreenComponents/messageBubble";
import {
  ChatModals,
  MediaPreviewModal,
} from "@/components/chatScreenComponents/modals";
import TimerBar from "@/components/chatScreenComponents/timeBar";
import {
  handleDocumentSelection,
  handleImageSelection,
  handleVideoSelection,
} from "@/utils/helpers";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Define the Message type
type Message = {
  id: number;
  type: "text" | "image" | "video" | "document";
  text?: string;
  fromContact: boolean;
  time: string;
  status: "sent" | "delivered" | "read" | "failed";
  imageUrl?: string;
  fileName?: string;
  fileSize?: string;
  uri?: string;
  duration?: number;
};

const ChatScreen = () => {
  const router = useRouter();
  const [remainingTime, setRemainingTime] = useState(86399);
  const [showOptions, setShowOptions] = useState(false);
  const [isMessageOptionsVisible, setIsMessageOptionsVisible] = useState(false);
  const [messageText, setMessageText] = useState("");
  type SelectedMedia =
    | { type: "image"; uri: string }
    | { type: "video"; uri: string; duration?: number }
    | { type: "document"; name: string; size: string; uri: string };

  const [selectedMedia, setSelectedMedia] = useState<SelectedMedia | null>(
    null
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [anchorPosition, setAnchorPosition] = useState({ x: 0, y: 10 });
  const [isTranslationPopupVisible, setTranslationPopupVisible] =
    useState(false);
  const timerBar = useRef(new Animated.Value(100)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const params = useLocalSearchParams();
  const { name, whatsappNumber } = params;

  // Initialize with sample messages
  const messages: Message[] = [
    {
      id: 1,
      type: "text",
      text: "Hey there! How are you doing?",
      fromContact: true,
      time: "10:30 AM",
      status: "read",
    },
    {
      id: 2,
      type: "text",
      text: "I'm good, thanks! How about you?",
      fromContact: false,
      time: "10:32 AM",
      status: "read",
    },
    {
      id: 3,
      type: "image",
      imageUrl: "https://via.placeholder.com/200",
      text: "Check out this view!",
      fromContact: true,
      time: "10:33 AM",
      status: "delivered",
    },
    {
      id: 4,
      type: "document",
      fileName: "Meeting_Schedule.pdf",
      fileSize: "245 KB",
      text: "Here's the schedule.",
      fromContact: false,
      time: "10:34 AM",
      status: "sent",
    },
    {
      id: 5,
      type: "text",
      text: "Perfect! Thanks.",
      fromContact: false,
      time: "10:35 AM",
      status: "sent",
    },
    {
      id: 6,
      type: "text",
      text: "Perfect! Thanks.",
      fromContact: false,
      time: "10:35 AM",
      status: "sent",
    },
    {
      id: 7,
      type: "text",
      text: "Perfect! Thanks.",
      fromContact: false,
      time: "10:35 AM",
      status: "failed",
    },
  ];
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

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleOptionSelect = (value: string) => {
    if (value === "view_profile") {
      router.push("/screens/contactProfileScreens/contactProfileScreen");
    } else if (value === "set_label") {
      console.log("Set label option selected");
    } else if (value === "pin_contact") {
      console.log("Pin contact option selected");
    } else if (value === "tags") {
      console.log("Tags option selected");
    } else if (value === "groups") {
      console.log("Groups option selected");
    }
    setShowOptions(false);
  };

  const handleSendMessage = () => {
    if (!messageText.trim() && !selectedMedia) return;

    const newMessage: Message = {
      id: Date.now(),
      type: selectedMedia?.type || "text",
      text: messageText,
      fromContact: false,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
    };

    if (selectedMedia) {
      if (selectedMedia.type === "image") {
        newMessage.imageUrl = selectedMedia.uri;
      } else if (selectedMedia.type === "document") {
        newMessage.fileName = selectedMedia.name;
        newMessage.fileSize = selectedMedia.size;
        newMessage.uri = selectedMedia.uri;
      } else if (selectedMedia.type === "video") {
        newMessage.uri = selectedMedia.uri;
        newMessage.duration = selectedMedia.duration;
      }
    }

    // setMessages((prev) => [...prev, newMessage]);
    setMessageText("");
    setSelectedMedia(null);
    scrollToBottom();
  };

  const handleMessageOptionsSelect = async (option: string) => {
    try {
      let selectedMedia: any | null = null;

      switch (option) {
        case "image":
          selectedMedia = await handleImageSelection();
          break;
        case "video":
          selectedMedia = await handleVideoSelection();
          break;
        case "document":
          selectedMedia = await handleDocumentSelection();
          break;
        default:
          console.warn("Unhandled option:", option);
      }

      if (selectedMedia) {
        setSelectedMedia(selectedMedia);
        scrollToBottom();
      }
    } catch (error) {
      console.error("Error handling media selection:", error);
      Alert.alert(
        "Error",
        "Failed to process your selection. Please try again."
      );
    } finally {
      setIsMessageOptionsVisible(false);
    }
  };

  const currentContact = {
    id: "1",
    name: typeof name === "string" ? name : "Unknown",
    whatsappNumber: typeof whatsappNumber === "string" ? whatsappNumber : "",
    pinned: true,
    labels: {
      data: [{ color: "red" }],
    },
  };

  return (
    <View className="flex-1 bg-white py-2">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <SafeAreaView className="flex-1">
          <ChatHeader
            name={currentContact.name}
            whatsappNumber={currentContact.whatsappNumber}
            pinned={currentContact.pinned}
            labels={currentContact.labels}
            remainingTime={remainingTime}
            onBackPress={() => router.back()}
            onTranslationPress={() => setTranslationPopupVisible(true)}
            onOptionsPress={(position) => {
              setAnchorPosition(position);
              setShowOptions(true);
            }}
          />

          <TimerBar progress={timerBar} />

          <ScrollView
            ref={scrollViewRef}
            className="flex-1 px-3 mt-3"
            contentContainerStyle={{ paddingBottom: 10 }}
            onContentSizeChange={scrollToBottom}
            keyboardDismissMode="interactive"
          >
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                msg={msg}
                isFromContact={msg.fromContact}
                onMediaPress={setPreviewImage}
              />
            ))}
          </ScrollView>

          <InputArea
            messageText={messageText}
            selectedMedia={selectedMedia}
            onMessageChange={setMessageText}
            onSendPress={handleSendMessage}
            onEmojiPress={() => {}} // TODO: Implement emoji picker
            onAddPress={() => setIsMessageOptionsVisible(true)}
            onMediaRemove={() => setSelectedMedia(null)}
          />
        </SafeAreaView>
      </KeyboardAvoidingView>

      <ChatModals
        showOptions={showOptions}
        setShowOptions={setShowOptions}
        handleOptionSelect={handleOptionSelect}
        anchorPosition={anchorPosition}
        isTranslationPopupVisible={isTranslationPopupVisible}
        setTranslationPopupVisible={setTranslationPopupVisible}
        isMessageOptionsVisible={isMessageOptionsVisible}
        setIsMessageOptionsVisible={setIsMessageOptionsVisible}
        handleMessageOptionsSelect={handleMessageOptionsSelect}
      />

      <MediaPreviewModal
        visible={!!previewImage}
        mediaUri={previewImage}
        onClose={() => setPreviewImage(null)}
      />
    </View>
  );
};

export default ChatScreen;
