import BackButton from "@/components/reusableComponents/BackButton";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomerSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log(email, password);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-[90%] mx-auto">
        {/* Back Button (FIXED at top-left) */}
        <BackButton />
      </View>

      {/* Scrollable Content with KeyboardAvoidingView */}
      <KeyboardAvoidingView
        className=""
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingBottom: 20, // Add some padding at the bottom
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Main Form (Centered) */}
          <View className="w-[90%] mx-auto pb-10">
            <Text className="text-4xl font-semibold text-center text-[#000] mb-2 capitalize">
              Sign In
            </Text>
            <Text className="text-lg text-center text-gray-500 mb-8">
              Enter credentials to sign in.
            </Text>

            {/* Email Input */}
            <View className="mb-5 flex items-center border border-gray-300 rounded-full px-4 py-1 bg-white">
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
            <View className="mb-8 flex-row items-center border border-gray-300 rounded-full px-4 py-1 bg-white">
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
              className="bg-[#22c065] py-3 rounded-full"
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
