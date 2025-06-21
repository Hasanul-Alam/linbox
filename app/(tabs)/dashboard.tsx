import CommonHeader from "@/components/reusableComponents/commonHeader/commonHeader";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DashboardScreen from "../screens/dashboardScreens/dashboardScreen";

const Dashboard = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={["top"]} // Only apply safe area to top (optional)
    >
      {/* Android-specific status bar padding */}
      {/* {Platform.OS === "android" && (
        <View style={{ height: StatusBar.currentHeight }} />
      )} */}

      {/* Back Button (fixed at top-left) */}
      {/* <TouchableOpacity
        className="bg-slate-200 w-[35px] h-[35px] rounded-full flex items-center justify-center"
        style={{
          position: "absolute",
          top:
            Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + 5 : 20,
          left: 20,
          zIndex: 10,
        }}
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back" size={20} color="black" />
      </TouchableOpacity> */}

      {/* Rest of your layout */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView>
          {/* Common Header */}
          <View className="w-full">
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
