import { Switch, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 16,
        marginTop: 16,
      }}
    >
      <View>
        <Text
          style={{
            fontFamily: "SpaceGroteskBold",
            fontSize: 24,
            color: "#0F9D58",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          stack news
        </Text>
      </View>

      {/* Switch and Search Icon */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Search")}
          style={{
            backgroundColor: "#0F9D58",
            borderRadius: 999,
            padding: 8,
          }}
        >
          <MagnifyingGlassIcon size={25} strokeWidth={2} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
