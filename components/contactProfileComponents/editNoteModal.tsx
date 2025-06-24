import { useEffect, useRef } from "react";
import {
  Animated,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface EditNoteModalProps {
  visible: boolean;
  theme: "light" | "dark";
  noteText: string;
  onTextChange: (text: string) => void;
  onClose: () => void;
  onSave: () => void;
}

const EditNoteModal = ({
  visible,
  theme,
  noteText,
  onTextChange,
  onClose,
  onSave,
}: EditNoteModalProps) => {
  const popupScale = useRef(new Animated.Value(0)).current;

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
    <View className="absolute inset-0 bg-black bg-opacity-50 justify-center items-center">
      <Animated.View
        className={`w-11/12 rounded-xl ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
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
            className={`p-3 rounded-lg border mb-6 ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
            style={{ minHeight: 120 }}
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
              className="px-5 py-2.5 bg-indigo-600 rounded-lg"
              onPress={onSave}
            >
              <Text className="text-white font-medium">Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default EditNoteModal;
