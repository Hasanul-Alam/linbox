import * as d3Shape from "d3-shape";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle, G, Path } from "react-native-svg";

// Constants
const CHART_SIZE = 180;
const RADIUS = CHART_SIZE / 2;
const INNER_RADIUS = 50;
const CENTER_CIRCLE_RADIUS = INNER_RADIUS - 5;

// Chart data
const DATA = [
  { label: "Completed", value: 60.6, color: "#000000" },
  { label: "In Progress", value: 26.4, color: "#2ECC71" },
  { label: "Behind", value: 3, color: "#6A5ACD" },
  { label: "Cancelled", value: 10, color: "#FFC0CB" },
] as const;

const DonutChartCustom = () => {
  // Generate pie chart segments
  const pieData = d3Shape
    .pie()
    .value((d: any) => d.value)
    .padAngle(0.03)(DATA); // Add small spacing between segments

  // Arc generator for chart segments
  const arcGenerator = d3Shape
    .arc()
    .outerRadius(RADIUS)
    .innerRadius(INNER_RADIUS)
    .cornerRadius(5); // Rounded corners for segments

  return (
    <View style={styles.container}>
      {/* Chart SVG */}
      <Svg width={CHART_SIZE} height={CHART_SIZE}>
        <G x={RADIUS} y={RADIUS}>
          {/* Render each segment */}
          {/* @ts-ignore */}
          {pieData.map((slice, index) => (
            <Path
              key={index}
              d={arcGenerator(slice) || ""}
              fill={DATA[index].color}
            />
          ))}
          {/* Center circle (donut hole) */}
          <Circle cx={0} cy={0} r={CENTER_CIRCLE_RADIUS} fill="#fff" />
        </G>
      </Svg>

      {/* Legend */}
      <View style={styles.legendContainer}>
        {DATA.map((item) => (
          <View key={item.label} style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: item.color }]}
            />
            <Text style={styles.legendText}>
              {item.label} - {item.value}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  legendContainer: {
    marginLeft: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
  },
});

export default DonutChartCustom;
