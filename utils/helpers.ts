import { SelectedMedia } from "@/app/types/types";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Alert, Linking } from "react-native";

export const handleImageSelection = async (): Promise<SelectedMedia | null> => {
  try {
    // Request permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please enable photo library access in settings",
        [
          { text: "Cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() },
        ]
      );
      return null;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled && result.assets[0].uri) {
      return {
        type: "image",
        uri: result.assets[0].uri,
        preview: result.assets[0].uri,
      };
    }
    return null;
  } catch (error) {
    console.error("Image selection error:", error);
    throw error;
  }
};

export const handleVideoSelection = async (): Promise<SelectedMedia | null> => {
  try {
    // Request permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please enable photo library access to select videos",
        [
          { text: "Cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() },
        ]
      );
      return null;
    }

    // Launch video picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 0.7,
    });

    if (!result.canceled && result.assets[0].uri) {
      return {
        type: "video",
        uri: result.assets[0].uri,
        preview: result.assets[0].uri,
        duration: result.assets[0].duration ?? undefined,
      };
    }
    return null;
  } catch (error) {
    console.error("Video selection error:", error);
    throw error;
  }
};

export const handleDocumentSelection =
  async (): Promise<SelectedMedia | null> => {
    try {
      // Launch document picker
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const doc = result.assets[0];
        return {
          type: "document",
          uri: doc.uri,
          name: doc.name,
          size: doc.size,
        };
      }
      return null;
    } catch (error) {
      console.error("Document selection error:", error);
      throw error;
    }
  };

export const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
};
