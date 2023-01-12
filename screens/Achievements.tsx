import { ActivityIndicator, StatusBar, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import AchievementList from "../components/AchievementList";
import { useEffect, useState } from "react";
import { getData } from "../utils/storage";
import { useIsFocused } from "@react-navigation/native";

const Achievements = ({ navigation }: any) => {
  const isFocused = useIsFocused();
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const getAchievements = async () => {
      var res = await getData("@achievements");
      // @ts-ignore
      res = JSON.parse(res);
      // @ts-ignore
      setAchievements(res[1]);
      // console.log("ach screen", achievements);
    };

    if (isFocused) {
      getAchievements();
    }
    const removeFocusListener = navigation.addListener("focus", () => {
      getAchievements();
    });
    return () => {
      removeFocusListener();
    };
  }, [isFocused]);

  // if (!achievements) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator />
  //     </View>
  //   );
  // }
  return (
    <View style={styles.container}>
      <AchievementList title="Achievements" achievements={achievements} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight,
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

export default Achievements;
