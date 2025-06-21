import React from "react";
import { View } from "react-native";

type ProgressBarProps = {
  progress: number;
  color: string;
};

const ProgressBar = ({ progress, color }: ProgressBarProps) => {
  // const [progress, setProgress] = useState(37);

  return (
    <View className="flex-1 w-full rounded-full">
      {/* Progress Bar Container */}
      <View className="w-full h-2 bg-[#D9D9D9] rounded-full overflow-hidden">
        {/* Progress Bar Fill */}
        <View
          className={`h-full ${color} rounded-full`}
          style={{ width: `${progress}%` }} // Dynamic width
        />
      </View>
    </View>
  );
};

export default ProgressBar;
