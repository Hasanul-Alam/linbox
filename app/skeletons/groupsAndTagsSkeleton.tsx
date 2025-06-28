import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  theme: "light" | "dark";
}

const GroupsAndTagsSkeleton = ({ theme }: Props) => {
  const groupCount = 3;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View
          style={[
            styles.titleBlock,
            {
              backgroundColor: theme === "dark" ? "#374151" : "#e5e7eb",
            },
          ]}
        />
        <View
          style={[
            styles.addButton,
            {
              backgroundColor: theme === "dark" ? "#374151" : "#d1d5db",
            },
          ]}
        />
      </View>

      {/* Group chips */}
      <View style={styles.groupWrap}>
        {Array.from({ length: groupCount }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.groupChip,
              {
                backgroundColor: theme === "dark" ? "#374151" : "#e0e7ff",
              },
            ]}
          >
            <View
              style={[
                styles.groupText,
                {
                  backgroundColor: theme === "dark" ? "#6b7280" : "#9ca3af",
                },
              ]}
            />
            <View
              style={[
                styles.crossIcon,
                {
                  backgroundColor: theme === "dark" ? "#6b7280" : "#9ca3af",
                },
              ]}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 0,
    borderRadius: 16,
    marginHorizontal: "5%",
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  titleBlock: {
    width: 140,
    height: 20,
    borderRadius: 6,
  },
  addButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  groupWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  groupChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 8,
    marginRight: 8,
  },
  groupText: {
    width: 60,
    height: 12,
    borderRadius: 4,
    marginRight: 6,
  },
  crossIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default GroupsAndTagsSkeleton;
