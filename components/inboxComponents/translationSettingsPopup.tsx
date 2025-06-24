import { FontAwesome6 } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const languageOptions = [
  "Detect Language",
  "Afrikaans",
  "Albanian",
  "Amharic",
  "Arabic",
  "Armenian",
  "Azerbaijani",
  "Basque",
  "Belarusian",
  "Bengali",
  "Bosnian",
  "Bulgarian",
  "Burmese",
  "Catalan",
  "Cebuano",
  "Chinese (Simplified)",
  "Chinese (Traditional)",
  "Corsican",
  "Croatian",
  "Czech",
  "Danish",
  "Dutch",
  "English",
  "Esperanto",
  "Estonian",
  "Finnish",
  "French",
  "Frisian",
  "Galician",
  "Georgian",
  "German",
  "Greek",
  "Gujarati",
  "Haitian Creole",
  "Hausa",
  "Hawaiian",
  "Hebrew",
  "Hindi",
  "Hmong",
  "Hungarian",
  "Icelandic",
  "Igbo",
  "Indonesian",
  "Irish",
  "Italian",
  "Japanese",
  "Javanese",
  "Kannada",
  "Kazakh",
  "Khmer",
  "Kinyarwanda",
  "Korean",
  "Kurdish",
  "Kyrgyz",
  "Lao",
  "Latin",
  "Latvian",
  "Lithuanian",
  "Luxembourgish",
  "Macedonian",
  "Malagasy",
  "Malay",
  "Malayalam",
  "Maltese",
  "Maori",
  "Marathi",
  "Mongolian",
  "Nepali",
  "Norwegian",
  "Nyanja",
  "Odia",
  "Pashto",
  "Persian",
  "Polish",
  "Portuguese",
  "Punjabi",
  "Romanian",
  "Russian",
  "Samoan",
  "Scots Gaelic",
  "Serbian",
  "Sesotho",
  "Shona",
  "Sindhi",
  "Sinhala",
  "Slovak",
  "Slovenian",
  "Somali",
  "Spanish",
  "Sundanese",
  "Swahili",
  "Swedish",
  "Tagalog",
  "Tajik",
  "Tamil",
  "Tatar",
  "Telugu",
  "Thai",
  "Turkish",
  "Turkmen",
  "Ukrainian",
  "Urdu",
  "Uyghur",
  "Uzbek",
  "Vietnamese",
  "Welsh",
  "Xhosa",
  "Yiddish",
  "Yoruba",
  "Zulu",
];

const TranslationSettingsPopup = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const [autoTranslate, setAutoTranslate] = useState(true);
  const [enableTranslation, setEnableTranslation] = useState(false);

  const [prospectFrom, setProspectFrom] = useState("Detect Language");
  const [prospectTo, setProspectTo] = useState("");
  const [yourFrom, setYourFrom] = useState("Detect Language");
  const [yourTo, setYourTo] = useState("");

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownTarget, setDropdownTarget] = useState<
    "prospectFrom" | "prospectTo" | "yourFrom" | "yourTo" | null
  >(null);

  const handleDropdownSelect = (value: string) => {
    if (!dropdownTarget) return;
    if (dropdownTarget === "prospectFrom") setProspectFrom(value);
    if (dropdownTarget === "prospectTo") setProspectTo(value);
    if (dropdownTarget === "yourFrom") setYourFrom(value);
    if (dropdownTarget === "yourTo") setYourTo(value);
    setDropdownTarget(null);
    setDropdownVisible(false);
  };

  const openDropdown = (target: typeof dropdownTarget) => {
    setDropdownTarget(target);
    setDropdownVisible(true);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      className=""
    >
      <View className="flex-1 justify-end bg-black/20">
        <TouchableOpacity
          className="absolute top-0 left-0 right-0 bottom-0"
          activeOpacity={1}
          onPress={onClose}
        />
        <View className="bg-white rounded-t-2xl px-5 pt-3 pb-8 max-h-[80%]">
          <View className="w-10 h-1 bg-gray-300 rounded self-center mb-3" />
          <Text className="text-lg font-semibold text-black mb-5">
            Translation Settings
          </Text>

          {/* Prospect Messages */}
          <Text className="text-sm font-semibold text-gray-600 mb-2">
            Prospect Messages
          </Text>
          <View className="flex-row justify-between mb-4 items-center gap-2">
            <TouchableOpacity
              className="bg-gray-100 rounded-lg p-3 w-[45%]"
              onPress={() => openDropdown("prospectFrom")}
            >
              <Text className="text-gray-800">
                {prospectFrom || "Select..."}
              </Text>
            </TouchableOpacity>
            {/* Arrow */}
            <FontAwesome6 name="arrow-right" size={15} color="#6b7280" />
            <TouchableOpacity
              className="bg-gray-100 rounded-lg p-3 w-[45%]"
              onPress={() => openDropdown("prospectTo")}
            >
              <Text className="text-gray-800">{prospectTo || "Select..."}</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-sm text-gray-800">Auto Translate</Text>
            <Switch
              value={autoTranslate}
              onValueChange={setAutoTranslate}
              trackColor={{ false: "#767577", true: "#22c065" }}
              thumbColor="#fff"
            />
          </View>

          {/* Your Messages */}
          <Text className="text-sm font-semibold text-gray-600 mb-2">
            Your Messages
          </Text>
          <View className="flex-row justify-between mb-4 items-center gap-2">
            <TouchableOpacity
              className="bg-gray-100 rounded-lg p-3 w-[45%]"
              onPress={() => openDropdown("yourFrom")}
            >
              <Text className="text-gray-800">{yourFrom || "Select..."}</Text>
            </TouchableOpacity>
            {/* Arrow */}
            <FontAwesome6 name="arrow-right" size={15} color="#6b7280" />
            <TouchableOpacity
              className="bg-gray-100 rounded-lg p-3 w-[45%]"
              onPress={() => openDropdown("yourTo")}
            >
              <Text className="text-gray-800">{yourTo || "Select..."}</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-sm text-gray-800">Enable Translation</Text>
            <Switch
              value={enableTranslation}
              onValueChange={setEnableTranslation}
              trackColor={{ false: "#767577", true: "#22c065" }}
              thumbColor="#fff"
            />
          </View>

          <Pressable
            className="bg-green-500 p-4 rounded-lg items-center mt-2"
            onPress={onClose}
          >
            <Text className="text-white font-semibold">
              Save Translation Settings
            </Text>
          </Pressable>
        </View>

        {/* Language Dropdown Modal */}
        <Modal visible={dropdownVisible} transparent animationType="fade">
          <TouchableOpacity
            className="flex-1 bg-black/50 justify-center px-5"
            activeOpacity={1}
            onPressOut={() => setDropdownVisible(false)}
          >
            <View className="bg-white rounded-xl max-h-[60%]">
              <FlatList
                data={languageOptions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => handleDropdownSelect(item)}
                    className="p-4 border-b border-gray-200"
                  >
                    <Text className="text-gray-800">{item}</Text>
                  </Pressable>
                )}
                className="p-2"
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </Modal>
  );
};

export default TranslationSettingsPopup;
