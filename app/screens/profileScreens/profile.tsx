import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const timezones = [
  "UTC",
  "Asia/Dhaka",
  "Asia/Kolkata",
  "Asia/Karachi",
  "Asia/Jakarta",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Asia/Seoul",
  "Asia/Hong_Kong",
  "Asia/Manila",
  "Asia/Bangkok",
  "Asia/Kuala_Lumpur",

  "Europe/London",
  "Europe/Berlin",
  "Europe/Paris",
  "Europe/Madrid",
  "Europe/Rome",
  "Europe/Istanbul",
  "Europe/Moscow",

  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Toronto",
  "America/Vancouver",
  "America/Sao_Paulo",
  "America/Bogota",

  "Africa/Lagos",
  "Africa/Cairo",
  "Africa/Johannesburg",
  "Africa/Nairobi",
  "Africa/Algiers",

  "Australia/Sydney",
  "Australia/Melbourne",
  "Australia/Brisbane",
  "Australia/Perth",
  "Pacific/Auckland",
  "Pacific/Fiji",

  "Indian/Mauritius",
  "Indian/Maldives",
  "Indian/Reunion",
  "Indian/Chagos",
];

const UserProfileScreen = () => {
  const [name, setName] = useState("Scarlett");
  const [timezone, setTimezone] = useState("Asia/Dhaka");
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "Media library access is needed.");
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpdate = () => {
    Alert.alert("Profile Updated", `Name: ${name}\nTimezone: ${timezone}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        className="flex-1 bg-white"
      >
        {/* Transparent Back Button */}
        <TouchableOpacity
          className={`bg-transparent w-[35px] h-[35px] flex items-center justify-center`}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={20} color="black" />
        </TouchableOpacity>
        {/* Gradient or header background */}
        <View className="absolute top-0 left-0 right-0 h-40 bg-green-100 rounded-b-3xl -z-10" />

        {/* Profile Image */}
        <TouchableOpacity
          onPress={pickImage}
          className="self-center mb-6 mt-10"
        >
          <View className="relative">
            <Image
              source={{
                uri:
                  image || "https://randomuser.me/api/portraits/women/44.jpg",
              }}
              className="w-28 h-28 rounded-full border-4 border-white shadow-md"
            />
            <View className="absolute bottom-0 right-0 bg-white border border-gray-300 p-1 rounded-full">
              <Text className="text-sm">📷</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Form Card */}
        <View className="bg-white p-5 rounded-2xl shadow-md space-y-4">
          {/* Name Input */}
          <TextInput
            className="w-full h-12 px-4 rounded-xl bg-gray-100"
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />

          {/* Timezone Picker */}
          <View className="w-full bg-gray-100 rounded-xl overflow-hidden mt-3">
            <Picker
              selectedValue={timezone}
              onValueChange={(itemValue) => setTimezone(itemValue)}
              style={{ height: 50 }}
            >
              {timezones.map((tz) => (
                <Picker.Item key={tz} label={tz} value={tz} />
              ))}
            </Picker>
          </View>

          {/* Update Button */}
          <TouchableOpacity
            onPress={handleUpdate}
            className="bg-primary py-3 rounded-xl mt-4"
          >
            <Text className="text-white font-semibold text-lg text-center">
              Update Profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer Note */}
        <Text className="text-xs text-gray-400 text-center mt-6">
          Your changes are saved securely.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfileScreen;
