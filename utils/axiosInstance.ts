import axios from "axios";
import { Platform } from "react-native";

const axiosInstance = axios.create({
  baseURL: "https://mustang-relieved-boxer.ngrok-free.app/mobile/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    // Authorization: `Bearer OuVc2gLACRHS9hhwxYYacMIfE1nF92TrNw6uIAe043279d64`,
  },
});

// Function to dynamically set token
const setAuthToken = async (config: any) => {
  try {
    let token = "OuVc2gLACRHS9hhwxYYacMIfE1nF92TrNw6uIAe043279d64";

    if (Platform.OS === "web") {
      // Retrieve token from localStorage for web
      // token = localStorage.getItem("token");
      console.log("Token from localStorage: ", token);
    } else {
      // Retrieve token from SecureStore for iOS/Android
      // const token = await getItem("token");
    }

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      const errorMessage =
        Platform.OS === "web"
          ? "No token found in localStorage for web."
          : "No token found in SecureStore for mobile.";

      console.warn(errorMessage);
      return Promise.reject(new Error(errorMessage));
    }
  } catch (error) {
    return Promise.reject(error); // Reject the promise
  }

  return config;
};

// Add a request interceptor
axiosInstance.interceptors.request.use(setAuthToken, (error) =>
  Promise.reject(error)
);

// Add a response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration or unauthorized requests
      // Optionally, redirect to login or refresh the token
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

// config.headers["Authorization"] = `Bearer ${token}`;
