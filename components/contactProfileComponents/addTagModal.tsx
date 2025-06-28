import axiosInstance from "@/utils/axiosInstance";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const fakeTags = [
  { id: "1", name: "Priority", color: "bg-red-500" },
  { id: "2", name: "Follow-up", color: "bg-blue-500" },
  { id: "3", name: "Client", color: "bg-green-500" },
  { id: "4", name: "VIP", color: "bg-purple-500" },
  { id: "5", name: "Personal", color: "bg-yellow-500" },
  { id: "6", name: "Business", color: "bg-indigo-500" },
  { id: "7", name: "Urgent", color: "bg-orange-500" },
  { id: "8", name: "Friend", color: "bg-pink-500" },
  { id: "9", name: "Family", color: "bg-teal-500" },
  { id: "10", name: "Work", color: "bg-gray-500" },
];

const AddTagModal = ({
  visible,
  onClose,
  contactId, // Assuming contactId is passed to fetch available tags
}: {
  visible: boolean;
  onClose: () => void;
  contactId: any;
}) => {
  const [availableTags, setAvailableTags] = useState([]);

  const handleGetAvailableTags = async () => {
    try {
      const response = await axiosInstance.get(
        `/contacts/9d3e5117-ec39-4cb0-bed7-b223a1e75601/tags/available`
      );
      console.log(
        "Available tags response:",
        JSON.stringify(response.data, null, 2)
      );
      setAvailableTags(response.data.data);
    } catch (error) {
      console.error("Error fetching available tags:", error);
    } finally {
    }
  };

  useEffect(() => {
    handleGetAvailableTags();
  }, []);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      {/* Backdrop with Pressable */}
      <Pressable
        className="flex-1 bg-black/50 justify-center items-center p-4"
        onPress={onClose}
      >
        {/* Modal Container - needs to stop press propagation */}
        <Pressable
          className="w-full bg-white rounded-lg p-6 max-w-md"
          onPress={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">Add New Tag</Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-gray-500 text-lg">✕</Text>
            </TouchableOpacity>
          </View>

          {/* Body */}
          <View className="mb-2">
            <TextInput
              placeholder="Search Tag"
              className="border-b border-gray-300 rounded-md p-3 mb-4"
            />
            <ScrollView
              className="max-h-60 overflow-y-scroll"
              showsVerticalScrollIndicator={false}
            >
              {availableTags.map((tag) => (
                <TouchableOpacity
                  key={tag.id}
                  className="flex-row items-center justify-between p-3 border-b border-gray-200"
                >
                  <View className="flex-row items-center">
                    {/* <View
                      className={`w-4 h-4 rounded-full ${tag.color} mr-3`}
                    /> */}
                    <Text className="text-gray-800">{tag.name}</Text>
                  </View>
                  <Pressable className="p-2 rounded-lg bg-primary/20 hover:bg-blue-200">
                    <Ionicons name="add-sharp" size={20} color="black" />
                  </Pressable>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default AddTagModal;
