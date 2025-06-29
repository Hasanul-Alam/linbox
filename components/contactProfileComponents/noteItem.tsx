import { EvilIcons, Feather, Octicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface NoteItemProps {
  note: {
    id: number;
    content: string;
    created_at: string;
    user: {
      data: {
        id: number;
        name: string;
        avatar: string | null;
      };
    };
  };
  theme: "light" | "dark";
  onEdit: (noteId: number, content: string) => void;
  onCopy: (text: string) => void;
  onDelete: (noteId: any) => void;
}

const NoteItem = ({ note, theme, onEdit, onCopy, onDelete }: NoteItemProps) => {
  return (
    <>
      <View
        className={`p-4 mb-4 rounded-xl ${theme === "dark" ? "bg-gray-700" : "bg-gray-50"} shadow-sm`}
      >
        {/* Note Header */}
        <View className="flex-row items-center mb-3">
          {note.user.data.avatar ? (
            <Image
              source={{ uri: note.user.data.avatar }}
              className="w-10 h-10 rounded-full mr-3"
            />
          ) : (
            <View className="w-10 h-10 rounded-full bg-blue-500 items-center justify-center mr-3">
              <Text className="text-white font-bold">
                {note.user.data.name.charAt(0)}
              </Text>
            </View>
          )}
          <View className="flex-1">
            <Text
              className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              {note.user.data.name}
            </Text>
            <Text
              className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
            >
              {new Date(note.created_at).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
          <View className="flex-row gap-2"></View>
        </View>

        {/* Note Content */}
        <Text
          className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
        >
          {note.content}
        </Text>

        {/* Note Actions */}
        <View className="flex-row justify-between border-t pt-3 border-gray-200">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => onCopy(note.content)}
          >
            <Feather
              name="copy"
              size={16}
              color={theme === "dark" ? "#9ca3af" : "#6b7280"}
            />
            <Text
              className={`ml-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
            >
              Copy
            </Text>
          </TouchableOpacity>
          <View className="flex-row items-center gap-1">
            <TouchableOpacity
              className="p-1"
              onPress={() => onEdit(note.id, note.content)}
            >
              <Octicons
                name="pencil"
                size={16}
                color={theme === "dark" ? "#9ca3af" : "#6b7280"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="p-1"
              onPress={() => onDelete(note.id)}
              activeOpacity={0.8}
            >
              <EvilIcons
                name="trash"
                size={20}
                color={theme === "dark" ? "#9ca3af" : "#6b7280"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default NoteItem;
