import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Button } from "react-native";
// import styles from "./styles";

const ArtistHome = () => {
  const navigation = useNavigation();

  const onPressPlay = () => {
    navigation.navigate("QuizScreen");
  };

  return (
    <View>
      <Button onPress={onPressPlay} title="Play" color="grey" />
    </View>
  );
};

export default ArtistHome;
