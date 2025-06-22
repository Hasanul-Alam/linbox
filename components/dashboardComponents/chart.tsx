import * as d3Shape from "d3-shape";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle, G, Path } from "react-native-svg";

// Constants
const CHART_SIZE = 150; // reduced from 180
const RADIUS = CHART_SIZE / 2;
const INNER_RADIUS = 40;
const CENTER_CIRCLE_RADIUS = INNER_RADIUS - 4;

const DATA = [
  { label: "Sent", value: 60.6, color: "#2ECC71" },
  { label: "Delivered", value: 26.4, color: "#6A5ACD" },
  { label: "Read", value: 3, color: "#4cdfdf" },
  { label: "Failed", value: 10, color: "#e76f83" },
] as const;

const DonutChartCustom = () => {
  const pieData = d3Shape
    .pie()
    .value((d: any) => d.value)
    .padAngle(0.02)(DATA);

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
              fill={DATA[index].color}
            />
          ))}
          <Circle cx={0} cy={0} r={CENTER_CIRCLE_RADIUS} fill="#fff" />
        </G>
      </Svg>

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
