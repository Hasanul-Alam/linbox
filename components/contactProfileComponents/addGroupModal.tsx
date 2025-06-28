import { Ionicons } from "@expo/vector-icons";
import React from "react";
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

type Group = {
  id: string;
  name: string;
};

const AddGroupModal = ({
  visible,
  onClose,
  allGroups,
  onAdd,
  isLoading,
}: any) => {
  const [searchQueryText, setSearchQueryText] = React.useState("");
  const [filteredGroups, setFilteredGroups] = React.useState<Group[]>([]);
  const [selectedGroups, setSelectedGroups] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (searchQueryText) {
      const filtered = allGroups.filter((group: Group) =>
        group.name.toLowerCase().includes(searchQueryText.toLowerCase())
      );
      setFilteredGroups(filtered);
    } else {
      setFilteredGroups(allGroups);
    }
  }, [searchQueryText, allGroups]);

  const toggleGroupSelection = (groupId: string) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleAddGroups = () => {
    onAdd(selectedGroups);
    setSelectedGroups([]);
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      {/* Dim background */}
      <Pressable
        className="flex-1 bg-black/40 justify-center items-center px-4"
        onPress={onClose}
      >
        {/* Modal Container */}
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-white rounded-2xl p-6 shadow-lg"
        >
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-semibold text-gray-800">
              Add Groups
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
              placeholder="Search group..."
              value={searchQueryText}
              onChangeText={setSearchQueryText}
              placeholderTextColor="#9ca3af"
              className="flex-1 text-gray-700"
            />
          </View>

          {/* Group List */}
          <ScrollView
            className="max-h-64 mb-4"
            showsVerticalScrollIndicator={false}
          >
            {filteredGroups.map((group: Group) => (
              <TouchableOpacity
                key={group.id}
                className="flex-row items-center justify-between px-3 py-3 rounded-lg mb-3 bg-gray-50"
                onPress={() => toggleGroupSelection(group.id)}
              >
                <Text
                  className={`text-base ${
                    selectedGroups.includes(group.id)
                      ? "font-semibold text-primary"
                      : "text-gray-700"
                  }`}
                >
                  {group.name}
                </Text>
                {selectedGroups.includes(group.id) ? (
                  <View className="w-6 h-6 rounded-full bg-primary justify-center items-center">
                    <Ionicons name="checkmark" size={16} color="white" />
                  </View>
                ) : (
                  <View className="w-6 h-6 rounded-full border border-gray-300" />
                )}
              </TouchableOpacity>
            ))}

            {filteredGroups.length === 0 && searchQueryText && (
              <Text className="text-gray-500 text-center py-3">
                No groups found for &quot;{searchQueryText}&quot;
              </Text>
            )}
          </ScrollView>

          {/* Add Button */}
          <TouchableOpacity
            className={`h-12 rounded-xl flex-row items-center justify-center ${
              selectedGroups.length > 0
                ? "bg-primary"
                : "bg-gray-300 opacity-50"
            }`}
            onPress={handleAddGroups}
            disabled={selectedGroups.length === 0 || isLoading}
            activeOpacity={0.8}
          >
            {!isLoading ? (
              <Text className="text-white font-semibold text-base">
                Add{" "}
                {selectedGroups.length > 0 ? `(${selectedGroups.length})` : ""}
              </Text>
            ) : (
              <View className="animate-spin">
                <ActivityIndicator size="large" color="#000" />
              </View>
            )}
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default AddGroupModal;
