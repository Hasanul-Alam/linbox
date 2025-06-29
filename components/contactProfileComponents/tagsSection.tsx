import GroupsAndTagsSkeleton from "@/app/skeletons/groupsAndTagsSkeleton";
import axiosInstance from "@/utils/axiosInstance";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
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
  const [isAddTagModalOpen, setIsAddTagModalOpen] = useState(false);
  const [contactTags, setContactTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [removingTagId, setRemovingTagId] = useState(null);

  interface Tag {
    id: number;
    name: string;
    color?: string;
  }
  const handleGetTags = async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      // Fetch tags from API
      const response = await axiosInstance.get(
        `/contacts/9d3e5117-ec39-4cb0-bed7-b223a1e75601/tags`
      );
      setContactTags(response.data.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      setIsLoading(false);
      setIsLoading(false);
    }
  };

  const handleAddTags = async (ids: any) => {
    try {
      const response = await axiosInstance.post(
        `/contacts/9d3e5117-ec39-4cb0-bed7-b223a1e75601/tags`,
        {
          tags: ids,
        }
      );
      if (response.status === 200) {
        setContactTags((prevTags) => [...prevTags, response.data.data]);
      }
    } catch (error) {
      console.error("Error adding tag:", error);
    } finally {
      setIsAddTagModalOpen(false);
    }
    console.log("Adding tag", ids);
  };

  // const handleCreateTag = async (tagName: string) => {
  //   try {
  //     setIsCreating(true);
  //     const response = await axiosInstance.post(`/tags`, {
  //       name: tagName,
  //     });
  //     if (response.status === 200) {
  //       setContactTags((prevTags) => [...prevTags, response.data.data]);
  //     }
  //   } catch (error) {
  //     console.error("Error creating tag:", error);
  //   } finally {
  //     setIsAddTagModalOpen(false);
  //     setIsCreating(false);
  //   }
  //   console.log("Creating tag", tagName);
  // };

  const handleRemoveTagFromContact = async (id: any) => {
    try {
      setRemovingTagId(id);
      const response = await axiosInstance.delete(
        `/contacts/9d3e5117-ec39-4cb0-bed7-b223a1e75601/tags/${id}`
      );
      if (response.status === 200) {
        // Remove the tag from the local state
        setContactTags((prevTags: Tag[]) =>
          prevTags.filter((tag: Tag) => tag.id !== id)
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRemovingTagId(null);
    }
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
                  {removingTagId === tag.id ? (
                    <ActivityIndicator size="small" color="green" />
                  ) : (
                    <Entypo name="cross" size={16} color="green" />
                  )}
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
      </View>
      {/* Divider */}
      <View className="w-full h-[1px] bg-gray-300"></View>

      {isAddTagModalOpen && (
        <AddTagModal
          visible={isAddTagModalOpen}
          onClose={() => setIsAddTagModalOpen(false)}
          contactId={contactId}
          isLoading={isLoading}
          onAdd={handleAddTags}
        />
      )}
    </>
  );
};

export default TagsSection;
