import { ActivityIndicator, Button, StyleSheet } from "react-native";
import { View } from "react-native";
import { RootTabScreenProps } from "../types";
import TopArtistsHome from "../components/TopArtistsHome";
import topArtistsData from "../data/topArtistsData";
import PlayComponent from "../components/PlayComponent";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import {
  fetchTopUserArtists,
  topUserArtistsSelector,
} from "../redux/slices/topUserArtists";
import { useSelector } from "react-redux";

// export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
export default function HomeScreen() {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector(topUserArtistsSelector);
  var artists: any = [];

  useEffect(() => {
    dispatch(fetchTopUserArtists());
    console.log("Debug------------------------------");
    data.items.forEach((item: any) => {
      // console.log("ArtistId:", item.id);
      // console.log("ArtistName:", item.name);
      // console.log("ImageUri:", item.images[0].url);
      artists.push({
        id: item.id,
        imageUri: item.images[0].url,
        artistName: item.name,
      });
    });
    console.log("Artists1:", artists);
    // console.log("Artists2:", topArtistsData.artists);

    // console.log("isLoading:", isLoading);
    // console.log("Test name:", artists[0].artistName);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      <View style={styles.topArtistsContainer}>
        {/* <TopArtistsHome title="Your top artists" artists={artists} /> */}
        <TopArtistsHome
          title={"Your top artists"}
          artists={topArtistsData.artists}
        />
      </View>
      <View style={styles.bottomContainer}>
        <PlayComponent />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  topArtistsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 1,
  },
});
