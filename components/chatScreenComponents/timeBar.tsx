import React from "react";
import { Animated, View } from "react-native";

interface TimerBarProps {
  progress: Animated.Value;
}

const TimerBar: React.FC<TimerBarProps> = ({ progress }) => {
  return (
    <View className="mt-0 w-full h-[2px] bg-gray-200">
      <Animated.View
        className="h-full bg-primary"
        style={{
          width: progress.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"],
          }),
        }}
      />
    </View>
  );
};

export default TimerBar;
