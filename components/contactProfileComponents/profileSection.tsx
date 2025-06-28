import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Alert, Animated, Image, Pressable, Text, View } from "react-native";

interface ProfileSectionProps {
  theme: "light" | "dark";
}

const ProfileSection = ({
  theme,
  name,
  whatsappNumber,
  spent,
  avatar,
}: any) => {
  const [profileAnim] = useState(new Animated.Value(0));

  console.log(" ProfileSection props:", name, whatsappNumber, spent, avatar);

  useEffect(() => {
    Animated.timing(profileAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const copyToClipboard = (text: string) => {
    Alert.alert("Copied to clipboard", text, [{ text: "OK" }]);
  };

  return (
    <Animated.View
      style={{
        opacity: profileAnim,
        transform: [
          {
            translateY: profileAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0],
            }),
          },
        ],
      }}
    >
      <View className="items-center pb-6 pt-2">
        {/* Profile Image */}
        <View className="mb-3 relative">
          {avatar ? (
            <Image
              source={{ uri: avatar }}
              className="w-28 h-28 rounded-full"
            />
          ) : (
            <View className="w-28 h-28 rounded-full bg-primary items-center justify-center">
              <Text className="text-4xl font-semibold text-black">
                {name.charAt(0)}
              </Text>
            </View>
          )}
        </View>

        {/* Profile Name */}
        <View className="flex-row items-center mb-1">
          <Pressable onPress={() => copyToClipboard(name)}>
            <Text
              className={`text-2xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              {name}
            </Text>
          </Pressable>
        </View>

        {/* Phone Number & Balance */}
        <View className="flex-row items-center gap-4">
          {/* Phone Number */}
          <View className="flex-row items-center">
            <Ionicons
              name="call"
              size={16}
              color={"green"}
              style={{ marginRight: 4 }}
            />
            <Pressable onPress={() => copyToClipboard(whatsappNumber)}>
              <Text
                className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
              >
                {whatsappNumber}
              </Text>
            </Pressable>
          </View>

          {/* Balance */}
          <View className="flex-row items-center">
            <View className={`flex-row items-center rounded-lg`}>
              <FontAwesome5
                name="coins"
                size={16}
                color="#f59e0b"
                style={{ marginRight: 8 }}
              />
              <Text
                className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                ${JSON.parse(spent).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className="w-full h-[1px] bg-gray-300"></View>
    </Animated.View>
  );
};

export default ProfileSection;
