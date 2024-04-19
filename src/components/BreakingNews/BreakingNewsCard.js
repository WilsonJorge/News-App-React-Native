import {
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Text,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

var { width, height } = Dimensions.get("window");

export default function BreakingNewsCard({ item, handleClick }) {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View style={{ position: "relative" }}>
        <Image
          source={{
            uri:
              item.urlToImage ||
              "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
          }}
          style={{
            width: width * 0.8,
            height: height * 0.22,
            borderRadius: 20,
          }}
          resizeMode="cover"
        />

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "100%",
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
          }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />

        {/* Title and Author */}
        <View
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            justifyContent: "flex-end",
            height: "80%",
          }}
        >
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                textTransform: "capitalize",
                maxWidth: "98%",
              }}
            >
              {item.title.length > 60
                ? item.title.slice(0, 58) + "..."
                : item.title.split("-")[0] || "N/A"}
            </Text>
          </View>

          <View>
            <Text style={{ color: "#ccc", fontSize: 12, fontWeight: "normal" }}>
              {item?.author?.length > 20
                ? item.author.slice(0, 20) + "..."
                : item.author}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
