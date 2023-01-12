import { Dimensions, StatusBar, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import TopArtistsStats from "../components/TopArtistsStats";
import { useEffect, useState } from "react";
import { getData } from "../utils/storage";
import { useIsFocused } from "@react-navigation/native";

const Stats = ({ navigation }: any) => {
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
<<<<<<< Updated upstream
  const [podium, setPodium] = useState();
=======
  const[discoveries,setDiscoveries]=useState();
>>>>>>> Stashed changes

  useEffect(() => {
    const getArtist = async () => {
      var res = await getData("@relevantArtist");
<<<<<<< Updated upstream
      res = JSON.parse(res);
      var podiumSliced = res.slice(0, 3);
      var notPodiumSliced = res.slice(3, 30);

      // @ts-ignore
      setPodium(podiumSliced);
      // @ts-ignore
      setArtist(notPodiumSliced);
      console.log("Stats podium", podiumSliced);
      console.log("Stats notpodium", notPodiumSliced);
=======
      var res2 =await getData("@newDiscoveries");
      // @ts-ignore
      setArtist(JSON.parse(res));
      setDiscoveries(JSON.parse(res2));
      // console.log("Stats", artist);
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    <View style={[styles.container, { flexDirection }]}>
      <View style={styles.topHalfContainer}>
        <TopArtistsStats title="Podium" artists={podium} podium={true} />
      </View>
      <View style={styles.bottomHalfContainer}>
        <TopArtistsStats
          title="Remaining artists"
          artists={artist}
          podium={false}
        />
      </View>
=======
    <View style={styles.container}>
      <TopArtistsStats title="Artists scoreboard" artists={artist} />
      <TopArtistsStats title="New Discoveries" artists={discoveries} />
>>>>>>> Stashed changes
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

export default Stats;
