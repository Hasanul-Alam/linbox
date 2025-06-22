import CommonHeader from "@/components/reusableComponents/commonHeader/commonHeader";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DashboardScreen from "../screens/dashboardScreens/dashboardScreen";

const Dashboard = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={["top"]} // Only apply safe area to top (optional)
    >
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      {/* Rest of your layout */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView>
          {/* Common Header */}
          <View className="w-full pt-3">
            <CommonHeader />
          </View>

          {/* Main Content */}
          <DashboardScreen />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Dashboard;
