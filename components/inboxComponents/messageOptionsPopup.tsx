import { Feather } from "@expo/vector-icons";
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
          <View className="flex-row flex-wrap justify-start">
            {options.map((option, index) => {
              const IconComponent = option.iconComponent;

              // Define vibrant background colors
              const bgColors = [
                "#10b981",
                "#facc15",
                "#f87171",
                "#a855f7",
                "#ec4899",
                "#6366f1",
                "#fb923c",
                "#10b981",
                "#06b6d4",
              ];

              // Cycle through the colors if more than length
              const bgColor = bgColors[index % bgColors.length];

              return (
                <TouchableOpacity
                  key={option.id}
                  className="w-1/3 items-center mb-6"
                  onPress={() => {
                    onSelectOption(option.id);
                    onClose();
                  }}
                  activeOpacity={0.8}
                >
                  <View
                    className={`rounded-full w-16 h-16 items-center justify-center mb-2 border border-gray-200`}
                  >
                    <IconComponent
                      name={option.icon}
                      size={26}
                      color={bgColor}
                    />
                  </View>
                  <Text className="text-sm text-gray-800 font-semibold text-center">
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
