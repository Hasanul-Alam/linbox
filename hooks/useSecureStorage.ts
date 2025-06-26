// utils/secureStorage.ts
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export const saveItem = async (key: string, value: any) => {
  try {
    const stringValue = JSON.stringify(value);
    await SecureStore.setItemAsync(key, stringValue);
  } catch (error) {
    console.error("Error saving item:", error);
  }
};

export const getItem = async (key: string): Promise<any | null> => {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error getting item:", error);
    return null;
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    if (Platform.OS === "web") {
      return localStorage.getItem("token");
    }
    const value = await SecureStore.getItemAsync("token");
    console.log("Token retrieved from SecureStore:", value);
    if (value) {
      // const parsed = JSON.parse(value);
      // return parsed.token || null;
      return value;
    }
    return null;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export const deleteItem = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};
