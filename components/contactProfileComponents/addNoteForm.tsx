import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface AddNoteFormProps {
  theme: "light" | "dark";
  noteText: string;
  onTextChange: (text: string) => void;
  onSave: () => void;
}

const AddNoteForm = ({
  theme,
  noteText,
  onTextChange,
  onSave,
}: AddNoteFormProps) => {
  return (
    <View
      className={`px-3 pb-3 rounded-xl ${theme === "dark" ? "bg-gray-700" : "bg-gray-50"}`}
    >
      {/* <Text
        className={`font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
      >
        Add a note
      </Text> */}
      <TextInput
        placeholder="Type here to add a note..."
        placeholderTextColor={theme === "dark" ? "#6b7280" : "#9ca3af"}
        multiline
        value={noteText}
        onChangeText={onTextChange}
        className={` ${theme === "dark" ? "text-white" : "text-gray-900"}`}
      />
      <View className="flex-row justify-end mt-3">
        <TouchableOpacity
          className={`px-5 py-2 rounded-lg ${noteText ? "bg-indigo-600" : "bg-gray-400"}`}
          onPress={onSave}
          disabled={!noteText}
        >
          <Text className="text-white font-medium">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddNoteForm;
