import { Tabs } from "expo-router";
import { Headset, Home, MessageCircle } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

export default function RootLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarInactiveTintColor: "#8E8E93",
          tabBarActiveTintColor: "#000",

          tabBarStyle: {
            height: 75, // Slightly increased height
            paddingBottom: 10,
            paddingTop: 5,
            // borderTopLeftRadius: 10,
            // borderTopRightRadius: 10,
            backgroundColor: "#FFF", // Dynamic background color based on theme
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            elevation: 10, // Shadow effect for depth
            shadowColor: "#000", // Shadow based on theme
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            borderTopWidth: 0, // Removes the white border on top
          },
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={styles.tabItem}
                className={
                  focused
                    ? "bg-[#f1f1f1] w-[45px] h-[45px] rounded-full"
                    : undefined
                }
              >
                <Home size={24} color={focused ? "#000" : "#8E8E93"} />
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="inbox"
          options={{
            headerShown: false,

            tabBarIcon: ({ focused }) => (
              <View
                style={styles.tabItem}
                className={
                  focused
                    ? "bg-[#f1f1f1] w-[45px] h-[45px] rounded-full"
                    : undefined
                }
              >
                <MessageCircle size={24} color={focused ? "#000" : "#8E8E93"} />
              </View>
            ),
          }}
        />

        {/* <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={styles.tabItem}
                className={
                  focused
                    ? "bg-[#f1f1f1] w-[45px] h-[45px] rounded-full"
                    : undefined
                }
              >
                <User size={24} color={focused ? "#000" : "#8E8E93"} />
              </View>
            ),
          }}
        /> */}

        <Tabs.Screen
          name="liveChat"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={styles.tabItem}
                className={
                  focused
                    ? "bg-[#f1f1f1] w-[45px] h-[45px] rounded-full"
                    : undefined
                }
              >
                <Headset size={24} color={focused ? "#000" : "#8E8E93"} />
              </View>
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    top: 10,
  },
  activeIndicator: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#5E5CE6",
    marginTop: 5,
  },
  centralButton: {
    top: -20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#5E5CE6",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#5E5CE6",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
});
