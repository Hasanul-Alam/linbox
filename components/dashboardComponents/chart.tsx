import React from "react";
import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

const Chart = () => {
  const screenWidth = Dimensions.get("window").width;
  const theme: string = "light"; // Default to light theme since we don't have context

  // Default data when messageData is not available
  const defaultLabels = ["Jan", "Feb", "Mar", "Apr", "May"];
  const defaultCounts = [
    { sent: 10, delivered: 8, read: 6, responded: 4, failed: 2 },
    { sent: 15, delivered: 12, read: 9, responded: 6, failed: 3 },
    { sent: 8, delivered: 7, read: 5, responded: 3, failed: 1 },
    { sent: 12, delivered: 10, read: 7, responded: 5, failed: 2 },
    { sent: 20, delivered: 18, read: 15, responded: 10, failed: 2 },
  ];

  const chartData = {
    labels: defaultLabels,
    datasets: [
      {
        legendLabel: "Sent",
        data: defaultCounts.map((item) => item.sent),
        color: (opacity = 1) => `rgba(63, 81, 181, ${opacity})`,
      },
      {
        legendLabel: "Delivered",
        data: defaultCounts.map((item) => item.delivered),
        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
      },
      {
        legendLabel: "Read",
        data: defaultCounts.map((item) => item.read),
        color: (opacity = 1) => `rgba(255, 193, 7, ${opacity})`,
      },
      {
        legendLabel: "Respond",
        data: defaultCounts.map((item) => item.responded),
        color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
      },
      {
        legendLabel: "Failed",
        data: defaultCounts.map((item) => item.failed),
        color: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`,
      },
    ],
  };

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        width: "100%",
        backgroundColor: theme === "dark" ? "#060b12" : "#fff",
      }}
    >
      <LineChart
        data={{
          labels: chartData.labels,
          datasets: chartData.datasets.map((dataset) => ({
            data: dataset.data,
            color: dataset.color,
          })),
        }}
        width={screenWidth - 20}
        height={240}
        chartConfig={{
          backgroundColor: "transparent",
          backgroundGradientFrom: theme === "dark" ? "#060b12" : "#fff",
          backgroundGradientTo: theme === "dark" ? "#060b12" : "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) =>
            theme === "dark"
              ? `rgba(255, 255, 255, ${opacity})`
              : `rgba(50, 115, 220, ${opacity})`,
          labelColor: (opacity = 1) =>
            theme === "dark"
              ? `rgba(255, 255, 255, ${opacity})`
              : `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 8,
          },
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: theme === "dark" ? "#fff" : "#3273DC",
          },
        }}
        style={{
          marginVertical: 12,
          marginHorizontal: 20,
          borderRadius: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 1,
        }}
        bezier
      />

      {/* Uncomment if you want to show the legend */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {chartData.datasets.map((dataset, index) => (
          <View
            key={index}
            style={{ flexDirection: "row", alignItems: "center", margin: 5 }}
          >
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: dataset.color(1),
                marginRight: 5,
              }}
            />
            <Text
              style={{
                fontSize: 14,
                color: theme === "dark" ? "#fff" : "#000",
              }}
            >
              {dataset.legendLabel}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Chart;
