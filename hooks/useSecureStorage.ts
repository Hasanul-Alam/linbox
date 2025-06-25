import * as SecureStore from "expo-secure-store";

export const useSecureStorage = () => {
  const saveItem = async (key: string, value: any) => {
    console.log("Saving: ", key);
    console.log(key, value);
    try {
      const stringValue = JSON.stringify(value); // Convert object to string
      console.log("stringified value from useSecureStorage: ", stringValue);
      await SecureStore.setItemAsync(key, stringValue);
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  const getToken = async (key: string): Promise<any | null> => {
    try {
      console.log("Getting: ", key);
      const value = await SecureStore.getItemAsync(key);
      if (value) {
        const parsedValue = JSON.parse(value);
        return parsedValue.token;
      }
    } catch (error) {
      console.error("Error getting item:", error);
      return null;
    }
  };

  const getItem = async (key: string): Promise<any | null> => {
    try {
      const value = await SecureStore.getItemAsync(key);
      return value ? JSON.parse(value) : null; // Convert string back to object
    } catch (error) {
      console.error("Error getting item:", error);
      return null;
    }
  };

  const deleteItem = async (key: string) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const getCurrentTime = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return { saveItem, getItem, deleteItem, getToken, getCurrentTime };
};
