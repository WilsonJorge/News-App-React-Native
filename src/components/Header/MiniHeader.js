import { View, Text } from "react-native";
import React from "react";

export default function MiniHeader({ label }) {
  return (
    <View
      style={{
        paddingHorizontal: 16,
        marginTop: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          color: "#0F9D58",
          fontFamily: "SpaceGroteskBold",
        }}
      >
        {label}
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: "#333",
          fontFamily: "SpaceGroteskMedium",
        }}
      >
        View all
      </Text>
    </View>
  );
}
