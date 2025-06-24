import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const fakeGroups = [
  { id: "1", name: "Family" },
  { id: "2", name: "Friends" },
  { id: "3", name: "Work" },
  { id: "4", name: "Hobbies" },
  { id: "5", name: "Travel" },
  { id: "6", name: "Sports" },
  { id: "7", name: "Music" },
  { id: "8", name: "Gaming" },
  { id: "9", name: "Books" },
  { id: "10", name: "Movies" },
];

const AddGroupModal = ({ visible, onClose }: any) => {
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
        onPress={onClose} // This will close the modal when backdrop is pressed
      >
        {/* Modal Container - needs to stop press propagation */}
        <Pressable
          className="w-full bg-white rounded-lg p-6 max-w-md"
          onPress={(e) => e.stopPropagation()} // Prevents closing when clicking inside modal
        >
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">
              Add New Group
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-gray-500 text-lg">✕</Text>
            </TouchableOpacity>
          </View>

          {/* Body */}
          <View className="mb-2">
            <TextInput
              placeholder="Search Group"
              className="border-b border-gray-300 rounded-md p-3 mb-4"
            />
            <ScrollView
              className="max-h-60 overflow-y-scroll"
              showsVerticalScrollIndicator={false}
            >
              {fakeGroups.map((group) => (
                <TouchableOpacity
                  key={group.id}
                  className="flex-row items-center justify-between p-3 border-b border-gray-200"
                >
                  <Text className="text-gray-800">{group.name}</Text>
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

export default AddGroupModal;
