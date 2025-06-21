import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, Platform, Text, TouchableOpacity, View } from "react-native";

const CommonHeader = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [headerPosition, setHeaderPosition] = useState({ y: 0, height: 0 });

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const onHeaderLayout = (event: any) => {
    const { y, height } = event.nativeEvent.layout;
    setHeaderPosition({ y, height });
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={togglePopup}
        onLayout={onHeaderLayout}
        className="w-[90%] py-3 px-5 bg-white border border-[#e7e5e7] mx-auto rounded-2xl"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Text className="text-lg text-black">Main</Text>
            <View className="flex-row items-center gap-1 bg-slate-200 px-2 rounded-md">
              {/* <Feather name="shield" size={12} color="black" /> */}
              <Text className="text-sm text-black">Internal</Text>
            </View>
          </View>
          <View>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={24}
              color="black"
              style={{
                transform: [{ rotate: isPopupVisible ? "180deg" : "0deg" }],
              }}
            />
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        visible={isPopupVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={togglePopup}
        statusBarTranslucent={true}
      >
        <View className="flex-1 bg-[rgba(0,0,0,0.5)]">
          <TouchableOpacity
            className="absolute top-0 left-0 right-0 bottom-0"
            activeOpacity={1}
            onPress={togglePopup}
          />

          <View
            className={`absolute left-[5%] right-[5%] ${
              Platform.OS === "ios" ? "top-[10]" : "top-[60]"
            }`}
            style={{
              top:
                headerPosition.y +
                headerPosition.height +
                (Platform.OS === "ios" ? 10 : 63),
            }}
          >
            <View className="bg-white rounded-2xl py-2 shadow-lg shadow-black/25">
              <TouchableOpacity className="px-4 py-3">
                <Text className="text-lg">Workspace 1</Text>
              </TouchableOpacity>
              <TouchableOpacity className="px-4 py-3">
                <Text className="text-lg">Workspace 2</Text>
              </TouchableOpacity>
              <TouchableOpacity className="px-4 py-3">
                <Text className="text-lg">Workspace 3</Text>
              </TouchableOpacity>
              <Text className="text-xs text-center text-gray-400 px-4 py-3 border-t border-gray-200">
                Switch Workspace
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CommonHeader;
