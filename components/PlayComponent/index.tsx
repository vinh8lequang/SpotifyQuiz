import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const PlayComponent = () => {
  const navigation = useNavigation();

  const onPressPlay = () => {
    navigation.navigate("Quiz");
  };

  return (
    <TouchableOpacity onPress={onPressPlay}>
      <View style={styles.container}>
        <Text style={styles.playText}>Start quiz</Text>
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
    fontSize: responsiveFontSize(1.9),
    fontWeight: "600",
    textAlign: "center",
  },
});

export default PlayComponent;
