import {
  ActivityIndicator,
  Text,
  StyleSheet,
  View,
  StatusBar,
  Platform,
  Dimensions,
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
import { getData, storeData } from "../utils/storage";
import { useIsFocused } from "@react-navigation/native";
import { fetchAlbum } from "../redux/slices/Albums";
import { fetchTracks } from "../redux/slices/tracks";
import achievementsUpdater from "../services/achievementsUpdater";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const Home = ({ navigation }: any) => {
  //get the dimensions to fit all phone devices
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );

  useEffect(() => {
    const onChange = ({
      window: { width, height },
    }: {
      window: { width: number; height: number };
    }) => {
      setScreenHeight(height);
      setScreenWidth(width);
    };

    const removeChangeListener = Dimensions.addEventListener(
      "change",
      onChange
    );
    return () => {
      removeChangeListener.remove();
    };
  }, []);

  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const { isLoading, data } = useSelector(topUserArtistsSelector);

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

    // const testAchiev = async () => {
    //   // var achievements = await getData("@achievements");
    //   // console.log("achievementsStart", JSON.parse(achievements));

    //   achievementsUpdater("audio");
    // };
    // testAchiev();

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
    const isTablet = screenWidth > screenHeight;
    var flexDirection, justifyContent, fontSizeHSText, fontSizeHSNumber;

    if (isTablet) {
      flexDirection = "row";
      justifyContent = "center";
      fontSizeHSText;
      fontSizeHSNumber;
      fontSizeHSText = 30;
      fontSizeHSNumber = 200;
    } else {
      flexDirection = "column";
      justifyContent = "flex-start";
      fontSizeHSText = 18;
      fontSizeHSNumber = 80;
    }
    return (
      <View style={[styles.container, { flexDirection }]}>
        <View style={styles.topHalfContainer}>
          {/* @ts-ignore */}
          <TopArtistsHome title="Your most listened artists" artists={data} />
        </View>
        <View style={[styles.bottomHalfContainer, { justifyContent }]}>
          <PlayComponent />
          <Text style={[styles.highScoreText, {}]}>High Score:</Text>
          <Text style={[styles.highScoreNumber, {}]}>{highScore}</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    // flexDirection: "row",
  },
  topHalfContainer: {
    flex: 2,
    // maxHeight: "60%",
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
    fontSize: responsiveFontSize(1.9),
    marginTop: 10,
    color: "#FFFFFF",
    textAlign: "center",
  },
  highScoreNumber: {
    fontSize: responsiveFontSize(8),
    marginTop: 10,
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default Home;
