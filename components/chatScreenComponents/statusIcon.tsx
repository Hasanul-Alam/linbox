import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

interface StatusIconProps {
  status: "sent" | "delivered" | "read" | "failed";
}

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  switch (status) {
    case "sent":
      return (
        <Feather
          name="check"
          size={14}
          color="#888"
          style={{ marginLeft: 4 }}
        />
      );
    case "delivered":
      return (
        <MaterialCommunityIcons
          name="check-all"
          size={14}
          color="#888"
          style={{ marginLeft: 4 }}
        />
      );
    case "read":
      return (
        <MaterialCommunityIcons
          name="check-all"
          size={14}
          color="#22c065"
          style={{ marginLeft: 4 }}
        />
      );
    case "failed":
      return (
        <Feather
          name="alert-circle"
          size={14}
          color="red"
          style={{ marginLeft: 4 }}
        />
      );
    default:
      return null;
  }
};

export default StatusIcon;
