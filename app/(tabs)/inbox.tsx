// import BackButton from "@/components/reusableComponents/BackButton";
import BackButton from "@/components/reusableComponents/BackButton";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Inbox = () => {
  return (
    <SafeAreaView
      className=""
      style={{ flex: 1, backgroundColor: "white" }}
      edges={["top"]} // Only apply safe area to top (optional)
    >
      <View className="w-[90%] mx-auto">
        {/* Back Button */}
        <BackButton />

        {/* Main layout */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView>
            <Text>inbox</Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Inbox;
