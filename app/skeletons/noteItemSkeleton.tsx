import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const Shimmer = ({ style }: { style: any }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return <Animated.View style={[styles.shimmerBase, style, { opacity }]} />;
};

const NoteItemSkeleton = () => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Shimmer style={styles.avatar} />
        <View style={styles.userInfo}>
          <Shimmer style={styles.username} />
          <Shimmer style={styles.date} />
        </View>
        <View style={styles.emptyActions} />
      </View>

      {/* Note content */}
      <Shimmer style={styles.noteLine} />
      <Shimmer style={[styles.noteLine, { width: "85%" }]} />
      <Shimmer style={[styles.noteLine, { width: "70%" }]} />

      {/* Action buttons */}
      <View style={styles.footer}>
        <Shimmer style={styles.actionButton} />
        <View style={styles.iconRow}>
          <Shimmer style={styles.iconButton} />
          <Shimmer style={styles.iconButton} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shimmerBase: {
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
  },
  card: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    width: 100,
    height: 14,
    marginBottom: 6,
  },
  date: {
    width: 80,
    height: 10,
    borderRadius: 4,
  },
  emptyActions: {
    width: 24,
    height: 24,
  },
  noteLine: {
    height: 12,
    borderRadius: 4,
    marginBottom: 8,
    width: "100%",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    paddingTop: 12,
  },
  actionButton: {
    width: 60,
    height: 14,
    borderRadius: 4,
  },
  iconRow: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginLeft: 8,
  },
});

export default NoteItemSkeleton;
