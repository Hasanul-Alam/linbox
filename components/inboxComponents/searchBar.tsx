import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface SearchBarProps {
  theme: string;
  searchText: string;
  searchLoading: boolean;
  animation: Animated.Value;
  onSearchChange: (text: string) => void;
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  theme,
  searchText,
  searchLoading,
  animation,
  onSearchChange,
  onClose,
}) => {
  // You could also move the animation logic here if you want more control
  // For example:
  /*
  const animation = React.useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false, // height animation can't use native driver
    }).start();
  }, []);
  */

  const heightAnim = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 60],
  });

  const paddingAnim = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  return (
    <Animated.View
      style={[
        styles.searchContainer,
        {
          backgroundColor: theme === "dark" ? "#1F2C34" : "#fff",
          height: heightAnim,
          opacity: animation,
          paddingVertical: paddingAnim,
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View
        className="border border-gray-300"
        style={[
          styles.searchInputContainer,
          { backgroundColor: theme === "dark" ? "#121B22" : "white" },
        ]}
      >
        <AntDesign
          name="search1"
          size={18}
          color={theme === "dark" ? "#8596A0" : "#667781"}
          style={styles.searchIcon}
        />
        <TextInput
          className=""
          style={[
            styles.searchInput,
            { color: theme === "dark" ? "white" : "black" },
          ]}
          placeholder="Search..."
          placeholderTextColor={theme === "dark" ? "#8596A0" : "#667781"}
          value={searchText}
          onChangeText={onSearchChange}
        />
        {searchLoading ? (
          <ActivityIndicator
            size="small"
            color={theme === "dark" ? "#8596A0" : "#667781"}
          />
        ) : searchText.length > 0 ? (
          <TouchableOpacity onPress={() => onSearchChange("")}>
            <AntDesign
              name="close"
              size={18}
              color={theme === "dark" ? "#8596A0" : "#667781"}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
        <Text
          style={{
            color: theme === "dark" ? "#00A884" : "#008069",
            fontSize: 16,
          }}
        >
          Cancel
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "white",
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 0,
    fontSize: 16,
  },
  cancelButton: {
    marginLeft: 10,
    padding: 0,
  },
});

export default SearchBar;
