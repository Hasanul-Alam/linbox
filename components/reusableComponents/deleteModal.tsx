import React, { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface DeleteModalProps {
  visible: boolean;
  theme: "light" | "dark";
  itemName?: string;
  onClose: () => void;
  onConfirm: () => void;
  url?: string;
}

const DeleteModal = ({
  visible,
  theme,
  itemName = "this item",
  onClose,
  onConfirm,
  url,
}: DeleteModalProps) => {
  const popupScale = useRef(new Animated.Value(0)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(popupScale, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(popupScale, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      className="absolute inset-0 justify-center items-center flex-1"
      style={{ opacity: backdropOpacity }}
    >
      <Pressable className="absolute inset-0 bg-black/50" onPress={onClose} />

      <Animated.View
        className={`w-11/12 rounded-xl ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
        style={{ transform: [{ scale: popupScale }] }}
      >
        <Pressable onPress={(e) => e.stopPropagation()}>
          <View className="p-6">
            <Text
              className={`text-xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Confirm Delete
            </Text>

            <Text
              className={`text-base mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
            >
              Are you sure you want to delete {itemName}? This action cannot be
              undone.
            </Text>

            <View className="flex-row justify-end gap-3">
              <TouchableOpacity
                className={`px-5 py-2.5 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}
                onPress={onClose}
              >
                <Text
                  className={theme === "dark" ? "text-white" : "text-gray-900"}
                >
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="px-5 py-2.5 bg-red-600 rounded-lg"
                onPress={onConfirm}
              >
                <Text className="text-white font-medium">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

export default DeleteModal;
