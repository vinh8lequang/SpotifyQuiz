import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  containerScoreandLives: {
    flexDirection: "row-reverse",
    marginTop: 15,
    marginLeft: 10,
    marginBottom: 0,
    justifyContent: "space-around",
  },
  containerLives: {
    flexDirection: "row",
  },
  lifeActive: {
    height: 17,
    width: 17,
    color: "red",
    marginBottom: 0,
  },
  lifeLoss: {
    height: 17,
    width: 17,
    marginBottom: 0,
    color: "#7F8487",
  },
  score: {
    marginRight: 100,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  questionText: {
    marginVertical: 25,
    marginHorizontal: 15,
    color: "white",
    fontSize: 17,
    textAlign: "center",
    fontWeight: "bold",
  },
  scoresText: {
    marginBottom: 5,
    marginHorizontal: 15,
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  image: {
    marginTop: 10,
    width: 200,
    height: 200,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 20,
    alignSelf: "center",
  },
  answersContainer: {
    flex: 1,
    margin: 0,
    justifyContent: "flex-end",
  },
  textAnswer: {
    color: "black",
    fontSize: 15,
  },
  // buttonAnswer: {
  //   maxHeight: "10px",
  // },
  button: {
    width: 360,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#fafafa",
    height: 45,
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonCorrect: {
    width: 360,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#1bc44b",
    height: 45,
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIncorrect: {
    width: 360,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#e63946",
    height: 45,
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
