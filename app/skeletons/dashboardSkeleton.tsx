import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

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

  return (
    <Animated.View
      style={[
        {
          backgroundColor: "#e0e0e0",
          opacity,
        },
        style,
      ]}
    />
  );
};

const DashboardSkeleton = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.headerCard}>
        <View style={styles.headerTop}>
          <Shimmer style={styles.textBlockLarge} />
          <Shimmer style={styles.textBlockSmall} />
          <Shimmer style={styles.iconCircle} />
        </View>
        <Shimmer style={styles.progressBar} />
        <View style={styles.usageRow}>
          <Shimmer style={styles.textBlockSmall} />
          <Shimmer style={styles.textBlockSmall} />
        </View>
      </View>

      {/* Section title */}
      <Shimmer style={styles.sectionTitle} />

      {/* Stat cards */}
      <View style={styles.cardGrid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Shimmer
            key={i}
            style={[styles.statCard, i % 2 === 0 && { marginRight: "4%" }]}
          />
        ))}
      </View>

      {/* Chart Section */}
      <Shimmer style={styles.sectionTitle} />
      <View style={styles.chartCard}>
        <Shimmer style={styles.donutSkeleton} />
        <View style={styles.legend}>
          {Array.from({ length: 4 }).map((_, i) => (
            <View key={i} style={styles.legendRow}>
              <Shimmer style={styles.legendDot} />
              <Shimmer style={styles.legendLine} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    paddingBottom: 100,
    paddingTop: 10,
  },
  headerCard: {
    height: 120,
    borderRadius: 16,
    backgroundColor: "#f3f4f6",
    padding: 16,
    marginTop: 24,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textBlockLarge: {
    width: 100,
    height: 18,
    borderRadius: 4,
    marginBottom: 4,
  },
  textBlockSmall: {
    width: 60,
    height: 14,
    borderRadius: 4,
    marginTop: 8,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  progressBar: {
    marginTop: 12,
    height: 6,
    borderRadius: 3,
    width: "100%",
  },
  usageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  sectionTitle: {
    width: 120,
    height: 18,
    borderRadius: 4,
    marginTop: 32,
    marginBottom: 12,
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    height: 80,
    width: "48%",
    borderRadius: 12,
    marginBottom: 16,
  },
  chartCard: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    padding: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  donutSkeleton: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  legend: {
    marginLeft: 16,
    flex: 1,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendLine: {
    width: 80,
    height: 12,
    borderRadius: 4,
  },
});

export default DashboardSkeleton;
