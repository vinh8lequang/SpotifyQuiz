import {
  ActivityIndicator,
  Text,
  StyleSheet,
  View,
  Button,
} from "react-native";
import TopArtistsHome from "../components/TopArtistsHome";
import PlayComponent from "../components/PlayComponent";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  fetchTopUserArtists,
  topUserArtistsSelector,
} from "../redux/slices/topUserArtists";
import { useSelector } from "react-redux";
import { fetchTopTracks, topTracksSelector } from "../redux/slices/topTracks";
import { fetchAlbum } from "../redux/slices/Albums";
import { fetchTracks } from "../redux/slices/tracks";
import { getData, storeData } from "../utils/storage";
import { useIsFocused } from "@react-navigation/native";

// export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
const Home = ({ navigation }: any) => {
  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const { isLoading, data } = useSelector(topUserArtistsSelector);
  const { data: data2 } = useSelector(topTracksSelector);

  const [highScore, setHighScore] = useState(0);

  // const clearHighScore = async () => {
  //   await storeData("@highScore", "0");
  // };

  useEffect(() => {
    //fetching data from Spotify API
    dispatch(fetchTopUserArtists());
    dispatch(fetchTopTracks());

    //In order to fix a bug of quiz first load
    dispatch(fetchAlbum());
    dispatch(fetchAlbum());
    dispatch(fetchTracks());
    dispatch(fetchTracks());
    // clearHighScore();
  }, []);

  // this useFocus so Home can be mounted and unmounted properly
  // it is so high score can be updated when redircted back from game over screen
  useEffect(() => {
    const retrieveHighScore = async () => {
      try {
        const value = await getData("@highScore");
        if (value !== null) {
          // update highScore state variable with value from async storage
          setHighScore(parseInt(value));
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (isFocused) {
      retrieveHighScore();
    }
    const removeFocusListener = navigation.addListener("focus", () => {
      retrieveHighScore();
    });
    return () => {
      removeFocusListener();
    };
  }, [isFocused]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topHalfContainer}>
        <TopArtistsHome title="Your top artists" artists={data} />
      </View>
      <View style={styles.bottomHalfContainer}>
        <PlayComponent />
        <Text style={styles.highScoreText}>High Score:</Text>
        <Text style={styles.highScoreNumber}>{highScore}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHalfContainer: {
    // flex: 2,
    height: "50%",
    backgroundColor: "#2E2E2E",
    borderRadius: 15,
    margin: 5,
    marginVertical: 10,
  },
  bottomHalfContainer: {
    flex: 1,
    paddingTop: 25,
    marginHorizontal: 15,
  },
  highScoreText: {
    fontSize: 18,
    marginTop: 10,
    color: "#FFFFFF",
    textAlign: "center",
  },
  highScoreNumber: {
    fontSize: 80,
    marginTop: 10,
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default Home;
