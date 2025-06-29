import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface EditNoteModalProps {
  visible: boolean;
  theme: "light" | "dark";
  noteText: string;
  noteId: any;
  onTextChange: (text: string) => void;
  onClose: () => void;
}

const EditNoteModal = ({
  visible,
  theme,
  noteText,
  noteId,
  onTextChange,
  onClose,
}: EditNoteModalProps) => {
  const popupScale = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateNote = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        `/contacts/9d3e5117-ec39-4cb0-bed7-b223a1e75601/notes/${noteId}`,
        {
          content: noteText,
        }
      );
      if (response.status === 200) {
        // Do real time change later.
        console.log("note updated successfully");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  useEffect(() => {
    if (visible) {
      Animated.spring(popupScale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(popupScale, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Pressable
      className="absolute inset-0 bg-black/20 justify-center items-center"
      onPress={onClose} // This will close the modal when backdrop is pressed
    >
      {/* This Pressable stops the event propagation when clicking inside the modal */}
      <Pressable onPress={(e) => e.stopPropagation()}>
        <Animated.View
          className={`min-w-[90%] max-w-[90%] rounded-xl ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
          style={{ transform: [{ scale: popupScale }] }}
        >
          <View className="p-6">
            <Text
              className={`text-xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Edit Note
            </Text>
            <TextInput
              value={noteText}
              onChangeText={onTextChange}
              multiline
              className={`px-3 pb-5 rounded-lg border mb-6 ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
            />
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
                className={`px-5 py-2.5 rounded-lg flex-row items-center justify-center ${
                  isLoading ? "bg-indigo-400" : "bg-indigo-600"
                }`}
                onPress={handleUpdateNote}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Text className="text-white font-medium me-2">
                      Updating
                    </Text>
                    <ActivityIndicator size="small" color="#ffffff" />
                  </>
                ) : (
                  <Text className="text-white font-medium">Update</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Pressable>
  );
};

export default EditNoteModal;
