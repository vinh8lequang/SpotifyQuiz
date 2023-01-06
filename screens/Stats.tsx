import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import TopArtistsStats from "../components/TopArtistsStats";
import { useEffect, useState } from "react";
import { getData } from "../utils/storage";
import { useIsFocused } from "@react-navigation/native";

const Stats = ({ navigation }: any) => {
  const isFocused = useIsFocused();

  const firstState = {
    artistName: "",
    imageUri: "",
    puntuation: 1,
    id: "",
  };

  const [artist, setArtist] = useState();

  useEffect(() => {
    const getArtist = async () => {
      var res = await getData("@relevantArtist");
      // @ts-ignore
      setArtist(JSON.parse(res));
      console.log("Stats", artist);
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

  return (
    <View style={styles.container}>
      <TopArtistsStats title="Your Most Known artists" artists={artist} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
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
