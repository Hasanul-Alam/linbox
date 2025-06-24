import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View } from "react-native";
import AddNoteForm from "./addNoteForm";
import NoteItem from "./noteItem";

interface NotesSectionProps {
  theme: "light" | "dark";
  onEditNote: (noteId: number, content: string) => void;
  onDeleteNote: () => void;
}

const currentContact = {
  notes: {
    data: [
      {
        id: 1,
        content:
          "Meeting scheduled for next week. Please prepare the quarterly report.",
        created_at: "2023-05-15T10:30:00Z",
        user: {
          data: {
            id: 1,
            name: "Jane Smith",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          },
        },
      },
      {
        id: 2,
        content: "Agreed on 15% discount for bulk order.",
        created_at: "2023-05-10T14:15:00Z",
        user: {
          data: {
            id: 2,
            name: "Mike Johnson",
            avatar: null,
          },
        },
      },
    ],
  },
};

const NotesSection = ({
  theme,
  onEditNote,
  onDeleteNote,
}: NotesSectionProps) => {
  const [addNoteText, setAddNoteText] = useState("");

  const handleAddNote = () => {
    if (!addNoteText.trim()) return;
    console.log("Note added:", addNoteText);
    setAddNoteText("");
  };

  const copyToClipboard = (text: string) => {
    console.log(`Copied to clipboard: ${text}`);
  };

  return (
    <View
      className={`px-6 py-4 mt-4 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
    >
      <View className="flex-row justify-between items-center mb-4">
        <Text
          className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
        >
          Notes ({currentContact.notes.data.length})
        </Text>
      </View>

      {/* Notes List */}
      {currentContact.notes.data.length > 0 ? (
        currentContact.notes.data.map((note) => (
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
