import GroupsAndTagsSkeleton from "@/app/skeletons/groupsAndTagsSkeleton";
import axiosInstance from "@/utils/axiosInstance";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AddTagModal from "./addTagModal";

interface TagsSectionProps {
  theme: "light" | "dark";
  contactId: any;
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

const TagsSection = ({ theme, contactId }: TagsSectionProps) => {
  const [tagQueryText, setTagQueryText] = useState("");
  const [isAddTagModalOpen, setIsAddTagModalOpen] = useState(false);
  interface Tag {
    id: number;
    name: string;
    color?: string;
  }

  const [contactTags, setContactTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetTags = async () => {
    setIsLoading(true);
    try {
      // Fetch tags from API
      const response = await axiosInstance.get(
        `/contacts/9d3e5117-ec39-4cb0-bed7-b223a1e75601/tags`
      );
      setContactTags(response.data.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTag = () => {
    console.log("Adding tag");
  };

  const handleRemoveTagFromContact = (id: number) => {
    console.log(`Removed tag with id: ${id} from contact`);
  };

  useEffect(() => {
    handleGetTags();
  }, [contactId]);

  if (isLoading) {
    return (
      <View className="border-b border-gray-300">
        <GroupsAndTagsSkeleton theme={"light"} />
      </View>
    );
  }

  return (
    <>
      <View
        className={`px-6 py-4 ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl w-[90%] mx-auto`}
      >
        <View className="flex-row justify-between items-center mb-4">
          <Text
            className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            Tags ({contactTags.length})
          </Text>
          <TouchableOpacity onPress={() => setIsAddTagModalOpen(true)}>
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
            {contactTags.map((tag) => (
              <View
                key={tag.id}
                className={`flex-row items-center px-3 py-1.5 rounded-lg bg-primary/20`}
              >
                <Text className="text-black mr-1">{tag.name}</Text>
                <TouchableOpacity
                  onPress={() => handleRemoveTagFromContact(tag.id)}
                >
                  <Entypo name="cross" size={16} color="green" />
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

        {/* Search Results (mock) */}
        {tagQueryText && (
          <View
            className={`mt-2 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"} p-2`}
          >
            <TouchableOpacity
              className="p-3 flex-row items-center"
              onPress={handleAddTag}
            >
              <View
                className={`w-10 h-10 ${theme === "dark" ? "bg-gray-600" : "bg-gray-200"} rounded-full items-center justify-center mr-3`}
              >
                <Text
                  className={`${theme === "dark" ? "text-white" : "text-gray-900"} font-bold`}
                >
                  {tagQueryText.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View>
                <Text
                  className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  {tagQueryText}
                </Text>
                <Text
                  className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                >
                  Create new tag
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/* Divider */}
      <View className="w-full h-[1px] bg-gray-300"></View>

      {isAddTagModalOpen && (
        <AddTagModal
          visible={isAddTagModalOpen}
          onClose={() => setIsAddTagModalOpen(false)}
          contactId={contactId}
        />
      )}
    </>
  );
};

export default TagsSection;
