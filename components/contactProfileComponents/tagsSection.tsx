import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface TagsSectionProps {
  theme: "light" | "dark";
}

const currentContact = {
  tags: {
    data: [
      { id: 1, name: "Priority", color: "bg-red-500" },
      { id: 2, name: "Follow-up", color: "bg-blue-500" },
      { id: 3, name: "Client", color: "bg-green-500" },
    ],
  },
};

const TagsSection = ({ theme }: TagsSectionProps) => {
  const [tagQueryText, setTagQueryText] = useState("");

  const handleAddTagToContact = () => {
    console.log("Adding tag");
  };

  const handleDeleteTag = (id: number) => {
    console.log(`Deleted tag with id: ${id}`);
  };

  return (
    <>
      <View
        className={`px-6 py-4 mt-4 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
      >
        <View className="flex-row justify-between items-center mb-4">
          <Text
            className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            Tags ({currentContact.tags.data.length})
          </Text>
          <TouchableOpacity>
            <Ionicons
              name="add"
              size={24}
              color={theme === "dark" ? "white" : "#4f46e5"}
            />
          </TouchableOpacity>
        </View>

        {/* Tags List */}
        {currentContact.tags.data.length > 0 ? (
          <View className="flex-row flex-wrap gap-2 mb-4">
            {currentContact.tags.data.map((tag) => (
              <View
                key={tag.id}
                className={`flex-row items-center px-3 py-1.5 rounded-full ${tag.color}`}
              >
                <Text className="text-white mr-1">{tag.name}</Text>
                <TouchableOpacity onPress={() => handleDeleteTag(tag.id)}>
                  <Entypo name="cross" size={16} color="white" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <View className="py-4 items-center">
            <MaterialIcons
              name="tag"
              size={32}
              color={theme === "dark" ? "#6b7280" : "#9ca3af"}
            />
            <Text
              className={`mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
            >
              No tags added yet
            </Text>
          </View>
        )}

        {/* Tag Search */}
        <View
          className={`mt-2 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"} p-2`}
        >
          <TextInput
            placeholder="Search tags..."
            placeholderTextColor={theme === "dark" ? "#9ca3af" : "#6b7280"}
            value={tagQueryText}
            onChangeText={setTagQueryText}
            className={`px-3 py-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          />
        </View>

        {/* Search Results (mock) */}
        {tagQueryText && (
          <View
            className={`mt-2 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"} p-2`}
          >
            <TouchableOpacity
              className="p-3 flex-row items-center"
              onPress={handleAddTagToContact}
            >
              <View
                className={`w-10 h-10 bg-blue-500 rounded-full items-center justify-center mr-3`}
              >
                <Text className="text-white font-bold">
                  {tagQueryText.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View>
                <Text className="font-medium text-gray-900">
                  {tagQueryText}
                </Text>
                <Text className="text-xs text-gray-500">Create new tag</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View className="w-full h-[1px] bg-gray-300"></View>
    </>
  );
};

export default TagsSection;
