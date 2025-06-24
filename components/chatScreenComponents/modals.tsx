import CustomizedActionSheet from "@/components/inboxComponents/customizedActionSheet";
import MessageOptionsPopup from "@/components/inboxComponents/messageOptionsPopup";
import TranslationSettingsPopup from "@/components/inboxComponents/translationSettingsPopup";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";

interface MediaPreviewModalProps {
  visible: boolean;
  mediaUri: string | null;
  onClose: () => void;
}

export const MediaPreviewModal: React.FC<MediaPreviewModalProps> = ({
  visible,
  mediaUri,
  onClose,
}) => (
  <Modal visible={visible} transparent animationType="fade">
    <TouchableOpacity
      className="flex-1 bg-black items-center justify-center"
      onPress={onClose}
      activeOpacity={1}
    >
      {mediaUri?.endsWith(".mp4") || mediaUri?.startsWith("video") ? (
        <View className="w-full h-64 items-center justify-center">
          <Ionicons name="play-circle" size={64} color="white" />
          <Text className="text-white mt-4">Video Preview</Text>
        </View>
      ) : (
        <Image
          source={{ uri: mediaUri! }}
          style={{ width: "90%", height: "80%", borderRadius: 12 }}
          resizeMode="contain"
        />
      )}
    </TouchableOpacity>
  </Modal>
);

interface ChatModalsProps {
  showOptions: boolean;
  setShowOptions: (show: boolean) => void;
  handleOptionSelect: (value: string) => void;
  anchorPosition: { x: number; y: number };
  isTranslationPopupVisible: boolean;
  setTranslationPopupVisible: (show: boolean) => void;
  isMessageOptionsVisible: boolean;
  setIsMessageOptionsVisible: (show: boolean) => void;
  handleMessageOptionsSelect: (option: string) => Promise<void>;
}

export const ChatModals: React.FC<ChatModalsProps> = ({
  showOptions,
  setShowOptions,
  handleOptionSelect,
  anchorPosition,
  isTranslationPopupVisible,
  setTranslationPopupVisible,
  isMessageOptionsVisible,
  setIsMessageOptionsVisible,
  handleMessageOptionsSelect,
}) => (
  <>
    {showOptions && (
      <CustomizedActionSheet
        visible={showOptions}
        onClose={() => setShowOptions(false)}
        onOptionSelect={handleOptionSelect}
        anchorPosition={anchorPosition}
      />
    )}

    {isTranslationPopupVisible && (
      <TranslationSettingsPopup
        visible={isTranslationPopupVisible}
        onClose={() => setTranslationPopupVisible(false)}
      />
    )}

    {isMessageOptionsVisible && (
      <MessageOptionsPopup
        visible={isMessageOptionsVisible}
        onClose={() => setIsMessageOptionsVisible(false)}
        onSelectOption={handleMessageOptionsSelect}
      />
    )}
  </>
);
