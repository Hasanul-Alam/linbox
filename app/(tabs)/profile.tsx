import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Profile = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Back Button (FIXED at top-left) */}
      <TouchableOpacity
        className="absolute top-4 left-6 z-10 bg-slate-200 p-2 rounded-full"
        style={{ marginTop: Platform.OS === "android" ? 30 : 0 }}
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back" size={20} color="black" />
      </TouchableOpacity>

      {/* Scrollable Content */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }} // Centers form
          keyboardShouldPersistTaps="handled"
        >
          {/* Main Form (Centered) */}
          <View className="px-6 pb-10">
            <Text className="text-4xl font-medium text-black">Profile</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Profile;
