import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  LayoutRectangle,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface HeaderPosition {
  y: number;
  height: number;
}

const CommonHeader = () => {
  // State for popup visibility
  const [isWorkspacePopupVisible, setIsWorkspacePopupVisible] = useState(false);
  const [isProfilePopupVisible, setIsProfilePopupVisible] = useState(false);
  const router = useRouter();

  // State for header position (used for popup placement)
  const [headerPosition, setHeaderPosition] = useState<HeaderPosition>({
    y: 0,
    height: 0,
  });

  // Profile image - using require for local image
  const [profileImage] = useState(require("../../../assets/images/sanda.jpg"));

  /**
   * Toggle workspace popup visibility
   */
  const toggleWorkspacePopup = () => {
    setIsWorkspacePopupVisible(!isWorkspacePopupVisible);
  };

  /**
   * Toggle profile popup visibility
   */
  const toggleProfilePopup = () => {
    setIsProfilePopupVisible(!isProfilePopupVisible);
  };

  /**
   * Handle logout action
   */
  const handleLogout = () => {
    console.log("User logged out");
    // In a real app, you would add your logout logic here
    toggleProfilePopup(); // Close the popup after logout
  };

  /**
   * Save header position for popup placement
   */
  const onHeaderLayout = (event: {
    nativeEvent: { layout: LayoutRectangle };
  }) => {
    const { y, height } = event.nativeEvent.layout;
    setHeaderPosition({ y, height });
  };

  /**
   * Save profile image position (currently unused but kept for future use)
   */
  const onProfileImageLayout = (event: {
    nativeEvent: { layout: LayoutRectangle };
  }) => {
    // Position could be used for precise popup placement
    // const { x, width } = event.nativeEvent.layout;
  };

  return (
    <View className="w-[90%] mx-auto">
      {/* Hello From Development branch */}
      {/* Main header container */}
      <View className="flex-row justify-between items-center gap-3">
        {/* Workspace selector */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={toggleWorkspacePopup}
          onLayout={onHeaderLayout}
          className="flex-row items-center bg-[#f9f8fd] px-1 py-1 rounded-full border border-gray-200 gap-3"
        >
          <View className="w-[30px] h-[30px] overflow-hidden">
            <Image
              source={require("../../../assets/images/workspace.jpg")}
              className="w-full h-full rounded-full"
            />
          </View>
          <View className=" flex-row items-center gap-2">
            <Text className="text-base font-semibold text-gray-900">
              Workspace 1
            </Text>

            {/* Inline subtitle */}
            <View className="flex-row">
              <Text className="text-xs text-primary">Internal</Text>
              {/* <Text className="text-xs text-gray-500 ml-3">5 members</Text> */}
            </View>
          </View>

          {/* Dropdown icon */}
          <MaterialIcons
            name="keyboard-arrow-down"
            size={24}
            color="#6b7280"
            style={{
              transform: [
                { rotate: isWorkspacePopupVisible ? "180deg" : "0deg" },
              ],
            }}
          />
        </TouchableOpacity>

        {/* Profile picture */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={toggleProfilePopup}
          onLayout={onProfileImageLayout}
          className="w-[37px] h-[37px] bg-white overflow-hidden"
        >
          {profileImage ? (
            <Image
              source={profileImage}
              className="w-full h-full rounded-full"
            />
          ) : (
            <Text className="text-white font-bold text-lg bg-purple-500 w-[40px] h-[40px] rounded-full text-center leading-[40px]">
              H
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Workspace selection popup */}
      <Modal
        visible={isWorkspacePopupVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleWorkspacePopup}
        statusBarTranslucent={true}
      >
        <TouchableOpacity
          className="flex-1 bg-[rgba(0,0,0,0.3)]"
          activeOpacity={1}
          onPressOut={toggleWorkspacePopup}
        >
          <View
            className="w-[85%] mx-auto"
            style={{
              marginTop:
                headerPosition.y +
                headerPosition.height +
                (Platform.OS === "ios" ? 12 : 60),
            }}
          >
            <View className="bg-white rounded-xl py-1 shadow-xl shadow-black/30 overflow-hidden">
              {/* Workspace items with subtle hover effects */}
              <TouchableOpacity className="px-5 py-3 active:bg-gray-50 border-b border-gray-100">
                <View className="flex-row items-center justify-between">
                  <Text className="text-[16px] font-medium text-gray-800">
                    Workspace 1
                  </Text>
                  <MaterialIcons name="check" size={20} color="#4f46e5" />
                </View>
                <Text className="text-sm text-gray-500 mt-1">
                  Personal workspace
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="px-5 py-3 active:bg-gray-50 border-b border-gray-100">
                <Text className="text-[16px] font-medium text-gray-800">
                  Marketing Team
                </Text>
                {/* <Text className="text-sm text-gray-500 mt-1">5 members</Text> */}
              </TouchableOpacity>

              <TouchableOpacity className="px-5 py-3 active:bg-gray-50">
                <Text className="text-[16px] font-medium text-gray-800">
                  Development
                </Text>
                <Text className="text-sm text-gray-500 mt-1">12 members</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Profile actions popup */}
      <Modal
        visible={isProfilePopupVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleProfilePopup}
        statusBarTranslucent={true}
      >
        <TouchableOpacity
          className="flex-1 bg-[rgba(0,0,0,0.5)]"
          activeOpacity={1}
          onPressOut={toggleProfilePopup}
        >
          <View
            style={[
              styles.profilePopup,
              {
                right: 20,
                top:
                  headerPosition.y +
                  headerPosition.height +
                  (Platform.OS === "ios" ? 10 : 40),
              },
            ]}
          >
            <View className="bg-white rounded-xl py-2 shadow-lg shadow-black/25 min-w-[180px]">
              <TouchableOpacity
                className="px-4 py-3 active:bg-gray-100"
                onPress={() => {
                  setIsProfilePopupVisible(false);
                  router.push("/screens/profileScreens/profile");
                }}
              >
                <View className="flex-row items-center gap-3">
                  <MaterialIcons
                    name="person-outline"
                    size={20}
                    color="#4b5563"
                  />
                  <Text className="text-base text-gray-700">View Profile</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className="px-4 py-3 active:bg-gray-100"
                onPress={handleLogout}
              >
                <View className="flex-row items-center gap-3">
                  <MaterialIcons name="logout" size={20} color="#4b5563" />
                  <Text className="text-base text-gray-700">Logout</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  profilePopup: {
    position: "absolute",
    alignItems: "flex-end",
  },
});

export default CommonHeader;
