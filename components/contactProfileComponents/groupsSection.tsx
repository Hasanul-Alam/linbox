import GroupsAndTagsSkeleton from "@/app/skeletons/groupsAndTagsSkeleton";
import axiosInstance from "@/utils/axiosInstance";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AddGroupModal from "./addGroupModal";

interface GroupsSectionProps {
  theme: "light" | "dark";
  contactId: any;
}

interface Group {
  id: number;
  name: string;
}

const GroupsSection = ({ theme, contactId }: GroupsSectionProps) => {
  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
  const [allGroups, setAllGroups] = useState([]);
  const [contactGroups, setContactGroups] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [addGroupLoading, setAddGroupLoading] = useState(false);
  const [deletingGroupId, setDeletingGroupId] = useState<number | null>(null);

  const handleGetGroups = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/contact-groups");
      console.log(JSON.stringify(response.data, null, 2));
      setAllGroups(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetContactGroups = async (contactId: string) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `/contacts/${contactId}/contact-groups`
      );
      console.log(JSON.stringify(response.data, null, 2));
      setContactGroups(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddGroup = async (ids: (string | number)[]) => {
    const isAlreadyAdded = contactGroups.some((group: Group) =>
      ids.includes(group.id)
    );

    if (isAlreadyAdded) {
      Alert.alert(
        "Group Already Added",
        "This group has already been added to this contact."
      );
      return;
    }

    try {
      setAddGroupLoading(true);
      const response = await axiosInstance.post(
        `/contacts/9d3e5117-ec39-4cb0-bed7-b223a1e75601/contact-groups`,
        {
          contact_groups: ids,
        }
      );
      if (response.data.status === 200) {
        // Add the group to the local state
        setContactGroups((prevGroups: Group[]) => [
          ...prevGroups,
          ...allGroups.filter((group: Group) => ids.includes(group.id)),
        ]);
        // Refetch contact groups after adding a new group
        // handleGetContactGroups("9d3e5117-ec39-4cb0-bed7-b223a1e75601");
      }
    } catch (error) {
      console.error("Error adding group:", error);
    } finally {
      setIsAddGroupModalOpen(false);
      setAddGroupLoading(false);
    }
  };

  const handleRemoveGroupFromContact = async (id: number) => {
    try {
      setDeletingGroupId(id);
      const response = await axiosInstance.delete(
        `/contacts/9d3e5117-ec39-4cb0-bed7-b223a1e75601/contact-groups`,
        {
          data: { id: id },
        }
      );
      if (response.status === 200) {
        // Remove the group from the local state
        setContactGroups((prevGroups: Group[]) =>
          prevGroups.filter((group: Group) => group.id !== id)
        );
      }
    } catch (error) {
      console.error("Error removing group:", error);
    } finally {
      setDeletingGroupId(null);
    }
  };

  useEffect(() => {
    handleGetGroups();
    handleGetContactGroups("9d3e5117-ec39-4cb0-bed7-b223a1e75601");
  }, []);

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
            Groups ({contactGroups?.length})
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
        {contactGroups?.length > 0 ? (
          <View className="flex-row flex-wrap gap-2 mb-4">
            {contactGroups.map((group: Group) => (
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
                  {deletingGroupId === group.id ? (
                    <ActivityIndicator
                      size="small"
                      color={theme === "dark" ? "#9ca3af" : "green"}
                    />
                  ) : (
                    <Entypo
                      name="cross"
                      size={16}
                      color={theme === "dark" ? "#9ca3af" : "green"}
                    />
                  )}
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
      </View>
      {/* Divider */}
      <View className="w-full h-[1px] bg-gray-300"></View>

      {isAddGroupModalOpen && (
        <AddGroupModal
          visible={isAddGroupModalOpen}
          onClose={() => setIsAddGroupModalOpen(false)}
          onAdd={handleAddGroup}
          allGroups={allGroups}
          isLoading={addGroupLoading}
        />
      )}
    </>
  );
};

export default GroupsSection;
