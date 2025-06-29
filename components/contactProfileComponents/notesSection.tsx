import NoteItemSkeleton from "@/app/skeletons/noteItemSkeleton";
import axiosInstance from "@/utils/axiosInstance";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import AddNoteForm from "./addNoteForm";
import NoteItem from "./noteItem";

interface NotesSectionProps {
  theme: "light" | "dark";
  onEditNote: (noteId: number, content: string) => void;
  onDeleteNote: (noteId: any) => void;
}

interface NoteUserData {
  id: number;
  name: string;
  avatar: string | null;
}

interface Note {
  id: number;
  content: string;
  created_at: string;
  user: {
    data: NoteUserData;
  };
}

const NotesSection = ({
  theme,
  onEditNote,
  onDeleteNote,
}: NotesSectionProps) => {
  const [addNoteText, setAddNoteText] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Notes
  const handleGetNotes = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `/contacts/9d3e5117-ec39-4cb0-bed7-b223a1e75601/notes`
      );
      console.log("notes: ", response);
      setNotes(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNote = () => {
    if (!addNoteText.trim()) return;
    console.log("Note added:", addNoteText);
    setAddNoteText("");
  };

  const copyToClipboard = (text: string) => {
    console.log(`Copied to clipboard: ${text}`);
  };

  useEffect(() => {
    handleGetNotes();
  }, []);

  if (isLoading) {
    return (
      <View className="mt-5 px-5">
        <NoteItemSkeleton />
        <NoteItemSkeleton />
      </View>
    );
  }

  return (
    <View
      className={`px-6 py-4 mt-4 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
    >
      <View className="flex-row justify-between items-center mb-4">
        <Text
          className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
        >
          Notes ({notes.length})
        </Text>
      </View>

      {/* Notes List */}
      {notes.length > 0 ? (
        notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            theme={theme}
            onEdit={onEditNote}
            onCopy={copyToClipboard}
            onDelete={onDeleteNote}
          />
        ))
      ) : (
        <View className="py-8 items-center">
          <Feather
            name="file-text"
            size={32}
            color={theme === "dark" ? "#6b7280" : "#9ca3af"}
          />
          <Text
            className={`mt-3 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
          >
            No notes yet
          </Text>
        </View>
      )}

      <AddNoteForm
        theme={theme}
        noteText={addNoteText}
        onTextChange={setAddNoteText}
        onSave={handleAddNote}
      />
    </View>
  );
};

export default NotesSection;
