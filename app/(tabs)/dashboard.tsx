import CommonHeader from "@/components/reusableComponents/commonHeader/commonHeader";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
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
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [messageAnalytics, setMessageAnalytics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // const testRequest = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://mustang-relieved-boxer.ngrok-free.app/mobile/api/dashboard",
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer OuVc2gLACRHS9hhwxYYacMIfE1nF92TrNw6uIAe043279d64`,
  //         },
  //       }
  //     );

  //     console.log("Axios success:", JSON.stringify(response.data, null, 2));
  //     return response.data;
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       // Axios-specific error handling
  //       console.error("Axios error response:", error.response?.data);
  //       console.error("Status code:", error.response?.status);
  //     } else {
  //       console.error("Unexpected error:", error);
  //     }
  //     throw error; // Re-throw if you want calling code to handle it
  //   }
  // };

  const handleGetDashboardData = async () => {
    setIsLoading(true);
    try {
      console.log("getting dashboard data inside function.");
      const response = await axiosInstance.get(`/dashboard`);
      console.log("Dashboard data:", response.data);
      if (response.data.status === 200) {
        const data = response.data;
        setDashboardData(data.data.metrics);
        setMessageAnalytics(data.data.metrics.messages.monthly_analytics);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("hello from dashboard");

  useEffect(() => {
    if (!dashboardData || !messageAnalytics) {
      handleGetDashboardData();
      console.log("getting dashboard data.");
    }
    // testRequest();
  }, []);
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
          <DashboardScreen
            dashboardData={dashboardData}
            messageAnalytics={messageAnalytics}
            loading={isLoading}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Dashboard;
