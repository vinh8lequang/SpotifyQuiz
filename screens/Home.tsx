import { ActivityIndicator, Text, StyleSheet, View } from "react-native";
import TopArtistsHome from "../components/TopArtistsHome";
import PlayComponent from "../components/PlayComponent";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  fetchTopUserArtists,
  topUserArtistsSelector,
} from "../redux/slices/topUserArtists";
import { useSelector } from "react-redux";
import { topTracksSelector } from "../redux/slices/topTracks";
import { getData, storeData } from "../utils/storage";
import { useIsFocused } from "@react-navigation/native";
import { fetchAlbum, albumsSelector } from "../redux/slices/Albums";
import { fetchTracks, tracksSelector } from "../redux/slices/tracks";

// export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
const Home = ({ navigation }: any) => {
  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const { isLoading, data } = useSelector(topUserArtistsSelector);
  const { isLoading: isLoading2, data: data2 } = useSelector(albumsSelector);
  const { isLoading: isLoading3, data: data3 } = useSelector(tracksSelector);

  const [highScore, setHighScore] = useState(0);

  // const clearHighScore = async () => {
  //   await storeData("@highScore", "0");
  // };

  useEffect(() => {
    //fetching data from Spotify API
    const fetchData = async () => {
      // @ts-ignore
      await dispatch(fetchTopUserArtists());
    };
    fetchData();
    const fetchDataAlbums = async () => {
      // @ts-ignore
      await dispatch(fetchAlbum());
    };
    const fetchDataTracks = async () => {
      // @ts-ignore
      await dispatch(fetchTracks());
    };
    setTimeout(() => {
      fetchDataAlbums();
    }, 300);
    setTimeout(() => {
      fetchDataTracks();
    }, 600);
    setTimeout(() => {
      fetchDataAlbums();
    }, 900);
    setTimeout(() => {
      fetchDataTracks();
    }, 1200);
    setTimeout(() => {
      fetchDataAlbums();
    }, 1500);
    setTimeout(() => {
      fetchDataTracks();
    }, 1800);
    setTimeout(() => {
      fetchDataAlbums();
    }, 2100);
    setTimeout(() => {
      fetchDataTracks();
    }, 2400);
    setTimeout(() => {
      fetchDataAlbums();
    }, 2700);
    setTimeout(() => {
      fetchDataTracks();
    }, 3000);
    // clearHighScore();
  }, []);

  // this useFocus so Home can be mounted and unmounted properly
  // it is so high score can be updated when redirected back from game over screen
  useEffect(() => {
    const retrieveHighScore = async () => {
      try {
        const value = await getData("@highScore");
        if (value !== null) {
          // update highScore state variable with value from async storage
          // @ts-ignore
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
  } else {
    // setTimeout(() => {
    //   console.log("Data", data);
    //   console.log("Data2", data2);
    //   console.log("Data3", data3);
    // }, 1000);
    return (
      <View style={styles.container}>
        <View style={styles.topHalfContainer}>
          {/* @ts-ignore */}
          <TopArtistsHome title="Your most listened artists" artists={data} />
        </View>
        <View style={styles.bottomHalfContainer}>
          <PlayComponent />
          <Text style={styles.highScoreText}>High Score:</Text>
          <Text style={styles.highScoreNumber}>{highScore}</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
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
