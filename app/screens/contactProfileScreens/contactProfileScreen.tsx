import EditNoteModal from "@/components/contactProfileComponents/editNoteModal";
import GroupsSection from "@/components/contactProfileComponents/groupsSection";
import Header from "@/components/contactProfileComponents/header";
import NotesSection from "@/components/contactProfileComponents/notesSection";
import ProfileSection from "@/components/contactProfileComponents/profileSection";
import TagsSection from "@/components/contactProfileComponents/tagsSection";
import DeleteModal from "@/components/reusableComponents/deleteModal";
import axiosInstance from "@/utils/axiosInstance";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const router = useRouter();
  const [theme] = useState<"light" | "dark">("light");
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [updateNoteText, setUpdateNoteText] = useState("");
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showDeleteNotePopup, setShowDeleteNotePopup] = useState(false);
  const params = useLocalSearchParams();
  const { id, name, whatsappNumber, spent } = params;

  const handleBack = () => router.back();

  const toggleUpdatePopup = (
    noteId: number | null = null,
    content: string = ""
  ) => {
    if (showUpdatePopup) {
      setShowUpdatePopup(false);
      setEditingNoteId(null);
    } else {
      setEditingNoteId(noteId);
      setUpdateNoteText(content);
      setShowUpdatePopup(true);
    }
  };

  const toggleDeletePopup = () => {
    setShowDeleteNotePopup(!showDeleteNotePopup);
  };

  const handleDeleteNote = async (noteId: any) => {
    console.log("note id for delete: ", noteId);
    try {
      const response = await axiosInstance.delete(
        `/contacts/9d3e5117-ec39-4cb0-bed7-b223a1e75601/notes/${noteId}`
      );
      if (response.status === 200) {
        console.log("note deleted successfully");
      }
    } catch (error) {
      console.error(error);
    } finally {
      toggleDeletePopup();
    }
  };

  console.log("ProfileScreen params:", params.spent);

  return (
    <View className={`flex-1 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
      <SafeAreaView className="flex-1">
        <Header theme={theme} onBack={handleBack} />

        <ScrollView className="pb-16" showsVerticalScrollIndicator={false}>
          <ProfileSection
            theme={theme}
            name={name}
            whatsappNumber={whatsappNumber}
            spent={spent}
          />
          <GroupsSection theme={theme} contactId={id} />
          <TagsSection theme={theme} contactId={id} />
          <NotesSection
            theme={theme}
            onEditNote={toggleUpdatePopup}
            onDeleteNote={toggleDeletePopup}
          />
        </ScrollView>
      </SafeAreaView>

      <EditNoteModal
        visible={showUpdatePopup}
        theme={theme}
        noteText={updateNoteText}
        noteId={editingNoteId}
        onTextChange={setUpdateNoteText}
        onClose={() => toggleUpdatePopup()}
        // onSave={() => {
        //   console.log(`Note ${editingNoteId} updated:`, updateNoteText);
        //   toggleUpdatePopup();
        // }}
      />

      {showDeleteNotePopup && (
        <DeleteModal
          visible={showDeleteNotePopup}
          theme={"light"}
          itemName="note"
          onClose={() => setShowDeleteNotePopup(false)}
          onConfirm={handleDeleteNote}
        />
      )}
    </View>
  );
};

export default ProfileScreen;
