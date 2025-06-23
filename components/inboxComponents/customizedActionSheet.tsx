// components/CustomActionSheet.tsx
import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const options = [
  {
    label: "View Profile",
    value: "view_profile",
  },
  {
    label: "Set a Label",
    value: "set_label",
  },
  {
    label: "Pin Contact",
    value: "pin_contact",
  },
  {
    label: "Tags",
    value: "tags",
  },
  {
    label: "Groups",
    value: "groups",
  },
  {
    label: "Notes",
    value: "notes",
  },
];

export default function CustomizedActionSheet({
  visible,
  onClose,
  onOptionSelect,
  anchorPosition = { x: 0, y: 0 },
}: {
  visible: boolean;
  onClose: () => void;
  onOptionSelect: (value: string) => void;
  anchorPosition?: { x: number; y: number };
}) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-transparent">
          <View
            style={[
              styles.dropdown,
              {
                position: "absolute",
                top: anchorPosition.y + 25, // Position below the icon
                right: 10, // Align to the right with some margin
              },
            ]}
          >
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                className={`py-3 px-5 ${
                  index !== options.length - 1 ? "border-b border-gray-200" : ""
                }`}
                onPress={() => {
                  onOptionSelect(option.value);
                  onClose();
                }}
              >
                <Text className={`text-base text-gray-800`}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: 160,
  },
});
