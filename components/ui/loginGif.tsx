import React from "react";
import { StyleSheet, View } from "react-native";
import { Circle, Path, Rect, Svg } from "react-native-svg";

const LoginGif = () => {
  return (
    <View style={styles.container}>
      <Svg width="300" height="250" viewBox="0 0 300 250">
        {/* Lock body */}
        <Rect
          x="110"
          y="100"
          width="80"
          height="90"
          rx="5"
          fill="#4a90e2"
          stroke="#2c3e50"
          strokeWidth="2"
        />

        {/* Lock top */}
        <Path
          d="M140,100 C150,80 170,80 180,100"
          fill="none"
          stroke="#2c3e50"
          strokeWidth="2"
        />

        {/* Keyhole */}
        <Circle
          cx="150"
          cy="140"
          r="15"
          fill="#f8f9fa"
          stroke="#2c3e50"
          strokeWidth="2"
        />
        <Rect
          x="145"
          y="155"
          width="10"
          height="20"
          rx="2"
          fill="#f8f9fa"
          stroke="#2c3e50"
          strokeWidth="2"
        />

        {/* Key */}
        <Rect
          x="190"
          y="160"
          width="40"
          height="10"
          rx="3"
          fill="#f39c12"
          stroke="#d35400"
          strokeWidth="2"
        />
        <Circle
          cx="210"
          cy="165"
          r="8"
          fill="#f39c12"
          stroke="#d35400"
          strokeWidth="2"
        />

        {/* Login text */}
        <Path
          d="M50,30 Q75,20 100,30 T150,30 T200,30"
          fill="none"
          stroke="#4a90e2"
          strokeWidth="2"
        />
        <Path
          d="M50,50 L50,80 M70,50 L70,80 M90,50 L90,80"
          fill="none"
          stroke="#4a90e2"
          strokeWidth="3"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
});

export default LoginGif;
