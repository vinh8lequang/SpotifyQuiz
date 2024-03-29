import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: "auto",
  },
  // artist: {
  //   width: "33.3333%",
  //   aspectRatio: 1,
  // },
  columnWrapper: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
    textAlign: "center",
  },
});

export default styles;
