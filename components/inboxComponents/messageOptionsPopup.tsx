import { Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface MessageOptionsPopupProps {
  visible: boolean;
  onClose: () => void;
  onSelectOption: (option: string) => void;
}

type FeatherIconName = "image" | "video" | "file" | "map-pin" | "copy";

const MessageOptionsPopup: React.FC<MessageOptionsPopupProps> = ({
  visible,
  onClose,
  onSelectOption,
}) => {
  const options = [
    {
      id: "image",
      label: "Image",
      icon: "image" as FeatherIconName,
      iconComponent: Feather,
    },
    {
      id: "video",
      label: "Video",
      icon: "video" as FeatherIconName,
      iconComponent: Feather,
    },
    {
      id: "document",
      label: "Document",
      icon: "file" as FeatherIconName,
      iconComponent: Feather,
    },
    {
      id: "location",
      label: "Location",
      icon: "map-pin" as FeatherIconName,
      iconComponent: Feather,
    },
    {
      id: "template",
      label: "Template",
      icon: "copy" as FeatherIconName,
      iconComponent: Feather,
    },
  ];

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      {/* Dismissable background */}
      <TouchableOpacity
        className="flex-1 bg-black/30 justify-end"
        activeOpacity={1}
        onPress={onClose}
      >
        {/* Popup container */}
        <View className="bg-white rounded-t-3xl p-6 pb-10">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-xl font-bold text-gray-900">
              Message Options
            </Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={26} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* Options grid */}
          <View className="flex-row flex-wrap justify-start">
            {options.map((option) => {
              const IconComponent = option.iconComponent;
              return (
                <TouchableOpacity
                  key={option.id}
                  className="w-1/3 items-center mb-6"
                  onPress={() => {
                    onSelectOption(option.id);
                    onClose();
                  }}
                  activeOpacity={0.7}
                >
                  <View className="bg-blue-100 rounded-full w-16 h-16 items-center justify-center mb-2 shadow-sm shadow-blue-200">
                    <IconComponent
                      name={option.icon}
                      size={24}
                      color="#2563eb"
                    />
                  </View>
                  <Text className="text-sm text-gray-700 font-medium">
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default MessageOptionsPopup;
