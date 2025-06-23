import {
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome5,
  Fontisto,
  Ionicons,
  Octicons,
} from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  // Fake data
  const currentContact = {
    id: "1",
    name: "John Doe",
    whatsappNumber: "+1 234 567 890",
    avatar: null,
    pinned: true,
    labels: {
      data: [
        {
          color: "red",
        },
      ],
    },
    contactGroups: {
      data: [
        { id: 1, name: "VIP" },
        { id: 2, name: "Customers" },
      ],
    },
    tags: {
      data: [
        { id: 1, name: "Priority" },
        { id: 2, name: "Follow-up" },
      ],
    },
    notes: {
      data: [
        {
          id: 1,
          content: "Meeting scheduled for next week",
          created_at: "2023-05-15T10:30:00Z",
          user: {
            data: {
              id: 1,
              name: "Jane Smith",
              avatar: "https://example.com/avatar.jpg",
            },
          },
        },
      ],
    },
  };

  const [cost] = useState(125.5);
  const [groupsQueryText, setGroupsQueryText] = useState("");
  const [tagQueryText, setTagQueryText] = useState("");
  const [addNoteText, setAddNoteText] = useState("");
  const [updateNoteText, setUpdateNoteText] = useState("");
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [theme] = useState("light"); // 'light' or 'dark'

  // Animation values
  const popupScale = new Animated.Value(0);
  const fadeAnim = new Animated.Value(0);
  const profileAnim = new Animated.Value(0);

  // Mock functions
  const handleBack = () => {};

  const copyToClipboard = (name: string) => {
    console.log(`Copied to clipboard: ${name}`);
  };

  const handleAddGroup = () => {};

  const handleRemoveGroupFromContact = (id: number) => {
    console.log(`Removed group with id: ${id} from contact`);
  };

  const handleAddTagToContact = () => {};

  const handleDeleteTag = (id: number) => {
    console.log(`Deleted tag with id: ${id}`);
  };

  const handleAddNote = () => {
    // Add animation when adding a note
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setAddNoteText("");
      fadeAnim.setValue(0);
    });
  };

  const handleUpdateNote = () => {
    toggleUpdatePopup();
  };

  const toggleUpdatePopup = () => {
    if (showUpdatePopup) {
      Animated.timing(popupScale, {
        toValue: 0,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => setShowUpdatePopup(false));
    } else {
      setShowUpdatePopup(true);
      Animated.timing(popupScale, {
        toValue: 1,
        duration: 300,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }).start();
    }
  };

  // Animate profile section on mount
  useEffect(() => {
    Animated.timing(profileAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View
      className={`flex-1 pt-14 pb-8 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
    >
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="px-5">
          <TouchableOpacity onPress={handleBack} className="mb-4">
            <Ionicons
              name="chevron-back-outline"
              size={24}
              color={theme === "dark" ? "white" : "black"}
            />
          </TouchableOpacity>
        </View>

        <ScrollView className="pb-16" showsVerticalScrollIndicator={false}>
          {/* Profile Section */}
          <Animated.View
            className="items-center px-5"
            style={{
              opacity: profileAnim,
              transform: [
                {
                  translateY: profileAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            }}
          >
            {/* Profile Image */}
            <View className="mb-4">
              {currentContact.avatar ? (
                <Image
                  source={{ uri: currentContact.avatar }}
                  className="w-20 h-20 rounded-full"
                />
              ) : (
                <View className="w-20 h-20 rounded-full bg-indigo-600 items-center justify-center shadow-lg">
                  <Text className="text-2xl font-bold text-white">
                    {currentContact.name.charAt(0)}
                  </Text>
                </View>
              )}
            </View>

            {/* Profile Name */}
            <View className="flex-row items-center mb-1">
              <Text
                className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-black"}`}
              >
                {currentContact.name}
              </Text>
              <TouchableOpacity
                onPress={() => copyToClipboard(currentContact.name)}
                className="ml-2"
              >
                <Fontisto name="copy" size={14} color="#939393" />
              </TouchableOpacity>
            </View>

            {/* Phone Number */}
            <View className="flex-row items-center mb-4">
              <Text
                className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
              >
                {currentContact.whatsappNumber}
              </Text>
              <TouchableOpacity
                onPress={() => copyToClipboard(currentContact.whatsappNumber)}
                className="ml-2"
              >
                <Fontisto name="copy" size={14} color="#939393" />
              </TouchableOpacity>
            </View>

            {/* Balance */}
            <View
              className={`flex-row items-center px-3 py-1 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} shadow-md`}
            >
              <FontAwesome5
                name="coins"
                size={14}
                color="#f59e0b"
                className="mr-1"
              />
              <Text
                className={`${theme === "dark" ? "text-white" : "text-black"}`}
              >
                ${cost}
              </Text>
            </View>
          </Animated.View>

          {/* Contact Groups */}
          <View className="px-5 mt-8">
            <Text
              className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}
            >
              Contact Groups ({currentContact.contactGroups.data.length})
            </Text>

            {/* Groups List */}
            <View className="flex-row flex-wrap gap-2 mb-4">
              {currentContact.contactGroups.data.map((group) => (
                <View
                  key={group.id}
                  className="flex-row items-center px-3 py-1 bg-gray-200 rounded-full"
                >
                  <Text className="text-black mr-1">{group.name}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveGroupFromContact(group.id)}
                  >
                    <Entypo name="cross" size={14} color="black" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Group Search */}
            <TextInput
              placeholder="Search groups..."
              placeholderTextColor="#939393"
              value={groupsQueryText}
              onChangeText={setGroupsQueryText}
              className={`px-4 py-2 rounded-lg border ${theme === "dark" ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-300"}`}
            />

            {/* Search Results (mock) */}
            {groupsQueryText && (
              <View
                className={`mt-2 p-2 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}
              >
                <TouchableOpacity
                  className="p-2 flex-row items-center"
                  onPress={handleAddGroup}
                >
                  <View className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center mr-2">
                    <Text className="text-white font-bold">T</Text>
                  </View>
                  <Text
                    className={`${theme === "dark" ? "text-white" : "text-black"}`}
                  >
                    Test Group
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Tags Section */}
          <View className="px-5 mt-6">
            <Text
              className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}
            >
              Tags ({currentContact.tags.data.length})
            </Text>

            {/* Tags List */}
            <View className="flex-row flex-wrap gap-2 mb-4">
              {currentContact.tags.data.map((tag) => (
                <View
                  key={tag.id}
                  className="flex-row items-center px-3 py-1 bg-gray-200 rounded-full"
                >
                  <Text className="text-black mr-1">{tag.name}</Text>
                  <TouchableOpacity onPress={() => handleDeleteTag(tag.id)}>
                    <Entypo name="cross" size={14} color="black" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Tag Search */}
            <TextInput
              placeholder="Search tags..."
              placeholderTextColor="#939393"
              value={tagQueryText}
              onChangeText={setTagQueryText}
              className={`px-4 py-2 rounded-lg border ${theme === "dark" ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-300"}`}
            />

            {/* Search Results (mock) */}
            {tagQueryText && (
              <View
                className={`mt-2 p-2 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}
              >
                <TouchableOpacity
                  className="p-2 flex-row items-center"
                  onPress={handleAddTagToContact}
                >
                  <View className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center mr-2">
                    <Text className="text-white font-bold">N</Text>
                  </View>
                  <Text
                    className={`${theme === "dark" ? "text-white" : "text-black"}`}
                  >
                    New Tag
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Notes Section */}
          <View className="px-5 mt-6">
            <Text
              className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}
            >
              Notes ({currentContact.notes.data.length})
            </Text>

            {/* Notes List */}
            <Animated.View style={{ opacity: fadeAnim }}>
              {currentContact.notes.data.map((note) => (
                <View
                  key={note.id}
                  className={`p-4 mb-4 rounded-xl ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border shadow-sm`}
                >
                  {/* Note Header */}
                  <View className="flex-row items-center mb-2">
                    {note.user.data.avatar ? (
                      <Image
                        source={{ uri: note.user.data.avatar }}
                        className="w-10 h-10 rounded-full mr-2"
                      />
                    ) : (
                      <View className="w-10 h-10 rounded-full bg-blue-500 items-center justify-center mr-2">
                        <Text className="text-white font-bold">
                          {note.user.data.name.charAt(0)}
                        </Text>
                      </View>
                    )}
                    <View>
                      <Text
                        className={`font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}
                      >
                        {note.user.data.name}
                      </Text>
                      <Text
                        className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                      >
                        {new Date(note.created_at).toLocaleString()}
                      </Text>
                    </View>
                  </View>

                  {/* Note Content */}
                  <Text
                    className={`mb-3 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                  >
                    {note.content}
                  </Text>

                  {/* Note Actions */}
                  <View className="flex-row justify-between">
                    <View className="flex-row gap-2">
                      <TouchableOpacity className="p-1">
                        <Feather
                          name="copy"
                          size={16}
                          color={theme === "dark" ? "white" : "gray"}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="p-1"
                        onPress={() => {
                          setUpdateNoteText(note.content);
                          toggleUpdatePopup();
                        }}
                      >
                        <Octicons
                          name="pencil"
                          size={16}
                          color={theme === "dark" ? "white" : "gray"}
                        />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity className="p-1">
                      <EvilIcons
                        name="trash"
                        size={20}
                        color={theme === "dark" ? "white" : "gray"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </Animated.View>

            {/* Add Note */}
            <View
              className={`p-4 rounded-xl ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border shadow-sm`}
            >
              <TextInput
                placeholder="Add a note..."
                placeholderTextColor="#939393"
                multiline
                value={addNoteText}
                onChangeText={setAddNoteText}
                className={`min-h-[100px] ${theme === "dark" ? "text-white" : "text-black"}`}
              />
              <View className="items-end mt-2">
                <TouchableOpacity
                  className={`px-4 py-2 rounded-lg ${addNoteText ? "bg-indigo-600" : "bg-gray-400"}`}
                  onPress={handleAddNote}
                  disabled={!addNoteText}
                >
                  <Text className="text-white font-medium">Add Note</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Update Note Modal */}
      {showUpdatePopup && (
        <View className="absolute inset-0 bg-black bg-opacity-50 justify-center items-center">
          <Animated.View
            className={`w-11/12 p-6 rounded-xl ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
            style={{ transform: [{ scale: popupScale }] }}
          >
            <Text
              className={`text-xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}
            >
              Edit Note
            </Text>
            <TextInput
              value={updateNoteText}
              onChangeText={setUpdateNoteText}
              multiline
              className={`p-3 rounded-lg border mb-4 ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
            />
            <View className="flex-row justify-end gap-3">
              <TouchableOpacity
                className={`px-4 py-2 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}
                onPress={toggleUpdatePopup}
              >
                <Text
                  className={theme === "dark" ? "text-white" : "text-black"}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="px-4 py-2 bg-indigo-600 rounded-lg"
                onPress={handleUpdateNote}
              >
                <Text className="text-white font-medium">Update</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;
