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
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    dispatch(fetchTopUserArtists());
    console.log("Debug------------------------------");
    // data.items.forEach((item: any) => {
    //   // console.log("ArtistId:", item.id);
    //   // console.log("ArtistName:", item.name);
    //   // console.log("ImageUri:", item.images[0].url);
    //   // artists.push({
    //   //   id: item.id,
    //   //   imageUri: item.images[0].url,
    //   //   artistName: item.name,
    //   // });
    //   // setArtists([
    //   //   ...artists,
    //   //   {
    //   //     id: item.id,
    //   //     imageUri: item.images[0].url,
    //   //     artistName: item.name,
    //   //   },
    //   // ]);
    // });

    setArtists([
      {
        id: data.items[0].id,
        imageUri: data.items[0].images[0].url,
        artistName: data.items[0].name,
      },
      {
        id: data.items[1].id,
        imageUri: data.items[1].images[0].url,
        artistName: data.items[1].name,
      },
      {
        id: data.items[2].id,
        imageUri: data.items[2].images[0].url,
        artistName: data.items[2].name,
      },
      {
        id: data.items[3].id,
        imageUri: data.items[3].images[0].url,
        artistName: data.items[3].name,
      },
      {
        id: data.items[4].id,
        imageUri: data.items[4].images[0].url,
        artistName: data.items[4].name,
      },
      {
        id: data.items[5].id,
        imageUri: data.items[5].images[0].url,
        artistName: data.items[5].name,
      },
    ]);

    console.log("Artists1:", artists);
    // console.log("Artists2:", topArtistsData.artists);
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
        <TopArtistsHome title="Your top artists" artists={artists} />
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
