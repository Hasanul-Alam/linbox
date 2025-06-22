import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";

const LiveChat = () => {
  const handleWhatsAppRedirect = () => {
    const url =
      "https://api.whatsapp.com/send/?phone=447309574692&text=Hi&type=phone_number&app_absent=0";
    Linking.openURL(url);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 24,
            paddingBottom: 40,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Chat Illustration */}
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/733/733585.png", // WhatsApp icon or chat illustration
            }}
            style={{
              width: 120,
              height: 120,
              marginBottom: 24,
            }}
            resizeMode="contain"
          />

          {/* Heading */}
          <Text className="text-4xl font-semibold text-black mb-3">
            Live Chat
          </Text>

          {/* Subtext */}
          <Text className="text-center text-base text-gray-600 mb-10">
            Need help? Tap the button below to start a live chat on WhatsApp
            with our support team.
          </Text>

          {/* WhatsApp Button */}
          <TouchableOpacity
            onPress={handleWhatsAppRedirect}
            className="flex-row items-center justify-center px-6 py-3 rounded-full"
            style={{ backgroundColor: "#22c065" }}
            activeOpacity={0.8}
          >
            <FontAwesome name="whatsapp" size={20} color="#fff" />
            <Text className="text-white text-base font-semibold ml-2">
              Chat on WhatsApp
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LiveChat;
