import React from "react";
import { Dimensions, View } from "react-native";
import { PieChart } from "react-native-chart-kit";

const Chart = () => {
  const screenWidth = Dimensions.get("window").width;
  const theme: string = "light"; // Default to light theme since we don't have context

  // Data for the pie chart - we'll use totals from all months
  const defaultCounts = [
    { sent: 10, delivered: 8, read: 6, responded: 4, failed: 2 },
    { sent: 15, delivered: 12, read: 9, responded: 6, failed: 3 },
    { sent: 8, delivered: 7, read: 5, responded: 3, failed: 1 },
    { sent: 12, delivered: 10, read: 7, responded: 5, failed: 2 },
    { sent: 20, delivered: 18, read: 15, responded: 10, failed: 2 },
  ];

  // Calculate totals for each category
  const totals = defaultCounts.reduce(
    (acc, curr) => {
      return {
        sent: acc.sent + curr.sent,
        delivered: acc.delivered + curr.delivered,
        read: acc.read + curr.read,
        responded: acc.responded + curr.responded,
        failed: acc.failed + curr.failed,
      };
    },
    { sent: 0, delivered: 0, read: 0, responded: 0, failed: 0 }
  );

  const pieData = [
    {
      name: "Sent",
      population: totals.sent,
      color: "rgba(63, 81, 181, 1)",
      legendFontColor: theme === "dark" ? "#fff" : "#000",
      legendFontSize: 14,
    },
    {
      name: "Delivered",
      population: totals.delivered,
      color: "rgba(76, 175, 80, 1)",
      legendFontColor: theme === "dark" ? "#fff" : "#000",
      legendFontSize: 14,
    },
    {
      name: "Read",
      population: totals.read,
      color: "rgba(255, 193, 7, 1)",
      legendFontColor: theme === "dark" ? "#fff" : "#000",
      legendFontSize: 14,
    },
    {
      name: "Responded",
      population: totals.responded,
      color: "rgba(33, 150, 243, 1)",
      legendFontColor: theme === "dark" ? "#fff" : "#000",
      legendFontSize: 14,
    },
    {
      name: "Failed",
      population: totals.failed,
      color: "rgba(244, 67, 54, 1)",
      legendFontColor: theme === "dark" ? "#fff" : "#000",
      legendFontSize: 14,
    },
  ];

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
      <PieChart
        data={pieData}
        width={screenWidth - 20}
        height={220}
        chartConfig={{
          backgroundColor: "transparent",
          backgroundGradientFrom: theme === "dark" ? "#060b12" : "#fff",
          backgroundGradientTo: theme === "dark" ? "#060b12" : "#fff",
          color: (opacity = 1) =>
            theme === "dark"
              ? `rgba(255, 255, 255, ${opacity})`
              : `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute // Shows actual values instead of percentages
        style={{
          marginVertical: 12,
          borderRadius: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 1,
        }}
      />

      {/* Optional: Additional legend if needed */}
      {/* <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        {pieData.map((data, index) => (
          <View
            key={index}
            style={{ flexDirection: "row", alignItems: "center", margin: 5 }}
          >
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: data.color,
                marginRight: 5,
              }}
            />
            <Text
              style={{
                fontSize: 14,
                color: theme === "dark" ? "#fff" : "#000",
              }}
            >
              {data.name}: {data.population}
            </Text>
          </View>
        ))}
      </View> */}
    </View>
  );
};

export default Chart;
