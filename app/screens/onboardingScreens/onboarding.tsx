// app/onboarding.tsx
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

type Slide = {
  title: string;
  description: string;
  // Add more properties if needed (e.g., image)
};

const slides: Slide[] = [
  {
    title: "Welcome to MyApp",
    description: "Manage your communication effortlessly.",
  },
  {
    title: "Stay Organized",
    description: "Keep chats, contacts, and updates all in one place.",
  },
];

export default function Onboarding() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = async () => {
    if (currentIndex < slides.length - 1) {
      scrollRef.current?.scrollTo({
        x: width * (currentIndex + 1),
        animated: true,
      });
    } else {
      await SecureStore.setItemAsync("hasSeenOnboarding", "true");
      router.replace("/login"); // Or your preferred entry point
    }
  };

  const skipOnboarding = async () => {
    await SecureStore.setItemAsync("hasSeenOnboarding", "true");
    router.replace("/login");
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollRef}
      >
        {slides.map((item, index) => (
          <View
            key={index}
            style={{ width }}
            className="p-10 justify-center items-center"
          >
            <Text className="text-3xl font-bold mb-4 text-center">
              {item.title}
            </Text>
            <Text className="text-lg text-gray-600 text-center">
              {item.description}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Pagination */}
      <View className="flex-row justify-center mt-4">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`h-2 w-2 mx-1 rounded-full ${
              index === currentIndex ? "bg-blue-600 w-4" : "bg-gray-300"
            }`}
          />
        ))}
      </View>

      {/* Buttons */}
      <View className="flex-row justify-between mx-6 mt-6">
        <TouchableOpacity onPress={skipOnboarding}>
          <Text className="text-blue-600 font-semibold text-lg">Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          className="bg-blue-600 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-semibold text-lg">
            {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
