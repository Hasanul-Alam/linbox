import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

interface HeaderProps {
  theme: "light" | "dark";
  onBack: () => void;
}

const Header = ({ theme, onBack }: HeaderProps) => {
  return (
    <View className={`px-5 flex-row items-center justify-between bg-white"}`}>
      <TouchableOpacity onPress={onBack} className="p-2 rounded-full">
        <Ionicons
          name="chevron-back"
          size={24}
          color={theme === "dark" ? "white" : "black"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
