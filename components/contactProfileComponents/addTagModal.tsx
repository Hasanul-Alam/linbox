import axiosInstance from "@/utils/axiosInstance";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Tag = {
  id: string;
  name: string;
  color?: string;
};

const AddTagModal = ({
  visible,
  onClose,
  contactId,
  onAdd,
  isLoading,
}: {
  visible: boolean;
  onClose: () => void;
  contactId: string;
  onAdd: (selectedTags: string[]) => void;
  isLoading: boolean;
}) => {
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const fetchAvailableTags = async () => {
    try {
      const response = await axiosInstance.get(
        `/contacts/9d3e5117-ec39-4cb0-bed7-b223a1e75601/tags/available`
      );
      setAvailableTags(response.data.data);
      setFilteredTags(response.data.data);
    } catch (error) {
      console.error("Error fetching available tags:", error);
    }
  };

  useEffect(() => {
    if (visible) {
      fetchAvailableTags();
      setSelectedTags([]);
      setSearchText("");
    }
  }, [visible]);

  useEffect(() => {
    if (searchText) {
      const filtered = availableTags.filter((tag) =>
        tag.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredTags(filtered);
    } else {
      setFilteredTags(availableTags);
    }
  }, [searchText, availableTags]);

  const toggleTagSelection = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleCreateTag = async (tagName: string) => {
    try {
      setIsCreating(true);
      const response = await axiosInstance.post(`/tags`, {
        name: tagName,
      });
      if (response.status === 200) {
        // setContactTags((prevTags) => [...prevTags, response.data.data]);
        setAvailableTags((prevTags) => [...prevTags, response.data.data]);
        setSelectedTags((prev) => [...prev, response.data.data.id]);
        setSearchText("");
      }
    } catch (error) {
      console.error("Error creating tag:", error);
    } finally {
      // setIsAddTagModalOpen(false);
      setIsCreating(false);
    }
    console.log("Creating tag", tagName);
  };

  const handleAddTags = () => {
    onAdd(selectedTags);
    setSelectedTags([]);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 bg-black/40 justify-center items-center px-4"
        onPress={onClose}
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-white rounded-2xl p-6 shadow-lg"
        >
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-semibold text-gray-800">
              Add Tags
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#9ca3af" />
            </TouchableOpacity>
          </View>

          {/* Search Input */}
          <View className="flex-row items-center bg-gray-100 rounded-xl px-3 py-2 mb-4">
            <Ionicons
              name="search"
              size={18}
              color="#9ca3af"
              className="mr-2"
            />
            <TextInput
              placeholder="Search tag..."
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#9ca3af"
              className="flex-1 text-gray-700"
            />
          </View>

          {/* Tag List */}
          <ScrollView
            className="max-h-64 mb-4"
            showsVerticalScrollIndicator={false}
          >
            {filteredTags.map((tag) => (
              <TouchableOpacity
                key={tag.id}
                className="flex-row items-center justify-between px-3 py-3 rounded-lg mb-3 bg-gray-50"
                onPress={() => toggleTagSelection(tag.id)}
              >
                <Text
                  className={`text-base ${
                    selectedTags.includes(tag.id)
                      ? "font-semibold text-primary"
                      : "text-gray-700"
                  }`}
                >
                  {tag.name}
                </Text>
                {selectedTags.includes(tag.id) ? (
                  <View className="w-6 h-6 rounded-full bg-primary justify-center items-center">
                    <Ionicons name="checkmark" size={16} color="white" />
                  </View>
                ) : (
                  <View className="w-6 h-6 rounded-full border border-gray-300" />
                )}
              </TouchableOpacity>
            ))}

            {filteredTags.length === 0 && searchText.length && (
              <Text className="text-gray-500 text-center py-3">
                {`No tags found for "${searchText.trim()}"`}
              </Text>
            )}
          </ScrollView>

          {/* create tag */}
          {searchText.length && filteredTags.length === 0 && (
            <TouchableOpacity
              className={`h-12 rounded-xl flex-row items-center justify-center ${
                (filteredTags.length === 0 && searchText.length) ||
                selectedTags.length > 0
                  ? "bg-primary"
                  : "bg-gray-300 opacity-50"
              }`}
              onPress={() => handleCreateTag(searchText)}
              disabled={
                (!searchText.trim() && selectedTags.length === 0) || isLoading
              }
              activeOpacity={0.8}
            >
              {isCreating ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text className="text-white font-semibold text-base">
                  Create {searchText}
                </Text>
              )}
            </TouchableOpacity>
          )}

          <TouchableOpacity
            className={`h-12 rounded-xl flex-row items-center justify-center mt-2 ${
              (filteredTags.length === 0 && searchText.trim()) ||
              selectedTags.length > 0
                ? "bg-primary"
                : "bg-gray-300 opacity-50"
            }`}
            onPress={handleAddTags}
            disabled={
              (!searchText.trim() && selectedTags.length === 0) || isLoading
            }
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold text-base">Add</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default AddTagModal;
