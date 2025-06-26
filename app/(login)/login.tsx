import { saveItem } from "@/hooks/useSecureStorage";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const showMessage = (message: any) => {
    Alert.alert("Message", message, [{ text: "OK" }]);
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        console.log(
          "Google Sign-In Response:",
          JSON.stringify(response, null, 2)
        );

        // Get the access token explicitly
        const { accessToken } = await GoogleSignin.getTokens();

        if (accessToken) {
          console.log("Access Token:", accessToken);
          // Send the access token to your backend
          sendSignInRequest(accessToken);
        }
      } else {
        alert("Google Sign-In was cancelled.");
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            showMessage("Google Sign-In is in progress");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            showMessage("Google Play Services not available");
            break;
          case statusCodes.SIGN_IN_CANCELLED:
            showMessage("Google Sign-In was cancelled.");
            break;
          default:
            showMessage(error.code);
        }
      } else {
        showMessage("An error occurred during Google Sign-In.");
      }
      console.error(error);
    } finally {
      // Do something if needed
      setLoading(false);
    }
  };

  const sendSignInRequest = async (token: any) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://lancepilot.com/mobile/api/auth/google`,
        {
          token,
        }
      );
      if (response.data.data.token) {
        // Save token, user info, and workspace
        await saveItem("token", response.data.data.token);
        await saveItem("userInfo", response.data.data.user);
        await saveItem("workspace", response.data.data.workspace);

        // @ts-ignore
        router.replace("/(tabs)/dashboard");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "979717880490-nla5a66imi82oq1f1bs4c4k8lhl0k57n.apps.googleusercontent.com",
      profileImageSize: 150,
      scopes: ["email", "profile"], // Add required scopes
      offlineAccess: true, // Request an access token and refresh token
    });
  }, []);

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {/* Top content (e.g., logo or animation) */}
      <View className="flex-1 items-center justify-center"></View>
      <View className="mb-10 px-5">
        <View className="mb-16 flex items-center justify-center">
          {/* Login Screen Image */}
          <View className="w-[95%] mx-auto h-[400px]">
            <Image
              className="mb-10 w-full h-full"
              source={require("../../assets/images/loginImage.png")}
              resizeMode="contain"
            />
          </View>
          <Text className="text-4xl font-medium text-black">
            Welcome To Linbox
          </Text>
          <Text className="text-xl text-gray-500 mt-2 w-[90%] text-center leading-normal">
            {" "}
            Share with anyone, anywhere.{" "}
          </Text>
          <Text className="text-xl text-gray-500 w-[90%] text-center leading-normal">
            A home for all the groups in your life.
          </Text>
        </View>

        {/* Sign In Buttons */}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            router.push("/(tabs)/dashboard");
          }}
        >
          <View style={style.button} className="bg-[#22c065] rounded-full">
            <Text className="text-center text-black text-lg">Sign In</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          className="flex-row items-center gap-2 mt-5 border border-[#e7e5e7] rounded-full justify-center py-3"
          onPress={() => {
            handleGoogleSignIn();
          }}
        >
          <View className="w-[20px] h-[20px]">
            <Image
              source={require("../../assets/images/google-icon.png")}
              resizeMode="contain"
              className="w-full h-full"
            />
          </View>
          {loading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Text className="text-center text-black text-lg">
              Sign In With Google
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  button: {
    width: "100%",
    padding: 15,
  },
});

export default Login;
