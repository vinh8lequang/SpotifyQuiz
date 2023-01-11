import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: "auto",
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 80,
    maxWidth: 80,
    borderRadius: 10,
  },
  infoContainer: {
    alignItems: "flex-start",
  },
  textArtist: {
    fontSize: 15,
    color: "gray",
    marginHorizontal: 10,
    textAlign: "center",
  },
  textPoints: {
    fontSize: 15,
    color: "white",
    marginHorizontal: 10,
    textAlign: "center",
  },
});

export default styles;
