import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { fetchSearchNews } from "../../utils/NewsApi";
import { debounce } from "lodash";
import NewsSection from "../components/NewsSection/NewsSection";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function SearchScreen() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (search) => {
    if (search && search?.length > 2) {
      setLoading(true);
      setResults([]);
      setSearchTerm(search);

      try {
        const data = await fetchSearchNews(search);

        setLoading(false);

        if (data && data.articles) {
          setResults(data.articles);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <View
      style={{ flex: 1, backgroundColor: "white", darkBackgroundColor: "#333" }}
    >
      {/* Search Input */}
      <View
        style={{
          marginHorizontal: 4,
          marginBottom: 3,
          marginTop: 12,
          flexDirection: "row",
          padding: 2,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f4f4f4",
          borderRadius: 10,
        }}
      >
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search for your news"
          placeholderTextColor="gray"
          style={{
            fontFamily: "System",
            fontWeight: "500",
            fontSize: 16,
            color: "black",
            padding: 12,
            width: "90%",
          }}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <XMarkIcon size={25} color="green" strokeWidth={3} />
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      <View style={{ marginHorizontal: 4, marginBottom: 4 }}>
        <Text
          style={{
            fontSize: 20,
            color: "black",
            fontFamily: "SpaceGroteskBold",
          }}
        >
          {results?.length} News for {searchTerm}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: hp(5) }}>
        <NewsSection newsProps={results} label="Search Results" />
      </ScrollView>
    </View>
  );
}
