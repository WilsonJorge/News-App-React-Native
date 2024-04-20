import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { LinearGradient } from "expo-linear-gradient";

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../../assets/images/welcome/reporter.jpg")}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 6,
        backgroundColor: "#0F9D58",
      }}
    >
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.9)"]}
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "100%",
        }}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
          maxWidth: "85%",
          marginBottom: 4,
        }}
      >
        <Text
          style={{
            fontSize: 40,
            fontFamily: "SpaceGroteskBold",
            fontWeight: "bold",
            color: "white",
            textShadowColor: "black",
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 5,
            textAlign: "center",
            letterSpacing: 1,
          }}
        >
          Your Portal for Instant Updates
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "SpaceGroteskMedium",
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            letterSpacing: 1,
          }}
        >
          Explore the Latest News with Our Seamless Onboarding Experience.
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "white",
          borderRadius: 50,
          padding: 16,
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
          marginTop: 8,
        }}
        onPress={() => navigation.navigate("HomeTabs")}
      >
        <Text style={{ fontSize: 16, color: "#0F9D58", fontWeight: "bold" }}>
        Get Started
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
