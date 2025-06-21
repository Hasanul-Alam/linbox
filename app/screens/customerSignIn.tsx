import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CustomerSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleLogin = () => {
    console.log(email, password);
  };

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
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }} // Centers form
          keyboardShouldPersistTaps="handled"
        >
          {/* Main Form (Centered) */}
          <View className="px-6 pb-10">
            {/* <View className="items-center justify-center mb-8">
              <Text className="text-2xl">LOGO</Text>
            </View> */}

            <Text className="text-4xl font-semibold text-center text-[#000] mb-2 capitalize">
              Join With Us
            </Text>
            <Text className="text-lg text-center text-gray-500 mb-8">
              Enter credentials to get started.
            </Text>

            {/* Email Input */}
            <View className="mb-5 flex items-center border border-gray-300 rounded-full px-4 py-2 bg-gray-50">
              <TextInput
                className="w-full text-base"
                placeholder="example@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View className="mb-8 flex-row items-center border border-gray-300 rounded-full px-4 py-2 bg-gray-50">
              <TextInput
                className="flex-1 text-base"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="gray"
                />
              </Pressable>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity
              onPress={handleLogin}
              className="bg-[#22c065] py-4 rounded-full"
            >
              <Text className="text-center text-white text-lg font-medium">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CustomerSignIn;
