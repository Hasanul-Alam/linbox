import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const BackButton = ({ bgColor }: any) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      className={`${bgColor ? bgColor : "bg-white"} w-[35px] h-[35px] border border-gray-400 rounded-full flex items-center justify-center`}
      onPress={() => router.back()}
    >
      <Ionicons name="chevron-back" size={20} color="black" />
    </TouchableOpacity>
  );
};

export default BackButton;
