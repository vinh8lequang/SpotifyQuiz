import { ActivityIndicator, Button, StyleSheet } from "react-native";
import { View } from "react-native";
import TopArtistsHome from "../components/TopArtistsHome";
import PlayComponent from "../components/PlayComponent";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import {
  fetchTopUserArtists,
  topUserArtistsSelector,
} from "../redux/slices/topUserArtists";
import { useSelector } from "react-redux";
import { fetchTopTracks, topTracksSelector } from "../redux/slices/topTracks";
import { ScrollView } from "react-native-gesture-handler";

// export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
export default function HomeScreen() {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector(topUserArtistsSelector);
  const { data: data2 } = useSelector(topTracksSelector);
  useEffect(() => {
    dispatch(fetchTopUserArtists());
    dispatch(fetchTopTracks());
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.parentContainer}>
      <View style={styles.topMediaContainer}>
        <TopArtistsHome title="Your top artists" artists={data} />
      </View>
      <View style={styles.buttonContainer}>
        <PlayComponent />
      </View>
      <View style={styles.topMediaContainer}>
        <TopArtistsHome title="Your top tracks" artists={data2} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topMediaContainer: {
    flex: 1,
    // height: "auto",
    backgroundColor: "#2E2E2E",
    borderRadius: 15,
    margin: 5,
  },
  buttonContainer: {
    // flex: 1,
    // marginVertical: 15,
    marginHorizontal: 15,
  },
  parentContainer: {
    flex: 1,
  },
});
