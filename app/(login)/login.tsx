import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Login = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      {/* Top content (e.g., logo or animation) */}
      <View className="flex-1 items-center justify-center"></View>
      <View className="mb-10 px-5">
        <View className="mb-16 flex items-center justify-center">
          {/* Login Screen Image */}
          <View className="w-[95%] mx-auto h-[400px]">
            <Image
              className="mb-10 w-full h-full"
              source={require("../../assets/images/loginImage.png")}
              resizeMode="contain"
            />
          </View>
          <Text className="text-4xl font-medium text-black">
            Welcome To Linbox
          </Text>
          <Text className="text-xl text-gray-500 mt-2 w-[90%] text-center leading-normal">
            {" "}
            Share with anyone, anywhere.{" "}
          </Text>
          <Text className="text-xl text-gray-500 w-[90%] text-center leading-normal">
            A home for all the groups in your life.
          </Text>
        </View>

        {/* Sign In Buttons */}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            router.push("/screens/customerSignIn");
          }}
        >
          <View style={style.button} className="bg-[#22c065] rounded-full">
            <Text className="text-center text-black text-lg">Sign In</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          className="flex-row items-center gap-2 mt-5 border border-[#e7e5e7] rounded-full justify-center py-3"
          onPress={() => {
            router.push("/(tabs)/dashboard");
          }}
        >
          <View className="w-[20px] h-[20px]">
            <Image
              source={require("../../assets/images/google-icon.png")}
              resizeMode="contain"
              className="w-full h-full"
            />
          </View>
          <Text className="text-center text-black text-lg">
            Sign In With Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  button: {
    width: "100%",
    padding: 15,
  },
});

export default Login;
