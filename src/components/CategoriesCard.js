import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { categoryData } from "../constants";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function CategoriesCard({
  categories,
  activeCategory,
  handleChangeCategory,
}) {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20 }}
      >
        {categories.map((category, index) => {
          let isActive = category.title == activeCategory;
          let activeButtonStyle = isActive
            ? { backgroundColor: "#34D399" }
            : { backgroundColor: "rgba(0, 0, 0, 0.1)" };
          let activeTextStyle = isActive
            ? { color: "#fff" }
            : { color: "#666" };

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(category.title)}
              style={{
                marginRight: 8,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  borderRadius: 999,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  ...activeButtonStyle,
                }}
              >
                <Text
                  style={{
                    textTransform: "capitalize",
                    fontSize: 14,
                    ...activeTextStyle,
                  }}
                >
                  {category.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
