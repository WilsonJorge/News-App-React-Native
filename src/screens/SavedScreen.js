import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { BookmarkSquareIcon } from "react-native-heroicons/solid";
import { StatusBar } from "expo-status-bar";

export default function SavedScreen() {
  const navigation = useNavigation();
  const [savedArticles, setSavedArticles] = useState([]);
  const [bookmarkStatus, setBookmarkStatus] = useState([]);
  const [urlList, setUrlList] = useState([]);

  // Function to handle click on an item
  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item);
  };

  useEffect(() => {
    const urls = savedArticles.map((item) => item.url);
    setUrlList(urls);
  }, [savedArticles]);

  // Function to format the date
  function formatDate(isoDate) {
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, options);
  }

  const toggleBookmarkAndSave = async (item, index) => {
    try {
      const savedArticles = await AsyncStorage.getItem("savedArticles");
      let savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : [];

      // Check if the article is already in the bookmarked list
      const isArticleBookmarked = savedArticlesArray.some(
        (savedArticle) => savedArticle.url === item.url
      );

      if (!isArticleBookmarked) {
        // If the article is not bookmarked, add it to the bookmarked list
        savedArticlesArray.push(item);
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(savedArticlesArray)
        );
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = true;
        setBookmarkStatus(updatedStatus);
        // console.log("Article is bookmarked");
      } else {
        // If the article is already bookmarked, remove it from the list
        const updatedSavedArticlesArray = savedArticlesArray.filter(
          (savedArticle) => savedArticle.url !== item.url
        );
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(updatedSavedArticlesArray)
        );
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = false;
        setBookmarkStatus(updatedStatus);
        // console.log("Article is removed from bookmarks");
      }
    } catch (error) {
      // console.log("Error Saving/Removing Article", error);
    }
  };

  // Load saved articles from AsyncStorage when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      const loadSavedArticles = async () => {
        try {
          const savedArticles = await AsyncStorage.getItem("savedArticles");
          const savedArticlesArray = savedArticles
            ? JSON.parse(savedArticles)
            : [];

          // const isArticleBookmarkedList = urlList.map((url) =>
          //   savedArticlesArray.some((savedArticle) => savedArticle.url === url)
          // );

          // Set the bookmark status for all items based on the loaded data
          // setBookmarkStatus(isArticleBookmarkedList);
          setSavedArticles(savedArticlesArray);
        } catch (error) {
          // console.log("Error loading saved articles", error);
        }
      };

      loadSavedArticles();
      // console.log("Pull saved articles from AsyncStorage");
    }, [navigation, urlList]) // Include 'navigation' in the dependencies array if needed
  );

  const clearSavedArticles = async () => {
    try {
      await AsyncStorage.removeItem("savedArticles");
      setSavedArticles([]);
      console.log("Clear all saved articles");
    } catch (error) {
      // console.log("Error clearing saved articles", error);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          marginBottom: 4,
          flexDirection: "column",
          alignItems: "flex-start",
        }}
        key={index}
        onPress={() => handleClick(item)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "100%",
            shadowColor: "black",
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          {/* Image */}
          <View
            style={{
              alignItems: "flex-start",
              justifyContent: "flex-start",
              width: "20%",
            }}
          >
            <Image
              source={{
                uri:
                  item.urlToImage ||
                  "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
              }}
              style={{ width: hp(9), height: hp(10), borderRadius: 10 }}
              resizeMode="cover"
            />
          </View>

          {/* Content */}
          <View
            style={{
              width: "70%",
              paddingLeft: 4,
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {/* Author */}
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: "#333",
                fontFamily: "System",
              }}
            >
              {item.author}
            </Text>

            {/* Title */}
            <Text
              style={{
                fontSize: 14,
                color: "#333",
                fontFamily: "SpaceGroteskBold",
                maxWidth: "90%",
                textTransform: "capitalize",
              }}
            >
              {item.title.length > 50
                ? item.title.slice(0, 50) + "..."
                : item.title}
            </Text>

            {/* Date */}
            <Text style={{ fontSize: 12, color: "#666", fontFamily: "System" }}>
              {formatDate(item.publishedAt)}
            </Text>
          </View>

          {/* Save */}
          <View style={{ width: "10%", justifyContent: "center" }}>
            <TouchableOpacity
              onPress={() => toggleBookmarkAndSave(item, index)}
            >
              <BookmarkSquareIcon color="green" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{
        padding: 16,
        backgroundColor: "#fff",
        flex: 1,
        dark: { backgroundColor: "#333" },
      }}
    >
      <StatusBar style={"dark"} />

      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "SpaceGroteskBold",
            fontSize: 20,
            color: "#34D399",
          }}
        >
          Saved Articles
        </Text>
        <TouchableOpacity
          onPress={clearSavedArticles}
          style={{
            backgroundColor: "#34D399",
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              fontFamily: "SpaceGroteskBold",
              fontSize: 18,
              color: "#fff",
            }}
          >
            Clear
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginVertical: 16 }}>
        <FlatList
          data={savedArticles}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.title}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </View>
    </SafeAreaView>
  );
}
