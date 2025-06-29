import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

// Redux actions
import {
  deleteGroup,
  setAllGroups,
  setContactGroups,
} from "@/app/redux/features/contactProfileSlice";

// Components
import GroupsAndTagsSkeleton from "@/app/skeletons/groupsAndTagsSkeleton";
import AddGroupModal from "./addGroupModal";

// Utilities
import axiosInstance from "@/utils/axiosInstance";

// Types
interface Group {
  id: number;
  name: string;
}

interface GroupsSectionProps {
  theme: "light" | "dark";
  contactId: any;
}

/**
 * GroupsSection component displays and manages groups associated with a contact
 * @param {GroupsSectionProps} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
const GroupsSection = ({ theme, contactId }: GroupsSectionProps) => {
  // State management
  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingGroup, setIsAddingGroup] = useState(false); // Renamed from addGroupLoading for clarity
  const [deletingGroupId, setDeletingGroupId] = useState<number | null>(null);

  // Redux hooks
  const dispatch = useDispatch();
  const allGroups = useSelector(
    (state: any) => state.contactProfile.groups.allGroups
  );
  const contactGroups = useSelector(
    (state: any) => state.contactProfile.groups.contactGroups
  );

  /**
   * Fetches all available groups from the API
   */
  const fetchAllGroups = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/contact-groups");
      dispatch(setAllGroups({ groupsData: response.data.data }));
    } catch (error) {
      console.error("Error fetching groups:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetches groups associated with the current contact
   * @param {string} contactId - ID of the contact
   */
  const fetchContactGroups = async (contactId: string) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `/contacts/9d3e5117-ec39-4cb0-bed7-b223a1e75601/contact-groups`
      );
      dispatch(setContactGroups({ groupsData: response.data.data }));
    } catch (error) {
      console.error("Error fetching contact groups:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Adds groups to the current contact
   * @param {(string | number)[]} groupIds - Array of group IDs to add
   */
  const addGroupsToContact = async (groupIds: (string | number)[]) => {
    // Check if any group is already added
    const alreadyAdded = contactGroups.some((group: Group) =>
      groupIds.includes(group.id)
    );

    if (alreadyAdded) {
      Alert.alert(
        "Group Already Added",
        "This group has already been added to this contact."
      );
      return;
    }

    try {
      setIsAddingGroup(true);
      const response = await axiosInstance.post(
        `/contacts/9d3e5117-ec39-4cb0-bed7-b223a1e75601/contact-groups`,
        {
          contact_groups: groupIds,
        }
      );

      if (response.data.status === 200) {
        // Add the new groups to the Redux state
        const addedGroups = allGroups.filter((group: Group) =>
          groupIds.includes(group.id)
        );
        const updatedGroups = contactGroups.concat(addedGroups);
        dispatch(setContactGroups({ groupsData: updatedGroups }));
      }
    } catch (error) {
      console.error("Error adding group:", error);
      Alert.alert("Error", "Failed to add group to contact");
    } finally {
      setIsAddGroupModalOpen(false);
      setIsAddingGroup(false);
    }
  };

  /**
   * Removes a group from the current contact
   * @param {number} groupId - ID of the group to remove
   */
  const removeGroupFromContact = async (groupId: number) => {
    try {
      setDeletingGroupId(groupId);
      const response = await axiosInstance.delete(
        `/contacts/9d3e5117-ec39-4cb0-bed7-b223a1e75601/contact-groups`,
        {
          data: { id: groupId },
        }
      );

      if (response.status === 200) {
        dispatch(deleteGroup({ groupId }));
      }
    } catch (error) {
      console.error("Error removing group:", error);
      Alert.alert("Error", "Failed to remove group from contact");
    } finally {
      setDeletingGroupId(null);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchAllGroups();
    fetchContactGroups(contactId);
  }, [contactId]);

  // Show loading skeleton while data is being fetched
  if (isLoading) {
    return (
      <View className="border-b border-gray-300">
        <GroupsAndTagsSkeleton theme={theme} />
      </View>
    );
  }

  return (
    <>
      <View
        className={`px-6 py-4 ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl w-[90%] mx-auto`}
      >
        {/* Header section */}
        <View className="flex-row justify-between items-center mb-4">
          <Text
            className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            Groups ({contactGroups?.length || 0})
          </Text>
          <TouchableOpacity onPress={() => setIsAddGroupModalOpen(true)}>
            <Ionicons
              name="add"
              size={24}
              color={theme === "dark" ? "white" : "#4f46e5"}
            />
          </TouchableOpacity>
        </View>

        {/* Groups list */}
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
                  onPress={() => removeGroupFromContact(group.id)}
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

      {/* Add Group Modal */}
      <AddGroupModal
        visible={isAddGroupModalOpen}
        onClose={() => setIsAddGroupModalOpen(false)}
        onAdd={addGroupsToContact}
        allGroups={allGroups}
        isLoading={isAddingGroup}
      />
    </>
  );
};

export default GroupsSection;
