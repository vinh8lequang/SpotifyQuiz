import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    // marginHorizontal: 10,
    marginVertical: 5,
    alignItems: "center",
    height: "auto",
    margin: 10,
  },
  image: {
    width: 80,
    height: 80,
    maxWidth: 80,
    borderRadius: 10,
  },
  infoContainer: {
    alignItems: "flex-start",
    maxWidth: "75%",
    // maxWidth: "100%",
    // paddingEnd: "10%",
  },
  textNameUnlocked: {
    fontSize: 18,
    color: "white",
    marginHorizontal: 10,
    textAlign: "center",
  },
  textDescUnlocked: {
    fontSize: 13,
    color: "white",
    marginHorizontal: 10,
    // textAlign: "center",
  },
  textStatusUnlocked: {
    fontSize: 15,
    color: "#1a9645",
    marginHorizontal: 10,
    fontWeight: "bold",
    // textAlign: "center",
  },
  textNameLocked: {
    fontSize: 18,
    color: "gray",
    marginHorizontal: 10,
    // textAlign: "center",
  },
  textDescLocked: {
    fontSize: 13,
    color: "gray",
    marginHorizontal: 10,
    // textAlign: "center",
  },
  textStatusLocked: {
    fontSize: 15,
    color: "red",
    marginHorizontal: 10,
    fontWeight: "bold",
    // textAlign: "center",
  },
});

export default styles;
