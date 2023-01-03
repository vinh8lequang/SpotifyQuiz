import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
// import styles from "./styles";

const PlayComponent = () => {
  const navigation = useNavigation();

  const onPressPlay = () => {
    navigation.navigate("QuizScreen");
  };

  return (
    <TouchableOpacity onPress={onPressPlay}>
      <View style={styles.container}>
        <Text style={styles.playText}>Play</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a9645",
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
  },
  playText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PlayComponent;
