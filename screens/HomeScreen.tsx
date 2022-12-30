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
import { useState } from "react";

// export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
export default function HomeScreen() {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector(topUserArtistsSelector);
  useEffect( () => {
    dispatch(fetchTopUserArtists());
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
        <TopArtistsHome title="Your top artists" artists={data} />
        {/* <TopArtistsHome
          title={"Your top artists"}
          artists={topArtistsData.artists}
        /> */}
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
