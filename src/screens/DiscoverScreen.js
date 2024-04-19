import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState, useReducer } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Loading from "../components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { categories } from "../constants";
import CategoriesCard from "../components/CategoriesCard";
import NewsSection from "../components/NewsSection/NewsSection";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { fetchDiscoverNews } from "../../utils/NewsApi";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function DiscoverScreen() {
  const [activeCategory, setActiveCategory] = useState("business");
  const navigation = useNavigation();
  const [withoutRemoved, setWithoutRemoved] = useState([]);

  useEffect(() => {}, [activeCategory]);

  const { data: discoverNew, isLoading: isDiscoverLoading } = useQuery({
    queryKey: ["discoverNews", activeCategory],
    queryFn: () => fetchDiscoverNews(activeCategory),
  });

  const handleChangeCategory = (category) => {
    setActiveCategory(category);

    const filteredArticles = discoverNew?.articles.filter(
      (article) => article.title !== "[Removed]"
    );

    setWithoutRemoved(filteredArticles || []);
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: 8,
        backgroundColor: "white",
        darkBackgroundColor: "#333",
        flex: 1,
      }}
    >
      <StatusBar style={"dark"} />

      <View>
        {/* Header */}
        <View
          style={{
            paddingHorizontal: 4,
            marginBottom: 6,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              color: "#0F9D58",
              fontFamily: "SpaceGroteskBold",
            }}
          >
            Discover
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: "#333",
              fontFamily: "SpaceGroteskMedium",
            }}
          >
            News from all over the world
          </Text>
        </View>

        {/* Search */}
        <View
          style={{
            marginHorizontal: 4,
            marginBottom: 8,
            flexDirection: "row",
            padding: 2,
            paddingVertical: 3,
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#f4f4f4",
            borderRadius: 20,
          }}
        >
          <TouchableOpacity
            style={{ paddingLeft: 2 }}
            onPress={() => navigation.navigate("Search")}
          >
            <MagnifyingGlassIcon size={25} color="gray" />
          </TouchableOpacity>
          <TextInput
            placeholder="Search for news"
            placeholderTextColor="gray"
            style={{
              paddingLeft: 4,
              flex: 1,
              fontFamily: "System",
              fontWeight: "500",
              fontSize: 16,
              color: "black",
              letterSpacing: 1,
            }}
          />
        </View>

        {/* Categories */}
        <View style={{ flexDirection: "row", marginHorizontal: 4 }}>
          <CategoriesCard
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>

        <View style={{ flex: 1 }}>
          {/* Header Title */}
          <View
            style={{
              marginVertical: 4,
              marginHorizontal: 4,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "black",
                fontFamily: "SpaceGroteskBold",
              }}
            >
              Discover
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: "#0F9D58",
                fontFamily: "SpaceGroteskBold",
              }}
            >
              View all
            </Text>
          </View>

          {isDiscoverLoading ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Loading />
            </View>
          ) : (
            <ScrollView contentContainerStyle={{ paddingBottom: hp(70) }}>
              <NewsSection newsProps={withoutRemoved} label="Discovery" />
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
