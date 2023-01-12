import { Dimensions, StatusBar, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import TopArtistsStats from "../components/TopArtistsStats";
import { useEffect, useState } from "react";
import { getData } from "../utils/storage";
import { useIsFocused } from "@react-navigation/native";

const Discovery = ({ navigation }: any) => {
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
  const [artist, setArtist] = useState();
  const [podium, setPodium] = useState();

  useEffect(() => {
    const getArtist = async () => {
      var res = await getData("@newDiscoveries");
      res = JSON.parse(res);
      var podiumSliced = res.slice(0, 3);
      var notPodiumSliced = res.slice(3, 30);

      // @ts-ignore
      setPodium(podiumSliced);
      // @ts-ignore
      setArtist(notPodiumSliced);
      // console.log("Stats podium", podiumSliced);
      // console.log("Stats notpodium", notPodiumSliced);
    };

    if (isFocused) {
      getArtist();
    }
    const removeFocusListener = navigation.addListener("focus", () => {
      getArtist();
    });
    return () => {
      removeFocusListener();
    };
  }, [isFocused]);

  const isTablet = screenWidth > screenHeight;
  var flexDirection;
  if (isTablet) {
    flexDirection = "row";
  } else {
    flexDirection = "column";
  }

  return (
    <View style={[styles.container, { flexDirection }]}>
      <View style={styles.topHalfContainer}>
        <TopArtistsStats title="Discovery" artists={podium} podium={true} />
      </View>
      <View style={styles.bottomHalfContainer}>
        <TopArtistsStats title="" artists={artist} podium={false} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // alignContent: "center",
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight,
  },
  topHalfContainer: {
    flex: 1,
  },
  bottomHalfContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default Discovery;
