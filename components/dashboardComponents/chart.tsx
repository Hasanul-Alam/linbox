import * as d3Shape from "d3-shape";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle, G, Path } from "react-native-svg";

// Constants
const CHART_SIZE = 150; // reduced from 180
const RADIUS = CHART_SIZE / 2;
const INNER_RADIUS = 40;
const CENTER_CIRCLE_RADIUS = INNER_RADIUS - 4;

const DonutChartCustom = ({ messageAnalytics }: any) => {
  type AnalyticsCount = {
    sent: number;
    delivered: number;
    read: number;
    failed: number;
  };
  const total = messageAnalytics?.counts?.reduce(
    (acc: AnalyticsCount, curr: AnalyticsCount) => {
      acc.sent += curr.sent;
      acc.delivered += curr.delivered;
      acc.read += curr.read;
      acc.failed += curr.failed;
      return acc;
    },
    { sent: 0, delivered: 0, read: 0, failed: 0 }
  );

  const sum = total?.sent + total?.delivered + total?.read + total?.failed;

  const analyticsData = [
    {
      label: "Sent",
      value: sum > 0 ? (total?.sent / sum) * 100 : 0,
      color: "#2ECC71",
    },
    {
      label: "Delivered",
      value: sum > 0 ? (total?.delivered / sum) * 100 : 0,
      color: "#6A5ACD",
    },
    {
      label: "Read",
      value: sum > 0 ? (total?.read / sum) * 100 : 0,
      color: "#4cdfdf",
    },
    {
      label: "Failed",
      value: sum > 0 ? (total?.failed / sum) * 100 : 0,
      color: "#e76f83",
    },
  ] as const;

  // Chart Data Preparation
  const pieData = d3Shape
    .pie()
    .value((d: any) => d.value)
    .padAngle(0.02)(analyticsData);

  const arcGenerator = d3Shape
    .arc()
    .outerRadius(RADIUS)
    .innerRadius(INNER_RADIUS)
    .cornerRadius(4);

  return (
    <View style={styles.container}>
      <Svg width={CHART_SIZE} height={CHART_SIZE}>
        <G x={RADIUS} y={RADIUS}>
          {/* @ts-ignore */}
          {pieData.map((slice, index) => (
            <Path
              key={index}
              d={arcGenerator(slice) || ""}
              fill={analyticsData[index].color}
            />
          ))}
          <Circle cx={0} cy={0} r={CENTER_CIRCLE_RADIUS} fill="#fff" />
        </G>
      </Svg>

      <View style={styles.legendContainer}>
        {analyticsData.map((item) => (
          <View key={item.label} style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: item.color }]}
            />
            <Text style={styles.legendText}>
              {item.label} - {item.value.toFixed(2)}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  legendContainer: {
    marginLeft: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  legendColor: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 14,
  },
});

export default DonutChartCustom;
