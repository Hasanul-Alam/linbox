import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AddGroupModal from "./addGroupModal";

interface GroupsSectionProps {
  theme: "light" | "dark";
}

const currentContact = {
  contactGroups: {
    data: [
      { id: 1, name: "VIP" },
      { id: 2, name: "Customers" },
      { id: 3, name: "Work" },
    ],
  },
};

const GroupsSection = ({ theme }: GroupsSectionProps) => {
  const [groupsQueryText, setGroupsQueryText] = useState("");
  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);

  const handleAddGroup = () => {
    console.log("Adding group");
  };

  const handleRemoveGroupFromContact = (id: number) => {
    console.log(`Removed group with id: ${id} from contact`);
  };

  return (
    <>
      <View
        className={`px-6 py-4 ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl  bord w-[90%] mx-auto`}
      >
        <View className="flex-row justify-between items-center mb-4">
          <Text
            className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            Groups ({currentContact.contactGroups.data.length})
          </Text>
          <TouchableOpacity onPress={() => setIsAddGroupModalOpen(true)}>
            <Ionicons
              name="add"
              size={24}
              color={theme === "dark" ? "white" : "#4f46e5"}
            />
          </TouchableOpacity>
        </View>

        {/* Groups List */}
        {currentContact.contactGroups.data.length > 0 ? (
          <View className="flex-row flex-wrap gap-2 mb-4">
            {currentContact.contactGroups.data.map((group) => (
              <View
                key={group.id}
                className={`flex-row items-center px-3 py-1.5 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-primary/20"}`}
              >
                <Text
                  className={`${theme === "dark" ? "text-white" : "text-black"} mr-1`}
                >
                  {group.name}
                </Text>
                <TouchableOpacity
                  onPress={() => handleRemoveGroupFromContact(group.id)}
                >
                  <Entypo
                    name="cross"
                    size={16}
                    color={theme === "dark" ? "#9ca3af" : "green"}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <View className="py-4 items-center">
            <MaterialIcons
              name="group"
              size={32}
              color={theme === "dark" ? "#6b7280" : "#9ca3af"}
            />
            <Text
              className={`mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
            >
              No groups added yet
            </Text>
          </View>
        )}

        {/* Group Search */}
        {/* <View
          className={`mt-2 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"} p-2`}
        >
          <TextInput
            placeholder="Group name..."
            placeholderTextColor={theme === "dark" ? "#9ca3af" : "#6b7280"}
            value={groupsQueryText}
            onChangeText={setGroupsQueryText}
            className={`px-3 py-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          />
        </View> */}

        {/* Search Results (mock) */}
        {groupsQueryText && (
          <View
            className={`mt-2 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"} p-2`}
          >
            <TouchableOpacity
              className="p-3 flex-row items-center"
              onPress={handleAddGroup}
            >
              <View
                className={`w-10 h-10 ${theme === "dark" ? "bg-gray-600" : "bg-gray-200"} rounded-full items-center justify-center mr-3`}
              >
                <Text
                  className={`${theme === "dark" ? "text-white" : "text-gray-900"} font-bold`}
                >
                  {groupsQueryText.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View>
                <Text
                  className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  {groupsQueryText}
                </Text>
                <Text
                  className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                >
                  Create new group
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/* Divider */}
      <View className="w-full h-[1px] bg-gray-300"></View>

      {isAddGroupModalOpen && (
        <AddGroupModal
          visible={isAddGroupModalOpen}
          onClose={() => setIsAddGroupModalOpen(false)}
        />
      )}
    </>
  );
};

export default GroupsSection;
