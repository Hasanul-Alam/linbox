import EditNoteModal from "@/components/contactProfileComponents/editNoteModal";
import GroupsSection from "@/components/contactProfileComponents/groupsSection";
import Header from "@/components/contactProfileComponents/header";
import NotesSection from "@/components/contactProfileComponents/notesSection";
import ProfileSection from "@/components/contactProfileComponents/profileSection";
import TagsSection from "@/components/contactProfileComponents/tagsSection";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const router = useRouter();
  const [theme] = useState<"light" | "dark">("light");
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [updateNoteText, setUpdateNoteText] = useState("");
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

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

  return (
    <View className={`flex-1 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
      <SafeAreaView className="flex-1">
        <Header theme={theme} onBack={handleBack} />

        <ScrollView className="pb-16" showsVerticalScrollIndicator={false}>
          <ProfileSection theme={theme} />
          <GroupsSection theme={theme} />
          <TagsSection theme={theme} />
          <NotesSection theme={theme} onEditNote={toggleUpdatePopup} />
        </ScrollView>
      </SafeAreaView>

      <EditNoteModal
        visible={showUpdatePopup}
        theme={theme}
        noteText={updateNoteText}
        onTextChange={setUpdateNoteText}
        onClose={() => toggleUpdatePopup()}
        onSave={() => {
          console.log(`Note ${editingNoteId} updated:`, updateNoteText);
          toggleUpdatePopup();
        }}
      />
    </View>
  );
};

export default ProfileScreen;
